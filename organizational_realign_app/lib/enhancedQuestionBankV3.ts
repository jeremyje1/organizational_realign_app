/**
 * Enhanced Question Bank v3.0 - 100+ Questions Per Tier + AI Opportunity Assessment
 * Comprehensive organizational assessment meeting website promises
 * Contextualized for different organization types with AI automation evaluation
 */

export type QuestionType = 'likert' | 'numeric' | 'text' | 'upload';
export type OrganizationType = 'higher-education' | 'healthcare' | 'nonprofit' | 'corporate' | 'government';

export interface ValidationRules {
  min?: number;
  max?: number;
  pattern?: string;
  required?: boolean;
}

export interface Question {
  id: string;
  section: string;
  prompt: string;
  type: QuestionType;
  organizationTypes?: OrganizationType[];
  required?: boolean;
  helpText?: string;
  validationRules?: ValidationRules;
  tierMinimum?: 'one-time-diagnostic' | 'monthly-subscription' | 'comprehensive-package' | 'enterprise-transformation';
  tags?: string[];
}

/**
 * CORE QUESTIONS - Available across ALL tiers (100+ questions for One-Time Diagnostic)
 * Enhanced with AI opportunity assessment and automation potential evaluation
 */
export const CORE_QUESTIONS: Question[] = [
  // === GOVERNANCE & LEADERSHIP (20 questions) ===
  {
    id: "GL_01",
    section: "Governance & Leadership",
    prompt: "Our current organizational chart is less than 12 months old and accurately reflects reporting lines.",
    type: "likert",
    required: true,
    helpText: "Current organizational charts are essential for accurate structural analysis and optimization recommendations."
  },
  {
    id: "GL_02",
    section: "Governance & Leadership",
    prompt: "Decision-making authority is clearly defined and understood at each organizational level.",
    type: "likert",
    required: true
  },
  {
    id: "GL_03",
    section: "Governance & Leadership",
    prompt: "How many direct reports does your CEO/President currently manage?",
    type: "numeric",
    required: true,
    validationRules: { min: 1, max: 50 }
  },
  {
    id: "GL_04",
    section: "Governance & Leadership",
    prompt: "Our leadership team regularly communicates strategic priorities to all staff levels.",
    type: "likert",
    required: true
  },
  {
    id: "GL_05",
    section: "Governance & Leadership",
    prompt: "Strategic planning sessions occur on a predictable schedule with broad input.",
    type: "likert"
  },
  {
    id: "GL_06",
    section: "Governance & Leadership",
    prompt: "What percentage of leadership positions are currently vacant or filled by interim appointments?",
    type: "numeric",
    validationRules: { min: 0, max: 100 }
  },
  {
    id: "GL_07",
    section: "Governance & Leadership",
    prompt: "Board/governing body meetings are productive and focused on strategic issues.",
    type: "likert"
  },
  {
    id: "GL_08",
    section: "Governance & Leadership",
    prompt: "Describe your organization's biggest leadership challenge in the next 12 months.",
    type: "text",
    required: true,
    validationRules: { min: 50 }
  },
  {
    id: "GL_09",
    section: "Governance & Leadership",
    prompt: "Our succession planning process is documented and regularly updated.",
    type: "likert"
  },
  {
    id: "GL_10",
    section: "Governance & Leadership",
    prompt: "How many months in advance does your organization typically plan major strategic initiatives?",
    type: "numeric",
    validationRules: { min: 0, max: 60 }
  },
  {
    id: "GL_11",
    section: "Governance & Leadership",
    prompt: "Leadership decisions are communicated transparently across the organization.",
    type: "likert"
  },
  {
    id: "GL_12",
    section: "Governance & Leadership",
    prompt: "Our organization has a clear and current mission statement that guides daily operations.",
    type: "likert",
    required: true
  },
  {
    id: "GL_13",
    section: "Governance & Leadership",
    prompt: "Upload your current organizational chart or leadership structure document.",
    type: "upload",
    helpText: "This helps us understand your current structure for optimization recommendations."
  },
  {
    id: "GL_14",
    section: "Governance & Leadership",
    prompt: "What percentage of your leadership team has been in their current role for less than 2 years?",
    type: "numeric",
    validationRules: { min: 0, max: 100 }
  },
  {
    id: "GL_15",
    section: "Governance & Leadership",
    prompt: "Our organization regularly conducts leadership effectiveness assessments.",
    type: "likert"
  },
  {
    id: "GL_16",
    section: "Governance & Leadership",
    prompt: "Describe your organization's approach to change management and communication.",
    type: "text",
    validationRules: { min: 50 }
  },
  {
    id: "GL_17",
    section: "Governance & Leadership",
    prompt: "Cross-departmental collaboration is actively encouraged and supported by leadership.",
    type: "likert"
  },
  {
    id: "GL_18",
    section: "Governance & Leadership",
    prompt: "How many organizational restructures has your organization undergone in the past 3 years?",
    type: "numeric",
    validationRules: { min: 0, max: 10 }
  },
  {
    id: "GL_19",
    section: "Governance & Leadership",
    prompt: "Our leadership team has the appropriate mix of internal promotions and external hires.",
    type: "likert"
  },
  {
    id: "GL_20",
    section: "Governance & Leadership",
    prompt: "Strategic goals are translated into specific, measurable objectives at each organizational level.",
    type: "likert"
  },

  // === ADMINISTRATIVE PROCESSES & COMMUNICATION (20 questions) ===
  {
    id: "APC_01",
    section: "Administrative Processes & Communication",
    prompt: "Our communication channels effectively reach all organizational levels without information loss.",
    type: "likert",
    required: true,
    helpText: "Effective communication is critical for organizational alignment and operational efficiency."
  },
  {
    id: "APC_02",
    section: "Administrative Processes & Communication",
    prompt: "How many different communication platforms does your organization currently use?",
    type: "numeric",
    required: true,
    validationRules: { min: 1, max: 20 }
  },
  {
    id: "APC_03",
    section: "Administrative Processes & Communication",
    prompt: "Administrative processes are standardized and documented across departments.",
    type: "likert"
  },
  {
    id: "APC_04",
    section: "Administrative Processes & Communication",
    prompt: "What percentage of routine administrative tasks could potentially be automated?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tags: ["ai-opportunity"]
  },
  {
    id: "APC_05",
    section: "Administrative Processes & Communication",
    prompt: "Staff can easily access the information and resources they need to perform their jobs.",
    type: "likert"
  },
  {
    id: "APC_06",
    section: "Administrative Processes & Communication",
    prompt: "Describe the biggest communication breakdown your organization has experienced recently.",
    type: "text",
    validationRules: { min: 50 }
  },
  {
    id: "APC_07",
    section: "Administrative Processes & Communication",
    prompt: "Our organization uses digital tools effectively for collaboration and project management.",
    type: "likert"
  },
  {
    id: "APC_08",
    section: "Administrative Processes & Communication",
    prompt: "How many hours per week does leadership spend in meetings?",
    type: "numeric",
    validationRules: { min: 0, max: 80 }
  },
  {
    id: "APC_09",
    section: "Administrative Processes & Communication",
    prompt: "Meeting effectiveness is high, with clear agendas and actionable outcomes.",
    type: "likert"
  },
  {
    id: "APC_10",
    section: "Administrative Processes & Communication",
    prompt: "Our document management system allows easy retrieval and version control.",
    type: "likert"
  },
  {
    id: "APC_11",
    section: "Administrative Processes & Communication",
    prompt: "What percentage of your organization's meetings could be replaced with async communication?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tags: ["efficiency", "ai-opportunity"]
  },
  {
    id: "APC_12",
    section: "Administrative Processes & Communication",
    prompt: "Upload your current process documentation or procedure manual.",
    type: "upload",
    helpText: "Process documentation helps identify optimization and automation opportunities."
  },
  {
    id: "APC_13",
    section: "Administrative Processes & Communication",
    prompt: "Staff training on communication tools and processes is adequate and up-to-date.",
    type: "likert"
  },
  {
    id: "APC_14",
    section: "Administrative Processes & Communication",
    prompt: "How many different software systems does your organization use for daily operations?",
    type: "numeric",
    validationRules: { min: 1, max: 50 }
  },
  {
    id: "APC_15",
    section: "Administrative Processes & Communication",
    prompt: "Our internal communication strategy includes feedback mechanisms and response protocols.",
    type: "likert"
  },
  {
    id: "APC_16",
    section: "Administrative Processes & Communication",
    prompt: "Describe your organization's approach to knowledge management and institutional memory.",
    type: "text",
    validationRules: { min: 50 }
  },
  {
    id: "APC_17",
    section: "Administrative Processes & Communication",
    prompt: "Emergency communication protocols are clearly defined and regularly tested.",
    type: "likert"
  },
  {
    id: "APC_18",
    section: "Administrative Processes & Communication",
    prompt: "What percentage of your administrative staff time is spent on manual data entry?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tags: ["ai-opportunity"]
  },
  {
    id: "APC_19",
    section: "Administrative Processes & Communication",
    prompt: "Cross-training exists so that critical processes don't depend on single individuals.",
    type: "likert"
  },
  {
    id: "APC_20",
    section: "Administrative Processes & Communication",
    prompt: "Our organization effectively manages both formal and informal communication networks.",
    type: "likert"
  },

  // === STRUCTURE, CAPACITY & PERFORMANCE (20 questions) ===
  {
    id: "SCP_01",
    section: "Structure, Capacity & Performance",
    prompt: "Our organizational structure supports efficient workflow and minimal bureaucratic delays.",
    type: "likert",
    required: true,
    helpText: "Organizational structure directly impacts efficiency and capacity utilization."
  },
  {
    id: "SCP_02",
    section: "Structure, Capacity & Performance",
    prompt: "What is your organization's current staff turnover rate (annual percentage)?",
    type: "numeric",
    required: true,
    validationRules: { min: 0, max: 100 }
  },
  {
    id: "SCP_03",
    section: "Structure, Capacity & Performance",
    prompt: "Performance metrics are clearly defined and regularly tracked across all departments.",
    type: "likert"
  },
  {
    id: "SCP_04",
    section: "Structure, Capacity & Performance",
    prompt: "How many layers of management exist between front-line staff and executive leadership?",
    type: "numeric",
    validationRules: { min: 1, max: 10 }
  },
  {
    id: "SCP_05",
    section: "Structure, Capacity & Performance",
    prompt: "Our current capacity allows us to handle unexpected increases in demand or workload.",
    type: "likert"
  },
  {
    id: "SCP_06",
    section: "Structure, Capacity & Performance",
    prompt: "Describe your organization's biggest structural challenge or bottleneck.",
    type: "text",
    required: true,
    validationRules: { min: 50 }
  },
  {
    id: "SCP_07",
    section: "Structure, Capacity & Performance",
    prompt: "Job roles and responsibilities are clearly defined with minimal overlap or gaps.",
    type: "likert"
  },
  {
    id: "SCP_08",
    section: "Structure, Capacity & Performance",
    prompt: "What percentage of your staff are currently working at or above capacity?",
    type: "numeric",
    validationRules: { min: 0, max: 100 }
  },
  {
    id: "SCP_09",
    section: "Structure, Capacity & Performance",
    prompt: "Our organization effectively manages seasonal or cyclical variations in workload.",
    type: "likert"
  },
  {
    id: "SCP_10",
    section: "Structure, Capacity & Performance",
    prompt: "Performance review processes provide actionable feedback and development opportunities.",
    type: "likert"
  },
  {
    id: "SCP_11",
    section: "Structure, Capacity & Performance",
    prompt: "How many unfilled positions does your organization currently have?",
    type: "numeric",
    validationRules: { min: 0, max: 500 }
  },
  {
    id: "SCP_12",
    section: "Structure, Capacity & Performance",
    prompt: "Upload your current performance dashboard or key metrics report.",
    type: "upload",
    helpText: "Performance data helps identify capacity optimization opportunities."
  },
  {
    id: "SCP_13",
    section: "Structure, Capacity & Performance",
    prompt: "Our organization has appropriate spans of control (number of direct reports per manager).",
    type: "likert"
  },
  {
    id: "SCP_14",
    section: "Structure, Capacity & Performance",
    prompt: "What percentage of your organization's work could be performed remotely or hybrid?",
    type: "numeric",
    validationRules: { min: 0, max: 100 }
  },
  {
    id: "SCP_15",
    section: "Structure, Capacity & Performance",
    prompt: "Resource allocation decisions are made based on data and strategic priorities.",
    type: "likert"
  },
  {
    id: "SCP_16",
    section: "Structure, Capacity & Performance",
    prompt: "Describe how your organization measures and improves operational efficiency.",
    type: "text",
    validationRules: { min: 50 }
  },
  {
    id: "SCP_17",
    section: "Structure, Capacity & Performance",
    prompt: "Our organizational structure facilitates rather than hinders innovation and change.",
    type: "likert"
  },
  {
    id: "SCP_18",
    section: "Structure, Capacity & Performance",
    prompt: "How many hours per week do staff spend on tasks that could be eliminated or streamlined?",
    type: "numeric",
    validationRules: { min: 0, max: 40 },
    tags: ["efficiency", "ai-opportunity"]
  },
  {
    id: "SCP_19",
    section: "Structure, Capacity & Performance",
    prompt: "Professional development opportunities are aligned with organizational needs and individual growth.",
    type: "likert"
  },
  {
    id: "SCP_20",
    section: "Structure, Capacity & Performance",
    prompt: "Our organization successfully manages competing priorities and resource constraints.",
    type: "likert"
  },

  // === PROFESSIONAL DEVELOPMENT & SUPPORT (15 questions) ===
  {
    id: "PDS_01",
    section: "Professional Development & Support",
    prompt: "Professional development opportunities are readily available and aligned with career advancement.",
    type: "likert",
    required: true,
    helpText: "Investment in professional development directly impacts retention and organizational capability."
  },
  {
    id: "PDS_02",
    section: "Professional Development & Support",
    prompt: "What percentage of your annual budget is allocated to staff training and development?",
    type: "numeric",
    required: true,
    validationRules: { min: 0, max: 50 }
  },
  {
    id: "PDS_03",
    section: "Professional Development & Support",
    prompt: "Our organization provides adequate mental health and wellness support for staff.",
    type: "likert"
  },
  {
    id: "PDS_04",
    section: "Professional Development & Support",
    prompt: "How many training hours does the average employee receive annually?",
    type: "numeric",
    validationRules: { min: 0, max: 500 }
  },
  {
    id: "PDS_05",
    section: "Professional Development & Support",
    prompt: "Career advancement pathways are clearly communicated and accessible to all staff.",
    type: "likert"
  },
  {
    id: "PDS_06",
    section: "Professional Development & Support",
    prompt: "Describe your organization's approach to onboarding new employees.",
    type: "text",
    validationRules: { min: 50 }
  },
  {
    id: "PDS_07",
    section: "Professional Development & Support",
    prompt: "Our organization effectively identifies and develops internal talent for leadership roles.",
    type: "likert"
  },
  {
    id: "PDS_08",
    section: "Professional Development & Support",
    prompt: "What percentage of leadership positions are filled through internal promotion?",
    type: "numeric",
    validationRules: { min: 0, max: 100 }
  },
  {
    id: "PDS_09",
    section: "Professional Development & Support",
    prompt: "Staff have access to technology training and digital skills development.",
    type: "likert",
    tags: ["digital-transformation"]
  },
  {
    id: "PDS_10",
    section: "Professional Development & Support",
    prompt: "Upload your current professional development plan or training catalog.",
    type: "upload",
    helpText: "Training programs help identify gaps in digital skills and AI readiness."
  },
  {
    id: "PDS_11",
    section: "Professional Development & Support",
    prompt: "Our organization provides adequate support for work-life balance.",
    type: "likert"
  },
  {
    id: "PDS_12",
    section: "Professional Development & Support",
    prompt: "How many days of paid professional development leave does your organization provide annually?",
    type: "numeric",
    validationRules: { min: 0, max: 50 }
  },
  {
    id: "PDS_13",
    section: "Professional Development & Support",
    prompt: "Mentoring and coaching programs are available and actively utilized.",
    type: "likert"
  },
  {
    id: "PDS_14",
    section: "Professional Development & Support",
    prompt: "Describe your organization's strategy for knowledge transfer and succession planning.",
    type: "text",
    validationRules: { min: 50 }
  },
  {
    id: "PDS_15",
    section: "Professional Development & Support",
    prompt: "Our organization invests in developing skills for future organizational needs.",
    type: "likert"
  },

  // === TECHNOLOGY & DIGITAL INFRASTRUCTURE (15 questions) ===
  {
    id: "TDI_01",
    section: "Technology & Digital Infrastructure",
    prompt: "Our current technology infrastructure adequately supports daily operations and growth.",
    type: "likert",
    required: true,
    helpText: "Technology infrastructure is critical for operational efficiency and AI implementation potential."
  },
  {
    id: "TDI_02",
    section: "Technology & Digital Infrastructure",
    prompt: "What percentage of your organization's processes are currently digitized?",
    type: "numeric",
    required: true,
    validationRules: { min: 0, max: 100 },
    tags: ["digital-transformation"]
  },
  {
    id: "TDI_03",
    section: "Technology & Digital Infrastructure",
    prompt: "Our organization has a clear digital transformation strategy and roadmap.",
    type: "likert",
    tags: ["digital-transformation"]
  },
  {
    id: "TDI_04",
    section: "Technology & Digital Infrastructure",
    prompt: "How many different software systems does your organization use that don't integrate with each other?",
    type: "numeric",
    validationRules: { min: 0, max: 50 }
  },
  {
    id: "TDI_05",
    section: "Technology & Digital Infrastructure",
    prompt: "Data security and privacy policies are up-to-date and regularly enforced.",
    type: "likert"
  },
  {
    id: "TDI_06",
    section: "Technology & Digital Infrastructure",
    prompt: "Describe your organization's biggest technology challenge or limitation.",
    type: "text",
    validationRules: { min: 50 }
  },
  {
    id: "TDI_07",
    section: "Technology & Digital Infrastructure",
    prompt: "Our organization effectively uses data analytics to inform decision-making.",
    type: "likert",
    tags: ["analytics", "ai-opportunity"]
  },
  {
    id: "TDI_08",
    section: "Technology & Digital Infrastructure",
    prompt: "What percentage of your annual budget is allocated to technology and IT infrastructure?",
    type: "numeric",
    validationRules: { min: 0, max: 50 }
  },
  {
    id: "TDI_09",
    section: "Technology & Digital Infrastructure",
    prompt: "Cloud-based solutions are utilized appropriately for our organizational needs.",
    type: "likert"
  },
  {
    id: "TDI_10",
    section: "Technology & Digital Infrastructure",
    prompt: "Upload your current IT infrastructure diagram or technology stack documentation.",
    type: "upload",
    helpText: "Technology documentation helps assess AI implementation readiness and integration opportunities."
  },
  {
    id: "TDI_11",
    section: "Technology & Digital Infrastructure",
    prompt: "Our organization has dedicated IT support staff or reliable external IT services.",
    type: "likert"
  },
  {
    id: "TDI_12",
    section: "Technology & Digital Infrastructure",
    prompt: "How many hours per week does your organization experience technology-related downtime?",
    type: "numeric",
    validationRules: { min: 0, max: 168 }
  },
  {
    id: "TDI_13",
    section: "Technology & Digital Infrastructure",
    prompt: "Staff are adequately trained on the technology tools they need for their roles.",
    type: "likert"
  },
  {
    id: "TDI_14",
    section: "Technology & Digital Infrastructure",
    prompt: "Our organization regularly updates and maintains its technology infrastructure.",
    type: "likert"
  },
  {
    id: "TDI_15",
    section: "Technology & Digital Infrastructure",
    prompt: "Technology procurement decisions are made strategically with long-term planning.",
    type: "likert"
  },

  // === AI & AUTOMATION OPPORTUNITIES (10 questions) ===
  {
    id: "AI_01",
    section: "AI & Automation Opportunities",
    prompt: "Our organization is actively exploring artificial intelligence and automation opportunities.",
    type: "likert",
    required: true,
    helpText: "AI and automation assessment is critical for future competitiveness and efficiency gains.",
    tags: ["ai-opportunity", "digital-transformation"]
  },
  {
    id: "AI_02",
    section: "AI & Automation Opportunities",
    prompt: "What percentage of your organization's routine tasks could potentially be automated with current technology?",
    type: "numeric",
    required: true,
    validationRules: { min: 0, max: 100 },
    tags: ["ai-opportunity"]
  },
  {
    id: "AI_03",
    section: "AI & Automation Opportunities",
    prompt: "Our organization has staff with AI/machine learning expertise or access to such expertise.",
    type: "likert",
    tags: ["ai-readiness"]
  },
  {
    id: "AI_04",
    section: "AI & Automation Opportunities",
    prompt: "How many hours per week does your organization spend on repetitive data processing tasks?",
    type: "numeric",
    validationRules: { min: 0, max: 200 },
    tags: ["ai-opportunity"]
  },
  {
    id: "AI_05",
    section: "AI & Automation Opportunities",
    prompt: "Our organization has a clear policy or strategy regarding AI adoption and implementation.",
    type: "likert",
    tags: ["ai-strategy"]
  },
  {
    id: "AI_06",
    section: "AI & Automation Opportunities",
    prompt: "Describe the specific administrative tasks in your organization that could benefit most from automation.",
    type: "text",
    required: true,
    validationRules: { min: 100 },
    tags: ["ai-opportunity"]
  },
  {
    id: "AI_07",
    section: "AI & Automation Opportunities",
    prompt: "Our organization currently uses chatbots, automated workflows, or other AI-powered tools.",
    type: "likert",
    tags: ["ai-adoption"]
  },
  {
    id: "AI_08",
    section: "AI & Automation Opportunities",
    prompt: "What percentage of your customer/client service inquiries could be handled by AI assistants?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tags: ["ai-opportunity", "customer-service"]
  },
  {
    id: "AI_09",
    section: "AI & Automation Opportunities",
    prompt: "Our organization is prepared to invest in AI training and implementation over the next 2 years.",
    type: "likert",
    tags: ["ai-investment"]
  },
  {
    id: "AI_10",
    section: "AI & Automation Opportunities",
    prompt: "Describe your organization's biggest concerns or barriers to AI adoption.",
    type: "text",
    validationRules: { min: 50 },
    tags: ["ai-barriers"]
  }
];

