/**
 * A/B Testing Framework - Advanced Component Variant Testing
 * Provides comprehensive A/B testing capabilities with analytics integration
 */

import React, { useState, useEffect, useMemo } from 'react';
import { analytics } from '@/analytics/gtm-datalayer';

// A/B Test Configuration Types
export interface ABTestConfig {
  testId: string;
  name: string;
  description?: string;
  variants: ABVariant[];
  trafficAllocation: number; // 0-1, percentage of users to include in test
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate?: Date;
  endDate?: Date;
  targetMetrics: string[];
  segmentRules?: SegmentRule[];
  minSampleSize?: number;
  confidenceLevel?: number;
}

export interface ABVariant {
  id: string;
  name: string;
  weight: number; // 0-100, percentage of test traffic
  isControl?: boolean;
  metadata?: Record<string, any>;
}

export interface SegmentRule {
  property: string;
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'in' | 'not_in';
  value: any;
}

export interface ABTestAssignment {
  testId: string;
  variantId: string;
  assignedAt: Date;
  userId?: string;
  sessionId: string;
  segment?: Record<string, any>;
}

export interface ConversionEvent {
  testId: string;
  variantId: string;
  eventType: string;
  value?: number;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

// A/B Testing Manager Class
class ABTestingManager {
  private assignments: Map<string, ABTestAssignment> = new Map();
  private tests: Map<string, ABTestConfig> = new Map();
  private localStorage: Storage | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.localStorage = window.localStorage;
      this.loadAssignments();
    }
  }

  // Register a new A/B test
  registerTest(config: ABTestConfig): void {
    // Validate test configuration
    this.validateTestConfig(config);
    this.tests.set(config.testId, config);
    
    // Track test registration
    analytics.emitEvent('ab_test_registered', {
      test_id: config.testId,
      test_name: config.name,
      variant_count: config.variants.length
    });
  }

  // Get variant assignment for a test
  getVariant(testId: string, userId?: string): string | null {
    const test = this.tests.get(testId);
    if (!test || test.status !== 'active') {
      return null;
    }

    // Check if user should be included in test
    if (!this.shouldIncludeInTest(test)) {
      return null;
    }

    // Get existing assignment or create new one
    const assignmentKey = `${testId}_${userId || this.getSessionId()}`;
    let assignment = this.assignments.get(assignmentKey);

    if (!assignment) {
      assignment = this.createAssignment(test, userId);
      if (assignment) {
        this.assignments.set(assignmentKey, assignment);
        this.saveAssignments();
        
        // Track assignment
        analytics.emitEvent('ab_test_assignment', {
          test_id: testId,
          variant_id: assignment.variantId,
          user_id: userId,
          session_id: assignment.sessionId
        });
      }
    }

    return assignment?.variantId || null;
  }

  // Track conversion event
  trackConversion(
    testId: string, 
    eventType: string, 
    value?: number, 
    metadata?: Record<string, any>
  ): void {
    const assignment = this.getAssignmentForTest(testId);
    if (!assignment) return;

    const conversionEvent: ConversionEvent = {
      testId,
      variantId: assignment.variantId,
      eventType,
      value,
      timestamp: new Date(),
      userId: assignment.userId,
      sessionId: assignment.sessionId,
      metadata
    };

    // Store locally and send to analytics
    this.storeConversion(conversionEvent);
    
    analytics.emitEvent('ab_test_conversion', {
      test_id: testId,
      variant_id: assignment.variantId,
      event_type: eventType,
      value,
      ...metadata
    });
  }

  // Get test results and statistical significance
  async getTestResults(testId: string): Promise<ABTestResults | null> {
    const test = this.tests.get(testId);
    if (!test) return null;

    // In a real implementation, this would fetch from analytics backend
    const results = await this.calculateTestResults(testId);
    return results;
  }

  // Private methods
  private validateTestConfig(config: ABTestConfig): void {
    if (!config.testId || !config.name || !config.variants.length) {
      throw new Error('Invalid A/B test configuration');
    }

    const totalWeight = config.variants.reduce((sum, v) => sum + v.weight, 0);
    if (Math.abs(totalWeight - 100) > 0.01) {
      throw new Error('Variant weights must sum to 100');
    }

    const controlVariants = config.variants.filter(v => v.isControl);
    if (controlVariants.length !== 1) {
      throw new Error('Exactly one variant must be marked as control');
    }
  }

  private shouldIncludeInTest(test: ABTestConfig): boolean {
    // Check date range
    const now = new Date();
    if (test.startDate && now < test.startDate) return false;
    if (test.endDate && now > test.endDate) return false;

    // Check traffic allocation
    const hash = this.hashSessionId();
    return (hash % 100) < (test.trafficAllocation * 100);
  }

  private createAssignment(test: ABTestConfig, userId?: string): ABTestAssignment | null {
    const sessionId = this.getSessionId();
    
    // Apply segment rules if any
    if (test.segmentRules && !this.matchesSegmentRules(test.segmentRules)) {
      return null;
    }

    // Select variant based on weights
    const variantId = this.selectVariant(test.variants, sessionId);
    
    return {
      testId: test.testId,
      variantId,
      assignedAt: new Date(),
      userId,
      sessionId,
      segment: this.getUserSegment()
    };
  }

  private selectVariant(variants: ABVariant[], sessionId: string): string {
    const hash = this.hashString(`${sessionId}_variant`);
    const random = hash % 100;
    
    let cumulativeWeight = 0;
    for (const variant of variants) {
      cumulativeWeight += variant.weight;
      if (random < cumulativeWeight) {
        return variant.id;
      }
    }
    
    // Fallback to control variant
    return variants.find(v => v.isControl)?.id || variants[0].id;
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  private hashSessionId(): number {
    return this.hashString(this.getSessionId());
  }

  private getSessionId(): string {
    if (!this.localStorage) return 'session_' + Date.now();
    
    let sessionId = this.localStorage.getItem('ab_test_session');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      this.localStorage.setItem('ab_test_session', sessionId);
    }
    return sessionId;
  }

  private matchesSegmentRules(rules: SegmentRule[]): boolean {
    const userSegment = this.getUserSegment();
    
    return rules.every(rule => {
      const value = userSegment[rule.property];
      
      switch (rule.operator) {
        case 'equals':
          return value === rule.value;
        case 'contains':
          return String(value).includes(String(rule.value));
        case 'gt':
          return Number(value) > Number(rule.value);
        case 'lt':
          return Number(value) < Number(rule.value);
        case 'in':
          return Array.isArray(rule.value) && rule.value.includes(value);
        case 'not_in':
          return Array.isArray(rule.value) && !rule.value.includes(value);
        default:
          return false;
      }
    });
  }

  private getUserSegment(): Record<string, any> {
    // In a real implementation, this would gather user segment data
    return {
      device: this.getDeviceType(),
      browser: this.getBrowser(),
      returning_user: this.isReturningUser(),
      traffic_source: this.getTrafficSource()
    };
  }

  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'unknown';
    return window.innerWidth < 768 ? 'mobile' : 
           window.innerWidth < 1024 ? 'tablet' : 'desktop';
  }

  private getBrowser(): string {
    if (typeof navigator === 'undefined') return 'unknown';
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'chrome';
    if (userAgent.includes('Firefox')) return 'firefox';
    if (userAgent.includes('Safari')) return 'safari';
    if (userAgent.includes('Edge')) return 'edge';
    return 'other';
  }

  private isReturningUser(): boolean {
    if (!this.localStorage) return false;
    return this.localStorage.getItem('returning_user') === 'true';
  }

  private getTrafficSource(): string {
    if (typeof document === 'undefined') return 'direct';
    return document.referrer ? 'referral' : 'direct';
  }

  private getAssignmentForTest(testId: string): ABTestAssignment | null {
    const sessionId = this.getSessionId();
    const assignmentKey = `${testId}_${sessionId}`;
    return this.assignments.get(assignmentKey) || null;
  }

  private storeConversion(conversion: ConversionEvent): void {
    if (!this.localStorage) return;
    
    const key = 'ab_test_conversions';
    const stored = this.localStorage.getItem(key);
    const conversions = stored ? JSON.parse(stored) : [];
    
    conversions.push(conversion);
    
    // Keep only last 100 conversions to avoid storage bloat
    if (conversions.length > 100) {
      conversions.splice(0, conversions.length - 100);
    }
    
    this.localStorage.setItem(key, JSON.stringify(conversions));
  }

  private loadAssignments(): void {
    if (!this.localStorage) return;
    
    const stored = this.localStorage.getItem('ab_test_assignments');
    if (stored) {
      try {
        const assignments = JSON.parse(stored);
        assignments.forEach((assignment: ABTestAssignment) => {
          const key = `${assignment.testId}_${assignment.sessionId}`;
          this.assignments.set(key, {
            ...assignment,
            assignedAt: new Date(assignment.assignedAt)
          });
        });
      } catch (error) {
        console.warn('[ABTesting] Failed to load assignments:', error);
      }
    }
  }

  private saveAssignments(): void {
    if (!this.localStorage) return;
    
    const assignments = Array.from(this.assignments.values());
    this.localStorage.setItem('ab_test_assignments', JSON.stringify(assignments));
  }

  private async calculateTestResults(testId: string): Promise<ABTestResults> {
    // This would integrate with your analytics backend
    // For now, return mock results
    const test = this.tests.get(testId);
    if (!test) throw new Error('Test not found');

    return {
      testId,
      variants: test.variants.map(variant => ({
        variantId: variant.id,
        name: variant.name,
        isControl: variant.isControl || false,
        participants: Math.floor(Math.random() * 1000) + 100,
        conversions: Math.floor(Math.random() * 100) + 10,
        conversionRate: Math.random() * 0.1 + 0.05,
        confidenceInterval: [0.05, 0.15],
        isStatisticallySignificant: Math.random() > 0.5
      })),
      status: test.status,
      startDate: test.startDate || new Date(),
      endDate: test.endDate,
      winner: Math.random() > 0.5 ? test.variants[1].id : null
    };
  }
}

