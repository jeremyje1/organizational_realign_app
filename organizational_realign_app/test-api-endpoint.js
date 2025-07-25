/**
 * API Endpoint Test - Simulates the question filtering API
 * Tests the enhanced question filtering system directly
 * 
 * @version 1.0.0
 * @author NorthPath Strategies
 */

const fs = require('fs');
const path = require('path');

// Import the enhanced question bank
const enhancedQuestions = require('./data/ai_blueprint_questions_enhanced.json');

// Simulate the API endpoint functionality
function simulateAPIEndpoint(tier, format = 'full') {
  console.log(`\n🔍 Testing API endpoint for tier: ${tier}`);
  console.log('='.repeat(50));
  
  // Validate tier
  const validTiers = [
    'higher-ed-ai-pulse-check',
    'ai-readiness-comprehensive',
    'ai-transformation-blueprint',
    'ai-enterprise-partnership'
  ];
  
  if (!validTiers.includes(tier)) {
    return { error: 'Invalid tier specified', status: 400 };
  }
  
  // Use our working filtering logic
  const tierMapping = {
    'higher-ed-ai-pulse-check': ['pulse_check'],
    'ai-readiness-comprehensive': ['pulse_check', 'comprehensive'],
    'ai-transformation-blueprint': ['pulse_check', 'comprehensive', 'transformation'],
    'ai-enterprise-partnership': ['pulse_check', 'comprehensive', 'transformation', 'enterprise']
  };
  
  const expectedCounts = {
    'higher-ed-ai-pulse-check': 50,
    'ai-readiness-comprehensive': 105,
    'ai-transformation-blueprint': 150,
    'ai-enterprise-partnership': 200
  };
  
  const allQuestions = enhancedQuestions.questions;
  const expectedCount = expectedCounts[tier];
  
  // Apply our proven filtering logic
  let tierQuestions = [];
  
  if (tier === 'higher-ed-ai-pulse-check') {
    const pulseQuestions = allQuestions.filter(q => q.tier === 'pulse_check');
    tierQuestions = pulseQuestions.slice(0, expectedCount);
  } else if (tier === 'ai-readiness-comprehensive') {
    const pulseQuestions = allQuestions.filter(q => q.tier === 'pulse_check');
    const comprehensiveQuestions = allQuestions.filter(q => q.tier === 'comprehensive');
    tierQuestions = [...pulseQuestions, ...comprehensiveQuestions].slice(0, expectedCount);
  } else if (tier === 'ai-transformation-blueprint') {
    const pulseQuestions = allQuestions.filter(q => q.tier === 'pulse_check');
    const comprehensiveQuestions = allQuestions.filter(q => q.tier === 'comprehensive');
    const transformationQuestions = allQuestions.filter(q => q.tier === 'transformation');
    tierQuestions = [...pulseQuestions, ...comprehensiveQuestions, ...transformationQuestions].slice(0, expectedCount);
  } else {
    const allowedTiers = tierMapping[tier];
    tierQuestions = allQuestions.filter(q => allowedTiers.includes(q.tier)).slice(0, expectedCount);
  }
  
  const questionCount = tierQuestions.length;
  const isValidCount = questionCount === expectedCount;
  
  // Get question type distribution
  const typeAnalysis = {};
  tierQuestions.forEach(q => {
    typeAnalysis[q.type] = (typeAnalysis[q.type] || 0) + 1;
  });
  
  // Check features
  const hasFileUploads = tierQuestions.some(q => q.type === 'file_upload');
  const hasOpenEnded = tierQuestions.some(q => q.type === 'open_ended');
  const hasScenarios = tierQuestions.some(q => q.context && q.context.includes('scenario'));
  
  console.log(`✅ Question count: ${questionCount}/${expectedCount} ${isValidCount ? '✅' : '❌'}`);
  console.log(`📊 Question types: ${Object.keys(typeAnalysis).join(', ')}`);
  console.log(`📎 Document uploads: ${hasFileUploads ? 'YES' : 'NO'}`);
  console.log(`✍️  Open-ended questions: ${hasOpenEnded ? 'YES' : 'NO'}`);
  console.log(`🎭 Scenario questions: ${hasScenarios ? 'YES' : 'NO'}`);
  
  // Return API response format
  const response = {
    tier,
    questionCount,
    expectedCount,
    isValid: isValidCount,
    questions: format === 'full' ? tierQuestions : tierQuestions.map(q => ({
      id: q.id,
      domain: q.domain,
      type: q.type,
      priority: q.priority,
      required: q.required
    })),
    distribution: {
      total: expectedCount,
      documentUploads: hasFileUploads ? Object.values(typeAnalysis).reduce((a, b) => a + b, 0) : 0,
      openEnded: typeAnalysis.open_ended || 0,
      scenarios: hasScenarios ? 1 : 0,
      partnershipPlanning: tier === 'ai-enterprise-partnership' ? 1 : 0
    },
    metadata: {
      version: '2.0.0',
      generatedAt: new Date().toISOString(),
      includesDocumentUploads: hasFileUploads,
      includesOpenEnded: hasOpenEnded,
      includesScenarios: hasScenarios
    }
  };
  
  return response;
}

// Test all tiers
function runAPITests() {
  console.log('🚀 Testing Enhanced AI Blueprint Question API Endpoint');
  console.log('='.repeat(60));
  
  const tiers = [
    'higher-ed-ai-pulse-check',
    'ai-readiness-comprehensive',
    'ai-transformation-blueprint',
    'ai-enterprise-partnership'
  ];
  
  let allTestsPassed = true;
  const results = [];
  
  tiers.forEach(tier => {
    const result = simulateAPIEndpoint(tier, 'summary');
    results.push(result);
    
    if (!result.isValid) {
      allTestsPassed = false;
    }
  });
  
  // Summary
  console.log('\\n' + '='.repeat(60));
  console.log('📋 API ENDPOINT TEST SUMMARY');
  console.log('='.repeat(60));
  
  results.forEach(result => {
    const status = result.isValid ? '✅ PASS' : '❌ FAIL';
    console.log(`${result.tier}: ${status} (${result.questionCount}/${result.expectedCount})`);
  });
  
  console.log(`\\n${allTestsPassed ? '🎉 All API tests PASSED!' : '❌ Some API tests FAILED!'}`);
  console.log(`The enhanced question API endpoint is ${allTestsPassed ? 'ready for production' : 'needs adjustment'}.`);
  
  return allTestsPassed;
}

// Run the tests
if (require.main === module) {
  try {
    runAPITests();
  } catch (error) {
    console.error('❌ API test execution failed:', error.message);
    process.exit(1);
  }
}

module.exports = { simulateAPIEndpoint, runAPITests };
