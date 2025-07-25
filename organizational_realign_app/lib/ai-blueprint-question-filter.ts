/**
 * Enhanced AI Blueprint Question Filter
 * Filters questions based on tier with support for mixed question types,
 * open-ended questions, and document uploads
 * 
 * @version 2.0.0
 * @author NorthPath Strategies
 */

import type { AIBlueprintTier } from './ai-blueprint-tier-configuration';

export interface QuestionFilter {
  tier: AIBlueprintTier;
  questionCount: number;
  sections: string[];
  priority: 'essential' | 'comprehensive' | 'advanced' | 'enterprise';
  includeDocumentUploads: boolean;
  maxDocumentUploads?: number;
  maxOpenEnded?: number;
  includeScenarios?: boolean;
  includePartnershipPlanning?: boolean;
}

export interface EnhancedQuestion {
  id: string;
  domain: string;
  type: 'multiple_choice' | 'open_ended' | 'file_upload' | 'likert' | 'matrix' | 'ranking';
  tier: 'pulse_check' | 'comprehensive' | 'transformation' | 'enterprise';
  priority: 'essential' | 'high' | 'medium' | 'advanced';
  required: boolean;
  question: string;
  context?: string;
  allowsOpenEnded?: boolean;
  enableTeamResponse?: boolean;
  confidenceTracking?: boolean;
  followUp?: {
    type: string;
    question: string;
    required: boolean;
    maxLength?: number;
  };
  options?: Array<{
    value: string;
    label: string;
    score: number;
  }>;
  maxLength?: number;
  guidelines?: string;
  acceptedFormats?: string[];
  maxFileSize?: string;
  multiple?: boolean;
  maxFiles?: number;
  examples?: string[];
  rows?: Array<{
    id: string;
    label: string;
  }>;
  columns?: Array<{
    value: number;
    label: string;
  }>;
  items?: Array<{
    id: string;
    label: string;
  }>;
}

export const ENHANCED_QUESTION_FILTERS: Record<AIBlueprintTier, QuestionFilter> = {
  'higher-ed-ai-pulse-check': {
    tier: 'higher-ed-ai-pulse-check',
    questionCount: 50,
    sections: ['Strategic Alignment', 'Governance & Policy', 'Faculty Readiness', 'Student AI Use', 'Mission Alignment'],
    priority: 'essential',
    includeDocumentUploads: false,
    maxOpenEnded: 10
  },
  'ai-readiness-comprehensive': {
    tier: 'ai-readiness-comprehensive',
    questionCount: 105,
    sections: ['Strategic Alignment', 'Governance & Policy', 'Faculty Readiness', 'Technology Infrastructure', 'Student AI Use', 'Employee AI Use', 'Organizational Culture', 'Mission Alignment'],
    priority: 'comprehensive',
    includeDocumentUploads: true,
    maxDocumentUploads: 5,
    maxOpenEnded: 25
  },
  'ai-transformation-blueprint': {
    tier: 'ai-transformation-blueprint',
    questionCount: 150,
    sections: ['Strategic Alignment', 'Governance & Policy', 'Faculty Readiness', 'Technology Infrastructure', 'Student AI Use', 'Employee AI Use', 'Organizational Culture', 'Mission Alignment', 'Benchmarking & Standards'],
    priority: 'advanced',
    includeDocumentUploads: true,
    maxDocumentUploads: 10,
    maxOpenEnded: 40,
    includeScenarios: true
  },
  'ai-enterprise-partnership': {
    tier: 'ai-enterprise-partnership',
    questionCount: 200,
    sections: ['Strategic Alignment', 'Governance & Policy', 'Faculty Readiness', 'Technology Infrastructure', 'Student AI Use', 'Employee AI Use', 'Organizational Culture', 'Mission Alignment', 'Benchmarking & Standards'],
    priority: 'enterprise',
    includeDocumentUploads: true,
    maxDocumentUploads: 20,
    maxOpenEnded: 60,
    includeScenarios: true,
    includePartnershipPlanning: true
  }
};

/**
 * Filter questions based on tier requirements with enhanced support
 */
