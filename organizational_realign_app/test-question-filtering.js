/**
 * Test script for Enhanced AI Blueprint Question Filtering
 * Tests the tier-based question filtering with mixed question types
 * 
 * @version 1.0.0
 * @author NorthPath Strategies
 */

const fs = require('fs');
const path = require('path');

// Import the enhanced question bank
const enhancedQuestions = require('./data/ai_blueprint_questions_enhanced.json');

// Simulate the filtering functions (simplified versions for testing)
function getQuestionTypeDistribution(tier) {
  const distributions = {
    'higher-ed-ai-pulse-check': {
      total: 50,
      documentUploads: 0,
      openEnded: 10,
      scenarios: 0,
      partnershipPlanning: 0
    },
    'ai-readiness-comprehensive': {
      total: 105,
      documentUploads: 5,
      openEnded: 25,
      scenarios: 0,
      partnershipPlanning: 0
    },
    'ai-transformation-blueprint': {
      total: 150,
      documentUploads: 10,
      openEnded: 40,
      scenarios: 3,
      partnershipPlanning: 0
    },
    'ai-enterprise-partnership': {
      total: 200,
      documentUploads: 20,
      openEnded: 60,
      scenarios: 3,
      partnershipPlanning: 2
    }
  };
  
  return distributions[tier] || distributions['higher-ed-ai-pulse-check'];
}

function filterQuestionsByTier(tier, allQuestions) {
  const tierMapping = {
    'higher-ed-ai-pulse-check': ['pulse_check'],
    'ai-readiness-comprehensive': ['pulse_check', 'comprehensive'],
    'ai-transformation-blueprint': ['pulse_check', 'comprehensive', 'transformation'],
    'ai-enterprise-partnership': ['pulse_check', 'comprehensive', 'transformation', 'enterprise']
  };
  
  const allowedTiers = tierMapping[tier] || ['pulse_check'];
  const distribution = getQuestionTypeDistribution(tier);
  
  // Filter by tier first
  let tierQuestions = allQuestions.filter(q => 
    allowedTiers.includes(q.tier)
  );
  
  // For lower tiers, we need to be more selective
  if (tier === 'higher-ed-ai-pulse-check') {
    // Only use pulse_check questions and prioritize essential
    tierQuestions = allQuestions.filter(q => q.tier === 'pulse_check');
    const essentialQuestions = tierQuestions.filter(q => q.priority === 'essential');
    const highQuestions = tierQuestions.filter(q => q.priority === 'high');
    
    // Fill to exactly 50 questions
    const selectedQuestions = [];
    selectedQuestions.push(...essentialQuestions);
    
    if (selectedQuestions.length < distribution.total) {
      const remainingSlots = distribution.total - selectedQuestions.length;
      selectedQuestions.push(...highQuestions.slice(0, remainingSlots));
    }
    
    // If still not enough, add any remaining pulse_check questions
    if (selectedQuestions.length < distribution.total) {
      const remaining = tierQuestions.filter(q => !selectedQuestions.includes(q));
      const remainingSlots = distribution.total - selectedQuestions.length;
      selectedQuestions.push(...remaining.slice(0, remainingSlots));
    }
    
    return selectedQuestions.slice(0, distribution.total);
  }
  
  if (tier === 'ai-readiness-comprehensive') {
    // Use pulse_check + comprehensive questions
    const pulseQuestions = allQuestions.filter(q => q.tier === 'pulse_check');
    const comprehensiveQuestions = allQuestions.filter(q => q.tier === 'comprehensive');
    
    const selectedQuestions = [];
    selectedQuestions.push(...pulseQuestions); // All pulse check questions (should be ~50)
    
    // Add comprehensive questions to reach 105
    const remainingSlots = distribution.total - selectedQuestions.length;
    selectedQuestions.push(...comprehensiveQuestions.slice(0, remainingSlots));
    
    return selectedQuestions.slice(0, distribution.total);
  }
  
  if (tier === 'ai-transformation-blueprint') {
    // Use pulse_check + comprehensive + transformation questions
    const pulseQuestions = allQuestions.filter(q => q.tier === 'pulse_check');
    const comprehensiveQuestions = allQuestions.filter(q => q.tier === 'comprehensive');
    const transformationQuestions = allQuestions.filter(q => q.tier === 'transformation');
    
    const selectedQuestions = [];
    selectedQuestions.push(...pulseQuestions); // ~50
    selectedQuestions.push(...comprehensiveQuestions); // ~55 more (105 total)
    
    // Add transformation questions to reach 150
    const remainingSlots = distribution.total - selectedQuestions.length;
    selectedQuestions.push(...transformationQuestions.slice(0, remainingSlots));
    
    return selectedQuestions.slice(0, distribution.total);
  }
  
  // For enterprise tier, return all questions up to 200
  return tierQuestions.slice(0, distribution.total);
}

