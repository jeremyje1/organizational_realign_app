"use client"

import QuestionField from "./QuestionField"
import {
  Pillar,
  RealignmentFormData,
} from "@/lib/types"

interface Props {
  pillar:   Pillar
  answers:  RealignmentFormData
  onChange: (delta: Partial<RealignmentFormData>) => void
}

export default function Step ({ pillar, answers, onChange }: Props) {
  return (
    <div className="space-y-6">
      {pillar.questions.map(q => (
        <QuestionField
          key={q.key}
          question={q}
          value={answers[q.key]}
          onChange={val => onChange({ [q.key]: val })}
        />
      ))}
    </div>
  )
}