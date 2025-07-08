# NorthPath Strategies · MASTER OVERHAUL PLAN  
### Version 1.0 · 2025‑07‑04

> 🔖 **Purpose** – One stop, end‑to‑end playbook for redesigning the marketing site, assessment wizard, algorithm, analytics, and supporting collateral so that the product experience unequivocally justifies the price of each service tier.

---

## 0. High‑Level Objectives

| # | Objective | Success Metric |
|---|-----------|----------------|
| **O‑1** | Elevate brand & UX to enterprise‑grade quality. | ≥ 30 % lift in CTA click‑through; Lighthouse Perf + BestPractices ≥ 95. |
| **O‑2** | Refactor assessment wizard for clarity, speed, and data integrity. | Completion rate ≥ 85 %; average session ≤ 12 min. |
| **O‑3** | Strengthen algorithm transparency & industry specificity. | Client “perceived relevance” survey ≥ 9/10. |
| **O‑4** | Implement deep funnel & outcomes analytics. | End‑to‑end attribution from landing → paid conversion. |
| **O‑5** | Package collateral that reinforces value at each price tier. | Close‑rate uplift ≥ 15 % against 2024 baseline. |

---

## 1. Project Structure & Roles

| Role | Lead | Key Responsibilities |
|------|------|----------------------|
| **Product Owner** | *Jeremy Estrella* | Vision, pricing, content approvals. |
| **Project Manager** | TBD | Agile ceremonies, timeline, risk log. |
| **Lead Designer** | TBD | UI kit, responsive layouts, brand visuals. |
| **Full‑Stack Dev** | TBD | Next.js, API, database, CI/CD. |
| **Algorithm Engineer** | TBD | Scoring logic, benchmarks, explainability. |
| **Analytics Engineer** | TBD | DataLayer, GA4, Mixpanel, Looker dashboards. |
| **Content Strategist** | TBD | Copy, industry localisation, thought leadership. |

---

## 2. Milestone Timeline (Gantt‑style)

| Sprint | Dates | Deliverables |
|--------|-------|--------------|
| **S‑0** | Kick‑off + assets hand‑off | 07 Jul – 11 Jul | Finalise scope, repo setup. |
| **S‑1** | Brand & Navigation | 12 Jul – 25 Jul | Hero redesign, sticky nav, colour contrast pass. |
| **S‑2** | Assessment Wizard MVP | 26 Jul – 08 Aug | 3‑step wizard, autosave, tRPC API. |
| **S‑3** | Algorithm v2 & Industry Localisation | 09 Aug – 22 Aug | Weight tuning, segment dictionary, peer benchmarks. |
| **S‑4** | Analytics Deep‑Link & Dashboards | 23 Aug – 05 Sep | GA4, Mixpanel, BigQuery stream, Looker Studio. |
| **S‑5** | Collateral & Price‑Justification Content | 06 Sep – 19 Sep | Guides, sample reports, PDF generator. |
| **S‑6** | Hardening & Launch | 20 Sep – 03 Oct | Pen‑test, accessibility audit, CWV sign‑off. |

---

## 3. Technical Stack Reference

* **Frontend**: Next.js 14 (App Router) · React 18 · Tailwind CSS 3.x · Shad CN  
* **Backend**: Node 20 · tRPC · Prisma ORM · PostgreSQL 14 (Supabase)  
* **Auth**: Supabase Auth (Google, GitHub, SAML as add‑on)  
* **Payments**: Stripe Checkout (only after value demonstration)  
* **CI/CD**: GitHub Actions → Vercel Preview / Prod  
* **Analytics**: GA4 + GTM + Mixpanel, server‑side BigQuery stream  
* **PDF gen**: `@react-pdf/renderer` (serverless)  

---

## 4. File‑Level Implementation Checklist

> **All paths relative to repo root**

| Path | Action |
|------|--------|
| `/public/images/` | Replace hero, logo, founder headshot with supplied assets. |
| `/components/Navbar.tsx` | Make sticky, add CTA button, aria‑labels. |
| `/components/Hero.tsx` | Use Image component with `priority`, include H1 + sub‑headline + CTA. |
| `/app/assessment/(wizard)/[step]/page.tsx` | Build 3 dynamic routes: org-profile, practices, readiness. |
| `/lib/algorithm/score.ts` | Implement v2 (weights, confidence intervals, segment normaliser). |
| `/pages/api/pdf/[doc].ts` | On‑the‑fly PDF generation for guides & sample reports. |
| `/analytics/gtm-datalayer.ts` | Central event emitter (`assessment_start`, `service_tier_selected`, `checkout_success`). |
| `/tests/` | Add vitest unit tests for scoring & branching. |
| `.github/workflows/ci.yml` | Add Lighthouse‐CI, Axe‐CI, and Prisma migrate. |

---

## 5. Copilot Prompts (inline comments)

Throughout the repo you will find comments like:

```ts
// @copilot todo: localise question text based on `segment` ENUM

*Changes vs. v1.0:*
* Added explicit accessibility KPI (axe‑ci ≥ 97).  
* Clarified AI‑narrative human‑rating loop (Section 6).  
* Locked dates to ISO (yyyy‑mm‑dd) for international teams.
6. Deployment Definition of Done
Perf: LCP ≤ 1.8 s, TBT ≤ 200 ms, CLS ≤ 0.1 on crUX 75p.

Accessibility: axe‑ci critical violations = 0.

Security: Auth route covered by Supabase RLS; OWASP ZAP score ≥ A.

Business: Stripe test payment for Implementation tier succeeds; CRM (HubSpot) Webhook fires.
© 2025 NorthPath Strategies · Confidential & Proprietary
