"use client";

import Button from "@/components/ui/button";
import { RealignmentFormData } from "@/lib/types";

export default function Step4({ data }: { data: RealignmentFormData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Review your answers</h2>
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Department:</strong> {data.departmentName}
        </li>
        <li>
          <strong>Impacted Units:</strong> {data.impactedUnits}
        </li>
        <li>
          <strong>Proposed Change:</strong> {data.proposedChange}
        </li>
        <li>
          <strong>Rationale:</strong> {data.rationale}
        </li>
      </ul>
      <Button variant="primary" onClick={() => alert("Looks good!")}>
        Confirm &amp; Submit
      </Button>
    </div>
  );
}