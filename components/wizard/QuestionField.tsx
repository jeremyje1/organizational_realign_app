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
  value?: string;
  onChange: (v: string) => void;
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
  value,
  onChange,
}: QuestionFieldProps) {
  // ───── text question ─────
  if (q.type === 'text') {
    return (
      <Input
        value={value ?? ''}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={(q as any).placeholder ?? ''}
        required={(q as any).required}
      />
    );
  }

  // ───── select question ─────
  if (q.type === 'select' && Array.isArray(q.options)) {
    return (
      <Select value={value ?? ''} onValueChange={onChange}>
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