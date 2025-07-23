#!/usr/bin/env node

/**
 * Test Production Email Flow
 * Tests the entire flow from assessment submission to email delivery using production URLs
 */

require('dotenv').config({ path: '.env.local' });

console.log('🧪 Testing Production Email Flow\n');

async function testProductionFlow() {
  try {
    // Test assessment data
    const testData = {
      tier: "basic-organizational-health",
      organizationType: "Healthcare",
      institutionName: "Test Healthcare Organization - Production",
      contactEmail: "jeremy.estrella@gmail.com",
      contactName: "Jeremy Estrella",
      responses: {
        "span_control_1": 3,
        "span_control_2": 2,
        "culture_1": 4,
        "culture_2": 3,
        "tech_fit_1": 2,
        "tech_fit_2": 3,
        "readiness_1": 4,
        "readiness_2": 3,
        "leadership_1": 3,
        "communication_1": 4,
        "strategy_1": 3
      },
      testMode: true
    };

    console.log('📋 Submitting test assessment to production...');
    
    // Submit assessment to production
    const response = await fetch('https://app.northpathstrategies.org/api/assessment/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Assessment submitted successfully to production!');
    console.log(`📊 Assessment ID: ${result.assessmentId}\n`);

    // Test the client results URL - production
    console.log('🔗 Testing production client results URL...');
    const clientUrl = `https://app.northpathstrategies.org/assessment/results?assessmentId=${result.assessmentId}`;
    console.log(`Client URL: ${clientUrl}`);
    
    const clientResponse = await fetch(clientUrl);
    console.log(`Client page status: ${clientResponse.status} ${clientResponse.statusText}`);
    
    // Test the admin URL - production
    console.log('\n🔗 Testing production admin URL...');
    const adminUrl = `https://app.northpathstrategies.org/admin/assessment/${result.assessmentId}`;
    console.log(`Admin URL: ${adminUrl}`);
    
    const adminResponse = await fetch(adminUrl);
    console.log(`Admin page status: ${adminResponse.status} ${adminResponse.statusText}`);
    
    // Test the API endpoint - production
    console.log('\n🔗 Testing production API endpoint...');
    const apiUrl = `https://app.northpathstrategies.org/api/assessments/${result.assessmentId}`;
    console.log(`API URL: ${apiUrl}`);
    
    const apiResponse = await fetch(apiUrl);
    console.log(`API status: ${apiResponse.status} ${apiResponse.statusText}`);
    
    if (apiResponse.ok) {
      const apiData = await apiResponse.json();
      console.log('API Response:', apiData.success ? 'SUCCESS' : 'FAILED');
    }

    console.log('\n📧 URLs in production emails:');
    console.log(`✉️  Client Results: https://app.northpathstrategies.org/assessment/results?assessmentId=${result.assessmentId}`);
    console.log(`✉️  Admin Dashboard: https://app.northpathstrategies.org/admin/assessment/${result.assessmentId}`);
    console.log(`✉️  Calendly: https://calendly.com/jeremyestrella/30min`);

    return result.assessmentId;

  } catch (error) {
    console.error('❌ Error in production flow test:', error.message);
    return null;
  }
}

// Run the test
testProductionFlow()
  .then(assessmentId => {
    if (assessmentId) {
      console.log(`\n🎉 Production flow test completed!`);
      console.log(`Assessment ID: ${assessmentId}`);
      console.log('\n📬 Check your email for notifications with production URLs!');
      console.log('\n🌐 Try clicking the links in the email - they should now work from any device!');
    }
  })
  .catch(console.error);
