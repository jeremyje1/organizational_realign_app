/* ------------------------------------------------------------------
   app/realignment/page.tsx
   Enhanced realignment survey with semantic structure, accessibility,
   and responsive design following WCAG 2.2 AA standards
------------------------------------------------------------------- */

'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronRight, AlertCircle, CheckCircle2, Building2, Target, HelpCircle } from 'lucide-react';

interface RealignmentQuestion {
  id: string;
  title: string;
  description: string;
  type: 'radio' | 'checkbox' | 'text' | 'textarea';
  options?: string[];
  required: boolean;
  help?: {
    title: string;
    content: string;
    examples?: string[];
  };
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
  const slug = searchParams?.slug;
  const mainContentRef = useRef<HTMLElement>(null);
  
  // Form state management
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Enhanced realignment questions with help content
  const realignmentQuestions: RealignmentQuestion[] = [
    {
      id: 'current_challenges',
      title: 'Current Organizational Challenges',
      description: 'What are the primary challenges your organization is currently facing?',
      type: 'checkbox',
      options: [
        'Communication silos between departments',
        'Inefficient decision-making processes',
        'Resource allocation issues',
        'Technology integration challenges',
        'Staff retention and recruitment',
        'Strategic alignment issues'
      ],
      required: true,
      help: {
        title: 'Understanding Organizational Challenges',
        content: 'Identifying current challenges helps us prioritize areas for improvement and develop targeted solutions.',
        examples: [
          'Communication issues often manifest as delayed information flow between teams',
          'Decision-making inefficiencies can include unclear approval processes',
          'Resource allocation problems may involve budget constraints or skill gaps'
        ]
      }
    },
    {
      id: 'realignment_scope',
      title: 'Realignment Scope',
      description: 'Which areas of your organization require realignment?',
      type: 'radio',
      options: [
        'Entire organizational structure',
        'Specific departments only',
        'Leadership and governance',
        'Operational processes',
        'Technology and systems'
      ],
      required: true,
      help: {
        title: 'Determining Realignment Scope',
        content: 'The scope of realignment affects the timeline, resources, and approach we\'ll recommend.',
        examples: [
          'Entire structure changes involve comprehensive organizational redesign',
          'Department-specific changes focus on particular areas of concern',
          'Leadership realignment affects decision-making and governance structures'
        ]
      }
    },
    {
      id: 'timeline_preference',
      title: 'Implementation Timeline',
      description: 'What is your preferred timeline for implementing organizational changes?',
      type: 'radio',
      options: [
        'Immediate (1-3 months)',
        'Short-term (3-6 months)',
        'Medium-term (6-12 months)',
        'Long-term (12+ months)'
      ],
      required: true,
      help: {
        title: 'Timeline Considerations',
        content: 'Implementation timelines should balance urgency with change management best practices.',
        examples: [
          'Immediate changes work best for urgent operational issues',
          'Medium-term timelines allow for proper stakeholder engagement',
          'Long-term approaches enable comprehensive cultural transformation'
        ]
      }
    },
    {
      id: 'success_metrics',
      title: 'Success Metrics',
      description: 'How will you measure the success of the organizational realignment?',
      type: 'textarea',
      required: true,
      help: {
        title: 'Defining Success Metrics',
        content: 'Clear success metrics help track progress and ensure the realignment achieves its intended goals.',
        examples: [
          'Employee satisfaction scores and retention rates',
          'Operational efficiency metrics and cost reductions',
          'Customer satisfaction and service delivery improvements'
        ]
      }
    }
  ];

  const totalQuestions = realignmentQuestions.length;
  const answeredCount = Object.keys(answers).filter(key => {
    const answer = answers[key];
    return answer && (Array.isArray(answer) ? answer.length > 0 : answer.trim() !== '');
  }).length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  // Skip to main content handler
  const skipToMainContent = () => {
    mainContentRef.current?.focus();
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    realignmentQuestions.forEach(question => {
      if (question.required) {
        const answer = answers[question.id];
        if (!answer || (Array.isArray(answer) && answer.length === 0) || 
            (typeof answer === 'string' && answer.trim() === '')) {
          newErrors[question.id] = `${question.title} is required`;
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (questionId: string, value: string | string[]) => {
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
            <p className="text-lg text-gray-600 prose prose-lg max-w-2xl mx-auto">
              Thank you for completing the organizational realignment survey. 
              Our team will review your responses and contact you within 2-3 business days 
              with a customized realignment strategy.
            </p>
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
                          {question.title}
                          {question.required && (
                            <span className="text-red-500 ml-1" aria-label="required">*</span>
                          )}
                        </h2>
                        <p className="text-gray-600 leading-relaxed prose prose-sm">
                          {question.description}
                        </p>
                      </div>
                    </div>

                    {/* Input fields with full-width touch targets */}
                    <div className="space-y-3">
                      {question.type === 'radio' && question.options && (
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
                                  type="radio"
                                  name={question.id}
                                  value={option}
                                  checked={answers[question.id] === option}
                                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                                  aria-invalid={errors[question.id] ? 'true' : 'false'}
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

                      {question.type === 'checkbox' && question.options && (
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

                      {question.type === 'text' && (
                        <div>
                          <label htmlFor={question.id} className="sr-only">
                            {question.title}
                          </label>
                          <input
                            id={question.id}
                            type="text"
                            value={answers[question.id] as string || ''}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            aria-invalid={errors[question.id] ? 'true' : 'false'}
                            aria-describedby={errors[question.id] ? `${question.id}-error` : undefined}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[48px]"
                            placeholder="Enter your response..."
                          />
                        </div>
                      )}

                      {question.type === 'textarea' && (
                        <div>
                          <label htmlFor={question.id} className="sr-only">
                            {question.title}
                          </label>
                          <textarea
                            id={question.id}
                            rows={4}
                            value={answers[question.id] as string || ''}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            aria-invalid={errors[question.id] ? 'true' : 'false'}
                            aria-describedby={errors[question.id] ? `${question.id}-error` : undefined}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                            placeholder="Please provide detailed information..."
                          />
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