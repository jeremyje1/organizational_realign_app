'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X, ChevronDown, ChevronUp } from 'lucide-react';

interface TestResult {
  category: string;
  test: string;
  status: 'pass' | 'fail' | 'warning' | 'info';
  message: string;
  details?: string;
}

// Quality Assurance and Testing Component
export default function QualityAssurance() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInProduction, setShowInProduction] = useState(false);

  // Only show in development or when specifically enabled
  const shouldShow = process.env.NODE_ENV === 'development' || showInProduction;

  const runTests = useCallback(async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // Test 1: Accessibility Tests
    try {
      // Check for proper ARIA labels
      const buttonsWithoutLabels = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      results.push({
        category: 'Accessibility',
        test: 'Button ARIA Labels',
        status: buttonsWithoutLabels.length === 0 ? 'pass' : 'warning',
        message: buttonsWithoutLabels.length === 0 
          ? 'All buttons have proper ARIA labels' 
          : `${buttonsWithoutLabels.length} buttons missing ARIA labels`,
        details: buttonsWithoutLabels.length > 0 
          ? Array.from(buttonsWithoutLabels).map(btn => btn.textContent || 'Unlabeled button').join(', ')
          : undefined
      });

      // Check for alt text on images
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
      results.push({
        category: 'Accessibility',
        test: 'Image Alt Text',
        status: imagesWithoutAlt.length === 0 ? 'pass' : 'fail',
        message: imagesWithoutAlt.length === 0 
          ? 'All images have alt text' 
          : `${imagesWithoutAlt.length} images missing alt text`
      });

      // Check for heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let headingHierarchyValid = true;
      let lastLevel = 0;
      
      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > lastLevel + 1) {
          headingHierarchyValid = false;
        }
        lastLevel = level;
      });

      results.push({
        category: 'Accessibility',
        test: 'Heading Hierarchy',
        status: headingHierarchyValid ? 'pass' : 'warning',
        message: headingHierarchyValid 
          ? 'Heading hierarchy is properly structured' 
          : 'Heading hierarchy may be skipping levels'
      });

    } catch (error) {
      results.push({
        category: 'Accessibility',
        test: 'Accessibility Tests',
        status: 'fail',
        message: 'Error running accessibility tests',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 2: Performance Tests
    try {
      // Check for Core Web Vitals
      if ('performance' in window && 'measure' in window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          results.push({
            category: 'Performance',
            test: 'Time to First Byte (TTFB)',
            status: ttfb < 600 ? 'pass' : ttfb < 1000 ? 'warning' : 'fail',
            message: `TTFB: ${Math.round(ttfb)}ms`,
            details: ttfb < 600 ? 'Excellent' : ttfb < 1000 ? 'Good' : 'Needs improvement'
          });

          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          results.push({
            category: 'Performance',
            test: 'DOM Content Loaded',
            status: domContentLoaded < 1500 ? 'pass' : domContentLoaded < 2500 ? 'warning' : 'fail',
            message: `DCL: ${Math.round(domContentLoaded)}ms`
          });
        }
      }

      // Check for large images
      const images = document.querySelectorAll('img');
      let largeImages = 0;
      images.forEach(img => {
        if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
          largeImages++;
        }
      });

      results.push({
        category: 'Performance',
        test: 'Image Optimization',
        status: largeImages === 0 ? 'pass' : 'warning',
        message: largeImages === 0 
          ? 'All images are appropriately sized' 
          : `${largeImages} images may be too large`,
        details: largeImages > 0 ? 'Consider using WebP format and responsive images' : undefined
      });

    } catch (error) {
      results.push({
        category: 'Performance',
        test: 'Performance Tests',
        status: 'fail',
        message: 'Error running performance tests',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 3: SEO Tests
    try {
      // Check for meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      results.push({
        category: 'SEO',
        test: 'Meta Description',
        status: metaDescription ? 'pass' : 'fail',
        message: metaDescription 
          ? `Meta description present (${(metaDescription.getAttribute('content') || '').length} chars)` 
          : 'Meta description missing'
      });

      // Check for title tag
      const title = document.querySelector('title');
      const titleText = title?.textContent || '';
      results.push({
        category: 'SEO',
        test: 'Title Tag',
        status: titleText.length > 0 && titleText.length <= 60 ? 'pass' : 'warning',
        message: titleText.length > 0 
          ? `Title present (${titleText.length} chars)` 
          : 'Title missing',
        details: titleText.length > 60 ? 'Title may be too long for search results' : undefined
      });

      // Check for Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      
      results.push({
        category: 'SEO',
        test: 'Open Graph Tags',
        status: ogTitle && ogDescription && ogImage ? 'pass' : 'warning',
        message: `Open Graph: ${[ogTitle && 'title', ogDescription && 'description', ogImage && 'image'].filter(Boolean).length}/3 tags present`
      });

    } catch (error) {
      results.push({
        category: 'SEO',
        test: 'SEO Tests',
        status: 'fail',
        message: 'Error running SEO tests',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 4: Conversion Optimization Tests
    try {
      // Check for CTA buttons
      const ctaButtons = document.querySelectorAll('button, a').length;
      const ctaText = Array.from(document.querySelectorAll('button, a'))
        .map(el => el.textContent?.toLowerCase() || '')
        .filter(text => 
          text.includes('get') || 
          text.includes('start') || 
          text.includes('assessment') ||
          text.includes('free') ||
          text.includes('savings')
        );

      results.push({
        category: 'Conversion',
        test: 'Call-to-Action Elements',
        status: ctaText.length >= 3 ? 'pass' : 'warning',
        message: `${ctaText.length} conversion-focused CTAs found`,
        details: ctaText.length < 3 ? 'Consider adding more compelling call-to-action elements' : undefined
      });

      // Check for trust signals
      const trustSignals = document.querySelectorAll('[data-testid*="testimonial"], [data-testid*="client"], .testimonial, .client-logo').length;
      results.push({
        category: 'Conversion',
        test: 'Trust Signals',
        status: trustSignals > 0 ? 'pass' : 'warning',
        message: `${trustSignals} trust signals detected`,
        details: trustSignals === 0 ? 'Consider adding testimonials, client logos, or certifications' : undefined
      });

      // Check for value proposition clarity
      const valueProps = Array.from(document.querySelectorAll('h1, h2, h3'))
        .map(h => h.textContent?.toLowerCase() || '')
        .filter(text => 
          text.includes('23%') || 
          text.includes('cost') || 
          text.includes('savings') ||
          text.includes('reduce') ||
          text.includes('$2.4m')
        );

      results.push({
        category: 'Conversion',
        test: 'Value Proposition',
        status: valueProps.length > 0 ? 'pass' : 'warning',
        message: `${valueProps.length} value propositions with specific benefits found`,
        details: valueProps.length === 0 ? 'Consider highlighting specific cost savings and benefits' : undefined
      });

    } catch (error) {
      results.push({
        category: 'Conversion',
        test: 'Conversion Tests',
        status: 'fail',
        message: 'Error running conversion tests',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    setTestResults(results);
    setIsRunning(false);
  }, []);

  // Auto-run tests on mount
  useEffect(() => {
    if (shouldShow) {
      const timer = setTimeout(runTests, 2000); // Wait for page to fully load
      return () => clearTimeout(timer);
    }
  }, [shouldShow, runTests]);

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'fail':
        return <X className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'fail':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const passCount = testResults.filter(r => r.status === 'pass').length;
  const totalCount = testResults.length;
  const score = totalCount > 0 ? Math.round((passCount / totalCount) * 100) : 0;

  if (!shouldShow) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 w-96 max-w-[90vw]"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 3 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div 
          className="p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                <span className="font-semibold text-gray-900 dark:text-white">
                  QA Dashboard
                </span>
              </div>
              {!isRunning && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {score}% ({passCount}/{totalCount})
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isRunning && (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              )}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="max-h-96 overflow-y-auto"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 space-y-3">
                {testResults.map((result, index) => (
                  <motion.div
                    key={`${result.category}-${result.test}`}
                    className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex items-start gap-2">
                      {getStatusIcon(result.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium opacity-75">
                            {result.category}
                          </span>
                          <span className="text-sm font-medium">
                            {result.test}
                          </span>
                        </div>
                        <p className="text-sm mt-1">
                          {result.message}
                        </p>
                        {result.details && (
                          <p className="text-xs mt-1 opacity-75">
                            {result.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={runTests}
                    disabled={isRunning}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded text-sm font-medium transition-colors"
                  >
                    {isRunning ? 'Running...' : 'Re-run Tests'}
                  </button>
                  <button
                    onClick={() => setShowInProduction(!showInProduction)}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors"
                  >
                    {showInProduction ? 'Hide in Prod' : 'Show in Prod'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
