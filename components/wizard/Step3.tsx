"use client";

import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { RealignmentFormData } from "@/lib/types";

interface Props {
  data: RealignmentFormData;
  onChange: (field: keyof RealignmentFormData, value: string) => void;
}

export default function Step3({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <Label htmlFor="rationale">Rationale / Justification</Label>
      <Textarea
        id="rationale"
        rows={4}
        value={data.rationale}
        onChange={(e) => onChange("rationale", e.target.value)}
      />
    </div>
  );
}