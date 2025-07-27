/**
 * Enhanced debug to test AI readiness validation specifically
 */

const { getAIReadinessQuestions, validateAssessmentResponses } = require('./lib/enhancedQuestionBankV3.ts');

console.log('Debugging AI Readiness Validation\n');

// Test AI readiness comprehensive tier (105 questions)
const tier = 'ai-readiness-comprehensive';
const organizationType = 'higher-education';

console.log(`Testing ${tier} with ${organizationType}`);

const questions = getAIReadinessQuestions(tier);
const requiredQuestions = questions.filter(q => q.required === true);

console.log(`\nTotal AI readiness questions: ${questions.length}`);
console.log(`Required AI readiness questions: ${requiredQuestions.length}`);

// Show first few required questions
console.log('\nFirst 5 required AI readiness questions:');
requiredQuestions.slice(0, 5).forEach((q, i) => {
  console.log(`  ${i + 1}. ${q.id} (${q.type}) - "${q.text?.substring(0, 50) || 'undefined'}..."`);
});

// Create mock responses with proper handling for all types
const mockResponses = {};
requiredQuestions.forEach(q => {
  if (q.type === 'multiple-choice' || q.type === 'scale' || q.type === 'likert') {
    mockResponses[q.id] = 3; // Mock middle value
  } else if (q.type === 'text') {
    mockResponses[q.id] = 'Test response';
  } else if (q.type === 'boolean') {
    mockResponses[q.id] = true;
  } else if (q.type === 'numeric') {
    mockResponses[q.id] = 5;
  } else {
    mockResponses[q.id] = 'Default response';
  }
});

console.log(`\nCreated ${Object.keys(mockResponses).length} mock responses for AI readiness`);

// Test validation
const validation = validateAssessmentResponses(mockResponses, tier, organizationType);
console.log(`\nAI Readiness validation result: ${validation.valid ? 'VALID' : 'INVALID'}`);

if (!validation.valid) {
  console.log(`Missing required responses (${validation.missingRequired.length}): ${validation.missingRequired.slice(0, 10).join(', ')}${validation.missingRequired.length > 10 ? '...' : ''}`);
  
  // Check first few missing questions
  console.log('\nAnalyzing first 3 missing questions:');
  validation.missingRequired.slice(0, 3).forEach((missingId, i) => {
    const question = requiredQuestions.find(q => q.id === missingId);
    console.log(`  ${i + 1}. ${missingId}:`);
    console.log(`     Exists in required list: ${question ? 'YES' : 'NO'}`);
    console.log(`     Question type: ${question?.type || 'UNKNOWN'}`);
    console.log(`     Mock response: ${mockResponses[missingId]}`);
    console.log(`     Response validation: ${!mockResponses[missingId] || mockResponses[missingId] === ''}`);
  });
}
