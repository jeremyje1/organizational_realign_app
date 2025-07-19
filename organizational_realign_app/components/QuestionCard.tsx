"use client";

import React from 'react';
import { CheckCircle2, HelpCircle, AlertTriangle } from 'lucide-react';
import LikertInput from './LikertInput';
import NumericInput from './NumericInput';
import { SelectInput } from './SelectInput';
import QuestionTooltip from './QuestionTooltip';

interface Question {
  id: string;
  text: string;
  type: 'likert' | 'number' | 'select' | 'multi-select' | 'text';
  options?: string[];
  tooltip?: {
    explanation?: string;
    examples?: string[];
  };
}

interface QuestionCardProps {
  question: Question;
  index: number;
  isAnswered: boolean;
  needsAttention: boolean;
  multiSelectAnswers?: Map<string, Set<number>>;
  onAnswer: (questionId: string, value?: number | null, stringValue?: string) => void;
  onMultiSelectAnswer: (questionId: string, optionIndex: number, checked: boolean) => void;
}

export default function QuestionCard({
  question: q,
  index,
  isAnswered,
  needsAttention,
  multiSelectAnswers,
  onAnswer,
  onMultiSelectAnswer
}: QuestionCardProps) {
  const cardClasses = `
    relative group
    bg-white/5 backdrop-blur-sm
    border border-slate-700/50
    rounded-xl
    p-6 md:p-8
    transition-all duration-300 ease-in-out
    hover:border-slate-600/60
    hover:bg-white/8
    ${needsAttention 
      ? 'border-amber-400/60 bg-amber-500/5 shadow-lg shadow-amber-500/10' 
      : isAnswered
      ? 'border-emerald-400/40 bg-emerald-500/5'
      : 'border-slate-700/50'
    }
  `;

  const statusIndicatorClasses = `
    absolute -top-2 -left-2
    w-8 h-8
    rounded-full
    flex items-center justify-center
    text-white text-sm font-bold
    transition-all duration-300
    ${isAnswered 
      ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30' 
      : needsAttention
      ? 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-lg shadow-amber-500/30 animate-pulse'
      : 'bg-gradient-to-br from-slate-600 to-slate-700 group-hover:from-purple-500 group-hover:to-purple-600'
    }
  `;

  return (
    <div className={cardClasses}>
      {/* Status Indicator */}
      <div className={statusIndicatorClasses}>
        {isAnswered ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : needsAttention ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <span>{index + 1}</span>
        )}
      </div>

      {/* Question Header */}
      <div className="mb-6 pt-2">
        <div className="flex items-start gap-4">
          {/* Question Text */}
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed mb-2">
              {q.text}
            </h3>
            
            {/* Question Meta Info */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1">
                Question {index + 1}
              </span>
              {isAnswered && (
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* Help Icon */}
          {q.tooltip && (q.tooltip.explanation || (q.tooltip.examples && q.tooltip.examples.length > 0)) && (
            <div className="flex-shrink-0 mt-1">
              <QuestionTooltip
                title={q.text}
                explanation={q.tooltip.explanation}
                examples={q.tooltip.examples}
                position="left"
                size="lg"
              >
                <button className="group/help relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/70 border border-slate-600/50 hover:border-slate-500/70 transition-all duration-200">
                  <HelpCircle className="h-5 w-5 text-slate-400 group-hover/help:text-blue-400 transition-colors" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover/help:opacity-100 transition-opacity"></span>
                </button>
              </QuestionTooltip>
            </div>
          )}
        </div>
      </div>

      {/* Answer Section */}
      <div className="space-y-4">
        {q.type === "likert" && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-slate-400 px-2">
              <span>Strongly Disagree</span>
              <span>Neutral</span>
              <span>Strongly Agree</span>
            </div>
            <LikertInput onSelect={(v) => onAnswer(q.id, v)} />
          </div>
        )}

        {q.type === "number" && (
          <div className="space-y-3">
            <label className="block text-sm text-slate-300 font-medium">
              Enter a numeric value:
            </label>
            <NumericInput onSubmit={(v) => onAnswer(q.id, v)} />
          </div>
        )}

        {q.type === "select" && q.options && (
          <div className="space-y-4">
            {q.id === 'INST_TYPE' && (
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-400/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-200 font-medium text-sm">📋 Institution Type Selection</span>
                </div>
                <p className="text-sm text-purple-300/80">
                  This selection customizes your assessment questions and provides relevant recommendations.
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              <label className="block text-sm text-slate-300 font-medium">
                {q.id === 'INST_TYPE' ? "Choose your organization type:" : "Select an option:"}
              </label>
              <SelectInput
                options={q.options}
                type="select"
                placeholder={q.id === 'INST_TYPE' ? "Choose your organization type..." : "Select an option..."}
                onSelect={(selectedOption) => {
                  const optionText = typeof selectedOption === 'string' 
                    ? selectedOption 
                    : q.options?.[selectedOption] || '';
                  onAnswer(q.id, null, optionText);
                }}
              />
            </div>
          </div>
        )}

        {q.type === "multi-select" && q.options && (
          <div className="space-y-4">
            <label className="block text-sm text-slate-300 font-medium">
              Select all that apply:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((option, idx) => {
                const isSelected = multiSelectAnswers?.get(q.id)?.has(idx) || false;
                return (
                  <label 
                    key={idx} 
                    className={`
                      flex items-center space-x-3 p-4 rounded-lg border cursor-pointer 
                      transition-all duration-200 hover:scale-[1.02]
                      ${isSelected 
                        ? 'bg-purple-500/10 border-purple-400/50 text-purple-200 shadow-lg shadow-purple-500/10' 
                        : 'bg-slate-800/30 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50 text-slate-200'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => onMultiSelectAnswer(q.id, idx, e.target.checked)}
                      className="rounded border-slate-500 text-purple-400 focus:ring-purple-400 focus:ring-offset-slate-800 transition-all duration-200"
                    />
                    <span className="font-medium text-sm">{option}</span>
                  </label>
                );
              })}
            </div>
            
            {/* Selection Summary */}
            {multiSelectAnswers?.get(q.id)?.size && (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-emerald-300">
                  {multiSelectAnswers.get(q.id)?.size} option{multiSelectAnswers.get(q.id)?.size !== 1 ? 's' : ''} selected
                </span>
              </div>
            )}
          </div>
        )}

        {q.type === "text" && (
          <div className="space-y-3">
            <label className="block text-sm text-slate-300 font-medium">
              Enter your answer:
            </label>
            <input 
              type="text" 
              onChange={(e) => e.target.value.trim() && onAnswer(q.id, null, e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
              placeholder="Enter your answer..."
            />
          </div>
        )}
      </div>

      {/* Progress Indicator for This Question */}
      {isAnswered && (
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>Question completed</span>
          </div>
        </div>
      )}

      {/* Attention Message */}
      {needsAttention && (
        <div className="mt-6 pt-4 border-t border-amber-400/30">
          <div className="flex items-center gap-2 text-sm text-amber-300">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>Please complete this question to continue</span>
          </div>
        </div>
      )}
    </div>
  );
}
