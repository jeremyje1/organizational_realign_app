// Quick email test script
// Run: node scripts/test-email-quick.js

require('dotenv').config({ path: '.env.local' });

async function testEmails() {
  console.log('🧪 Testing Email Configuration...\n');
  
  // Check environment
  const hasSendGrid = !!process.env.SENDGRID_API_KEY;
  const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  
  console.log('Email Configuration Status:');
  console.log(`SendGrid API Key: ${hasSendGrid ? '✅ Set' : '❌ Missing'}`);
  console.log(`SMTP Configuration: ${hasSmtp ? '✅ Set' : '❌ Missing'}`);
  
  if (!hasSendGrid && !hasSmtp) {
    console.log('\n❌ No email configuration found!');
    console.log('Add either:');
    console.log('- SENDGRID_API_KEY=your_key');
    console.log('- OR SMTP_HOST, SMTP_USER, SMTP_PASS');
    return;
  }
  
  // Dynamic import of email notifications
  try {
    const { default: EmailNotifications } = await import('../lib/email-notifications.js');
    const emailService = new EmailNotifications();
    
    // Test client email
    const testData = {
      assessmentId: 'test-' + Date.now(),
      organizationName: 'Test Organization',
      contactName: 'Jeremy Estrella',
      contactEmail: 'jeremy.estrella@gmail.com',
      tier: 'one-time-diagnostic',
      organizationType: 'higher-education'
    };
    
    console.log('\n📧 Sending test emails...');
    
    const clientResult = await emailService.sendAssessmentConfirmation(
      { email: testData.contactEmail, name: testData.contactName },
      testData
    );
    
    const supportResult = await emailService.sendNewAssessmentNotification(
      { email: 'info@northpathstrategies.org', name: 'Support Team' },
      testData
    );
    
    console.log('\n✅ Test Results:');
    console.log(`Client Email: ${clientResult ? 'SENT ✅' : 'LOGGED (Dev Mode) 📝'}`);
    console.log(`Support Email: ${supportResult ? 'SENT ✅' : 'LOGGED (Dev Mode) 📝'}`);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
  }
}

testEmails();
