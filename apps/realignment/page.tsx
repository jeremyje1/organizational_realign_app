"use client";

import { useState } from "react";
import Step1 from "@/components/wizard/Step1";
import Step2 from "@/components/wizard/Step2";
import Step3 from "@/components/wizard/Step3";
import Step4 from "@/components/wizard/Step4";
import Button from "@/components/ui/button";
import type { RealignmentFormData } from "@/lib/types";

const steps = [
  "Department Info",
  "Proposed Changes",
  "Justification",
  "Review & Submit",
];

export default function RealignmentWizardPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<RealignmentFormData>({
    departmentName: "",
    impactedUnits: "",
    proposedChange: "",
    rationale: "",
  });

  /* navigation helpers */
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  /* child-to-parent change handler */
  const handleChange = (
    field: keyof RealignmentFormData,
    value: string
  ) => setFormData((prev) => ({ ...prev, [field]: value }));

  /* final submit */
  const handleSubmit = () => {
    console.log("Submitted:", formData);
    alert("Submitted! Check the console for details.");
  };

  return (
    <div className="space-y-6">
      {/* progress indicator */}
      <p className="text-sm text-gray-600">
        Step {step + 1} of {steps.length}: <strong>{steps[step]}</strong>
      </p>

      {/* step content */}
      {step === 0 && (
        <Step1 data={formData} onChange={handleChange} />
      )}
      {step === 1 && (
        <Step2 data={formData} onChange={handleChange} />
      )}
      {step === 2 && (
        <Step3 data={formData} onChange={handleChange} />
      )}
      {step === 3 && <Step4 data={formData} />}

      {/* nav buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={back} disabled={step === 0}>
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={next}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
}