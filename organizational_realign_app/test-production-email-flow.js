#!/usr/bin/env node

/**
 * Test Production Email Flow
 * Simulates the real production workflow where:
 * - Client gets confirmation at their submitted email
 * - Support notification goes to support@northpathstrategies.org
 */

require('dotenv').config({ path: '.env.local' });

console.log('🚀 Testing Production Email Flow\n');

async function testProductionFlow() {
  try {
    // Test data mimicking a real client submission with correct API format
    const testData = {
      tier: "basic-organizational-health",
      organizationType: "Healthcare",
      institutionName: "Healthcare Solutions Inc",
      contactEmail: "jeremy.estrella@gmail.com",
      contactName: "Jeremy Estrella",
      responses: {
        "communication": "We have communication gaps between departments",
        "teamSize": "50-100",
        "primaryChallenge": "Communication gaps between departments"
      },
      testMode: true
    };

    console.log('📋 Test Assessment Data:');
    console.log(`Institution: ${testData.institutionName}`);
    console.log(`Industry: ${testData.organizationType}`);
    console.log(`Client Email: ${testData.contactEmail}`);
    console.log(`Support Email: ${process.env.SUPPORT_EMAIL}`);
    console.log(`From Email: ${process.env.FROM_EMAIL}`);
    console.log(`Calendly URL: ${process.env.CALENDLY_URL}\n`);

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

    console.log('📧 Production Email Flow:');
    console.log(`✉️  Client Confirmation → ${testData.contactEmail}`);
    console.log(`✉️  Support Notification → ${process.env.SUPPORT_EMAIL}`);
    console.log(`📤 From Address: ${process.env.FROM_EMAIL}\n`);

    console.log('🎯 Production flow verification:');
    console.log(`1. Client will receive confirmation at: ${testData.contactEmail}`);
    console.log(`2. Support team will be notified at: ${process.env.SUPPORT_EMAIL}`);
    console.log(`3. Client email includes Calendly link: ${process.env.CALENDLY_URL}`);
    console.log(`4. Assessment results accessible at: http://localhost:3000/assessment/results?assessmentId=${result.assessmentId}\n`);

    console.log('📬 Email delivery in progress...');
    console.log('🔍 Check both inboxes within 1-2 minutes!');

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
      console.log(`\n🎉 Production email flow test completed!`);
      console.log(`Assessment ID: ${assessmentId}`);
    }
  })
  .catch(console.error);
