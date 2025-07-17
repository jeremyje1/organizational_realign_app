// scripts/test-email-production.js
// Quick test to verify email functionality

const EmailNotifications = require('../lib/email-notifications.ts').default;

async function testEmailSystem() {
  console.log('🧪 Testing Email System...\n');
  
  const emailService = new EmailNotifications();
  
  // Test client confirmation email
  const testAssessmentData = {
    assessmentId: 'test-' + Date.now(),
    organizationName: 'Test Organization',
    contactName: 'Jeremy Estrella',
    contactEmail: 'jeremy.estrella@gmail.com',
    tier: 'one-time-diagnostic',
    organizationType: 'higher-education'
  };

  try {
    console.log('📧 Sending client confirmation email...');
    const clientResult = await emailService.sendAssessmentConfirmation(
      { email: testAssessmentData.contactEmail, name: testAssessmentData.contactName },
      testAssessmentData
    );
    
    console.log('📧 Sending support notification email...');
    const supportResult = await emailService.sendNewAssessmentNotification(
      { email: 'info@northpathstrategies.org', name: 'NorthPath Support' },
      testAssessmentData
    );

    console.log('\n✅ Email Test Results:');
    console.log(`Client Email: ${clientResult ? 'SENT' : 'LOGGED (Development Mode)'}`);
    console.log(`Support Email: ${supportResult ? 'SENT' : 'LOGGED (Development Mode)'}`);
    
    if (!clientResult && !supportResult) {
      console.log('\n💡 To enable real email sending:');
      console.log('1. Set SENDGRID_API_KEY in your environment');
      console.log('2. Or configure SMTP settings (SMTP_HOST, SMTP_USER, SMTP_PASS)');
      console.log('3. Redeploy to production');
    }
    
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

testEmailSystem();
