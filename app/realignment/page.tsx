import { useState } from "react";
import Step1 from "@/components/wizard/Step1";
import Step2 from "@/components/wizard/Step2";
import { RealignmentFormData } from "@/lib/types";

export default function RealignmentPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<RealignmentFormData>({
    orgName: "",
    unitName: "",
    /* …other initial fields… */
  });

  /** update a single field */
  const handleChange = (
    field: keyof RealignmentFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      {step === 0 && <Step1 data={formData} onChange={handleChange} />}
      {step === 1 && <Step2 data={formData} onChange={handleChange} />}

      <div className="flex justify-end gap-2">
        {step > 0 && (
          <button
            className="rounded bg-muted px-4 py-2"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
        )}
        {step < 1 && (
          <button
            className="rounded bg-primary px-4 py-2 text-background"
            onClick={() => setStep((s) => s + 1)}
          >
            Next
          </button>
        )}
      </div>
    </main>
  );
}