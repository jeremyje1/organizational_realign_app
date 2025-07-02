"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { useSurvey } from "@/hooks/useSurvey";
import PublicNavigation from "@/components/PublicNavigation";
import QuestionCard from "@/components/QuestionCard";
import SectionHeader from "@/components/SectionHeader";
import SurveyNavigation from "@/components/SurveyNavigation";
import { CheckCircle2, AlertCircle, Clock, Target, BookOpen, Building2, User, LogOut } from 'lucide-react';
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

  const handleAnswer = async (questionId: string, value?: number | null, stringValue?: string) => {
    await saveAnswer(questionId, value ?? null, stringValue);
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

  if (sectionIdx >= sections.length) {
    return (
      <div className="min-h-screen flex flex-col elegant-bg">
        <PublicNavigation />
        <main className="max-w-4xl mx-auto py-20 text-center space-y-6 flex-1 px-4">
          <div className="card p-12 animate-slide-up">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center animate-bounce-once">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-slate-100 mb-4">Assessment Complete!</h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Thank you for completing the organizational assessment. Your responses will help generate valuable insights for your institution.
              </p>
            </div>

            {/* Enhanced completion stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="card p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/30">
                <div className="flex items-center justify-center mb-3">
                  <Target className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-300 mb-1">
                  {sections.length}
                </div>
                <div className="text-sm text-slate-300">Sections Completed</div>
              </div>
              
              <div className="card p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-400/30">
                <div className="flex items-center justify-center mb-3">
                  <BookOpen className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-300 mb-1">
                  {sectionQuestions.length * sections.length}
                </div>
                <div className="text-sm text-slate-300">Questions Answered</div>
              </div>
              
              <div className="card p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-400/30">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-8 w-8 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-300 mb-1">~15</div>
                <div className="text-sm text-slate-300">Minutes Invested</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                className="btn btn-primary w-full sm:w-auto px-8 py-4 text-lg font-medium animate-pulse-gentle"
                onClick={() => window.location.href = '/secure/results'}
              >
                View Your Results →
              </button>
              <div className="text-sm text-slate-400">
                Results will be generated in 2-3 minutes
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
        <div className="bg-slate-800/50 border-b border-slate-600/30">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {user.user_metadata?.name || user.email}
                  </p>
                  <p className="text-xs text-slate-400">Survey progress is being saved</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!user && (
        <div className="bg-amber-500/10 border-b border-amber-400/30">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-400" />
                <div>
                  <p className="text-sm font-medium text-amber-200">Demo Mode</p>
                  <p className="text-xs text-amber-300/80">Your progress won't be saved</p>
                </div>
              </div>
              <Link 
                href="/auth" 
                className="text-sm text-amber-200 hover:text-amber-100 underline transition-colors"
              >
                Sign in to save progress
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Section Header Component */}
      <div className="sticky top-0 z-10 px-4 pt-4">
        <SectionHeader
          sectionTitle={section}
          sectionIndex={sectionIdx}
          totalSections={sections.length}
          answeredQuestions={answeredQuestions.size}
          totalQuestions={sectionQuestions.length}
          estimatedTimeMinutes={Math.max(1, Math.ceil(sectionQuestions.length * 0.5))}
        />
      </div>

      {/* Institution Type Information */}
      {selectedInstitutionType && (
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="h-5 w-5 text-purple-400" />
              <span className="font-semibold text-purple-200">Selected Institution Type</span>
            </div>
            <p className="text-slate-300 mb-3">
              {selectedInstitutionType.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </p>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-purple-200 mb-2">Available Consultancy Services:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {consultancyAreas[selectedInstitutionType]?.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className={`max-w-4xl mx-auto px-4 pb-32 space-y-6 flex-1 transition-all duration-300 ${
        isNavigating ? 'opacity-70 scale-98' : 'opacity-100 scale-100'
      }`}>
        
        {/* Questions using QuestionCard Component */}
        <div className="space-y-6">
          {sectionQuestions.map((question, index) => {
            const isAnswered = answeredQuestions.has(question.id);
            const needsAttention = showValidation && !isAnswered;
            
            return (
              <div key={question.id} id={`question-${question.id}`}>
                <QuestionCard
                  question={question}
                  index={index}
                  isAnswered={isAnswered}
                  needsAttention={needsAttention}
                  multiSelectAnswers={multiSelectAnswers}
                  onAnswer={handleAnswer}
                  onMultiSelectAnswer={handleMultiSelectAnswer}
                />
              </div>
            );
          })}
        </div>
      </main>

      {/* Survey Navigation Component */}
      <SurveyNavigation
        canGoNext={true}
        canGoPrevious={sectionIdx > 0}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isLastSection={sectionIdx >= sections.length - 1}
        showValidation={showValidation}
        unansweredCount={sectionQuestions.length - answeredQuestions.size}
      />
    </div>
  );
}