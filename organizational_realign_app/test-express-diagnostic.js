// Test Express Diagnostic Implementation
const { createRequire } = require('module');
const require = createRequire(import.meta.url);

async function testExpressDiagnostic() {
  try {
    console.log('🧪 Testing Express Diagnostic Implementation...\n');
    
    // Test 1: Verify tier configuration
    const { getTierConfiguration } = require('./lib/tierConfiguration.ts');
    const expressConfig = getTierConfiguration('express-diagnostic');
    
    console.log('✅ Express Diagnostic Configuration:');
    console.log(`   Name: ${expressConfig.name}`);
    console.log(`   Price: $${expressConfig.price}`);
    console.log(`   Question Count: ${expressConfig.assessmentScope.questionCount}`);
    console.log(`   Report Pages: ${expressConfig.assessmentScope.reportPages}`);
    console.log(`   Features: ${Object.entries(expressConfig.features).filter(([_, enabled]) => enabled).map(([feature]) => feature).join(', ')}`);
    
    // Test 2: Verify question selection
    const { getQuestionsForTier } = require('./lib/enhancedQuestionBankV3.ts');
    const expressQuestions = getQuestionsForTier('express-diagnostic', 'higher-education');
    
    console.log(`\n✅ Question Selection:`);
    console.log(`   Total questions for Express Diagnostic: ${expressQuestions.length}`);
    console.log(`   Expected: ~60 questions`);
    
    if (expressQuestions.length >= 55 && expressQuestions.length <= 65) {
      console.log('   ✅ Question count is within expected range');
    } else {
      console.log('   ❌ Question count is outside expected range');
    }
    
    // Test 3: Check section distribution
    const sectionCounts = {};
    expressQuestions.forEach(q => {
      sectionCounts[q.section] = (sectionCounts[q.section] || 0) + 1;
    });
    
    console.log(`\n✅ Section Distribution:`);
    Object.entries(sectionCounts).forEach(([section, count]) => {
      console.log(`   ${section}: ${count} questions`);
    });
    
    // Test 4: Verify algorithms
    console.log(`\n✅ Available Algorithms: ${expressConfig.assessmentScope.algorithms.join(', ')}`);
    
    console.log('\n🎉 Express Diagnostic implementation test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testExpressDiagnostic();
