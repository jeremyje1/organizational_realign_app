import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { AssessmentDB, type AssessmentTier } from '@/lib/assessment-db';
import { getStripeMappingForTier } from '@/lib/stripe-tier-mapping';
import { PricingTier } from '@/lib/tierConfiguration';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Create user account and assessment record with tier assignment
        await handleSuccessfulPayment(session);
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancelled(subscription);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const { customer_email, metadata, customer, mode } = session;
  const tier = metadata?.tier as PricingTier;
  const tierName = metadata?.tier_name;
  const customerName = metadata?.customer_name;

  if (!customer_email || !tier) {
    console.error('Missing required data in checkout session:', { customer_email, tier });
    return;
  }

  try {
    // Validate tier is supported
    const tierMapping = getStripeMappingForTier(tier);
    if (!tierMapping) {
      console.error('Invalid tier specified in webhook:', tier);
      return;
    }

    console.log(`Processing successful payment for tier: ${tier}`, {
      customer_email,
      tier,
      tierName,
      mode,
      sessionId: session.id
    });

    // Create or update user with tier assignment
    const user = await prisma.user.upsert({
      where: { email: customer_email },
      update: {
        tier: tier,
        name: customerName || customer_email.split('@')[0],
        stripeCustomerId: customer as string,
        subscriptionStatus: mode === 'subscription' ? 'active' : null,
        lastPaymentDate: new Date(),
      },
      create: {
        email: customer_email,
        name: customerName || customer_email.split('@')[0],
        tier: tier,
        stripeCustomerId: customer as string,
        subscriptionStatus: mode === 'subscription' ? 'active' : null,
        lastPaymentDate: new Date(),
      },
    });

    console.log(`User ${user.email} updated with tier: ${tier}`);

    // Create assessment record for the purchased tier
    const assessment = await AssessmentDB.createAssessment({
      userId: user.id,
      tier: tier as AssessmentTier,
      stripeCustomerId: customer as string,
      stripeSessionId: session.id,
    });

    console.log(`Assessment created for user ${user.email}:`, assessment.id);

    // TODO: Send welcome email with tier-specific instructions
    // TODO: Trigger tier-specific onboarding flow
    
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    
    // Update user subscription status
    await prisma.user.updateMany({
      where: { stripeCustomerId: customerId },
      data: {
        subscriptionStatus: 'cancelled',
        tier: 'one-time-diagnostic', // Downgrade to basic tier
      },
    });

    console.log(`Subscription cancelled for customer: ${customerId}`);
  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    const status = subscription.status;
    
    // Update user subscription status
    await prisma.user.updateMany({
      where: { stripeCustomerId: customerId },
      data: {
        subscriptionStatus: status,
      },
    });

    console.log(`Subscription updated for customer: ${customerId}, status: ${status}`);
  } catch (error) {
    console.error('Error handling subscription update:', error);
  }
}
