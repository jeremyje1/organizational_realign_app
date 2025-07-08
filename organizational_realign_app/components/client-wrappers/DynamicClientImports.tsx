'use client';

import dynamic from 'next/dynamic';
import { ReactNode, createContext, useContext } from 'react';
import NextLink from 'next/link';

// Create a context to provide the Link component
export const LinkContext = createContext<any>(null);

// Provider component for safe linking
export function LinkProvider({ children }: { children: ReactNode }) {
  const safeLinkHandler = (props: any) => {
    return <NextLink {...props} />;
  };
  
  return (
    <LinkContext.Provider value={safeLinkHandler}>
      {children}
    </LinkContext.Provider>
  );
}

// Safe Link component to avoid issues
export function SafeLink(props: any) {
  const LinkComponent = useContext(LinkContext);
  if (!LinkComponent) return <NextLink {...props} />;
  return <LinkComponent {...props} />;
}

// Dynamically import cookie consent banner to avoid SSR issues
const CookieConsentBanner = dynamic(
  () => import('@/components/cookie-consent/CookieConsentBanner'),
  { ssr: false }
);

// Dynamically import performance script to avoid affecting initial load
const PerformanceHeadScript = dynamic(
  () => import('@/components/seo/PerformanceHeadScript'),
  { ssr: false }
);

export function DynamicClientImports() {
  return (
    <LinkProvider>
      <CookieConsentBanner />
      <PerformanceHeadScript />
    </LinkProvider>
  );
}
