# Page-Specific SEO Implementation Guide

This guide explains how to implement page-specific SEO for all routes in the NorthPath Strategies application.

## Static vs Dynamic SEO

### Static Metadata (Server Components)
For server components, use Next.js's built-in Metadata API:

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title - NorthPath Strategies',
  description: 'Detailed description of the page content.',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  // Additional metadata
};
```

### Dynamic SEO (Client Components)
For client components or dynamic content, use the DynamicSEO component:

```tsx
'use client';

import DynamicSEO from '@/components/seo/DynamicSEO';

export default function YourPage() {
  // Dynamic data
  const pageTitle = dynamicData.title;
  
  return (
    <>
      <DynamicSEO 
        title={`${pageTitle} - NorthPath Strategies`}
        description="Description that can include dynamic data"
        keywords={['keyword1', 'keyword2']}
        ogImage="/path/to/specific-image.jpg"
      />
      
      {/* Page content */}
    </>
  );
}
```

## Guidelines for Effective SEO

1. **Page Titles**: Keep titles under 60 characters, format as `[Page Name] - NorthPath Strategies`
2. **Descriptions**: 120-160 characters, include primary keywords naturally
3. **Keywords**: 3-5 relevant keywords per page
4. **Images**: Always use the ResponsiveImage component with descriptive alt text

## Structured Data

Add structured data to improve search results with the StructuredData component:

```tsx
import StructuredData from '@/components/seo/StructuredData';

// In your component
<StructuredData 
  data={{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Organizational Assessment",
    "description": "Professional assessment of your organization's structure",
    "provider": {
      "@type": "Organization",
      "name": "NorthPath Strategies"
    }
  }} 
/>
```

## Page-Specific SEO Checklist

- [ ] Update all page.tsx files with appropriate metadata
- [ ] Replace standard Image components with ResponsiveImage
- [ ] Add structured data where appropriate
- [ ] Verify metadata in the browser's inspect tool
- [ ] Test with Lighthouse's SEO audit

## Performance Considerations

- Keep metadata concise to improve page load times
- Use the dynamic sitemap generation API for up-to-date sitemaps
- Ensure robots.txt properly directs search engines

## Testing SEO Implementation

Run the SEO verification script to check your implementation:

```bash
npm run verify-seo
```

This will analyze your pages and report any missing SEO elements.
