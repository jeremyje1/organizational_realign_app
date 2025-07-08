const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Visiting homepage...');
  await page.goto('http://localhost:3001');
  
  // Extract all navigation links
  const links = await page.evaluate(() => {
    const result = [];
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && href !== '/' && 
          !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        result.push({
          href,
          text: link.innerText.trim()
        });
      }
    });
    return result;
  });
  
  console.log('Found links:', links);
  
  // Visit each link and check if it's a 404
  const results = [];
  for (const link of links) {
    try {
      console.log(`Checking ${link.href}...`);
      // Handle fragment identifiers by first navigating to the base URL
      let url = `http://localhost:3001${link.href}`;
      let baseUrl = url;
      if (link.href.includes('#')) {
        baseUrl = url.split('#')[0];
      }
      
      const response = await page.goto(baseUrl);
      const status = response.status();
      const is404 = await page.evaluate(() => {
        return document.body.innerText.includes('404') || 
               document.body.innerText.includes('page not found') || 
               document.body.innerText.includes('This page could not be found');
      });
      
      results.push({
        href: link.href,
        text: link.text,
        status,
        is404: is404 || status === 404
      });
    } catch (e) {
      results.push({
        href: link.href,
        text: link.text,
        error: e.message
      });
    }
  }
  
  console.log('\nResults:');
  results.forEach(result => {
    if (result.is404 || result.error) {
      console.log(`❌ ${result.href} (${result.text}): ${result.status || 'Error'} ${result.error || 'Not Found'}`);
    } else {
      console.log(`✅ ${result.href} (${result.text}): ${result.status} OK`);
    }
  });

  await browser.close();
})();
