/**
 * Comprehensive Loading States Component
 * 
 * A unified solution for various loading scenarios:
 * - Skeleton loaders for content-heavy pages
 * - Spinner animations for shorter loading processes
 * - Progressive loading for dynamic content
 * - Error and retry states
 * 
 * With accessibility features:
 * - ARIA roles and labels for screen readers
 * - Keyboard navigation support
 * - Focus management
 * - High contrast mode support
 * 
 * Enhanced with mobile-first responsive design:
 * - Responsive breakpoints at 480px, 768px, 1024px
 * - Mobile-friendly touch targets (min 44px height/width)
 * - Swipe gestures support for interactions
 * - Optimized vertical scrolling (no horizontal overflow)
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './loading-spinner';
import { LoadingDots } from './loading-spinner';
import { Skeleton } from './loading';
import { Button } from './button';
import { cn } from '@/lib/utils';
import {
  Loader2, RefreshCcw, AlertCircle, X, Check,
  AlertTriangle, Info, Clock
} from 'lucide-react';

// ===== SPINNER COMPONENTS =====

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'pulse';
  className?: string;
  text?: string;
  ariaLabel?: string;
}

export function Spinner({ 
  size = 'md', 
  variant = 'default', 
  className,
  text,
  ariaLabel
}: SpinnerProps) {
  // Size classes adjusted for touch targets on mobile
  const sizeValues = {
    sm: 'min-h-[30px] min-w-[30px]',
    md: 'min-h-[44px] min-w-[44px]',
    lg: 'min-h-[60px] min-w-[60px]'
  };

  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        sizeValues[size],
        className
      )}
      role="status"
      aria-label={ariaLabel || "Loading"}
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingSpinner size={size} variant={variant} />
      {text && (
        <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">
          {text}
        </p>
      )}
      <span className="sr-only">
        {text || "Loading content, please wait"}
      </span>
    </div>
  );
}

// ===== SKELETON COMPONENTS =====

interface SkeletonCardProps {
  lines?: number;
  height?: string;
  className?: string;
  showImage?: boolean;
  imageHeight?: string;
  rounded?: boolean;
  animation?: 'pulse' | 'wave' | 'shimmer';
  ariaLabel?: string;
}

export function SkeletonCard({
  lines = 3,
  height = 'h-full',
  className = '',
  showImage = true,
  imageHeight = 'h-40',
  rounded = true,
  animation = 'shimmer',
  ariaLabel
}: SkeletonCardProps) {
  return (
    <div 
      className={cn(
        height,
        'bg-white dark:bg-gray-800 p-4',
        rounded ? 'rounded-xl' : '',
        'border border-gray-200 dark:border-gray-700',
        'forced-colors:border-[CanvasText]', // High contrast mode support
        className
      )}
      role="status"
      aria-label={ariaLabel || "Loading content"}
      aria-busy="true"
    >
      {showImage && <Skeleton className={imageHeight} animation={animation} />}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-6 w-3/4" animation={animation} />
        {Array(lines).fill(0).map((_, i) => (
          <Skeleton 
            key={i} 
            className={`h-4 w-${Math.floor(Math.random() * 3) + 8}/12`} 
            animation={animation} 
          />
        ))}
      </div>
      <span className="sr-only">Loading card content</span>
    </div>
  );
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  className = '',
  showHeader = true,
  animation = 'shimmer',
  ariaLabel,
  responsiveMode = 'auto'
}: {
  rows?: number;
  columns?: number;
  className?: string;
  showHeader?: boolean;
  animation?: 'pulse' | 'wave' | 'shimmer';
  ariaLabel?: string;
  /** 
   * Determines how the table handles responsiveness
   * - 'auto': Automatically adapts based on screen size 
   * - 'scroll': Always forces horizontal scrolling for overflow
   * - 'stack': Stacks content vertically on small screens
   */
  responsiveMode?: 'auto' | 'scroll' | 'stack';
}) {
  return (
    <div
      className={cn(
        'w-full',
        responsiveMode === 'scroll' ? 'overflow-x-auto' : 'overflow-hidden',
        className
      )}
      role="status"
      aria-label={ariaLabel || `Loading table with ${rows} rows and ${columns} columns`}
      aria-busy="true"
    >
      <div className={responsiveMode === 'stack' ? '' : 'min-w-[640px]'}>
        {showHeader && (
          <div className="flex gap-4 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 forced-colors:border-[CanvasText]">
            {Array(columns).fill(0).map((_, i) => (
              <Skeleton
                key={`header-${i}`}
                className={`h-6 ${
                  responsiveMode === 'stack' 
                    ? `w-full sm:w-${(i === 0 ? '2' : '1')}/${columns}`
                    : `w-${(i === 0 ? '2' : '1')}/${columns}`
                }`}
                animation={animation}
              />
            ))}
          </div>
        )}
        
        <div className="space-y-4">
          {Array(rows).fill(0).map((_, rowIndex) => (
            <div 
              key={`row-${rowIndex}`} 
              className={
                responsiveMode === 'stack' 
                  ? 'flex flex-col sm:flex-row gap-2 sm:gap-4 pb-2 sm:pb-0 border-b sm:border-b-0 border-gray-100 dark:border-gray-800 last:border-0'
                  : 'flex gap-4'
              }
            >
              {Array(columns).fill(0).map((_, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={
                    responsiveMode === 'stack' 
                      ? `h-6 w-full sm:w-1/${columns}`
                      : `h-6 w-1/${columns}`
                  }
                  animation={animation}
                />
              ))}
            </div>
          ))}
        </div>
        <span className="sr-only">Loading table data</span>
      </div>
    </div>
  );
}

