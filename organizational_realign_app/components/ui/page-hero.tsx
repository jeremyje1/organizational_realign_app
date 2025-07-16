import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  icon?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({ title, subtitle, icon, children, className }: PageHeroProps) {
  return (
    <div className={cn(
      "bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50",
      "rounded-2xl p-8 md:p-12 text-center",
      className
    )}>
      {icon && (
        <div className="text-4xl mb-4">
          {icon}
        </div>
      )}
      
      <h1 className="text-4xl font-extrabold text-nps-blue mb-4">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-lg text-nps-slate mb-6">
          {subtitle}
        </p>
      )}
      
      {children && (
        <div className="flex justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
