import { NextRequest, NextResponse } from 'next/server';
import { stripe, ASSESSMENT_PRODUCTS, type AssessmentTier } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { tier, successUrl, cancelUrl } = await request.json();

    if (!tier || !ASSESSMENT_PRODUCTS[tier as AssessmentTier]) {
      return NextResponse.json(
        { error: 'Invalid assessment tier' },
        { status: 400 }
      );
    }

    const product = ASSESSMENT_PRODUCTS[tier as AssessmentTier];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [], // Add your product images here
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        assessment_tier: tier,
      },
      // Enable customer creation for future use
      customer_creation: 'always',
      // Add invoice creation for B2B customers
      invoice_creation: {
        enabled: true,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
