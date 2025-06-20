"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import Step from "@/components/wizard/Step";
import { questionnaire } from "@/lib/questions";
import { emptyForm, RealignmentFormData } from "@/lib/types";

export default function RealignmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<RealignmentFormData>(emptyForm);

  const totalSteps = questionnaire.length;
  const currentPillar = questionnaire[step];

  function updateAnswers(delta: Partial<RealignmentFormData>) {
    setAnswers((prev) => ({ ...prev, ...delta }));
  }

  function next()  { if (step < totalSteps - 1) setStep(step + 1); }
  function back()  { if (step > 0) setStep(step - 1); }
  function reset() { setStep(0); setAnswers(emptyForm); }

  async function submit() {
    await fetch("/api/realignment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    alert("Submitted! 🎉");
    reset();
  }

  return (
    <section className="mx-auto max-w-3xl space-y-8 p-6">
      <h1 className="text-2xl font-semibold">{currentPillar.title}</h1>

      <Step pillar={currentPillar} answers={answers} onChange={updateAnswers} />

      <div className="flex justify-between">
        <Button type="button" disabled={step === 0} onClick={back}>
          ← Back
        </Button>

        {step < totalSteps - 1 ? (
          <Button type="button" onClick={next}>
            Next →
          </Button>
        ) : (
          <Button type="button" onClick={submit}>
            Submit
          </Button>
        )}
      </div>
    </section>
  );
}