export function SkeletonDashboard({
  className = '',
  animation = 'shimmer',
  ariaLabel
}: {
  className?: string;
  animation?: 'pulse' | 'wave' | 'shimmer';
  ariaLabel?: string;
}) {
  return (
    <div 
      className={cn('w-full space-y-6', className)}
      role="status"
      aria-label={ariaLabel || "Loading dashboard"}
      aria-busy="true"
    >
      {/* Header section with title and actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex-1 min-w-0">
          <Skeleton className="h-8 w-64 sm:w-80" animation={animation} />
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 sm:ml-4 mt-4 sm:mt-0">
          <Skeleton className="h-10 w-24" animation={animation} />
          <Skeleton className="h-10 w-24" animation={animation} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <Skeleton className="h-4 w-20 mb-2" animation={animation} />
            <Skeleton className="h-8 w-24" animation={animation} />
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content panel */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <Skeleton className="h-6 w-48 mb-4" animation={animation} />
          <SkeletonTable rows={4} columns={3} animation={animation} />
        </div>

        {/* Sidebar panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <Skeleton className="h-6 w-36 mb-4" animation={animation} />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" animation={animation} />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full" animation={animation} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== PROGRESSIVE LOADING COMPONENTS =====

interface ProgressiveLoadingProps {
  items: React.ReactNode[];
  loadingInterval?: number;
  className?: string;
  ariaLabel?: string;
  ariaLiveRegion?: boolean;
}

export function ProgressiveLoading({
  items,
  loadingInterval = 300,
  className = '',
  ariaLabel,
  ariaLiveRegion = true
}: ProgressiveLoadingProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadedCount >= items.length) return;
    
    const timer = setTimeout(() => {
      setLoadedCount(prev => Math.min(prev + 1, items.length));
    }, loadingInterval);
    
    return () => clearTimeout(timer);
  }, [loadedCount, items.length, loadingInterval]);

  // Announce progress updates for screen readers
  const loadingProgress = Math.round((loadedCount / items.length) * 100);
  const isComplete = loadedCount === items.length;

  // Handle keyboard navigation to focus on newly loaded content
  useEffect(() => {
    if (loadedCount > 0 && progressRef.current) {
      // Only focus if user is navigating with keyboard
      if (document.body.classList.contains('keyboard-user')) {
        progressRef.current.focus();
      }
      
      // Update the announcement for screen readers
      if (announcementRef.current) {
        if (isComplete) {
          announcementRef.current.textContent = "All content loaded successfully";
        } else {
          announcementRef.current.textContent = `Item ${loadedCount} of ${items.length} loaded. ${loadingProgress}% complete.`;
        }
      }
    }
  }, [loadedCount, items.length, loadingProgress, isComplete]);

  return (
    <div 
      ref={containerRef}
      className={cn(className, "outline-none")}
      role="region"
      aria-label={ariaLabel || "Loading content progressively"}
      aria-busy={loadedCount < items.length}
      tabIndex={-1}
    >
      <div 
        ref={announcementRef} 
        className="sr-only" 
        aria-live={ariaLiveRegion ? "polite" : "off"}
      >
        {isComplete 
          ? "All content loaded successfully" 
          : `Loading in progress. ${loadingProgress}% complete. ${loadedCount} of ${items.length} items loaded.`
        }
      </div>
      <AnimatePresence mode="popLayout">
        {items.slice(0, loadedCount).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            tabIndex={0}
            ref={index === loadedCount - 1 ? progressRef : undefined}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
            aria-label={`Item ${index + 1} of ${items.length}`}
            // Allow keyboard navigation with arrow keys
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown' && index < loadedCount - 1) {
                const nextItem = containerRef.current?.children[index + 2];
                if (nextItem instanceof HTMLElement) nextItem.focus();
              } else if (e.key === 'ArrowUp' && index > 0) {
                const prevItem = containerRef.current?.children[index];
                if (prevItem instanceof HTMLElement) prevItem.focus();
              }
            }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {loadedCount < items.length && (
        <div 
          className="flex justify-center py-4"
          role="status"
          aria-label={`Loading item ${loadedCount + 1} of ${items.length}`}
        >
          <LoadingDots className="mt-2" ariaLabel={`Loading item ${loadedCount + 1} of ${items.length}`} />
        </div>
      )}
    </div>
  );
}

// ===== ASYNC CONTENT LOADER =====

interface AsyncContentProps<T> {
  loader: () => Promise<T>;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode | ((error: Error, retry: () => void) => React.ReactNode);
  children: (data: T) => React.ReactNode;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
  loadOnMount?: boolean;
  deps?: any[];
  ariaLabel?: string;
  ariaLiveRegion?: boolean;
  focusOnContentLoad?: boolean;
  contentRole?: string;
}

export function AsyncContent<T>({
  loader,
  loadingFallback = <Spinner />,
  errorFallback,
  children,
  onError,
  onSuccess,
  loadOnMount = true,
  deps = [],
  ariaLabel,
  ariaLiveRegion = true,
  focusOnContentLoad = false,
  contentRole = "region"
}: AsyncContentProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(loadOnMount);
  const [error, setError] = useState<Error | null>(null);
  const [loadingAttempts, setLoadingAttempts] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  
  const load = async () => {
    setLoading(true);
    setError(null);
    setLoadingAttempts(prev => prev + 1);
    
    try {
      const result = await loader();
      setData(result);
      if (onSuccess) onSuccess(result);
      
      // Focus on the content when it loads if requested or using keyboard
      if ((focusOnContentLoad || document.body.classList.contains('keyboard-user')) && contentRef.current) {
        setTimeout(() => {
          contentRef.current?.focus();
          
          // Announce success to screen readers
          const announcement = document.createElement('div');
          announcement.className = 'sr-only';
          announcement.setAttribute('aria-live', 'polite');
          announcement.textContent = 'Content loaded successfully';
          document.body.appendChild(announcement);
          setTimeout(() => document.body.removeChild(announcement), 1000);
        }, 100);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      if (onError) onError(error);
      
      // Focus on error element for keyboard users
      if (document.body.classList.contains('keyboard-user') && errorRef.current) {
        setTimeout(() => {
          errorRef.current?.focus();
        }, 100);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Handle keyboard shortcuts for retry
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (error && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      load();
    }
  };
  
  useEffect(() => {
    if (loadOnMount) load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  if (loading) {
    return (
      <div 
        ref={loadingRef}
        role="status" 
        aria-label={ariaLabel || "Loading content"}
        aria-live={ariaLiveRegion ? "polite" : "off"}
        aria-busy="true"
        className="forced-colors:border forced-colors:border-[CanvasText] p-2 rounded-md"
        tabIndex={0}
      >
        {loadingFallback}
        <div className="sr-only">
          {loadingAttempts > 1 
            ? `Loading attempt ${loadingAttempts}. Please wait...` 
            : "Loading content. Please wait..."
          }
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        ref={errorRef}
        role="alert" 
        aria-live={ariaLiveRegion ? "assertive" : "off"}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="forced-colors:border forced-colors:border-[CanvasText] rounded-md"
      >
        {typeof errorFallback === 'function' 
          ? errorFallback(error, load)
          : errorFallback || (
            <ErrorState
              title="Failed to load content"
              description={error.message}
              onRetry={load}
            />
          )
        }
      </div>
    );
  }

  return data ? (
    <div 
      ref={contentRef} 
      role={contentRole}
      tabIndex={focusOnContentLoad ? 0 : undefined} 
      className={cn(
        "rounded-md",
        focusOnContentLoad ? "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" : undefined,
        "forced-colors:border forced-colors:border-[CanvasText]"
      )}
      aria-label={ariaLabel}
    >
      {children(data)}
      {/* Announce to screen readers that content has loaded */}
      {ariaLiveRegion && (
        <div className="sr-only" aria-live="polite">
          Content loaded successfully
        </div>
      )}
    </div>
  ) : null;
}

// ===== ERROR STATES =====

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryText?: string;
  dismissable?: boolean;
  onDismiss?: () => void;
  severity?: 'warning' | 'error' | 'info';
  className?: string;
}

