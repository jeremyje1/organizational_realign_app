import React from 'react';
import type { Pillar, Question } from '@/types/types';
import QuestionField from './QuestionField';

interface StepProps {
  pillar: Pillar;
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
}

export default function Step({ pillar, data, setData }: StepProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">
        {(pillar as any).title ?? (pillar as any).name ?? 'Untitled pillar'}
      </h2>

      {pillar.questions.map((q: Question) => (
        <div key={q.id} className="space-y-2">
          <label className="block text-sm font-medium">
            {(q as any).prompt ?? (q as any).label ?? (q as any).text ?? 'Question'}
          </label>
          <QuestionField
            q={q}
            value={data[q.id]}
            onChange={(v: string) => setData({ ...data, [q.id]: v })}
          />
        </div>
      ))}
    </section>
  );
}