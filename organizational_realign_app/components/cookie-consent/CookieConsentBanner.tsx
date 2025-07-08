'use client';

import React, { useState, useEffect } from 'react';
import { useAnalytics } from '@/components/providers/AnalyticsProvider';
import { ConsentStatus } from '@/lib/analytics';
import Link from 'next/link';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentBannerProps {
  privacyPolicyUrl?: string;
  companyName?: string;
}

/**
 * GDPR-compliant Cookie Consent Banner
 * Allows users to accept or reject tracking cookies
 */
export default function CookieConsentBanner({
  privacyPolicyUrl = '/privacy',
  companyName = 'NorthPath Strategies'
}: CookieConsentBannerProps) {
  const { consentStatus, updateConsent, hasConsentBeenAsked } = useAnalytics();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // Show banner if consent hasn't been asked yet
  useEffect(() => {
    // Small delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(!hasConsentBeenAsked);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [hasConsentBeenAsked]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <div className="mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4 md:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <ShieldCheck className="h-6 w-6 text-blue-500 mr-2" />
                <h2 id="cookie-consent-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cookie Consent
                </h2>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
                aria-label="Close cookie consent banner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                By clicking "Accept All", you consent to our use of cookies as described in our Privacy Policy.
              </p>
              
              {showDetails && (
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                  <h3 className="font-medium mb-2">Cookie Details</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Necessary:</span> 
                      <span>Essential for the website to function properly. Cannot be disabled.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Analytics:</span> 
                      <span>Help us understand how visitors interact with our website, used to improve user experience.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Functionality:</span> 
                      <span>Enable personalized features and remember your preferences.</span>
                    </li>
                  </ul>
                </div>
              )}
              
              <div className="mt-4">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
                >
                  {showDetails ? 'Hide details' : 'Show details'}
                </button>
                
                <Link 
                  href={privacyPolicyUrl}
                  className="ml-4 text-blue-600 dark:text-blue-400 text-sm inline-flex items-center hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
                >
                  Privacy Policy
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
            
            <div className="mt-5 flex flex-col sm:flex-row-reverse gap-3">
              <Button
                onClick={() => {
                  updateConsent(ConsentStatus.GRANTED);
                  setIsVisible(false);
                }}
                className="flex-1"
              >
                Accept All
              </Button>
              
              <Button
                onClick={() => {
                  updateConsent(ConsentStatus.GRANTED);
                  setIsVisible(false);
                }}
                variant="outline"
                className="flex-1"
              >
                Accept Necessary
              </Button>
              
              <Button
                onClick={() => {
                  updateConsent(ConsentStatus.DENIED);
                  setIsVisible(false);
                }}
                variant="ghost"
                className="flex-1"
              >
                Reject All
              </Button>
            </div>
            
            <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
