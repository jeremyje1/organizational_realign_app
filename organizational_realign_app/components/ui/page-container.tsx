import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn(
      "max-w-6xl mx-auto px-6 py-12 space-y-8",
      "md:px-8 lg:px-12",
      className
    )}>
      {children}
    </div>
  );
}
