"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "@/lib/questions";

interface Props {
  question: Question;
  value: string | number | File | null;
  onChange: (value: string | number | File | null) => void;
}

export default function QuestionField({ question, value, onChange }: Props) {
  switch (question.type) {
    case "text":
      return (
        <Input
          placeholder={question.label}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "textarea":
      return (
        <Textarea
          placeholder={question.label}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      );

    case "select":
      return (
        <Select
          value={(value as string) ?? ""}
          onValueChange={(v) => onChange(v)}
        >
          <SelectTrigger>
            <SelectValue placeholder={question.label} />
          </SelectTrigger>
          <SelectContent>
            {question.options!.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "file":
      return (
        <input
          type="file"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      );

    default:
      return null;
  }
}