/**
 * Stripe Tier Mapping Configuration
 * Maps tier configuration to Stripe pricing and redirects
 * 
 * @version 1.0.0
 * @author NorthPath Strategies
 */

import { PricingTier, PRICING_TIERS } from './tierConfiguration';

export interface StripeTierMapping {
  tierKey: PricingTier;
  stripeProductId: string;
  stripePriceId: string;
  stripeMode: 'payment' | 'subscription';
  successRedirect: string;
  cancelRedirect: string;
  tierName: string;
  tierPrice: number;
}

export const STRIPE_TIER_MAPPINGS: Record<PricingTier, StripeTierMapping> = {
  'one-time-diagnostic': {
    tierKey: 'one-time-diagnostic',
    stripeProductId: 'prod_diagnostic',
    stripePriceId: process.env.STRIPE_BASIC_PRICE_ID || 'price_1Rhdf0ELd2WOuqIWwagqCdLa',
    stripeMode: 'payment',
    successRedirect: '/assessment/tier-based?tier=one-time-diagnostic',
    cancelRedirect: '/upgrade?tier=one-time-diagnostic',
    tierName: 'One-Time Diagnostic',
    tierPrice: 4995
  },
  'monthly-subscription': {
    tierKey: 'monthly-subscription',
    stripeProductId: 'prod_monthly',
    stripePriceId: process.env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID || 'price_1RhdgNELd2WOuqIW9HDyggY3',
    stripeMode: 'subscription',
    successRedirect: '/assessment/tier-based?tier=monthly-subscription',
    cancelRedirect: '/upgrade?tier=monthly-subscription',
    tierName: 'Monthly Subscription',
    tierPrice: 2995
  },
  'comprehensive-package': {
    tierKey: 'comprehensive-package',
    stripeProductId: 'prod_comprehensive',
    stripePriceId: process.env.STRIPE_COMPREHENSIVE_PRICE_ID || 'price_1RgUduELd2WOuqIWFHobukeZ',
    stripeMode: 'payment',
    successRedirect: '/assessment/tier-based?tier=comprehensive-package',
    cancelRedirect: '/upgrade?tier=comprehensive-package',
    tierName: 'Comprehensive Package',
    tierPrice: 9900
  },
  'enterprise-transformation': {
    tierKey: 'enterprise-transformation',
    stripeProductId: 'prod_enterprise',
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_1RgUb8ELd2WOuqIWMxA0mLwz',
    stripeMode: 'payment',
    successRedirect: '/assessment/tier-based?tier=enterprise-transformation',
    cancelRedirect: '/upgrade?tier=enterprise-transformation',
    tierName: 'Enterprise Transformation',
    tierPrice: 24000
  }
};

/**
 * Get Stripe mapping for a specific tier
 */
export function getStripeMappingForTier(tier: PricingTier): StripeTierMapping {
  return STRIPE_TIER_MAPPINGS[tier];
}

/**
 * Get tier from Stripe price ID
 */
export function getTierFromStripePriceId(priceId: string): PricingTier | null {
  const mapping = Object.values(STRIPE_TIER_MAPPINGS).find(
    mapping => mapping.stripePriceId === priceId
  );
  return mapping?.tierKey || null;
}

/**
 * Validate that user has access to tier-specific features
 */
export function validateTierAccess(userTier: PricingTier, requiredTier: PricingTier): boolean {
  const tierHierarchy: PricingTier[] = [
    'one-time-diagnostic',
    'monthly-subscription', 
    'comprehensive-package',
    'enterprise-transformation'
  ];
  
  const userTierIndex = tierHierarchy.indexOf(userTier);
  const requiredTierIndex = tierHierarchy.indexOf(requiredTier);
  
  return userTierIndex >= requiredTierIndex;
}

/**
 * Get features available to user's tier
 */
export function getTierFeatures(tier: PricingTier) {
  return PRICING_TIERS[tier];
}

/**
 * Generate Stripe checkout URL for tier upgrade
 */
export function generateStripeCheckoutUrl(
  tier: PricingTier, 
  customerEmail?: string,
  successUrl?: string,
  cancelUrl?: string
): string {
  const mapping = getStripeMappingForTier(tier);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org';
  
  const params = new URLSearchParams({
    price_id: mapping.stripePriceId,
    tier: tier,
    mode: mapping.stripeMode,
    success_url: successUrl || `${baseUrl}${mapping.successRedirect}`,
    cancel_url: cancelUrl || `${baseUrl}${mapping.cancelRedirect}`
  });
  
  if (customerEmail) {
    params.set('customer_email', customerEmail);
  }
  
  return `/api/stripe/create-tier-checkout?${params.toString()}`;
}
