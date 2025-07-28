#!/usr/bin/env node

/**
 * Final validation test using the latest production domain
 */

const LATEST_DOMAIN = 'https://organizational-realign-gmraqawqy-jeremys-projects-73929cad.vercel.app';

async function testStripeEndpoint(tier, tierName, domain) {
  console.log(`\n🧪 Testing ${tierName} checkout on ${domain}...`);
  
  try {
    const response = await fetch(`${domain}/api/stripe/create-tier-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': domain,
        'Referer': `${domain}/pricing`
      },
      body: JSON.stringify({
        tier: tier,
        successUrl: `${domain}/assessment/tier-based?tier=${tier}`,
        cancelUrl: `${domain}/pricing`
      })
    });

    console.log(`  Status: ${response.status}`);
    
    if (response.status === 200) {
      const responseData = await response.json();
      
      if (responseData.success && responseData.url && responseData.url.includes('checkout.stripe.com')) {
        console.log(`  ✅ SUCCESS: Stripe checkout session created`);
        console.log(`  🔗 Session ID: ${responseData.sessionId}`);
        console.log(`  🛒 Checkout URL: ${responseData.url.substring(0, 60)}...`);
        return true;
      } else {
        console.log(`  ❌ Unexpected response format: ${JSON.stringify(responseData)}`);
        return false;
      }
    } else {
      const responseText = await response.text();
      console.log(`  ❌ ERROR: Status ${response.status} - ${responseText.substring(0, 200)}...`);
      return false;
    }
  } catch (error) {
    console.log(`  ❌ REQUEST FAILED: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Final validation on the latest Vercel deployment');
  console.log(`Domain: ${LATEST_DOMAIN}`);
  console.log('='.repeat(80));
  
  const results = [];
  
  // Test both tiers
  results.push(await testStripeEndpoint('express-diagnostic', 'Express Diagnostic ($2,495)', LATEST_DOMAIN));
  results.push(await testStripeEndpoint('one-time-diagnostic', 'One-Time Diagnostic ($4,995)', LATEST_DOMAIN));
  
  // Summary
  console.log('\n📊 FINAL VALIDATION RESULTS:');
  console.log('='.repeat(60));
  console.log(`Express Diagnostic: ${results[0] ? '✅ WORKING' : '❌ FAILED'}`);
  console.log(`One-Time Diagnostic: ${results[1] ? '✅ WORKING' : '❌ FAILED'}`);
  
  const allWorking = results.every(r => r);
  console.log(`\n🎯 Final Status: ${allWorking ? '✅ ALL CHECKOUT FLOWS WORKING' : '❌ SOME ISSUES REMAIN'}`);
  
  if (allWorking) {
    console.log('\n🎉 COMPLETE SUCCESS!');
    console.log('The old errors were from a cached/stale deployment.');
    console.log('The latest deployment is working correctly.');
  } else {
    console.log('\n❌ Issues found - see details above');
  }
}

main().catch(console.error);
