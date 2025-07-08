/**
 * InfoTooltip component for technical terms and acronyms in survey questions
 */
'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  term: string;
  definition: string;
  className?: string;
}

export default function InfoTooltip({ term, definition, className = '' }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-all duration-200 hover:scale-105"
      >
        <span className="underline decoration-dotted underline-offset-2 font-medium">{term}</span>
        <Info size={14} className="opacity-70 hover:opacity-100 transition-opacity duration-200" />
      </button>
      
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50 animate-fade-in">
          <div className="bg-slate-800/95 backdrop-blur-md border border-slate-600/50 rounded-xl p-4 shadow-2xl max-w-xs">
            <div className="text-sm text-slate-100 leading-relaxed">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <strong className="text-blue-300 font-semibold">{term}</strong>
              </div>
              <p className="text-slate-200 pl-4">{definition}</p>
            </div>
            {/* Enhanced arrow with glass effect */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-3 h-3 bg-slate-800/95 border-r border-b border-slate-600/50 transform rotate-45 -mt-1.5"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
