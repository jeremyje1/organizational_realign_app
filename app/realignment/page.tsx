// app/realignment/page.tsx
"use client";

import { useState } from "react";
import { Button }   from "@/components/ui/button";

import Step                       from "@/components/wizard/Step";
import { questionnaire }          from "@/lib/questions";
import { emptyForm, RealignmentFormData } from "@/lib/types";

/** narrow helper so we don’t feed `undefined` back into state */
function cleanDelta(delta: Partial<RealignmentFormData>) {
  const out: Partial<RealignmentFormData> = {};
  for (const [k, v] of Object.entries(delta)) {
    if (v !== undefined) (out as any)[k] = v;
  }
  return out;
}

export default function RealignmentPage() {
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState<RealignmentFormData>(emptyForm);

  const totalSteps         = questionnaire.length;
  const current            = questionnaire[step];

  const update = (delta: Partial<RealignmentFormData>) =>
    setAnswers(prev => ({ ...prev, ...cleanDelta(delta) }) as RealignmentFormData);

  const next = () => step < totalSteps - 1 && setStep(step + 1);
  const back = () => step > 0          && setStep(step - 1);

  async function submit() {
    await fetch("/api/realignment", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(answers),
    });
    alert("Submitted ✅");
    setStep(0);
    setAnswers(emptyForm);
  }

  return (
    <section className="mx-auto max-w-3xl space-y-8 p-6">
      <h1 className="text-2xl font-semibold">{current.title}</h1>

      <Step pillar={current} answers={answers} onChange={update} />

      <div className="flex justify-between">
        <Button disabled={step === 0} onClick={back}>
          ← Back
        </Button>

        {step < totalSteps - 1 ? (
          <Button onClick={next}>Next →</Button>
        ) : (
          <Button onClick={submit}>Submit</Button>
        )}
      </div>
    </section>
  );
}