'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  CheckCircle, 
  Clock,
  Target,
  Users,
  Building,
  BookOpen,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuickNotifications } from '../ui/notification-system';
import debounce from 'lodash.debounce';
import analytics from '../../analytics/gtm-datalayer';
import { StepperWithProgress, type Step } from '../ui/stepper';
import { QuestionInput } from '../QuestionInput';
import { useTranslatedUI, useTranslatedSections, useTranslatedText, useLanguage } from '@/hooks/useLanguage';

interface Question {
  id: string;
  prompt: string;
  type: 'text' | 'numeric' | 'likert' | 'select' | 'multiselect' | 'upload';
  required?: boolean;
  options?: string[];
  section: string;
  tags?: string[];
  priority?: 'high' | 'medium' | 'low';
  helpText?: string;
}

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  questions: Question[];
  estimatedTime: number; // in minutes
  isCompleted: boolean;
  isOptional?: boolean;
}

interface AssessmentWizardProps {
  assessmentId: string;
  onComplete: (data: any) => void;
  onSave?: (data: any) => void;
  initialData?: any;
}

const stepVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const progressVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 }
};

// Analytics event hook (placeholder)
function _trackEvent(event: string, payload?: Record<string, any>) {
  // Integrate with GA4, GTM, Mixpanel, etc.
  // eslint-disable-next-line no-console
  console.log('[Analytics]', event, payload);
}

