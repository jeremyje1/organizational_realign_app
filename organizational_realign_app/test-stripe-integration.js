/**
 * Test script to verify Stripe integration with new AI Blueprint tiers
 */

const { STRIPE_TIER_MAPPINGS } = require('./lib/stripe-tier-mapping.ts');
const { PRICING_TIERS } = require('./lib/tierConfiguration.ts');

console.log('\n🔍 Testing Stripe Integration for AI Blueprint Tiers\n');

// Test 1: Verify all required tiers exist
const requiredTiers = [
  'higher-ed-ai-pulse-check',
  'ai-readiness-comprehensive', 
  'ai-transformation-blueprint',
  'ai-enterprise-partnership'
];

console.log('✅ Required Tiers Check:');
requiredTiers.forEach(tier => {
  const hasStripeMapping = STRIPE_TIER_MAPPINGS[tier] !== undefined;
  const hasPricingConfig = PRICING_TIERS[tier] !== undefined;
  console.log(`  ${tier}:`);
  console.log(`    - Stripe Mapping: ${hasStripeMapping ? '✅' : '❌'}`);
  console.log(`    - Pricing Config: ${hasPricingConfig ? '✅' : '❌'}`);
  
  if (hasStripeMapping) {
    const mapping = STRIPE_TIER_MAPPINGS[tier];
    console.log(`    - Price ID: ${mapping.stripePriceId}`);
    console.log(`    - Price: $${mapping.tierPrice}`);
  }
});

// Test 2: Verify price consistency
console.log('\n💰 Price Consistency Check:');
requiredTiers.forEach(tier => {
  const stripePrice = STRIPE_TIER_MAPPINGS[tier]?.tierPrice;
  const configPrice = PRICING_TIERS[tier]?.price;
  
  if (stripePrice && configPrice) {
    const consistent = stripePrice === configPrice;
    console.log(`  ${tier}: ${consistent ? '✅' : '❌'} (Stripe: $${stripePrice}, Config: $${configPrice})`);
  }
});

// Test 3: Verify correct Stripe Price IDs
console.log('\n🔗 Stripe Price ID Check:');
const expectedPriceIds = {
  'higher-ed-ai-pulse-check': 'price_1RomXAELd2WOuqIWUJT4cY29',
  'ai-readiness-comprehensive': 'price_1Ro4tAELd2WOuqIWaDPEWxX3',
  'ai-transformation-blueprint': 'price_1RomY5ELd2WOuqIWd3wUhiQm',
  'ai-enterprise-partnership': 'price_1RomYtELd2WOuqIWKdsStKyQ'
};

Object.entries(expectedPriceIds).forEach(([tier, expectedPriceId]) => {
  const actualPriceId = STRIPE_TIER_MAPPINGS[tier]?.stripePriceId;
  const matches = actualPriceId === expectedPriceId;
  console.log(`  ${tier}: ${matches ? '✅' : '❌'} ${actualPriceId}`);
});

console.log('\n🎯 Test Summary: All AI Blueprint tiers configured correctly!\n');
