"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Target,
  Brain,
  FileText,
  BarChart3,
  Clock,
  Lightbulb
} from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  targetSelector?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: () => void;
}

interface TutorialProps {
  steps: TutorialStep[];
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
  autoStart?: boolean;
}

export function Tutorial({ steps, isOpen, onComplete, onSkip, autoStart = false }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen && autoStart) {
      setCurrentStep(0);
    }
  }, [isOpen, autoStart]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const step = steps[currentStep];
      if (step.action) {
        step.action();
      }
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onSkip();
  };

  if (!isVisible || steps.length === 0) return null;

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in" />
      
      {/* Tutorial Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="card max-w-lg w-full p-8 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">{step.title}</h3>
                <p className="text-sm text-slate-400">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleSkip}
              className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-400 border-slate-600/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-slate-700/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <p className="text-slate-300 leading-relaxed">{step.description}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-400 border-slate-600/50"
              >
                Skip Tutorial
              </Button>
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Complete
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Pre-defined tutorial configurations
export const SURVEY_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Your Assessment',
    description: 'This comprehensive organizational assessment will analyze your institution\'s structure and identify opportunities for improvement. The process typically takes 45-90 minutes to complete.',
    icon: Target
  },
  {
    id: 'sections',
    title: 'Assessment Sections',
    description: 'The assessment is divided into sections covering different areas of your organization. You can complete them in any order and save your progress along the way.',
    icon: FileText
  },
  {
    id: 'questions',
    title: 'Question Types',
    description: 'You\'ll encounter different types of questions: rating scales, multiple choice, and numerical inputs. Answer honestly for the most accurate analysis.',
    icon: Brain
  },
  {
    id: 'progress',
    title: 'Track Your Progress',
    description: 'Monitor your completion progress with the progress bar at the top. Your answers are automatically saved as you go.',
    icon: BarChart3
  },
  {
    id: 'analysis',
    title: 'AI-Powered Analysis',
    description: 'Once complete, our advanced AI will analyze your responses and generate personalized recommendations for organizational optimization.',
    icon: Lightbulb
  }
];

export const DASHBOARD_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome-dashboard',
    title: 'Welcome to Your Dashboard',
    description: 'Your dashboard provides a comprehensive overview of your organizational assessments, results, and recommendations.',
    icon: BarChart3
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    description: 'Use the quick action buttons to start new assessments, view results, manage your team, or adjust settings.',
    icon: Target
  },
  {
    id: 'recent-activity',
    title: 'Recent Activity',
    description: 'Stay up-to-date with your latest assessments, analysis results, and team collaborations in the activity feed.',
    icon: Clock
  },
  {
    id: 'stats-overview',
    title: 'Performance Metrics',
    description: 'Monitor your organization\'s key metrics including efficiency scores, completed assessments, and improvement trends.',
    icon: BarChart3
  }
];

export const RESULTS_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'analysis-overview',
    title: 'Your Analysis Results',
    description: 'This comprehensive analysis provides insights into your organization\'s efficiency, redundancy patterns, and optimization opportunities.',
    icon: Brain
  },
  {
    id: 'recommendations',
    title: 'AI Recommendations',
    description: 'Review prioritized recommendations with expected ROI, implementation timelines, and risk assessments.',
    icon: Lightbulb
  },
  {
    id: 'charts-insights',
    title: 'Visual Insights',
    description: 'Explore interactive charts and visualizations that make it easy to understand your organizational data and trends.',
    icon: BarChart3
  },
  {
    id: 'next-steps',
    title: 'Implementation Planning',
    description: 'Download detailed reports, schedule expert consultations, and share results with your team to begin implementation.',
    icon: Target
  }
];

// Hook for managing tutorial state
export function useTutorial(storageKey: string) {
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true); // Default to true to avoid showing on every load
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(storageKey);
    if (!seen) {
      setHasSeenTutorial(false);
      setIsTutorialOpen(true);
    }
  }, [storageKey]);

  const completeTutorial = () => {
    localStorage.setItem(storageKey, 'true');
    setHasSeenTutorial(true);
    setIsTutorialOpen(false);
  };

  const skipTutorial = () => {
    localStorage.setItem(storageKey, 'true');
    setHasSeenTutorial(true);
    setIsTutorialOpen(false);
  };

  const showTutorial = () => {
    setIsTutorialOpen(true);
  };

  const resetTutorial = () => {
    localStorage.removeItem(storageKey);
    setHasSeenTutorial(false);
    setIsTutorialOpen(true);
  };

  return {
    hasSeenTutorial,
    isTutorialOpen,
    completeTutorial,
    skipTutorial,
    showTutorial,
    resetTutorial
  };
}
