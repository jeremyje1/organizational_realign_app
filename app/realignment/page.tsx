"use client";

import { useState } from "react";
import Step1 from "@/components/wizard/Step1";
import Step2 from "@/components/wizard/Step2";
import Step3 from "@/components/wizard/Step3";
import Step4 from "@/components/wizard/Step4";
import Button from "@/components/ui/button";
import { RealignmentFormData } from "@/lib/types";

export default function RealignmentPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RealignmentFormData>({
    orgName: "",
    unitName: "",
    scenario: "",
    notes: "",
  });

  const update = (field: keyof RealignmentFormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const steps = [
    <Step1 key={0} data={data} onChange={update} />,
    <Step2 key={1} data={data} onChange={update} />,
    <Step3 key={2} data={data} onChange={update} />,
    <Step4 key={3} data={data} />,
  ];

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      {steps[step]}

      <div className="flex justify-between pt-6">
        <Button disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
        <Button
          onClick={() => setStep((s) => s + 1)}
          disabled={step === steps.length - 1}
        >
          {step === steps.length - 2 ? "Review" : "Next"}
        </Button>
      </div>
    </main>
  );
}