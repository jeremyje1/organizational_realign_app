/**
 * Test AI readiness question counts
 */

const { getAIReadinessQuestions } = require('./lib/enhancedQuestionBankV3.ts');

console.log('Testing AI Readiness Question Counts\n');

const tiers = [
  { tier: 'higher-ed-ai-pulse-check', expected: 50 },
  { tier: 'ai-readiness-comprehensive', expected: 105 },
  { tier: 'ai-transformation-blueprint', expected: 150 },
  { tier: 'ai-enterprise-partnership', expected: 200 }
];

tiers.forEach(({ tier, expected }) => {
  const questions = getAIReadinessQuestions(tier);
  const actual = questions.length;
  const status = actual === expected ? '✅ CORRECT' : `❌ WRONG (got ${actual})`;
  
  console.log(`${tier}: ${actual} questions ${status}`);
  
  if (actual !== expected) {
    console.log(`  Expected: ${expected}, Got: ${actual}`);
  }
});

console.log('\nQuestion ID ranges:');
tiers.forEach(({ tier }) => {
  const questions = getAIReadinessQuestions(tier);
  const firstId = questions[0]?.id;
  const lastId = questions[questions.length - 1]?.id;
  console.log(`${tier}: ${firstId} ... ${lastId} (${questions.length} total)`);
});
