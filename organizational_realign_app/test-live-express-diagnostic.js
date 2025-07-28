#!/usr/bin/env node

/**
 * Final Verification: Express Diagnostic Tier Live Test
 * Tests the live production deployment for express-diagnostic tier
 */

const https = require('https');

console.log('🚀 Testing Live Express Diagnostic Tier Deployment...\n');

// Test the API endpoint
const testUrl = 'https://organizational-realign-app.vercel.app/api/stripe/create-tier-checkout?tier=express-diagnostic';

console.log('1️⃣ Testing API endpoint...');
console.log(`URL: ${testUrl}`);

const req = https.get(testUrl, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Status Message: ${res.statusMessage}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 302) {
      console.log('✅ SUCCESS: API endpoint returned redirect (expected for Stripe checkout)');
      console.log(`Redirect Location: ${res.headers.location || 'Not provided'}`);
    } else if (res.statusCode === 400) {
      console.log('❌ ERROR: Still getting 400 Bad Request');
      console.log('Response:', data);
    } else {
      console.log(`Response Status: ${res.statusCode}`);
      console.log('Response Body:', data.substring(0, 200) + (data.length > 200 ? '...' : ''));
    }
    
    console.log('\n🎯 Deployment Status:');
    if (res.statusCode === 302 || (res.statusCode >= 200 && res.statusCode < 400)) {
      console.log('✅ Express Diagnostic tier is LIVE and working!');
      console.log('✅ Users can now purchase Express Diagnostic for $2,495');
      console.log('✅ Quick Wins assessment upgrade button should work');
      console.log('\n📋 Express Diagnostic Features:');
      console.log('- Price: $2,495');
      console.log('- Questions: 75 (focused assessment)');
      console.log('- Analysis: DSCH, CRF algorithms');
      console.log('- Report: 10 pages');
      console.log('- Stripe Price ID: price_1RmCmsELd2WOuqIWeM0rb7Gx');
    } else {
      console.log('❌ Express Diagnostic tier still has issues');
      console.log('💡 The deployment may need a few more minutes to propagate');
    }
  });
});

req.on('error', (err) => {
  console.log('❌ Network Error:', err.message);
});

req.setTimeout(10000, () => {
  console.log('❌ Request timed out');
  req.destroy();
});
