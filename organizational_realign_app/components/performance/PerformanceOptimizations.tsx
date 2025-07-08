'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Performance monitoring utilities
interface PerformanceMetrics {
  FCP: number;
  LCP: number;
  FID: number;
  CLS: number;
  TTFB: number;
}

// Lazy loading component
interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  className?: string;
}

export function LazyComponent({ 
  children, 
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />, 
  threshold = 0.1,
  className = ""
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      ) : (
        fallback
      )}
    </div>
  );
}

// Progressive image loading
interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  priority?: boolean;
}

export function ProgressiveImage({ 
  src, 
  alt, 
  className = "", 
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNi41IDEySDIzLjVMMjAgMThIMTYuNVYxMloiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+",
  priority = false 
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        loading={priority ? 'eager' : 'lazy'}
      />
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

// Performance monitoring hook
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  useEffect(() => {
    // Web Vitals observer
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, FCP: entry.startTime }));
            }
            break;
          case 'largest-contentful-paint':
            setMetrics(prev => ({ ...prev, LCP: entry.startTime }));
            break;
          case 'first-input':
            setMetrics(prev => ({ ...prev, FID: (entry as any).processingStart - entry.startTime }));
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              setMetrics(prev => ({ 
                ...prev, 
                CLS: (prev.CLS || 0) + (entry as any).value 
              }));
            }
            break;
        }
      }
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });

    // TTFB measurement
    if ('navigation' in performance) {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      setMetrics(prev => ({ 
        ...prev, 
        TTFB: navEntry.responseStart - navEntry.requestStart 
      }));
    }

    return () => observer.disconnect();
  }, []);

  return metrics;
}

// Resource preloader
export function preloadResources(resources: string[]) {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (resource.endsWith('.woff2') || resource.endsWith('.woff')) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.js')) {
      link.as = 'script';
    } else {
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
    }
    
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Performance-optimized button
interface OptimizedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function OptimizedButton({ 
  children, 
  onClick, 
  className = "", 
  disabled = false,
  variant = 'primary',
  size = 'md'
}: OptimizedButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg";
  
  const variantClasses = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500/50",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/50",
    outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500/50"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base", 
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.button>
  );
}

// Critical CSS injector
export function injectCriticalCSS(css: string) {
  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
}

// Service worker registration
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registered: ', registration);
      } catch (registrationError) {
        console.log('SW registration failed: ', registrationError);
      }
    });
  }
}

// Memory usage monitoring
export function useMemoryMonitoring() {
  const [memoryInfo, setMemoryInfo] = useState<any>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        setMemoryInfo((performance as any).memory);
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
}

// Connection monitoring
export function useConnectionMonitoring() {
  const [connectionInfo, setConnectionInfo] = useState<any>(null);

  useEffect(() => {
    const updateConnectionInfo = () => {
      if ('connection' in navigator || 'mozConnection' in navigator || 'webkitConnection' in navigator) {
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        setConnectionInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        });
      }
    };

    updateConnectionInfo();
    
    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', updateConnectionInfo);
    }

    return () => {
      if ('connection' in navigator) {
        (navigator as any).connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);

  return connectionInfo;
}

// Main Performance Optimizations Component
export default function PerformanceOptimizations() {
  // Initialize service worker registration
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null; // This component only provides hooks and utilities
}
