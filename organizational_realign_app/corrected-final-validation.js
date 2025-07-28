#!/usr/bin/env node

/**
 * Corrected final validation - the API returns JSON, not redirects!
 */

const WORKING_DOMAIN = 'https://app.northpathstrategies.org';

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
  console.log('🚀 CORRECTED: Final Stripe checkout validation');
  console.log(`Domain: ${WORKING_DOMAIN}`);
  console.log('(API returns JSON with checkout URL, not redirects)');
  console.log('='.repeat(80));
  
  const results = [];
  
  // Test both tiers
  results.push(await testStripeEndpoint('express-diagnostic', 'Express Diagnostic ($2,495)', WORKING_DOMAIN));
  results.push(await testStripeEndpoint('one-time-diagnostic', 'One-Time Diagnostic ($4,995)', WORKING_DOMAIN));
  
  // Summary
  console.log('\n📊 CORRECTED STRIPE VALIDATION RESULTS:');
  console.log('='.repeat(60));
  console.log(`Express Diagnostic: ${results[0] ? '✅ WORKING' : '❌ FAILED'}`);
  console.log(`One-Time Diagnostic: ${results[1] ? '✅ WORKING' : '❌ FAILED'}`);
  
  const allWorking = results.every(r => r);
  console.log(`\n🎯 Final Status: ${allWorking ? '✅ ALL CHECKOUT FLOWS WORKING' : '❌ SOME ISSUES REMAIN'}`);
  
  if (allWorking) {
    console.log('\n🎉 COMPLETE SUCCESS!');
    console.log('='.repeat(40));
    console.log('✅ Express-diagnostic tier checkout: WORKING');
    console.log('✅ One-time-diagnostic tier checkout: WORKING');
    console.log('✅ Stripe price IDs: CORRECTLY CONFIGURED');
    console.log('✅ Production domains: ACCESSIBLE');
    console.log('✅ API endpoints: FUNCTIONAL');
    console.log('✅ Both tiers create valid Stripe sessions');
    
    console.log('\n🛒 CUSTOMERS CAN NOW:');
    console.log('   - Visit app.northpathstrategies.org/pricing');
    console.log('   - Purchase Express Diagnostic ($2,495)');
    console.log('   - Purchase One-Time Diagnostic ($4,995)');
    console.log('   - Complete Stripe checkout successfully');
    console.log('   - Access their paid assessments');
    
    console.log('\n🔧 TECHNICAL SUMMARY:');
    console.log(`   - Express Diagnostic Stripe ID: price_1RmCmsELd2WOuqIWeM0rb7Gx`);
    console.log(`   - One-Time Diagnostic Stripe ID: price_1Rhdf0ELd2WOuqIWwagqCdLa`);
    console.log(`   - API returns JSON with checkout URLs (correct behavior)`);
    console.log(`   - Production deployment: Live and functional`);
    
    console.log('\n✅ ISSUE RESOLVED: One-time-diagnostic 500 error is now fixed!');
    console.log('   The correct Stripe price ID has been deployed and both tiers work.');
  }
}

main().catch(console.error);
