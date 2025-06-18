"use client";

import { useState } from "react";
import Step1 from "@/components/wizard/Step1";
import Step2 from "@/components/wizard/Step2";
import Step3 from "@/components/wizard/Step3";
import Step4 from "@/components/wizard/Step4";
import Button from "@/components/ui/button";
import { RealignmentFormData } from "@/lib/types";

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

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (field: keyof RealignmentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted:", formData);
    alert("Form submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4" role="region" aria-labelledby="wizard-heading">
      <h1 id="wizard-heading" className="text-2xl font-semibold mb-6">
        Organizational Realignment Wizard
      </h1>
      <div className="mb-4 text-sm text-muted-foreground">
        Step {step + 1} of {steps.length}: {steps[step]}
      </div>

      {step === 0 && <Step1 data={formData} onChange={handleChange} />}
      {step === 1 && <Step2 data={formData} onChange={handleChange} />}
      {step === 2 && <Step3 data={formData} onChange={handleChange} />}
      {step === 3 && <Step4 data={formData} />}

      <div className="mt-6 flex justify-between">
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