/**
 * MONTHLY SUBSCRIPTION TIER QUESTIONS - Additional questions for recurring assessment
 * Includes deeper operational insights and trend analysis (15+ additional questions)
 */
export const MONTHLY_QUESTIONS: Question[] = [
  // Progress Tracking & Trends
  {
    id: "MT_01",
    section: "Progress Tracking & Trends",
    prompt: "Our organization effectively tracks progress on strategic initiatives month-over-month.",
    type: "likert",
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_02",
    section: "Progress Tracking & Trends",
    prompt: "What percentage improvement in efficiency has your organization achieved in the past 6 months?",
    type: "numeric",
    validationRules: { min: -50, max: 100 },
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_03",
    section: "Progress Tracking & Trends",
    prompt: "Monthly operational reviews include actionable insights and course corrections.",
    type: "likert",
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_04",
    section: "Progress Tracking & Trends",
    prompt: "How many new process improvements has your organization implemented in the past quarter?",
    type: "numeric",
    validationRules: { min: 0, max: 50 },
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_05",
    section: "Progress Tracking & Trends",
    prompt: "Describe the most significant operational change your organization has made recently.",
    type: "text",
    validationRules: { min: 75 },
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_06",
    section: "Progress Tracking & Trends",
    prompt: "Our organization maintains consistent performance metrics across reporting periods.",
    type: "likert",
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_07",
    section: "Progress Tracking & Trends",
    prompt: "What percentage of your strategic goals are currently on track or ahead of schedule?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_08",
    section: "Progress Tracking & Trends",
    prompt: "Upload your most recent monthly dashboard or progress report.",
    type: "upload",
    tierMinimum: "monthly-subscription",
    helpText: "Monthly reports help track improvement trends and identify optimization opportunities."
  },
  {
    id: "MT_09",
    section: "Progress Tracking & Trends",
    prompt: "Our organization quickly identifies and addresses performance deviations.",
    type: "likert",
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_10",
    section: "Progress Tracking & Trends",
    prompt: "How many key performance indicators does your organization actively monitor?",
    type: "numeric",
    validationRules: { min: 1, max: 100 },
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_11",
    section: "Progress Tracking & Trends",
    prompt: "Data collection and analysis processes are automated and reliable.",
    type: "likert",
    tierMinimum: "monthly-subscription",
    tags: ["automation", "analytics"]
  },
  {
    id: "MT_12",
    section: "Progress Tracking & Trends",
    prompt: "Our organization successfully adapts strategies based on monthly performance data.",
    type: "likert",
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_13",
    section: "Progress Tracking & Trends",
    prompt: "What percentage of your organization's decisions are data-driven versus intuition-based?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tierMinimum: "monthly-subscription",
    tags: ["analytics"]
  },
  {
    id: "MT_14",
    section: "Progress Tracking & Trends",
    prompt: "Describe your organization's process for identifying and scaling successful innovations.",
    type: "text",
    validationRules: { min: 75 },
    tierMinimum: "monthly-subscription"
  },
  {
    id: "MT_15",
    section: "Progress Tracking & Trends",
    prompt: "Our organization maintains historical data for trend analysis and forecasting.",
    type: "likert",
    tierMinimum: "monthly-subscription",
    tags: ["analytics", "forecasting"]
  }
];

