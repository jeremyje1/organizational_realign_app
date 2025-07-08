// filepath: /analytics/gtm-datalayer.ts
// Central event emitter for analytics (GA4, GTM, Mixpanel, BigQuery)

declare global {
  interface Window {
    dataLayer: any[];
    mixpanel?: any;
  }
}

export type AnalyticsEvent =
  | 'assessment_start'
  | 'assessment_step_complete'
  | 'assessment_submit'
  | 'service_tier_checkout'
  | 'pdf_download'
  | 'step_navigate'
  | 'autosave'
  | 'manual_save'
  | 'flag_for_followup'
  | 'consultation_request'
  | 'page_view'
  | 'user_segment_selected'
  | 'ab_test_registered'
  | 'ab_test_assignment'
  | 'ab_test_conversion'
  | 'realtime_auth'
  | 'realtime_room_join'
  | 'realtime_collaboration';

export interface AnalyticsPayload {
  // Core properties
  event_timestamp?: number;
  user_id?: string;
  session_id?: string;
  page_url?: string;
  
  // Assessment-specific
  step?: number;
  step_name?: string;
  duration?: number;
  score?: number;
  tier?: string;
  segment?: string;
  
  // Engagement
  scroll_depth?: number;
  time_on_page?: number;
  
  // Business
  service_tier?: string;
  value?: number;
  
  // Technical
  user_agent?: string;
  viewport_size?: string;
  
  [key: string]: any;
}

export interface AnalyticsConfig {
  gtmId?: string;
  ga4Id?: string;
  mixpanelToken?: string;
  bigQueryEnabled?: boolean;
  debugMode?: boolean;
}

class AnalyticsManager {
  private config: AnalyticsConfig;
  private isInitialized = false;
  private eventQueue: Array<{ event: AnalyticsEvent; payload?: AnalyticsPayload }> = [];

  constructor(config: AnalyticsConfig = {}) {
    this.config = config;
  }

  initialize() {
    if (typeof window === 'undefined' || this.isInitialized) return;

    // Initialize GTM/GA4
    if (this.config.gtmId) {
      this.initializeGTM();
    }

    // Initialize Mixpanel
    if (this.config.mixpanelToken) {
      this.initializeMixpanel();
    }

    this.isInitialized = true;
    this.flushEventQueue();
  }

  private initializeGTM() {
    window.dataLayer = window.dataLayer || [];
    // GTM script loading would happen here in production
    if (this.config.debugMode) {
      console.log('[Analytics] GTM initialized with ID:', this.config.gtmId);
    }
  }

  private initializeMixpanel() {
    // Mixpanel script loading would happen here in production
    if (this.config.debugMode) {
      console.log('[Analytics] Mixpanel initialized with token:', this.config.mixpanelToken);
    }
  }

  private flushEventQueue() {
    while (this.eventQueue.length > 0) {
      const { event, payload } = this.eventQueue.shift()!;
      this.emitEvent(event, payload);
    }
  }

  emitEvent(event: AnalyticsEvent, payload?: AnalyticsPayload) {
    if (!this.isInitialized && typeof window !== 'undefined') {
      this.eventQueue.push({ event, payload });
      return;
    }

    const enrichedPayload = this.enrichPayload(payload);

    // Send to GTM/GA4
    this.sendToGTM(event, enrichedPayload);

    // Send to Mixpanel
    this.sendToMixpanel(event, enrichedPayload);

    // Send to BigQuery (via server endpoint)
    if (this.config.bigQueryEnabled) {
      this.sendToBigQuery(event, enrichedPayload);
    }

    if (this.config.debugMode) {
      console.log('[Analytics Event]', event, enrichedPayload);
    }
  }

  private enrichPayload(payload?: AnalyticsPayload): AnalyticsPayload {
    const basePayload: AnalyticsPayload = {
      event_timestamp: Date.now(),
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      viewport_size: typeof window !== 'undefined' 
        ? `${window.innerWidth}x${window.innerHeight}` 
        : undefined,
      ...payload
    };

    return basePayload;
  }

  private sendToGTM(event: AnalyticsEvent, payload: AnalyticsPayload) {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event,
        ...payload
      });
    }
  }

  private sendToMixpanel(event: AnalyticsEvent, payload: AnalyticsPayload) {
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.track(event, payload);
    }
  }

  private async sendToBigQuery(event: AnalyticsEvent, payload: AnalyticsPayload) {
    try {
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, payload })
      });
    } catch (error) {
      console.error('[Analytics] Failed to send to BigQuery:', error);
    }
  }

  // Convenience methods for common events
  trackPageView(page: string, additionalData?: AnalyticsPayload) {
    this.emitEvent('page_view', { page, ...additionalData });
  }

  trackAssessmentStart(segment?: string) {
    this.emitEvent('assessment_start', { 
      step: 1,
      segment,
      funnel_stage: 'assessment_start'
    });
  }

  trackStepComplete(step: number, stepName: string, duration: number) {
    this.emitEvent('assessment_step_complete', {
      step,
      step_name: stepName,
      duration,
      funnel_stage: 'assessment_progress'
    });
  }

  trackAssessmentSubmit(score: number, tier: string, segment: string) {
    this.emitEvent('assessment_submit', {
      score,
      tier,
      segment,
      funnel_stage: 'assessment_complete'
    });
  }

  trackServiceTierCheckout(tier: string, value: number) {
    this.emitEvent('service_tier_checkout', {
      service_tier: tier,
      value,
      funnel_stage: 'checkout'
    });
  }

  trackPDFDownload(docType: string) {
    this.emitEvent('pdf_download', {
      doc: docType,
      funnel_stage: 'collateral_download'
    });
  }

  trackFlagForFollowup(questionId: string, step: number) {
    this.emitEvent('flag_for_followup', {
      question_id: questionId,
      step,
      funnel_stage: 'engagement'
    });
  }

  trackConsultationRequest(tier: string) {
    this.emitEvent('consultation_request', {
      service_tier: tier,
      funnel_stage: 'consultation_request'
    });
  }
}

// Singleton instance
const analytics = new AnalyticsManager({
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  bigQueryEnabled: process.env.NEXT_PUBLIC_ANALYTICS_BIGQUERY === 'true',
  debugMode: process.env.NODE_ENV === 'development'
});

// Legacy export for backward compatibility
export function emitAnalyticsEvent(event: AnalyticsEvent, payload?: AnalyticsPayload) {
  analytics.emitEvent(event, payload);
}

export { analytics };
export default analytics;
