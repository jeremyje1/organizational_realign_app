<!-- ==================================================================== -->
# NorthPath Strategies  
## Realignment & Org‑Structure Optimization Suite  
> **Confidential • Proprietary • Patent Pending**  
> Release v4 – July 2025  
<!-- ==================================================================== -->

### Contents
1. Purpose & Scope  
2. Package Options & Pricing  
3. Security, IP & Patent Notice  
4. Technical Stack & Deployment Snapshot  
5. Universal Data Upload Requirements  
6. Algorithm‑Specific Parameters  
7. Expanded Diagnostic Questionnaire (All Institution Types)  
8. Vertical‑Specific Modules (Comprehensive)  
9. Upload Code Reference  
10. Implementation & Next Steps  

---

## 1  Purpose & Scope
This document is the master **data‑collection instrument** and **implementation blueprint** for the NorthPath proprietary org‑optimization engine—anchored in the **Dynamic Span‑of‑Control Heuristic (DSCH)**, **Monte‑Carlo Cultural Resilience Factor (CRF)**, and **License Efficiency Index (LEI)**.  
Outputs include re‑org scenarios, cost‑savings projections, cultural‑risk scores, and licensing‑efficiency diagnostics.

---

## 2  Package Options & Pricing

| Package | Price | Institution Size* | Deliverables | Highlights |
|---------|------:|------------------|--------------|------------|
| **Basic Diagnostic** | **\$1 ,999** | ≤ 500 FTE / ≤ 2 sites | • Sections 1‑8 questionnaire<br>• One DSCH scenario<br>• 12‑page PDF brief<br>• 30‑min results call | Rapid insights |
| **Comprehensive** | **\$3 ,999** | 501‑2 ,999 FTE / ≤ 5 sites | Basic **plus**<br>• Two additional scenarios<br>• Interactive Power BI dashboard<br>• ½‑day virtual workshop<br>• 90‑day e‑mail support | Scenario depth |
| **Enterprise** | **\$8 ,999** | ≥ 3 ,000 FTE or multi‑system | Comprehensive **plus**<br>• Unlimited scenarios (6 mos.)<br>• API access to scenario‑builder<br>• Custom cultural weighting<br>• On‑site workshop (1 day)<br>• Board‑ready slide deck | Full integration |

\*Headcount is guidance; select the tier that matches desired analytic depth.

---

## 3  Security, IP & Patent Notice
All content, code, and methods herein are trade secrets of **NorthPath Strategies**.  
DSCH, CRF, and LEI are covered by U.S. provisional patent **US 63/XXX,XXX** (filed 2025‑06‑30).  
Data are stored under the controls in **SECURITY.md** (SOC 2‑aligned, field‑level AES‑256, S3 object lock).  
Reverse‑engineering, redistribution, or derivative use is forbidden without written consent.

---

## 4  Technical Stack & Deployment Snapshot
| Layer | Technology | Key Rationale |
|-------|------------|---------------|
| Front‑end | **Next.js 14 (RSC)** | Streaming UI, SEO |
| Auth & DB | **Supabase + Postgres 15** | Row‑level security, JSONB |
| ORM | Prisma | Type‑safe, migrations |
| AI Core | OpenAI o3 (serverless fn) | Low‑latency |
| Analytics | Power BI Embedded | Secure share |
| Infra | Terraform → Fly.io | Blue‑green deploy |
| CI/CD | GitHub Actions | Push‑to‑prod |

---

## 5  Universal Data Upload Requirements
| Code | File (template in `/templates`) | Columns / Sheets | Purpose |
|------|---------------------------------|-----------------|---------|
| **U‑01** | `org_units.csv` | `Unit_ID, Parent_ID, Name, Type, Location` | Org hierarchy |
| **U‑02** | `positions.csv` | `Position_ID, Unit_ID, Title, FTE, Salary, Benefits_% , Vacant_YN` | Cost & redundancy |
| **U‑03** | `people.csv` | `Person_ID, Position_ID, Supervisor_ID, Hire_Date, Remote_YN` | Span & layers |
| **U‑04** | `systems_inventory.xlsx` | Sheets: `Applications`, `Licenses`, `Integrations` | LEI |
| **U‑05** | Strategic plan / charter (PDF) | — | Constraints |
| **U‑06** | BPMN diagrams (ZIP, optional) | — | Process mining |
| **U‑07** | Data‑governance policy (PDF, optional) | — | Privacy gating |

---

