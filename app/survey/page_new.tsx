"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { useSurvey } from "@/hooks/useSurvey";
import LikertInput from "@/components/LikertInput";
import NumericInput from "@/components/NumericInput";
import PublicNavigation from "@/components/PublicNavigation";
import { useState, useEffect } from "react";

export default function SurveyPage() {
  const user = useUser();
  const {
    loading,
    section,
    sectionQuestions,
    sectionIdx,
    sections,
    next,
    setSectionIdx,
    saveAnswer
  } = useSurvey(user?.id ?? null);

  // Track answered questions in current section
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [showValidation, setShowValidation] = useState(false);

  // Reset validation when section changes
  useEffect(() => {
    setAnsweredQuestions(new Set());
    setShowValidation(false);
  }, [sectionIdx]);

  const handleAnswer = async (questionId: string, value: number | null, text?: string) => {
    await saveAnswer(questionId, value, text);
    setAnsweredQuestions(prev => new Set([...prev, questionId]));
  };

  const handleNext = () => {
    const unansweredQuestions = sectionQuestions.filter(q => !answeredQuestions.has(q.id));
    
    if (unansweredQuestions.length > 0) {
      setShowValidation(true);
      // Scroll to first unanswered question
      const firstUnanswered = document.getElementById(`question-${unansweredQuestions[0].id}`);
      firstUnanswered?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setShowValidation(false);
    next();
  };

  const getQuestionProgress = () => {
    return (answeredQuestions.size / sectionQuestions.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col elegant-bg">
        <PublicNavigation />
        <main className="max-w-3xl mx-auto px-4 py-10 space-y-8 flex-1">
          <div className="card p-10 text-center animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            </div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">Loading Assessment</h2>
            <p className="text-lg text-slate-300">Preparing your organizational assessment questions…</p>
            <div className="mt-6 bg-slate-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!sectionQuestions.length) {
    return (
      <div className="min-h-screen flex flex-col elegant-bg">
        <PublicNavigation />
        <main className="max-w-xl mx-auto py-20 text-center space-y-6 flex-1">
          <div className="card p-10 animate-fade-in">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 celebrate-icon">
                <span className="text-4xl">🎉</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-100 mb-4">Assessment Complete!</h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Thank you for completing the organizational realignment assessment. 
              Your responses are being analyzed to generate personalized insights and actionable recommendations.
            </p>
            
            <div className="bg-slate-700/50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
              </div>
              <p className="text-sm text-slate-400 mb-2">
                🤖 AI Analysis in Progress
              </p>
              <p className="text-xs text-slate-500">
                Processing time: 2-3 minutes • Powered by advanced organizational analysis
              </p>
            </div>
            
            <div className="space-y-4">
              <button 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 btn-hover-lift"
                onClick={() => window.location.href = '/secure/results'}
              >
                View Results & Insights →
              </button>
              <button 
                className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 px-8 py-3 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200"
                onClick={() => window.location.href = '/secure/dashboard'}
              >
                Return to Dashboard
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-600/30">
              <p className="text-xs text-slate-500">
                Next steps: Review your personalized report, schedule a consultation, or explore realignment scenarios
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col elegant-bg">
      <PublicNavigation />
      
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto w-full px-4 py-4">
        <div className="bg-slate-700/50 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500 ease-out"
            style={{width: `${((sectionIdx + 1) / sections.length) * 100}%`}}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-slate-400">
          <span>Section {sectionIdx + 1} of {sections.length}</span>
          <span>{Math.round(((sectionIdx + 1) / sections.length) * 100)}% Complete</span>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 pb-10 space-y-6 flex-1">
        {/* Section Header */}
        <div className="card p-6 text-center animate-fade-in">
          <h1 className="text-2xl font-semibold text-slate-100 mb-2">
            {section || "Organizational Assessment"}
          </h1>
          <p className="text-slate-300 mb-4">
            {section ? `Section ${sectionIdx + 1}: ${section}` : "Please answer the following questions about your organization"}
          </p>
          
          {/* Section Progress */}
          <div className="bg-slate-700/30 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-300"
              style={{width: `${getQuestionProgress()}%`}}
            ></div>
          </div>
          <p className="text-sm text-slate-400">
            {answeredQuestions.size} of {sectionQuestions.length} questions answered
          </p>
        </div>

        {/* Validation Message */}
        {showValidation && (
          <div className="card p-4 bg-amber-900/20 border border-amber-500/30 animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 text-xl">⚠️</span>
              <div>
                <h3 className="text-amber-300 font-medium">Please complete all questions</h3>
                <p className="text-amber-200/70 text-sm">
                  {sectionQuestions.length - answeredQuestions.size} question{sectionQuestions.length - answeredQuestions.size !== 1 ? 's' : ''} still need{sectionQuestions.length - answeredQuestions.size === 1 ? 's' : ''} to be answered before continuing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Questions Section */}
        <div className="card p-8 animate-slide-up">
          <div className="space-y-8">
            {sectionQuestions.map((q, index) => {
              const isAnswered = answeredQuestions.has(q.id);
              const needsAttention = showValidation && !isAnswered;
              
              return (
                <div 
                  key={q.id} 
                  id={`question-${q.id}`}
                  className={`space-y-4 p-6 rounded-xl border transition-all duration-300 ${
                    needsAttention 
                      ? 'bg-amber-900/10 border-amber-500/50 question-card' 
                      : isAnswered
                      ? 'bg-emerald-900/10 border-emerald-500/30 question-card'
                      : 'bg-slate-800/30 border-slate-600/20 hover:border-slate-500/30 question-card'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold transition-all duration-300 ${
                      isAnswered 
                        ? 'bg-gradient-to-br from-emerald-400 to-teal-400' 
                        : needsAttention
                        ? 'bg-gradient-to-br from-amber-400 to-orange-400'
                        : 'bg-gradient-to-br from-purple-400 to-pink-400'
                    }`}>
                      {isAnswered ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-100 text-lg leading-relaxed mb-4">{q.text}</p>
                      
                      <div className="mt-4">
                        {q.type === "likert" ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-slate-400 mb-3">
                              <span>Strongly Disagree</span>
                              <span>Strongly Agree</span>
                            </div>
                            <LikertInput onSelect={(v) => handleAnswer(q.id, v)} />
                          </div>
                        ) : q.type === "number" ? (
                          <NumericInput onSubmit={(v) => handleAnswer(q.id, v)} />
                        ) : q.type === "select" && q.options ? (
                          <select 
                            onChange={(e) => e.target.value && handleAnswer(q.id, parseInt(e.target.value))}
                            className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                          >
                            <option value="" className="text-slate-400">Select an option...</option>
                            {q.options.map((option, idx) => (
                              <option key={idx} value={idx} className="text-slate-100 bg-slate-700">{option}</option>
                            ))}
                          </select>
                        ) : q.type === "multi-select" && q.options ? (
                          <div className="space-y-2">
                            <p className="text-sm text-slate-400 mb-2">Select all that apply:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((option, idx) => (
                                <label key={idx} className="flex items-center space-x-2 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
                                  <input
                                    type="checkbox"
                                    onChange={(e) => {
                                      // For multi-select, we'll track any interaction as "answered"
                                      if (e.target.checked) {
                                        handleAnswer(q.id, idx);
                                      }
                                    }}
                                    className="rounded border-slate-500 text-purple-400 focus:ring-purple-400 focus:ring-offset-slate-800"
                                  />
                                  <span className="text-slate-200 text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <input 
                            type="text" 
                            onChange={(e) => e.target.value.trim() && handleAnswer(q.id, null, e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your answer..."
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-600/30">
            <div className="text-sm text-slate-400">
              {sectionQuestions.length} question{sectionQuestions.length !== 1 ? 's' : ''} in this section
            </div>
            <div className="flex gap-3">
              {sectionIdx > 0 && (
                <button
                  className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200 flex items-center gap-2 btn-hover-lift"
                  onClick={() => setSectionIdx(sectionIdx - 1)}
                >
                  ← Previous
                </button>
              )}
              <button
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl btn-hover-lift"
                onClick={handleNext}
              >
                {sectionIdx < sections.length - 1 ? 'Next Section' : 'Complete Assessment'} →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
