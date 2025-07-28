#!/usr/bin/env node

/**
 * Debug One-Time Diagnostic Tier Issues
 * Tests question generation for one-time-diagnostic tier
 */

// Simple test without imports to check basic logic
console.log('🔧 Debugging One-Time Diagnostic Tier Issues...\n');

// Test tier hierarchy logic
const tierHierarchy = {
  'express-diagnostic': 1,
  'one-time-diagnostic': 1, // Should be same as express-diagnostic
  'monthly-subscription': 2,
  'comprehensive-package': 3,
  'enterprise-transformation': 4,
  'higher-ed-ai-pulse-check': 1,
  'ai-readiness-comprehensive': 2,
  'ai-transformation-blueprint': 3,
  'ai-enterprise-partnership': 4
};

console.log('1️⃣ Testing tier hierarchy...');
console.log('express-diagnostic level:', tierHierarchy['express-diagnostic']);
console.log('one-time-diagnostic level:', tierHierarchy['one-time-diagnostic']);
console.log('✅ Both should be level 1 (same access to base questions)');

console.log('\n2️⃣ Testing tier minimum filtering...');
// Simulate questions with different tier minimums
const testQuestions = [
  { id: 'Q1', tierMinimum: undefined }, // Should be included in all tiers
  { id: 'Q2', tierMinimum: 'one-time-diagnostic' }, // Should be in both express and one-time
  { id: 'Q3', tierMinimum: 'monthly-subscription' }, // Should NOT be in express or one-time
  { id: 'Q4', tierMinimum: 'comprehensive-package' }, // Should NOT be in express or one-time
];

['express-diagnostic', 'one-time-diagnostic'].forEach(tier => {
  console.log(`\nTesting ${tier}:`);
  const filteredQuestions = testQuestions.filter(q => {
    if (!q.tierMinimum) return true;
    return tierHierarchy[tier] >= tierHierarchy[q.tierMinimum];
  });
  
  console.log(`  Included questions: ${filteredQuestions.map(q => q.id).join(', ')}`);
  console.log(`  Should include: Q1, Q2 (${filteredQuestions.length === 2 ? '✅' : '❌'})`);
});

console.log('\n3️⃣ Checking question assignment logic...');
const questionAssignmentRules = {
  'express-diagnostic': 'CORE + CONTEXTUAL (limited to 75)',
  'one-time-diagnostic': 'CORE + CONTEXTUAL (no limit)',
  'monthly-subscription': 'CORE + CONTEXTUAL + MONTHLY',
  'comprehensive-package': 'CORE + CONTEXTUAL + MONTHLY + COMPREHENSIVE',
  'enterprise-transformation': 'CORE + CONTEXTUAL + MONTHLY + COMPREHENSIVE + ENTERPRISE'
};

Object.entries(questionAssignmentRules).forEach(([tier, rule]) => {
  console.log(`${tier}: ${rule}`);
});

console.log('\n🎯 Expected Behavior:');
console.log('✅ express-diagnostic: 75 questions (subset of one-time-diagnostic)');
console.log('✅ one-time-diagnostic: ~105+ questions (full base set)');
console.log('✅ Both should have access to questions with tierMinimum: "one-time-diagnostic"');

console.log('\n💡 If one-time-diagnostic is still failing, the issue may be:');
console.log('- Server-side error in question generation');
console.log('- Missing questions in CORE_QUESTIONS array');
console.log('- Issue with CONTEXTUAL_QUESTIONS filtering');
console.log('- Problem with the 75-question limiting logic affecting one-time-diagnostic');
