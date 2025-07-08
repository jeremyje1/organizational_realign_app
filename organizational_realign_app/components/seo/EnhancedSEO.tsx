'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
  noIndex?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

interface EnhancedSEOProps extends SEOData {
  children?: React.ReactNode;
}

export default function EnhancedSEO({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = '/og-homepage.png',
  structuredData,
  noIndex = false,
  author = 'Jeremy Estrella',
  publishedTime,
  modifiedTime,
  children
}: EnhancedSEOProps) {
  const pathname = usePathname();
  const baseUrl = 'https://app.northpathstrategies.org';
  const fullUrl = canonicalUrl || `${baseUrl}${pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Create or update meta tags
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    if (keywords.length > 0) {
      updateMeta('keywords', keywords.join(', '));
    }
    updateMeta('author', author);
    
    // Robots
    updateMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    
    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:image', `${baseUrl}${ogImage}`, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:site_name', 'NorthPath Strategies', true);
    
    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', `${baseUrl}${ogImage}`);
    updateMeta('twitter:creator', '@northpathstrat');
    
    // Article specific
    if (publishedTime) {
      updateMeta('article:published_time', publishedTime, true);
    }
    if (modifiedTime) {
      updateMeta('article:modified_time', modifiedTime, true);
    }
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // Structured data
    if (structuredData) {
      let script = document.querySelector('script[data-seo-structured]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-structured', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

  }, [title, description, keywords, fullUrl, ogImage, structuredData, noIndex, author, publishedTime, modifiedTime, baseUrl]);

  return <>{children}</>;
}

// Page-specific SEO configurations
export const SEOConfigs = {
  home: {
    title: 'Reduce Operating Costs by 23% in 90 Days - NorthPath Strategies',
    description: 'Fortune 500 results for organizations seeking rapid cost reduction and operational excellence. Free assessment delivers $2.4M average annual savings in under 15 minutes.',
    keywords: [
      'cost reduction consulting',
      'operational efficiency',
      'business transformation',
      'organizational optimization',
      'fortune 500 consulting',
      'cost savings analysis',
      'business process improvement'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NorthPath Strategies',
      description: 'Strategic organizational realignment consulting delivering 23% cost reduction in 90 days',
      url: 'https://app.northpathstrategies.org',
      logo: 'https://app.northpathstrategies.org/images/northpath-logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        email: 'info@northpathstrategies.org',
        contactType: 'customer service'
      },
      offers: {
        '@type': 'Service',
        name: 'Organizational Assessment',
        description: 'Free 15-minute assessment identifying $2.4M average annual savings opportunities'
      }
    }
  },
  
  assessment: {
    title: 'Free Organizational Assessment - Identify $2.4M+ Savings - NorthPath',
    description: 'Complete our 15-minute assessment to discover hidden cost reduction opportunities. 95% success rate with Fortune 500 methodologies.',
    keywords: [
      'organizational assessment',
      'cost reduction analysis',
      'business efficiency audit',
      'operational assessment',
      'free business analysis'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Organizational Assessment',
      provider: {
        '@type': 'Organization',
        name: 'NorthPath Strategies'
      },
      description: 'Comprehensive organizational assessment identifying cost reduction opportunities',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free 15-minute organizational assessment'
      }
    }
  },

  pricing: {
    title: 'Pricing & Packages - ROI-Focused Consulting - NorthPath Strategies',
    description: 'Risk-free consulting packages with 10-30x ROI guarantee. Pay after results. Start saving with our proven Fortune 500 methodologies.',
    keywords: [
      'consulting pricing',
      'roi guarantee',
      'risk free consulting',
      'business transformation cost',
      'consulting packages'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Strategic Consulting Services',
      provider: {
        '@type': 'Organization',
        name: 'NorthPath Strategies'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Consulting Packages',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Assessment Package'
            }
          }
        ]
      }
    }
  },

  contact: {
    title: 'Contact NorthPath Strategies - Schedule Free Consultation',
    description: 'Get in touch with our organizational transformation experts. Schedule a free consultation to discuss your cost reduction goals.',
    keywords: [
      'contact consulting firm',
      'schedule consultation',
      'business transformation contact',
      'organizational consulting contact'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      mainEntity: {
        '@type': 'Organization',
        name: 'NorthPath Strategies',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-123-4567',
          email: 'info@northpathstrategies.org',
          contactType: 'customer service',
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          }
        }
      }
    }
  }
};

// Breadcrumb component with structured data
interface BreadcrumbProps {
  items: Array<{
    name: string;
    url?: string;
  }>;
}

export function SEOBreadcrumbs({ items }: BreadcrumbProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `https://app.northpathstrategies.org${item.url}` : undefined
    }))
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    script.setAttribute('data-breadcrumb-structured', 'true');
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[data-breadcrumb-structured]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [structuredData]);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {item.url ? (
              <a 
                href={item.url} 
                className="hover:text-emerald-600 transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <span className="text-gray-900 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// FAQ component with structured data
interface FAQItem {
  question: string;
  answer: string;
}

interface SEOFAQProps {
  items: FAQItem[];
  className?: string;
}

export function SEOFAQ({ items, className = "" }: SEOFAQProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    script.setAttribute('data-faq-structured', 'true');
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[data-faq-structured]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [structuredData]);

  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {item.question}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