## 6  Algorithm‑Specific Parameters
| ID | Prompt | Notes |
|----|--------|-------|
| **P‑1** | Target max span‑of‑control (int) | 0 = no cap |
| **P‑2** | 3‑yr cost‑saving target (%) | Decimal OK |
| **P‑3** | Reorg risk tolerance | Conservative / Balanced / Aggressive |
| **P‑4** | Immutable units/roles | Comma‑separated IDs |
| **P‑5** | Additional success metrics | e.g., NPS, HCAHPS |

---

## 7  Expanded Diagnostic Questionnaire (Universal)

> **Complete once**—applies to every institution.

### 1  Organizational Structure & Role Alignment  
1.1 List departments present at every site and flag overlaps.  
1.2 Rate (1‑5) clarity between central vs. local responsibilities.  
1.3 **Upload U‑01** with duplicates highlighted.  
1.4 Average management layers CEO → front‑line.  
1.5 Decision rights that *must* remain per layer.  
1.6 Rate (1‑5) JD accuracy vs. actual duties.  
1.7 Key‑person dependency risks (open).  
1.8 Numeric: % roles fully remote.  
1.9 Open: Succession plans for critical roles.  

### 2  Decision‑Making & Governance  
2.1 Rate (1‑5) speed of major policy changes.  
2.2 Select‑all approval bodies for new initiatives.  
2.3 Describe a stalled decision; list layers.  
2.4 Financial/opportunity cost of longest delay FY‑24.  
2.5 Avg. approvers for capex > \$100 k.  
2.6 Rate (1‑5) delegation‑of‑authority matrix clarity.  
2.7 Open: Use of RACI or RAPID frameworks?  
2.8 Numeric: Median days from proposal to approval.  

### 3  Process & Workflow Efficiency  
3.1 Map onboarding/admission/order‑to‑cash key steps.  
3.2 Rate (1‑5) quality of process docs.  
3.3 List manual data re‑entry tasks > 1×/day.  
3.4 Workflow variations across sites & reasons.  
3.5 **Upload U‑06** if available.  
3.6 Cycle‑time variance best vs. worst site (%).  
3.7 Open: Top three pain points reported by staff.  

### 4  Technology & AI Readiness  
4.1 Select‑all major systems in use.  
4.2 Rate (1‑5) system interoperability.  
4.3 Three tasks ripe for gen‑AI.  
4.4 Rate (1‑5) openness to AI co‑pilot vs. full automation.  
4.5 Datasets off‑limits to external models.  
4.6 % software spend on overlapping tools.  
4.7 Open: Shadow‑IT applications discovered last audit.  

### 5  Procurement & Spend  
5.1 Count overlapping software contracts.  
5.2 Rate (1‑5) central procurement effectiveness.  
5.3 **Upload U‑04**.  
5.4 % spend under consolidation opportunity.  
5.5 Top three vendor lock‑in risks.  
5.6 Numeric: Average contract cycle time (days).  

### 6  Communication & Collaboration  
6.1 Rate (1‑5) comms effectiveness.  
6.2 Describe miscommunication incident & impact.  
6.3 Rate (1‑5) OKR/KPI transparency.  
6.4 Shadow channels in use.  
6.5 Numeric: % workforce active on sanctioned collab platform.  

### 7  Leadership & Culture  
7.1 Rate (1‑5) data‑driven leadership.  
7.2 Describe resistance to change.  
7.3 Incentives aligning/competing with efficiency.  
7.4 Leadership turnover % (24 mos).  
7.5 Rate (1‑5) psychological safety.  
7.6 Open: Diversity & inclusion considerations in re‑org.  

### 8  Data & Metrics  
8.1 List KPIs at exec vs. unit level.  
8.2 Rate (1‑5) data‑literacy support.  
8.3 **Upload U‑07** (optional).  
8.4 % decisions based on dashboards.  
8.5 Data gaps hindering predictive analytics.  
8.6 Numeric: Average data refresh latency (hours).  

### 9  Financial Health & ROI  
9.1 Upload last 3 audited financials.  
9.2 Operating margin %.  
9.3 Rate (1‑5) cost‑allocation confidence.  
9.4 Planned capital projects & funding.  
9.5 Numeric: Debt‑service coverage ratio.  

### 10  Change Management & Readiness  
10.1 Rate (1‑5) maturity on ADKAR (or similar).  
10.2 % workforce unionized.  
10.3 Past transformation initiatives & outcomes.  
10.4 Rate (1‑5) leadership capacity to sponsor change.  
10.5 Open: Communication strategy for re‑org roll‑out.  