/**
 * COMPREHENSIVE PACKAGE QUESTIONS - Deep strategic analysis (15+ additional questions)
 * Board-ready insights and comprehensive scenario modeling
 */
export const COMPREHENSIVE_QUESTIONS: Question[] = [
  // Strategic Scenario Analysis
  {
    id: "CP_01",
    section: "Strategic Scenario Analysis",
    prompt: "Our organization regularly conducts comprehensive scenario planning for multiple future states.",
    type: "likert",
    tierMinimum: "comprehensive-package",
    required: true
  },
  {
    id: "CP_02",
    section: "Strategic Scenario Analysis",
    prompt: "How many different strategic scenarios has your organization modeled in the past year?",
    type: "numeric",
    validationRules: { min: 0, max: 20 },
    tierMinimum: "comprehensive-package"
  },
  {
    id: "CP_03",
    section: "Strategic Scenario Analysis",
    prompt: "Board reporting includes multiple scenario outcomes with risk assessments.",
    type: "likert",
    tierMinimum: "comprehensive-package"
  },
  {
    id: "CP_04",
    section: "Strategic Scenario Analysis",
    prompt: "What percentage of your strategic planning includes quantitative financial modeling?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tierMinimum: "comprehensive-package"
  },
  {
    id: "CP_05",
    section: "Strategic Scenario Analysis",
    prompt: "Describe your organization's approach to risk assessment and mitigation planning.",
    type: "text",
    validationRules: { min: 100 },
    tierMinimum: "comprehensive-package",
    required: true
  },
  {
    id: "CP_06",
    section: "Strategic Scenario Analysis",
    prompt: "Our organization has documented contingency plans for various operational disruptions.",
    type: "likert",
    tierMinimum: "comprehensive-package"
  },
  {
    id: "CP_07",
    section: "Strategic Scenario Analysis",
    prompt: "How many years forward does your organization's strategic planning typically extend?",
    type: "numeric",
    validationRules: { min: 1, max: 20 },
    tierMinimum: "comprehensive-package"
  },
  {
    id: "CP_08",
    section: "Strategic Scenario Analysis",
    prompt: "Upload your most recent strategic plan or board-level scenario analysis.",
    type: "upload",
    tierMinimum: "comprehensive-package",
    helpText: "Strategic documents help assess scenario modeling sophistication and AI enhancement opportunities."
  },
  {
    id: "CP_09",
    section: "Strategic Scenario Analysis",
    prompt: "External market forces and industry trends are systematically incorporated into strategic planning.",
    type: "likert",
    tierMinimum: "comprehensive-package"
  },
  {
    id: "CP_10",
    section: "Strategic Scenario Analysis",
    prompt: "What percentage of your strategic decisions include AI or automation impact assessments?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tierMinimum: "comprehensive-package",
    tags: ["ai-strategy"]
  },
  {
    id: "CP_11",
    section: "Strategic Scenario Analysis",
    prompt: "Our organization uses sophisticated modeling tools for financial and operational projections.",
    type: "likert",
    tierMinimum: "comprehensive-package",
    tags: ["analytics", "modeling"]
  },
  {
    id: "CP_12",
    section: "Strategic Scenario Analysis",
    prompt: "Cross-functional teams collaborate effectively on strategic scenario development.",
    type: "likert",
    tierMinimum: "comprehensive-package"
  },
  {
    id: "CP_13",
    section: "Strategic Scenario Analysis",
    prompt: "How many different organizational restructuring scenarios has your organization evaluated?",
    type: "numeric",
    validationRules: { min: 0, max: 10 },
    tierMinimum: "comprehensive-package"
  },
  {
    id: "CP_14",
    section: "Strategic Scenario Analysis",
    prompt: "Describe your organization's methodology for validating and testing strategic scenarios.",
    type: "text",
    validationRules: { min: 100 },
    tierMinimum: "comprehensive-package"
  },
  {
    id: "CP_15",
    section: "Strategic Scenario Analysis",
    prompt: "Our organization effectively communicates scenario outcomes to all stakeholders.",
    type: "likert",
    tierMinimum: "comprehensive-package"
  }
];

