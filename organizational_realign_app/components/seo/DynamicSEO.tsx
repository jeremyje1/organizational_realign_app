'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';
import StructuredData from './StructuredData';

interface DynamicSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  jsonLd?: Record<string, any>;
  canonical?: string;
  type?: 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'FAQPage' | 'Product' | 'Service' | 'BreadcrumbList';
}

/**
 * A component for dynamically adding SEO enhancements to any page
 * This complements the static metadata approach in Next.js
 */
export default function DynamicSEO({
  title,
  description,
  keywords = [],
  ogImage = '/og-image.jpg',
  ogType = 'website',
  noIndex = false,
  jsonLd,
  canonical,
  type,
}: DynamicSEOProps) {
  const pathname = usePathname();
  const baseUrl = 'https://app.northpathstrategies.org';
  const url = canonical || `${baseUrl}${pathname}`;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  // Default title and description if not provided
  const pageTitle = title || 'NorthPath Strategies - Organizational Realignment Solutions';
  const pageDescription = description || 'Transform your organization with our comprehensive suite of tools for organizational realignment and optimization.';

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        
        {/* Canonical Link */}
        <link rel="canonical" href={url} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={fullImageUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={fullImageUrl} />
        
        {/* Robots Control */}
        {noIndex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}
      </Head>
      
      {/* Add structured data if provided */}
      {jsonLd && <StructuredData type={type || 'WebPage'} data={jsonLd} />}
    </>
  );
}
