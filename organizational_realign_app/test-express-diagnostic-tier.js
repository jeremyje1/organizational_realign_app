#!/usr/bin/env node

/**
 * Test Express Diagnostic Tier Configuration
 * Validates the new express-diagnostic tier is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Express Diagnostic Tier Configuration...\n');

// Test 1: Check tierConfiguration.ts for express-diagnostic
console.log('1️⃣ Checking tierConfiguration.ts...');
const tierConfigPath = path.join(__dirname, 'lib', 'tierConfiguration.ts');
const tierConfigContent = fs.readFileSync(tierConfigPath, 'utf8');

if (tierConfigContent.includes("'express-diagnostic'")) {
  console.log('✅ express-diagnostic found in PricingTier type');
} else {
  console.log('❌ express-diagnostic missing from PricingTier type');
}

if (tierConfigContent.includes("'express-diagnostic': {")) {
  console.log('✅ express-diagnostic configuration found in PRICING_TIERS');
  
  // Check price
  const expressMatch = tierConfigContent.match(/'express-diagnostic':\s*{[\s\S]*?price:\s*(\d+)/);
  if (expressMatch && expressMatch[1] === '2495') {
    console.log('✅ Express Diagnostic price correctly set to $2495');
  } else {
    console.log('❌ Express Diagnostic price incorrect or missing');
  }
} else {
  console.log('❌ express-diagnostic configuration missing from PRICING_TIERS');
}

// Test 2: Check stripe-tier-mapping.ts
console.log('\n2️⃣ Checking stripe-tier-mapping.ts...');
const stripeMappingPath = path.join(__dirname, 'lib', 'stripe-tier-mapping.ts');
const stripeMappingContent = fs.readFileSync(stripeMappingPath, 'utf8');

if (stripeMappingContent.includes("'express-diagnostic': {")) {
  console.log('✅ express-diagnostic found in STRIPE_TIER_MAPPINGS');
  
  // Check price in Stripe mapping
  const stripeMatch = stripeMappingContent.match(/'express-diagnostic':\s*{[\s\S]*?tierPrice:\s*(\d+)/);
  if (stripeMatch && stripeMatch[1] === '2495') {
    console.log('✅ Express Diagnostic Stripe price correctly set to 2495');
  } else {
    console.log('❌ Express Diagnostic Stripe price incorrect or missing');
  }
} else {
  console.log('❌ express-diagnostic configuration missing from STRIPE_TIER_MAPPINGS');
}

// Test 3: Check QuickWinsAssessmentEnhanced.tsx
console.log('\n3️⃣ Checking QuickWinsAssessmentEnhanced.tsx...');
const quickWinsPath = path.join(__dirname, 'components', 'QuickWinsAssessmentEnhanced.tsx');
const quickWinsContent = fs.readFileSync(quickWinsPath, 'utf8');

if (quickWinsContent.includes('tier=express-diagnostic')) {
  console.log('✅ QuickWins upgrade button uses express-diagnostic tier');
} else {
  console.log('❌ QuickWins upgrade button not using express-diagnostic tier');
}

if (quickWinsContent.includes('$2,495')) {
  console.log('✅ QuickWins button shows correct $2,495 price');
} else {
  console.log('❌ QuickWins button price incorrect or missing');
}

if (quickWinsContent.includes('Express Diagnostic')) {
  console.log('✅ QuickWins references Express Diagnostic product name');
} else {
  console.log('❌ QuickWins missing Express Diagnostic product name');
}

// Test 4: Type consistency check
console.log('\n4️⃣ Checking type consistency...');
const tierTypeMatch = tierConfigContent.match(/export type PricingTier = ([^;]+);/);
if (tierTypeMatch) {
  const tierTypes = tierTypeMatch[1].split('|').map(t => t.trim().replace(/'/g, ''));
  console.log('📋 Available tiers:', tierTypes.join(', '));
  
  if (tierTypes.includes('express-diagnostic')) {
    console.log('✅ express-diagnostic properly typed');
  } else {
    console.log('❌ express-diagnostic missing from type definition');
  }
} else {
  console.log('❌ Could not parse PricingTier type definition');
}

console.log('\n🎯 Test Summary:');
console.log('The Express Diagnostic tier should now be available for:');
console.log('- $2,495 pricing');
console.log('- 75-question focused assessment');
console.log('- DSCH, CRF analysis');
console.log('- Quick upgrade path from Quick Wins assessment');
console.log('\n✨ Express Diagnostic tier configuration test complete!');
