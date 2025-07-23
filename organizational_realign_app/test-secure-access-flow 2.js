#!/usr/bin/env node

/**
 * Test secure access email flow
 * Tests the updated email templates with secure access links
 */

const fs = require('fs');
const path = require('path');

console.log('🔐 Testing Secure Access Email Flow');
console.log('==================================\n');

// Load the environment
require('dotenv').config({ path: '.env.local' });

// Mock assessment data
const mockAssessmentData = {
  assessmentId: 'test-secure-123',
  tier: 'comprehensive-package',
  organizationType: 'higher-education',
  institutionName: 'Test University',
  clientEmail: 'jeremye@northpathstrategies.org',
  clientName: 'Jeremy Estrella',
  responseCount: 85,
  submittedAt: new Date().toISOString(),
  analysisData: {
    overallScore: 0.78,
    recommendations: [
      'Implement cross-functional team structures',
      'Enhance digital communication platforms',
      'Develop leadership development programs'
    ]
  },
  recommendationsPreview: 'Your analysis shows strong potential for organizational optimization...',
  overallScore: 0.78
};

async function testSecureEmailFlow() {
  console.log('📧 Testing Email Templates with Secure Access URLs\n');
  
  try {
    // Dynamic import for ES modules
    const { EmailNotifications } = await import('../lib/email-notifications.js');
    const emailService = new EmailNotifications();

    console.log('1. Testing Client Confirmation Email...');
    const confirmationSent = await emailService.sendAssessmentConfirmation({
      clientEmail: mockAssessmentData.clientEmail,
      clientName: mockAssessmentData.clientName,
      assessmentId: mockAssessmentData.assessmentId,
      tier: mockAssessmentData.tier,
      organizationType: mockAssessmentData.organizationType,
      institutionName: mockAssessmentData.institutionName,
      responseCount: mockAssessmentData.responseCount,
      submittedAt: mockAssessmentData.submittedAt
    });
    
    console.log(`   ✅ Confirmation email: ${confirmationSent ? 'SENT' : 'LOGGED'}`);

    console.log('\n2. Testing Support Notification Email...');
    const supportSent = await emailService.sendAssessmentSubmissionNotification({
      assessmentId: mockAssessmentData.assessmentId,
      tier: mockAssessmentData.tier,
      organizationType: mockAssessmentData.organizationType,
      institutionName: mockAssessmentData.institutionName,
      responseCount: mockAssessmentData.responseCount,
      uploadedFileCount: 0,
      submittedAt: mockAssessmentData.submittedAt
    });
    
    console.log(`   ✅ Support notification: ${supportSent ? 'SENT' : 'LOGGED'}`);

    console.log('\n3. Testing Results Email...');
    const resultsSent = await emailService.sendAssessmentResults({
      clientEmail: mockAssessmentData.clientEmail,
      clientName: mockAssessmentData.clientName,
      assessmentId: mockAssessmentData.assessmentId,
      tier: mockAssessmentData.tier,
      organizationType: mockAssessmentData.organizationType,
      institutionName: mockAssessmentData.institutionName,
      analysisData: mockAssessmentData.analysisData,
      recommendationsPreview: mockAssessmentData.recommendationsPreview,
      overallScore: mockAssessmentData.overallScore
    });
    
    console.log(`   ✅ Results email: ${resultsSent ? 'SENT' : 'LOGGED'}`);

    console.log('\n🎯 Expected Secure Access URLs:');
    console.log('================================');
    console.log(`Client Results: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org'}/assessment/secure-access?redirect=results&assessmentId=${mockAssessmentData.assessmentId}`);
    console.log(`Admin Access:   ${process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org'}/assessment/secure-access?redirect=admin&assessmentId=${mockAssessmentData.assessmentId}`);
    
    console.log('\n📋 Usage Instructions:');
    console.log('=====================');
    console.log('1. Clients receive secure access link in their email');
    console.log('2. Link takes them to: /assessment/secure-access?redirect=results&assessmentId=...');
    console.log('3. After entering password "northpath2025", they are redirected to results');
    console.log('4. Admin links work similarly but redirect to admin assessment view');
    console.log('5. Assessment ID is automatically passed through the flow');

    console.log('\n✅ Secure Access Email Flow Test Complete!');
    
  } catch (error) {
    console.error('❌ Email test failed:', error);
    process.exit(1);
  }
}

// Run the test
testSecureEmailFlow();