export function getEnhancedQuestionsForTier(tier: AIBlueprintTier, allQuestions: EnhancedQuestion[]): EnhancedQuestion[] {
  const filter = ENHANCED_QUESTION_FILTERS[tier];
  const targetCount = filter.questionCount;
  
  // Map tier names to question tier values
  const tierMapping = {
    'higher-ed-ai-pulse-check': ['pulse_check'],
    'ai-readiness-comprehensive': ['pulse_check', 'comprehensive'],
    'ai-transformation-blueprint': ['pulse_check', 'comprehensive', 'transformation'],
    'ai-enterprise-partnership': ['pulse_check', 'comprehensive', 'transformation', 'enterprise']
  };
  
  const allowedTiers = tierMapping[tier] || ['pulse_check'];
  
  // For lower tiers, we need precise filtering to match exact counts
  if (tier === 'higher-ed-ai-pulse-check') {
    // Only use pulse_check questions and prioritize essential
    const tierQuestions = allQuestions.filter(q => q.tier === 'pulse_check');
    const essentialQuestions = tierQuestions.filter(q => q.priority === 'essential');
    const highQuestions = tierQuestions.filter(q => q.priority === 'high');
    
    // Fill to exactly 50 questions
    const selectedQuestions = [];
    selectedQuestions.push(...essentialQuestions);
    
    if (selectedQuestions.length < targetCount) {
      const remainingSlots = targetCount - selectedQuestions.length;
      selectedQuestions.push(...highQuestions.slice(0, remainingSlots));
    }
    
    // If still not enough, add any remaining pulse_check questions
    if (selectedQuestions.length < targetCount) {
      const remaining = tierQuestions.filter(q => !selectedQuestions.includes(q));
      const remainingSlots = targetCount - selectedQuestions.length;
      selectedQuestions.push(...remaining.slice(0, remainingSlots));
    }
    
    return selectedQuestions.slice(0, targetCount);
  }
  
  if (tier === 'ai-readiness-comprehensive') {
    // Use pulse_check + comprehensive questions
    const pulseQuestions = allQuestions.filter(q => q.tier === 'pulse_check');
    const comprehensiveQuestions = allQuestions.filter(q => q.tier === 'comprehensive');
    
    const selectedQuestions = [];
    selectedQuestions.push(...pulseQuestions); // All pulse check questions (should be ~50)
    
    // Add comprehensive questions to reach 105
    const remainingSlots = targetCount - selectedQuestions.length;
    selectedQuestions.push(...comprehensiveQuestions.slice(0, remainingSlots));
    
    return selectedQuestions.slice(0, targetCount);
  }
  
  if (tier === 'ai-transformation-blueprint') {
    // Use pulse_check + comprehensive + transformation questions
    const pulseQuestions = allQuestions.filter(q => q.tier === 'pulse_check');
    const comprehensiveQuestions = allQuestions.filter(q => q.tier === 'comprehensive');
    const transformationQuestions = allQuestions.filter(q => q.tier === 'transformation');
    
    const selectedQuestions = [];
    selectedQuestions.push(...pulseQuestions); // ~50
    selectedQuestions.push(...comprehensiveQuestions); // ~55 more (105 total)
    
    // Add transformation questions to reach 150
    const remainingSlots = targetCount - selectedQuestions.length;
    selectedQuestions.push(...transformationQuestions.slice(0, remainingSlots));
    
    return selectedQuestions.slice(0, targetCount);
  }
  
  // For enterprise tier, use all questions up to 200
  const tierQuestions = allQuestions.filter(q => 
    allowedTiers.includes(q.tier)
  );
  
  return tierQuestions.slice(0, targetCount);
}

/**
 * Balance question types for optimal assessment quality
 */
function balanceQuestionTypes(questions: EnhancedQuestion[], filter: QuestionFilter): EnhancedQuestion[] {
  const questionsByType = groupBy(questions, 'type');
  const balanced: EnhancedQuestion[] = [];
  
  // Always include essential questions first
  const essentialQuestions = questions.filter(q => q.priority === 'essential');
  balanced.push(...essentialQuestions);
  
  // Add strategic mix of question types
  const remainingSlots = filter.questionCount - balanced.length;
  const typeDistribution = {
    multiple_choice: Math.floor(remainingSlots * 0.4), // 40% multiple choice
    open_ended: Math.min(filter.maxOpenEnded || 20, Math.floor(remainingSlots * 0.3)), // 30% open-ended (capped)
    matrix: Math.floor(remainingSlots * 0.15), // 15% matrix
    ranking: Math.floor(remainingSlots * 0.10), // 10% ranking
    file_upload: filter.includeDocumentUploads ? (filter.maxDocumentUploads || 5) : 0, // Document uploads
    likert: Math.floor(remainingSlots * 0.05) // 5% likert
  };
  
  // Add questions by type according to distribution
  Object.entries(typeDistribution).forEach(([type, count]) => {
    const availableQuestions = questionsByType[type]?.filter(q => !balanced.includes(q)) || [];
    const questionsToAdd = availableQuestions.slice(0, count);
    balanced.push(...questionsToAdd);
  });
  
  // Fill remaining slots with any available questions
  const remainingQuestions = questions.filter(q => !balanced.includes(q));
  const slotsLeft = filter.questionCount - balanced.length;
  balanced.push(...remainingQuestions.slice(0, slotsLeft));
  
  return balanced;
}

/**
 * Group array by property
 */
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const value = String(item[key]);
    groups[value] = groups[value] || [];
    groups[value].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Validate question count matches tier promise
 */
export function validateTierQuestionCount(tier: AIBlueprintTier, questionCount: number): boolean {
  const expectedCount = ENHANCED_QUESTION_FILTERS[tier].questionCount;
  return questionCount === expectedCount;
}

/**
 * Get question count promise for tier
 */
export function getExpectedQuestionCount(tier: AIBlueprintTier): number {
  return ENHANCED_QUESTION_FILTERS[tier].questionCount;
}

/**
 * Get question type distribution for tier
 */
export function getQuestionTypeDistribution(tier: AIBlueprintTier): Record<string, number> {
  const filter = ENHANCED_QUESTION_FILTERS[tier];
  return {
    total: filter.questionCount,
    documentUploads: filter.includeDocumentUploads ? (filter.maxDocumentUploads || 0) : 0,
    openEnded: filter.maxOpenEnded || 0,
    scenarios: filter.includeScenarios ? 3 : 0,
    partnershipPlanning: filter.includePartnershipPlanning ? 2 : 0
  };
}
