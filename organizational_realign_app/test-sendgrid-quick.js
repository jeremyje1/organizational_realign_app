#!/usr/bin/env node

// Quick SendGrid Test Script
// Run: node test-sendgrid-quick.js

require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const sgMail = require('@sendgrid/mail');

async function testSendGrid() {
  console.log('🔍 Testing SendGrid Configuration...\n');
  
  // Check environment variables
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || 'info@northpathstrategies.org';
  
  console.log('Environment Check:');
  console.log(`├─ SENDGRID_API_KEY: ${apiKey ? '✅ Set (' + apiKey.substring(0, 10) + '...)' : '❌ Missing'}`);
  console.log(`├─ FROM_EMAIL: ${fromEmail}`);
  console.log(`└─ NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`);
  
  if (!apiKey || apiKey === 'your_sendgrid_api_key_here') {
    console.log('❌ ERROR: Please set your actual SendGrid API key in .env.local');
    console.log('   Replace "your_sendgrid_api_key_here" with your real API key\n');
    console.log('💡 Your SendGrid API key should look like: SG.aBcDeFgHiJkLmNoPqRsTuVwXyZ...\n');
    return;
  }
  
  // Initialize SendGrid
  sgMail.setApiKey(apiKey);
  
  // Test email
  const testEmail = {
    to: 'jeremy.estrella@gmail.com',
    from: fromEmail,
    subject: '🧪 SendGrid Test Email from NorthPath Strategies',
    text: 'This is a test email to verify SendGrid integration is working correctly.',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3b82f6;">🧪 SendGrid Test Email</h2>
        <p>This is a test email to verify that SendGrid integration is working correctly.</p>
        <p><strong>Sent from:</strong> NorthPath Strategies Assessment Platform</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; color: #1e40af;">✅ If you received this email, SendGrid is configured correctly!</p>
        </div>
      </div>
    `
  };
  
  try {
    console.log('📧 Sending test email...');
    await sgMail.send(testEmail);
    console.log('✅ SUCCESS: Test email sent via SendGrid!');
    console.log(`   Check ${testEmail.to} for the test email\n`);
    
    // Test support notification
    const supportEmail = {
      to: 'info@northpathstrategies.org',
      from: fromEmail,
      subject: '🔧 SendGrid Integration Test - Support Notification',
      text: 'SendGrid integration test for support notifications.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981;">🔧 SendGrid Integration Test</h2>
          <p>This is a test of the support notification system.</p>
          <p><strong>Status:</strong> SendGrid integration is working correctly</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    };
    
    console.log('📧 Sending support notification test...');
    await sgMail.send(supportEmail);
    console.log('✅ SUCCESS: Support notification sent via SendGrid!');
    console.log(`   Check ${supportEmail.to} for the support test email\n`);
    
  } catch (error) {
    console.log('❌ ERROR: Failed to send email via SendGrid');
    console.log('Error details:', error.response?.body || error.message);
    
    if (error.response?.body?.errors) {
      console.log('\nDetailed errors:');
      error.response.body.errors.forEach((err, index) => {
        console.log(`  ${index + 1}. ${err.message}`);
        if (err.field) console.log(`     Field: ${err.field}`);
      });
    }
    
    console.log('\n💡 Common issues:');
    console.log('   - Invalid API key');
    console.log('   - Sender email not verified in SendGrid');
    console.log('   - SendGrid account suspended or limited');
    console.log('   - Rate limits exceeded\n');
  }
}

if (require.main === module) {
  testSendGrid().catch(console.error);
}

module.exports = { testSendGrid };
