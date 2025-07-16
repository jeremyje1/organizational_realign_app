import React from 'react';
import { cn } from '@/lib/utils';

interface NpsCardProps {
  children: React.ReactNode;
  className?: string;
  icon?: string;
  title?: string;
  description?: string;
}

export function NpsCard({ children, className, icon, title, description }: NpsCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-nps p-8",
      "flex flex-col items-center text-center space-y-4",
      "hover:shadow-lg transition-shadow duration-300",
      className
    )}>
      {icon && (
        <div className="text-4xl text-nps-blue">
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className="text-2xl font-semibold text-nps-slate">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-base text-nps-slate">
          {description}
        </p>
      )}
      
      {children}
    </div>
  );
}