export interface ABTestResults {
  testId: string;
  variants: VariantResult[];
  status: string;
  startDate: Date;
  endDate?: Date;
  winner?: string;
}

export interface VariantResult {
  variantId: string;
  name: string;
  isControl: boolean;
  participants: number;
  conversions: number;
  conversionRate: number;
  confidenceInterval: [number, number];
  isStatisticallySignificant: boolean;
}

// Singleton instance
export const abTestingManager = new ABTestingManager();

// React Hooks for A/B Testing
export function useABTest(testId: string, userId?: string): string | null {
  const [variant, setVariant] = useState<string | null>(null);

  useEffect(() => {
    const assignment = abTestingManager.getVariant(testId, userId);
    setVariant(assignment);
  }, [testId, userId]);

  return variant;
}

export function useABTestConversion(testId: string) {
  const trackConversion = useMemo(() => 
    (eventType: string, value?: number, metadata?: Record<string, any>) => {
      abTestingManager.trackConversion(testId, eventType, value, metadata);
    }, 
    [testId]
  );

  return { trackConversion };
}

// Higher-Order Component for A/B Testing
export function withABTest<P extends object>(
  testId: string,
  variants: Record<string, React.ComponentType<P>>,
  fallbackComponent?: React.ComponentType<P>
) {
  return function ABTestComponent(props: P) {
    const variantId = useABTest(testId);
    
    if (!variantId) {
      return fallbackComponent ? React.createElement(fallbackComponent, props) : null;
    }

    const Component = variants[variantId];
    return Component ? React.createElement(Component, props) : null;
  };
}

