"use client";

import { useState, useMemo } from "react";
import LikertInput from "@/components/LikertInput";
import NumericInput from "@/components/NumericInput";
import { SelectInput } from "@/components/SelectInput";
import PublicNavigation from "@/components/PublicNavigation";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  getQuestionsForInstitution, 
  institutionTypeQuestion,
  InstitutionType 
} from "@/data/comprehensiveQuestionBank";

type Question = {
  id: string;
  text: string;
  area: string;
  type: "likert" | "select" | "multi-select" | "number" | "text";
  options?: string[];
};

function adaptQuestion(q: any): Question {
  return {
    id: q.id,
    text: q.prompt,
    area: q.section,
    type: q.type === 'numeric' ? 'number' : q.type,
    options: q.options
  };
}

export default function SimpleDebugPage() {
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<InstitutionType | undefined>();
  const [sectionIdx, setSectionIdx] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  // Get questions based on institution type
  const questions = useMemo(() => {
    if (selectedInstitutionType) {
      const filteredQuestions = getQuestionsForInstitution(selectedInstitutionType);
      return filteredQuestions.map(adaptQuestion);
    } else {
      return [adaptQuestion(institutionTypeQuestion)];
    }
  }, [selectedInstitutionType]);

  // Get sections and current section questions
  const sections = useMemo(
    () => Array.from(new Set(questions?.map(q => q.area))),
    [questions]
  );
  
  const currentSection = sections[sectionIdx] ?? '';
  const sectionQuestions = useMemo(
    () => questions?.filter(q => q.area === currentSection) ?? [],
    [questions, currentSection]
  );

  console.log('Simple Survey Debug:', {
    selectedInstitutionType,
    questionsLength: questions.length,
    sections,
    currentSection,
    sectionQuestionsLength: sectionQuestions.length,
    sectionIdx
  });

  const handleAnswer = (questionId: string, value: number | null, text?: string) => {
    console.log('Answer submitted:', { questionId, value, text });
    
    setResponses(prev => ({
      ...prev,
      [questionId]: { value, text }
    }));

    // Handle institution type selection
    if (questionId === 'INST_TYPE' && text) {
      const institutionTypeMap: Record<string, InstitutionType> = {
        'Community College': 'community-college',
        'Public University/State University': 'public-university',
        'Private University/College': 'private-university',
        'Healthcare Organization/Hospital System': 'healthcare',
        'Nonprofit Organization': 'nonprofit',
        'Government Agency': 'government',
        'Corporate/Business Organization': 'corporate'
      };
      
      const institutionType = institutionTypeMap[text];
      console.log('Setting institution type to:', institutionType);
      
      if (institutionType) {
        setSelectedInstitutionType(institutionType);
        setSectionIdx(0); // Reset to first section
      }
    }
  };

  const handleNext = () => {
    if (sectionIdx < sections.length - 1) {
      setSectionIdx(sectionIdx + 1);
    }
  };

  const handlePrev = () => {
    if (sectionIdx > 0) {
      setSectionIdx(sectionIdx - 1);
    }
  };

  if (!sectionQuestions.length && selectedInstitutionType) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <PublicNavigation />
        <main className="max-w-xl mx-auto py-20 text-center space-y-6 flex-1">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-10">
            <h1 className="text-4xl font-bold text-slate-100 mb-4">Assessment Complete!</h1>
            <p className="text-lg text-slate-300 mb-8">
              Thank you for completing the organizational assessment.
            </p>
            <p className="text-sm text-slate-400">
              Total responses: {Object.keys(responses).length}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <PublicNavigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 flex-1">
        {/* Progress bar */}
        {selectedInstitutionType && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">
                Section {sectionIdx + 1} of {sections.length}: {currentSection}
              </span>
              <span className="text-sm text-slate-400">
                {Math.round(((sectionIdx + 1) / sections.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((sectionIdx + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {sectionQuestions.map((question, idx) => (
            <div key={question.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-slate-100 mb-4">
                {idx + 1}. {question.text}
              </h3>
              
              {question.type === 'likert' && (
                <LikertInput
                  onSelect={(value) => handleAnswer(question.id, value)}
                  initialValue={responses[question.id]?.value}
                />
              )}
              
              {question.type === 'number' && (
                <NumericInput
                  onSubmit={(value) => handleAnswer(question.id, value)}
                  initialValue={responses[question.id]?.value}
                />
              )}
              
              {question.type === 'select' && question.options && (
                <SelectInput
                  options={question.options}
                  onSelect={(text) => handleAnswer(question.id, null, text)}
                  type="select"
                  initialValue={responses[question.id]?.text}
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        {selectedInstitutionType && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={sectionIdx === 0}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={sectionIdx >= sections.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Debug info */}
        <div className="mt-8 text-xs text-slate-500 font-mono">
          Debug: {questions.length} total questions, {sectionQuestions.length} in current section
        </div>
      </main>
    </div>
  );
}