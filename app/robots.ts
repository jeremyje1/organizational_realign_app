import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/secure/',
        '/admin/',
        '/api/',
        '/auth/',
        '/_next/',
        '/survey/debug',
        '/survey/simple-debug',
      ],
    },
    sitemap: 'https://app.northpathstrategies.org/sitemap.xml',
  }
}
