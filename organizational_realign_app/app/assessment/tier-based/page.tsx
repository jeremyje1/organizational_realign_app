/**
 * Tier-Based Assessment Survey
 * Implements proper tier validation and industry-specific questions
 * 
 * @version 2.0.0
 * @author NorthPath Strategies
 */

'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';


import { 
  getTierConfiguration, 
  hasFeatureAccess, 
  validateTierAccess,
  type PricingTier 
} from '@/lib/tierConfiguration';
import { 
  getQuestionsForTier, 
  validateAssessmentResponses as validateResponses,
  getAIOpportunityQuestions as _getAIOpportunityQuestions,
  getAIReadinessAssessment as _getAIReadinessAssessment,
  type Question, 
  type OrganizationType 
} from '@/lib/enhancedQuestionBankV3';

interface AssessmentState {
  currentSection: number;
  responses: Record<string, any>;
  organizationType: OrganizationType;
  institutionName: string;
  contactEmail: string;
  contactName: string;
  tier: PricingTier;
  uploadedFiles: File[];
  isComplete: boolean;
  validationErrors: string[];
}

// Memoized Input Components to prevent unnecessary re-renders
const LikertInput = React.memo(({ question, value, onResponse }: { 
  question: Question; 
  value?: number; 
  onResponse: (questionId: string, value: any) => void;
}) => {
  const options = [
    { value: 1, label: 'Strongly Disagree', color: 'bg-red-100 text-red-800' },
    { value: 2, label: 'Disagree', color: 'bg-orange-100 text-orange-800' },
    { value: 3, label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
    { value: 4, label: 'Agree', color: 'bg-blue-100 text-blue-800' },
    { value: 5, label: 'Strongly Agree', color: 'bg-green-100 text-green-800' }
  ];

  return (
    <div className="space-y-3" role="radiogroup" aria-labelledby={`question-${question.id}`}>
      {options.map((option) => (
        <label 
          key={option.value} 
          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
            value === option.value 
              ? 'border-blue-500 bg-blue-50 shadow-sm' 
              : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name={`likert-${question.id}`}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onResponse(question.id, parseInt(e.target.value))}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <div className="ml-3 flex-1">
            <span className={`text-sm font-medium px-2 py-1 rounded ${
              value === option.value ? option.color : 'text-gray-700'
            }`}>
              {option.label}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
});
LikertInput.displayName = 'LikertInput';

const NumericInput = React.memo(({ question, value, onResponse }: { 
  question: Question; 
  value?: number; 
  onResponse: (questionId: string, value: any) => void;
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onResponse(question.id, parseInt(e.target.value));
  }, [onResponse, question.id]);

  return (
    <div className="space-y-2">
      <input
        key={`number-${question.id}`}
        type="number"
        value={value || ''}
        onChange={handleChange}
        min={question.validationRules?.min}
        max={question.validationRules?.max}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter numeric value"
        autoComplete="off"
      />
      {question.validationRules && (
        <p className="text-xs text-gray-500">
          Range: {question.validationRules.min} - {question.validationRules.max}
        </p>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.question.id === nextProps.question.id &&
    prevProps.value === nextProps.value &&
    prevProps.onResponse === nextProps.onResponse
  );
});
NumericInput.displayName = 'NumericInput';

const TextInput = React.memo(({ question, value, onResponse }: { 
  question: Question; 
  value?: string; 
  onResponse: (questionId: string, value: any) => void;
}) => {
  const [localValue, setLocalValue] = useState(value || '');
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Update local value when prop changes (for external updates)
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Debounce the callback to parent
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onResponse(question.id, newValue);
    }, 500); // 500ms debounce
  }, [onResponse, question.id]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-2">
      <textarea
        value={localValue}
        onChange={handleChange}
        rows={4}
        maxLength={question.validationRules?.maxLength}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
        placeholder="Enter your response here..."
        autoComplete="off"
      />
      {question.validationRules?.maxLength && (
        <p className="text-xs text-gray-500">
          {localValue.length} / {question.validationRules.maxLength} characters
        </p>
      )}
      {question.helpText && (
        <p className="text-xs text-gray-600">{question.helpText}</p>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return (
    prevProps.question.id === nextProps.question.id &&
    prevProps.value === nextProps.value &&
    prevProps.onResponse === nextProps.onResponse
  );
});
TextInput.displayName = 'TextInput';

const FileUpload = React.memo(({ 
  question, 
  onFileUpload, 
  uploadedFiles 
}: { 
  question: Question;
  onFileUpload: (files: File[]) => void;
  uploadedFiles: File[];
}) => (
  <div className="space-y-4">
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <div className="h-8 w-8 text-gray-400 mx-auto mb-2 flex items-center justify-center text-2xl">📁</div>
      <p className="text-gray-600 mb-2">Upload organizational charts, job descriptions, or budget documents</p>
      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
        onChange={(e) => onFileUpload(Array.from(e.target.files || []))}
        className="hidden"
        id={`upload-${question.id}`}
      />
      <label 
        htmlFor={`upload-${question.id}`}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
      >
        Choose Files
      </label>
    </div>
    
    {uploadedFiles.length > 0 && (
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
        {uploadedFiles.map((file, index) => (
          <div key={index} className="flex items-center text-sm text-gray-600">
            <span className="text-green-500 mr-2">✓</span>
            {file.name}
          </div>
        ))}
      </div>
    )}
  </div>
));
FileUpload.displayName = 'FileUpload';

function TierBasedAssessmentContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    responses: {},
    organizationType: (searchParams.get('orgType') as OrganizationType) || 'higher-education',
    institutionName: '',
    contactEmail: '',
    contactName: '',
    tier: (searchParams.get('tier') as PricingTier) || 'one-time-diagnostic',
    uploadedFiles: [],
    isComplete: false,
    validationErrors: []
  });

  // Get tier configuration and questions
  const tierConfig = useMemo(() => 
    getTierConfiguration(assessmentState.tier), 
    [assessmentState.tier]
  );
  
  const questions = useMemo(() => 
    getQuestionsForTier(assessmentState.tier, assessmentState.organizationType),
    [assessmentState.tier, assessmentState.organizationType]
  );

  // Group questions by section
  const questionSections = useMemo(() => {
    const sections: Record<string, Question[]> = {};
    questions.forEach(q => {
      if (!sections[q.section]) sections[q.section] = [];
      sections[q.section].push(q);
    });
    return sections;
  }, [questions]);

  const sectionNames = Object.keys(questionSections);
  const currentSectionQuestions = questionSections[sectionNames[assessmentState.currentSection]] || [];
  
  // Calculate progress
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(assessmentState.responses).length;
  const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  // Validate tier access
  useEffect(() => {
    const validation = validateTierAccess(assessmentState.tier, {
      assessmentsUsed: 0, // Check if they can start a new assessment
      usersCount: 1
    });
    
    if (!validation.valid && validation.upgradeRequired) {
      setShowUpgrade(true);
    }
  }, [assessmentState.tier]);

  const handleResponse = useCallback((questionId: string, value: any) => {
    setAssessmentState(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [questionId]: value
      }
    }));
  }, []);

  const handleFileUpload = (files: File[]) => {
    if (!hasFeatureAccess(assessmentState.tier, 'uploadSupport')) {
      setShowUpgrade(true);
      return;
    }
    
    setAssessmentState(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files]
    }));
  };

  const navigateSection = (direction: 'next' | 'prev') => {
    const newSection = direction === 'next' 
      ? Math.min(assessmentState.currentSection + 1, sectionNames.length - 1)
      : Math.max(assessmentState.currentSection - 1, 0);
    
    setAssessmentState(prev => ({
      ...prev,
      currentSection: newSection
    }));
  };

  const submitAssessment = async () => {
    setLoading(true);
    
    // Clear any previous validation errors
    setAssessmentState(prev => ({
      ...prev,
      validationErrors: []
    }));
    
    // Validate responses
    const validation = validateResponses(
      assessmentState.responses, 
      assessmentState.tier, 
      assessmentState.organizationType
    );
    
    if (!validation.valid) {
      setAssessmentState(prev => ({
        ...prev,
        validationErrors: [`Missing required responses: ${validation.missingRequired.join(', ')}`]
      }));
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting assessment with data:', {
        tier: assessmentState.tier,
        organizationType: assessmentState.organizationType,
        institutionName: assessmentState.institutionName,
        responseCount: Object.keys(assessmentState.responses).length,
        uploadedFileCount: assessmentState.uploadedFiles.length
      });

      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({        tier: assessmentState.tier,
        organizationType: assessmentState.organizationType,
        institutionName: assessmentState.institutionName,
        contactEmail: assessmentState.contactEmail,
        contactName: assessmentState.contactName,
        responses: assessmentState.responses,
        uploadedFiles: assessmentState.uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Assessment submitted successfully:', result);
        setAssessmentState(prev => ({ ...prev, isComplete: true }));
        
        // Optional: Redirect to results page if provided
        if (result.redirectUrl) {
          setTimeout(() => {
            window.location.href = result.redirectUrl;
          }, 2000); // Give user time to see success message
        }
      } else {
        console.error('Assessment submission failed:', result);
        throw new Error(result.error || 'Assessment submission failed');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setAssessmentState(prev => ({
        ...prev,
        validationErrors: [error instanceof Error ? error.message : 'Failed to submit assessment. Please try again.']
      }));
    } finally {
      setLoading(false);
    }
  };

  if (assessmentState.isComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="text-6xl text-green-500 mx-auto mb-4">✅</div>
            <CardTitle className="text-2xl text-green-700">Assessment Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Your {tierConfig.name} assessment has been submitted successfully.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next:</h3>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                {tierConfig.coreDeliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">✓</span>
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-500">
              Processing time: {tierConfig.assessmentScope.followUpSupport}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showUpgrade) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-amber-600">
              <span className="text-amber-600 mr-2">⚠️</span>
              Upgrade Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>The feature you&apos;re trying to access requires a higher service tier.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(getTierConfiguration('comprehensive-package')).slice(0, 2).map(([key, tier]) => (
                <div key={key} className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{tier.name}</h3>
                  <p className="text-2xl font-bold text-green-600">${tier.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{tier.targetCustomer}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => setShowUpgrade(false)} variant="outline">
              Continue with Current Tier
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Organizational Assessment - {tierConfig.name}
            </h1>
            <p className="text-gray-600 mt-2">{tierConfig.targetCustomer}</p>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="mb-2">
              <span className="mr-1">💰</span>
              ${tierConfig.price.toLocaleString()}
            </Badge>
            <p className="text-sm text-gray-500">{tierConfig.assessmentScope.reportPages} page report</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress: {answeredQuestions} of {totalQuestions} questions</span>
            <span>{Math.round(progressPercentage)}% complete</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mt-4">
          {sectionNames.map((section, index) => {
            const sectionQuestions = questionSections[section];
            const sectionAnswered = sectionQuestions.filter(q => 
              assessmentState.responses[q.id] !== undefined
            ).length;
            
            return (
              <button
                key={section}
                onClick={() => setAssessmentState(prev => ({ ...prev, currentSection: index }))}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  index === assessmentState.currentSection
                    ? 'bg-blue-600 text-white'
                    : sectionAnswered === sectionQuestions.length
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section}
                {sectionAnswered === sectionQuestions.length && (
                  <span className="ml-1 inline text-green-600">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Messages */}
      {assessmentState.validationErrors.length > 0 && (
        <Alert className="mb-6">
          <span className="text-red-600 mr-2">⚠️</span>
          <AlertDescription>
            {assessmentState.validationErrors.join('; ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Contact Information Section - shown only on first section */}
      {assessmentState.currentSection === 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
            <p className="text-sm text-gray-600">
              We&apos;ll use this information to send you updates about your assessment and results.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-2">
                Institution/Organization Name *
              </label>
              <input
                id="institutionName"
                type="text"
                value={assessmentState.institutionName}
                onChange={(e) => setAssessmentState(prev => ({ ...prev, institutionName: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your institution or organization name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  id="contactName"
                  type="text"
                  value={assessmentState.contactName}
                  onChange={(e) => setAssessmentState(prev => ({ ...prev, contactName: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  value={assessmentState.contactEmail}
                  onChange={(e) => setAssessmentState(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: We&apos;ll send you a confirmation email and notify you when results are ready
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Section Questions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {sectionNames[assessmentState.currentSection]}
        </h2>
        
        {currentSectionQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-start justify-between" id={`question-${question.id}`}>
                <span className="flex-1">{question.prompt}</span>
                <div className="flex items-center space-x-2 ml-4">
                  {question.required && (
                    <Badge variant="destructive" className="text-xs">Required</Badge>
                  )}
                  {question.tags?.includes('AI') && (
                    <Badge variant="secondary" className="text-xs">AI-Enhanced</Badge>
                  )}
                </div>
              </CardTitle>
              {question.helpText && (
                <p className="text-sm text-gray-600">{question.helpText}</p>
              )}
            </CardHeader>
            <CardContent>
              {question.type === 'likert' && (
                <LikertInput 
                  question={question} 
                  value={assessmentState.responses[question.id]}
                  onResponse={handleResponse}
                />
              )}
              {question.type === 'numeric' && (
                <NumericInput 
                  question={question} 
                  value={assessmentState.responses[question.id]}
                  onResponse={handleResponse}
                />
              )}
              {question.type === 'text' && (
                <TextInput 
                  question={question} 
                  value={assessmentState.responses[question.id]}
                  onResponse={handleResponse}
                />
              )}
              {question.type === 'upload' && (
                <FileUpload 
                  question={question}
                  onFileUpload={handleFileUpload}
                  uploadedFiles={assessmentState.uploadedFiles}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => navigateSection('prev')}
          disabled={assessmentState.currentSection === 0}
          variant="outline"
        >
          Previous Section
        </Button>
        
        <div className="space-x-4">
          {assessmentState.currentSection === sectionNames.length - 1 ? (
            <Button
              onClick={submitAssessment}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <span className="mr-2 animate-spin">⏳</span>
                  Submitting...
                </>
              ) : (
                'Submit Assessment'
              )}
            </Button>
          ) : (
            <Button
              onClick={() => navigateSection('next')}
              disabled={assessmentState.currentSection === sectionNames.length - 1}
            >
              Next Section
            </Button>
          )}
        </div>
      </div>

      {/* Tier Features Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Your {tierConfig.name} Package Includes:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Assessment Scope:</h4>
              <ul className="text-sm space-y-1">
                <li>• {tierConfig.assessmentScope.questionCount} targeted questions</li>
                <li>• {tierConfig.assessmentScope.algorithms.join(', ')} analysis algorithms</li>
                <li>• {tierConfig.assessmentScope.reportPages} page comprehensive report</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Included Features:</h4>
              <ul className="text-sm space-y-1">
                {tierConfig.features.uploadSupport && <li>• Secure file upload capability</li>}
                {tierConfig.features.dashboardRefresh && <li>• Dashboard refresh & CSV exports</li>}
                {tierConfig.features.powerBIEmbedded && <li>• Power BI embedded dashboards</li>}
                {tierConfig.features.scenarioBuilder && <li>• Scenario modeling tools</li>}
                {tierConfig.features.monteCarloSimulation && <li>• Monte Carlo simulations</li>}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function TierBasedAssessment() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessment...</p>
        </div>
      </div>
    }>
      <TierBasedAssessmentContent />
    </Suspense>
  );
}
