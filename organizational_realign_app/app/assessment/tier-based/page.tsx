/**
 * Tier-Based Assessment Survey
 * Implements proper tier validation and industry-specific questions
 * 
 * @version 2.0.0
 * @author NorthPath Strategies
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Upload, Clock, DollarSign } from 'lucide-react';

import { 
  getTierConfiguration, 
  hasFeatureAccess, 
  validateTierAccess,
  type PricingTier 
} from '@/lib/tierConfiguration';
import { 
  getQuestionsForTier, 
  validateResponses, 
  type Question, 
  type OrganizationType 
} from '@/lib/enhancedQuestionBank';

interface AssessmentState {
  currentSection: number;
  responses: Record<string, any>;
  organizationType: OrganizationType;
  institutionName: string;
  tier: PricingTier;
  uploadedFiles: File[];
  isComplete: boolean;
  validationErrors: string[];
}

export default function TierBasedAssessment() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    responses: {},
    organizationType: 'higher-education',
    institutionName: '',
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
      assessmentsUsed: 1,
      usersCount: 1
    });
    
    if (!validation.valid && validation.upgradeRequired) {
      setShowUpgrade(true);
    }
  }, [assessmentState.tier]);

  const handleResponse = (questionId: string, value: any) => {
    setAssessmentState(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [questionId]: value
      }
    }));
  };

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
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: assessmentState.tier,
          organizationType: assessmentState.organizationType,
          institutionName: assessmentState.institutionName,
          responses: assessmentState.responses,
          uploadedFiles: assessmentState.uploadedFiles.map(f => f.name)
        })
      });

      if (response.ok) {
        setAssessmentState(prev => ({ ...prev, isComplete: true }));
      } else {
        throw new Error('Assessment submission failed');
      }
    } catch {
      setAssessmentState(prev => ({
        ...prev,
        validationErrors: ['Failed to submit assessment. Please try again.']
      }));
    } finally {
      setLoading(false);
    }
  };

  // Likert Scale Component
  const LikertInput = ({ question, value }: { question: Question; value?: number }) => {
    const options = [
      { value: 1, label: 'Strongly Disagree', color: 'bg-red-100 text-red-800' },
      { value: 2, label: 'Disagree', color: 'bg-orange-100 text-orange-800' },
      { value: 3, label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
      { value: 4, label: 'Agree', color: 'bg-blue-100 text-blue-800' },
      { value: 5, label: 'Strongly Agree', color: 'bg-green-100 text-green-800' }
    ];

    return (
      <div className="space-y-3">
        {options.map((option) => (
          <label 
            key={option.value} 
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => handleResponse(question.id, option.value)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
              value === option.value ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
            }`}>
              {value === option.value && (
                <div className="w-full h-full rounded-full bg-white scale-50"></div>
              )}
            </div>
            <span className={`text-sm px-2 py-1 rounded ${
              value === option.value ? option.color : 'text-gray-700'
            }`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    );
  };

  // Numeric Input Component
  const NumericInput = ({ question, value }: { question: Question; value?: number }) => (
    <div className="space-y-2">
      <input
        type="number"
        value={value || ''}
        onChange={(e) => handleResponse(question.id, parseInt(e.target.value))}
        min={question.validationRules?.min}
        max={question.validationRules?.max}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter numeric value"
      />
      {question.validationRules && (
        <p className="text-xs text-gray-500">
          Range: {question.validationRules.min} - {question.validationRules.max}
        </p>
      )}
    </div>
  );

  // File Upload Component
  const FileUpload = ({ question }: { question: Question }) => (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600 mb-2">Upload organizational charts, job descriptions, or budget documents</p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
          onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
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
      
      {assessmentState.uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
          {assessmentState.uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              {file.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (assessmentState.isComplete) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
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
                    <CheckCircle2 className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
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
              <AlertTriangle className="h-6 w-6 mr-2" />
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
              <DollarSign className="h-4 w-4 mr-1" />
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
                  <CheckCircle2 className="h-4 w-4 ml-1 inline" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Messages */}
      {assessmentState.validationErrors.length > 0 && (
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {assessmentState.validationErrors.join('; ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Current Section Questions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {sectionNames[assessmentState.currentSection]}
        </h2>
        
        {currentSectionQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-start justify-between">
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
                />
              )}
              {question.type === 'numeric' && (
                <NumericInput 
                  question={question} 
                  value={assessmentState.responses[question.id]} 
                />
              )}
              {question.type === 'upload' && (
                <FileUpload question={question} />
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
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
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
