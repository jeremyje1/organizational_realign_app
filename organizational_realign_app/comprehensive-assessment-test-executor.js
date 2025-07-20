#!/usr/bin/env node

/**
 * Comprehensive Assessment Test Executor
 * Executes individual tests from the testing plan
 * 
 * Usage: node comprehensive-assessment-test-executor.js [testNumber]
 * Example: node comprehensive-assessment-test-executor.js 1
 */

const { testCombinations } = require('./comprehensive-assessment-testing-plan.js');
const { execSync } = require('child_process');

// Get test number from command line argument
const testNumber = process.argv[2] ? parseInt(process.argv[2]) : 1;

if (testNumber < 1 || testNumber > 25) {
  console.log('❌ Invalid test number. Please specify 1-25.');
  console.log('Usage: node comprehensive-assessment-test-executor.js [testNumber]');
  process.exit(1);
}

const currentTest = testCombinations[testNumber - 1];

if (!currentTest) {
  console.log('❌ Test not found.');
  process.exit(1);
}

console.log('🧪 COMPREHENSIVE ASSESSMENT TESTING');
console.log('===================================\n');

console.log(`🎯 EXECUTING TEST ${testNumber}/25`);
console.log(`📋 Organization: ${currentTest.organizationType.toUpperCase()}`);
console.log(`💰 Tier: ${currentTest.pricingTier.toUpperCase()}`);
console.log(`🔗 URL: ${currentTest.url}`);
console.log(`📧 Test Email: ${currentTest.testContact}`);
console.log(`🏢 Institution: ${currentTest.institutionName}\n`);

// Test execution steps
console.log('📝 TESTING STEPS:');
console.log('=================');
console.log('1. Opening assessment URL...');

// Open the URL in browser
try {
  const openCommand = process.platform === 'darwin' ? 'open' : 
                     process.platform === 'win32' ? 'start' : 'xdg-open';
  execSync(`${openCommand} "${currentTest.url}"`);
  console.log('✅ Assessment URL opened in browser');
} catch (error) {
  console.log('⚠️  Could not auto-open URL. Please manually navigate to:');
  console.log(`   ${currentTest.url}`);
}

console.log('\n📋 MANUAL TESTING CHECKLIST:');
console.log('============================');
console.log('□ 1. Assessment page loads correctly');
console.log('□ 2. Industry-specific questions appear');
console.log('□ 3. Correct number of questions for tier');
console.log('□ 4. All form fields work properly');
console.log('□ 5. Assessment submits successfully');
console.log('□ 6. Confirmation page appears');
console.log('□ 7. Results email sent to test contact');
console.log('□ 8. Admin notification email received');
console.log('□ 9. Assessment appears in admin dashboard');
console.log('□ 10. PDF generation works (if applicable)');
console.log('□ 11. Org chart features work (if applicable)');
console.log('□ 12. AI features work (if applicable)');

console.log('\n📊 EXPECTED FEATURES FOR THIS TIER:');
console.log('====================================');

// Define tier-specific features
const tierFeatures = {
  'express-diagnostic': [
    '✓ Basic assessment questions',
    '✓ PDF report generation',
    '✓ Email delivery'
  ],
  'one-time-diagnostic': [
    '✓ Extended assessment questions',
    '✓ Detailed PDF report',
    '✓ Email delivery',
    '✓ Basic recommendations'
  ],
  'monthly-subscription': [
    '✓ Full assessment suite',
    '✓ Comprehensive PDF reports',
    '✓ Email delivery',
    '✓ Monthly reporting access',
    '✓ Enhanced analytics'
  ],
  'comprehensive-package': [
    '✓ Complete assessment suite',
    '✓ Advanced PDF reports',
    '✓ Email delivery',
    '✓ Org chart integration',
    '✓ Advanced analytics',
    '✓ Scenario modeling'
  ],
  'enterprise-transformation': [
    '✓ Full enterprise assessment',
    '✓ Premium PDF reports',
    '✓ Email delivery',
    '✓ Advanced org chart features',
    '✓ AI-powered insights',
    '✓ Complete analytics suite',
    '✓ Scenario modeling',
    '✓ Custom recommendations'
  ]
};

const features = tierFeatures[currentTest.pricingTier] || ['✓ Standard features'];
features.forEach(feature => console.log(`  ${feature}`));

console.log('\n🔍 ADMIN VERIFICATION STEPS:');
console.log('============================');
console.log('1. Open admin dashboard: https://app.northpathstrategies.org/admin');
console.log('2. Login with password: stardynamics1124*');
console.log('3. Check "Assessments" tab for new submission');
console.log('4. Verify assessment details match test data');
console.log('5. Check email notifications were sent');

console.log('\n⏭️  NEXT STEPS:');
console.log('===============');
if (testNumber < 25) {
  console.log(`After completing this test, run:`);
  console.log(`node comprehensive-assessment-test-executor.js ${testNumber + 1}`);
} else {
  console.log('🎉 This is the final test! After completion, all 25 combinations will be tested.');
}

console.log('\n📝 TEST RESULT LOGGING:');
console.log('=======================');
console.log('Please document results in: test-results-log.txt');
console.log(`Format: TEST-${testNumber}: ${currentTest.organizationType}-${currentTest.pricingTier} - [PASS/FAIL] - [Notes]`);

// Create or append to results log file
const fs = require('fs');
const logEntry = `\n--- TEST ${testNumber}/25: ${currentTest.organizationType.toUpperCase()} × ${currentTest.pricingTier.toUpperCase()} ---
Date: ${new Date().toISOString()}
URL: ${currentTest.url}
Email: ${currentTest.testContact}
Institution: ${currentTest.institutionName}
Status: [PENDING]
Notes: 
Assessment ID: 
Issues: 
---\n`;

try {
  fs.appendFileSync('test-results-log.txt', logEntry);
  console.log('✅ Test entry logged to test-results-log.txt');
} catch (error) {
  console.log('⚠️  Could not write to log file');
}

console.log('\n🚀 READY TO TEST!');
console.log('=================');
console.log('Complete the checklist above and document results.');
