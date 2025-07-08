'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ReadProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  threshold?: number;
  sendAnalytics?: boolean;
  onThresholdReached?: () => void;
}

/**
 * A component that shows reading progress and tracks engagement
 * Used to improve SEO by signaling to search engines how much of the page is consumed
 */
export default function ReadProgress({
  className,
  color = '#3b82f6', // blue-500
  height = 4,
  position = 'top',
  threshold = 75,
  sendAnalytics = true,
  onThresholdReached,
}: ReadProgressProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);

  useEffect(() => {
    const updateReadingProgress = () => {
      // Get scroll position and page dimensions
      const currentScrollPos = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight <= 0) {
        setReadingProgress(100); // Already at the bottom or short page
        return;
      }

      // Calculate percentage
      const newProgress = Math.min((currentScrollPos / scrollHeight) * 100, 100);
      setReadingProgress(newProgress);
      
      // Check if we've reached the threshold for engagement
      if (!hasReachedThreshold && newProgress >= threshold) {
        setHasReachedThreshold(true);
        
        // Call the callback if provided
        if (onThresholdReached) {
          onThresholdReached();
        }
        
        // Send analytics event if enabled
        if (sendAnalytics && typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'engagement', {
            event_category: 'Reading',
            event_label: `Reached ${threshold}% of page`,
            value: Math.round(threshold),
            non_interaction: false,
          });
          
          // Also send as a Core Web Vital signal (for Google analytics)
          window.gtag('event', 'web_vitals', {
            eventCategory: 'Web Vitals',
            eventAction: 'User Engagement',
            eventLabel: 'Reading Depth',
            eventValue: Math.round(threshold),
          });
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
    
    // Initial calculation
    updateReadingProgress();
    
    return () => {
      window.removeEventListener('scroll', updateReadingProgress);
    };
  }, [hasReachedThreshold, threshold, onThresholdReached, sendAnalytics]);

  // Only show if there's something to scroll
  if (typeof window !== 'undefined' && document.body.scrollHeight <= window.innerHeight) {
    return null;
  }

  return (
    <div 
      className={cn(
        'fixed left-0 z-50 w-full h-1 bg-gray-200 dark:bg-gray-700',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(readingProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className="h-full transition-all duration-150 ease-out"
        style={{ 
          width: `${readingProgress}%`,
          backgroundColor: color,
          height: `${height}px`
        }}
      />
    </div>
  );
}