export function AssessmentWizard({ 
  assessmentId, 
  onComplete, 
  onSave,
  initialData 
}: AssessmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>(initialData || {});
  const [savedProgress, setSavedProgress] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [_isLoading, _setIsLoading] = useState(false);
  const [_saveError, setSaveError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ariaSaveStatus, setAriaSaveStatus] = useState('');
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  const { success, error, autoSave, connectionError } = useQuickNotifications();
  const { translateUI } = useTranslatedUI();
  const { translateSection } = useTranslatedSections();
  const { translateText } = useTranslatedText();
  const { institutionType: _institutionType } = useLanguage();

  const steps: WizardStep[] = [
    {
      id: 'organization-overview',
      title: translateSection('Organization Overview'),
      description: translateText('Basic information about your institution'),
      icon: <Building className="h-6 w-6" />,
      category: translateUI('Foundation'),
      questions: [
        {
          id: 'org_type',
          prompt: translateText('What type of organization best describes your institution?'),
          type: 'select',
          required: true,
          section: translateSection('Organization Overview'),
          options: ['Community College', 'Public University', 'Private University', 'Healthcare System', 'Nonprofit', 'Government Agency', 'Corporate'],
          helpText: translateText('This helps us tailor the assessment to your specific organizational context.')
        },
        {
          id: 'employee_count',
          prompt: translateText('Approximately how many full-time employees does your organization have?'),
          type: 'numeric',
          required: true,
          section: translateSection('Organization Overview'),
          helpText: translateText('Include all full-time equivalent (FTE) staff members.')
        }
      ],
      estimatedTime: 5,
      isCompleted: false
    },
    {
      id: 'leadership-structure',
      title: translateSection('Leadership & Governance'),
      description: translateText('Leadership structure and decision-making processes'),
      icon: <Users className="h-6 w-6" />,
      category: translateUI('Leadership'),
      questions: [
        {
          id: 'decision_speed',
          prompt: translateText('Our organization follows a documented, stage-gate change-management framework (e.g., ADKAR, Prosci) for all enterprise projects.'),
          type: 'likert',
          required: true,
          section: translateSection('Leadership & Governance'),
          priority: 'high',
          tags: ['CHANGE_MANAGEMENT', 'FRAMEWORKS'],
          helpText: translateText('Enhanced v2 question focusing on specific documented frameworks rather than vague change processes.')
        },
        {
          id: 'executive_sponsorship',
          prompt: translateText('An executive with budget authority meets weekly with the project lead and publicly advocates for the initiative.'),
          type: 'likert',
          required: true,
          section: translateSection('Leadership & Governance'),
          priority: 'high',
          tags: ['EXECUTIVE_SPONSORSHIP', 'PROJECT_LEADERSHIP'],
          helpText: translateText('Enhanced v2 question with specific, measurable criteria for executive engagement.')
        }
      ],
      estimatedTime: 10,
      isCompleted: false
    },
    {
      id: 'academic-operations',
      title: translateSection('Academic Operations'),
      description: translateText('Academic programs and operational efficiency'),
      icon: <BookOpen className="h-6 w-6" />,
      category: translateUI('Academics'),
      questions: [
        {
          id: 'curriculum_ai',
          prompt: translateText('AI-assisted curriculum design tools help identify skill gaps and market trends in our programs.'),
          type: 'likert',
          required: true,
          section: translateSection('Academic Operations'),
          priority: 'medium',
          tags: ['AI', 'CURRICULUM'],
          helpText: translateText('Assesses your organization\'s readiness for AI-enhanced academic planning.')
        },
        {
          id: 'program_outcomes',
          prompt: translateText('What are the top three barriers to program completion that your students/clients face?'),
          type: 'text',
          required: true,
          section: translateSection('Academic Operations'),
          priority: 'high',
          tags: ['COMPLETION_BARRIERS', 'STUDENT_SUCCESS'],
          helpText: translateText('Open-ended question to capture specific organizational challenges.')
        }
      ],
      estimatedTime: 15,
      isCompleted: false
    },
    {
      id: 'student-services',
      title: translateSection('Student Experience'),
      description: translateText('Student services and satisfaction metrics'),
      icon: <Target className="h-6 w-6" />,
      category: translateUI('Students'),
      questions: [
        {
          id: 'early_alert',
          prompt: translateText('Early-alert systems trigger outreach within 48 hours of risk flags.'),
          type: 'likert',
          required: true,
          section: translateSection('Student Experience'),
          priority: 'high',
          tags: ['EARLY_ALERT', 'STUDENT_SUCCESS'],
          helpText: translateText('Measures the responsiveness of your student support systems.')
        },
        {
          id: 'support_services',
          prompt: translateText('Which support services does your organization currently provide?'),
          type: 'multiselect',
          required: true,
          section: translateSection('Student Experience'),
          options: ['Academic Tutoring', 'Mental Health Counseling', 'Career Services', 'Financial Aid Assistance', 'Disability Services', 'Childcare', 'Transportation', 'Other'],
          helpText: translateText('Select all services that are currently available to your students/clients.')
        }
      ],
      estimatedTime: 10,
      isCompleted: false
    },
    {
      id: 'financial-sustainability',
      title: translateSection('Financial Health'),
      description: translateText('Financial stability and resource allocation'),
      icon: <CheckCircle className="h-6 w-6" />,
      category: translateUI('Finance'),
      questions: [
        {
          id: 'budget_process',
          prompt: translateText('Budget variance reports are produced within five business days of month-end.'),
          type: 'likert',
          required: true,
          section: translateSection('Financial Health'),
          priority: 'high',
          tags: ['FINANCE', 'REPORTING'],
          helpText: translateText('Assesses the timeliness and efficiency of your financial reporting processes.')
        },
        {
          id: 'cost_savings',
          prompt: translateText('What is your organization\'s 3-year cost-saving target as a percentage?'),
          type: 'numeric',
          required: false,
          section: translateSection('Financial Health'),
          priority: 'medium',
          tags: ['COST_SAVINGS', 'TARGETS'],
          helpText: translateText('Enter as a whole number (e.g., 15 for 15% cost reduction target).')
        }
      ],
      estimatedTime: 12,
      isCompleted: false,
      isOptional: true
    }
  ];

  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.isCompleted).length;
  const progress = (completedSteps / totalSteps) * 100;
  const remainingTime = steps.slice(currentStep).reduce((acc, step) => acc + step.estimatedTime, 0);

  const sectionProgressInit = useMemo(() => steps.map(() => 0), [steps.length]);
  const [sectionProgress, setSectionProgress] = useState<number[]>(sectionProgressInit);

  useEffect(() => {
    // Enhanced auto-save every 30 seconds with user activity detection
    const autoSaveInterval = setInterval(() => {
      if (Object.keys(responses).length > 0 && !isSaving) {
        handleSaveProgress().then(() => {
          autoSave(); // Show auto-save notification
        });
      }
    }, 30000); // 30 seconds

    // Save on page visibility change (when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.hidden && Object.keys(responses).length > 0 && !isSaving) {
        handleSaveProgress();
      }
    };

    // Save before page unload
    const handleBeforeUnload = () => {
      if (Object.keys(responses).length > 0) {
        // Synchronous save for page unload
        localStorage.setItem(`assessment-${assessmentId}`, JSON.stringify({
          responses,
          currentStep,
          lastSaved: new Date().toISOString()
        }));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(autoSaveInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responses, assessmentId, currentStep, isSaving, autoSave]);

  const handleSaveProgress = useCallback(async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // Save to localStorage for client-side persistence
      const saveData = {
        responses,
        currentStep,
        lastSaved: new Date().toISOString(),
        assessmentId
      };
      
      localStorage.setItem(`assessment-${assessmentId}`, JSON.stringify(saveData));

      // Also save to server if callback provided
      if (onSave) {
        await onSave({
          assessmentId,
          responses,
          currentStep,
          progress: (currentStep / totalSteps) * 100
        });
      }

      setSavedProgress(new Date());
      setAriaSaveStatus('Progress saved successfully at ' + new Date().toLocaleTimeString());
      success('Progress Saved', 'Your assessment progress has been saved successfully.');
      
    } catch (error) {
      console.error('Failed to save progress:', error);
      setSaveError('Failed to save progress. Please try again.');
      setAriaSaveStatus('Failed to save progress. Please try again.');
      connectionError();
    } finally {
      setIsSaving(false);
    }
  }, [assessmentId, responses, currentStep, totalSteps, isSaving, onSave, success, connectionError]);

  const handleStepComplete = (stepResponses: Record<string, any>) => {
    const updatedResponses = { ...responses, ...stepResponses };
    setResponses(updatedResponses);
    
    // Mark current step as completed
    steps[currentStep].isCompleted = true;
    
    // Auto-save when step is completed
    handleSaveProgress();

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Assessment complete
      onComplete(updatedResponses);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkipStep = () => {
    if (steps[currentStep].isOptional && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleJumpToStep = async (stepIndex: number) => {
    // Only allow jumping to previous steps or next step if current is completed
    if (stepIndex <= currentStep || steps[currentStep].isCompleted) {
      setIsTransitioning(true);
      
      // Save current progress before switching
      if (Object.keys(responses).length > 0) {
        await handleSaveProgress();
      }
      
      setTimeout(() => {
        setCurrentStep(stepIndex);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const currentStepData = steps[currentStep];

  // Convert wizard steps to stepper steps
  const stepperSteps: Step[] = steps.map((step, index) => ({
    id: step.id,
    title: step.title,
    description: step.description,
    status: step.isCompleted 
      ? 'completed' 
      : index === currentStep 
      ? 'current' 
      : 'upcoming',
    optional: step.isOptional,
    estimatedTime: step.estimatedTime
  }));

  // Update section progress when responses change
  useEffect(() => {
    const progressArr = steps.map((step) => {
      if (!step.questions || step.questions.length === 0) return 100;
      const answered = step.questions.filter(q => {
        const response = responses[q.id];
        if (response === undefined || response === null) return false;
        if (Array.isArray(response)) return response.length > 0;
        if (typeof response === 'string') return response.trim() !== '';
        return true;
      }).length;
      return Math.round((answered / step.questions.length) * 100);
    });
    setSectionProgress(progressArr);
  }, [responses, steps]);

  // Update ARIA live region on save
  useEffect(() => {
    if (isSaving) setAriaSaveStatus('Saving progress...');
    else if (savedProgress) setAriaSaveStatus('Progress saved at ' + savedProgress.toLocaleTimeString());
  }, [isSaving, savedProgress]);

  // Focus management on step change
  useEffect(() => {
    const stepHeader = document.getElementById('step-header');
    if (stepHeader) stepHeader.focus();
  }, [currentStep]);

  // Debounced autosave - Updated to 3-second debounce as specified in requirements
  const debouncedSave = useMemo(() => debounce(() => {
    handleSaveProgress();
    analytics.emitEvent('autosave', { assessmentId, currentStep });
  }, 3000), [assessmentId, currentStep, handleSaveProgress]); // 3-second debounce

  // Trigger debounced autosave on responses/step change
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      debouncedSave();
    }
    return () => debouncedSave.cancel();
  }, [responses, currentStep, debouncedSave]);

  // Analytics: step navigation
  useEffect(() => {
    analytics.trackStepComplete(currentStep, currentStepData?.title || '', 0); // Duration can be tracked if available
  }, [currentStep, currentStepData]);

  // Analytics: assessment start
  useEffect(() => {
    if (currentStep === 0) {
      analytics.trackAssessmentStart();
    }
  }, [currentStep]);

  // Analytics: manual save
  const handleSaveProgressWithAnalytics = useCallback(async () => {
    await handleSaveProgress();
    analytics.emitEvent('manual_save', { assessmentId, currentStep });
  }, [handleSaveProgress, assessmentId, currentStep]);

  // Analytics: assessment complete
  const handleStepCompleteWithAnalytics = (stepResponses: Record<string, any>) => {
    handleStepComplete(stepResponses);
    if (currentStep === totalSteps - 1) {
      analytics.trackAssessmentSubmit(0, '', ''); // Fill with real score/tier/segment if available
    }
  };

  // Analytics: flag-for-follow-up
  const handleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
    analytics.trackFlagForFollowup(questionId, currentStep);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 relative overflow-hidden" style={{background: 'radial-gradient(ellipse at 60% 20%, rgba(124,58,237,0.10) 0%, rgba(16,78,139,0.08) 60%, transparent 100%)'}} role="main" aria-label="Assessment Wizard">
      {/* --- Hero Section: Premium, Animated, Parallax, Fade-in --- */}
      <div className="relative w-full h-72 md:h-96 flex items-center justify-center mb-12 rounded-b-3xl overflow-hidden shadow-2xl border-b-4 border-emerald-400/30">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt={translateUI('Professional Consulting Team')}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 md:scale-100 transition-transform duration-1000 ease-out"
          style={{ filter: 'brightness(0.5) saturate(1.1)' }}
        />
        {/* Animated shimmer overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(120deg, rgba(124,58,237,0.18) 0%, rgba(16,78,139,0.12) 60%, transparent 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-emerald-900/70" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 id="step-header" tabIndex={-1} className="text-4xl md:text-6xl font-serif font-extrabold text-white drop-shadow-2xl tracking-tight mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
            {translateUI('Organizational Realignment Assessment')}
          </h1>
          <p className="text-lg md:text-2xl text-slate-100 font-light max-w-2xl mx-auto mb-3">
            {translateText('Unlock actionable insights and drive transformation with')} <span className="font-semibold text-emerald-300">NorthPath Strategies</span>
          </p>
          <span className="inline-block bg-emerald-600/90 text-white text-xs font-semibold rounded-full px-5 py-2 mt-2 shadow-md tracking-wider uppercase">
            {translateUI('Confidential • Data-Driven • Expert-Led')}
          </span>
        </div>
        {/* Animated divider */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2 rounded-full bg-gradient-to-r from-purple-500/60 via-emerald-400/40 to-cyan-400/60 shadow-lg"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* ARIA live region for save status */}
      <div aria-live="polite" className="sr-only" role="status">{ariaSaveStatus}</div>

      {/* Header with Progress */}
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 shadow-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif tracking-tight" tabIndex={0} aria-label="Organizational Assessment">{translateUI('Organizational Assessment')}</h1>
              <div className="flex items-center space-x-4 mt-1">
                <p className="text-slate-400">{translateUI('Step')} {currentStep + 1} {translateUI('of')} {totalSteps}</p>
                <span className="text-slate-500">•</span>
                <p className="text-slate-400">{currentStepData.category}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-600">
                <Clock className="h-4 w-4" />
                <span>~{remainingTime} {translateUI('min remaining')}</span>
              </div>
              <Button
                onClick={handleSaveProgress}
                disabled={isSaving}
                variant="outline"
                size="sm"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-400"
                aria-label="Save Progress"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? translateUI('Saving...') : translateUI('Save Progress')}
              </Button>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="space-y-3">
            <motion.div 
              className="relative h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-600"
              initial="hidden"
              animate="visible"
              variants={progressVariants}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Assessment progress"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full shadow-lg shadow-purple-500/10"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ width: "30%" }}
              />
            </motion.div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-4">
                <span className="text-slate-400">
                  {completedSteps} {translateUI('of')} {totalSteps} {translateUI('sections completed')}
                </span>
                {isSaving && (
                  <motion.div 
                    className="flex items-center space-x-2 text-cyan-400"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium">{translateUI('Auto-saving...')}</span>
                  </motion.div>
                )}
                {savedProgress && !isSaving && (
                  <motion.div 
                    className="flex items-center space-x-2 text-emerald-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <CheckCircle className="h-3 w-3" />
                    <span className="text-xs">{translateUI('Saved')}</span>
                  </motion.div>
                )}
              </div>
              <span className="text-slate-400 font-medium">{Math.round(progress)}% {translateUI('complete')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-16">
          {/* Sidebar - Enhanced Stepper Navigation with Shad CN Stepper */}
          <Card className="card border-l-4 border-emerald-400 bg-slate-900/95 shadow-lg p-0 rounded-3xl backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-slate-100 font-serif tracking-tight">{translateUI('Assessment Progress')}</CardTitle>
              <div className="mt-2 mb-4 text-slate-300 text-base font-medium">
                {translateUI('Step')} {currentStep + 1} {translateUI('of')} {totalSteps} – <span className="text-emerald-300 font-semibold">{currentStepData.title}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Shad CN Stepper Component as specified in requirements */}
              <StepperWithProgress
                steps={stepperSteps}
                currentStep={currentStep}
                onStepClick={handleJumpToStep}
                orientation="vertical"
                variant="numbered"
                allowClickableSteps={true}
                showProgress={true}
                progressLabel={translateUI('Overall Progress')}
                className="mb-6"
              />

              {/* Enhanced features list */}
              <motion.div 
                className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <Target className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="text-cyan-300 font-semibold">{translateUI('Smart Features')}</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-emerald-400" />
                      <span>{translateUI('Real-time progress tracking')}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-emerald-400" />
                      <span>{translateUI('Auto-save every 30 seconds')}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-emerald-400" />
                      <span>{translateUI('Skip optional sections')}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-emerald-400" />
                      <span>{translateUI('Instant validation feedback')}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-emerald-400" />
                      <span>{translateUI('Flag-for-follow-up questions')}</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Help and Tips Section */}
              <motion.div 
                className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 shadow shadow-amber-400/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
                  <div>
                    <h5 className="text-amber-300 font-medium mb-2">{translateUI('Assessment Tips')}</h5>
                    <ul className="text-sm text-amber-200/80 space-y-1">
                      <li>• {translateText('Answer honestly for the most accurate insights')}</li>
                      <li>• {translateText('You can save progress and return later')}</li>
                      <li>• {translateText('Optional sections can be skipped if not applicable')}</li>
                      <li>• {translateText('Use the flag feature for questions needing follow-up')}</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </CardContent>

            {/* Animated trust badge */}
            <motion.div
              className="mt-10 flex items-center gap-2 bg-white/90 border border-emerald-200 shadow rounded-full px-4 py-1.5 text-emerald-700 font-medium text-xs backdrop-blur-sm shadow-emerald-200/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <CheckCircle className="h-4 w-4 text-emerald-400 animate-pulse" />
              {translateUI('Trusted by leading institutions')}
            </motion.div>
          </Card>

          {/* Main Content - Current Step */}
          <div className="lg:col-span-3">
            <Card className="card shadow-2xl border border-slate-700/40 bg-slate-900/98 backdrop-blur-lg p-0 rounded-3xl">
              <CardHeader className="pb-4 md:pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl font-serif font-bold text-slate-100 flex items-center space-x-3 tracking-tight">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        {currentStepData.icon}
                      </div>
                      <span>{currentStepData.title}</span>
                    </CardTitle>
                    <p className="text-base md:text-lg text-slate-300 mt-2 font-light leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </div>
                  <Badge className="bg-slate-700 text-slate-200 text-xs md:text-sm px-3 py-1 font-medium">
                    {currentStepData.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 md:space-y-10">
                {/* Enhanced Step Content with Interactive Elements */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={stepVariants}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Section Header with Status */}
                    <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-xl p-6 shadow-md shadow-purple-500/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg shadow-purple-400/20">
                            {currentStepData.icon}
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-100">
                              {currentStepData.title}
                            </h3>
                            <p className="text-slate-300 mt-1 text-base md:text-lg font-light leading-relaxed">
                              {currentStepData.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg">
                            <Clock className="h-4 w-4" />
                            <span>{currentStepData.estimatedTime} {translateUI('min')}</span>
                          </div>
                          {currentStepData.isCompleted && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", duration: 0.6 }}
                              className="flex items-center space-x-2 text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/30 animate-pulse shadow shadow-emerald-400/10"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">{translateUI('Completed')}</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      {/* Progress indicator for current section */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>{translateUI('Section Progress')}</span>
                          <span>{sectionProgress[currentStep] || 0}%</span>
                        </div>
                        <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md shadow-purple-500/10"
                            initial={{ width: "0%" }}
                            animate={{ width: `${sectionProgress[currentStep] || 0}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actual Questions for Current Step */}
                    <div className="space-y-6">
                      {currentStepData.questions.map((question, _index) => (
                        <QuestionInput
                          key={question.id}
                          question={question}
                          value={responses[question.id]}
                          onChange={(value) => {
                            setResponses(prev => ({ ...prev, [question.id]: value }));
                          }}
                          isFlagged={flaggedQuestions[question.id] || false}
                          onFlagChange={(_flagged) => handleFlagQuestion(question.id)}
                        />
                      ))}
                    </div>

                    {/* Enhanced navigation hint */}
                    <motion.div 
                      className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-purple-300 font-semibold">{translateUI('Smart Assessment Features')}</span>
                      </div>
                      
                      <ul className="space-y-2 text-sm text-purple-200/80">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-emerald-400" />
                          <span>{translateText('Responses auto-save every 3 seconds')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-emerald-400" />
                          <span>{translateText('Flag questions for follow-up discussion')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-emerald-400" />
                          <span>{translateText('Enhanced accessibility with 4.5:1 contrast ratio')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-emerald-400" />
                          <span>{translateText('AI-powered insights and recommendations')}</span>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Help and Tips Section */}
                    <motion.div 
                      className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 shadow shadow-amber-400/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
                        <div>
                          <h5 className="text-amber-300 font-medium mb-2">{translateUI('Assessment Tips')}</h5>
                          <ul className="text-sm text-amber-200/80 space-y-1">
                            <li>• {translateText('Answer honestly for the most accurate insights')}</li>
                            <li>• {translateText('You can save progress and return later')}</li>
                            <li>• {translateText('Optional sections can be skipped if not applicable')}</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Enhanced Navigation Controls */}
                <motion.div 
                  className="flex items-center justify-between pt-8 border-t border-slate-600 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={handlePreviousStep}
                      disabled={currentStep === 0}
                      variant="outline"
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      {translateUI('Previous')}
                    </Button>
                    
                    <Button
                      onClick={handleSaveProgress}
                      disabled={isSaving}
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? translateUI('Saving...') : translateUI('Save Now')}
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    {currentStepData.isOptional && (
                      <Button
                        onClick={handleSkipStep}
                        variant="outline"
                        className="bg-amber-900/20 hover:bg-amber-800/30 text-amber-300 border-amber-500/30 hover:border-amber-400/50 transition-all duration-200"
                      >
                        {translateUI('Skip Section')}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => handleStepComplete({})} // Placeholder - would pass actual responses
                        disabled={isTransitioning || isSaving}
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 md:px-8 md:py-3 shadow-lg shadow-purple-500/25 transition-all duration-200 font-semibold text-base md:text-lg"
                      >
                        {currentStep === totalSteps - 1 ? (
                          <>
                            {translateUI('Complete Assessment')}
                            <CheckCircle className="h-5 w-5 ml-2" />
                          </>
                        ) : (
                          <>
                            {translateUI('Continue to')} {steps[currentStep + 1]?.title}
                            <ChevronRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Need Help button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-xl rounded-full px-6 py-3 flex items-center gap-2 font-semibold text-base hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 drop-shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        aria-label={translateUI('Need Help? Contact Support')}
        tabIndex={0}
        onClick={() => window.open('mailto:consult@northpathstrategies.org?subject=Assessment%20Support', '_blank')}
        whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(16,185,129,0.25)' }}
        whileTap={{ scale: 0.97 }}
      >
        <Sparkles className="h-5 w-5 animate-bounce" />
        {translateUI('Need Help?')}
        <span className="sr-only">{translateUI('Contact NorthPath Strategies support')}</span>
      </motion.button>

      {/* Footer: gradient, logo animation, more whitespace */}
      <footer className="w-full mt-24 py-12 border-t-2 border-slate-800 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-center text-slate-500 text-xs z-10 relative">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.img src="/logo.png" alt="NorthPath Strategies Logo" className="h-7 w-7 rounded-full border border-slate-700 shadow shadow-emerald-400/10" initial={{ rotate: 0 }} animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
            <span className="font-semibold text-slate-200">NorthPath Strategies</span>
            <span className="mx-2">|</span>
            <span>{translateUI('Organizational Realignment & Consulting')}</span>
          </div>
          <div>
            <a href="mailto:consult@northpathstrategies.org" className="text-emerald-400 hover:underline font-medium">{translateUI('Book a Consultation')}</a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
