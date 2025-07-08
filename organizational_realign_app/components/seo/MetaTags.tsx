'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  canonical?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterCreator?: string;
  children?: React.ReactNode;
}

/**
 * Component to manage meta tags for SEO
 * This is for client-side enhancement of SEO meta tags
 * For server components, use Next.js Metadata API instead
 */
export default function MetaTags({
  title,
  description,
  keywords = [],
  ogImage = '/og-image.jpg',
  ogType = 'website',
  noIndex = false,
  canonical,
  author = 'Jeremy Estrella',
  publishedTime,
  modifiedTime,
  twitterCard = 'summary_large_image',
  twitterCreator = '@northpathstrat',
  children,
}: MetaTagsProps) {
  const pathname = usePathname();
  const baseUrl = 'https://app.northpathstrategies.org';
  const url = canonical || `${baseUrl}${pathname}`;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <>
      {/* Basic Meta Tags */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        <meta name="author" content={author} />
        
        {/* Robots */}
        <meta 
          name="robots" 
          content={noIndex ? 'noindex, nofollow' : 'index, follow'} 
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href={url} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content="NorthPath Strategies" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImageUrl} />
        <meta name="twitter:creator" content={twitterCreator} />
        
        {/* Additional article info for blog posts */}
        {ogType === 'article' && publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        {ogType === 'article' && modifiedTime && (
          <meta property="article:modified_time" content={modifiedTime} />
        )}
      </Head>
      
      {children}
    </>
  );
}
