#!/usr/bin/env node

/**
 * Final test of both express-diagnostic and one-time-diagnostic tiers after Stripe fix
 */

const API_BASE = 'https://organizational-realign-q1sz1bc8y-jeremys-projects-73929cad.vercel.app';

async function testTierCheckout(tier, tierName) {
  console.log(`\n🧪 Testing ${tierName} (${tier}) checkout...`);
  
  try {
    const response = await fetch(`${API_BASE}/api/stripe/create-tier-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tier: tier,
        successUrl: `${API_BASE}/assessment/tier-based?tier=${tier}`,
        cancelUrl: `${API_BASE}/pricing`
      })
    });

    console.log(`Status: ${response.status}`);
    
    if (response.status === 307) {
      const location = response.headers.get('location');
      console.log(`✅ SUCCESS: Redirects to Stripe checkout`);
      console.log(`Location: ${location?.substring(0, 80)}...`);
      return true;
    } else if (response.status >= 400) {
      const errorText = await response.text();
      console.log(`❌ ERROR: ${errorText}`);
      return false;
    } else {
      console.log(`⚠️  UNEXPECTED: Status ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ REQUEST FAILED: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Final test of both tiers after Stripe price ID fix');
  console.log(`Testing API: ${API_BASE}`);
  
  const results = [];
  
  // Test both tiers
  results.push(await testTierCheckout('express-diagnostic', 'Express Diagnostic ($2,495)'));
  results.push(await testTierCheckout('one-time-diagnostic', 'One-Time Diagnostic ($4,995)'));
  
  // Summary
  console.log('\n📊 FINAL TEST RESULTS:');
  console.log('========================');
  console.log(`Express Diagnostic: ${results[0] ? '✅ WORKING' : '❌ FAILED'}`);
  console.log(`One-Time Diagnostic: ${results[1] ? '✅ WORKING' : '❌ FAILED'}`);
  
  const allPassed = results.every(r => r);
  console.log(`\n🎯 Overall Status: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  if (allPassed) {
    console.log('\n🎉 SUCCESS: Both paid tiers are now working correctly!');
    console.log('   - Express-diagnostic tier: ✅ Working');
    console.log('   - One-time-diagnostic tier: ✅ Working');
    console.log('   - Stripe integration: ✅ Fixed');
  }
}

main().catch(console.error);
