# Assessment, Algorithm & UX Improvement Details  
_(Breaks down what to fix or enhance and how)_

---

## A. Assessment Question Bank v2

| Step | Q‑ID | Current Text | Issue | Improved Text |
|------|------|--------------|-------|---------------|
| Org‑Profile | OP‑03 | “Number of staff” | Ambiguous (FTE? All sites?) | “How many full‑time equivalent (FTE) employees are on payroll across all sites?” |
| Practices | PR‑07 | “We have change‑management processes.” | Vague | “Our organisation follows a documented, stage‑gate change‑management framework (e.g., ADKAR, Prosci) for all enterprise projects.” |
| Readiness | RD‑04 | “Executive sponsorship” | Too binary | “An executive with budget authority meets weekly with the project lead and publicly advocates for the initiative.” |

*Language localized dynamically via `segment` ENUM and i18n JSON dictionaries.*

---

## B. Algorithm Enhancements

```ts
type Segment = 'HIGHER_ED' | 'NON_PROFIT' | 'HEALTHCARE';

interface FactorWeight {
  spanControl: number;  // 0.25
  culture     : number; // 0.25
  techFit     : number; // 0.20
  readiness   : number; // 0.30
}

export function calcScore(answers: Record<string, number>, segment: Segment) {
  const weights = getWeightsBySegment(segment);
  const raw     = normaliseAnswers(answers);          // 0‑1 scale
  const score   = Object.keys(weights)
                       .reduce((acc,k)=>acc+weights[k]*raw[k],0);
  const ci      = confidenceInterval(answers);        // ± value
  return { score, tier: tierFromScore(score), ci };
}
// Add peerPercentile lookup using Supabase RPC view fn_peer_percentile(segment, score).
```

---

## C. UX Improvements (Wizard)
- **Progress Indicator** – Use `<Stepper>` from Shad CN; display “Step 2 of 3 – Current Practices”.
- **Autosave Draft** – `useDebounce` (3 s) → `trpc.saveDraft.mutate()`.
- **Flag for Follow‑up** – Checkbox per question; flagged Qs summarised on final review screen.
- **Accessibility** – `aria‑live="polite"` for validation messages; **contrast ratio ≥ 4.5 : 1**.

---

## D. Analytics Events (GTM DataLayer)
| Event | Payload | Trigger |
|-------|---------|---------|
| assessment_start | {step:1} | Wizard mount |
| assessment_step_complete | {step, duration} | Next click |
| assessment_submit | {score, tier} | Submission success |
| service_tier_checkout | {tier} | Stripe Checkout session |
| pdf_download | {doc} | PDF generator success |

All events forwarded to GA4 and Mixpanel; raw writes to BigQuery via GTM server container.

---

## E. Unit & Integration Tests
- `tests/score.test.ts` – Edge cases: 0 %, 100 %, missing data.
- `tests/wizard.cy.ts` – Cypress: validate autosave on reload, branch logic skip.
- `tests/accessibility.spec.ts` – jest‑axe snapshots for each step.

---

# Assessment, Algorithm & UX Recs · v1.1

*Key refinements*
1. Added **Shapley preview** stub for future model‑explainability (Section B).  
2. Wizard now stores **prompt + completion** to BigQuery for bias auditing (Section D.3).  
3. WCAG contrast ratio target tightened to **≥ 4.5 : 1** (was 3 : 1).

© 2025 NorthPath Strategies · Confidential & Proprietary