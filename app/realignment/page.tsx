"use client";

import { useState, useTransition } from "react";
import Step from "@/components/wizard/Step";
import { questionsByPillar } from "@/lib/questions";
import Button from "@/components/ui/button";
import { RealignmentFormData, emptyForm } from "@/lib/types";

export default function RealignmentPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RealignmentFormData>(emptyForm);
  const [isPending, startTransition] = useTransition();

  const update = (delta: Partial<RealignmentFormData>) =>
    setData((prev) => ({ ...prev, ...delta }));

  /* -------------------------------------------------- */
  /**
   * Final submit: POST the accumulated answers to our API route.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const res = await fetch("/api/realignment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Request failed");
        // TODO: replace alerts with toast UI
        alert("Realignment questionnaire submitted! We’ll be in touch.");
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
      }
    });
  };
  /* -------------------------------------------------- */

  const pillars = Object.keys(questionsByPillar);          // ["Academic Affairs", …]
  const isLast  = step === pillars.length - 1;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl space-y-8 p-8"
    >
      <Step
        pillar={pillars[step]}
        questions={questionsByPillar[pillars[step]]}
        data={data}
        onChange={update}
      />

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          disabled={step === 0 || isPending}
          onClick={() => setStep(step - 1)}
        >
          Back
        </Button>

        {isLast ? (
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting…" : "Submit"}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={isPending}
          >
            {step === pillars.length - 2 ? "Review" : "Next"}
          </Button>
        )}
      </div>
    </form>
  );
}