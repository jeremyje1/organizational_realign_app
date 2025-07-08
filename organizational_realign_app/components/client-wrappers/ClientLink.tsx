'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

interface ClientLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean | 'true' | 'false';
  'aria-label'?: string;
  role?: string;
}

// This component wraps Next.js Link to ensure it works properly with client components
// and avoids serialization issues that could cause "Cannot read properties of undefined (reading 'call')" error
export default function ClientLink({
  children,
  className,
  onClick,
  'aria-current': ariaCurrent,
  'aria-label': ariaLabel,
  role,
  ...props
}: ClientLinkProps) {
  return (
    <Link
      className={className}
      onClick={onClick}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
      role={role}
      {...props}
    >
      {children}
    </Link>
  );
}
