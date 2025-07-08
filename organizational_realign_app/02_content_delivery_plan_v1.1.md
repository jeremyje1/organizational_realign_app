# Collateral & Content Delivery Decision Matrix  
### Where each asset should live & why

| Asset | Format | Delivery Channel | Rationale |
|-------|--------|------------------|-----------|
| **Process Guide** | PDF *(auto‑generated)* | Link in Assessment wizard (“How this works”) and Resources page | Long‑form, printable; executives like shareable PDFs. |
| **Interpreting Results Guide** | Web page + optional PDF download | Auto‑shown after results; PDF link emailed | Interactive charts need live rendering, but finance teams may archive the PDF. |
| **Sample Full Diagnostic Report** | PDF only | Pricing page “See a sample report” CTA | Premium feel; aligns with enterprise expectations. |
| **Best‑Practice Data‑Gathering Checklist** | In‑wizard sidebar + PDF | Appears on Org‑Profile step; PDF sent in welcome email | Users need it while completing the survey and later for reference. |
| **Algorithm Methodology White‑Paper** | Web page (SEO) | Footer link “Methodology” | Improves transparency, backlinks, and trust. |
| **Case Studies** | Web page cards → modal PDF | Resources page | Quick scan online; download for board packets. |

> **Implementation Note**  
> Use `/pages/api/pdf/[doc].ts` to generate each PDF on demand with `@react-pdf/renderer`; template MDX lives under `/content/pdf/`.

