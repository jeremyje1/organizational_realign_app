'use client';

import { usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

interface SEOProviderProps {
  children: ReactNode;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultKeywords?: string[];
  siteName?: string;
  baseUrl?: string;
  twitterHandle?: string;
}

export default function SEOProvider({
  children,
  defaultTitle = 'NorthPath Strategies - Organizational Realignment',
  defaultDescription = 'Transform your organization with NorthPath Strategies.',
  defaultKeywords = [],
  siteName = 'NorthPath Strategies',
  baseUrl = 'https://app.northpathstrategies.org',
  twitterHandle = '@northpathstrat',
}: SEOProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Log page views for analytics
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // You can implement your analytics tracking here
      console.log(`Page view: ${pathname}`);

      // Example of sending to analytics
      if (window.gtag) {
        window.gtag('config', 'G-XXXXXXXXXX', {
          page_path: pathname,
        });
      }
    }
  }, [pathname]);

  // Monitor and handle page load performance
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Listen for page load complete
      window.addEventListener('load', () => {
        // Collect performance metrics
        setTimeout(() => {
          if ('performance' in window) {
            const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (perfData) {
              // Log performance data
              console.log(`Page load time: ${perfData.loadEventEnd - perfData.startTime}ms`);
              
              // If page load is very slow, maybe log this to your analytics
              if (perfData.loadEventEnd - perfData.startTime > 3000) {
                // Example: log slow page loads to analytics
                console.log('Slow page load detected');
              }
            }
          }
        }, 0);
      });
    }
  }, []);

  return (
    <>
      {/* Script for critical performance monitoring */}
      <Script id="performance-monitoring" strategy="afterInteractive">
        {`
          // Mark the start of JavaScript execution
          performance.mark('js-execution-start');
          
          // Basic performance monitoring
          window.addEventListener('load', function() {
            setTimeout(function() {
              const navigationTiming = performance.getEntriesByType('navigation')[0];
              const paintTiming = performance.getEntriesByType('paint');
              
              if (navigationTiming) {
                // Log key metrics
                console.log('DOM Content Loaded:', navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime, 'ms');
                console.log('Load Time:', navigationTiming.loadEventEnd - navigationTiming.startTime, 'ms');
              }
              
              // Log paint metrics
              paintTiming.forEach(function(paint) {
                console.log(paint.name + ':', paint.startTime, 'ms');
              });
              
              // Mark the end of our measurements
              performance.mark('metrics-gathered');
              performance.measure('full-page-load', 'navigationStart', 'metrics-gathered');
            }, 0);
          });
        `}
      </Script>
      
      {/* Script for schema.org structured data */}
      <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "${siteName}",
            "url": "${baseUrl}",
            "logo": "${baseUrl}/logo.png",
            "sameAs": [
              "https://twitter.com/${twitterHandle.replace('@', '')}",
              "https://www.linkedin.com/company/northpath-strategies"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-XXX-XXX-XXXX",
              "contactType": "customer service"
            }
          }
        `}
      </Script>
      
      {children}
    </>
  );
}
