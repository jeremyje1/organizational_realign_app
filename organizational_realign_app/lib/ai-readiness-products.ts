/**
 * AI Readiness Assessment Products Configuration
 * Comprehensive AI readiness assessment packages for higher education institutions
 */

export const AI_READINESS_PRODUCTS = [
  {
    id: 'ai-readiness-basic',
    name: 'AI Readiness Assessment',
    description: 'Comprehensive evaluation of your institution\'s AI readiness across strategy, governance, pedagogy, and technology.',
    tagline: 'Complete AI Readiness Evaluation',
    features: [
      'Full diagnostic (25 questions)',
      'Maturity scores by domain',
      'Automated PDF report (15 pages)',
      'Prioritized action plan',
      'Higher ed benchmarking',
      '30-day email support'
    ],
    price: 2500,
    recommended: false,
    stripeUrl: 'https://organizational-realign-app.vercel.app/api/stripe/create-tier-checkout?tier=ai-readiness-basic&assessment_type=ai-readiness'
  },
  {
    id: 'ai-readiness-custom',
    name: 'AI Roadmap Intensive',
    description: 'Comprehensive AI strategy development with custom analysis and consulting support.',
    tagline: 'Custom Analysis + Consulting',
    features: [
      'All Tier 1 features included',
      'Custom domain weighting',
      'QEP & accreditation alignment analysis',
      '90-minute 1:1 strategy session',
      'Custom narrative report (30 pages)',
      'Executive presentation slides',
      '30-day async advisory access'
    ],
    price: 12000,
    recommended: true,
    stripeUrl: 'https://organizational-realign-app.vercel.app/api/stripe/create-tier-checkout?tier=ai-readiness-custom&assessment_type=ai-readiness',
    includesTier1: true
  }
];

export const AI_READINESS_FEATURES = {
  'ai-readiness-basic': {
    questionsCount: 25,
    reportPages: 15,
    supportDays: 30,
    benchmarking: true,
    customWeighting: false,
    strategySession: false,
    executiveSlides: false
  },
  'ai-readiness-custom': {
    questionsCount: 50,
    reportPages: 30,
    supportDays: 30,
    benchmarking: true,
    customWeighting: true,
    strategySession: true,
    executiveSlides: true,
    asyncAdvisory: true,
    qepAlignment: true
  }
};

/**
 * Get AI readiness assessment configuration by tier
 */
export function getAIReadinessConfig(tier: string) {
  const product = AI_READINESS_PRODUCTS.find(p => p.id === tier);
  const features = AI_READINESS_FEATURES[tier as keyof typeof AI_READINESS_FEATURES];
  
  return {
    product,
    features,
    isAIReadiness: true
  };
}

/**
 * Check if a tier is an AI readiness assessment
 */
export function isAIReadinessTier(tier: string): boolean {
  return tier.startsWith('ai-readiness');
}
