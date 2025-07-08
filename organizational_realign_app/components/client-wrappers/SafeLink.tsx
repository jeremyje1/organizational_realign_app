'use client';

import NextLink from 'next/link';
import { ReactNode } from 'react';

interface SafeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

// A simplified client component wrapper for Next.js Link
// This avoids the "Cannot read properties of undefined (reading 'call')" error
export function SafeLink({ 
  href, 
  children, 
  className, 
  onClick,
  ...props 
}: SafeLinkProps) {
  return (
    <NextLink href={href} className={className} onClick={onClick} {...props}>
      {children}
    </NextLink>
  );
}
