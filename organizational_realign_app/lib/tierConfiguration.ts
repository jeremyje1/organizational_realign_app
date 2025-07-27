/**
 * Tier-Based Assessment Configuration
 * Aligns assessment depth and algorithms with pricing tiers
 * 
 * @version 1.0.0
 * @author NorthPath Strategies
 */

export type PricingTier = 
  // AI Readiness Tiers
  | 'higher-ed-ai-pulse-check' 
  | 'ai-readiness-comprehensive' 
  | 'ai-transformation-blueprint' 
  | 'ai-enterprise-partnership'
  // Organizational Assessment Tiers
  | 'one-time-diagnostic'
  | 'monthly-subscription' 
  | 'comprehensive-package'
  | 'enterprise-transformation';

export interface TierConfiguration {
  name: string;
  price: number;
  targetCustomer: string;
  coreDeliverables: string[];
  assessmentScope: {
    questionCount: number;
    sections: string[];
    algorithms: string[];
    reportPages: number;
    followUpSupport: string;
  };    features: {
      uploadSupport: boolean;
      dashboardRefresh: boolean;
      customReporting: boolean;
      powerBIEmbedded: boolean;
      apiConnectors: boolean;
      onSiteFacilitation: boolean;
      progressAudits: boolean;
      orgChartGenerator: boolean;
      scenarioBuilder: boolean;
      monteCarloSimulation: boolean;
      realTimeCollaboration: boolean;
      aiOpportunityAssessment: boolean;
      aiReadinessScore: boolean;
      automationRecommendations: boolean;
    };
  guardrails: {
    maxAssessments?: number;
    maxUsers?: number;
    maxScenarios?: number;
    dataRetentionMonths: number;
  };
}

