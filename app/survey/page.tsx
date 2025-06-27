"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { useSurvey } from "@/hooks/useSurvey";
import LikertInput from "@/components/LikertInput";
import NumericInput from "@/components/NumericInput";

export default function SurveyPage() {
  const user = useUser();                     // Supabase auth context
  const {
    loading,
    section,
    sectionQuestions,
    next,
    saveAnswer
  } = useSurvey(user?.id ?? null);

  if (loading) return <p className="p-10">Loading questions…</p>;

  if (!sectionQuestions.length) {
    return (
      <main className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h1 className="text-3xl font-semibold">🎉 Survey complete</h1>
        <p className="text-gray-600">
          Thanks for completing the organizational realignment assessment.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold">{section}</h1>

      {sectionQuestions.map((q) => (
        <div key={q.id} className="space-y-2">
          <p>{q.prompt}</p>

          {q.type === "likert" ? (
            <LikertInput onSelect={(v) => saveAnswer(q.id, v)} />
          ) : (
            <NumericInput onSubmit={(v) => saveAnswer(q.id, v)} />
          )}
        </div>
      ))}

      <button
        className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={next}
      >
        Next section →
      </button>
    </main>
  );
}
