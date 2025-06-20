"use client";

import { Question } from "@/lib/questions";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import FileDrop from "@/components/ui/file-drop";

type Props = {
  q: Question;
  value: unknown;
  onChange: (v: any) => void;
};

export default function QuestionField({ q, value, onChange }: Props) {
  switch (q.type) {
    case "text":
      return (
        <div className="space-y-1">
          <label className="font-medium">{q.prompt}</label>
          <Textarea
            value={value as string ?? ""}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              onChange(e.target.value)
            }
            required={q.required}
          />
        </div>
      );

    case "number":
      return (
        <div className="space-y-1">
          <label className="font-medium">{q.prompt}</label>
          <Input
            type="number"
            value={value as number ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
            required={q.required}
          />
        </div>
      );

    case "select":
      return (
        <div className="space-y-1">
          <label className="font-medium">{q.prompt}</label>
          <Select
            value={(value as string) ?? ""}
            onValueChange={onChange}
            required={q.required}
          >
            {q.options?.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      );

    case "file":
      return (
        <FileDrop
          label={q.prompt}
          file={value as File | null}
          onFile={onChange}
        />
      );

    default:
      return null;
  }
}