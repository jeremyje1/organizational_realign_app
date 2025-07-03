# 🏠 NorthPath Strategies – Homepage Build Guide  
*Target look & feel: Wix template “Consulting & Coaching 2527”*  
Last updated: **2025‑07‑02**

---

## 1  Project Prerequisites
| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | ≥ 20 LTS | Required for Next.js 14 |
| **pnpm** | ≥ 9 | Faster monorepo installs |
| **Next.js** | 14 (App Router, RSC) | SSR + streaming |
| **Tailwind CSS** | 3 | Rapid styling |
| **@heroicons/react** | latest | Iconography |
| **Lucide‑react** | latest | Secondary icons |
| **Open Sans** & **Lora** | Google Fonts | Matches NorthPath brand |

> **Tip for Copilot**  
> Begin every component file with a doc‑block that cites this guide ‑–  
> _“@generated from HOMEPAGE_INSTRUCTIONS.md – do not delete.”_  
> This keeps Copilot aligned with your intent.

---

## 2  Directory Layout (desired)
/src
├─ app
│ ├─ layout.tsx # global font & meta
│ ├─ page.tsx # home route
│ └─ globals.css # Tailwind base + custom vars
├─ components
│ ├─ Navbar.tsx
│ ├─ Hero.tsx
│ ├─ About.tsx
│ ├─ Services.tsx
│ ├─ StatsBanner.tsx
│ ├─ Testimonials.tsx
│ ├─ CallToAction.tsx
│ └─ Footer.tsx
└─ public
├─ images
│ ├─ hero‑background.jpg
│ ├─ logo‑full.svg
│ └─ client‑logos/*.svg
└─ favicon.ico

css
Copy

---

## 3  Brand‑First Design Tokens  
Add these CSS custom properties in **`globals.css`** so Copilot can reference them:

```css
:root {
  --np-blue-600: #00457C;   /* primary */
  --np-blue-500: #0A6CBD;
  --np-orange-400: #F8991F; /* accent */
  --np-gray-900: #1A1A1A;   /* text */
  --np-gray-100: #F6F8FA;   /* background */
  --font-sans: 'Open Sans', ui-sans-serif, system-ui;
  --font-serif: 'Lora', ui-serif, Georgia;
}
Typography

Headlines → font-serif (Lora, weight 700)

Body / UI → font-sans (Open Sans, weight 400/600)

4  Section‑by‑Section Build Notes
Copilot prompts (in italics) show what to type in the IDE to invoke the right patterns.

4.1 Navbar.tsx
Sticky, semi‑transparent background that solidifies on scroll.

Logo left, nav items (“About,” “Solutions,” “Industries,” “Insights,” “Contact”) right.

On mobile: hamburger → slide‑in drawer.

“Copilot, create a responsive Tailwind navbar with scroll‑aware opacity and smooth mobile drawer.”

4.2 Hero.tsx
Element	Spec
Background	hero‑background.jpg with dark gradient overlay
H1	“Unlock Agile, Data‑Driven Excellence.” (use font-serif)
Sub‑copy	One concise sentence: “NorthPath Strategies combines AI‑powered analytics and seasoned expertise to realign organizations for peak performance.”
CTA buttons	Schedule a Demo (primary) & Explore Solutions (ghost)

“Copilot, build a full‑viewport hero section with gradient overlay, two CTA buttons, and smooth scroll anchor to #about.”

4.3 About.tsx (id="about")
Two‑column grid: text left, illustrative SVG right.

Bullet list of differentiators—Dynamic Span‑of‑Control Heuristic, Monte‑Carlo Cultural Resilience Factor, License Efficiency Index.

4.4 Services.tsx
Card grid (3‑up on desktop, stack on mobile):

Title	Icon	Blurb
Realignment Diagnostic	AdjustmentsHorizontal	Rapid 360° assessment of roles & spend.
Scenario Builder	Puzzle	Simulate unlimited org charts & cost outcomes.
Implementation Coaching	Rocket	90‑day sprints to hard‑wire the change.

4.5 StatsBanner.tsx
Strip with large counters animated on scroll:

$1B+ spend modeled

250k employees optimized

97 % client satisfaction

Add Tailwind animation: data-count attribute + Intersection Observer.

4.6 Testimonials.tsx
Slider with three client quotes (dummy data OK).
Cards use accent --np-orange-400 for quote mark backdrop.

4.7 CallToAction.tsx
Full‑width, contrasting band:
“Harness NorthPath’s proprietary algorithms today.” → CTA Start Your Assessment.

4.8 Footer.tsx
Left column: logo, brief mission.

Middle: quick‑links.

Right: social icons (LinkedIn, X/Twitter).

Small print: © 2025 NorthPath Strategies. All rights reserved. Privacy | Terms.

5  Accessibility & SEO Must‑Haves
Use next/image with alt text.

All interactive elements must be focus‑visible.

Add <meta> tags in layout.tsx: title, description, og:*, canonical.

Lighthouse target scores ≥ 95 across the board.

6  Responsive & Browser Testing
Copilot should generate unit tests with @testing-library/react that:

Assert nav collapses < 768 px.

Verify CTA buttons fire router.push.

Snapshot test hero accessibility tree.

7  Deployment Hook
When main updates, GitHub Action runs:
name: Deploy‑Homepage
on:
  push:
    paths:
      - "src/**"
      - "public/**"
      - "pnpm-lock.yaml"
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 9 }
      - run: pnpm i --frozen-lockfile
      - run: pnpm run build
      - run: fly deploy --remote-only
name: Deploy‑Homepage
on:
  push:
    paths:
      - "src/**"
      - "public/**"
      - "pnpm-lock.yaml"
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 9 }
      - run: pnpm i --frozen-lockfile
      - run: pnpm run build
      - run: fly deploy --remote-only
      8  Kick‑off Checklist
 Fonts imported in layout.tsx.

 Tailwind config extends NorthPath palette.

 Placeholder images replaced with final assets.

 Meta tags & OG images generated.

 Run pnpm run lint && pnpm run test.