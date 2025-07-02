// lib/stripe.ts
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

// Assessment pricing tiers
export const ASSESSMENT_PRODUCTS = {
  INDIVIDUAL: {
    name: 'Individual Assessment',
    description: 'Comprehensive organizational assessment for single leader',
    price: 350000, // $3,500 in cents
    features: [
      'Complete organizational assessment',
      'AI-powered analysis',
      'Professional PDF report',
      'Implementation roadmap',
      'Email support'
    ]
  },
  TEAM: {
    name: 'Team Assessment',
    description: 'Collaborative assessment for leadership teams',
    price: 850000, // $8,500 in cents
    features: [
      'Everything in Individual',
      'Up to 10 team collaborators',
      'Real-time collaboration',
      'Team discussion features',
      'Priority support'
    ]
  },
  ENTERPRISE: {
    name: 'Enterprise Assessment',
    description: 'Full institutional assessment with consultation',
    price: 1500000, // $15,000 in cents
    features: [
      'Everything in Team',
      'Unlimited collaborators',
      'Data import capabilities',
      '2-hour strategy consultation',
      'Implementation planning session',
      'Direct advisor access'
    ]
  }
} as const;

export type AssessmentTier = keyof typeof ASSESSMENT_PRODUCTS;
