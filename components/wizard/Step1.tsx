"use client";

import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import { RealignmentFormData } from "@/lib/types";

interface Props {
  data: RealignmentFormData;
  onChange: (field: keyof RealignmentFormData, value: string) => void;
}

export default function Step1({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="departmentName">Department Name</Label>
        <Input
          id="departmentName"
          value={data.departmentName}
          onChange={(e) => onChange("departmentName", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="impactedUnits">Impacted Units</Label>
        <Input
          id="impactedUnits"
          value={data.impactedUnits}
          onChange={(e) => onChange("impactedUnits", e.target.value)}
        />
      </div>
    </div>
  );
}