/**
 * ENTERPRISE TRANSFORMATION QUESTIONS - System-wide analysis (20+ additional questions)
 * Multi-campus, network, or agency-level insights
 */
export const ENTERPRISE_QUESTIONS: Question[] = [
  // System-Wide Integration & Analytics
  {
    id: "ET_01",
    section: "System-Wide Integration & Analytics",
    prompt: "Our organization has centralized analytics and reporting across all locations/divisions.",
    type: "likert",
    tierMinimum: "enterprise-transformation",
    required: true
  },
  {
    id: "ET_02",
    section: "System-Wide Integration & Analytics",
    prompt: "How many separate locations, campuses, or divisions does your organization operate?",
    type: "numeric",
    validationRules: { min: 1, max: 1000 },
    tierMinimum: "enterprise-transformation",
    required: true
  },
  {
    id: "ET_03",
    section: "System-Wide Integration & Analytics",
    prompt: "Data integration across all organizational units is seamless and real-time.",
    type: "likert",
    tierMinimum: "enterprise-transformation",
    tags: ["analytics", "integration"]
  },
  {
    id: "ET_04",
    section: "System-Wide Integration & Analytics",
    prompt: "What percentage of your organizational units use standardized processes and systems?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_05",
    section: "System-Wide Integration & Analytics",
    prompt: "Describe your organization's approach to managing complexity across multiple locations or divisions.",
    type: "text",
    validationRules: { min: 150 },
    tierMinimum: "enterprise-transformation",
    required: true
  },
  {
    id: "ET_06",
    section: "System-Wide Integration & Analytics",
    prompt: "Our organization has enterprise-level governance structures and oversight mechanisms.",
    type: "likert",
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_07",
    section: "System-Wide Integration & Analytics",
    prompt: "How many different IT systems require integration across your organizational network?",
    type: "numeric",
    validationRules: { min: 1, max: 200 },
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_08",
    section: "System-Wide Integration & Analytics",
    prompt: "Upload your enterprise architecture diagram or system integration documentation.",
    type: "upload",
    tierMinimum: "enterprise-transformation",
    helpText: "Enterprise architecture helps assess AI integration complexity and automation opportunities across systems."
  },
  {
    id: "ET_09",
    section: "System-Wide Integration & Analytics",
    prompt: "Performance benchmarking occurs regularly across all organizational units.",
    type: "likert",
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_10",
    section: "System-Wide Integration & Analytics",
    prompt: "What percentage of your enterprise data is currently accessible through centralized analytics platforms?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tierMinimum: "enterprise-transformation",
    tags: ["analytics"]
  },
  {
    id: "ET_11",
    section: "System-Wide Integration & Analytics",
    prompt: "Our organization successfully manages cultural and operational differences across locations.",
    type: "likert",
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_12",
    section: "System-Wide Integration & Analytics",
    prompt: "Enterprise-wide change management processes are standardized and effective.",
    type: "likert",
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_13",
    section: "System-Wide Integration & Analytics",
    prompt: "How many different AI or automation tools does your organization use across all units?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tierMinimum: "enterprise-transformation",
    tags: ["ai-adoption"]
  },
  {
    id: "ET_14",
    section: "System-Wide Integration & Analytics",
    prompt: "Describe your organization's strategy for scaling successful innovations across all locations.",
    type: "text",
    validationRules: { min: 150 },
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_15",
    section: "System-Wide Integration & Analytics",
    prompt: "Our organization has dedicated enterprise architecture and systems integration expertise.",
    type: "likert",
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_16",
    section: "System-Wide Integration & Analytics",
    prompt: "What percentage of your enterprise operations could be optimized through AI-powered analytics?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    tierMinimum: "enterprise-transformation",
    tags: ["ai-opportunity"]
  },
  {
    id: "ET_17",
    section: "System-Wide Integration & Analytics",
    prompt: "Our organization maintains consistent quality standards across all locations and divisions.",
    type: "likert",
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_18",
    section: "System-Wide Integration & Analytics",
    prompt: "How many full-time employees work on enterprise integration and analytics across your organization?",
    type: "numeric",
    validationRules: { min: 0, max: 500 },
    tierMinimum: "enterprise-transformation"
  },
  {
    id: "ET_19",
    section: "System-Wide Integration & Analytics",
    prompt: "Enterprise-level AI strategy includes implementation roadmaps for all organizational units.",
    type: "likert",
    tierMinimum: "enterprise-transformation",
    tags: ["ai-strategy"]
  },
  {
    id: "ET_20",
    section: "System-Wide Integration & Analytics",
    prompt: "Describe your organization's approach to enterprise-wide digital transformation and AI adoption.",
    type: "text",
    validationRules: { min: 200 },
    tierMinimum: "enterprise-transformation",
    tags: ["digital-transformation", "ai-strategy"]
  }
];

