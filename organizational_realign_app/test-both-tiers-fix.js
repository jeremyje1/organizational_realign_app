#!/usr/bin/env node

/**
 * Test Both Tiers After Fix
 * Tests both express-diagnostic and one-time-diagnostic tiers
 */

const https = require('https');

console.log('🧪 Testing Both Tiers After Tier Hierarchy Fix...\n');

const testEndpoints = [
  {
    name: 'Express Diagnostic',
    url: 'https://organizational-realign-app.vercel.app/api/stripe/create-tier-checkout?tier=express-diagnostic',
    expectedBehavior: 'Should return 302/307 redirect to Stripe'
  },
  {
    name: 'One-Time Diagnostic', 
    url: 'https://organizational-realign-app.vercel.app/api/stripe/create-tier-checkout?tier=one-time-diagnostic',
    expectedBehavior: 'Should return 302/307 redirect to Stripe (was getting 500 error)'
  }
];

let testsCompleted = 0;
const results = {};

testEndpoints.forEach((endpoint, index) => {
  console.log(`${index + 1}️⃣ Testing ${endpoint.name}...`);
  console.log(`URL: ${endpoint.url}`);
  
  const req = https.get(endpoint.url, (res) => {
    results[endpoint.name] = {
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      headers: res.headers
    };
    
    console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 302 || res.statusCode === 307) {
        console.log('✅ SUCCESS: Proper redirect response');
        console.log(`Redirect to: ${res.headers.location ? 'Stripe checkout' : 'Unknown'}`);
      } else if (res.statusCode === 400) {
        console.log('❌ ERROR: 400 Bad Request - tier not recognized');
      } else if (res.statusCode === 500) {
        console.log('❌ ERROR: 500 Internal Server Error - server-side issue');
        console.log('Response preview:', data.substring(0, 100));
      } else {
        console.log(`Status: ${res.statusCode} - ${data.substring(0, 100)}`);
      }
      
      testsCompleted++;
      if (testsCompleted === testEndpoints.length) {
        showSummary();
      }
    });
  });
  
  req.on('error', (err) => {
    console.log(`❌ Network Error: ${err.message}`);
    testsCompleted++;
    if (testsCompleted === testEndpoints.length) {
      showSummary();
    }
  });
  
  req.setTimeout(10000, () => {
    console.log('❌ Request timed out');
    req.destroy();
    testsCompleted++;
    if (testsCompleted === testEndpoints.length) {
      showSummary();
    }
  });
  
  console.log(''); // Add spacing between tests
});

function showSummary() {
  console.log('\n🎯 Test Summary:');
  
  const expressResult = results['Express Diagnostic'];
  const oneTimeResult = results['One-Time Diagnostic'];
  
  if (expressResult && (expressResult.statusCode === 302 || expressResult.statusCode === 307)) {
    console.log('✅ Express Diagnostic: Working correctly');
  } else {
    console.log('❌ Express Diagnostic: Still has issues');
  }
  
  if (oneTimeResult && (oneTimeResult.statusCode === 302 || oneTimeResult.statusCode === 307)) {
    console.log('✅ One-Time Diagnostic: FIXED! No longer returning 500 error');
  } else if (oneTimeResult && oneTimeResult.statusCode === 500) {
    console.log('❌ One-Time Diagnostic: Still returning 500 error');
  } else {
    console.log('❓ One-Time Diagnostic: Unexpected response');
  }
  
  console.log('\n📋 Both tiers should now be working with:');
  console.log('- Express Diagnostic: $2,495, 75 questions');
  console.log('- One-Time Diagnostic: $4,995, 100+ questions');
  console.log('- Same base question access (tier level 1)');
  console.log('- Proper Stripe checkout integration');
}
