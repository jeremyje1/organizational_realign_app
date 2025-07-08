"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SurveyNavigationProps {
  canGoNext: boolean;
  canGoPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isLastSection: boolean;
  showValidation: boolean;
  unansweredCount: number;
}

export default function SurveyNavigation({
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
  isLastSection,
  showValidation,
  unansweredCount
}: SurveyNavigationProps) {
  return (
    <div className="sticky bottom-0 bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Validation Message */}
        {showValidation && (
          <div className="mb-4 p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg animate-bounce">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-amber-400 h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="text-amber-300 font-medium">Complete all questions to continue</h3>
                <p className="text-amber-200/70 text-sm">
                  {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} still need{unansweredCount === 1 ? 's' : ''} your response.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${canGoPrevious 
                ? 'bg-slate-700/50 hover:bg-slate-600/70 text-slate-200 border border-slate-600/50 hover:border-slate-500/70' 
                : 'bg-slate-800/30 text-slate-500 border border-slate-700/30 cursor-not-allowed'
              }
            `}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Section Status */}
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              {canGoNext ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Section ready to continue</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 border-2 border-slate-500 rounded-full border-t-transparent animate-spin"></div>
                  <span>Complete remaining questions</span>
                </>
              )}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${canGoNext 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25' 
                : 'bg-slate-700/30 text-slate-500 border border-slate-700/30 cursor-not-allowed'
              }
            `}
          >
            <span className="hidden sm:inline">
              {isLastSection ? 'Complete Assessment' : 'Next Section'}
            </span>
            <span className="sm:hidden">
              {isLastSection ? 'Complete' : 'Next'}
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Hint */}
        <div className="mt-3 text-center">
          <p className="text-xs text-slate-500">
            {isLastSection 
              ? "Review your answers and complete the assessment" 
              : "Complete this section to unlock the next set of questions"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
