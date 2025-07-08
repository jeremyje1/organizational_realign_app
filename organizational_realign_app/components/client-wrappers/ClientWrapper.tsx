'use client';

import { ReactNode } from 'react';
import { LinkProvider } from './DynamicClientImports';

interface ClientWrapperProps {
  children: ReactNode;
}

// Wrapper component to provide client-side context
export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <LinkProvider>
      {children}
    </LinkProvider>
  );
}
