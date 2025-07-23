#!/usr/bin/env node

/**
 * Quick Test Starter
 * Start systematic testing of all assessment combinations
 */

const testCombinations = [
  { test: 1, org: 'higher-education', tier: 'express-diagnostic', price: '$2,495' },
  { test: 2, org: 'higher-education', tier: 'one-time-diagnostic', price: '$4,995' },
  { test: 3, org: 'higher-education', tier: 'monthly-subscription', price: '$2,995/month' },
  { test: 4, org: 'higher-education', tier: 'comprehensive-package', price: '$9,995' },
  { test: 5, org: 'higher-education', tier: 'enterprise-transformation', price: '$24,000' },
  
  { test: 6, org: 'healthcare', tier: 'express-diagnostic', price: '$2,495' },
  { test: 7, org: 'healthcare', tier: 'one-time-diagnostic', price: '$4,995' },
  { test: 8, org: 'healthcare', tier: 'monthly-subscription', price: '$2,995/month' },
  { test: 9, org: 'healthcare', tier: 'comprehensive-package', price: '$9,995' },
  { test: 10, org: 'healthcare', tier: 'enterprise-transformation', price: '$24,000' },
  
  { test: 11, org: 'nonprofit', tier: 'express-diagnostic', price: '$2,495' },
  { test: 12, org: 'nonprofit', tier: 'one-time-diagnostic', price: '$4,995' },
  { test: 13, org: 'nonprofit', tier: 'monthly-subscription', price: '$2,995/month' },
  { test: 14, org: 'nonprofit', tier: 'comprehensive-package', price: '$9,995' },
  { test: 15, org: 'nonprofit', tier: 'enterprise-transformation', price: '$24,000' },
  
  { test: 16, org: 'corporate', tier: 'express-diagnostic', price: '$2,495' },
  { test: 17, org: 'corporate', tier: 'one-time-diagnostic', price: '$4,995' },
  { test: 18, org: 'corporate', tier: 'monthly-subscription', price: '$2,995/month' },
  { test: 19, org: 'corporate', tier: 'comprehensive-package', price: '$9,995' },
  { test: 20, org: 'corporate', tier: 'enterprise-transformation', price: '$24,000' },
  
  { test: 21, org: 'government', tier: 'express-diagnostic', price: '$2,495' },
  { test: 22, org: 'government', tier: 'one-time-diagnostic', price: '$4,995' },
  { test: 23, org: 'government', tier: 'monthly-subscription', price: '$2,995/month' },
  { test: 24, org: 'government', tier: 'comprehensive-package', price: '$9,995' },
  { test: 25, org: 'government', tier: 'enterprise-transformation', price: '$24,000' }
];

console.log('🧪 COMPREHENSIVE ASSESSMENT TESTING PLAN');
console.log('=========================================\n');
console.log('📊 CORRECTED PRICING - Monthly Subscription: $2,995/month\n');

console.log('🎯 25 TEST COMBINATIONS:');
console.log('========================\n');

testCombinations.forEach(test => {
  const url = `https://app.northpathstrategies.org/assessment/tier-based?tier=${test.tier}&org=${test.org}`;
  console.log(`TEST ${test.test}/25: ${test.org.toUpperCase()} × ${test.tier.toUpperCase()} (${test.price})`);
  console.log(`   URL: ${url}`);
  console.log(`   Test Email: test-${test.org}-${test.tier}@northpathstrategies.org\n`);
});

console.log('🚀 TO START TESTING:');
console.log('====================');
console.log('1. Copy the URL for TEST 1');
console.log('2. Open it in your browser');
console.log('3. Complete the assessment');
console.log('4. Check admin dashboard for results');
console.log('5. Verify emails were sent');
console.log('6. Move to TEST 2');

console.log('\n📋 ADMIN ACCESS:');
console.log('================');
console.log('URL: https://app.northpathstrategies.org/admin');
console.log('Password: stardynamics1124*');

console.log('\n✅ READY TO BEGIN SYSTEMATIC TESTING!');
