#!/usr/bin/env node

/**
 * Subscription Checker Script
 * Run this as a cron job to check for expiring subscriptions and send notifications
 * 
 * Usage: node scripts/check-expiring-subscriptions.js
 */

import SubscriptionManager from '../lib/subscription-manager.js';
import emailNotifications from '../lib/email-notifications.js';

async function checkExpiringSubscriptions() {
  console.log('🔍 Checking for expiring subscriptions...');
  
  try {
    // Check subscriptions expiring in the next 7 days
    const expiring7Days = await SubscriptionManager.getExpiringSubscriptions(7);
    
    // Check subscriptions expiring in the next 3 days
    const expiring3Days = await SubscriptionManager.getExpiringSubscriptions(3);
    
    // Check subscriptions expiring in the next 1 day
    const expiring1Day = await SubscriptionManager.getExpiringSubscriptions(1);

    console.log(`📊 Found ${expiring7Days.length} subscriptions expiring in 7 days`);
    console.log(`📊 Found ${expiring3Days.length} subscriptions expiring in 3 days`);
    console.log(`📊 Found ${expiring1Day.length} subscriptions expiring in 1 day`);

    // Send 7-day notifications
    for (const subscription of expiring7Days) {
      await sendExpirationNotification(subscription, 7);
      console.log(`📧 Sent 7-day notification to ${subscription.contact_email}`);
    }

    // Send 3-day notifications
    for (const subscription of expiring3Days) {
      await sendExpirationNotification(subscription, 3);
      console.log(`📧 Sent 3-day notification to ${subscription.contact_email}`);
    }

    // Send 1-day notifications (urgent)
    for (const subscription of expiring1Day) {
      await sendExpirationNotification(subscription, 1);
      console.log(`📧 Sent 1-day URGENT notification to ${subscription.contact_email}`);
    }

    console.log('✅ Subscription check completed successfully');
    
  } catch (error) {
    console.error('❌ Error checking expiring subscriptions:', error);
    process.exit(1);
  }
}

async function sendExpirationNotification(subscription, daysRemaining) {
  try {
    const tierNames = {
      'monthly-subscription': 'Monthly Subscription',
      'comprehensive-package': 'Comprehensive Package',
      'enterprise-transformation': 'Enterprise Transformation'
    };

    const tierName = tierNames[subscription.tier] || subscription.tier;
    const expirationDate = new Date(subscription.subscription_expires_at);
    const isUrgent = daysRemaining <= 1;

    await emailNotifications.sendEmail({
      to: [{ email: subscription.contact_email, name: subscription.contact_name || 'Valued Customer' }],
      subject: isUrgent 
        ? `🚨 URGENT: Your ${tierName} expires tomorrow!`
        : `⏰ Reminder: Your ${tierName} expires in ${daysRemaining} days`,
      html: generateExpirationEmailHTML({
        tierName,
        daysRemaining,
        expirationDate,
        isUrgent,
        customerName: subscription.contact_name || 'Valued Customer'
      }),
      templateId: isUrgent ? 'urgent-expiration' : 'subscription-expiration'
    });

  } catch (error) {
    console.error(`Error sending notification to ${subscription.contact_email}:`, error);
  }
}

function generateExpirationEmailHTML({ tierName, daysRemaining, expirationDate, isUrgent, customerName }) {
  const urgentStyle = isUrgent ? 'background-color: #fef2f2; border: 2px solid #dc2626;' : 'background-color: #fefce8; border: 2px solid #d97706;';
  const urgentIcon = isUrgent ? '🚨' : '⏰';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Subscription Expiration Notice</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://app.northpathstrategies.org/logo.png" alt="NorthPath Strategies" style="height: 60px; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0;">NorthPath Strategies</h1>
        </div>

        <!-- Alert Box -->
        <div style="${urgentStyle} padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 10px 0; color: ${isUrgent ? '#dc2626' : '#d97706'};">
            ${urgentIcon} Subscription Expiration Notice
          </h2>
          <p style="margin: 0; font-size: 16px; font-weight: bold;">
            Your <strong>${tierName}</strong> subscription expires ${daysRemaining === 1 ? 'tomorrow' : `in ${daysRemaining} days`}
          </p>
        </div>

        <!-- Main Content -->
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
          <p>Hello ${customerName},</p>
          
          <p>This is a ${isUrgent ? 'final' : 'friendly'} reminder that your <strong>${tierName}</strong> subscription is set to expire on:</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <div style="background-color: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; display: inline-block;">
              <span style="font-size: 18px; font-weight: bold; color: #374151;">
                ${expirationDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>

          ${isUrgent ? `
            <p style="color: #dc2626; font-weight: bold;">
              ⚠️ To avoid service interruption, please renew your subscription immediately.
            </p>
          ` : `
            <p>
              To ensure uninterrupted access to your organizational assessment tools and features, please renew your subscription before the expiration date.
            </p>
          `}

          <p><strong>Your ${tierName} includes:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            ${tierName === 'Monthly Subscription' ? `
              <li>Unlimited assessments each month</li>
              <li>Dashboard refresh with CSV exports</li>
              <li>60-minute office hours call per month</li>
              <li>Enhanced AI opportunity analysis</li>
            ` : tierName === 'Comprehensive Package' ? `
              <li>Everything in Monthly tier plus enhancements</li>
              <li>25-30 page board-ready report</li>
              <li>90-minute strategy session</li>
              <li>Advanced scenario builder</li>
            ` : `
              <li>Enterprise-grade organizational transformation tools</li>
              <li>Unlimited scenario builder</li>
              <li>Power BI embedded dashboard</li>
              <li>API & flat-file connectors</li>
              <li>Quarterly progress audits</li>
            `}
          </ul>
        </div>

        <!-- Action Buttons -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://app.northpathstrategies.org/upgrade?tier=${tierName.toLowerCase().replace(/\s+/g, '-')}&action=renew" 
             style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin: 5px;">
            🔄 Renew Subscription
          </a>
          
          <a href="https://app.northpathstrategies.org/account/billing" 
             style="background-color: #6b7280; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin: 5px;">
            💳 Manage Billing
          </a>
        </div>

        <!-- Support -->
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #6b7280;">
            Need help? <a href="mailto:support@northpathstrategies.org" style="color: #2563eb;">Contact our support team</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>© 2025 NorthPath Strategies. All rights reserved.</p>
          <p>
            <a href="https://northpathstrategies.org/unsubscribe" style="color: #6b7280;">Unsubscribe</a> | 
            <a href="https://northpathstrategies.org/privacy" style="color: #6b7280;">Privacy Policy</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Run the check if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  checkExpiringSubscriptions().catch(console.error);
}

export default checkExpiringSubscriptions;
