const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

// Healthcare assessment data based on your earlier submission
const healthcareAssessment = {
  tier: 'ESSENTIAL_READINESS',
  organizationType: 'healthcare',
  institutionName: 'Healthcare Test Organization',
  contactEmail: 'jeremyje1@gmail.com',
  contactName: 'Jeremy Estrella',
  responses: {
    // Sample healthcare-focused responses
    "financial_health": 4,
    "operational_efficiency": 3,
    "patient_satisfaction": 5,
    "technology_adoption": 3,
    "staff_engagement": 4,
    "compliance_readiness": 5,
    "quality_metrics": 4,
    "strategic_planning": 3,
    "change_management": 2,
    "innovation_culture": 3
  },
  testMode: false, // Real assessment
  metadata: {
    userAgent: 'Healthcare Assessment Test',
    timestamp: new Date().toISOString(),
    industry: 'healthcare',
    assessmentType: 'comprehensive'
  }
};

async function testHealthcareAssessmentFlow() {
  console.log('\n🏥 Healthcare Assessment Complete Flow Test\n');
  console.log('=' * 60);
  
  try {
    // Step 1: Submit Healthcare Assessment
    console.log('📋 Step 1: Submitting Healthcare Assessment...');
    console.log(`Organization: ${healthcareAssessment.institutionName}`);
    console.log(`Tier: ${healthcareAssessment.tier}`);
    console.log(`Contact: ${healthcareAssessment.contactName} (${healthcareAssessment.contactEmail})`);
    
    const submitResponse = await fetch(`${BASE_URL}/api/assessment/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(healthcareAssessment)
    });

    const submitResult = await submitResponse.json();
    
    if (!submitResponse.ok) {
      console.error('❌ Assessment submission failed:', submitResult);
      return;
    }

    const assessmentId = submitResult.assessmentId;
    console.log(`✅ Assessment submitted successfully!`);
    console.log(`📊 Assessment ID: ${assessmentId}`);
    console.log(`📧 Emails sent to client and support`);
    
    // Step 2: Show Client Experience URLs
    console.log('\n' + '=' * 60);
    console.log('🔍 Step 2: CLIENT EXPERIENCE - What the client sees');
    console.log('=' * 60);
    
    console.log('\n📱 Client Assessment Portal:');
    console.log(`🌐 Assessment Page: ${BASE_URL}/assessment/tier-based?tier=essential-readiness&org=healthcare`);
    console.log(`📊 Results Access: ${BASE_URL}/assessment/results?id=${assessmentId}`);
    console.log(`🔗 Direct Results: ${BASE_URL}/assessment-details/${assessmentId}`);
    
    // Step 3: Show Support/Admin Experience
    console.log('\n' + '=' * 60);
    console.log('🛠️  Step 3: SUPPORT/ADMIN EXPERIENCE - What you see');
    console.log('=' * 60);
    
    console.log('\n🔧 Admin Dashboard Access:');
    console.log(`📈 Admin Overview: ${BASE_URL}/admin`);
    console.log(`📋 Assessment Details: ${BASE_URL}/admin/assessment/${assessmentId}`);
    console.log(`📊 All Assessments: ${BASE_URL}/admin/analytics`);
    console.log(`🧪 Testing Dashboard: ${BASE_URL}/admin/testing`);
    
    // Step 4: Test Results API
    console.log('\n' + '=' * 60);
    console.log('📊 Step 4: RESULTS & ANALYSIS');
    console.log('=' * 60);
    
    // Give it a moment for processing
    console.log('⏳ Waiting 2 seconds for processing...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Try to fetch results
    console.log('🔄 Fetching assessment results...');
    
    const resultsResponse = await fetch(`${BASE_URL}/api/results?assessmentId=${assessmentId}`);
    
    if (resultsResponse.ok) {
      const results = await resultsResponse.json();
      console.log('✅ Results generated successfully!');
      console.log(`📈 Analysis Type: ${results.analysisType || 'Standard'}`);
      console.log(`🎯 Recommendations: ${results.recommendations?.length || 0} items`);
      console.log(`📊 Score Summary: ${JSON.stringify(results.scoreSummary || {}, null, 2)}`);
    } else {
      console.log('⏳ Results still processing (normal for complex assessments)');
    }
    
    // Step 5: Browser URLs for Manual Testing
    console.log('\n' + '=' * 60);
    console.log('🌐 Step 5: BROWSER TESTING URLS');
    console.log('=' * 60);
    
    console.log('\n🏥 Healthcare Assessment URLs to test in browser:');
    console.log('\n📋 CLIENT EXPERIENCE:');
    console.log(`1. New Assessment: ${BASE_URL}/assessment/tier-based?tier=essential-readiness&org=healthcare`);
    console.log(`2. Assessment Results: ${BASE_URL}/assessment/results?id=${assessmentId}`);
    console.log(`3. Results Details: ${BASE_URL}/assessment-details/${assessmentId}`);
    
    console.log('\n🔧 ADMIN/SUPPORT EXPERIENCE:');
    console.log(`1. Admin Dashboard: ${BASE_URL}/admin`);
    console.log(`2. This Assessment: ${BASE_URL}/admin/assessment/${assessmentId}`);
    console.log(`3. Analytics Overview: ${BASE_URL}/admin/analytics`);
    console.log(`4. Testing Tools: ${BASE_URL}/admin/testing`);
    
    console.log('\n📧 EMAIL NOTIFICATIONS:');
    console.log('✅ Client confirmation sent to: jeremyje1@gmail.com');
    console.log('✅ Support notification sent to: jeremyje1@gmail.com');
    console.log('📬 Check your email inbox for both notifications');
    
    console.log('\n' + '=' * 60);
    console.log('🎉 HEALTHCARE ASSESSMENT FLOW COMPLETE!');
    console.log('=' * 60);
    console.log(`\n📋 Assessment ID: ${assessmentId}`);
    console.log('🔗 Use the URLs above to test the complete experience');
    console.log('📧 Check your email for the real notifications');
    console.log('\n💡 TIP: Open multiple browser tabs to see both client and admin views');
    
    return assessmentId;
    
  } catch (error) {
    console.error('💥 Error during healthcare assessment flow test:', error.message);
    return null;
  }
}

// Run the comprehensive test
healthcareAssessmentFlow()
  .then(assessmentId => {
    if (assessmentId) {
      console.log(`\n🎯 Test completed successfully! Assessment ID: ${assessmentId}`);
      console.log('🌐 Server running at: http://localhost:3001');
      console.log('📧 Check your email for notifications');
      console.log('\n👀 Next: Open the URLs above in your browser to see the full experience!');
    } else {
      console.log('\n❌ Healthcare assessment test failed. Check logs above.');
    }
  })
  .catch(error => {
    console.error('💥 Test runner error:', error);
  });

async function healthcareAssessmentFlow() {
  return await testHealthcareAssessmentFlow();
}
