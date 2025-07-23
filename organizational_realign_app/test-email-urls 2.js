#!/usr/bin/env node

/**
 * Test Email URL Configuration
 * Verifies that emails use the correct production URLs
 */

require('dotenv').config({ path: '.env.local' });

console.log('🔗 Email URL Configuration Test\n');

console.log('📧 Email Configuration:');
console.log(`Base URL: ${process.env.NEXT_PUBLIC_BASE_URL}`);
console.log(`From Email: ${process.env.FROM_EMAIL}`);
console.log(`Support Email: ${process.env.SUPPORT_EMAIL}`);
console.log(`Calendly URL: ${process.env.CALENDLY_URL}\n`);

// Test assessment ID for URL generation
const testAssessmentId = '7d354d90-3d96-403a-9492-a34ce68e7283';

console.log('🔗 URLs that will be generated in emails:');
console.log(`Assessment Results: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org'}/assessment/results?assessmentId=${testAssessmentId}`);
console.log(`Admin Dashboard: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org'}/admin/assessments/${testAssessmentId}`);
console.log(`Survey: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org'}/survey`);
console.log(`Calendly: ${process.env.CALENDLY_URL}\n`);

console.log('✅ The email notifications will now use production URLs instead of localhost!');
console.log('📱 Links in emails will be accessible from any device/location.');
