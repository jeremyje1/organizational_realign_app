const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Define device sizes to test
  const deviceSizes = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'Large Desktop', width: 1920, height: 1080 }
  ];
  
  // List of pages to check
  const pagesToCheck = [
    '/',
    '/about',
    '/careers',
    '/news',
    '/methodology',
    '/resources',
    '/case-studies',
    '/blog',
    '/webinars',
    '/faq',
    '/solutions/team-optimization',
    '/solutions/talent-alignment',
    '/privacy',
    '/terms',
    '/cookies',
    '/security',
    '/sitemap'
  ];
  
  console.log('Starting mobile responsiveness check...');
  
  for (const pageUrl of pagesToCheck) {
    console.log(`\n\nChecking page: ${pageUrl}`);
    
    try {
      // Check each device size
      for (const device of deviceSizes) {
        console.log(`  Testing on ${device.name} (${device.width}x${device.height})...`);
        
        // Set viewport size
        await page.setViewportSize({
          width: device.width,
          height: device.height
        });
        
        // Visit the page
        const response = await page.goto(`http://localhost:3001${pageUrl}`);
        const status = response.status();
        
        if (status !== 200) {
          console.log(`  ❌ Failed with status ${status}`);
          continue;
        }
        
        // Check for horizontal overflow
        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });
        
        if (hasHorizontalOverflow) {
          console.log(`  ⚠️ Horizontal overflow detected on ${device.name} viewport`);
        } else {
          console.log(`  ✅ No horizontal overflow on ${device.name} viewport`);
        }
        
        // Take a screenshot if needed
        // await page.screenshot({ path: `screenshots/${pageUrl.replace(/\//g, '_')}_${device.name}.png` });
      }
    } catch (error) {
      console.log(`  ❌ Error checking page ${pageUrl}: ${error.message}`);
    }
  }
  
  await browser.close();
  console.log('\nResponsiveness check completed!');
})();
