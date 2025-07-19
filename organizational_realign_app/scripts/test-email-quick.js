// Quick email test script
// Run: npx tsx scripts/test-email-quick.js

import { config } from 'dotenv';
config({ path: '.env.local' });

async function testEmails() {
  console.log('🧪 Testing Email Configuration...\n');
  
  // Check environment
  const hasSendGrid = !!process.env.SENDGRID_API_KEY;
  const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  
  console.log('Email Configuration Status:');
  console.log(`SendGrid API Key: ${hasSendGrid ? '✅ Set' : '❌ Missing'}`);
  console.log(`SMTP Configuration: ${hasSmtp ? '✅ Set' : '❌ Missing'}`);
  console.log(`FROM_EMAIL: ${process.env.FROM_EMAIL || '❌ Missing'}`);
  console.log(`FROM_NAME: ${process.env.FROM_NAME || '❌ Missing'}`);
  
  if (!hasSendGrid && !hasSmtp) {
    console.log('\n❌ No email configuration found!');
    console.log('Add either:');
    console.log('- SENDGRID_API_KEY=your_key');
    console.log('- OR SMTP_HOST, SMTP_USER, SMTP_PASS');
    return;
  }
  
  console.log('\n✅ Email system is configured and ready!');
  console.log('When you submit an assessment, emails will be:');
  console.log(hasSendGrid ? '📧 SENT via SendGrid' : hasSmtp ? '📧 SENT via SMTP' : '📝 LOGGED to console');
}

testEmails();
