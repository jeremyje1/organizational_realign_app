import React from 'react';
import type { Question } from '@/types/types';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface QuestionFieldProps {
  q: Question;
  selected?: string;
  /** fires when user picks / types a new value */
  onChange: (_value: string) => void;
}

/**
 * Renders an input field that matches the question’s declared type.
 * Currently supports:
 *   • type === 'text'
 *   • type === 'select'  (expects `q.options: string[]`)
 * Extend this when you add more question kinds.
 */
export default function QuestionField({
  q,
  selected,
  onChange,
}: QuestionFieldProps) {
  // ───── text question ─────
  if (q.type === 'text') {
    return (
      <Input
        value={selected ?? ''}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={q.placeholder ?? ''}
        required={q.required}
      />
    );
  }

  // ───── select question ─────
  if (q.type === 'select' && Array.isArray(q.options)) {
    return (
      <Select value={selected ?? ''} onValueChange={onChange}>
        <SelectTrigger />
        <SelectContent>
          {q.options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // fallback (should never hit)
  return null;
}