/**
 * AI Blueprint Tier Mapping Configuration
 * Completely separate from organizational realignment services
 * 
 * @version 1.0.0
 * @author NorthPath Strategies
 */

export type AIBlueprintTier = 'higher-ed-ai-pulse-check' | 'ai-readiness-comprehensive' | 'ai-transformation-blueprint' | 'ai-enterprise-partnership';

export interface AIBlueprintStripeTierMapping {
  tierKey: AIBlueprintTier;
  stripeProductId: string;
  stripePriceId: string;
  stripeMode: 'payment' | 'subscription';
  successRedirect: string;
  cancelRedirect: string;
  tierName: string;
  tierPrice: number;
}

export const AI_BLUEPRINT_STRIPE_TIER_MAPPINGS: Record<AIBlueprintTier, AIBlueprintStripeTierMapping> = {
  'higher-ed-ai-pulse-check': {
    tierKey: 'higher-ed-ai-pulse-check',
    stripeProductId: 'prod_ai_blueprint_pulse',
    stripePriceId: 'price_1RomXAELd2WOuqIWUJT4cY29',
    stripeMode: 'payment',
    successRedirect: '/ai-blueprint/assessment?tier=higher-ed-ai-pulse-check',
    cancelRedirect: '/ai-blueprint/pricing',
    tierName: 'Higher Ed AI Pulse Check',
    tierPrice: 2000
  },
  'ai-readiness-comprehensive': {
    tierKey: 'ai-readiness-comprehensive',
    stripeProductId: 'prod_ai_blueprint_comprehensive',
    stripePriceId: 'price_1Ro4tAELd2WOuqIWaDPEWxX3',
    stripeMode: 'payment',
    successRedirect: '/ai-blueprint/assessment?tier=ai-readiness-comprehensive',
    cancelRedirect: '/ai-blueprint/pricing',
    tierName: 'AI Readiness Comprehensive',
    tierPrice: 4995
  },
  'ai-transformation-blueprint': {
    tierKey: 'ai-transformation-blueprint',
    stripeProductId: 'prod_ai_blueprint_transformation',
    stripePriceId: 'price_1RomY5ELd2WOuqIWd3wUhiQm',
    stripeMode: 'payment',
    successRedirect: '/ai-blueprint/assessment?tier=ai-transformation-blueprint',
    cancelRedirect: '/ai-blueprint/pricing',
    tierName: 'AI Transformation Blueprint',
    tierPrice: 24500
  },
  'ai-enterprise-partnership': {
    tierKey: 'ai-enterprise-partnership',
    stripeProductId: 'prod_ai_blueprint_enterprise',
    stripePriceId: 'price_1RomYtELd2WOuqIWKdsStKyQ',
    stripeMode: 'payment',
    successRedirect: '/ai-blueprint/assessment?tier=ai-enterprise-partnership',
    cancelRedirect: '/ai-blueprint/pricing',
    tierName: 'Enterprise Partnership',
    tierPrice: 75000
  }
};

/**
 * Get AI Blueprint Stripe mapping for a specific tier
 */
export function getAIBlueprintStripeMappingForTier(tier: AIBlueprintTier): AIBlueprintStripeTierMapping {
  return AI_BLUEPRINT_STRIPE_TIER_MAPPINGS[tier];
}

/**
 * Get AI Blueprint tier from Stripe price ID
 */
export function getAIBlueprintTierFromStripePriceId(priceId: string): AIBlueprintTier | null {
  const mapping = Object.values(AI_BLUEPRINT_STRIPE_TIER_MAPPINGS).find(
    mapping => mapping.stripePriceId === priceId
  );
  return mapping?.tierKey || null;
}

/**
 * Validate that user has access to AI Blueprint tier-specific features
 */
export function validateAIBlueprintTierAccess(userTier: AIBlueprintTier, requiredTier: AIBlueprintTier): boolean {
  const tierHierarchy: AIBlueprintTier[] = [
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
 * Generate AI Blueprint Stripe checkout URL
 */
export function generateAIBlueprintStripeCheckoutUrl(
  tier: AIBlueprintTier, 
  customerEmail?: string,
  successUrl?: string,
  cancelUrl?: string
): string {
  const mapping = getAIBlueprintStripeMappingForTier(tier);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  process.env.NEXT_PUBLIC_APP_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : 'https://app.northpathstrategies.org');
  
  const params = new URLSearchParams({
    price_id: mapping.stripePriceId,
    tier: tier,
    mode: mapping.stripeMode,
    service: 'ai-blueprint',
    success_url: successUrl || `${baseUrl}${mapping.successRedirect}`,
    cancel_url: cancelUrl || `${baseUrl}${mapping.cancelRedirect}`
  });
  
  if (customerEmail) {
    params.set('customer_email', customerEmail);
  }
  
  return `/api/ai-blueprint/stripe/create-checkout?${params.toString()}`;
}
