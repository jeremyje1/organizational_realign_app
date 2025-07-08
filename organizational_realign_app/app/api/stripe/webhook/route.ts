import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { AssessmentDB, type AssessmentTier } from '@/lib/assessment-db';
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
        
        // Create user account and assessment record
        await handleSuccessfulPayment(session);
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
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
  const { customer_email, metadata, customer } = session;
  const assessmentTier = metadata?.assessment_tier;

  if (!customer_email || !assessmentTier) {
    console.error('Missing required data in checkout session');
    return;
  }

  try {
    // Create or update user
    const user = await prisma.user.upsert({
      where: { email: customer_email },
      update: {},
      create: {
        email: customer_email,
        name: customer_email.split('@')[0], // Basic name from email
      },
    });

    // Create assessment record
    const assessment = await AssessmentDB.createAssessment({
      userId: user.id,
      tier: assessmentTier as AssessmentTier,
      stripeCustomerId: customer as string,
      stripeSessionId: session.id,
    });

    // TODO: Send welcome email with assessment instructions
    console.log(`Assessment created for user ${user.email}:`, assessment.id);
    
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}
