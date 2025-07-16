import React from 'react';
import { cn } from '@/lib/utils';

interface NpsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function NpsButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  className,
  ...props 
}: NpsButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-nps-blue/50";
  
  const variants = {
    primary: "bg-nps-blue text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-nps-slate hover:bg-gray-200",
    outline: "border-2 border-nps-blue text-nps-blue hover:bg-nps-blue hover:text-white"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
