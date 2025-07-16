/**
 * Tier-Based Assessment Configuration
 * Aligns assessment depth and algorithms with pricing tiers
 * 
 * @version 1.0.0
 * @author NorthPath Strategies
 */

export type PricingTier = 'one-time-diagnostic' | 'monthly-subscription' | 'comprehensive-package' | 'enterprise-transformation';

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
  'one-time-diagnostic': {
    name: 'One-Time Diagnostic',
    price: 4995,
    targetCustomer: 'Single-campus college, small hospital, department pilot',
    coreDeliverables: [
      '100+ comprehensive assessment questions (Likert, numeric, text, upload)',
      'Secure file upload capability',
      'One-click interactive org chart generator',
      '15-page comprehensive PDF analysis',
      'AI opportunity identification and readiness scoring',
      'Basic automation recommendations',
      'Scenario cost comparison with ROI projections',
      'DSCH / CRF / LEI algorithm analysis',
      '45-min strategy consultation call'
    ],
    assessmentScope: {
      questionCount: 105, // 100 core + 5 contextual questions minimum
      sections: [
        'Governance & Leadership', 
        'Administrative Processes & Communication',
        'Structure, Capacity & Performance',
        'Professional Development & Support',
        'Technology & Digital Infrastructure',
        'AI & Automation Opportunities',
        'Organization-Specific Operations (Academic/Clinical/Program/Business/Public Service)'
      ],
      algorithms: ['DSCH', 'CRF', 'LEI', 'OREA'],
      reportPages: 15,
      followUpSupport: '45-min strategy consultation'
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
      aiReadinessScore: true,
      automationRecommendations: true
    },
    guardrails: {
      maxAssessments: 1,
      maxUsers: 3,
      dataRetentionMonths: 6
    }
  },

  'monthly-subscription': {
    name: 'Monthly Subscription',
    price: 2995,
    targetCustomer: 'Schools with multiple programs or departments iterating every term',
    coreDeliverables: [
      'Unlimited assessments per month',
      'One-click org chart with advanced analytics',
      'Dashboard refresh (CSV exports)',
      'Enhanced AI opportunity analysis with departmental breakdown',
      'Automation ROI modeling and priority scoring',
      'Multi-scenario cost modeling',
      '60-min office-hours call / mo'
    ],
    assessmentScope: {
      questionCount: 120,
      sections: ['All basic sections plus Faculty & Instructional Support', 'Student Affairs & Success Services'],
      algorithms: ['OCI', 'HOCI', 'JCI', 'DSCH'],
      reportPages: 15,
      followUpSupport: '60-min monthly office hours'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: true,
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
      aiReadinessScore: true,
      automationRecommendations: true
    },
    guardrails: {
      maxUsers: 10,
      maxScenarios: 5,
      dataRetentionMonths: 12
    }
  },

  'comprehensive-package': {
    name: 'Comprehensive Package',
    price: 9900,
    targetCustomer: 'Mid-sized institutions needing board-ready narrative',
    coreDeliverables: [
      'Everything in Monthly, plus',
      'One-click org chart with scenario modeling',
      '25–30 page PDF w/ AI narrative',
      'Comprehensive AI transformation roadmap',
      'Process automation feasibility analysis',
      'AI readiness maturity model assessment',
      '90-min strategy session',
      'Cost-saving ranges (static model)',
      'Advanced scenario builder'
    ],
    assessmentScope: {
      questionCount: 150,
      sections: ['All sections including IT & Digital Learning', 'Facilities & Campus Operations', 'Institutional Research'],
      algorithms: ['OCI', 'HOCI', 'JCI', 'DSCH', 'CRF', 'LEI'],
      reportPages: 30,
      followUpSupport: '90-min strategy session'
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
      scenarioBuilder: true, // Add-on available
      monteCarloSimulation: false,
      realTimeCollaboration: false,
      aiOpportunityAssessment: true,
      aiReadinessScore: true,
      automationRecommendations: true
    },
    guardrails: {
      maxUsers: 25,
      maxScenarios: 15,
      dataRetentionMonths: 24
    }
  },

  'enterprise-transformation': {
    name: 'Enterprise Transformation',
    price: 24000,
    targetCustomer: 'Multi-campus systems, hospital networks, public agencies',
    coreDeliverables: [
      'Everything in Comprehensive, plus',
      'One-click real-time collaborative org charts',
      'Unlimited scenario builder',
      'Power BI embedded live dashboard',
      'API & flat-file connectors',
      'Advanced AI transformation strategy with predictive modeling',
      'Real-time automation opportunity detection',
      'AI-powered workforce planning and optimization',
      'On-site or virtual facilitation day',
      'Quarterly progress audits (4)'
    ],
    assessmentScope: {
      questionCount: 200,
      sections: ['All sections plus specialized industry modules'],
      algorithms: ['All algorithms including Monte Carlo, Advanced DSCH, Predictive Analytics'],
      reportPages: 50,
      followUpSupport: 'Quarterly progress audits + facilitation'
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
      aiReadinessScore: true,
      automationRecommendations: true
    },
    guardrails: {
      dataRetentionMonths: 60
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
  }
};

/**
 * Get tier configuration based on user subscription
 */
export function getTierConfiguration(tier: PricingTier): TierConfiguration {
  return PRICING_TIERS[tier];
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
