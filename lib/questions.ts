// lib/questions.ts
export type Question = {
  id: string;
  prompt: string;
  type: "text" | "number" | "select" | "file";
  /** Optional list of <option, label> for selects */
  options?: { value: string; label: string }[];
  /** If present, the question displays only when this returns true */
  showWhen?: (sector: string) => boolean;
  required?: boolean;
};

export type Pillar = {
  id: string;
  label: string;
  questions: Question[];
};

/** Helper for higher-ed‐only questions */
const isHigherEd = (sector: string) => sector === "higher-ed";

/** Master questionnaire */
export const questionnaire: Pillar[] = [
  {
    id: "mission",
    label: "Mission & Strategy",
    questions: [
      {
        id: "missionAlignment",
        prompt: "How does student-success show up in your current strategic plan?",
        type: "text",
        required: true,
      },
    ],
  },
  {
    id: "academic",
    label: "Academic Affairs / Instruction",
    questions: [
      {
        id: "overlap",
        prompt:
          "Which instructional units have overlapping curricula or competition?",
        type: "text",
        showWhen: isHigherEd, // only ask higher-ed clients
      },
      {
        id: "adjunctRatio",
        prompt: "Full-time vs adjunct faculty ratio (approximate % adjunct)?",
        type: "number",
        showWhen: isHigherEd,
      },
    ],
  },
  {
    id: "studentAffairs",
    label: "Student Affairs / Services",
    questions: [
      {
        id: "painPoints",
        prompt:
          "List the top three student-services pain points (e.g., wait times, duplication).",
        type: "text",
        showWhen: isHigherEd,
      },
      {
        id: "equityCenters",
        prompt: "Do you operate equity / accessibility centers on campus?",
        type: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        showWhen: isHigherEd,
      },
    ],
  },
  {
    id: "budget",
    label: "Budget & Finance",
    questions: [
      {
        id: "budgetUpload",
        prompt:
          "Upload your latest divisional budget worksheet (or provide headline numbers).",
        type: "file",
        required: false,
      },
      {
        id: "deficit",
        prompt: "Projected budget deficit (USD, if any) for next fiscal year?",
        type: "number",
      },
    ],
  },
  {
    id: "facilities",
    label: "Facilities & Operations",
    questions: [
      {
        id: "utilization",
        prompt:
          "What % of classroom or office space is ≤ 60 % utilized during peak hours?",
        type: "number",
        showWhen: isHigherEd,
      },
      {
        id: "capitalProjects",
        prompt:
          "List major capital projects currently in flight (name, $ size, completion year).",
        type: "text",
      },
    ],
  },
  {
    id: "people",
    label: "HR / People & Collective Bargaining",
    questions: [
      {
        id: "unions",
        prompt:
          "Which collective-bargaining units represent employees in the affected areas?",
        type: "text",
      },
      {
        id: "vacancyRate",
        prompt: "Current vacancy rate for positions in scope (%).",
        type: "number",
      },
    ],
  },
  {
    id: "tech",
    label: "Technology & Data",
    questions: [
      {
        id: "shadowSystems",
        prompt:
          "Which units maintain their own shadow databases or spreadsheets to track work?",
        type: "text",
      },
    ],
  },
  {
    id: "culture",
    label: "Culture & Change Readiness",
    questions: [
      {
        id: "changeScore",
        prompt:
          "On a scale of 1–5, rate staff willingness to adopt new org structures.",
        type: "number",
        required: true,
      },
    ],
  },
  {
    id: "governance",
    label: "Processes & Governance",
    questions: [
      {
        id: "workflowStall",
        prompt:
          "Which cross-unit workflows routinely stall and why? (Brief bullets are fine.)",
        type: "text",
      },
    ],
  },
];

/** Map of pillar label → its question list.
 *  Useful for the wizard so we can iterate steps dynamically.
 */
export const questionsByPillar: Record<string, Question[]> = questionnaire.reduce(
  (acc, pillar) => {
    acc[pillar.label] = pillar.questions;
    return acc;
  },
  {} as Record<string, Question[]>
);
