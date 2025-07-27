#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');

const BASE_URL = 'https://organizational-realign-r385mz223-jeremys-projects-73929cad.vercel.app';

// Test configuration
const testConfigs = [
  {
    name: 'Comprehensive Realignement Assessment',
    tier: 'comprehensive-package',
    description: 'Testing Stripe integration for comprehensive-package tier'
  }
];

async function testTierPricing(config) {
  console.log(`\n🔄 Testing ${config.name} (${config.tier})...`);
  
  try {
    // Test the Stripe checkout endpoint
    const response = await fetch(`${BASE_URL}/api/stripe/create-tier-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tier: config.tier,
        organization: 'Test University',
        email: 'test@university.edu',
        institutionType: 'Higher Education',
        // Minimal test data
        responses: [
          { questionId: 'test', answer: 'test', score: 5 }
        ]
      })
    });

    const data = await response.json();

    if (response.ok && data.sessionId) {
      console.log(`✅ ${config.name}: Stripe session created successfully`);
      console.log(`   Session ID: ${data.sessionId}`);
      console.log(`   Checkout URL: ${data.url ? 'Present' : 'Missing'}`);
      return true;
    } else {
      console.log(`❌ ${config.name}: Failed to create Stripe session`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Error: ${data.error || 'Unknown error'}`);
      console.log(`   Details: ${JSON.stringify(data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${config.name}: Exception occurred`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Testing Comprehensive Assessment Stripe Integration');
  console.log(`🌐 Base URL: ${BASE_URL}`);
  
  let passed = 0;
  let failed = 0;

  for (const config of testConfigs) {
    const success = await testTierPricing(config);
    if (success) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log('\n📊 Test Results Summary:');
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Comprehensive assessment Stripe integration is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the Stripe configuration.');
  }
}

// Run the tests
runTests().catch(console.error);