// Pre-configured test configurations
export const TEST_CONFIGS: Record<string, ABTestConfig> = {
  HOMEPAGE_HERO: {
    testId: 'homepage_hero_v1',
    name: 'Homepage Hero Section',
    description: 'Test different hero section designs and copy',
    variants: [
      { id: 'control', name: 'Original Hero', weight: 50, isControl: true },
      { id: 'focused', name: 'Focused Value Prop', weight: 50 }
    ],
    trafficAllocation: 1.0,
    status: 'active' as const,
    targetMetrics: ['assessment_start', 'consultation_request']
  },
  
  PRICING_PAGE: {
    testId: 'pricing_page_v1',
    name: 'Pricing Page Layout',
    description: 'Test different pricing presentations',
    variants: [
      { id: 'control', name: 'Standard Pricing', weight: 33, isControl: true },
      { id: 'value_focused', name: 'Value-Focused', weight: 33 },
      { id: 'social_proof', name: 'Social Proof Heavy', weight: 34 }
    ],
    trafficAllocation: 1.0,
    status: 'active' as const,
    targetMetrics: ['service_tier_checkout', 'consultation_request']
  },

  CTA_BUTTONS: {
    testId: 'cta_buttons_v1',
    name: 'Call-to-Action Buttons',
    description: 'Test different CTA button copy and styles',
    variants: [
      { id: 'control', name: 'Start Assessment', weight: 25, isControl: true },
      { id: 'urgency', name: 'Get Your Score Now', weight: 25 },
      { id: 'benefit', name: 'Discover Your Potential', weight: 25 },
      { id: 'action', name: 'Begin Analysis', weight: 25 }
    ],
    trafficAllocation: 1.0,
    status: 'active' as const,
    targetMetrics: ['assessment_start']
  }
} as const;

// Initialize default tests
Object.values(TEST_CONFIGS).forEach(config => {
  abTestingManager.registerTest(config);
});
