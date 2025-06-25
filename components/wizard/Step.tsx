import React from 'react';
import type { Pillar, Question } from '@/types/types';
import QuestionField from './QuestionField';

const getPrompt = (q: Question): string => {
  if ('prompt' in q && q.prompt) return q.prompt;
  if ('label' in q && q.label)   return q.label;
  if ('text' in q && q.text)     return q.text;
  return 'Question';
};

/* eslint-disable @typescript-eslint/no-unused-vars */
interface StepProps {
  pillar: Pillar;
  data: Record<string, string>;
  setData: (_value: Record<string, string>) => void;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export default function Step({ pillar, data, setData }: StepProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">
        {pillar.title ?? pillar.name ?? 'Untitled pillar'}
      </h2>

      {pillar.questions.map((q: Question) => (
        <div key={q.id} className="space-y-2">
          <label className="block text-sm font-medium">
            {getPrompt(q)}
          </label>
          <QuestionField
            q={q}
            selected={data[q.id]}
            onChange={(_value: string) =>
              setData({ ...data, [q.id]: _value })}
          />
        </div>
      ))}
    </section>
  );
}