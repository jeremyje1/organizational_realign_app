
// --------------------------------------------------------------------------------------
// DO NOT MODIFY THIS FILE WITHOUT APPROVAL
// This file contains the finalized NorthPath assessment question bank.
// If updates are required, consult the lead systems strategist before committing changes.
// --------------------------------------------------------------------------------------


export type Question = {
  id: string;
  text: string;
  area: string;
  type: "likert" | "select" | "multi-select" | "number" | "text";
  options?: string[];
  conditional?: { dependsOn: string; value: string };
};

export const questions: Question[] = [
  // Institutional Overview
  {
    id: "inst-1",
    text: "What is your institution type?",
    area: "Institutional Overview",
    type: "select",
    options: ["Community College", "Regional University", "Flagship", "Private Non-profit"],
  },
  {
    id: "inst-2",
    text: "Number of physical campuses?",
    area: "Institutional Overview",
    type: "number",
  },
  {
    id: "inst-3",
    text: "Do campuses currently share centralized admin services?",
    area: "Institutional Overview",
    type: "select",
    options: ["Yes", "Partial", "No"],
  },
  {
    id: "inst-4",
    text: "Annual operating budget (USD)?",
    area: "Institutional Overview",
    type: "number",
  },
  {
    id: "inst-5",
    text: "Current enterprise systems used:",
    area: "Institutional Overview",
    type: "multi-select",
    options: ["ERP", "SIS", "CRM", "LMS", "HCM", "Other"],
  },

  // Governance & Leadership
  {
    id: "gov-1",
    text: "Is there a written decision-matrix delineating authority across divisions?",
    area: "Governance & Leadership",
    type: "likert",
  },
  {
    id: "gov-2",
    text: "Frequency of cabinet-level strategic reviews per year?",
    area: "Governance & Leadership",
    type: "number",
  },
  {
    id: "gov-3",
    text: "Overlap in reporting lines detected in org chart?",
    area: "Governance & Leadership",
    type: "select",
    options: ["None", "Some", "Significant"],
  },

  // Academic Affairs
  {
    id: "acad-1",
    text: "Number of distinct academic divisions/colleges?",
    area: "Academic Affairs",
    type: "number",
  },
  {
    id: "acad-2",
    text: "Percentage of courses with fewer than 10 enrolled students?",
    area: "Academic Affairs",
    type: "number",
  },
  {
    id: "acad-3",
    text: "Does the institution share course shells across campuses?",
    area: "Academic Affairs",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "acad-4",
    text: "Average faculty course load variance across departments?",
    area: "Academic Affairs",
    type: "number",
  },
  // Student Services & Success
  {
    id: "ss-1",
    text: "Is advising decentralized by college?",
    area: "Student Services & Success",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "ss-2",
    text: "Student-to-advisor ratio?",
    area: "Student Services & Success",
    type: "number",
  },
  {
    id: "ss-3",
    text: "AI chatbots currently deployed for tier-1 FAQs?",
    area: "Student Services & Success",
    type: "select",
    options: ["Yes", "No", "Planned"],
  },

  // Enrollment Management & Admissions
  {
    id: "enroll-1",
    text: "What is your annual enrollment target?",
    area: "Enrollment Management & Admissions",
    type: "number",
  },
  {
    id: "enroll-2",
    text: "Is application processing centralized or decentralized?",
    area: "Enrollment Management & Admissions",
    type: "select",
    options: ["Centralized", "Decentralized"],
  },
  {
    id: "enroll-3",
    text: "Do you use AI tools for lead scoring or outreach?",
    area: "Enrollment Management & Admissions",
    type: "select",
    options: ["Yes", "No", "Planned"],
  },

  // Finance & Budget
  {
    id: "fin-1",
    text: "Are budget owners trained in zero-based budgeting?",
    area: "Finance & Budget",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "fin-2",
    text: "Procurement spend duplicated across independent cost centers?",
    area: "Finance & Budget",
    type: "select",
    options: ["Never", "Rarely", "Sometimes", "Often"],
  },
  {
    id: "fin-3",
    text: "Does your institution participate in any shared services consortia for purchasing?",
    area: "Finance & Budget",
    type: "select",
    options: ["Yes", "No"],
  },
  // Human Resources & Talent
  {
    id: "hr-1",
    text: "Does your institution use a centralized applicant tracking system?",
    area: "Human Resources & Talent",
    type: "select",
    options: ["Yes", "No", "Planned"],
  },
  {
    id: "hr-2",
    text: "Average time-to-fill for open staff roles (in days)?",
    area: "Human Resources & Talent",
    type: "number",
  },
  {
    id: "hr-3",
    text: "Percent of performance reviews completed on time?",
    area: "Human Resources & Talent",
    type: "number",
  },

  // Information Technology & Digital Infrastructure
  {
    id: "it-1",
    text: "Percent of key systems migrated to cloud/SaaS?",
    area: "Information Technology & Digital Infrastructure",
    type: "number",
  },
  {
    id: "it-2",
    text: "Average help-desk resolution time (in hours)?",
    area: "Information Technology & Digital Infrastructure",
    type: "number",
  },
  {
    id: "it-3",
    text: "Is RPA/AI used for transcript evaluation?",
    area: "Information Technology & Digital Infrastructure",
    type: "select",
    options: ["Yes", "No", "Planned"],
  },

  // Facilities & Operations
  {
    id: "fac-1",
    text: "Total gross square footage managed by facilities staff?",
    area: "Facilities & Operations",
    type: "number",
  },
  {
    id: "fac-2",
    text: "Do multiple campuses share maintenance or security contracts?",
    area: "Facilities & Operations",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "fac-3",
    text: "Energy cost per square foot (annual average in USD)?",
    area: "Facilities & Operations",
    type: "number",
  },
  // Marketing, Communications & Advancement
  {
    id: "mkt-1",
    text: "Number of full-time staff supporting marketing and communications?",
    area: "Marketing, Communications & Advancement",
    type: "number",
  },
  {
    id: "mkt-2",
    text: "Are advancement/alumni engagement tools integrated with CRM?",
    area: "Marketing, Communications & Advancement",
    type: "select",
    options: ["Yes", "No", "Partially"],
  },
  {
    id: "mkt-3",
    text: "Percent of marketing budget allocated to digital advertising?",
    area: "Marketing, Communications & Advancement",
    type: "number",
  },

  // Institutional Research & Data Analytics
  {
    id: "ir-1",
    text: "Does your institution have a dedicated IR team?",
    area: "Institutional Research & Data Analytics",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "ir-2",
    text: "How frequently are key performance indicators (KPIs) reviewed by leadership?",
    area: "Institutional Research & Data Analytics",
    type: "select",
    options: ["Monthly", "Quarterly", "Annually", "As needed"],
  },
  {
    id: "ir-3",
    text: "Is there a centralized data warehouse supporting cross-functional reporting?",
    area: "Institutional Research & Data Analytics",
    type: "select",
    options: ["Yes", "No", "In Progress"],
  },

  // Compliance & Risk Management
  {
    id: "comp-1",
    text: "How often is FERPA training completed by faculty/staff?",
    area: "Compliance & Risk Management",
    type: "select",
    options: ["Annually", "Every two years", "Not required"],
  },
  {
    id: "comp-2",
    text: "Does the institution have a formal risk register?",
    area: "Compliance & Risk Management",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "comp-3",
    text: "Have there been any recent data privacy incidents?",
    area: "Compliance & Risk Management",
    type: "select",
    options: ["Yes", "No"],
  },
];