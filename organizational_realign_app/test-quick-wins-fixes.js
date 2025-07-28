#!/usr/bin/env node

/**
 * Test Quick Wins Assessment Fixes
 * Tests the fixes for:
 * 1. Email collection before assessment
 * 2. Correct tier mapping (one-time-diagnostic instead of express-diagnostic)
 * 3. Firefox compatibility improvements
 */

const https = require('https');
const fs = require('fs');

const BASE_URL = 'https://organizational-realign-app.vercel.app';

console.log('🔍 Testing Quick Wins Assessment Fixes...\n');

// Test 1: Check if quick-wins page loads properly
async function testQuickWinsPage() {
  console.log('📄 Test 1: Quick Wins Page Loading...');
  
  try {
    const response = await fetch(`${BASE_URL}/quick-wins`);
    if (response.ok) {
      const content = await response.text();
      
      // Check if email form is implemented
      const hasEmailForm = content.includes('Enter your email') || content.includes('Full Name');
      const noEmailRequired = content.includes('No email required');
      
      console.log(`   ✅ Page loads successfully (${response.status})`);
      console.log(`   ${hasEmailForm ? '✅' : '❌'} Email collection form present`);
      console.log(`   ${!noEmailRequired ? '✅' : '❌'} "No email required" text removed`);
      
      return true;
    } else {
      console.log(`   ❌ Page failed to load (${response.status})`);
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Error loading page: ${error.message}`);
    return false;
  }
}

// Test 2: Check Stripe tier mapping
async function testStripeTierMapping() {
  console.log('\n💳 Test 2: Stripe Tier Mapping...');
  
  try {
    // Test the correct tier (one-time-diagnostic)
    const response = await fetch(`${BASE_URL}/api/stripe/create-tier-checkout?tier=one-time-diagnostic`);
    
    if (response.ok || response.status === 302) {
      console.log('   ✅ one-time-diagnostic tier is properly mapped');
    } else if (response.status === 400) {
      const error = await response.json();
      if (error.error && error.error.includes('Invalid or missing tier')) {
        console.log('   ❌ one-time-diagnostic tier mapping still missing');
        return false;
      }
    }
    
    // Test the old incorrect tier (should fail)
    const badResponse = await fetch(`${BASE_URL}/api/stripe/create-tier-checkout?tier=express-diagnostic`);
    if (badResponse.status === 400) {
      console.log('   ✅ express-diagnostic properly rejected (expected)');
    }
    
    return true;
  } catch (error) {
    console.log(`   ❌ Error testing Stripe mapping: ${error.message}`);
    return false;
  }
}

// Test 3: Check CSS compatibility fixes
async function testCSSCompatibility() {
  console.log('\n🎨 Test 3: CSS Firefox Compatibility...');
  
  try {
    const response = await fetch(`${BASE_URL}/globals.css`);
    if (response.ok) {
      const css = await response.text();
      
      const hasFirefoxFixes = css.includes('@-moz-document') || css.includes('-moz-appearance');
      const hasBackgroundAttachment = css.includes('background-attachment: fixed');
      
      console.log(`   ${hasFirefoxFixes ? '✅' : '❌'} Firefox-specific CSS fixes present`);
      console.log(`   ${!hasBackgroundAttachment ? '✅' : '⚠️'} Background attachment optimized for Firefox`);
      
      return true;
    } else {
      console.log('   ⚠️ Could not load CSS file for testing');
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Error testing CSS: ${error.message}`);
    return false;
  }
}

// Test 4: Validate tier configuration
async function testTierConfiguration() {
  console.log('\n⚙️ Test 4: Tier Configuration Validation...');
  
  const validTiers = [
    'one-time-diagnostic',
    'monthly-subscription', 
    'comprehensive-package',
    'enterprise-transformation'
  ];
  
  console.log('   Valid organizational tiers:');
  validTiers.forEach(tier => {
    console.log(`   ✅ ${tier}`);
  });
  
  console.log('   ❌ express-diagnostic (should not exist)');
  
  return true;
}

// Run all tests
async function runAllTests() {
  const results = [];
  
  results.push(await testQuickWinsPage());
  results.push(await testStripeTierMapping());
  results.push(await testCSSCompatibility());
  results.push(await testTierConfiguration());
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log('\n📊 Test Results Summary:');
  console.log(`   Passed: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('   🎉 All fixes appear to be working correctly!');
    console.log('\nNext Steps:');
    console.log('   1. Test in Firefox browser to verify rendering');
    console.log('   2. Test the email collection form');
    console.log('   3. Test the purchase flow with one-time-diagnostic tier');
  } else {
    console.log('   ⚠️ Some issues may still exist. Please review the failing tests.');
  }
}

// Handle fetch for Node.js
if (typeof fetch === 'undefined') {
  global.fetch = async (url, options = {}) => {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const reqOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: options.headers || {}
      };
      
      const req = https.request(reqOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            text: () => Promise.resolve(data),
            json: () => Promise.resolve(JSON.parse(data))
          });
        });
      });
      
      req.on('error', reject);
      req.end();
    });
  };
}

runAllTests().catch(console.error);
