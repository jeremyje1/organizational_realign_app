// components/Analytics.tsx
// Google Analytics 4 integration (scaffold)
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function Analytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('ga4-script')) return;

    // Inject GA4 script
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // TODO: Replace with real GA4 ID
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_title: 'North Path Strategies',
      page_location: window.location.href
    });
  }, []);

  return null;
}
