"use client";

import { useState } from 'react';
import { Info, HelpCircle, ChevronRight } from 'lucide-react';

interface TooltipProps {
  title: string;
  explanation?: string;
  examples?: string[];
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

export default function QuestionTooltip({ 
  title, 
  explanation, 
  examples = [], 
  children, 
  position = 'top',
  size = 'md'
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-slate-800',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-slate-800',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-slate-800',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-slate-800'
  };

  const sizeClasses = {
    sm: 'max-w-xs text-xs',
    md: 'max-w-sm text-sm',
    lg: 'max-w-md text-base'
  };

  const showTooltip = isVisible || isHovered;

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="cursor-help"
      >
        {children}
      </div>
      
      {showTooltip && (explanation || examples.length > 0) && (
        <div 
          className={`absolute z-50 ${positionClasses[position]} ${sizeClasses[size]}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip content */}
          <div className="bg-slate-800 text-slate-100 rounded-lg p-4 shadow-xl border border-slate-600/50 backdrop-blur-sm">
            {/* Arrow */}
            <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
            
            {/* Title */}
            <div className="font-semibold text-slate-200 mb-2 pr-6">
              {title}
            </div>
            
            {/* Explanation */}
            {explanation && (
              <div className="text-slate-300 mb-3 leading-relaxed">
                {explanation}
              </div>
            )}
            
            {/* Examples */}
            {examples.length > 0 && (
              <div>
                <div className="font-medium text-slate-200 mb-2 text-xs uppercase tracking-wide">
                  Examples:
                </div>
                <ul className="space-y-1">
                  {examples.map((example, index) => (
                    <li key={index} className="flex items-start text-slate-300">
                      <ChevronRight className="h-3 w-3 mt-0.5 mr-2 text-emerald-400 flex-shrink-0" />
                      <span className="text-xs leading-relaxed">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Mobile tap hint */}
            <div className="md:hidden mt-3 pt-2 border-t border-slate-600/50 text-xs text-slate-400">
              Tap outside to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Icon component for question tooltips
export function QuestionHelpIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <HelpCircle className={`${className} text-slate-400 hover:text-slate-300 transition-colors`} />
  );
}

// Info icon variant
export function QuestionInfoIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Info className={`${className} text-blue-400 hover:text-blue-300 transition-colors`} />
  );
}
