/* ------------------------------------------------------------------
   app/realignment/page.tsx
   Enhanced realignment survey with comprehensive question bank,
   semantic structure, accessibility, and responsive design
------------------------------------------------------------------- */

'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, AlertCircle, CheckCircle2, Building2, HelpCircle } from 'lucide-react';
import { 
  allQuestions as northpathQuestions,
  OrganizationType,
  Question as NorthpathQuestion
} from '@/data/northpathQuestionBank';
import { useLanguage, useTranslatedText, useTranslatedUI, useTranslatedSections } from '@/hooks/useLanguage';
import { InstitutionType } from '@/lib/industryLanguageMapping';
import { PagesBackground } from '@/components/ui/pages-background';

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

// Mapping from OrganizationType to InstitutionType for language system
const organizationTypeToInstitutionType: Record<OrganizationType, InstitutionType> = {
  'community_college': 'community-college',
  'trade_technical': 'corporate', // Uses corporate language for now
  'hospital_healthcare': 'healthcare',
  'public_university': 'public-university',
  'private_university': 'private-university',
  'nonprofit': 'nonprofit',
  'government_agency': 'government',
  'company_business': 'corporate'
};

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
  
  // Language hooks
  const { setInstitutionType } = useLanguage();
  const { translateText } = useTranslatedText();
  const { translateUI } = useTranslatedUI();
  const { translateSection } = useTranslatedSections();
  
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
    section: translateSection('Organization Type'),
    prompt: translateText('What type of organization are you?'),
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
    
    // Add help content to questions and translate them
    return filteredQuestions.map(question => ({
      ...question,
      prompt: translateText(question.prompt),
      section: translateSection(question.section),
      help: question.tags?.includes('HELP') ? {
        title: translateText('Additional Information'),
        content: translateText('This question helps assess your organization\'s current capabilities.'),
      } : undefined
    }));
  };

  const realignmentQuestions = getFilteredQuestions();
  const sections = [...new Set(realignmentQuestions.map(q => q.section))];
  const totalQuestions = realignmentQuestions.length;
  const answeredCount = realignmentQuestions.filter(q => {
    const answer = answers[q.id];
    return answer !== undefined && answer !== null && answer !== '' && 
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
    
    // Set institution type for language customization
    const languageInstitutionType = organizationTypeToInstitutionType[mappedType];
    setInstitutionType(languageInstitutionType);
    
    setCurrentSection(realignmentQuestions.find(q => q.section !== translateSection('Organization Type'))?.section || translateSection('Universal Section 1')); // Move to first section after selection
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
    const requiredQuestions = realignmentQuestions.filter(q => q.required !== false);
    
    requiredQuestions.forEach(question => {
      const answer = answers[question.id];
      if (!answer || (Array.isArray(answer) && answer.length === 0) || 
          (typeof answer === 'string' && answer.trim() === '')) {
        newErrors[question.id] = translateText('This field is required');
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
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
    if (questionId === 'ORG_TYPE') {
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
      <PagesBackground>
        <div className="min-h-screen">
          {/* Skip to main content link */}
          <a
          href="#survey-content"
          onClick={skipToMainContent}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          {translateUI('Skip to main content')}
        </a>

        <main 
          id="survey-content" 
          tabIndex={-1} 
          ref={mainContentRef}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {translateUI('Realignment Assessment Completed')}
            </h1>
            <div className="prose prose-lg max-w-2xl mx-auto text-gray-600">
              <p>
                {translateText('Thank you for completing the comprehensive organizational realignment assessment for your')} <strong>{selectedInstitutionType?.replace('-', ' ')}</strong>.
              </p>
              <p>
                {translateText('You answered')} <strong>{answeredCount} {translateUI('out of')} {totalQuestions}</strong> {translateText('questions across')} <strong>{sections.length}</strong> {translateText('assessment areas. Our team will analyze your responses and contact you within 2-3 business days with a customized realignment strategy.')}.
              </p>
            </div>
            
            {/* Assessment Summary */}
            <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-blue-900 mb-2">{translateUI('Assessment Summary')}</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>{translateUI('Institution Type')}:</span>
                  <span className="font-medium">{answers.ORG_TYPE}</span>
                </div>
                <div className="flex justify-between">
                  <span>{translateUI('Questions Completed')}:</span>
                  <span className="font-medium">{answeredCount}/{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span>{translateUI('Completion Rate')}:</span>
                  <span className="font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>{translateUI('Assessment Areas')}:</span>
                  <span className="font-medium">{sections.length}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <span>{translateUI('Return to Home')}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </main>
        </div>
      </PagesBackground>
    );
  }

  return (
    <PagesBackground>
      <div className="min-h-screen">
        {/* Skip to main content link */}
        <a
        href="#survey-content"
        onClick={skipToMainContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        {translateUI('Skip to main content')}
      </a>

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NorthPath Strategies</span>
            </div>
            <div className="text-sm text-gray-500">
              {translateUI('Organizational Realignment Assessment')}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">
              {translateUI('Progress')}: {Math.round(progressPercentage)}% {translateUI('complete')}
            </span>
            <span className="text-sm text-blue-600">
              {answeredCount} {translateUI('of')} {totalQuestions} {translateUI('questions answered')}
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main 
        id="survey-content" 
        tabIndex={-1} 
        ref={mainContentRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {translateUI('Organizational Realignment Assessment')}
              </h1>
              <p className="text-gray-600">
                {translateText('This comprehensive assessment will help identify optimization opportunities within your organization. Please answer all questions as accurately as possible.')}
              </p>
            </div>

            {/* Questions by section */}
            {sections.map((section) => {
              const sectionQuestions = realignmentQuestions.filter(q => q.section === section);
              
              return (
                <div key={section} className="mb-12">
                  <div className="border-l-4 border-blue-500 pl-4 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {section}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {sectionQuestions.length} {translateUI('questions')} • {translateUI('Section')} {sections.indexOf(section) + 1} {translateUI('of')} {sections.length}
                    </p>
                  </div>
                  
                  {/* Section Questions */}
                  <div className="space-y-6">
                    {sectionQuestions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200">
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <label
                              htmlFor={question.id}
                              className="text-base font-medium text-gray-900 leading-6"
                            >
                              <span className="mr-2 text-sm text-gray-500">
                                {sections.indexOf(section) + 1}.{index + 1}
                              </span>
                              {question.prompt}
                              {question.required !== false && (
                                <span className="text-red-500 ml-1" aria-label="required">*</span>
                              )}
                            </label>
                            {question.help && (
                              <button
                                type="button"
                                className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                                title={question.help.content}
                                aria-label={`Help for: ${question.prompt}`}
                              >
                                <HelpCircle className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          {/* Question input based on type */}
                          <div className="mt-3">
                            {question.type === 'select' && (
                              <select
                                id={question.id}
                                value={answers[question.id] as string || ''}
                                onChange={(e) => handleInputChange(question.id, e.target.value)}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                                  errors[question.id] ? 'ring-red-300' : 'ring-gray-300'
                                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                                aria-describedby={errors[question.id] ? `${question.id}-error` : undefined}
                              >
                                <option value="">{translateUI('Select an option...')}</option>
                                {question.options?.map((option) => (
                                  <option key={option} value={option}>
                                    {translateText(option)}
                                  </option>
                                ))}
                              </select>
                            )}
                            
                            {question.type === 'text' && (
                              <textarea
                                id={question.id}
                                rows={3}
                                value={answers[question.id] as string || ''}
                                onChange={(e) => handleInputChange(question.id, e.target.value)}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                                  errors[question.id] ? 'ring-red-300' : 'ring-gray-300'
                                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                                placeholder={translateUI('Enter your response...')}
                                aria-describedby={errors[question.id] ? `${question.id}-error` : undefined}
                              />
                            )}
                            
                            {question.type === 'likert' && (
                              <div className="space-y-2">
                                {[
                                  { value: '1', label: translateUI('Strongly Disagree') },
                                  { value: '2', label: translateUI('Disagree') },
                                  { value: '3', label: translateUI('Neutral') },
                                  { value: '4', label: translateUI('Agree') },
                                  { value: '5', label: translateUI('Strongly Agree') }
                                ].map((option) => (
                                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={question.id}
                                      value={option.value}
                                      checked={answers[question.id] === option.value}
                                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{option.label}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                            
                            {question.type === 'multiselect' && (
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {question.options?.map((option) => (
                                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      value={option}
                                      checked={(answers[question.id] as string[])?.includes(option) || false}
                                      onChange={(e) => {
                                        const currentAnswers = (answers[question.id] as string[]) || [];
                                        if (e.target.checked) {
                                          handleInputChange(question.id, [...currentAnswers, option]);
                                        } else {
                                          handleInputChange(question.id, currentAnswers.filter(a => a !== option));
                                        }
                                      }}
                                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{translateText(option)}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* Error message */}
                          {errors[question.id] && (
                            <div
                              id={`${question.id}-error`}
                              className="mt-2 flex items-center space-x-2 text-red-600"
                              role="alert"
                            >
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-sm">{errors[question.id]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit button */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="border-t border-gray-200 pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {translateUI('Ready to Submit Your Assessment?')}
                </h3>
                <p className="text-gray-600 prose prose-sm">
                  {translateText('Please review your responses before submitting. Our team will analyze your input and provide a customized realignment strategy.')}
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
                    <span>{translateUI('Submitting...')}</span>
                  </>
                ) : (
                  <>
                    <span>{translateUI('Submit Assessment')}</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
      </div>
    </PagesBackground>
  );
}