/**
 * ORGANIZATION-SPECIFIC CONTEXTUAL QUESTIONS
 * Additional questions based on organization type
 */
export const CONTEXTUAL_QUESTIONS: Question[] = [
  // Higher Education Specific
  {
    id: "HE_01",
    section: "Academic Excellence & Student Success",
    prompt: "Our academic programs are regularly reviewed and updated to meet industry demands and student needs.",
    type: "likert",
    organizationTypes: ["higher-education"],
    required: true
  },
  {
    id: "HE_02",
    section: "Academic Excellence & Student Success",
    prompt: "What percentage of your courses could incorporate AI tools or automated assessment technologies?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    organizationTypes: ["higher-education"],
    tags: ["ai-opportunity", "education"]
  },
  {
    id: "HE_03",
    section: "Academic Excellence & Student Success",
    prompt: "Student services are integrated and provide comprehensive support throughout the student lifecycle.",
    type: "likert",
    organizationTypes: ["higher-education"]
  },
  {
    id: "HE_04",
    section: "Academic Excellence & Student Success",
    prompt: "Describe your institution's approach to personalized learning and adaptive educational technologies.",
    type: "text",
    validationRules: { min: 100 },
    organizationTypes: ["higher-education"],
    tags: ["ai-opportunity", "personalization"]
  },
  {
    id: "HE_05",
    section: "Academic Excellence & Student Success",
    prompt: "Our faculty development programs include training on educational technology and AI tools.",
    type: "likert",
    organizationTypes: ["higher-education"],
    tags: ["ai-readiness", "faculty-development"]
  },

  // Healthcare Specific
  {
    id: "HC_01",
    section: "Patient Care & Clinical Excellence",
    prompt: "Our patient care delivery systems are optimized for both quality outcomes and operational efficiency.",
    type: "likert",
    organizationTypes: ["healthcare"],
    required: true
  },
  {
    id: "HC_02",
    section: "Patient Care & Clinical Excellence",
    prompt: "What percentage of your clinical documentation and administrative processes could be automated?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    organizationTypes: ["healthcare"],
    tags: ["ai-opportunity", "clinical"]
  },
  {
    id: "HC_03",
    section: "Patient Care & Clinical Excellence",
    prompt: "Electronic health records and clinical systems are fully integrated and interoperable.",
    type: "likert",
    organizationTypes: ["healthcare"],
    tags: ["integration", "clinical-systems"]
  },
  {
    id: "HC_04",
    section: "Patient Care & Clinical Excellence",
    prompt: "Describe your organization's approach to predictive analytics and AI-assisted clinical decision support.",
    type: "text",
    validationRules: { min: 100 },
    organizationTypes: ["healthcare"],
    tags: ["ai-opportunity", "clinical-decision-support"]
  },
  {
    id: "HC_05",
    section: "Patient Care & Clinical Excellence",
    prompt: "Our clinical staff are trained and comfortable with AI-powered diagnostic and treatment tools.",
    type: "likert",
    organizationTypes: ["healthcare"],
    tags: ["ai-readiness", "clinical-training"]
  },

  // Nonprofit Specific
  {
    id: "NP_01",
    section: "Mission Impact & Community Engagement",
    prompt: "Our programs effectively measure and demonstrate impact aligned with our organizational mission.",
    type: "likert",
    organizationTypes: ["nonprofit"],
    required: true
  },
  {
    id: "NP_02",
    section: "Mission Impact & Community Engagement",
    prompt: "What percentage of your donor management and fundraising processes could be enhanced with AI?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    organizationTypes: ["nonprofit"],
    tags: ["ai-opportunity", "fundraising"]
  },
  {
    id: "NP_03",
    section: "Mission Impact & Community Engagement",
    prompt: "Volunteer management and coordination systems effectively support program delivery.",
    type: "likert",
    organizationTypes: ["nonprofit"]
  },
  {
    id: "NP_04",
    section: "Mission Impact & Community Engagement",
    prompt: "Describe your organization's approach to community engagement and stakeholder relationship management.",
    type: "text",
    validationRules: { min: 100 },
    organizationTypes: ["nonprofit"]
  },
  {
    id: "NP_05",
    section: "Mission Impact & Community Engagement",
    prompt: "Our organization uses data analytics to optimize program effectiveness and resource allocation.",
    type: "likert",
    organizationTypes: ["nonprofit"],
    tags: ["analytics", "program-optimization"]
  },

  // Corporate Specific
  {
    id: "CR_01",
    section: "Market Competitiveness & Innovation",
    prompt: "Our organization consistently adapts to market changes and maintains competitive advantages.",
    type: "likert",
    organizationTypes: ["corporate"],
    required: true
  },
  {
    id: "CR_02",
    section: "Market Competitiveness & Innovation",
    prompt: "What percentage of your customer service operations could be enhanced or automated with AI?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    organizationTypes: ["corporate"],
    tags: ["ai-opportunity", "customer-service"]
  },
  {
    id: "CR_03",
    section: "Market Competitiveness & Innovation",
    prompt: "Innovation processes are systematically managed and integrated with business strategy.",
    type: "likert",
    organizationTypes: ["corporate"]
  },
  {
    id: "CR_04",
    section: "Market Competitiveness & Innovation",
    prompt: "Describe your organization's approach to digital transformation and AI integration in core business processes.",
    type: "text",
    validationRules: { min: 100 },
    organizationTypes: ["corporate"],
    tags: ["digital-transformation", "ai-strategy"]
  },
  {
    id: "CR_05",
    section: "Market Competitiveness & Innovation",
    prompt: "Our organization uses AI and machine learning for business intelligence and predictive analytics.",
    type: "likert",
    organizationTypes: ["corporate"],
    tags: ["ai-adoption", "business-intelligence"]
  },

  // Government Specific
  {
    id: "GV_01",
    section: "Public Service & Regulatory Compliance",
    prompt: "Our organization effectively balances public service delivery with regulatory compliance requirements.",
    type: "likert",
    organizationTypes: ["government"],
    required: true
  },
  {
    id: "GV_02",
    section: "Public Service & Regulatory Compliance",
    prompt: "What percentage of citizen-facing services could be enhanced or automated with AI technologies?",
    type: "numeric",
    validationRules: { min: 0, max: 100 },
    organizationTypes: ["government"],
    tags: ["ai-opportunity", "citizen-services"]
  },
  {
    id: "GV_03",
    section: "Public Service & Regulatory Compliance",
    prompt: "Digital government initiatives are effectively implemented and accessible to all constituencies.",
    type: "likert",
    organizationTypes: ["government"],
    tags: ["digital-government"]
  },
  {
    id: "GV_04",
    section: "Public Service & Regulatory Compliance",
    prompt: "Describe your organization's approach to transparency, accountability, and public engagement.",
    type: "text",
    validationRules: { min: 100 },
    organizationTypes: ["government"]
  },
  {
    id: "GV_05",
    section: "Public Service & Regulatory Compliance",
    prompt: "Our organization uses data analytics and AI to improve public service delivery and resource allocation.",
    type: "likert",
    organizationTypes: ["government"],
    tags: ["ai-adoption", "public-service"]
  }
];

