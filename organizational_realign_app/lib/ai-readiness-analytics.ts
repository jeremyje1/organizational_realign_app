import { trackEvent } from '@/lib/analytics-events';

/**
 * Enhanced analytics tracking for AI Readiness Assessment
 */
export class AIReadinessAnalytics {
  private sessionId: string;
  private startTime: Date;
  private assessmentId: string;

  constructor(assessmentId?: string) {
    this.sessionId = `ai_readiness_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.startTime = new Date();
    this.assessmentId = assessmentId || this.sessionId;
  }

  /**
   * Track assessment start
   */
  trackAssessmentStart(institutionInfo: {
    name: string;
    type: string;
    enrollmentSize: string;
    isTeamMode: boolean;
    teamSize?: number;
  }) {
    trackEvent('ai_readiness_assessment_started', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      institution_type: institutionInfo.type,
      enrollment_size: institutionInfo.enrollmentSize,
      is_team_mode: institutionInfo.isTeamMode,
      team_size: institutionInfo.teamSize || 1,
      timestamp: new Date().toISOString()
    });

    trackEvent('ai_readiness_user_action', {
      action: 'start',
      target: 'ai_readiness_assessment',
      institution_name: institutionInfo.name,
      institution_type: institutionInfo.type
    });
  }

  /**
   * Track section completion
   */
  trackSectionCompletion(sectionName: string, metrics: {
    questionsAnswered: number;
    totalQuestions: number;
    timeSpent: number;
    averageConfidence?: number;
    teamResponses?: number;
  }) {
    trackEvent('ai_readiness_section_completed', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      section_name: sectionName,
      questions_answered: metrics.questionsAnswered,
      total_questions: metrics.totalQuestions,
      completion_rate: (metrics.questionsAnswered / metrics.totalQuestions) * 100,
      time_spent_seconds: metrics.timeSpent,
      average_confidence: metrics.averageConfidence,
      team_responses: metrics.teamResponses || 0,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track question response
   */
  trackQuestionResponse(questionData: {
    questionId: string;
    section: string;
    questionType: string;
    responseTime: number;
    confidence?: number;
    hasContext: boolean;
    isTeamResponse: boolean;
    userId?: string;
  }) {
    trackEvent('ai_readiness_question_answered', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      question_id: questionData.questionId,
      section: questionData.section,
      question_type: questionData.questionType,
      response_time_seconds: questionData.responseTime,
      confidence_level: questionData.confidence,
      has_additional_context: questionData.hasContext,
      is_team_response: questionData.isTeamResponse,
      user_id: questionData.userId,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track team collaboration events
   */
  trackTeamCollaboration(eventType: 'member_added' | 'member_removed' | 'role_changed' | 'consensus_reached', data: {
    teamSize: number;
    memberRole?: string;
    questionId?: string;
    consensusTime?: number;
  }) {
    trackEvent('ai_readiness_team_collaboration', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      event_type: eventType,
      team_size: data.teamSize,
      member_role: data.memberRole,
      question_id: data.questionId,
      consensus_time_seconds: data.consensusTime,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track navigation patterns
   */
  trackNavigation(action: 'next' | 'previous' | 'jump' | 'save_draft', fromStep: number, toStep: number) {
    trackEvent('ai_readiness_navigation', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      action: action,
      target: 'ai_readiness_navigation',
      from_step: fromStep,
      to_step: toStep,
      direction: toStep > fromStep ? 'forward' : 'backward',
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track engagement metrics
   */
  trackEngagement(metrics: {
    timeOnStep: number;
    scrollDepth: number;
    interactionCount: number;
    helpViewCount: number;
    contextAdditions: number;
  }) {
    trackEvent('ai_readiness_engagement', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      time_on_step_seconds: metrics.timeOnStep,
      scroll_depth_percentage: metrics.scrollDepth,
      interaction_count: metrics.interactionCount,
      help_views: metrics.helpViewCount,
      context_additions: metrics.contextAdditions,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track validation errors
   */
  trackValidationError(errorData: {
    questionId: string;
    errorType: string;
    errorMessage: string;
    attemptNumber: number;
  }) {
    trackEvent('ai_readiness_validation_error', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      question_id: errorData.questionId,
      error_type: errorData.errorType,
      error_message: errorData.errorMessage,
      attempt_number: errorData.attemptNumber,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track auto-save events
   */
  trackAutoSave(saveData: {
    stepNumber: number;
    questionsCompleted: number;
    dataSize: number;
    saveTime: number;
    isSuccessful: boolean;
  }) {
    trackEvent('ai_readiness_auto_save', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      step_number: saveData.stepNumber,
      questions_completed: saveData.questionsCompleted,
      data_size_bytes: saveData.dataSize,
      save_time_ms: saveData.saveTime,
      is_successful: saveData.isSuccessful,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track assessment completion
   */
  trackCompletion(scoreResults: any, tier: string) {
    trackEvent('ai_readiness_completion', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      action: 'complete',
      target: 'ai_readiness_assessment',
      score: scoreResults?.overallScore || 0,
      tier,
      completion_rate: 100,
      domains: scoreResults?.domainScores || {},
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track file uploads
   */
  trackFileUpload(uploadData: {
    questionId: string;
    fileType: string;
    fileSize: number;
    uploadTime: number;
    isSuccessful: boolean;
  }) {
    trackEvent('ai_readiness_file_upload', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      question_id: uploadData.questionId,
      file_type: uploadData.fileType,
      file_size_bytes: uploadData.fileSize,
      upload_time_ms: uploadData.uploadTime,
      is_successful: uploadData.isSuccessful,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track assessment abandonment
   */
  trackAssessmentAbandonment(abandonmentData: {
    stepNumber: number;
    questionsCompleted: number;
    timeSpent: number;
    lastAction: string;
  }) {
    const totalTime = (new Date().getTime() - this.startTime.getTime()) / 1000 / 60; // minutes

    trackEvent('ai_readiness_assessment_abandoned', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      step_number: abandonmentData.stepNumber,
      questions_completed: abandonmentData.questionsCompleted,
      time_spent_minutes: totalTime,
      last_action: abandonmentData.lastAction,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track tier interactions
   */
  trackTierInteraction(interactionType: 'feature_locked' | 'upgrade_prompt' | 'tier_limit_reached', data: {
    currentTier: string;
    featureRequested: string;
    upgradeAction?: 'dismissed' | 'clicked' | 'completed';
  }) {
    trackEvent('ai_readiness_tier_interaction', {
      assessment_id: this.assessmentId,
      session_id: this.sessionId,
      interaction_type: interactionType,
      current_tier: data.currentTier,
      feature_requested: data.featureRequested,
      upgrade_action: data.upgradeAction,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Get session summary
   */
  getSessionSummary() {
    return {
      assessmentId: this.assessmentId,
      sessionId: this.sessionId,
      startTime: this.startTime.toISOString(),
      duration: new Date().getTime() - this.startTime.getTime()
    };
  }
}

/**
 * Hook for using AI readiness analytics
 */
export function useAIReadinessAnalytics(assessmentId?: string) {
  const analytics = new AIReadinessAnalytics(assessmentId);
  
  return {
    trackAssessmentStart: analytics.trackAssessmentStart.bind(analytics),
    trackSectionCompletion: analytics.trackSectionCompletion.bind(analytics),
    trackQuestionResponse: analytics.trackQuestionResponse.bind(analytics),
    trackTeamCollaboration: analytics.trackTeamCollaboration.bind(analytics),
    trackNavigation: analytics.trackNavigation.bind(analytics),
    trackEngagement: analytics.trackEngagement.bind(analytics),
    trackValidationError: analytics.trackValidationError.bind(analytics),
    trackAutoSave: analytics.trackAutoSave.bind(analytics),
    trackAssessmentCompletion: analytics.trackCompletion.bind(analytics),
    trackSectionCompleted: analytics.trackSectionCompletion.bind(analytics),
    getSessionSummary: analytics.getSessionSummary.bind(analytics)
  };
}
