const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

// Test assessment to verify email configuration
const testAssessment = {
  tier: 'ESSENTIAL_READINESS',
  organizationType: 'healthcare',
  institutionName: 'Email Test Healthcare Organization',
  contactEmail: 'jeremy.estrella@gmail.com',
  contactName: 'Jeremy Estrella',
  responses: {
    "q1": 4,
    "q2": 3,
    "q3": 5,
    "q4": 2,
    "q5": 4
  },
  testMode: false,
  metadata: {
    userAgent: 'Email Configuration Test',
    timestamp: new Date().toISOString()
  }
};

async function testEmailConfiguration() {
  console.log('\n📧 Testing Email Configuration Fix\n');
  console.log('=' * 50);
  
  try {
    console.log('📋 Submitting test assessment...');
    console.log(`Client Email: ${testAssessment.contactEmail}`);
    console.log(`Support Email: Should go to jeremy.estrella@gmail.com`);
    console.log(`From Email: info@northpathstrategies.org`);
    
    const response = await fetch(`${BASE_URL}/api/assessment/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testAssessment)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('\n✅ Assessment submitted successfully!');
      console.log(`📊 Assessment ID: ${result.assessmentId}`);
      console.log('\n📧 Expected Email Delivery:');
      console.log(`✉️  Client Confirmation → ${testAssessment.contactEmail}`);
      console.log(`✉️  Support Notification → jeremy.estrella@gmail.com`);
      console.log(`📤 From Address: info@northpathstrategies.org`);
      
      console.log('\n🔍 Check your email inbox:');
      console.log('1. Client email should arrive at jeremy.estrella@gmail.com');
      console.log('2. Support email should also arrive at jeremy.estrella@gmail.com');
      console.log('3. Both emails should be from info@northpathstrategies.org');
      
      return result.assessmentId;
    } else {
      console.error('❌ Assessment submission failed:', result);
      return null;
    }
  } catch (error) {
    console.error('💥 Error during email test:', error.message);
    return null;
  }
}

// Run the test
testEmailConfiguration()
  .then(assessmentId => {
    if (assessmentId) {
      console.log(`\n🎯 Email configuration test completed!`);
      console.log(`Assessment ID: ${assessmentId}`);
      console.log('\n📬 Both emails should now be delivered to jeremy.estrella@gmail.com');
      console.log('📧 Check your inbox within 1-2 minutes!');
    } else {
      console.log('\n❌ Email configuration test failed.');
    }
  })
  .catch(error => {
    console.error('💥 Test runner error:', error);
  });
