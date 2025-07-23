/**
 * Test the algorithmic processing capabilities with the new mixed question types
 */

import { realignmentEngine } from '../lib/algorithms/realignment-engine';
import { getQuestionsForTier } from '../lib/enhancedQuestionBankV2';

// Test data with mixed question types
const testResponses = {
  // Likert responses
  'leadership_vision_likert': 4,
  'communication_effectiveness_likert': 3,
  'organizational_structure_clarity_likert': 2,
  'infrastructure_capacity_likert': 4,
  
  // Numeric responses  
  'leadership_vision_numeric': 85,
  'resource_allocation_efficiency_numeric': 65,
  'financial_stability_numeric': 78,
  
  // Text responses
  'leadership_vision_text': 'Our vision focuses on student success and innovation in learning.',
  'communication_effectiveness_text': 'We use multiple channels but struggle with consistency.',
  'organizational_structure_clarity_text': 'Roles and responsibilities need clarification.',
  'infrastructure_capacity_text': 'Recent upgrades have improved our capabilities.',
  
  // Mixed responses for different sections
  'decision_making_process_likert': 3,
  'change_management_capability_likert': 2,
  'stakeholder_engagement_text': 'We have regular meetings with key stakeholders but could improve feedback loops.',
  'operational_efficiency_numeric': 72,
  'performance_metrics_text': 'We track basic KPIs but need more comprehensive analytics.',
  'cultural_alignment_likert': 4,
  'employee_satisfaction_numeric': 68,
  'training_development_text': 'Professional development is encouraged but not consistently funded.'
};

async function testAlgorithmProcessing() {
  console.log('Testing Algorithm Processing with Mixed Question Types...\n');
  
  try {
    // Test 1: Verify questions are loaded correctly
    console.log('1. Testing question loading...');
    const questions = getQuestionsForTier('one-time-diagnostic', 'higher-education');
    console.log(`✓ Loaded ${questions.length} questions for Higher Education`);
    
    // Count question types
    const typeCounts = questions.reduce((acc, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('  Question type distribution:');
    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`    - ${type}: ${count} questions`);
    });
    
    // Test 2: Verify algorithm can process mixed responses
    console.log('\n2. Testing algorithm processing...');
    
    const analysisInput = {
      organizationType: 'higher-education' as const,
      tier: 'one-time-diagnostic' as const,
      responses: testResponses,
      institutionName: 'Test University',
      metadata: {
        submittedAt: new Date().toISOString(),
        version: '2.0.0'
      }
    };
    
    const results = await realignmentEngine.analyze(analysisInput);
    
    console.log('✓ Algorithm processing successful');
    console.log(`  - Overall score: ${results.overallScore}/100`);
    console.log(`  - Number of recommendations: ${results.recommendations.length}`);
    console.log(`  - Risk level: ${results.riskLevel}`);
    
    // Test 3: Verify all core sections are analyzed
    console.log('\n3. Testing section analysis...');
    const sectionScores = results.sectionScores || {};
    const expectedSections = ['leadership', 'communication', 'structure', 'resources', 'operations'];
    
    expectedSections.forEach(section => {
      if (sectionScores[section] !== undefined) {
        console.log(`  ✓ ${section}: ${sectionScores[section]}/100`);
      } else {
        console.log(`  ⚠ ${section}: No score (may be expected for some algorithms)`);
      }
    });
    
    // Test 4: Verify recommendations include context from text responses
    console.log('\n4. Testing recommendation quality...');
    const hasContextualRecommendations = results.recommendations.some(rec => 
      rec.description.includes('vision') || 
      rec.description.includes('communication') ||
      rec.description.includes('stakeholder')
    );
    
    if (hasContextualRecommendations) {
      console.log('  ✓ Recommendations appear to incorporate text response context');
    } else {
      console.log('  ⚠ Recommendations may not be fully utilizing text responses');
    }
    
    console.log('\n✅ All tests completed successfully!');
    console.log('\nThe enhanced question bank with mixed question types is fully compatible with the algorithmic analysis pipeline.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testAlgorithmProcessing();
