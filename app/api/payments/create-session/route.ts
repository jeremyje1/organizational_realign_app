import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { AssessmentDB } from '../../../../lib/assessment-db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { 
      assessmentId, 
      plan,
      customerEmail,
      customerName 
    } = await request.json();

    if (!assessmentId || !plan) {
      return NextResponse.json({ error: 'Assessment ID and plan are required' }, { status: 400 });
    }

    // Define pricing plans
    const plans = {
      'basic': {
        priceId: process.env.STRIPE_BASIC_PRICE_ID!,
        name: 'Basic Assessment',
        price: 199900, // $1,999.00
        features: [
          'Up to 25 team members',
          'Basic AI analysis',
          'PDF report',
          'Email support'
        ]
      },
      'team': {
        priceId: process.env.STRIPE_TEAM_PRICE_ID!,
        name: 'Team Assessment',
        price: 399900, // $3,999.00
        features: [
          'Unlimited team members',
          'Advanced AI analysis',
          'Custom PDF report',
          'Priority support',
          'Team collaboration features'
        ]
      },
      'enterprise': {
        priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
        name: 'Enterprise Assessment',
        price: 899900, // $8,999.00
        features: [
          'Unlimited teams & departments',
          'Premium AI analysis',
          'Consulting session included',
          'Implementation support',
          'Dedicated success manager',
          'Custom integration options'
        ]
      }
    };

    const selectedPlan = plans[plan as keyof typeof plans];
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    // For new customers, we'll create the assessment after payment
    let assessment = null;
    if (assessmentId !== 'new') {
      assessment = await AssessmentDB.findAssessmentById(assessmentId);
      if (!assessment) {
        return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPlan.name,
              description: `Professional organizational analysis for assessment ${assessmentId}`,
              images: ['https://app.northpathstrategies.org/logo-stripe.png'],
            },
            unit_amount: selectedPlan.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: assessmentId === 'new' 
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&new_customer=true`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/secure/results?session_id={CHECKOUT_SESSION_ID}&assessmentId=${assessmentId}&premium=true`,
      cancel_url: assessmentId === 'new'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/secure/results?assessmentId=${assessmentId}`,
      metadata: {
        assessmentId,
        plan,
        customerName: customerName || '',
        isNewCustomer: assessmentId === 'new' ? 'true' : 'false',
      },
      invoice_creation: {
        enabled: true,
      },
      automatic_tax: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
      plan: selectedPlan
    });

  } catch (error) {
    console.error('Payment session creation error:', error);
    return NextResponse.json({ 
      error: 'Failed to create payment session',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle successful payments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      const { assessmentId, plan } = session.metadata || {};
      
      if (assessmentId) {
        // Update assessment with premium status
        await AssessmentDB.updateAssessmentPremium(assessmentId, plan);
        
        // Trigger premium analysis generation
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analysis/ai-enhanced`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ assessmentId }),
        });
      }
    }

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        metadata: session.metadata
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ 
      error: 'Failed to verify payment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
