/**
 * Test script to verify assessment validation works for all tiers
 * Run this to check if there are validation issues affecting other assessments
 */

const { getQuestionsForTier, validateAssessmentResponses, getAIReadinessQuestions } = require('./lib/enhancedQuestionBankV3.ts');

console.log('Testing Assessment Validation for All Tiers\n');

// Test organizational assessment tiers
const orgTiers = ['one-time-diagnostic', 'monthly-subscription', 'comprehensive-package', 'enterprise-transformation'];
const organizationType = 'higher-education';

console.log('=== ORGANIZATIONAL ASSESSMENTS ===');
orgTiers.forEach(tier => {
  try {
    const questions = getQuestionsForTier(tier, organizationType);
    const requiredQuestions = questions.filter(q => q.required === true);
    
    console.log(`\n${tier.toUpperCase()}:`);
    console.log(`  Total questions: ${questions.length}`);
    console.log(`  Required questions: ${requiredQuestions.length}`);
    
    // Create mock responses for all required questions
    const mockResponses = {};
    requiredQuestions.forEach(q => {
      if (q.type === 'multiple-choice' || q.type === 'scale') {
        mockResponses[q.id] = 3; // Mock middle value
      } else if (q.type === 'text') {
        mockResponses[q.id] = 'Test response';
      } else if (q.type === 'boolean') {
        mockResponses[q.id] = true;
      }
    });
    
    // Test validation with complete responses
    const validation = validateAssessmentResponses(mockResponses, tier, organizationType);
    console.log(`  Validation with complete responses: ${validation.valid ? 'PASS' : 'FAIL'}`);
    if (!validation.valid) {
      console.log(`  Missing: ${validation.missingRequired.join(', ')}`);
    }
    
    // Test validation with incomplete responses (remove one required response)
    if (requiredQuestions.length > 0) {
      const incompleteResponses = { ...mockResponses };
      delete incompleteResponses[requiredQuestions[0].id];
      
      const incompleteValidation = validateAssessmentResponses(incompleteResponses, tier, organizationType);
      console.log(`  Validation with incomplete responses: ${incompleteValidation.valid ? 'FAIL (should be invalid)' : 'PASS'}`);
    }
    
  } catch (error) {
    console.log(`  ERROR: ${error.message}`);
  }
});

console.log('\n=== AI READINESS ASSESSMENTS ===');
const aiTiers = ['higher-ed-ai-pulse-check', 'ai-readiness-comprehensive', 'ai-transformation-blueprint', 'ai-enterprise-partnership'];

aiTiers.forEach(tier => {
  try {
    const questions = getAIReadinessQuestions(tier);
    const requiredQuestions = questions.filter(q => q.required === true);
    
    console.log(`\n${tier.toUpperCase()}:`);
    console.log(`  Total questions: ${questions.length}`);
    console.log(`  Required questions: ${requiredQuestions.length}`);
    
    // Create mock responses for all required questions
    const mockResponses = {};
    requiredQuestions.forEach(q => {
      if (q.type === 'multiple-choice' || q.type === 'scale') {
        mockResponses[q.id] = 3; // Mock middle value
      } else if (q.type === 'text') {
        mockResponses[q.id] = 'Test response';
      } else if (q.type === 'boolean') {
        mockResponses[q.id] = true;
      }
    });
    
    // Test validation with complete responses
    const validation = validateAssessmentResponses(mockResponses, tier, organizationType);
    console.log(`  Validation with complete responses: ${validation.valid ? 'PASS' : 'FAIL'}`);
    if (!validation.valid) {
      console.log(`  Missing: ${validation.missingRequired.join(', ')}`);
    }
    
  } catch (error) {
    console.log(`  ERROR: ${error.message}`);
  }
});

console.log('\n=== SUMMARY ===');
console.log('If all tests show PASS for complete responses, the validation logic is working correctly.');
console.log('If any show FAIL, there may be issues with question definitions or validation logic.');
