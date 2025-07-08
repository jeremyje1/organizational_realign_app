"use client";

import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

interface SectionHeaderProps {
  sectionTitle: string;
  sectionIndex: number;
  totalSections: number;
  answeredQuestions: number;
  totalQuestions: number;
  estimatedTimeMinutes?: number;
}

export default function SectionHeader({
  sectionTitle,
  sectionIndex,
  totalSections,
  answeredQuestions,
  totalQuestions,
  estimatedTimeMinutes = 3
}: SectionHeaderProps) {
  const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  const isComplete = answeredQuestions === totalQuestions;

  return (
    <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8">
      {/* Section Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Section</span>
            <span className="px-2 py-1 bg-slate-700/50 rounded text-slate-300 font-medium">
              {sectionIndex + 1} of {totalSections}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>~{estimatedTimeMinutes} min</span>
          </div>
          {isComplete && (
            <div className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Complete</span>
            </div>
          )}
        </div>
      </div>

      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
          {sectionTitle}
        </h2>
        <p className="text-slate-400">
          Please answer all questions in this section to continue.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-400">
          <span>Progress</span>
          <span>{answeredQuestions} of {totalQuestions} completed</span>
        </div>
        <div className="relative">
          <div className="bg-slate-700/30 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isComplete 
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-purple-400 to-pink-400'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {isComplete && (
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
