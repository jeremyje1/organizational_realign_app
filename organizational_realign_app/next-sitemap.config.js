/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://northpathstrategies.org',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    additionalSitemaps: [
      'https://app.northpathstrategies.org/sitemap.xml',
      'https://app.northpathstrategies.org/api/sitemap',
    ],
  },
  exclude: [
    '/admin*',
    '/api/*',
    '/private/*',
    '/404',
    '/500',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  outDir: './public',
  transform: async (config, path) => {
    // Custom priority rules based on path
    let priority = config.priority;
    
    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
    } 
    // Main sections get high priority
    else if (path.match(/^\/[^/]+\/?$/)) {
      priority = 0.8;
    } 
    // Deeper pages get lower priority
    else if (path.split('/').length > 2) {
      priority = 0.5;
    }
    
    // Change frequency based on content type
    let changefreq = config.changefreq;
    if (path === '/' || path.includes('/blog')) {
      changefreq = 'daily';
    } else if (path.includes('/services') || path.includes('/products')) {
      changefreq = 'weekly';
    } else {
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