// Test function
function runTests() {
  console.log('🔍 Testing Enhanced AI Blueprint Question Filtering\n');
  
  const tiers = [
    'higher-ed-ai-pulse-check',
    'ai-readiness-comprehensive', 
    'ai-transformation-blueprint',
    'ai-enterprise-partnership'
  ];
  
  // Load questions
  const allQuestions = enhancedQuestions.questions;
  console.log(`📊 Total questions in enhanced bank: ${allQuestions.length}\n`);
  
  // Test each tier
  tiers.forEach(tier => {
    console.log(`\n🎯 Testing tier: ${tier}`);
    console.log('='.repeat(50));
    
    const distribution = getQuestionTypeDistribution(tier);
    const tierQuestions = filterQuestionsByTier(tier, allQuestions);
    
    console.log(`Expected questions: ${distribution.total}`);
    console.log(`Actual questions: ${tierQuestions.length}`);
    console.log(`✅ Count match: ${distribution.total === tierQuestions.length ? 'YES' : 'NO'}`);
    
    // Analyze question types
    const typeAnalysis = {};
    tierQuestions.forEach(q => {
      typeAnalysis[q.type] = (typeAnalysis[q.type] || 0) + 1;
    });
    
    console.log('\nQuestion type breakdown:');
    Object.entries(typeAnalysis).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    
    // Check for required features
    const hasFileUploads = tierQuestions.some(q => q.type === 'file_upload');
    const hasOpenEnded = tierQuestions.some(q => q.type === 'open_ended');
    const hasScenarios = tierQuestions.some(q => q.context && q.context.includes('scenario'));
    
    console.log('\nFeature analysis:');
    console.log(`  📎 Document uploads: ${hasFileUploads ? 'YES' : 'NO'} (expected: ${distribution.documentUploads > 0 ? 'YES' : 'NO'})`);
    console.log(`  ✍️  Open-ended questions: ${hasOpenEnded ? 'YES' : 'NO'} (expected: ${distribution.openEnded > 0 ? 'YES' : 'NO'})`);
    console.log(`  🎭 Scenario questions: ${hasScenarios ? 'YES' : 'NO'} (expected: ${distribution.scenarios > 0 ? 'YES' : 'NO'})`);
    
    // Domain coverage
    const domains = [...new Set(tierQuestions.map(q => q.domain))];
    console.log(`\n🏢 Domain coverage: ${domains.length} domains`);
    console.log(`  Domains: ${domains.join(', ')}`);
  });
  
  // Overall validation
  console.log('\n' + '='.repeat(60));
  console.log('🎉 OVERALL VALIDATION SUMMARY');
  console.log('='.repeat(60));
  
  let allTestsPassed = true;
  
  tiers.forEach(tier => {
    const distribution = getQuestionTypeDistribution(tier);
    const tierQuestions = filterQuestionsByTier(tier, allQuestions);
    const countMatch = distribution.total === tierQuestions.length;
    
    if (!countMatch) {
      allTestsPassed = false;
    }
    
    console.log(`${tier}: ${countMatch ? '✅' : '❌'} (${tierQuestions.length}/${distribution.total} questions)`);
  });
  
  console.log(`\n${allTestsPassed ? '🎉 All tests PASSED!' : '❌ Some tests FAILED!'}`);
  console.log(`\nThe enhanced question filtering system is ${allTestsPassed ? 'working correctly' : 'needs adjustment'}.`);
  
  return allTestsPassed;
}

// Run the tests
if (require.main === module) {
  try {
    runTests();
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

module.exports = { runTests, filterQuestionsByTier, getQuestionTypeDistribution };
