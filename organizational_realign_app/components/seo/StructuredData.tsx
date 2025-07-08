'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

type StructuredDataType = 
  | 'Organization' 
  | 'WebSite' 
  | 'WebPage' 
  | 'Article' 
  | 'FAQPage' 
  | 'Product' 
  | 'Service' 
  | 'BreadcrumbList';

interface StructuredDataProps {
  type: StructuredDataType;
  data?: any;
  overrides?: Record<string, any>;
}

/**
 * Component to add structured data (JSON-LD) to pages for rich results in search engines
 */
export default function StructuredData({ type, data = {}, overrides = {} }: StructuredDataProps) {
  const pathname = usePathname();
  const baseUrl = 'https://app.northpathstrategies.org';
  const currentUrl = `${baseUrl}${pathname}`;
  
  const getStructuredData = () => {
    const defaultData = {
      '@context': 'https://schema.org',
    };
    
    let schemaData = {};
    
    switch (type) {
      case 'Organization':
        schemaData = {
          '@type': 'Organization',
          name: 'NorthPath Strategies',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          sameAs: [
            'https://twitter.com/northpathstrat',
            'https://www.linkedin.com/company/northpath-strategies',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-XXX-XXX-XXXX',
            contactType: 'customer service',
            email: 'contact@northpathstrategies.org',
          },
          description: 'NorthPath Strategies offers organizational realignment solutions to transform businesses and improve efficiency.',
        };
        break;
        
      case 'WebSite':
        schemaData = {
          '@type': 'WebSite',
          name: 'NorthPath Strategies',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        };
        break;
        
      case 'WebPage':
        schemaData = {
          '@type': 'WebPage',
          '@id': currentUrl,
          url: currentUrl,
          name: data.title || 'NorthPath Strategies',
          description: data.description || 'Organizational realignment solutions for your business',
          isPartOf: {
            '@type': 'WebSite',
            '@id': baseUrl,
          },
          about: {
            '@type': 'Thing',
            name: 'Organizational Realignment',
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: data.title || 'Current Page',
                item: currentUrl,
              },
            ],
          },
        };
        break;
        
      case 'Article':
        schemaData = {
          '@type': 'Article',
          headline: data.title || 'Article Title',
          description: data.description || '',
          image: data.image ? `${baseUrl}${data.image}` : `${baseUrl}/og-image.jpg`,
          author: {
            '@type': 'Person',
            name: data.author || 'Jeremy Estrella',
          },
          publisher: {
            '@type': 'Organization',
            name: 'NorthPath Strategies',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`,
            },
          },
          datePublished: data.publishDate || new Date().toISOString(),
          dateModified: data.modifiedDate || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': currentUrl,
          },
        };
        break;
        
      case 'FAQPage':
        schemaData = {
          '@type': 'FAQPage',
          mainEntity: Array.isArray(data.questions) 
            ? data.questions.map(q => ({
                '@type': 'Question',
                name: q.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: q.answer,
                },
              }))
            : [],
        };
        break;
        
      case 'Product':
        schemaData = {
          '@type': 'Product',
          name: data.name || 'Organizational Realignment Package',
          description: data.description || 'A comprehensive solution for organizational transformation',
          image: data.image ? `${baseUrl}${data.image}` : `${baseUrl}/product-image.jpg`,
          sku: data.sku || 'NP-ORG-REALIGN-001',
          brand: {
            '@type': 'Brand',
            name: 'NorthPath Strategies',
          },
          offers: {
            '@type': 'Offer',
            url: currentUrl,
            priceCurrency: data.currency || 'USD',
            price: data.price || '999.00',
            availability: 'https://schema.org/InStock',
          },
        };
        break;
        
      case 'Service':
        schemaData = {
          '@type': 'Service',
          name: data.name || 'Organizational Realignment Service',
          description: data.description || 'Professional services to transform your organization',
          provider: {
            '@type': 'Organization',
            name: 'NorthPath Strategies',
          },
          areaServed: data.areaServed || 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Organizational Services Catalog',
            itemListElement: Array.isArray(data.services) 
              ? data.services.map((service, index) => ({
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: service.name,
                    description: service.description,
                  },
                }))
              : [],
          },
        };
        break;
        
      case 'BreadcrumbList':
        schemaData = {
          '@type': 'BreadcrumbList',
          itemListElement: Array.isArray(data.items) 
            ? data.items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url.startsWith('/') ? `${baseUrl}${item.url}` : item.url,
              }))
            : [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: baseUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Current Page',
                  item: currentUrl,
                },
              ],
        };
        break;
        
      default:
        schemaData = {
          '@type': type,
          ...data,
        };
    }
    
    // Apply any overrides to the schema data
    const finalData = { ...defaultData, ...schemaData, ...overrides };
    
    return JSON.stringify(finalData);
  };

  return (
    <Script 
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: getStructuredData() }}
      strategy="afterInteractive"
    />
  );
}