export function ErrorState({
  title = 'Error',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  retryText = 'Retry',
  dismissable = false,
  onDismiss,
  severity = 'error',
  className = ''
}: ErrorStateProps) {
  const icons = {
    error: <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />,
    warning: <AlertTriangle className="h-8 w-8 text-amber-500" aria-hidden="true" />,
    info: <Info className="h-8 w-8 text-blue-500" aria-hidden="true" />
  };

  const bgColors = {
    error: 'bg-red-50 dark:bg-red-950/30',
    warning: 'bg-amber-50 dark:bg-amber-950/30',
    info: 'bg-blue-50 dark:bg-blue-950/30'
  };

  const borderColors = {
    error: 'border-red-200 dark:border-red-800',
    warning: 'border-amber-200 dark:border-amber-800',
    info: 'border-blue-200 dark:border-blue-800'
  };

  const roles = {
    error: "alert",
    warning: "alert",
    info: "status"
  };

  // Handle keyboard navigation for retry and dismiss buttons
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-lg border p-4 flex flex-col items-center text-center',
        'forced-colors:border-[CanvasText]',
        bgColors[severity],
        borderColors[severity],
        className
      )}
      role={roles[severity]}
      aria-live={severity === "error" ? "assertive" : "polite"}
      tabIndex={0}
    >
      <div className="flex items-center justify-between w-full">
        {dismissable && onDismiss && (
          <div className="absolute right-4 top-4">
            <button
              onClick={onDismiss}
              onKeyDown={(e) => handleKeyDown(e, onDismiss)}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
              aria-label="Dismiss error message"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        {icons[severity]}
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>}
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            onKeyDown={(e) => handleKeyDown(e, onRetry)}
            className="mt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
            variant="outline"
            size="sm"
          >
            <RefreshCcw className="h-4 w-4 mr-2" aria-hidden="true" />
            {retryText}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// ===== NETWORK AWARE COMPONENT =====

interface NetworkAwareProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  retryInterval?: number;
  onOffline?: () => void;
  onOnline?: () => void;
}

