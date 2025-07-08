/* ------------------------------------------------------------------
   app/realignment/page.tsx
   Enhanced accessible realignment page with WCAG 2.2 AA compliance
------------------------------------------------------------------- */

'use client';

import { useState, useRef } from 'react';
import { ChevronRight, AlertCircle, CheckCircle2, Building2, Target } from 'lucide-react';

interface RealignmentQuestion {
  id: string;
  title: string;
  description: string;
  type: 'radio' | 'checkbox' | 'text' | 'textarea';
  options?: string[];
  required: boolean;
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
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sample realignment questions - replace with your actual data
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
      required: true
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
      required: true
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
      required: true
    },
    {
      id: 'success_metrics',
      title: 'Success Metrics',
      description: 'How will you measure the success of the organizational realignment?',
      type: 'textarea',
      required: true
    }
  ];

  const totalQuestions = realignmentQuestions.length;
  const answeredCount = Object.keys(answers).filter(key => {
    const answer = answers[key];
    return answer && (Array.isArray(answer) ? answer.length > 0 : answer.trim() !== '');
  }).length;

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
          href="#main-content"
          onClick={skipToMainContent}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <main 
          id="main-content" 
          ref={mainContentRef}
          tabIndex={-1}
          className="mx-auto max-w-4xl px-6 py-10 focus:outline-none"
        >
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Realignment Plan Submitted Successfully
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thank you for completing the organizational realignment assessment. 
              Our team will review your responses and contact you within 2-3 business days.
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
        href="#main-content"
        onClick={skipToMainContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Visually hidden main heading for screen readers */}
      <h1 className="sr-only">Organizational Realignment Assessment Form</h1>

      {/* Progress indicator */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">
                Organizational Realignment
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {answeredCount} of {totalQuestions} completed
            </div>
          </div>
          
          {/* Accessible progress bar */}
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={totalQuestions}
            aria-valuenow={answeredCount}
            aria-label={`Assessment progress: ${answeredCount} of ${totalQuestions} questions completed`}
            className="w-full bg-gray-200 rounded-full h-2"
          >
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round((answeredCount / totalQuestions) * 100)}% complete
          </div>
        </div>
      </div>

      <main 
        id="main-content" 
        ref={mainContentRef}
        tabIndex={-1}
        className="mx-auto max-w-4xl px-6 py-8 focus:outline-none"
      >
        {/* Form introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Let&apos;s Plan Your Organizational Realignment
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This assessment will help us understand your organization&apos;s specific needs 
                and develop a customized realignment strategy. Please answer all questions 
                thoroughly to ensure we provide the most relevant recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Validation summary */}
        {Object.keys(errors).length > 0 && (
          <div 
            role="alert"
            aria-live="polite"
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-red-800 mb-2">
                  Please correct the following errors:
                </h3>
                <ul className="text-sm text-red-700 space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {realignmentQuestions.map((question, index) => (
            <section 
              key={question.id}
              className="bg-white rounded-lg shadow-md p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:space-x-6">
                {/* Question number indicator */}
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold
                    ${answers[question.id] ? 'bg-green-600' : 'bg-gray-400'}
                  `}>
                    {answers[question.id] ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                </div>

                {/* Question content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {question.title}
                      {question.required && (
                        <span className="text-red-500 ml-1" aria-label="required">*</span>
                      )}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {question.description}
                    </p>
                  </div>

                  {/* Input fields */}
                  {question.type === 'radio' && question.options && (
                    <fieldset className="space-y-3">
                      <legend className="sr-only">{question.title}</legend>
                      {question.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors min-h-[44px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            aria-describedby={errors[question.id] ? `${question.id}-error` : undefined}
                            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:outline-none"
                          />
                          <span className="text-gray-700 leading-relaxed">{option}</span>
                        </label>
                      ))}
                    </fieldset>
                  )}

                  {question.type === 'checkbox' && question.options && (
                    <fieldset className="space-y-3">
                      <legend className="sr-only">{question.title}</legend>
                      {question.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors min-h-[44px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                        >
                          <input
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
                            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                          />
                          <span className="text-gray-700 leading-relaxed">{option}</span>
                        </label>
                      ))}
                    </fieldset>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px]"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                        placeholder="Please provide detailed information..."
                      />
                    </div>
                  )}

                  {/* Inline error message */}
                  {errors[question.id] && (
                    <div
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
            </section>
          ))}

          {/* Submit section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to Submit?
                </h3>
                <p className="text-gray-600">
                  Please review your responses before submitting your realignment assessment.
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  inline-flex items-center justify-center space-x-2 
                  bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                  text-white font-semibold px-6 py-3 rounded-lg 
                  min-h-[44px] min-w-[120px]
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
