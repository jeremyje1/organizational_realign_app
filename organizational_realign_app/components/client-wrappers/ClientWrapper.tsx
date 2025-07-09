'use client';

import { ReactNode } from 'react';
import { LinkProvider } from './DynamicClientImports';
import { LanguageProvider } from '@/hooks/useLanguage';

interface ClientWrapperProps {
  children: ReactNode;
}

// Wrapper component to provide client-side context
export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <LinkProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </LinkProvider>
  );
}