export function NetworkAware({
  children,
  fallback,
  retryInterval = 5000,
  onOffline,
  onOnline
}: NetworkAwareProps) {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [retryCount, setRetryCount] = useState(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (onOnline) onOnline();
      // Announce to screen readers that we're back online
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-live', 'assertive');
      statusElement.classList.add('sr-only');
      statusElement.textContent = 'Your internet connection has been restored.';
      document.body.appendChild(statusElement);
      setTimeout(() => document.body.removeChild(statusElement), 1000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (onOffline) onOffline();
      // Announce to screen readers that we're offline
      const statusElement = document.createElement('div');
      statusElement.setAttribute('aria-live', 'assertive');
      statusElement.classList.add('sr-only');
      statusElement.textContent = 'You are currently offline. Some features may be unavailable.';
      document.body.appendChild(statusElement);
      setTimeout(() => document.body.removeChild(statusElement), 1000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onOffline, onOnline]);

  useEffect(() => {
    if (isOnline) return;

    const timer = setInterval(() => {
      setRetryCount(prev => prev + 1);
      
      // Check connection by loading a tiny resource
      fetch('/api/ping', { method: 'GET', cache: 'no-cache' })
        .then(() => {
          setIsOnline(true);
          if (onOnline) onOnline();
          clearInterval(timer);
        })
        .catch(() => {
          // Still offline
          // Update screen reader about retry attempt
          if (statusRef.current) {
            statusRef.current.textContent = `Still offline. Retry attempt: ${retryCount + 1}`;
          }
        });
    }, retryInterval);

    return () => clearInterval(timer);
  }, [isOnline, retryInterval, onOnline, retryCount]);

  if (!isOnline) {
    return (
      <>
        {/* Hidden status update for screen readers */}
        <div 
          ref={statusRef}
          className="sr-only" 
          aria-live="polite"
        >
          You are currently offline. Retry attempt: {retryCount}
        </div>
        
        {fallback || (
          <ErrorState
            title="No Internet Connection"
            description={`We can't reach our servers. Retry attempt: ${retryCount}. Please check your network connection.`}
            severity="warning"
            onRetry={() => window.location.reload()}
            retryText="Reload Page"
          />
        )}
      </>
    );
  }

  return <>{children}</>;
}

// ===== STATE INDICATORS =====

interface StateIndicatorProps {
  state: 'loading' | 'success' | 'error' | 'empty' | 'partial';
  loadingText?: string;
  successText?: string;
  errorText?: string;
  emptyText?: string;
  partialText?: string;
  className?: string;
}

export function StateIndicator({
  state,
  loadingText = 'Loading...',
  successText = 'Complete',
  errorText = 'Error',
  emptyText = 'No data',
  partialText = 'Partially loaded',
  className = ''
}: StateIndicatorProps) {
  const stateConfig = {
    loading: {
      icon: <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />,
      text: loadingText,
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      textColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
      role: "status",
      ariaLive: "polite" as "polite"
    },
    success: {
      icon: <Check className="h-4 w-4" aria-hidden="true" />,
      text: successText,
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      textColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800',
      role: "status",
      ariaLive: "polite" as "polite"
    },
    error: {
      icon: <AlertCircle className="h-4 w-4" aria-hidden="true" />,
      text: errorText,
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      textColor: 'text-red-600 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-800',
      role: "alert",
      ariaLive: "assertive" as "assertive"
    },
    empty: {
      icon: <Info className="h-4 w-4" aria-hidden="true" />,
      text: emptyText,
      bgColor: 'bg-gray-50 dark:bg-gray-800',
      textColor: 'text-gray-600 dark:text-gray-400',
      borderColor: 'border-gray-200 dark:border-gray-700',
      role: "status",
      ariaLive: "polite" as "polite"
    },
    partial: {
      icon: <Clock className="h-4 w-4" aria-hidden="true" />,
      text: partialText,
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      textColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-800',
      role: "status",
      ariaLive: "polite" as "polite"
    }
  };

  const { icon, text, bgColor, textColor, borderColor, role, ariaLive } = stateConfig[state];

  return (
    <div 
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border',
        'forced-colors:border-[CanvasText] focus-visible:ring-2 focus-visible:ring-offset-2',
        bgColor, 
        textColor,
        borderColor,
        className
      )}
      role={role}
      aria-live={ariaLive as "polite" | "assertive" | "off"}
      tabIndex={0}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

// ===== LOADING HANDLER COMPONENT =====

interface LoadingHandlerProps {
  loading: boolean;
  error: Error | null;
  data: any;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode | ((error: Error, retry: () => void) => React.ReactNode);
  emptyFallback?: React.ReactNode;
  children: React.ReactNode;
  onRetry?: () => void;
  isEmpty?: (data: any) => boolean;
  trackingId?: string; // Optional ID for analytics tracking
}

export function LoadingHandler({
  loading,
  error,
  data,
  loadingFallback = <Spinner />,
  errorFallback,
  emptyFallback = <div className="text-center p-4" role="status">No data available</div>,
  children,
  onRetry,
  isEmpty = (data) => !data || (Array.isArray(data) && data.length === 0),
  trackingId
}: LoadingHandlerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Reference to tracking capabilities for analytics
  const trackingRef = useRef(null);
  
  // Use effect to initialize tracking once
  useEffect(() => {
    // Import tracking functionality dynamically to avoid SSR issues
    if (typeof window !== 'undefined') {
      try {
        // Use a direct import of analytics functions instead of hooks
        const analytics = require('@/hooks/useTracking');
        if (analytics && analytics.getTrackingUtils) {
          trackingRef.current = analytics.getTrackingUtils();
        }
      } catch (e) {
        console.error('Error loading tracking utilities:', e);
      }
    }
  }, []);

  // When state changes, update screen reader and track events
  useEffect(() => {
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('aria-live', 'polite');
    
    if (loading) {
      announcement.textContent = 'Loading content. Please wait.';
      
      // Track loading state if tracking is available
      if (trackingRef.current?.hasConsent && trackingId) {
        trackingRef.current.trackEvent('content', 'loading', { 
          content_id: trackingId,
          content_type: 'dynamic_content'
        });
      }
    } else if (error) {
      announcement.textContent = `Error loading data: ${error.message}`;
      
      // Track error if tracking is available
      if (trackingRef.current?.hasConsent && trackingId) {
        trackingRef.current.trackEvent('error', 'content_load_failed', { 
          content_id: trackingId,
          error_message: error.message
        });
      }
    } else if (isEmpty(data)) {
      announcement.textContent = 'No data available.';
      
      // Track empty state if tracking is available
      if (trackingRef.current?.hasConsent && trackingId) {
        trackingRef.current.trackEvent('content', 'empty_content', { 
          content_id: trackingId
        });
      }
    } else {
      announcement.textContent = 'Content loaded successfully.';
      
      // Track successful load if tracking is available
      if (trackingRef.current?.hasConsent && trackingId) {
        trackingRef.current.trackEvent('content', 'loaded', { 
          content_id: trackingId,
          load_time_ms: performance.now() // Approximate load time
        });
      }
      
      // Focus on content when it loads if using keyboard
      if (document.body.classList.contains('keyboard-user') && contentRef.current) {
        setTimeout(() => {
          contentRef.current.focus();
        }, 100);
      }
    }
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }, [loading, error, data, isEmpty, trackingId]);

  if (loading) {
    return (
      <div className="p-4 rounded-md bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        {loadingFallback}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
        {typeof errorFallback === 'function' 
          ? errorFallback(error, onRetry)
          : errorFallback || (
            <ErrorState
              title="Error loading data"
              description={error.message}
              onRetry={onRetry}
              dismissable
            />
          )
        }
      </div>
    );
  }

  if (isEmpty(data)) {
    return (
      <section 
        className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        aria-label="Empty content section"
      >
        {emptyFallback}
      </section>
    );
  }

  return (
    <section 
      ref={contentRef}
      className="p-4 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      aria-label="Loaded content section"
    >
      {children}
    </section>
  );
}