/**
 * Helper function to get all questions for a specific tier and organization type
 * NOW GUARANTEES 100+ QUESTIONS FOR EVERY TIER
 */
export function getQuestionsForTier(
  tier: 'one-time-diagnostic' | 'monthly-subscription' | 'comprehensive-package' | 'enterprise-transformation',
  organizationType: OrganizationType = 'higher-education'
): Question[] {
  let questions = [...CORE_QUESTIONS]; // Starts with 100 questions

  // Add contextual questions based on organization type (5+ additional)
  const contextualQuestions = CONTEXTUAL_QUESTIONS.filter(q => 
    !q.organizationTypes || q.organizationTypes.includes(organizationType)
  );
  questions.push(...contextualQuestions);

  // Add tier-specific questions
  if (tier !== 'one-time-diagnostic') {
    questions.push(...MONTHLY_QUESTIONS); // +15 questions
  }
  
  if (tier === 'comprehensive-package' || tier === 'enterprise-transformation') {
    questions.push(...COMPREHENSIVE_QUESTIONS); // +15 questions
  }
  
  if (tier === 'enterprise-transformation') {
    questions.push(...ENTERPRISE_QUESTIONS); // +20 questions
  }

  // Filter out questions that don't meet tier minimum requirement
  questions = questions.filter(q => {
    if (!q.tierMinimum) return true;
    
    const tierHierarchy = {
      'one-time-diagnostic': 1,
      'monthly-subscription': 2,
      'comprehensive-package': 3,
      'enterprise-transformation': 4
    };
    
    return tierHierarchy[tier] >= tierHierarchy[q.tierMinimum];
  });

  return questions;
}

