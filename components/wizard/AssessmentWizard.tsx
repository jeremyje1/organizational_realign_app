'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
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
  ArrowRight
} from 'lucide-react';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  questions: any[];
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

  const steps: WizardStep[] = [
    {
      id: 'organization-overview',
      title: 'Organization Overview',
      description: 'Basic information about your institution',
      icon: <Building className="h-6 w-6" />,
      category: 'Foundation',
      questions: [], // Will be populated from question bank
      estimatedTime: 5,
      isCompleted: false
    },
    {
      id: 'leadership-structure',
      title: 'Leadership & Governance',
      description: 'Leadership structure and decision-making processes',
      icon: <Users className="h-6 w-6" />,
      category: 'Leadership',
      questions: [],
      estimatedTime: 10,
      isCompleted: false
    },
    {
      id: 'academic-operations',
      title: 'Academic Operations',
      description: 'Academic programs and operational efficiency',
      icon: <BookOpen className="h-6 w-6" />,
      category: 'Academics',
      questions: [],
      estimatedTime: 15,
      isCompleted: false
    },
    {
      id: 'student-services',
      title: 'Student Experience',
      description: 'Student services and satisfaction metrics',
      icon: <Target className="h-6 w-6" />,
      category: 'Students',
      questions: [],
      estimatedTime: 10,
      isCompleted: false
    },
    {
      id: 'financial-sustainability',
      title: 'Financial Health',
      description: 'Financial stability and resource allocation',
      icon: <CheckCircle className="h-6 w-6" />,
      category: 'Finance',
      questions: [],
      estimatedTime: 12,
      isCompleted: false,
      isOptional: true
    }
  ];

  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.isCompleted).length;
  const progress = (completedSteps / totalSteps) * 100;
  const totalEstimatedTime = steps.reduce((acc, step) => acc + step.estimatedTime, 0);
  const remainingTime = steps.slice(currentStep).reduce((acc, step) => acc + step.estimatedTime, 0);

  useEffect(() => {
    // Auto-save progress every 2 minutes
    const autoSaveInterval = setInterval(() => {
      if (Object.keys(responses).length > 0) {
        handleSaveProgress();
      }
    }, 120000); // 2 minutes

    return () => clearInterval(autoSaveInterval);
  }, [responses]);

  const handleSaveProgress = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      // Save to localStorage for client-side persistence
      localStorage.setItem(`assessment-${assessmentId}`, JSON.stringify({
        responses,
        currentStep,
        lastSaved: new Date().toISOString()
      }));

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
    } catch (error) {
      console.error('Failed to save progress:', error);
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleJumpToStep = (stepIndex: number) => {
    // Only allow jumping to previous steps or next step if current is completed
    if (stepIndex <= currentStep || steps[currentStep].isCompleted) {
      setCurrentStep(stepIndex);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen elegant-bg">
      {/* Header with Progress */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Organizational Assessment</h1>
              <p className="text-slate-400">Step {currentStep + 1} of {totalSteps}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Clock className="h-4 w-4" />
                <span>~{remainingTime} min remaining</span>
              </div>
              
              <Button
                onClick={handleSaveProgress}
                disabled={isSaving}
                variant="outline"
                size="sm"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Progress'}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{completedSteps} of {totalSteps} sections completed</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Step Navigation */}
          <div className="lg:col-span-1">
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-lg text-slate-100">Assessment Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      index === currentStep
                        ? 'border-purple-500 bg-purple-500/10'
                        : index < currentStep || step.isCompleted
                        ? 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20'
                        : 'border-slate-600 bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleJumpToStep(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        index === currentStep
                          ? 'bg-purple-500/20 text-purple-400'
                          : step.isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-700 text-slate-400'
                      }`}>
                        {step.isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          step.icon
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-slate-100 truncate">
                            {step.title}
                          </h4>
                          {step.isOptional && (
                            <Badge variant="outline" className="text-xs">
                              Optional
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{step.estimatedTime} min</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Last Saved Indicator */}
            {savedProgress && (
              <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Last saved: {savedProgress.toLocaleTimeString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Main Content - Current Step */}
          <div className="lg:col-span-3">
            <Card className="card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-slate-100 flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        {currentStepData.icon}
                      </div>
                      <span>{currentStepData.title}</span>
                    </CardTitle>
                    <p className="text-slate-300 mt-2">{currentStepData.description}</p>
                  </div>
                  
                  <Badge className="bg-slate-700 text-slate-200">
                    {currentStepData.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step Content Placeholder */}
                <div className="bg-slate-800/30 border border-slate-600/50 rounded-lg p-8 text-center">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto">
                      {currentStepData.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100">
                      {currentStepData.title} Questions
                    </h3>
                    <p className="text-slate-300">
                      This section will contain the specific questions for {currentStepData.title.toLowerCase()}.
                      Questions will be loaded dynamically based on the assessment configuration.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span>Estimated time: {currentStepData.estimatedTime} minutes</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-600">
                  <Button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-3">
                    {currentStepData.isOptional && (
                      <Button
                        onClick={handleSkipStep}
                        variant="outline"
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600"
                      >
                        Skip Section
                      </Button>
                    )}

                    <Button
                      onClick={() => handleStepComplete({})} // Placeholder - would pass actual responses
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {currentStep === totalSteps - 1 ? (
                        <>
                          Complete Assessment
                          <CheckCircle className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        <>
                          Continue
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
