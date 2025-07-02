import { useEffect, useState } from 'react';
import { 
  Question as ComprehensiveQuestion, 
  InstitutionType,
  comprehensiveQuestionBank, 
  institutionTypeQuestion,
  getQuestionsForInstitution 
} from '@/data/comprehensiveQuestionBank';

// Adapt the comprehensive question structure to match the existing interface
export type Question = {
  id: string;
  text: string;
  area: string;
  type: "likert" | "select" | "multi-select" | "number" | "text";
  options?: string[];
  conditional?: { dependsOn: string; value: string };
};

function adaptQuestion(q: ComprehensiveQuestion): Question {
  return {
    id: q.id,
    text: q.prompt,
    area: q.section,
    type: q.type === 'numeric' ? 'number' : q.type,
    options: q.options
  };
}

export function useQuestions(institutionType?: InstitutionType) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (institutionType) {
      // Filter questions for specific institution type
      const filteredQuestions = getQuestionsForInstitution(institutionType);
      const adaptedQuestions = filteredQuestions.map(adaptQuestion);
      setQuestions(adaptedQuestions);
    } else {
      // Show only institution type question initially
      const adaptedQuestion = adaptQuestion(institutionTypeQuestion);
      setQuestions([adaptedQuestion]);
    }
    setLoading(false);
  }, [institutionType]);

  return { questions, loading };
}