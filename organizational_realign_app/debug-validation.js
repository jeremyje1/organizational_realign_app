/**
 * Debug validation issue by examining specific questions and responses
 */

const { getQuestionsForTier, validateAssessmentResponses, getRequiredQuestions } = require('./lib/enhancedQuestionBankV3.ts');

console.log('Debugging Validation Issue\n');

// Test one specific tier to understand the issue
const tier = 'one-time-diagnostic';
const organizationType = 'higher-education';

console.log(`Testing ${tier} with ${organizationType}`);

const allQuestions = getQuestionsForTier(tier, organizationType);
const requiredQuestions = getRequiredQuestions(tier, organizationType);

console.log(`\nTotal questions: ${allQuestions.length}`);
console.log(`Required questions: ${requiredQuestions.length}`);

// Show first few required questions
console.log('\nFirst 5 required questions:');
requiredQuestions.slice(0, 5).forEach((q, i) => {
  console.log(`  ${i + 1}. ${q.id} (${q.type}) - "${q.text?.substring(0, 50)}..."`);
});

// Create mock responses
const mockResponses = {};
requiredQuestions.forEach(q => {
  if (q.type === 'multiple-choice' || q.type === 'scale') {
    mockResponses[q.id] = 3; // Mock middle value
  } else if (q.type === 'text') {
    mockResponses[q.id] = 'Test response';
  } else if (q.type === 'boolean') {
    mockResponses[q.id] = true;
  } else {
    mockResponses[q.id] = 'Other response';
  }
});

console.log(`\nCreated ${Object.keys(mockResponses).length} mock responses`);
console.log('First 5 mock responses:');
Object.entries(mockResponses).slice(0, 5).forEach(([id, value]) => {
  console.log(`  ${id}: ${value}`);
});

// Test validation
const validation = validateAssessmentResponses(mockResponses, tier, organizationType);
console.log(`\nValidation result: ${validation.valid ? 'VALID' : 'INVALID'}`);

if (!validation.valid) {
  console.log(`Missing required responses (${validation.missingRequired.length}): ${validation.missingRequired.slice(0, 10).join(', ')}${validation.missingRequired.length > 10 ? '...' : ''}`);
  
  // Check if the missing questions actually exist in our required questions
  const firstMissing = validation.missingRequired[0];
  console.log(`\nChecking first missing question: ${firstMissing}`);
  
  const questionExists = requiredQuestions.find(q => q.id === firstMissing);
  console.log(`Question exists in required list: ${questionExists ? 'YES' : 'NO'}`);
  
  if (questionExists) {
    console.log(`Question type: ${questionExists.type}`);
    console.log(`Mock response value: ${mockResponses[firstMissing]}`);
    console.log(`Response exists: ${!!mockResponses[firstMissing]}`);
    console.log(`Response not empty string: ${mockResponses[firstMissing] !== ''}`);
    console.log(`Validation check: ${!mockResponses[firstMissing] || mockResponses[firstMissing] === ''}`);
  }
}
