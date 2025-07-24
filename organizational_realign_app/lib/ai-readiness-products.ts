/**
 * AI Readiness Assessment Products Configuration
 * Comprehensive AI readiness assessment packages for higher education institutions
 */

export const aiReadinessProducts = {
  advanced: {
    id: 'ai-readiness-advanced',
    name: 'Advanced AI Assessment',
    price: 4995,
    description: 'Complete AI Readiness Evaluation with comprehensive analysis across 8 domains.',
    duration: 'One-time assessment',
    questionCount: 105,
    features: [
      '105-question comprehensive AI readiness assessment',
      'AI-enhanced analysis and recommendations',
      '12-page detailed AI readiness report',
      'AIRIX™, AIRS™, AICS™ algorithms',
      'Strategic document upload & AI analysis',
      'AI readiness scoring across 8 domains',
      'AI implementation guidance',
      'Single assessment access',
      'Up to 3 users',
      'Email support'
    ],
    isPopular: false
  },
  comprehensive: {
    id: 'ai-readiness-comprehensive',
    name: 'Comprehensive AI Assessment',
    price: 12000,
    description: 'In-depth AI assessment with narrative reports and policy development.',
    duration: 'Custom Analysis + Consulting',
    questionCount: 150,
    features: [
      '150-question in-depth AI assessment',
      'AI-generated narrative reports',
      '30-page comprehensive AI analysis',
      'Advanced AI scenario builder',
      'Custom AI policy recommendations',
      'Strategic AI roadmap development',
      'Team collaboration features',
      'Up to 25 users',
      'Up to 15 AI scenarios',
      'Priority support',
      'AI implementation consulting'
    ],
    isPopular: true
  }
}

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
