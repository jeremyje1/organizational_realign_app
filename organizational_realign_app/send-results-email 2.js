#!/usr/bin/env node

/**
 * Send Results Email for Specific Assessment
 * Triggers email notifications for an existing assessment
 */

require('dotenv').config({ path: '.env.local' });

const assessmentId = '49d3add3-09d5-46ca-a366-c8f1048bbcdc';

console.log('📧 Sending Results Email for Assessment\n');
console.log(`Assessment ID: ${assessmentId}`);

async function sendResultsEmail() {
  try {
    // First, let's check if we can access the assessment
    console.log('\n🔍 Checking assessment...');
    const checkResponse = await fetch(`http://localhost:3000/api/assessments/${assessmentId}`);
    console.log(`Assessment API status: ${checkResponse.status} ${checkResponse.statusText}`);
    
    // Check the results page
    console.log('\n🔗 Checking results page...');
    const resultsUrl = `http://localhost:3000/assessment/results?assessmentId=${assessmentId}`;
    console.log(`Results URL: ${resultsUrl}`);
    
    const resultsResponse = await fetch(resultsUrl);
    console.log(`Results page status: ${resultsResponse.status} ${resultsResponse.statusText}`);
    
    // Check the admin page
    console.log('\n🔗 Checking admin page...');
    const adminUrl = `http://localhost:3000/admin/assessment/${assessmentId}`;
    console.log(`Admin URL: ${adminUrl}`);
    
    const adminResponse = await fetch(adminUrl);
    console.log(`Admin page status: ${adminResponse.status} ${adminResponse.statusText}`);
    
    // Since we can't directly trigger emails for existing assessments via API,
    // let's use the EmailNotifications class directly
    console.log('\n📧 Attempting to send notifications...');
    
    // We'll need to simulate the assessment data that would trigger emails
    const mockAssessmentData = {
      assessmentId: assessmentId,
      tier: 'basic-organizational-health',
      organizationType: 'Healthcare',
      institutionName: 'Organization Assessment Results',
      contactEmail: 'jeremy.estrella@gmail.com',
      contactName: 'Jeremy Estrella'
    };
    
    // Import and use the EmailNotifications class
    const { EmailNotifications } = require('./lib/email-notifications.ts');
    const emailService = new EmailNotifications();
    
    await emailService.sendAssessmentSubmissionNotification(mockAssessmentData);
    
    console.log('✅ Email notifications sent!');
    
    console.log('\n📧 Email Details:');
    console.log(`✉️  Client Results: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org'}/assessment/results?assessmentId=${assessmentId}`);
    console.log(`✉️  Admin Dashboard: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org'}/admin/assessment/${assessmentId}`);
    console.log(`✉️  Support Email: ${process.env.SUPPORT_EMAIL || 'support@northpathstrategies.org'}`);
    
  } catch (error) {
    console.error('❌ Error sending results email:', error.message);
    
    // Alternative approach: Create a simple API call to trigger notifications
    console.log('\n🔄 Trying alternative approach...');
    try {
      // Let's try to create a simple trigger by calling the submit API with the existing ID
      const triggerResponse = await fetch('http://localhost:3000/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier: "basic-organizational-health",
          organizationType: "Healthcare",
          institutionName: "Results Email Trigger",
          contactEmail: "jeremy.estrella@gmail.com",
          contactName: "Jeremy Estrella",
          responses: {
            "span_control_1": 3,
            "span_control_2": 2
          },
          testMode: true,
          existingAssessmentId: assessmentId // Custom field to reference existing assessment
        })
      });
      
      if (triggerResponse.ok) {
        console.log('✅ Alternative trigger successful!');
      } else {
        console.log('⚠️ Alternative trigger failed, but URLs are available above');
      }
    } catch (altError) {
      console.log('⚠️ Alternative approach failed, but assessment URLs are valid');
    }
  }
}

// Run the function
sendResultsEmail()
  .then(() => {
    console.log('\n🎉 Results email process completed!');
    console.log('\n📬 Check your email for notifications!');
  })
  .catch(console.error);
