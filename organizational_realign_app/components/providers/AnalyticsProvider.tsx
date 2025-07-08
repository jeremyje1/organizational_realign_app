'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  initializeAnalytics, 
  trackPageView,
  ConsentStatus,
  updateConsentStatus,
  getConsentStatus
} from '@/lib/analytics';
import { usePathname, useSearchParams } from 'next/navigation';

interface AnalyticsContextType {
  consentStatus: ConsentStatus;
  updateConsent: (status: ConsentStatus) => void;
  hasConsentBeenAsked: boolean;
  setConsentAsked: (asked: boolean) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  consentStatus: ConsentStatus.PENDING,
  updateConsent: () => {},
  hasConsentBeenAsked: false,
  setConsentAsked: () => {},
});

interface AnalyticsProviderProps {
  children: ReactNode;
  defaultConsent?: ConsentStatus;
}

/**
 * Provider component for analytics functionality
 * Handles consent management and page view tracking
 */
export function AnalyticsProvider({ 
  children, 
  defaultConsent = ConsentStatus.PENDING
}: AnalyticsProviderProps) {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(defaultConsent);
  const [hasConsentBeenAsked, setHasConsentBeenAsked] = useState<boolean>(false);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics if measurement ID is available
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    
    // Check if consent was previously stored in localStorage
    const storedConsent = typeof window !== 'undefined' 
      ? localStorage.getItem('cookie-consent') as ConsentStatus
      : null;
    
    if (storedConsent) {
      setConsentStatus(storedConsent);
      setHasConsentBeenAsked(true);
      
      if (storedConsent === ConsentStatus.GRANTED && measurementId) {
        initializeAnalytics(measurementId, true);
      }
    } else if (measurementId) {
      // In development, initialize anyway for testing
      if (process.env.NODE_ENV === 'development') {
        initializeAnalytics(measurementId, true, { debug: true });
      }
    }
  }, []);

  // Update analytics consent status when it changes
  const updateConsent = (status: ConsentStatus) => {
    setConsentStatus(status);
    updateConsentStatus(status);
    setHasConsentBeenAsked(true);
    
    // Store consent in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', status);
    }
  };

  // Track page views when route changes
  useEffect(() => {
    if (consentStatus === ConsentStatus.GRANTED) {
      // Add a small delay to ensure page title is updated
      const timer = setTimeout(() => {
        trackPageView(pathname);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, consentStatus]);

  return (
    <AnalyticsContext.Provider 
      value={{ 
        consentStatus, 
        updateConsent, 
        hasConsentBeenAsked,
        setConsentAsked: setHasConsentBeenAsked
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Hook to access analytics context
 */
export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}
