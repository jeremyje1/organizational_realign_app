"use client";
import QuestionField from "@/components/wizard/QuestionField";
import { RealignmentFormData, Question } from "@/lib/types";

interface Props {
  pillar: string;           // e.g. "Academic Affairs"
  questions: Question[];    // the list for that pillar
  data: RealignmentFormData;
  onChange(delta: Partial<RealignmentFormData>): void;
}

export default function Step({ pillar, questions, data, onChange }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">{pillar}</h2>

      {questions.map((q) => (
        <QuestionField
          key={q.id}
          question={q}
          value={data[q.id]}
          onChange={(value) => onChange({ [q.id]: value })}
        />
      ))}
    </section>
  );
}