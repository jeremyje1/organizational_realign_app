const { getQuestionsForTier, validateAssessmentResponses, getRequiredQuestions } = require('./lib/enhancedQuestionBankV3.ts');

console.log('=== Testing Validation Issues Across All Assessment Tiers ===\n');

const tiersToTest = [
  'one-time-diagnostic',
  'monthly-subscription', 
  'comprehensive-package',
  'enterprise-transformation',
  'higher-ed-ai-pulse-check',
  'ai-readiness-comprehensive',
  'ai-transformation-blueprint',
  'ai-enterprise-partnership'
];

const organizationType = 'higher-education';

for (const tier of tiersToTest) {
  console.log(`\n--- Testing ${tier} ---`);
  
  try {
    const questions = getQuestionsForTier(tier, organizationType);
    const requiredQuestions = getRequiredQuestions(tier, organizationType);
    
    console.log(`Total questions: ${questions.length}`);
    console.log(`Required questions: ${requiredQuestions.length}`);
    
    // Find required likert and upload questions
    const requiredLikert = requiredQuestions.filter(q => q.type === 'likert');
    const requiredUpload = requiredQuestions.filter(q => q.type === 'upload');
    
    console.log(`Required likert questions: ${requiredLikert.length}`);
    console.log(`Required upload questions: ${requiredUpload.length}`);
    
    if (requiredLikert.length > 0) {
      console.log(`  First required likert: ${requiredLikert[0].id}`);
    }
    if (requiredUpload.length > 0) {
      console.log(`  First required upload: ${requiredUpload[0].id}`);
    }
    
    // Create mock responses for all required questions
    const mockResponses = {};
    requiredQuestions.forEach(q => {
      if (q.type === 'likert') {
        mockResponses[q.id] = '4'; // Should be valid now
      } else if (q.type === 'upload') {
        mockResponses[q.id] = 'test-file.pdf'; // Should be valid now
      } else if (q.type === 'text') {
        mockResponses[q.id] = 'Test response';
      } else if (q.type === 'numeric') {
        mockResponses[q.id] = 50;
      } else {
        mockResponses[q.id] = 'Test response';
      }
    });
    
    // Test validation
    const validation = validateAssessmentResponses(mockResponses, tier, organizationType);
    
    if (validation.valid) {
      console.log('✅ Validation PASSED');
    } else {
      console.log('❌ Validation FAILED');
      console.log(`Missing required: ${validation.missingRequired.slice(0, 5).join(', ')}${validation.missingRequired.length > 5 ? '...' : ''}`);
    }
    
  } catch (error) {
    console.log(`❌ Error testing ${tier}: ${error.message}`);
  }
}

console.log('\n=== Summary ===');
console.log('The validation fix should resolve issues across ALL assessment types that have required likert or upload questions.');
