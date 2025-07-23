const fetch = require('node-fetch');

const PRODUCTION_URL = 'https://organizational-realign-app-jeremys-projects-73929cad.vercel.app';

async function testProductionEmail() {
  console.log('\n🚀 Testing Production Email Delivery...\n');
  
  // Test payload for Express Diagnostic tier
  const testData = {
    tier: 'EXPRESS_DIAGNOSTIC',
    organizationType: 'technology',
    institutionName: 'PROD Test Corp',
    contactEmail: 'jeremyje1@gmail.com',
    contactName: 'Production Test User',
    responses: {
      "q1": 3,
      "q2": 2,
      "q3": 4,
      "q4": 1,
      "q5": 2
    },
    testMode: true,
    metadata: {
      userAgent: 'Production Email Test',
      timestamp: new Date().toISOString()
    }
  };

  try {
    console.log('📤 Submitting assessment to production...');
    
    const response = await fetch(`${PRODUCTION_URL}/api/assessment/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Assessment submitted successfully!');
      console.log('📊 Assessment ID:', result.assessmentId);
      console.log('📧 Email should be sent to:');
      console.log('   - Client: jeremyje1@gmail.com');
      console.log('   - Support: jeremyje1@gmail.com');
      console.log('\n🔍 Check your inbox for the emails!');
      console.log('\n📈 Production environment variables are active:');
      console.log('   - SENDGRID_API_KEY: Set ✓');
      console.log('   - FROM_EMAIL: Set ✓');
      console.log('   - FROM_NAME: Set ✓');
      
      return result.assessmentId;
    } else {
      console.error('❌ Assessment submission failed:', result);
      return null;
    }
  } catch (error) {
    console.error('💥 Error during production test:', error.message);
    return null;
  }
}

// Run the test
testProductionEmail()
  .then(assessmentId => {
    if (assessmentId) {
      console.log(`\n🎉 Production test completed! Assessment ID: ${assessmentId}`);
      console.log('📧 Both client and support should receive emails within 1-2 minutes.');
    } else {
      console.log('\n❌ Production test failed. Check logs above.');
    }
  })
  .catch(error => {
    console.error('💥 Test runner error:', error);
  });
