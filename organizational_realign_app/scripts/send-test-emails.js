#!/usr/bin/env node

/**
 * Test Email Sender
 * Sends example assessment emails to specific addresses for testing
 */

const nodemailer = require('nodemailer');

// For testing, we'll use a simple SMTP setup
// In production, you'd use SendGrid, AWS SES, etc.
const createTestTransporter = () => {
  // Using ethereal email for testing (creates temp mailbox)
  return nodemailer.createTestAccount().then(testAccount => {
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  });
};

const createAssessmentConfirmationEmail = (assessmentId) => {
  const formattedDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return {
    subject: '✅ Thank You! Your Organizational Assessment Has Been Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #1e40af;">NorthPath Strategies</h1>
        </div>
        
        <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
          <h2 style="color: #1e40af; margin: 0 0 10px 0;">🎉 Assessment Received Successfully!</h2>
          <p style="color: #1e40af; margin: 0; font-size: 16px;">Thank you for completing your organizational assessment with NorthPath Strategies.</p>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #374151; margin: 0 0 15px 0;">📋 Assessment Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Institution:</td>
              <td style="padding: 8px 0; color: #374151;">Test Organization (HCC)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Assessment ID:</td>
              <td style="padding: 8px 0; color: #374151; font-family: monospace;">${assessmentId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Package:</td>
              <td style="padding: 8px 0; color: #374151;">One-Time Diagnostic</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Organization Type:</td>
              <td style="padding: 8px 0; color: #374151;">Higher Education</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Submitted:</td>
              <td style="padding: 8px 0; color: #374151;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Questions Completed:</td>
              <td style="padding: 8px 0; color: #374151;">100 responses</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #92400e; margin: 0 0 15px 0;">⏰ WHAT HAPPENS NEXT:</h3>
          <div style="color: #92400e;">
            <p><strong>1. AI Analysis Processing (15-30 minutes)</strong><br>
            Our advanced AI algorithms are analyzing your responses using our proprietary organizational frameworks.</p>
            
            <p><strong>2. Expert Review (1-4 hours)</strong><br>
            Our team of organizational specialists will review and validate the AI insights.</p>
            
            <p><strong>3. Results Delivery</strong><br>
            You'll receive an email notification when your comprehensive analysis report is ready.</p>
            
            <p><strong>4. Implementation Support</strong><br>
            Our team will reach out to schedule a consultation to discuss your results and strategy.</p>
          </div>
        </div>

        <div style="background-color: #dcfce7; border: 1px solid #22c55e; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #15803d; margin: 0 0 15px 0;">📅 EXPECTED TIMELINE:</h3>
          <ul style="color: #15803d; margin: 0; padding-left: 20px;">
            <li><strong>Initial Results:</strong> Within 4-6 hours</li>
            <li><strong>Consultation Contact:</strong> Within 24 hours</li>
            <li><strong>Full Implementation Plan:</strong> Within 2-3 business days</li>
          </ul>
        </div>

        <div style="background-color: #f9fafb; border: 1px solid #d1d5db; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #374151; margin: 0 0 15px 0;">🔗 USEFUL LINKS:</h3>
          <p style="margin: 5px 0;"><a href="https://northpathstrategies.org/assessment/results?assessmentId=${assessmentId}" style="color: #3b82f6;">Check Results Status</a></p>
          <p style="margin: 5px 0;"><a href="https://northpathstrategies.org/contact" style="color: #3b82f6;">Schedule Consultation</a></p>
          <p style="margin: 5px 0;"><a href="mailto:info@northpathstrategies.org" style="color: #3b82f6;">Contact Support</a></p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Keep this email for your records. Your Assessment ID is: <strong>${assessmentId}</strong>
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
            © 2025 NorthPath Strategies. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `
ASSESSMENT CONFIRMATION - Thank You!

Your organizational assessment has been successfully received and is being processed.

Assessment Summary:
- Institution: Test Organization (HCC)
- Assessment ID: ${assessmentId}
- Package: One-Time Diagnostic
- Organization Type: Higher Education
- Submitted: ${formattedDate}
- Questions Completed: 100 responses

WHAT HAPPENS NEXT:

1. AI Analysis Processing (15-30 minutes)
   Our advanced AI algorithms are analyzing your responses using our proprietary organizational frameworks.

2. Expert Review (1-4 hours)
   Our team of organizational specialists will review and validate the AI insights.

3. Results Delivery
   You'll receive an email notification when your comprehensive analysis report is ready.

4. Implementation Support
   Our team will reach out to schedule a consultation to discuss your results and strategy.

EXPECTED TIMELINE:
- Initial Results: Within 4-6 hours
- Consultation Contact: Within 24 hours
- Full Implementation Plan: Within 2-3 business days

NEED ASSISTANCE?
- Email: info@northpathstrategies.org
- Schedule Consultation: https://northpathstrategies.org/contact
- Check Results: https://northpathstrategies.org/assessment/results?assessmentId=${assessmentId}

Keep this email for your records. Your Assessment ID is: ${assessmentId}

© 2025 NorthPath Strategies. All rights reserved.
    `
  };
};

const createSupportNotificationEmail = (assessmentId) => {
  const formattedDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return {
    subject: '🔔 New Assessment Submission - Action Required',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
          <h2 style="color: #dc2626; margin: 0 0 10px 0;">🚨 New Assessment Submission</h2>
          <p style="color: #dc2626; margin: 0; font-size: 16px;">A new organizational assessment has been submitted and requires processing.</p>
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #374151; margin: 0 0 15px 0;">📋 Assessment Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Assessment ID:</td>
              <td style="padding: 8px 0; color: #374151; font-family: monospace;">${assessmentId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Client:</td>
              <td style="padding: 8px 0; color: #374151;">Test Organization (HCC)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Contact:</td>
              <td style="padding: 8px 0; color: #374151;">jeremy.estrella@gmail.com</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Tier:</td>
              <td style="padding: 8px 0; color: #374151;">One-Time Diagnostic ($2,500)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Submitted:</td>
              <td style="padding: 8px 0; color: #374151;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Responses:</td>
              <td style="padding: 8px 0; color: #374151;">100 questions completed</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #92400e; margin: 0 0 15px 0;">⚡ ACTION REQUIRED:</h3>
          <ol style="color: #92400e; margin: 0; padding-left: 20px;">
            <li><strong>Review Assessment:</strong> Check admin panel for response details</li>
            <li><strong>Run AI Analysis:</strong> Trigger the analysis process</li>
            <li><strong>Expert Review:</strong> Validate AI insights and add recommendations</li>
            <li><strong>Generate Report:</strong> Create comprehensive analysis document</li>
            <li><strong>Contact Client:</strong> Schedule consultation within 24 hours</li>
          </ol>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <a href="http://localhost:3001/admin/assessment/${assessmentId}" 
             style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Review Assessment in Admin Panel
          </a>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            This is an automated notification from the NorthPath Strategies assessment system.
          </p>
        </div>
      </div>
    `,
    text: `
NEW ASSESSMENT SUBMISSION - Action Required

A new organizational assessment has been submitted and requires processing.

Assessment Details:
- Assessment ID: ${assessmentId}
- Client: Test Organization (HCC)
- Contact: jeremy.estrella@gmail.com
- Tier: One-Time Diagnostic ($2,500)
- Submitted: ${formattedDate}
- Responses: 100 questions completed

ACTION REQUIRED:
1. Review Assessment: Check admin panel for response details
2. Run AI Analysis: Trigger the analysis process
3. Expert Review: Validate AI insights and add recommendations
4. Generate Report: Create comprehensive analysis document
5. Contact Client: Schedule consultation within 24 hours

Review Assessment: http://localhost:3001/admin/assessment/${assessmentId}

This is an automated notification from the NorthPath Strategies assessment system.
    `
  };
};

async function sendTestEmails() {
  try {
    console.log('Creating test email transporter...');
    const transporter = await createTestTransporter();
    
    const assessmentId = '8acc6636-eab8-482f-96d2-391d691c0f10';
    
    // Client confirmation email
    const clientEmail = createAssessmentConfirmationEmail(assessmentId);
    console.log('\n📧 Sending client confirmation email...');
    const clientResult = await transporter.sendMail({
      from: 'no-reply@northpathstrategies.org',
      to: 'jeremy.estrella@gmail.com',
      subject: clientEmail.subject,
      html: clientEmail.html,
      text: clientEmail.text
    });
    
    console.log('✅ Client email sent!');
    console.log('Preview URL:', nodemailer.getTestMessageUrl(clientResult));
    
    // Support notification email
    const supportEmail = createSupportNotificationEmail(assessmentId);
    console.log('\n📧 Sending support notification email...');
    const supportResult = await transporter.sendMail({
      from: 'system@northpathstrategies.org',
      to: 'info@northpathstrategies.org',
      subject: supportEmail.subject,
      html: supportEmail.html,
      text: supportEmail.text
    });
    
    console.log('✅ Support email sent!');
    console.log('Preview URL:', nodemailer.getTestMessageUrl(supportResult));
    
    console.log('\n🎉 Test emails sent successfully!');
    console.log('\nNote: These are test emails sent to Ethereal Email (temporary mailbox).');
    console.log('In production, you would configure SendGrid or another real email service.');
    
  } catch (error) {
    console.error('❌ Failed to send test emails:', error);
  }
}

// Check if nodemailer is installed
try {
  require('nodemailer');
  sendTestEmails();
} catch (error) {
  console.log('📦 Installing nodemailer for email testing...');
  console.log('Run: npm install nodemailer');
  console.log('Then run this script again: node scripts/send-test-emails.js');
}
