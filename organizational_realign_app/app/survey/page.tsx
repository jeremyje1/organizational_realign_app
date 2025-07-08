"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { useUser } from "@supabase/auth-helpers-react";
import PublicNavigation from "@/components/PublicNavigation";
import QuestionText from "@/components/QuestionText";
import SectionExplanation from "@/components/SectionExplanation";
import { CheckCircle2, AlertCircle, Clock, Building2, Upload, X, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  allQuestions,
  OrganizationType, 
  Question
} from "@/data/northpathQuestionBank";
import { PagesBackground } from '@/components/ui/pages-background';

// Likert scale component with premium styling
function LikertInput({ onSelect, value }: { onSelect: (value: number) => void; value?: number }) {
  const options = [
    { value: 1, label: "Strongly Disagree", color: "from-red-500 to-red-600" },
    { value: 2, label: "Disagree", color: "from-orange-500 to-orange-600" },
    { value: 3, label: "Neutral", color: "from-yellow-500 to-yellow-600" },
    { value: 4, label: "Agree", color: "from-green-500 to-green-600" },
    { value: 5, label: "Strongly Agree", color: "from-emerald-500 to-emerald-600" }
  ];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label key={option.value} className={`
          flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-300 group
          ${value === option.value 
            ? `bg-gradient-to-r ${option.color} border-transparent shadow-md text-white font-medium` 
            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }
        `}>
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={() => onSelect(option.value)}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
            value === option.value 
              ? 'bg-white border-white' 
              : 'border-gray-400 group-hover:border-gray-600'
          }`}>
            {value === option.value && (
              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${option.color}`}></div>
            )}
          </div>
          <span className={`text-sm font-medium transition-colors duration-200 ${
            value === option.value ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
          }`}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