/**
 * Get sections available for a specific tier and organization type
 */
export function getSectionsForTier(
  tier: 'one-time-diagnostic' | 'monthly-subscription' | 'comprehensive-package' | 'enterprise-transformation',
  organizationType: OrganizationType = 'higher-education'
): string[] {
  const questions = getQuestionsForTier(tier, organizationType);
  const sections = [...new Set(questions.map(q => q.section))];
  return sections.sort();
}

/**
 * Get only required questions for a tier and organization type
 */
export function getRequiredQuestions(
  tier: 'one-time-diagnostic' | 'monthly-subscription' | 'comprehensive-package' | 'enterprise-transformation',
  organizationType: OrganizationType = 'higher-education'
): Question[] {
  const allQuestions = getQuestionsForTier(tier, organizationType);
  return allQuestions.filter(q => q.required === true);
}

/**
 * Get AI and automation opportunity questions specifically
 */
export function getAIOpportunityQuestions(
  tier: 'one-time-diagnostic' | 'monthly-subscription' | 'comprehensive-package' | 'enterprise-transformation',
  organizationType: OrganizationType = 'higher-education'
): Question[] {
  const allQuestions = getQuestionsForTier(tier, organizationType);
  return allQuestions.filter(q => q.tags?.includes('ai-opportunity'));
}