### 11  Risk & Compliance  
11.1 List top regulators.  
11.2 Number of findings last audit.  
11.3 Critical risks to re‑org timeline.  
11.4 Rate (1‑5) ERM effectiveness.  
11.5 Open: Data‑privacy or labor agreements restricting changes.  

---

## 8  Vertical‑Specific Modules

> Complete the module that matches your organization *in addition* to Sections 1‑11.  
> Each module has **10 prompts** and, where noted, dedicated uploads (*VX‑UY*).

### A. Community Colleges  
**CC‑Q1** Numeric: Number of unique course prefixes district‑wide.  
**CC‑Q2** Open: Dual‑credit staffing model; double‑funding risks.  
**CC‑Q3** Numeric: % courses taught by adjuncts last AY.  
**CC‑Q4** Rate (1‑5): Effectiveness of guided‑pathways model.  
**CC‑Q5** Open: Completion barriers unique to adult learners.  
**CC‑Q6** Numeric: Average student‑advisor ratio.  
**CC‑Q7** Select‑all LMS plugins in use.  
**CC‑Q8** Upload **CC‑U1** `dual_credit_mous.pdf` (MOUs with ISDs).  
**CC‑Q9** Open: Shared‑service centers (IT, HR) success metrics.  
**CC‑Q10** Numeric: Annual state performance‑funding dollars at risk.  

### B. Trade & Technical Schools  
**TS‑Q1** Numeric: Machine‑to‑student ratio per lab.  
**TS‑Q2** Open: Credentialing bodies & duplicate reports.  
**TS‑Q3** Numeric: Placement rate within 90 days post‑grad.  
**TS‑Q4** Rate (1‑5): Industry‑advisory board engagement.  
**TS‑Q5** Upload **TS‑U1** `lab_equipment_inventory.csv`.  
**TS‑Q6** Open: Safety incident reporting workflow.  
**TS‑Q7** Numeric: Apprenticeship employer partners.  
**TS‑Q8** Rate (1‑5): Digital badging adoption.  
**TS‑Q9** Open: Barriers to scaling simulator technologies.  
**TS‑Q10** Numeric: Average tool‑utilization % (runtime vs. capacity).  

### C. Hospitals & Healthcare Systems  
**HC‑Q1** Numeric: Bed‑utilization % by facility (12 mo avg).  
**HC‑Q2** Open: Departments with separate P&Ls in same facility.  
**HC‑Q3** Numeric: Average nurse‑to‑patient ratio by unit.  
**HC‑Q4** Rate (1‑5): Success of value‑based‑care contracts.  
**HC‑Q5** Upload **HC‑U1** `quality_scores.xlsx` (HAC, readmit).  
**HC‑Q6** Open: AI use in diagnostics (e.g., radiology triage).  
**HC‑Q7** Numeric: % clinicians using ambient scribing tools.  
**HC‑Q8** Rate (1‑5): EMR workflow optimization satisfaction.  
**HC‑Q9** Open: Plans for hospital‑at‑home programs.  
**HC‑Q10** Numeric: FY‑24 locum tenens spend.  

### D. Public Universities  
**PU‑Q1** Numeric: Overhead recovery rate (F&A %).  
**PU‑Q2** Open: Separately accredited entities.  
**PU‑Q3** Numeric: Average time grant routed PI → submission (days).  
**PU‑Q4** Upload **PU‑U1** `research_admin_orgchart.pdf`.  
**PU‑Q5** Rate (1‑5): Shared‑governance satisfaction.  
**PU‑Q6** Open: Duplicate student‑success initiatives across colleges.  
**PU‑Q7** Numeric: Student services budget per FTE.  
**PU‑Q8** Rate (1‑5): Early‑alert system efficacy.  
**PU‑Q9** Open: Barriers to cross‑college interdisciplinary programs.  
**PU‑Q10** Numeric: Annual deferred maintenance backlog (\$).  

