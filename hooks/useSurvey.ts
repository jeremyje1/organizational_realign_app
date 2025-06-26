import { useState, useMemo } from 'react';
import { useQuestions } from './useQuestions';
import { supabase } from '@/lib/supabase-client';

export function useSurvey(userId: string | null) {
  const { questions, loading } = useQuestions();
  const [sectionIdx, setSectionIdx] = useState(0);

  const sections = useMemo(
    () => Array.from(new Set(questions?.map(q => q.section))),
    [questions]
  );
  const currentSection = sections[sectionIdx] ?? '';

  const sectionQuestions = useMemo(
    () => questions?.filter(q => q.section === currentSection) ?? [],
    [questions, currentSection]
  );

  async function saveAnswer(qId: string, value: number | null, text = '') {
    if (!userId) return;
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
    next: () => setSectionIdx(i => i + 1),
    saveAnswer
  };
}