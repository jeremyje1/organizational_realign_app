import { useState, useMemo } from 'react';
import { useQuestions } from './useQuestions';
import { supabase } from '@/lib/supabase-browser';
import { InstitutionType } from '@/data/comprehensiveQuestionBank';

export function useSurvey(userId: string | null) {
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<InstitutionType | undefined>();
  const { questions, loading } = useQuestions(selectedInstitutionType);
  const [sectionIdx, setSectionIdx] = useState(0);

  const sections = useMemo(
    () => Array.from(new Set(questions?.map(q => q.area))),
    [questions]
  );
  const currentSection = sections[sectionIdx] ?? '';

  const sectionQuestions = useMemo(
    () => questions?.filter(q => q.area === currentSection) ?? [],
    [questions, currentSection]
  );

  async function saveAnswer(qId: string, value: number | null, text = '') {
    if (!userId) return;
    
    // Handle institution type selection
    if (qId === 'INST_TYPE' && text) {
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
      if (institutionType) {
        setSelectedInstitutionType(institutionType);
        // Reset to first section when institution type is selected
        setSectionIdx(0);
      }
    }
    
    await supabase.from('survey_responses').insert({
      user_id: userId,
      question_id: qId,
      numeric_answer: value,
      text_answer: text
    });
  }

  return {
    loading,
    section: currentSection,
    sectionQuestions,
    sectionIdx,
    sections,
    selectedInstitutionType,
    setSelectedInstitutionType,
    next: () => setSectionIdx(i => i + 1),
    setSectionIdx,
    saveAnswer
  };
}