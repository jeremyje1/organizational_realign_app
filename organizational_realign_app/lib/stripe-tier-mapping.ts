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
  'higher-ed-ai-pulse-check': {
    tierKey: 'higher-ed-ai-pulse-check',
    stripeProductId: 'prod_ai_readiness_pulse',
    stripePriceId: 'price_1RomXAELd2WOuqIWUJT4cY29',
    stripeMode: 'payment',
    successRedirect: '/assessment/tier-based?tier=higher-ed-ai-pulse-check&assessment_type=ai-readiness',
    cancelRedirect: '/ai-readiness/pricing',
    tierName: 'Higher Ed AI Pulse Check',
    tierPrice: 2000
  },
  'ai-readiness-comprehensive': {
    tierKey: 'ai-readiness-comprehensive',
    stripeProductId: 'prod_ai_readiness_assessment',
    stripePriceId: 'price_1Ro4tAELd2WOuqIWaDPEWxX3',
    stripeMode: 'payment',
    successRedirect: '/assessment/tier-based?tier=ai-readiness-comprehensive&assessment_type=ai-readiness',
    cancelRedirect: '/ai-readiness/pricing',
    tierName: 'AI Readiness Comprehensive',
    tierPrice: 4995
  },
  'ai-transformation-blueprint': {
    tierKey: 'ai-transformation-blueprint',
    stripeProductId: 'prod_ai_transformation_blueprint',
    stripePriceId: 'price_1RomY5ELd2WOuqIWd3wUhiQm',
    stripeMode: 'payment',
    successRedirect: '/assessment/tier-based?tier=ai-transformation-blueprint&assessment_type=ai-readiness',
    cancelRedirect: '/ai-readiness/pricing',
    tierName: 'AI Transformation Blueprint',
    tierPrice: 24500
  },
  'ai-enterprise-partnership': {
    tierKey: 'ai-enterprise-partnership',
    stripeProductId: 'prod_ai_enterprise_partnership',
    stripePriceId: 'price_1RomYtELd2WOuqIWKdsStKyQ',
    stripeMode: 'payment',
    successRedirect: '/assessment/tier-based?tier=ai-enterprise-partnership&assessment_type=ai-readiness',
    cancelRedirect: '/ai-readiness/pricing',
    tierName: 'Enterprise Partnership',
    tierPrice: 0 // Contact for pricing
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
    'higher-ed-ai-pulse-check',
    'ai-readiness-comprehensive', 
    'ai-transformation-blueprint',
    'ai-enterprise-partnership'
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
  // Get base URL from environment or use current request origin as fallback
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  process.env.NEXT_PUBLIC_APP_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : 'https://app.northpathstrategies.org');
  
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
