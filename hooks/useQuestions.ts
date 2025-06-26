import { useEffect, useState } from 'react';
import { Question } from '@/data/questionBank';   // reuse the interface
import { supabase } from '@/lib/supabase-client';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    supabase
      .from('questions')
      .select('*')
      .order('id')
      .then(({ data, error }) => {
        if (error) console.error(error);
        setQuestions(data as Question[]);
        setLoading(false);
      });
  }, []);

  return { questions, loading };
}