/**
 * Validate assessment responses for completeness and quality
 */
export function validateAssessmentResponses(
  responses: Record<string, any>,
  tier: 'one-time-diagnostic' | 'monthly-subscription' | 'comprehensive-package' | 'enterprise-transformation',
  organizationType: OrganizationType = 'higher-education'
): { valid: boolean; missingRequired: string[]; warningOptional: string[]; aiOpportunityScore: number } {
  const requiredQuestions = getRequiredQuestions(tier, organizationType);
  const allQuestions = getQuestionsForTier(tier, organizationType);
  const aiQuestions = getAIOpportunityQuestions(tier, organizationType);
  
  const missingRequired = requiredQuestions
    .filter(q => !responses[q.id] || responses[q.id] === '')
    .map(q => q.id);
  
  const answeredCount = Object.keys(responses).length;
  const totalQuestions = allQuestions.length;
  const completionRate = answeredCount / totalQuestions;
  
  // Calculate AI opportunity score based on AI-related responses
  const aiResponses = aiQuestions.filter(q => responses[q.id]);
  const aiOpportunityScore = aiResponses.length > 0 ? 
    Math.round((aiResponses.length / aiQuestions.length) * 100) : 0;
  
  const warningOptional = completionRate < 0.8 ? 
    [`Completion rate: ${Math.round(completionRate * 100)}%. Consider answering more questions for better insights.`] : 
    [];

  return {
    valid: missingRequired.length === 0,
    missingRequired,
    warningOptional,
    aiOpportunityScore
  };
}

/**
 * Get comprehensive question statistics for a tier and organization type
 */
export function getQuestionStats(
  tier: 'one-time-diagnostic' | 'monthly-subscription' | 'comprehensive-package' | 'enterprise-transformation',
  organizationType: OrganizationType = 'higher-education'
): {
  total: number;
  required: number;
  aiOpportunity: number;
  byType: Record<QuestionType, number>;
  sections: string[];
  meetsWebsitePromise: boolean;
} {
  const questions = getQuestionsForTier(tier, organizationType);
  const required = getRequiredQuestions(tier, organizationType);
  const aiQuestions = getAIOpportunityQuestions(tier, organizationType);
  const sections = getSectionsForTier(tier, organizationType);
  
  const byType = questions.reduce((acc, q) => {
    acc[q.type] = (acc[q.type] || 0) + 1;
    return acc;
  }, {} as Record<QuestionType, number>);

  return {
    total: questions.length,
    required: required.length,
    aiOpportunity: aiQuestions.length,
    byType,
    sections,
    meetsWebsitePromise: questions.length >= 100 // Website promises 100+ questions
  };
}

/**
 * Get AI readiness assessment based on responses
 */
export function getAIReadinessAssessment(
  responses: Record<string, any>,
  tier: 'one-time-diagnostic' | 'monthly-subscription' | 'comprehensive-package' | 'enterprise-transformation',
  organizationType: OrganizationType = 'higher-education'
): {
  readinessScore: number;
  automationPotential: number;
  recommendations: string[];
  priorityAreas: string[];
} {
  const aiQuestions = getAIOpportunityQuestions(tier, organizationType);
  const _answeredAIQuestions = aiQuestions.filter(q => responses[q.id]);
  
  // Calculate readiness score based on AI-related responses
  let readinessScore = 0;
  let automationPotential = 0;
  const recommendations: string[] = [];
  const priorityAreas: string[] = [];
  
  // Analyze specific AI opportunity responses
  if (responses['AI_02']) {
    automationPotential = Math.max(automationPotential, parseInt(responses['AI_02']) || 0);
  }
  if (responses['APC_04']) {
    automationPotential = Math.max(automationPotential, parseInt(responses['APC_04']) || 0);
  }
  if (responses['APC_18']) {
    automationPotential = Math.max(automationPotential, parseInt(responses['APC_18']) || 0);
  }
  
  // Calculate overall readiness based on AI adoption questions
  const aiAdoptionQuestions = ['AI_01', 'AI_03', 'AI_05', 'AI_07', 'AI_09'];
  const aiAdoptionScores = aiAdoptionQuestions
    .map(id => parseInt(responses[id]) || 0)
    .filter(score => score > 0);
  
  if (aiAdoptionScores.length > 0) {
    readinessScore = Math.round(aiAdoptionScores.reduce((a, b) => a + b, 0) / aiAdoptionScores.length);
  }
  
  // Generate recommendations based on scores
  if (readinessScore < 3) {
    recommendations.push("Develop AI strategy and leadership buy-in");
    priorityAreas.push("AI Strategy Development");
  }
  if (automationPotential > 30) {
    recommendations.push("Prioritize process automation opportunities");
    priorityAreas.push("Process Automation");
  }
  if (responses['TDI_02'] && parseInt(responses['TDI_02']) < 50) {
    recommendations.push("Accelerate digital transformation initiatives");
    priorityAreas.push("Digital Infrastructure");
  }
  
  return {
    readinessScore: Math.max(readinessScore, 1),
    automationPotential,
    recommendations,
    priorityAreas
  };
}