### E. Private Universities  
**PR‑Q1** Numeric: Endowment draw % allocated to ops.  
**PR‑Q2** Open: Donor‑restricted positions limiting flexibility.  
**PR‑Q3** Numeric: Aid discount rate (last FY).  
**PR‑Q4** Rate (1‑5): Effectiveness of advancement CRM.  
**PR‑Q5** Upload **PR‑U1** `gift_acceptance_policy.pdf`.  
**PR‑Q6** Open: Impact of donor influence on academic decision‑making.  
**PR‑Q7** Numeric: Net‑tuition revenue 5‑yr CAGR %.  
**PR‑Q8** Rate (1‑5): Alumni‑engagement platform ROI.  
**PR‑Q9** Open: Plans for scaling online graduate programs.  
**PR‑Q10** Numeric: Investment per FTE in instructional tech last FY.  

### F. Nonprofits  
**NP‑Q1** Numeric: % budget from multi‑year unrestricted gifts.  
**NP‑Q2** Open: Funder mandates dictating staffing ratios.  
**NP‑Q3** Numeric: Program vs. admin cost ratio.  
**NP‑Q4** Rate (1‑5): Logic‑model usage across programs.  
**NP‑Q5** Upload **NP‑U1** `latest_form_990.pdf`.  
**NP‑Q6** Open: Volunteer management challenges.  
**NP‑Q7** Numeric: Staff turnover % last 12 mos.  
**NP‑Q8** Rate (1‑5): Data quality in outcome tracking.  
**NP‑Q9** Open: Partnerships causing mission drift.  
**NP‑Q10** Numeric: Funding diversification index (Herfindahl).  

### G. Government Agencies  
**GA‑Q1** Numeric: Workforce eligible for retirement in 5 yrs %.  
**GA‑Q2** Open: Statutory caps on personnel moves.  
**GA‑Q3** Numeric: Citizen‑facing services fully digital %.  
**GA‑Q4** Rate (1‑5): Inter‑agency data‑sharing maturity.  
**GA‑Q5** Upload **GA‑U1** `it_contracts.csv`.  
**GA‑Q6** Open: Impact of budget cycle on hiring decisions.  
**GA‑Q7** Numeric: Average permit turnaround days.  
**GA‑Q8** Rate (1‑5): Success of performance management (GPRA).  
**GA‑Q9** Open: Cross‑agency program redundancies.  
**GA‑Q10** Numeric: Volume of FOIA requests last FY.  

### H. Companies & Businesses  
**CB‑Q1** Numeric: Revenue per FTE (3 yrs).  
**CB‑Q2** Open: Gross‑margin erosion triggers for re‑org.  
**CB‑Q3** Numeric: Avg. product‑development cycle time (days).  
**CB‑Q4** Rate (1‑5): Effectiveness of agile ceremonies.  
**CB‑Q5** Upload **CB‑U1** `vendor_spend_qtr.csv`.  
**CB‑Q6** Open: Silo‑breaking initiatives & results.  
**CB‑Q7** Numeric: % workforce in customer‑facing roles.  
**CB‑Q8** Rate (1‑5): Forecast accuracy (last 4 qtrs).  
**CB‑Q9** Open: Digital‑transformation budget and ROI targets.  
**CB‑Q10** Numeric: ESG compliance costs as % revenue.  

---

## 9  Upload Code Reference
U‑01 org_units.csv (required)
U‑02 positions.csv (required)
U‑03 people.csv (required)
U‑04 systems_inventory.xlsx (required)
U‑05 strategic_plan.pdf (required)
U‑06 bpmn_diagrams.zip (optional)
U‑07 data_governance.pdf (optional)
CC‑U1 dual_credit_mous.pdf (community colleges)
TS‑U1 lab_equipment_inventory.csv (trade & tech)
HC‑U1 quality_scores.xlsx (healthcare)
PU‑U1 research_admin_orgchart.pdf (public univ.)
PR‑U1 gift_acceptance_policy.pdf (private univ.)
NP‑U1 latest_form_990.pdf (nonprofits)
GA‑U1 it_contracts.csv (government)
CB‑U1 vendor_spend_qtr.csv (companies)

---

## 10  Implementation & Next Steps
1. **Clone repo**, run `npm i`, then `npm run onboarding` (auto‑generates forms from Markdown headings).  
2. **Validate uploads** via `validateUploads()` (see **INTEGRATION_GUIDE.md**).  
3. **Submit**; pipeline writes to schema in **DATA_MODEL.md** and triggers DSCH → CRF → LEI workflows.  
4. **Receive deliverables** per package SLA (Basic 5 days; Comprehensive 10; Enterprise custom).  
5. **Schedule** read‑out/workshop via Calendly link sent automatically.

*Thank you for choosing **NorthPath Strategies** to unlock agile, data‑driven organizational excellence.*
