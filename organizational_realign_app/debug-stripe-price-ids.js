#!/usr/bin/env node

/**
 * Debug Stripe Price ID Issue
 * Check what price IDs are being used
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging Stripe Price ID Issue...\n');

// Read the stripe mapping file
const stripeMappingPath = path.join(__dirname, 'lib', 'stripe-tier-mapping.ts');
const stripeMappingContent = fs.readFileSync(stripeMappingPath, 'utf8');

console.log('1️⃣ Checking Stripe price IDs in mapping file...\n');

// Extract price IDs
const priceIdMatches = stripeMappingContent.match(/stripePriceId: '[^']+'/g);
if (priceIdMatches) {
  priceIdMatches.forEach(match => {
    console.log(match);
  });
} else {
  console.log('No price IDs found');
}

console.log('\n2️⃣ Checking specific tier mappings...\n');

// Check one-time-diagnostic specifically
const oneTimeMatch = stripeMappingContent.match(/'one-time-diagnostic':\s*{[\s\S]*?stripePriceId:\s*'([^']+)'/);
if (oneTimeMatch) {
  console.log(`One-Time Diagnostic Price ID: ${oneTimeMatch[1]}`);
  console.log(`Length: ${oneTimeMatch[1].length} characters`);
} else {
  console.log('One-Time Diagnostic mapping not found');
}

// Check express-diagnostic specifically  
const expressMatch = stripeMappingContent.match(/'express-diagnostic':\s*{[\s\S]*?stripePriceId:\s*'([^']+)'/);
if (expressMatch) {
  console.log(`Express Diagnostic Price ID: ${expressMatch[1]}`);
  console.log(`Length: ${expressMatch[1].length} characters`);
} else {
  console.log('Express Diagnostic mapping not found');
}

console.log('\n3️⃣ Issue Analysis:');
console.log('The error shows: "No such price: \'price_1Ro4u8ELd2WOuqIWCkJdFb"');
console.log('This appears to be truncated from the full price ID.');
console.log('\n💡 Possible solutions:');
console.log('1. Update one-time-diagnostic to use a valid Stripe price ID');
console.log('2. Check if the price ID exists in your Stripe dashboard');
console.log('3. Verify the price ID format matches Stripe requirements');

console.log('\n🎯 Recommended action:');
console.log('Please provide the correct Stripe price ID for one-time-diagnostic ($4,995)');
console.log('It should follow the pattern: price_1[random_string]');
