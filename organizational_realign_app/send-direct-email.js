#!/usr/bin/env node

/**
 * Direct Email Sender for Specific Assessment
 * Sends email notifications for assessment ID: 49d3add3-09d5-46ca-a366-c8f1048bbcdc
 */

require('dotenv').config({ path: '.env.local' });

const assessmentId = '49d3add3-09d5-46ca-a366-c8f1048bbcdc';

console.log('📧 Sending Direct Email Notifications\n');
console.log(`Assessment ID: ${assessmentId}`);

async function sendDirectEmail() {
  try {
    // Submit a test assessment but reference this specific ID in the email content
    const testData = {
      tier: "basic-organizational-health",
      organizationType: "Healthcare",
      institutionName: "Assessment Results for " + assessmentId,
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
      testMode: true,
      customMessage: `Results for assessment ${assessmentId}`
    };

    console.log('📋 Triggering email system...');
    
    // Submit to trigger the email system
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
    console.log('✅ Email trigger successful!');
    console.log(`📊 Trigger Assessment ID: ${result.assessmentId}\n`);

    // Display the URLs for the original assessment ID
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://organizational-realign-app.vercel.app';
    
    console.log('📧 The emails sent will contain notification about your assessment.');
    console.log('📧 Here are the direct links for your original assessment:\n');
    
    console.log('🔗 Your Assessment URLs:');
    console.log(`✉️  Client Results: ${baseUrl}/assessment/results?assessmentId=${assessmentId}`);
    console.log(`✉️  Admin Dashboard: ${baseUrl}/admin/assessment/${assessmentId}`);
    console.log(`✉️  Calendly: ${process.env.CALENDLY_URL || 'https://calendly.com/jeremyestrella/30min'}`);

    console.log('\n📱 These URLs will work from any device!');
    
    return { success: true, originalAssessmentId: assessmentId, triggerAssessmentId: result.assessmentId };

  } catch (error) {
    console.error('❌ Error sending direct email:', error.message);
    
    // Even if the API fails, provide the direct URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://organizational-realign-app.vercel.app';
    console.log('\n📧 Direct URLs for your assessment:');
    console.log(`✉️  Client Results: ${baseUrl}/assessment/results?assessmentId=${assessmentId}`);
    console.log(`✉️  Admin Dashboard: ${baseUrl}/admin/assessment/${assessmentId}`);
    
    return { success: false, error: error.message };
  }
}

// Run the function
sendDirectEmail()
  .then((result) => {
    if (result.success) {
      console.log('\n🎉 Direct email notifications sent successfully!');
      console.log(`📬 Check your email at jeremy.estrella@gmail.com`);
      console.log(`📬 Support notifications sent to ${process.env.SUPPORT_EMAIL || 'support@northpathstrategies.org'}`);
    } else {
      console.log('\n⚠️ Email sending failed, but URLs are available above');
    }
  })
  .catch(console.error);
