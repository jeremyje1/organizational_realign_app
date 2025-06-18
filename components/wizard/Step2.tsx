"use client";

import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { RealignmentFormData } from "@/lib/types";

interface Props {
  data: RealignmentFormData;
  onChange: (field: keyof RealignmentFormData, value: string) => void;
}

export default function Step2({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="proposedChange">Proposed Change</Label>
        <Textarea
          id="proposedChange"
          rows={4}
          value={data.proposedChange}
          onChange={(e) => onChange("proposedChange", e.target.value)}
        />
      </div>
    </div>
  );
}