// Text input component with premium styling
function TextInput({ onSubmit, value, placeholder }: { 
  onSubmit: (value: string) => void; 
  value?: string;
  placeholder?: string;
}) {
  const [text, setText] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (text.trim() && text !== value) {
      const timer = setTimeout(() => onSubmit(text), 500);
      return () => clearTimeout(timer);
    }
  }, [text, onSubmit, value]);

  return (
    <div className="relative">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder || "Enter your response..."}
        rows={4}
        className={`
          w-full bg-white border rounded-lg px-4 py-3 
          text-gray-900 placeholder-gray-500 resize-none transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${isFocused 
            ? 'border-blue-500 bg-white shadow-md' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      />
      {text.length > 0 && (
        <div className="absolute bottom-2 right-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
}

// Enhanced file upload component with premium styling
function FileUpload({ onUpload, uploadedFiles }: { 
  onUpload: (files: File[]) => void;
  uploadedFiles?: File[];
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onUpload(files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      onUpload(files);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${dragActive 
            ? 'border-blue-400/70 bg-blue-500/10 backdrop-blur-sm' 
            : 'border-slate-600/40 hover:border-slate-500/60 bg-slate-800/20 backdrop-blur-sm'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300
            ${dragActive 
              ? 'bg-blue-500/20 border-2 border-blue-400/50' 
              : 'bg-slate-700/50 border-2 border-slate-600/30'
            }
          `}>
            <Upload className={`h-8 w-8 transition-colors duration-300 ${
              dragActive ? 'text-blue-400' : 'text-slate-400'
            }`} />
          </div>
          
          <h4 className="text-lg font-semibold text-slate-200 mb-2">
            {dragActive ? 'Drop files here' : 'Upload Documentation'}
          </h4>
          
          <p className="text-slate-400 mb-4 max-w-sm">
            Drag and drop files here, or click to browse. Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG
          </p>
          
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload-enhanced"
          />
          
          <label 
            htmlFor="file-upload-enhanced" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
          >
            <Upload className="h-4 w-4" />
            Choose Files
          </label>
        </div>
      </div>
      
      {uploadedFiles && uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Uploaded Files ({uploadedFiles.length})
          </div>
          
          <div className="grid gap-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl hover:border-slate-500/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 border border-green-400/30 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{file.name}</p>
                    <p className="text-xs text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    const newFiles = uploadedFiles.filter((_, i) => i !== index);
                    onUpload(newFiles);
                  }}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  title="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SurveyPageContent() {
  const user = useUser();
  const searchParams = useSearchParams();
  const orgType = searchParams.get('orgType') as OrganizationType;
  const sessionId = searchParams.get('sessionId');

  // State management
  const [loading, setLoading] = useState(true);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, any>>(new Map());
  const [uploadedFiles, setUploadedFiles] = useState<Map<string, File[]>>(new Map());
  const [showValidation, setShowValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for Supabase configuration
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase not configured - running in demo mode');
    }
    setLoading(false);
  }, []);

  // Filter questions based on organization type
  const filteredQuestions = useMemo(() => {
    if (!orgType) return allQuestions.slice(0, 20); // Show first 20 questions if no org type
    
    return allQuestions.filter(question => {
      // Always include algorithm parameters and universal data uploads
      if (question.id.startsWith('P_') || question.id.startsWith('U_')) {
        return true;
      }
      
      // Include universal questions (no specific vertical)
      if (!question.vertical) {
        return true;
      }
      
      // Include questions for specific organization type
      return question.vertical === orgType;
    });
  }, [orgType]);

  // Group questions by section
  const sections = useMemo(() => {
    const sectionMap = new Map<string, Question[]>();
    
    filteredQuestions.forEach(question => {
      const section = question.section;
      if (!sectionMap.has(section)) {
        sectionMap.set(section, []);
      }
      sectionMap.get(section)!.push(question);
    });
    
    return Array.from(sectionMap.entries()).map(([name, questions]) => ({
      name,
      questions
    }));
  }, [filteredQuestions]);

  const currentSection = sections[sectionIdx];
  const isLastSection = sectionIdx === sections.length - 1;

  // Handle answer submission
  const handleAnswer = (questionId: string, value: any) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, value);
    setAnswers(newAnswers);
    
    // Auto-save logic could go here
    console.log(`Answer for ${questionId}:`, value);
  };

  // Handle file uploads
  const handleFileUpload = (questionId: string, files: File[]) => {
    const newFiles = new Map(uploadedFiles);
    newFiles.set(questionId, files);
    setUploadedFiles(newFiles);
    
    // Also save as answer
    handleAnswer(questionId, files.map(f => f.name));
  };

  // Navigation handlers
  const handleNext = () => {
    if (!currentSection) return;
    
    // Validate required questions
    const unansweredRequired = currentSection.questions
      .filter(q => q.required)
      .filter(q => !answers.has(q.id));
      
    if (unansweredRequired.length > 0) {
      setShowValidation(true);
      return;
    }
    
    setShowValidation(false);
    
    if (isLastSection) {
      handleSubmit();
    } else {
      setSectionIdx(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (sectionIdx > 0) {
      setSectionIdx(prev => prev - 1);
      setShowValidation(false);
    }
  };

  // Submit final assessment
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare submission data
      const submissionData = {
        sessionId,
        organizationType: orgType,
        answers: Object.fromEntries(answers),
        uploadedFiles: Object.fromEntries(uploadedFiles),
        completedAt: new Date().toISOString(),
        userId: user?.id
      };

      console.log('Submitting assessment:', submissionData);
      
      // Send to API endpoint for processing
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();
      
      if (result.success) {
        // Redirect to results page with analysis
        window.location.href = `/assessment/results?sessionId=${sessionId}&assessmentId=${result.analysisResults.assessmentId}`;
      } else {
        throw new Error(result.error || 'Submission failed');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PagesBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="card p-12 text-center max-w-lg animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Loading Assessment</h2>
            <p className="text-gray-600">Preparing your customized evaluation...</p>
          </div>
        </div>
      </PagesBackground>
    );
  }

  if (!currentSection) {
    return (
      <PagesBackground>
        <div className="min-h-screen elegant-bg flex items-center justify-center">
        <div className="card p-12 text-center max-w-lg">
          <AlertCircle className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-slate-100 mb-4">Assessment Error</h2>
          <p className="text-slate-300 mb-6">
            Unable to load assessment questions. Please check your organization type selection.
          </p>
          <Button onClick={() => window.location.href = '/assessment/start'}>
            Return to Setup
          </Button>
        </div>
      </div>
      </PagesBackground>
    );
  }

  return (
    <PagesBackground>
      <div className="min-h-screen">
        <PublicNavigation />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Professional Compact Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-blue-500" />
            <span className="text-blue-600 font-medium text-sm">
              {orgType ? orgType.replace('_', ' ').toUpperCase() : 'ASSESSMENT'}
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            NorthPath Organizational Assessment
          </h1>
          <p className="text-gray-600 text-sm">
            Section {sectionIdx + 1} of {sections.length}: {currentSection.name}
          </p>
        </div>

        {/* Enhanced Progress Section */}
        <div className="mb-10">
          {/* Section Breadcrumb Navigation */}
          <div className="flex items-center justify-center mb-6 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full border border-gray-200 min-w-max">
              {sections.slice(Math.max(0, sectionIdx - 2), Math.min(sections.length, sectionIdx + 3)).map((section, index) => {
                const actualIndex = Math.max(0, sectionIdx - 2) + index;
                const isActive = actualIndex === sectionIdx;
                const isCompleted = actualIndex < sectionIdx;
                const isClickable = actualIndex < sectionIdx || actualIndex === sectionIdx;
                
                return (
                  <div key={section.name} className="flex items-center">
                    <button
                      onClick={() => isClickable && setSectionIdx(actualIndex)}
                      disabled={!isClickable}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                        ${isActive 
                          ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                          : isCompleted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      <span className="hidden sm:inline">{section.name}</span>
                      <span className="sm:hidden">S{actualIndex + 1}</span>
                    </button>
                    {index < 4 && actualIndex < sections.length - 1 && (
                      <div className="w-2 h-0.5 mx-1 bg-gray-300"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section Progress Dots */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-2">
              {sections.map((section, index) => (
                <div key={section.name} className="flex items-center">
                  <div className={`
                    w-4 h-4 rounded-full transition-all duration-300 border-2 cursor-pointer
                    ${index < sectionIdx 
                      ? 'bg-green-500 border-green-500' 
                      : index === sectionIdx 
                        ? 'bg-blue-500 border-blue-500 ring-2 ring-blue-300 scale-110' 
                        : 'bg-gray-300 border-gray-300 hover:border-gray-400'
                    }
                  `}
                  onClick={() => index <= sectionIdx && setSectionIdx(index)}
                  title={section.name}
                  >
                    {index < sectionIdx && (
                      <CheckCircle2 className="w-3 h-3 text-white ml-0.5 mt-0.5" />
                    )}
                  </div>
                  {index < sections.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 transition-all duration-300 ${
                      index < sectionIdx ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Progress Bar with Animation */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">
                  Section {sectionIdx + 1} of {sections.length}
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <span>{Math.round(((sectionIdx + 1) / sections.length) * 100)}% Complete</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 h-full rounded-full transition-all duration-700 ease-out relative"
                  style={{width: `${((sectionIdx + 1) / sections.length) * 100}%`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <div 
                className="absolute top-0 w-1 h-3 bg-white rounded-full transition-all duration-700 shadow-lg"
                style={{left: `${((sectionIdx + 1) / sections.length) * 100}%`}}
              ></div>
            </div>

            {/* Section Progress within current section with enhanced visuals */}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Questions in this section</span>
              <span className="flex items-center gap-1">
                {currentSection.questions.filter(q => answers.has(q.id)).length} of {currentSection.questions.length} answered
                {currentSection.questions.filter(q => answers.has(q.id)).length === currentSection.questions.length && (
                  <CheckCircle2 className="w-3 h-3 text-green-500 ml-1" />
                )}
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-500 relative"
                style={{
                  width: `${(currentSection.questions.filter(q => answers.has(q.id)).length / currentSection.questions.length) * 100}%`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Explanation */}
        <SectionExplanation sectionName={currentSection.name} />

        {/* Validation message */}
        {showValidation && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              <span>Please answer all required questions before proceeding.</span>
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {currentSection.questions.map((question, index) => {
            const isRequired = question.required;
            const isAnswered = answers.has(question.id);
            
            return (
              <Card key={question.id} className="bg-white/95 backdrop-blur-sm border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-600 font-medium">
                          Question {index + 1} of {currentSection.questions.length}
                        </span>
                        {isRequired && (
                          <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-200">
                            Required
                          </span>
                        )}
                        {question.tags && question.tags.length > 0 && (
                          <div className="flex gap-1">
                            {question.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-200">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-gray-900 text-xl leading-relaxed font-semibold">
                        <QuestionText text={question.prompt} />
                      </CardTitle>
                      
                      {/* Help text for better clarity */}
                      {question.type === 'numeric' && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-800">
                              <p className="font-medium mb-1">💡 Number Input Guidance:</p>
                              <p>Please enter a whole number (e.g., 25, 100, 500). Do not include commas, decimals, or currency symbols.</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {question.type === 'text' && (
                        <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-purple-800">
                              <p className="font-medium mb-1">📝 Text Response Tips:</p>
                              <p>Provide specific examples, metrics, or detailed descriptions. Aim for 2-3 sentences for comprehensive analysis.</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {question.type === 'upload' && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-green-800">
                              <p className="font-medium mb-1">📄 File Upload Requirements:</p>
                              <p>Accepted formats: PDF, DOC, DOCX, XLS, XLSX, CSV. Maximum file size: 25MB per file. Multiple files can be uploaded.</p>
                              {question.uploadCode && (
                                <p className="text-xs text-green-700 mt-1 font-mono bg-green-100 px-2 py-1 rounded">
                                  Upload Code: {question.uploadCode}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {question.type === 'likert' && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-amber-800">
                              <p className="font-medium mb-1">⭐ Rating Scale Guide:</p>
                              <p>1 = Strongly Disagree/Poor, 3 = Neutral/Average, 5 = Strongly Agree/Excellent. Consider your organization&apos;s current state.</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {question.type === 'select' && (
                        <div className="mt-3 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-cyan-800">
                              <p className="font-medium mb-1">🎯 Selection Guidance:</p>
                              <p>Choose the option that best represents your organization&apos;s current situation or approach.</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {question.type === 'multiselect' && (
                        <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-indigo-800">
                              <p className="font-medium mb-1">☑️ Multiple Selection:</p>
                              <p>Select all options that apply to your organization. You can choose multiple items or none if not applicable.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {isAnswered && (
                      <div className="flex-shrink-0 ml-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 border border-green-300 rounded-full">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {question.type === 'likert' && (
                    <LikertInput 
                      value={answers.get(question.id)}
                      onSelect={(value) => handleAnswer(question.id, value)}
                    />
                  )}
                  
                  {question.type === 'text' && (
                    <TextInput
                      value={answers.get(question.id) || ''}
                      onSubmit={(value) => handleAnswer(question.id, value)}
                      placeholder="Enter your response..."
                    />
                  )}
                  
                  {question.type === 'upload' && (
                    <FileUpload
                      uploadedFiles={uploadedFiles.get(question.id)}
                      onUpload={(files) => handleFileUpload(question.id, files)}
                    />
                  )}

                  {question.type === 'numeric' && (
                    <div className="relative">
                      <input
                        type="number"
                        value={answers.get(question.id) || ''}
                        onChange={(e) => handleAnswer(question.id, parseInt(e.target.value) || 0)}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-300 pr-12"
                        placeholder="Enter a number..."
                      />
                      {answers.get(question.id) && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 font-medium">✓</span>
                        </div>
                      )}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}

                  {question.type === 'select' && question.options && (
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswer(question.id, option)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                            answers.get(question.id) === option
                              ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-lg transform scale-[1.01]'
                              : 'bg-white border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 hover:scale-[1.005]'
                          }`}
                        >
                          <div className="flex items-center justify-between relative z-10">
                            <span className="font-medium">{option}</span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              answers.get(question.id) === option
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-gray-400 group-hover:border-gray-500'
                            }`}>
                              {answers.get(question.id) === option && (
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              )}
                            </div>
                          </div>
                          {answers.get(question.id) === option && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'multiselect' && question.options && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <HelpCircle className="h-4 w-4 text-blue-600" />
                        <p className="text-sm text-gray-700 font-medium">
                          Select all that apply:
                        </p>
                      </div>
                      <div className="grid gap-3">
                        {question.options.map((option, optionIndex) => {
                          const selectedOptions = answers.get(question.id) || [];
                          const isSelected = selectedOptions.includes(optionIndex);
                          
                          return (
                            <label key={optionIndex} className={`
                              flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 group relative overflow-hidden
                              ${isSelected 
                                ? 'bg-green-50 border-green-300 shadow-lg transform scale-[1.01]'
                                : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:scale-[1.005]'
                              }
                            `}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  const currentSelections = answers.get(question.id) || [];
                                  let newSelections;
                                  if (e.target.checked) {
                                    newSelections = [...currentSelections, optionIndex];
                                  } else {
                                    newSelections = currentSelections.filter((i: number) => i !== optionIndex);
                                  }
                                  handleAnswer(question.id, newSelections);
                                }}
                                className="sr-only"
                              />
                              <div className={`w-6 h-6 rounded-lg border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                                isSelected 
                                  ? 'bg-green-500 border-green-500' 
                                  : 'border-gray-400 group-hover:border-gray-500'
                              }`}>
                                {isSelected && (
                                  <CheckCircle2 className="h-4 w-4 text-white" />
                                )}
                              </div>
                              <span className={`font-medium transition-colors duration-200 flex-1 ${
                                isSelected ? 'text-green-700' : 'text-gray-700 group-hover:text-gray-900'
                              }`}>
                                {option}
                              </span>
                              {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl"></div>
                              )}
                            </label>
                          );
                        })}
                      </div>
                      {answers.get(question.id)?.length > 0 && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-700 font-medium">
                            {answers.get(question.id).length} option(s) selected
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Navigation Section with Progress Summary */}
        <div className="space-y-6">
          {/* Progress Summary Banner */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 p-6 shadow-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-blue-600 font-serif">
                  {answers.size}
                </div>
                <div className="text-xs text-gray-600">Questions Answered</div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full transition-all duration-500"
                    style={{width: `${(answers.size / filteredQuestions.length) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-600 font-serif">
                  {currentSection.questions.filter(q => answers.has(q.id)).length}
                </div>
                <div className="text-xs text-gray-600">Current Section</div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-1 rounded-full transition-all duration-500"
                    style={{width: `${(currentSection.questions.filter(q => answers.has(q.id)).length / currentSection.questions.length) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-purple-600 font-serif">
                  {Math.round(((sectionIdx + 1) / sections.length) * 100)}%
                </div>
                <div className="text-xs text-gray-600">Assessment Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-1 rounded-full transition-all duration-500"
                    style={{width: `${((sectionIdx + 1) / sections.length) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-amber-600 font-serif">
                  {Math.max(1, Math.ceil((filteredQuestions.length - answers.size) * 1.5))}
                </div>
                <div className="text-xs text-gray-600">Minutes Remaining</div>
                <div className="flex items-center justify-center gap-1 text-amber-600">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">Estimated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Previous Button */}
            <div className="lg:justify-self-start">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={sectionIdx === 0}
                className={`
                  bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400
                  px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl btn-effect
                  ${sectionIdx === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:-translate-y-1'}
                `}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-semibold">Previous Section</div>
                    {sectionIdx > 0 && (
                      <div className="text-xs text-gray-500 opacity-75">{sections[sectionIdx - 1]?.name}</div>
                    )}
                  </div>
                </div>
              </Button>
            </div>
            
            {/* Center Quick Stats */}
            <div className="text-center">
              <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {currentSection.name}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Section {sectionIdx + 1} of {sections.length}
                </div>
                <div className="flex items-center justify-center gap-2">
                  {currentSection.questions.filter(q => answers.has(q.id)).length === currentSection.questions.length ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-medium">Section Complete</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-blue-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">In Progress</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Next Button */}
            <div className="lg:justify-self-end">
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 btn-effect"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <div className="text-left">
                      <div className="text-sm font-semibold">Processing Assessment</div>
                      <div className="text-xs opacity-75">Please wait...</div>
                    </div>
                  </div>
                ) : isLastSection ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">Complete Assessment</div>
                      <div className="text-xs opacity-75">Submit for analysis</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <div className="text-sm font-semibold">Next Section</div>
                      {sectionIdx < sections.length - 1 && (
                        <div className="text-xs opacity-75">{sections[sectionIdx + 1]?.name}</div>
                      )}
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Help Section */}
        <div className="mt-12 p-6 bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                Need Assistance?
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Our assessment specialists are available to help you complete your evaluation.
              </p>
              <a 
                href="mailto:support@northpathstrategies.org" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@northpathstrategies.org
              </a>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-600" />
                Assessment Benefits
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Comprehensive organizational analysis</li>
                <li>• DSCH algorithm optimization recommendations</li>
                <li>• Custom implementation roadmap</li>
                <li>• ROI projections and risk assessments</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        </div>
      </PagesBackground>
    );
}

export default function SurveyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p>Loading survey...</p>
        </div>
      </div>
    }
    >
      <SurveyPageContent />
    </Suspense>
  );
}
