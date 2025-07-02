"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { useSurvey } from "@/hooks/useSurvey";
import PublicNavigation from "@/components/PublicNavigation";
import QuestionCard from "@/components/QuestionCard";
import SectionHeader from "@/components/SectionHeader";
import SurveyNavigation from "@/components/SurveyNavigation";
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Clock, Target, BookOpen, Building2, User, LogOut } from 'lucide-react';
import { useState, useEffect } from "react";
import { consultancyAreas } from "@/data/comprehensiveQuestionBank";
import { supabase } from "@/lib/supabase-browser";
import Link from "next/link";

export default function SurveyPage() {
  // Get user from Supabase auth (handles cases where Supabase isn't configured)
  const user = useUser();
  
  // Check for Supabase configuration
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase not configured - running in demo mode');
    }
  }, []);

  const {
    loading,
    section,
    sectionQuestions,
    sectionIdx,
    sections,
    selectedInstitutionType,
    next,
    setSectionIdx,
    saveAnswer
  } = useSurvey(user?.id ?? null);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Track answered questions in current section and multi-select values
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<Map<string, Set<number>>>(new Map());
  const [showValidation, setShowValidation] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Reset validation when section changes
  useEffect(() => {
    setAnsweredQuestions(new Set());
    setMultiSelectAnswers(new Map());
    setShowValidation(false);
    setIsNavigating(false);
  }, [sectionIdx]);

  const handleAnswer = async (questionId: string, value: number | null, text?: string) => {
    await saveAnswer(questionId, value, text);
    setAnsweredQuestions(prev => new Set([...prev, questionId]));
  };

  const handleMultiSelectAnswer = async (questionId: string, optionIndex: number, checked: boolean) => {
    const currentAnswers = multiSelectAnswers.get(questionId) || new Set();
    
    if (checked) {
      currentAnswers.add(optionIndex);
    } else {
      currentAnswers.delete(optionIndex);
    }
    
    setMultiSelectAnswers(prev => new Map(prev.set(questionId, currentAnswers)));
    
    // Mark as answered if at least one option is selected
    if (currentAnswers.size > 0) {
      setAnsweredQuestions(prev => new Set([...prev, questionId]));
      // Save the multi-select answer as a comma-separated string
      const answerText = Array.from(currentAnswers).join(',');
      await saveAnswer(questionId, null, answerText);
    } else {
      setAnsweredQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }
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
    setIsNavigating(true);
    setTimeout(() => {
      next();
    }, 150);
  };

  const handlePrevious = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setSectionIdx(sectionIdx - 1);
    }, 150);
  };

  const getQuestionProgress = () => {
    return (answeredQuestions.size / sectionQuestions.length) * 100;
  };

  const getOverallProgress = () => {
    return ((sectionIdx * 100) + getQuestionProgress()) / sections.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col elegant-bg">
        <PublicNavigation />
        <main className="max-w-4xl mx-auto px-4 py-16 flex-1">
          <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-purple-400"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Loading Assessment</h2>
            <p className="text-lg text-slate-300 mb-8">Preparing your personalized organizational assessment...</p>
            <div className="bg-slate-700/30 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full animate-pulse" style={{width: '60%'}}></div>
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
        <main className="max-w-4xl mx-auto px-4 py-16 flex-1">
          <div className="text-center space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🎉</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-slate-100 mb-4">Assessment Complete!</h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Thank you for completing the organizational assessment. Your responses are being analyzed to generate valuable insights.
              </p>
              
              <div className="space-y-4">
                <button 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  onClick={() => window.location.href = '/secure/results'}
                >
                  View Results & Insights →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (sectionIdx >= sections.length) {
    return (
      <div className="min-h-screen flex flex-col elegant-bg">
        <PublicNavigation />
        <main className="max-w-4xl mx-auto px-4 py-16 flex-1">
          <div className="text-center space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12">
              {/* Completion content */}
              <div className="mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-slate-100 mb-4">Assessment Complete!</h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Your organizational assessment is complete. Proceed to view your detailed results and recommendations.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  onClick={() => window.location.href = '/secure/results'}
                >
                  View Your Results →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col elegant-bg">
      <PublicNavigation />
      
      {/* User Authentication Status */}
      {user && (
        <div className="bg-slate-800/30 border-b border-slate-700/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {user.user_metadata?.name || user.email}
                  </p>
                  <p className="text-xs text-slate-400">Progress is being saved automatically</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-700/50"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!user && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-amber-400/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-amber-200 font-medium text-sm">Demo Mode</p>
                  <p className="text-amber-300/70 text-xs">
                    Your progress won't be saved. <Link href="/auth" className="underline hover:text-amber-200">Sign in</Link> to save your assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overall Progress Header */}
      <div className="bg-slate-900/50 border-b border-slate-700/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl md:text-2xl font-bold text-slate-100">
              Organizational Assessment
            </h1>
            <div className="text-sm text-slate-400">
              Section {sectionIdx + 1} of {sections.length}
            </div>
          </div>

          {/* Enhanced progress bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Current Section Progress</span>
                <span>{answeredQuestions.size} of {sectionQuestions.length} completed</span>
              </div>
              <div className="bg-slate-700/30 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{width: `${getQuestionProgress()}%`}}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Overall Assessment Progress</span>
                <span>{Math.round(getOverallProgress())}% complete</span>
              </div>
              <div className="bg-slate-700/30 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full transition-all duration-500"
                  style={{width: `${getOverallProgress()}%`}}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Institution Type Information */}
          {selectedInstitutionType && (
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-5 w-5 text-purple-400" />
                <span className="font-semibold text-purple-200">
                  {selectedInstitutionType.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <h4 className="text-sm font-medium text-purple-200 mb-2">Available Consultancy Services:</h4>
                  <div className="space-y-1">
                    {consultancyAreas[selectedInstitutionType]?.slice(0, 3).map((area, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {area}
                      </div>
                    ))}
                    {consultancyAreas[selectedInstitutionType]?.length > 3 && (
                      <div className="text-sm text-purple-300">
                        +{consultancyAreas[selectedInstitutionType].length - 3} more services
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <main className={`max-w-6xl mx-auto px-4 py-8 flex-1 transition-all duration-300 ${
        isNavigating ? 'opacity-70 scale-98' : 'opacity-100 scale-100'
      }`}>
        {/* Section Header */}
        <SectionHeader
          sectionTitle={section}
          sectionIndex={sectionIdx}
          totalSections={sections.length}
          answeredQuestions={answeredQuestions.size}
          totalQuestions={sectionQuestions.length}
        />

        {/* Questions Grid */}
        <div className="space-y-6 mb-8">
          {sectionQuestions.map((q, index) => {
            const isAnswered = answeredQuestions.has(q.id);
            const needsAttention = showValidation && !isAnswered;
            
            return (
              <QuestionCard
                key={q.id}
                question={q}
                index={index}
                isAnswered={isAnswered}
                needsAttention={needsAttention}
                multiSelectAnswers={multiSelectAnswers}
                onAnswer={handleAnswer}
                onMultiSelectAnswer={handleMultiSelectAnswer}
              />
            );
          })}
        </div>
      </main>

      {/* Navigation */}
      <SurveyNavigation
        canGoNext={answeredQuestions.size === sectionQuestions.length}
        canGoPrevious={sectionIdx > 0}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isLastSection={sectionIdx === sections.length - 1}
        showValidation={showValidation}
        unansweredCount={sectionQuestions.length - answeredQuestions.size}
      />
    </div>
  );
}
