#!/usr/bin/env node

/**
 * Test Results Email System
 * Tests sending actual analysis results to clients
 */

require('dotenv').config({ path: '.env.local' });

console.log('📧 Testing Results Email System\n');

async function testResultsEmail() {
  const testAssessmentId = '49d3add3-09d5-46ca-a366-c8f1048bbcdc';
  
  try {
    console.log('🧪 Testing via GET endpoint (quick test)...');
    
    const getResponse = await fetch(`http://localhost:3001/api/send-results-email?assessmentId=${testAssessmentId}`);
    const getResult = await getResponse.json();
    
    if (getResponse.ok) {
      console.log('✅ GET test successful!');
      console.log('📊 Result:', getResult);
    } else {
      console.log('❌ GET test failed:', getResult.error);
    }

    console.log('\n🧪 Testing via POST endpoint (with custom data)...');
    
    const postData = {
      assessmentId: testAssessmentId,
      clientEmail: 'jeremy.estrella@gmail.com',
      clientName: 'Jeremy Estrella',
      tier: 'basic-organizational-health',
      organizationType: 'Healthcare',
      institutionName: 'Advanced Healthcare Organization',
      analysisData: {
        leadership: { score: 0.8, areas: ['Strategic Vision', 'Team Management'] },
        operations: { score: 0.6, areas: ['Process Efficiency', 'Resource Allocation'] },
        culture: { score: 0.9, areas: ['Team Collaboration', 'Innovation'] }
      },
      recommendationsPreview: 'Your organization shows strong leadership and cultural foundations. Key focus areas include optimizing operational processes and enhancing cross-departmental communication. Immediate priorities: implement standardized workflows and establish regular feedback cycles.',
      overallScore: 0.75
    };

    const postResponse = await fetch('http://localhost:3001/api/send-results-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    const postResult = await postResponse.json();
    
    if (postResponse.ok) {
      console.log('✅ POST test successful!');
      console.log('📊 Result:', postResult);
      console.log('\n📧 Email Details:');
      console.log(`✉️  Sent to: ${postData.clientEmail}`);
      console.log(`📋 Assessment ID: ${postData.assessmentId}`);
      console.log(`🎯 Overall Score: ${Math.round(postData.overallScore * 100)}%`);
      console.log(`🏢 Institution: ${postData.institutionName}`);
    } else {
      console.log('❌ POST test failed:', postResult.error);
    }

    // Show the URLs that were included in the email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org';
    console.log('\n🔗 URLs included in the email:');
    console.log(`📊 Results Page: ${baseUrl}/assessment/results?assessmentId=${testAssessmentId}`);
    console.log(`📅 Calendly: ${process.env.CALENDLY_URL || 'https://calendly.com/jeremyestrella/30min'}`);
    console.log(`📧 Support: support@northpathstrategies.org`);

    return { success: true };

  } catch (error) {
    console.error('❌ Error testing results email system:', error.message);
    return { success: false, error: error.message };
  }
}

// Run the test
testResultsEmail()
  .then((result) => {
    if (result.success) {
      console.log('\n🎉 Results email system test completed successfully!');
      console.log('\n📬 Check your email for the analysis results!');
      console.log('📋 The email should now contain actual analysis data and recommendations.');
    } else {
      console.log('\n❌ Results email system test failed:', result.error);
    }
  })
  .catch(console.error);
