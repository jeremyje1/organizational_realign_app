/**
 * AI Blueprint Tier Configuration
 * Completely separate configuration for AI Blueprint services
 * 
 * @version 1.0.0
 * @author NorthPath Strategies
 */

export type AIBlueprintTier = 'higher-ed-ai-pulse-check' | 'ai-readiness-comprehensive' | 'ai-transformation-blueprint' | 'ai-enterprise-partnership';

export interface AIBlueprintTierConfiguration {
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
  };
  features: {
    uploadSupport: boolean;
    dashboardRefresh: boolean;
    customReporting: boolean;
    policyGeneration: boolean;
    scenarioBuilder: boolean;
    realTimeCollaboration: boolean;
    aiReadinessScore: boolean;
    institutionalBenchmarking: boolean;
    facultyEnablement: boolean;
    implementationCoaching: boolean;
    officeHours: boolean;
    slackSupport: boolean;
    quarterlyReassessment: boolean;
  };
  guardrails: {
    maxAssessments?: number;
    maxUsers?: number;
    maxScenarios?: number;
    dataRetentionMonths: number;
  };
}

export const AI_BLUEPRINT_PRICING_TIERS: Record<AIBlueprintTier, AIBlueprintTierConfiguration> = {
  'higher-ed-ai-pulse-check': {
    name: 'Higher Ed AI Pulse Check',
    price: 2000,
    targetCustomer: 'Individual departments or small teams wanting a quick AI readiness snapshot',
    coreDeliverables: [
      '50-question streamlined AI readiness assessment',
      'AI-generated quick insights report (8-10 pages)',
      'AIRIX™ core algorithm analysis',
      'Essential AI readiness scoring across 6 domains',
      'Basic AI implementation recommendations'
    ],
    assessmentScope: {
      questionCount: 50,
      sections: ['Strategic Alignment', 'Governance & Policy', 'Faculty Readiness', 'Technology Infrastructure', 'Academic Integrity', 'Mission Alignment'],
      algorithms: ['AIRIX™'],
      reportPages: 10,
      followUpSupport: 'Email support'
    },
    features: {
      uploadSupport: false,
      dashboardRefresh: false,
      customReporting: false,
      policyGeneration: false,
      scenarioBuilder: false,
      realTimeCollaboration: false,
      aiReadinessScore: true,
      institutionalBenchmarking: false,
      facultyEnablement: false,
      implementationCoaching: false,
      officeHours: false,
      slackSupport: false,
      quarterlyReassessment: false
    },
    guardrails: {
      maxAssessments: 1,
      maxUsers: 2,
      dataRetentionMonths: 12
    }
  },
    'ai-readiness-comprehensive': {
    name: 'AI Readiness Comprehensive',
    price: 4995,
    targetCustomer: 'Mid-size institutions seeking comprehensive AI readiness analysis',
    coreDeliverables: [
      '105-question comprehensive AI readiness assessment',
      'AI-enhanced analysis and recommendations',
      '25-page detailed AI readiness report',
      'AIRIX™, AIRS™, AICS™ algorithm analysis',
      'Strategic document upload & AI analysis',
      '30-minute strategy consultation'
    ],
    assessmentScope: {
      questionCount: 105,
      sections: ['Strategic Alignment', 'Governance & Policy', 'Faculty Readiness', 'Technology Infrastructure', 'Academic Integrity', 'Organizational Culture', 'Implementation Planning', 'Mission Alignment'],
      algorithms: ['AIRIX™', 'AIRS™', 'AICS™'],
      reportPages: 25,
      followUpSupport: '30-minute strategy consultation'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: true,
      customReporting: true,
      policyGeneration: false,
      scenarioBuilder: false,
      realTimeCollaboration: true,
      aiReadinessScore: true,
      institutionalBenchmarking: true,
      facultyEnablement: false,
      implementationCoaching: false,
      officeHours: false,
      slackSupport: false,
      quarterlyReassessment: false
    },
    guardrails: {
      maxAssessments: 1,
      maxUsers: 5,
      dataRetentionMonths: 24
    }
  },
  'ai-transformation-blueprint': {
    name: 'AI Transformation Blueprint',
    price: 24500,
    targetCustomer: 'Large institutions ready for comprehensive AI transformation with implementation support',
    coreDeliverables: [
      '150-question in-depth AI assessment',
      'AI-generated comprehensive narrative reports',
      '40-page AI Transformation Blueprint™',
      'AIRIX™, AIRS™, AICS™, AIMS™, AIPS™ algorithm analysis',
      'Advanced AI scenario builder',
      'Custom AI policy recommendations',
      '60-minute AI implementation consulting session'
    ],
    assessmentScope: {
      questionCount: 150,
      sections: ['Strategic Alignment', 'Governance & Policy', 'Faculty Readiness', 'Technology Infrastructure', 'Academic Integrity', 'Organizational Culture', 'Implementation Planning', 'Mission Alignment', 'Benchmarking & Standards'],
      algorithms: ['AIRIX™', 'AIRS™', 'AICS™', 'AIMS™', 'AIPS™'],
      reportPages: 40,
      followUpSupport: '60-minute AI implementation consulting session'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: true,
      customReporting: true,
      policyGeneration: true,
      scenarioBuilder: true,
      realTimeCollaboration: true,
      aiReadinessScore: true,
      institutionalBenchmarking: true,
      facultyEnablement: true,
      implementationCoaching: false,
      officeHours: false,
      slackSupport: false,
      quarterlyReassessment: false
    },
    guardrails: {
      maxAssessments: 1,
      maxUsers: 15,
      maxScenarios: 10,
      dataRetentionMonths: 36
    }
  },
  'ai-enterprise-partnership': {
    name: 'Enterprise Partnership',
    price: 75000,
    targetCustomer: 'Large university systems requiring ongoing AI transformation partnership and support',
    coreDeliverables: [
      'Full AI Transformation Blueprint™ included',
      '200-question comprehensive AI diagnostic',
      'Quarterly AI readiness re-assessments',
      'AIRIX™, AIRS™, AICS™, AIMS™, AIPS™, AIBS™ full algorithm suite',
      'Faculty micro-credential cohort program',
      'Dedicated Slack advisory channel',
      'Monthly strategy office hours',
      'Custom policy development & updates'
    ],
    assessmentScope: {
      questionCount: 200,
      sections: ['Strategic Alignment', 'Governance & Policy', 'Faculty Readiness', 'Technology Infrastructure', 'Academic Integrity', 'Organizational Culture', 'Implementation Planning', 'Mission Alignment', 'Benchmarking & Standards'],
      algorithms: ['AIRIX™', 'AIRS™', 'AICS™', 'AIMS™', 'AIPS™', 'AIBS™'],
      reportPages: 50,
      followUpSupport: 'Monthly strategy office hours and ongoing partnership'
    },
    features: {
      uploadSupport: true,
      dashboardRefresh: true,
      customReporting: true,
      policyGeneration: true,
      scenarioBuilder: true,
      realTimeCollaboration: true,
      aiReadinessScore: true,
      institutionalBenchmarking: true,
      facultyEnablement: true,
      implementationCoaching: true,
      officeHours: true,
      slackSupport: true,
      quarterlyReassessment: true
    },
    guardrails: {
      dataRetentionMonths: 60
    }
  }
};

/**
 * Get AI Blueprint features available to user's tier
 */
export function getAIBlueprintTierFeatures(tier: AIBlueprintTier) {
  return AI_BLUEPRINT_PRICING_TIERS[tier];
}
