#!/usr/bin/env node

/**
 * Test Complete Email Flow
 * Tests the entire flow from assessment submission to email delivery to link functionality
 */

require('dotenv').config({ path: '.env.local' });

console.log('🧪 Testing Complete Email Flow\n');

async function testCompleteFlow() {
  try {
    // Test assessment data
    const testData = {
      tier: "basic-organizational-health",
      organizationType: "Healthcare",
      institutionName: "Test Healthcare Organization",
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

    console.log('📋 Submitting test assessment...');
    
    // Submit assessment
    const response = await fetch('http://localhost:3000/api/assessment/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Assessment submitted successfully!');
    console.log(`📊 Assessment ID: ${result.assessmentId}\n`);

    // Test the client results URL
    console.log('🔗 Testing client results URL...');
    const clientUrl = `http://localhost:3000/assessment/results?assessmentId=${result.assessmentId}`;
    console.log(`Client URL: ${clientUrl}`);
    
    const clientResponse = await fetch(clientUrl);
    console.log(`Client page status: ${clientResponse.status} ${clientResponse.statusText}`);
    
    // Test the admin URL
    console.log('\n🔗 Testing admin URL...');
    const adminUrl = `http://localhost:3000/admin/assessment/${result.assessmentId}`;
    console.log(`Admin URL: ${adminUrl}`);
    
    const adminResponse = await fetch(adminUrl);
    console.log(`Admin page status: ${adminResponse.status} ${adminResponse.statusText}`);
    
    // Test the API endpoint
    console.log('\n🔗 Testing API endpoint...');
    const apiUrl = `http://localhost:3000/api/assessments/${result.assessmentId}`;
    console.log(`API URL: ${apiUrl}`);
    
    const apiResponse = await fetch(apiUrl);
    console.log(`API status: ${apiResponse.status} ${apiResponse.statusText}`);
    
    if (apiResponse.ok) {
      const apiData = await apiResponse.json();
      console.log('API Response:', apiData.success ? 'SUCCESS' : 'FAILED');
    }

    console.log('\n📧 Email URLs that will be sent:');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org';
    console.log(`✉️  Client Results: ${baseUrl}/assessment/results?assessmentId=${result.assessmentId}`);
    console.log(`✉️  Admin Dashboard: ${baseUrl}/admin/assessment/${result.assessmentId}`);
    console.log(`✉️  Calendly: ${process.env.CALENDLY_URL || 'https://calendly.com/jeremyestrella/30min'}`);

    return result.assessmentId;

  } catch (error) {
    console.error('❌ Error in complete flow test:', error.message);
    return null;
  }
}

// Run the test
testCompleteFlow()
  .then(assessmentId => {
    if (assessmentId) {
      console.log(`\n🎉 Complete flow test completed!`);
      console.log(`Assessment ID: ${assessmentId}`);
      console.log('\n📬 Check your email for notifications!');
    }
  })
  .catch(console.error);
