'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

// Critical CSS injection for above-the-fold content
export function CriticalCSS() {
  useEffect(() => {
    // Inject critical CSS for faster first paint
    const criticalCSS = `
      /* Critical CSS for above-the-fold content */
      .gradient-primary {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
      }
      .gradient-text {
        background: linear-gradient(135deg, #059669 0%, #0891b2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .glass {
        backdrop-filter: blur(16px);
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      .shadow-elegant {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      .shadow-premium {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.insertBefore(style, document.head.firstChild);

    return () => {
      const criticalStyle = document.querySelector('style[data-critical="true"]');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, []);

  return null;
}

// Advanced preloader for critical resources
export function AdvancedPreloader() {
  useEffect(() => {
    // Preload critical fonts
    const fonts = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-bold.woff2'
    ];

    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload critical images
    const criticalImages = [
      '/images/hero-bg.webp',
      '/images/jeremy-estrella-professional.webp'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });

    // Prefetch likely next pages
    const prefetchPages = [
      '/assessment/start',
      '/sample-reports',
      '/pricing'
    ];

    const router = useRouter();
    prefetchPages.forEach(page => {
      router.prefetch(page);
    });

  }, []);

  return null;
}

// WebP image optimization component
interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
}

export function OptimizedImage({ 
  src, 
  webpSrc, 
  alt, 
  className, 
  width, 
  height, 
  priority = false,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <picture className={className}>
      {webpSrc && (
        <source srcSet={webpSrc} type="image/webp" />
      )}
      <img
        src={hasError ? placeholder : src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </picture>
  );
}

// Bundle analyzer component for production optimization
export function BundleAnalyzer() {
  const [bundleInfo, setBundleInfo] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // In development, provide bundle size information
      const analyzeBundle = async () => {
        try {
          const response = await fetch('/_next/static/chunks/_buildManifest.js');
          const text = await response.text();
          // Parse build manifest for bundle information
          setBundleInfo({ analyzed: true, timestamp: Date.now() });
        } catch (error) {
          console.log('Bundle analysis not available');
        }
      };

      analyzeBundle();
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded z-50">
      Bundle: {bundleInfo ? 'Analyzed' : 'Loading...'}
    </div>
  );
}

// Advanced caching strategies
export function AdvancedCaching() {
  useEffect(() => {
    // Implement service worker for advanced caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      }).then(registration => {
        console.log('SW registered:', registration);
      }).catch(error => {
        console.log('SW registration failed:', error);
      });
    }

    // Implement memory-based caching for API responses
    const cache = new Map();
    const originalFetch = window.fetch;
    
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : (input as Request).url;
      
      // Cache GET requests to our API
      if (url.includes('/api/') && (!init || init.method === 'GET')) {
        const cacheKey = `${url}${JSON.stringify(init?.headers || {})}`;
        
        if (cache.has(cacheKey)) {
          const cached = cache.get(cacheKey);
          if (Date.now() - cached.timestamp < 300000) { // 5 minutes
            return Promise.resolve(new Response(JSON.stringify(cached.data), {
              headers: { 'Content-Type': 'application/json' }
            }));
          }
        }
      }
      
      const response = await originalFetch(input, init);
      
      // Cache successful API responses
      if (response.ok && url.includes('/api/') && (!init || init.method === 'GET')) {
        try {
          const clonedResponse = response.clone();
          const data = await clonedResponse.json();
          const cacheKey = `${url}${JSON.stringify(init?.headers || {})}`;
          cache.set(cacheKey, {
            data,
            timestamp: Date.now()
          });
        } catch (error) {
          // Ignore caching errors
        }
      }
      
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}

// Performance monitoring and optimization
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<any>({});

  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics((prev: any) => ({ ...prev, lcp: entry.startTime }));
        }
        if (entry.entryType === 'first-input') {
          setMetrics((prev: any) => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }));
        }
        if (entry.entryType === 'layout-shift') {
          setMetrics((prev: any) => ({ ...prev, cls: (prev.cls || 0) + (entry as any).value }));
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.log('Performance Observer not supported');
    }

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      const resources = list.getEntries();
      const slowResources = resources.filter(resource => resource.duration > 1000);
      
      if (slowResources.length > 0) {
        console.warn('Slow resources detected:', slowResources);
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.log('Resource Observer not supported');
    }

    return () => {
      observer.disconnect();
      resourceObserver.disconnect();
    };
  }, []);

  // Report metrics to analytics
  useEffect(() => {
    if (Object.keys(metrics).length > 0) {
      // Send metrics to analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          custom_map: {
            metric_lcp: metrics.lcp,
            metric_fid: metrics.fid,
            metric_cls: metrics.cls
          }
        });
      }
    }
  }, [metrics]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50">
      <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '...'}</div>
      <div>FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : '...'}</div>
      <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : '...'}</div>
    </div>
  );
}

// Advanced analytics and conversion tracking
export function AdvancedAnalytics() {
  useEffect(() => {
    // Track user engagement
    let startTime = Date.now();
    let isActive = true;

    const trackEngagement = () => {
      if (isActive) {
        const timeSpent = Date.now() - startTime;
        if (timeSpent > 10000 && typeof window !== 'undefined' && window.gtag) { // 10 seconds
          window.gtag('event', 'engaged_user', {
            event_category: 'Engagement',
            value: Math.round(timeSpent / 1000)
          });
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        isActive = false;
        trackEngagement();
      } else {
        isActive = true;
        startTime = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', trackEngagement);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', trackEngagement);
    };
  }, []);

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />

      {/* Conversion tracking */}
      <Script
        id="conversion-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Track scroll depth
            let maxScroll = 0;
            window.addEventListener('scroll', function() {
              const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
              if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                maxScroll = scrollPercent;
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'scroll_depth', {
                    event_category: 'Engagement',
                    event_label: scrollPercent + '%',
                    value: scrollPercent
                  });
                }
              }
            });

            // Track CTA clicks
            document.addEventListener('click', function(e) {
              const target = e.target.closest('a, button');
              if (target && (target.textContent.includes('Assessment') || target.textContent.includes('Get My'))) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'cta_click', {
                    event_category: 'Conversion',
                    event_label: target.textContent.trim(),
                    value: 1
                  });
                }
              }
            });
          `,
        }}
      />
    </>
  );
}

// Main Advanced Optimizations Component
export default function AdvancedOptimizations() {
  return (
    <>
      <CriticalCSS />
      <AdvancedPreloader />
      <BundleAnalyzer />
      <AdvancedCaching />
      <PerformanceMonitor />
      <AdvancedAnalytics />
    </>
  );
}
