/**
 * AI Transformation Blueprint™ Products Configuration
 * From Assessment to Action - Premium AI transformation programs for higher education
 */

export const aiReadinessProducts = {
  pulse: {
    id: 'higher-ed-ai-pulse-check',
    name: 'Higher Ed AI Pulse Check',
    price: 495,
    stripePriceId: 'price_1RomXAELd2WOuqIWUJT4cY29',
    description: 'Quick 50-question AI readiness assessment with AI-generated insights report - perfect for getting started.',
    duration: '2-3 Business Days',
    questionCount: 50,
    features: [
      '50-question streamlined AI readiness assessment',
      'AI-generated quick insights report (8-10 pages)',
      'AIRIX™ core algorithm analysis',
      'Essential AI readiness scoring across 6 domains',
      'Basic AI implementation recommendations',
      'Resource library access',
      'Single assessment access',
      'Up to 2 users',
      'Email support',
      'Results within 2-3 business days'
    ],
    isPopular: false,
    primaryBuyer: 'Department Head, Pilot Teams',
    goal: 'Quick Assessment'
  },
  readiness: {
    id: 'ai-readiness-comprehensive',
    name: 'AI Readiness Comprehensive',
    price: 2495,
    stripePriceId: 'price_1Ro4tAELd2WOuqIWaDPEWxX3',
    description: 'Comprehensive 105-question AI readiness evaluation with advanced analytics and strategic consulting.',
    duration: 'Assessment + Consultation',
    questionCount: 105,
    features: [
      '105-question comprehensive AI readiness assessment',
      'AI-enhanced analysis and recommendations',
      '25-page detailed AI readiness report',
      'AIRIX™, AIRS™, AICS™ algorithm analysis',
      'Strategic document upload & AI analysis',
      'AI readiness scoring across 8 domains',
      'Detailed AI implementation guidance',
      'Team collaboration features',
      'Single assessment access',
      'Up to 5 users',
      'Priority email support',
      '30-minute strategy consultation'
    ],
    isPopular: false,
    primaryBuyer: 'AI Task Force, CIO',
    goal: 'Strategic Planning'
  },
  blueprint: {
    id: 'ai-transformation-blueprint',
    name: 'AI Transformation Blueprint',
    price: 7495,
    stripePriceId: 'price_1RomY5ELd2WOuqIWd3wUhiQm',
    description: 'In-depth 150-question assessment with comprehensive AI transformation roadmap and expert guidance.',
    duration: 'Full Transformation Planning',
    questionCount: 150,
    features: [
      '150-question in-depth AI assessment',
      'AI-generated comprehensive narrative reports',
      '40-page AI Transformation Blueprint™',
      'AIRIX™, AIRS™, AICS™, AIMS™, AIPS™ algorithm analysis',
      'Advanced AI scenario builder',
      'Custom AI policy recommendations',
      'Strategic AI roadmap development',
      'Team collaboration features',
      'Up to 15 users',
      'Up to 10 AI scenarios',
      'Priority support',
      '60-minute AI implementation consulting session'
    ],
    isPopular: true,
    primaryBuyer: 'Senior Leadership, Provost',
    goal: 'Drive Implementation',
    tagline: 'Complete AI transformation roadmap with expert guidance.'
  },
  enterprise: {
    id: 'ai-enterprise-partnership',
    name: 'Enterprise Partnership',
    price: 24995,
    stripePriceId: 'price_1RomYtELd2WOuqIWKdsStKyQ',
    description: 'Comprehensive AI transformation partnership with unlimited access and ongoing strategic support.',
    duration: 'Annual Partnership',
    questionCount: 200,
    features: [
      'Full AI Transformation Blueprint™ included',
      'Quarterly AI readiness re-assessments',
      'AIRIX™, AIRS™, AICS™, AIMS™, AIPS™, AIBS™ full algorithm suite',
      'Faculty micro-credential cohort program',
      'Dedicated Slack advisory channel',
      'Monthly strategy office hours',
      'Custom policy development & updates',
      'Advanced scenario modeling & forecasting',
      'Executive briefing sessions (quarterly)',
      'Priority implementation support',
      'Custom integration development',
      'White-glove premium support',
      'Unlimited users and assessments'
    ],
    isPopular: false,
    primaryBuyer: 'C-Suite, Board of Trustees',
    goal: 'Enterprise Partnership'
  }
}

export const AI_READINESS_FEATURES = {
  'ai-readiness-pulse': {
    questionsCount: 15,
    reportPages: 1,
    supportDays: 0,
    benchmarking: true,
    customWeighting: false,
    strategySession: false,
    executiveSlides: false,
    instantResults: true,
    heatMap: true
  },
  'ai-readiness-assessment': {
    questionsCount: 105,
    reportPages: 12,
    supportDays: 30,
    benchmarking: true,
    customWeighting: false,
    strategySession: true,
    executiveSlides: false,
    documentAnalysis: true,
    debrief: true
  },
  'ai-transformation-blueprint': {
    questionsCount: 105,
    reportPages: 40,
    supportDays: 90,
    benchmarking: true,
    customWeighting: true,
    strategySession: true,
    executiveSlides: true,
    asyncAdvisory: true,
    qepAlignment: true,
    powerBIDashboard: true,
    executiveWorkshop: true,
    policyLibrary: true,
    sprintPlan: true,
    scenarioModeling: true,
    facultyMicroCourse: true,
    changeManagementKit: true,
    weeklyOfficeHours: true,
    implementation: true
  },
  'ai-enterprise-partnership': {
    questionsCount: 105,
    reportPages: 40,
    supportDays: 365,
    benchmarking: true,
    customWeighting: true,
    strategySession: true,
    executiveSlides: true,
    asyncAdvisory: true,
    qepAlignment: true,
    powerBIDashboard: true,
    executiveWorkshop: true,
    policyLibrary: true,
    sprintPlan: true,
    scenarioModeling: true,
    facultyMicroCourse: true,
    changeManagementKit: true,
    weeklyOfficeHours: true,
    implementation: true,
    quarterlyReassessment: true,
    slackAdvisory: true,
    customIntegration: true,
    whiteGloveSupport: true,
    unlimitedUsers: true
  }
};

/**
 * Get AI readiness assessment configuration by tier
 */
// Helper to get product by tier ID
export const getAIReadinessProduct = (tier: string) => {
  const products = Object.values(aiReadinessProducts);
  const product = products.find(p => p.id === tier);
  return product || null;
};

// Convert to array format for compatibility
export const AI_READINESS_PRODUCTS = Object.values(aiReadinessProducts);

/**
 * Check if a tier is an AI readiness assessment
 */
export function isAIReadinessTier(tier: string): boolean {
  return tier.startsWith('ai-readiness');
}