export const PRICING_TIERS: Record<PricingTier, TierConfiguration> = {
  // AI Readiness / Blueprint Tiers (Higher Education Focus)
  'higher-ed-ai-pulse-check': {
    name: 'Higher Ed AI Pulse Check',
    price: 2000,
    targetCustomer: 'Individual departments or small teams wanting a quick AI readiness snapshot',
    coreDeliverables: [
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
    assessmentScope: {
      questionCount: 50,
      sections: [
        'Strategic Leadership', 
        'Governance & Policy', 
        'Faculty AI Integration', 
        'Technology Infrastructure', 
        'Cultural Readiness', 
        'Mission Alignment'
      ],
      algorithms: ['AIRIX'],
      reportPages: 10,
      followUpSupport: 'Email support for 30 days + resource library access'
    },
    features: {
      uploadSupport: false,
      dashboardRefresh: false,
      customReporting: false,
      powerBIEmbedded: false,
      apiConnectors: false,
      onSiteFacilitation: false,
      progressAudits: false,
      orgChartGenerator: false,
      scenarioBuilder: false,
      monteCarloSimulation: false,
      realTimeCollaboration: false,
      aiOpportunityAssessment: true,
      aiReadinessScore: true,
      automationRecommendations: true
    },
    guardrails: {
      maxAssessments: 1,
      maxUsers: 2,
      dataRetentionMonths: 6
    }
  },

  'ai-readiness-comprehensive': {
    name: 'AI Readiness Comprehensive',
    price: 4995,
    targetCustomer: 'Higher education institutions seeking comprehensive AI readiness evaluation with advanced analytics',
    coreDeliverables: [
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
    assessmentScope: {
      questionCount: 105,
      sections: [
        'Strategic Leadership', 
        'Governance & Policy', 
        'Faculty AI Integration', 
        'Student AI Policy', 
        'Employee Integration', 
        'Technology Infrastructure', 
        'Cultural Transformation', 
        'Mission Alignment'
      ],
      algorithms: ['AIRIX', 'AIRS', 'AICS'],
      reportPages: 25,
      followUpSupport: '30-minute strategy consultation + email support for 60 days + resource library access'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: false,
      customReporting: true,
      powerBIEmbedded: false,
      apiConnectors: false,
      onSiteFacilitation: false,
      progressAudits: false,
      orgChartGenerator: false,
      scenarioBuilder: false,
      monteCarloSimulation: false,
      realTimeCollaboration: true,
      aiOpportunityAssessment: true,
      aiReadinessScore: true,
      automationRecommendations: true
    },
    guardrails: {
      maxAssessments: 1,
      maxUsers: 5,
      dataRetentionMonths: 12
    }
  },

  'ai-transformation-blueprint': {
    name: 'AI Transformation Blueprint',
    price: 24500,
    targetCustomer: 'Higher education institutions ready for strategic AI implementation with expert guidance and comprehensive analysis',
    coreDeliverables: [
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
    assessmentScope: {
      questionCount: 150,
      sections: [
        'Strategic Leadership', 
        'Governance & Policy', 
        'Faculty AI Integration', 
        'Student AI Policy', 
        'Employee Integration', 
        'Technology Infrastructure', 
        'Cultural Transformation', 
        'Mission Alignment',
        'Advanced AI Strategy',
        'Implementation Planning'
      ],
      algorithms: ['AIRIX', 'AIRS', 'AICS', 'AIMS', 'AIPS'],
      reportPages: 40,
      followUpSupport: '60-minute strategy session + 30-day advisory access + implementation planning support'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: true,
      customReporting: true,
      powerBIEmbedded: false,
      apiConnectors: false,
      onSiteFacilitation: false,
      progressAudits: false,
      orgChartGenerator: false,
      scenarioBuilder: true,
      monteCarloSimulation: false,
      realTimeCollaboration: true,
      aiOpportunityAssessment: true,
      aiReadinessScore: true,
      automationRecommendations: true
    },
    guardrails: {
      maxAssessments: 1,
      maxUsers: 15,
      maxScenarios: 10,
      dataRetentionMonths: 24
    }
  },

  'ai-enterprise-partnership': {
    name: 'Enterprise Partnership',
    price: 0, // Contact for pricing
    targetCustomer: 'Large institutions, multi-campus systems, R1 universities seeking comprehensive AI transformation partnership',
    coreDeliverables: [
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
    assessmentScope: {
      questionCount: 200,
      sections: [
        'Strategic AI Leadership',
        'Governance & Policy Framework', 
        'Technology Infrastructure',
        'Faculty & Pedagogy Integration',
        'Student AI Policy', 
        'Employee Integration', 
        'Academic Integrity',
        'Continuous Improvement',
        'Research Integration',
        'External Partnerships'
      ],
      algorithms: ['AIRIX', 'AIRS', 'AICS', 'AIMS', 'AIPS', 'AIBS'],
      reportPages: 50,
      followUpSupport: 'Annual retainer with dedicated advisory channel and quarterly strategy sessions'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: true,
      customReporting: true,
      powerBIEmbedded: true,
      apiConnectors: true,
      onSiteFacilitation: true,
      progressAudits: true,
      orgChartGenerator: false,
      scenarioBuilder: true,
      monteCarloSimulation: true,
      realTimeCollaboration: true,
      aiOpportunityAssessment: true,
      aiReadinessScore: true,
      automationRecommendations: true
    },
    guardrails: {
      maxAssessments: null, // Unlimited
      maxUsers: null, // Unlimited
      maxScenarios: null, // Unlimited
      dataRetentionMonths: null // Permanent retention
    }
  },

  // Organizational Assessment Tiers (All Industries)
  'one-time-diagnostic': {
    name: 'One-Time Diagnostic',
    price: 4995,
    targetCustomer: 'Organizations seeking comprehensive assessment with foundational analysis',
    coreDeliverables: [
      '100-question organizational assessment',
      'DSCH, CRF, LEI analysis',
      'Comprehensive PDF report',
      'Organizational chart generation',
      'Basic AI opportunity assessment',
      'Single assessment access',
      'Up to 2 users',
      'Email support'
    ],
    assessmentScope: {
      questionCount: 100,
      sections: [
        'Leadership & Strategy',
        'Operations & Processes',
        'Human Capital',
        'Technology & Infrastructure',
        'Culture & Change Management',
        'Performance Management'
      ],
      algorithms: ['DSCH', 'CRF', 'LEI'],
      reportPages: 15,
      followUpSupport: 'Email support for 30 days'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: false,
      customReporting: false,
      powerBIEmbedded: false,
      apiConnectors: false,
      onSiteFacilitation: false,
      progressAudits: false,
      orgChartGenerator: true,
      scenarioBuilder: false,
      monteCarloSimulation: false,
      realTimeCollaboration: false,
      aiOpportunityAssessment: true,
      aiReadinessScore: false,
      automationRecommendations: true
    },
    guardrails: {
      maxAssessments: 1,
      maxUsers: 2,
      dataRetentionMonths: 6
    }
  },

  'monthly-subscription': {
    name: 'Monthly Subscription',
    price: 2995,
    targetCustomer: 'Organizations needing ongoing assessment capabilities with advanced features',
    coreDeliverables: [
      '120-question comprehensive assessment',
      'DSCH, CRF, LEI, OCI, HOCI analysis',
      'Advanced AI-powered analytics',
      'Dashboard refresh capabilities',
      'CSV data exports',
      'Unlimited assessments (monthly)',
      'Up to 5 users',
      'Priority email support'
    ],
    assessmentScope: {
      questionCount: 120,
      sections: [
        'Strategic Leadership',
        'Operational Excellence',
        'Human Capital Development',
        'Technology Integration',
        'Cultural Transformation',
        'Performance Analytics',
        'Change Management',
        'Innovation Capacity'
      ],
      algorithms: ['DSCH', 'CRF', 'LEI', 'OCI', 'HOCI'],
      reportPages: 20,
      followUpSupport: 'Priority email support + monthly check-ins'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: true,
      customReporting: true,
      powerBIEmbedded: false,
      apiConnectors: false,
      onSiteFacilitation: false,
      progressAudits: false,
      orgChartGenerator: true,
      scenarioBuilder: false,
      monteCarloSimulation: false,
      realTimeCollaboration: false,
      aiOpportunityAssessment: true,
      aiReadinessScore: false,
      automationRecommendations: true
    },
    guardrails: {
      maxAssessments: null, // Unlimited monthly
      maxUsers: 5,
      dataRetentionMonths: 12
    }
  },

  'comprehensive-package': {
    name: 'Comprehensive Package',
    price: 9900,
    targetCustomer: 'Organizations seeking complete transformation analysis with scenario planning',
    coreDeliverables: [
      '150-question in-depth assessment',
      'Full algorithm suite analysis',
      '30-page comprehensive report',
      'Advanced scenario builder',
      '60-minute strategy consultation',
      'Team collaboration features',
      'Cost-savings analysis',
      'Up to 10 users',
      'Priority support'
    ],
    assessmentScope: {
      questionCount: 150,
      sections: [
        'Strategic Leadership',
        'Operational Excellence',
        'Human Capital Development',
        'Technology Integration',
        'Cultural Transformation',
        'Performance Analytics',
        'Change Management',
        'Innovation Capacity',
        'Financial Performance',
        'Risk Management'
      ],
      algorithms: ['DSCH', 'CRF', 'LEI', 'OCI', 'HOCI', 'Cost-Savings Analysis'],
      reportPages: 30,
      followUpSupport: '60-minute strategy session + email support for 90 days'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: true,
      customReporting: true,
      powerBIEmbedded: false,
      apiConnectors: false,
      onSiteFacilitation: false,
      progressAudits: false,
      orgChartGenerator: true,
      scenarioBuilder: true,
      monteCarloSimulation: false,
      realTimeCollaboration: true,
      aiOpportunityAssessment: true,
      aiReadinessScore: false,
      automationRecommendations: true
    },
    guardrails: {
      maxAssessments: 1,
      maxUsers: 10,
      maxScenarios: 5,
      dataRetentionMonths: 18
    }
  },

  'enterprise-transformation': {
    name: 'Enterprise Transformation',
    price: 24000,
    targetCustomer: 'Large enterprises seeking comprehensive transformation with predictive analytics',
    coreDeliverables: [
      '200-question enterprise assessment',
      'Full algorithm suite + Monte Carlo analysis',
      'Power BI dashboard integration',
      'API connectors for data integration',
      'Real-time collaboration platform',
      'Quarterly progress audits',
      'Custom scenario modeling',
      'Unlimited users and assessments',
      'Dedicated support channel'
    ],
    assessmentScope: {
      questionCount: 200,
      sections: [
        'Executive Leadership',
        'Strategic Planning',
        'Operational Excellence',
        'Human Capital Strategy',
        'Technology Architecture',
        'Digital Transformation',
        'Cultural Evolution',
        'Performance Management',
        'Financial Optimization',
        'Risk & Compliance',
        'Innovation Management',
        'Stakeholder Engagement'
      ],
      algorithms: ['DSCH', 'CRF', 'LEI', 'OCI', 'HOCI', 'Monte Carlo', 'Predictive Analytics', 'ROI Modeling'],
      reportPages: 50,
      followUpSupport: 'Dedicated account manager + quarterly strategy sessions'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: true,
      customReporting: true,
      powerBIEmbedded: true,
      apiConnectors: true,
      onSiteFacilitation: true,
      progressAudits: true,
      orgChartGenerator: true,
      scenarioBuilder: true,
      monteCarloSimulation: true,
      realTimeCollaboration: true,
      aiOpportunityAssessment: true,
      aiReadinessScore: false,
      automationRecommendations: true
    },
    guardrails: {
      maxAssessments: null, // Unlimited
      maxUsers: null, // Unlimited
      maxScenarios: null, // Unlimited
      dataRetentionMonths: null // Permanent retention
    }
  }
};

/**
 * Helper Functions for Tier Feature Access
 */

export function hasOrgChartAccess(tier: PricingTier): boolean {
  return PRICING_TIERS[tier].features.orgChartGenerator;
}

export function hasScenarioBuilder(tier: PricingTier): boolean {
  return PRICING_TIERS[tier].features.scenarioBuilder;
}

export function hasRealTimeCollaboration(tier: PricingTier): boolean {
  return PRICING_TIERS[tier].features.realTimeCollaboration;
}

export function getOrgChartCapabilities(tier: PricingTier): {
  canGenerate: boolean;
  canModelScenarios: boolean;
  canCollaborate: boolean;
  maxScenarios?: number;
} {
  const config = PRICING_TIERS[tier];
  return {
    canGenerate: config.features.orgChartGenerator,
    canModelScenarios: config.features.scenarioBuilder,
    canCollaborate: config.features.realTimeCollaboration,
    maxScenarios: config.guardrails.maxScenarios
  };
}

/**
 * Industry-Specific Question Modules
 * Loaded based on organization type and tier
 */
export const INDUSTRY_MODULES = {
  'higher-education': {
    name: 'Higher Education',
    sections: [
      'Academic Programs & Curriculum',
      'Faculty & Instructional Support',
      'Enrollment Management & Admissions',
      'Student Affairs & Success Services',
      'Continuing Education & Workforce Development'
    ],
    specializedQuestions: 45
  },
  'healthcare': {
    name: 'Healthcare',
    sections: [
      'Clinical Operations & Patient Care',
      'Medical Staff & Provider Management',
      'Revenue Cycle & Patient Financial Services',
      'Quality & Patient Safety',
      'Regulatory Compliance & Accreditation'
    ],
    specializedQuestions: 40
  },
  'public-sector': {
    name: 'Public Sector',
    sections: [
      'Public Service Delivery',
      'Regulatory & Compliance Functions',
      'Citizen Engagement & Communications',
      'Intergovernmental Relations',
      'Performance Measurement & Transparency'
    ],
    specializedQuestions: 35
  }
};

/**
 * Algorithm Configuration by Tier
 */
export const TIER_ALGORITHMS = {
  // Organizational Assessment Algorithms
  'one-time-diagnostic': {
    primary: ['OCI', 'HOCI', 'JCI'],
    advanced: [],
    experimental: []
  },
  'monthly-subscription': {
    primary: ['OCI', 'HOCI', 'JCI', 'DSCH'],
    advanced: [],
    experimental: []
  },
  'comprehensive-package': {
    primary: ['OCI', 'HOCI', 'JCI', 'DSCH', 'CRF', 'LEI'],
    advanced: ['Cost-Savings Analysis'],
    experimental: []
  },
  'enterprise-transformation': {
    primary: ['OCI', 'HOCI', 'JCI', 'DSCH', 'CRF', 'LEI'],
    advanced: ['Monte Carlo DSCH', 'Predictive Analytics', 'ROI Modeling'],
    experimental: ['AI-Powered Recommendations', 'Real-time Benchmarking']
  },
  // AI Readiness Assessment Algorithms
  'higher-ed-ai-pulse-check': {
    primary: ['AIRIX'],
    advanced: [],
    experimental: []
  },
  'ai-readiness-comprehensive': {
    primary: ['AIRIX', 'AIRS', 'AICS'],
    advanced: [],
    experimental: []
  },
  'ai-transformation-blueprint': {
    primary: ['AIRIX', 'AIRS', 'AICS', 'AIMS', 'AIPS'],
    advanced: [],
    experimental: []
  },
  'ai-enterprise-partnership': {
    primary: ['AIRIX', 'AIRS', 'AICS', 'AIMS', 'AIPS', 'AIBS'],
    advanced: ['Advanced AI Strategy'],
    experimental: ['Predictive AI Modeling']
  }
};

/**
 * Get tier configuration based on user subscription
 */
export function getTierConfiguration(tier: PricingTier): TierConfiguration | null {
  const config = PRICING_TIERS[tier];
  if (!config) {
    console.warn(`No configuration found for tier: ${tier}`);
    return null;
  }
  return config;
}

/**
 * Determine available algorithms for a tier
 */
export function getAvailableAlgorithms(tier: PricingTier): string[] {
  const config = TIER_ALGORITHMS[tier];
  return [...config.primary, ...config.advanced, ...config.experimental];
}

/**
 * Check if a feature is available for a tier
 */
export function hasFeatureAccess(tier: PricingTier, feature: keyof TierConfiguration['features']): boolean {
  return PRICING_TIERS[tier].features[feature];
}

/**
 * Get industry-specific questions for organization type
 */
export function getIndustryQuestions(organizationType: string, tier: PricingTier): string[] {
  const industryModule = INDUSTRY_MODULES[organizationType as keyof typeof INDUSTRY_MODULES];
  if (!industryModule) return [];
  
  const tierConfig = getTierConfiguration(tier);
  const maxQuestions = Math.min(industryModule.specializedQuestions, tierConfig.assessmentScope.questionCount * 0.3);
  
  return industryModule.sections.slice(0, Math.ceil(maxQuestions / 10));
}

/**
 * Validate tier access and usage limits
 */
export function validateTierAccess(
  tier: PricingTier, 
  usage: {
    assessmentsUsed?: number;
    usersCount?: number;
    scenariosCreated?: number;
  }
): { valid: boolean; message?: string; upgradeRequired?: boolean } {
  const config = getTierConfiguration(tier);
  const { guardrails } = config;
  
  // Check assessment limits
  if (guardrails.maxAssessments && usage.assessmentsUsed && usage.assessmentsUsed > guardrails.maxAssessments) {
    return {
      valid: false,
      message: `Assessment limit reached (${guardrails.maxAssessments}). Upgrade to continue.`,
      upgradeRequired: true
    };
  }
  
  // Check user limits  
  if (guardrails.maxUsers && usage.usersCount && usage.usersCount > guardrails.maxUsers) {
    return {
      valid: false,
      message: `User limit reached (${guardrails.maxUsers}). Upgrade to add more users.`,
      upgradeRequired: true
    };
  }
  
  // Check scenario limits
  if (guardrails.maxScenarios && usage.scenariosCreated && usage.scenariosCreated >= guardrails.maxScenarios) {
    return {
      valid: false,
      message: `Scenario limit reached (${guardrails.maxScenarios}). Upgrade for unlimited scenarios.`,
      upgradeRequired: true
    };
  }
  
  return { valid: true };
}
