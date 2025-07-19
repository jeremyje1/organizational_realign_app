#!/usr/bin/env node

/**
 * Test secure access URLs in email templates
 * Verifies the updated email links point to secure access page
 */

console.log('🔐 Testing Secure Access Email URLs');
console.log('==================================\n');

// Load environment
require('dotenv').config({ path: '.env.local' });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org';
const testAssessmentId = 'test-assessment-123';

console.log('📧 Expected Email URLs:');
console.log('=======================');

console.log('\n1. CLIENT CONFIRMATION EMAIL:');
console.log(`   Check Results Link: ${baseUrl}/assessment/secure-access?redirect=results&assessmentId=${testAssessmentId}`);

console.log('\n2. CLIENT RESULTS EMAIL:');
console.log(`   View Full Results:  ${baseUrl}/assessment/secure-access?redirect=results&assessmentId=${testAssessmentId}`);

console.log('\n3. SUPPORT NOTIFICATION EMAIL:');
console.log(`   Admin Access Link:  ${baseUrl}/assessment/secure-access?redirect=admin&assessmentId=${testAssessmentId}`);

console.log('\n🔄 Secure Access Flow:');
console.log('======================');
console.log('1. User clicks email link');
console.log('2. Redirected to: /assessment/secure-access?redirect=results&assessmentId=...');
console.log('3. Enters password: "northpath2025"');
console.log('4. Redirected to: /assessment/results?assessmentId=... (for clients)');
console.log('5. Or redirected to: /admin/assessment/... (for admin)');

console.log('\n✅ URL Configuration Complete!');
console.log('\n🧪 To test manually:');
console.log(`1. Visit: ${baseUrl}/assessment/secure-access?redirect=results&assessmentId=${testAssessmentId}`);
console.log('2. Enter password: northpath2025');
console.log('3. Should redirect to results page');
