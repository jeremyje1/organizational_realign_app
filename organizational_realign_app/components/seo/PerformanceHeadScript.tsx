'use client';

import Script from 'next/script';

export default function PerformanceHeadScript() {
  return (
    <>
      {/* Critical CSS inlining for key above-the-fold styles */}
      <Script id="critical-css" strategy="beforeInteractive">
        {`
          /* Critical CSS styles for performance */
          :root {
            --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
            --background: #ffffff;
            --foreground: #0f172a;
          }
          
          body {
            font-family: var(--font-sans);
            background-color: var(--background);
            color: var(--foreground);
            margin: 0;
            padding: 0;
          }
          
          /* Skip-to-content accessibility */
          .skip-to-content {
            position: absolute;
            top: -40px;
            left: 0;
            background: #000;
            color: white;
            padding: 8px;
            z-index: 9999;
            transition: top 0.2s ease;
          }
          
          .skip-to-content:focus {
            top: 0;
          }
          
          /* Initial page loading indicator */
          .initial-loader {
            position: fixed;
            inset: 0;
            background: #f9fafb;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
          
          .initial-loader svg {
            width: 40px;
            height: 40px;
          }
          
          /* Remove initial loader when page is ready */
          .page-ready .initial-loader {
            display: none;
          }
        `}
      </Script>

      {/* Preload fonts */}
      <Script id="font-preloads" strategy="beforeInteractive">
        {`
          // Add preload links for fonts
          const fontPreloads = [
            { href: '/fonts/inter-var-latin.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
          ];
          
          fontPreloads.forEach(config => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = config.href;
            link.as = config.as;
            link.type = config.type;
            link.crossOrigin = config.crossOrigin;
            document.head.appendChild(link);
          });
        `}
      </Script>

      {/* Image optimization hint */}
      <Script id="image-optimization" strategy="afterInteractive">
        {`
          // Add support for modern image formats
          document.addEventListener('DOMContentLoaded', function() {
            // Find all images that could benefit from WebP or AVIF
            const images = document.querySelectorAll('img:not([loading="lazy"])');
            if ('connection' in navigator) {
              const connection = navigator.connection;
              if (connection && (connection.saveData || connection.effectiveType === '2g')) {
                // For users on slow connections or save-data mode, use lower quality
                images.forEach(img => {
                  if (!img.hasAttribute('data-quality-set')) {
                    img.dataset.qualitySet = 'true';
                    if (img.src.includes('?')) {
                      img.src += '&quality=60';
                    } else {
                      img.src += '?quality=60';
                    }
                  }
                });
              }
            }
          });
        `}
      </Script>

      {/* Browser idle time optimization */}
      <Script id="idle-optimization" strategy="lazyOnload">
        {`
          // Use requestIdleCallback to load non-critical resources
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              // Preconnect to external domains for faster subsequent requests
              const domains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
              domains.forEach(domain => {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = domain;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
              });
              
              // Prefetch likely next pages based on navigation patterns
              const pagesToPrefetch = ['/pricing', '/services', '/survey'];
              pagesToPrefetch.forEach(page => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = page;
                document.head.appendChild(link);
              });
            }, { timeout: 2000 });
          }
        `}
      </Script>
    </>
  );
}
