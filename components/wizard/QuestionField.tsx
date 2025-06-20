"use client";

import { Input }     from "@/components/ui/input";
import { Textarea }  from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem }
  from "@/components/ui/select";

import { Question }  from "@/lib/types";

interface Props {
  question: Question;
  value:    any;
  onChange: (v: any) => void;
}

export default function QuestionField({ question, value, onChange }: Props) {
  const wrap = "space-y-1";

  switch (question.type) {
    case "text":
    case "number":
      return (
        <div className={wrap}>
          <label className="font-medium">{question.label}</label>
          <Input
            type={question.type}
            value={value ?? ""}
            onChange={e => onChange(e.target.value)}
          />
        </div>
      );

    case "textarea":
      return (
        <div className={wrap}>
          <label className="font-medium">{question.label}</label>
          <Textarea
            value={value ?? ""}
            onChange={e => onChange(e.target.value)}
          />
        </div>
      );

    case "select":
      return (
        <div className={wrap}>
          <label className="font-medium">{question.label}</label>

          <Select value={value ?? ""} onValueChange={onChange}>
            <SelectTrigger className="w-full" />
            <SelectContent>
              {question.options?.map(opt => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "file":
      return (
        <div className={wrap}>
          <label className="font-medium">{question.label}</label>
          <Input type="file"
                 onChange={e => onChange(e.target.files?.[0] ?? null)} />
        </div>
      );

    default:
      return null;
  }
}