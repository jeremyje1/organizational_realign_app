/* ------------------------------------------------------------------
   app/realignment/page.tsx
   Enhanced realignment survey with comprehensive question bank,
   semantic structure, accessibility, and responsive design
------------------------------------------------------------------- */

'use client';

import { useState, useRef } from 'react';
import { ChevronRight, AlertCircle, CheckCircle2, Building2, HelpCircle } from 'lucide-react';
import { 
  allQuestions as northpathQuestions,
  OrganizationType,
  Question as NorthpathQuestion
} from '@/data/northpathQuestionBank';

// Extend the NORTHPATH question interface for the realignment context
interface RealignmentQuestion extends NorthpathQuestion {
  help?: {
    title: string;
    content: string;
    examples?: string[];
  };
  priority?: string; // Add priority field for backward compatibility
}

interface FormErrors {
  [key: string]: string;
}

/**
 * Accepts an optional `slug` via URL query: /realignment?slug=hcc
 */
export default function RealignmentPage({
  searchParams,
}: {
  searchParams?: { slug?: string };
}) {
  const _slug = searchParams?.slug;
  const mainContentRef = useRef<HTMLElement>(null);
  
  // Form state management
  const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<OrganizationType | null>(null);
  const [_currentSection, setCurrentSection] = useState<string>('Institution Type');

  // Get organization type selection question
  const organizationTypeQuestion: RealignmentQuestion = {
    id: 'ORG_TYPE',
    section: 'Organization Type',
    prompt: 'What type of organization are you?',
    type: 'select',
    options: [
      'Community College',
      'Trade & Technical School',
      'Hospital & Healthcare System',
      'Public University',
      'Private University',
      'Nonprofit Organization',
      'Government Agency',
      'Company & Business'
    ],
    priority: 'high'
  };

  // Filter questions based on organization type
  const getFilteredQuestions = (): RealignmentQuestion[] => {
    if (!selectedInstitutionType) {
      // Always start with organization type selection
      return [organizationTypeQuestion];
    }
    
    // Get comprehensive questions for selected organization type
    const filteredQuestions = northpathQuestions.filter(q => 
      !q.vertical || q.vertical === selectedInstitutionType
    );
    
    // Add help content to questions
    return filteredQuestions.map(question => ({
      ...question,
      priority: question.tags?.includes('HIGH') ? 'high' : 'medium', // Add priority based on tags
      help: question.tags?.includes('TOOLTIP') ? {
        title: `Understanding: ${question.prompt}`,
        content: 'This question helps assess your organization\'s current state in this area.',
        examples: []
      } : undefined
    }));
  };

  const realignmentQuestions = getFilteredQuestions();
  
  // Get sections from the filtered questions
  const sections = selectedInstitutionType ? 
    Array.from(new Set(realignmentQuestions.map(q => q.section))) : 
    ['Organization Type'];
  
  const totalQuestions = realignmentQuestions.length;
  const answeredCount = Object.keys(answers).filter(key => {
    const answer = answers[key];
    return answer !== undefined && answer !== null && 
           (Array.isArray(answer) ? answer.length > 0 : 
            typeof answer === 'string' ? answer.trim() !== '' : 
            typeof answer === 'number' ? true : false);
  }).length;
  const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  // Skip to main content handler
  const skipToMainContent = () => {
    mainContentRef.current?.focus();
  };

  // Handle organization type selection
  const handleInstitutionTypeChange = (institutionType: string) => {
    const mappedType = mapInstitutionType(institutionType);
    setSelectedInstitutionType(mappedType);
    setAnswers({ ORG_TYPE: institutionType }); // Keep the display value
    setCurrentSection(realignmentQuestions.find(q => q.section !== 'Organization Type')?.section || 'Universal Section 1'); // Move to first section after selection
  };

  // Map display strings to OrganizationType enum
  const mapInstitutionType = (displayValue: string): OrganizationType => {
    const mapping: Record<string, OrganizationType> = {
      'Community College': 'community_college',
      'Trade & Technical School': 'trade_technical',
      'Hospital & Healthcare System': 'hospital_healthcare',
      'Public University': 'public_university',
      'Private University': 'private_university',
      'Nonprofit Organization': 'nonprofit',
      'Government Agency': 'government_agency',
      'Company & Business': 'company_business'
    };
    return mapping[displayValue] || 'company_business';
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    realignmentQuestions.forEach(question => {
      // Organization type is always required
      if (question.id === 'ORG_TYPE' || question.priority === 'high') {
        const answer = answers[question.id];
        if (answer === undefined || answer === null || 
            (Array.isArray(answer) && answer.length === 0) || 
            (typeof answer === 'string' && answer.trim() === '')) {
          newErrors[question.id] = `This question is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus on first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]') as HTMLElement;
      firstErrorField?.focus();
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual submission logic
      console.log('Submitting realignment assessment:', {
        institutionType: selectedInstitutionType,
        answers,
        totalQuestions: realignmentQuestions.length,
        completionRate: (answeredCount / totalQuestions) * 100
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (questionId: string, value: string | string[] | number) => {
    if (questionId === 'INST_TYPE') {
      handleInstitutionTypeChange(value as string);
      return;
    }
    
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Skip to main content link */}
        <a
          href="#survey-content"
          onClick={skipToMainContent}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <main 
          id="survey-content" 
          ref={mainContentRef}
          tabIndex={-1}
          className="max-w-3xl mx-auto px-6 py-10 focus:outline-none"
        >
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Realignment Assessment Completed
            </h1>
            <div className="prose prose-lg max-w-2xl mx-auto text-gray-600">
              <p>
                Thank you for completing the comprehensive organizational realignment assessment 
                for your <strong>{selectedInstitutionType?.replace('-', ' ')}</strong>.
              </p>
              <p>
                You answered <strong>{answeredCount} out of {totalQuestions}</strong> questions 
                across <strong>{sections.length}</strong> assessment areas. Our team will analyze 
                your responses and contact you within 2-3 business days with a customized 
                realignment strategy.
              </p>
            </div>
            
            {/* Assessment Summary */}
            <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-blue-900 mb-2">Assessment Summary</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Institution Type:</span>
                  <span className="font-medium">{answers.INST_TYPE}</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions Completed:</span>
                  <span className="font-medium">{answeredCount}/{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate:</span>
                  <span className="font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Assessment Areas:</span>
                  <span className="font-medium">{sections.length}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to main content link */}
      <a
        href="#survey-content"
        onClick={skipToMainContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Section header with native progress */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                Organizational Realignment Survey
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              {answeredCount} of {totalQuestions} completed
            </div>
          </div>
          
          {/* Native HTML progress element */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <progress
              value={progressPercentage}
              max="100"
              className="w-full h-2 bg-gray-200 rounded-full [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-blue-600 [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-blue-600 [&::-moz-progress-bar]:rounded-full"
              aria-label={`Survey progress: ${Math.round(progressPercentage)}% complete`}
            >
              {Math.round(progressPercentage)}%
            </progress>
          </div>
        </div>
      </header>

      <main 
        id="survey-content" 
        ref={mainContentRef}
        tabIndex={-1}
        className="max-w-3xl mx-auto px-6 py-8 focus:outline-none"
      >
        {/* Validation summary */}
        {Object.keys(errors).length > 0 && (
          <div 
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-red-800 mb-2">
                  Please correct the following errors:
                </h2>
                <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Form with enhanced structure */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {realignmentQuestions.map((question, index) => (
            <section 
              key={question.id}
              aria-labelledby={`q${index + 1}-label`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <fieldset
                role="group"
                aria-labelledby={`q${index + 1}-label`}
                className="p-6 md:p-8"
              >
                {/* Two-column grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
                  {/* Main content column */}
                  <div className="space-y-6">
                    {/* Question header */}
                    <div className="flex items-start space-x-4">
                      <div className={`
                        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold
                        ${answers[question.id] ? 'bg-green-600' : 'bg-gray-400'}
                      `}>
                        {answers[question.id] ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h2 
                          id={`q${index + 1}-label`}
                          className="text-lg font-semibold text-gray-900 mb-2"
                        >
                          {question.prompt}
                          {question.priority === 'high' && (
                            <span className="text-red-500 ml-1" aria-label="required">*</span>
                          )}
                        </h2>
                        <p className="text-gray-600 leading-relaxed prose prose-sm">
                          Section: {question.section}
                        </p>
                      </div>
                    </div>

                    {/* Input fields with full-width touch targets */}
                    <div className="space-y-3">
                      {/* Likert Scale Input */}
                      {question.type === 'likert' && (
                        <div className="space-y-2">
                          {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, optionIndex) => {
                            const inputId = `${question.id}-${optionIndex}`;
                            return (
                              <label
                                key={option}
                                htmlFor={inputId}
                                className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors min-h-[48px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                              >
                                <input
                                  id={inputId}
                                  type="radio"
                                  name={question.id}
                                  value={option}
                                  checked={answers[question.id] === option}
                                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                                  aria-describedby={errors[question.id] ? `${question.id}-error` : undefined}
                                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                                />
                                <span className="text-gray-700 leading-relaxed prose prose-sm flex-1">
                                  {option}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}

                      {/* Numeric Input */}
                      {question.type === 'numeric' && (
                        <div>
                          <label htmlFor={question.id} className="sr-only">
                            {question.prompt}
                          </label>
                          <input
                            id={question.id}
                            type="number"
                            value={answers[question.id] as number || ''}
                            onChange={(e) => handleInputChange(question.id, parseInt(e.target.value) || 0)}
                            aria-invalid={errors[question.id] ? 'true' : 'false'}
                            aria-describedby={errors[question.id] ? `${question.id}-error` : undefined}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[48px]"
                            placeholder="Enter a number..."
                          />
                        </div>
                      )}

                      {/* Select Dropdown */}
                      {question.type === 'select' && question.options && (
                        <div>
                          <label htmlFor={question.id} className="sr-only">
                            {question.prompt}
                          </label>
                          <select
                            id={question.id}
                            value={answers[question.id] as string || ''}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            aria-invalid={errors[question.id] ? 'true' : 'false'}
                            aria-describedby={errors[question.id] ? `${question.id}-error` : undefined}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[48px]"
                          >
                            <option value="">Please select an option...</option>
                            {question.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Multi-select Checkboxes */}
                      {question.type === 'multiselect' && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            const inputId = `${question.id}-${optionIndex}`;
                            return (
                              <label
                                key={option}
                                htmlFor={inputId}
                                className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors min-h-[48px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                              >
                                <input
                                  id={inputId}
                                  type="checkbox"
                                  value={option}
                                  checked={Array.isArray(answers[question.id]) && 
                                    (answers[question.id] as string[]).includes(option)}
                                  onChange={(e) => {
                                    const currentValues = Array.isArray(answers[question.id]) 
                                      ? answers[question.id] as string[] 
                                      : [];
                                    const newValues = e.target.checked
                                      ? [...currentValues, option]
                                      : currentValues.filter(v => v !== option);
                                    handleInputChange(question.id, newValues);
                                  }}
                                  aria-invalid={errors[question.id] ? 'true' : 'false'}
                                  aria-describedby={errors[question.id] ? `${question.id}-error` : undefined}
                                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:outline-none focus:ring-2"
                                />
                                <span className="text-gray-700 leading-relaxed prose prose-sm flex-1">
                                  {option}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}

                      {/* Inline error message */}
                      {errors[question.id] && (
                        <div
                          id={`${question.id}-error`}
                          role="alert"
                          aria-live="polite"
                          className="flex items-center space-x-2 text-red-600 text-sm"
                        >
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{errors[question.id]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Help column */}
                  {question.help && (
                    <div className="space-y-4">
                      <details className="group">
                        <summary className="flex items-center space-x-2 cursor-pointer text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2">
                          <HelpCircle className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm font-medium">Need help?</span>
                        </summary>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h3 className="text-sm font-semibold text-blue-900 mb-2">
                            {question.help.title}
                          </h3>
                          <div className="prose prose-sm prose-blue text-blue-800">
                            <p>{question.help.content}</p>
                            {question.help.examples && (
                              <div>
                                <p className="font-medium mt-3 mb-2">Examples:</p>
                                <ul className="space-y-1">
                                  {question.help.examples.map((example, idx) => (
                                    <li key={idx} className="text-sm">{example}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </fieldset>
            </section>
          ))}

          {/* Submit section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to Submit Your Assessment?
                </h3>
                <p className="text-gray-600 prose prose-sm">
                  Please review your responses before submitting. Our team will analyze 
                  your input and provide a customized realignment strategy.
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  inline-flex items-center justify-center space-x-2 
                  bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                  text-white font-semibold px-6 py-3 rounded-lg 
                  min-h-[48px] min-w-[140px]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  transition-colors duration-200
                  disabled:cursor-not-allowed
                "
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Assessment</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}