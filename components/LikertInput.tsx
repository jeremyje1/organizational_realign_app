"use client";

import { useState } from "react";

interface Props {
  onSelect(value: number): void;
  initialValue?: number;
  disabled?: boolean;
}

export default function LikertInput({ onSelect, initialValue, disabled = false }: Props) {
  const [selected, setSelected] = useState<number | null>(initialValue ?? null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    if (disabled) return;
    setSelected(value);
    onSelect(value);
  };

  const labels = [
    "Strongly Disagree",
    "Disagree", 
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

  const getButtonColor = (n: number) => {
    if (selected === n) {
      return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 shadow-lg scale-105 ring-2 ring-purple-400/50';
    }
    if (hoveredValue === n) {
      return 'bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-200 border-purple-400/50 scale-102';
    }
    return 'bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 hover:border-slate-500/50 hover:scale-102';
  };

  return (
    <div className="space-y-4">
      {/* Responsive Button Layout */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`flex-1 sm:w-12 sm:h-12 h-12 rounded-lg border text-sm font-medium transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              getButtonColor(n)
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => handleSelect(n)}
            onMouseEnter={() => !disabled && setHoveredValue(n)}
            onMouseLeave={() => setHoveredValue(null)}
            disabled={disabled}
            aria-label={`${labels[n-1]} (${n} out of 5)`}
            role="radio"
            aria-checked={selected === n}
          >
            <span className="font-semibold text-lg">{n}</span>
            <span className="text-xs sm:hidden opacity-80 px-2 text-center leading-tight">
              {labels[n-1]}
            </span>
          </button>
        ))}
      </div>

      {/* Visual feedback for current selection */}
      {selected && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-400/30 rounded-lg">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-purple-300 font-medium">
              {labels[selected - 1]} ({selected}/5)
            </span>
          </div>
        </div>
      )}

      {/* Hover feedback for desktop */}
      {hoveredValue && hoveredValue !== selected && (
        <div className="text-center hidden sm:block">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/30 border border-slate-600/50 rounded-lg">
            <span className="text-sm text-slate-400">
              Preview: {labels[hoveredValue - 1]} ({hoveredValue}/5)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}