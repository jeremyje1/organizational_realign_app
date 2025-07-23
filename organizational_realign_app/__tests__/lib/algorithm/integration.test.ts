import { describe, it, expect, beforeEach } from '@jest/globals';
import { 
  calculatePeerPercentile, 
  calculateConfidenceIntervals, 
  assignTier, 
  calcScoreV21 
} from '../../../lib/algorithm/score';
import type { AssessmentResponse } from '../../../lib/realignment-engine';

// Define the test interface locally to match what the tests expect
interface ScoringAlgorithmInput {
  segment: 'HIGHER_ED' | 'NON_PROFIT' | 'HEALTHCARE' | 'GOVERNMENT' | 'FOR_PROFIT';
  answers: Record<string, number>;
}

describe('Algorithm v2.1 Integration Tests', () => {
  describe('calculatePeerPercentile', () => {
    it('should calculate percentile correctly for normal distribution', () => {
      const score = 0.75;
      const segment = 'HIGHER_ED';
      
      const percentile = calculatePeerPercentile(score, segment);
      
      expect(percentile).toBeGreaterThanOrEqual(0);
      expect(percentile).toBeLessThanOrEqual(100);
      expect(typeof percentile).toBe('number');
    });

    it('should handle edge cases correctly', () => {
      // Test minimum score
      const minPercentile = calculatePeerPercentile(0, 'HIGHER_ED');
      expect(minPercentile).toBeGreaterThanOrEqual(0);
      
      // Test maximum score
      const maxPercentile = calculatePeerPercentile(1, 'HIGHER_ED');
      expect(maxPercentile).toBeLessThanOrEqual(100);
      
      // Test different segments
      const corporatePercentile = calculatePeerPercentile(0.5, 'FOR_PROFIT');
      const nonprofitPercentile = calculatePeerPercentile(0.5, 'NON_PROFIT');
      
      expect(typeof corporatePercentile).toBe('number');
      expect(typeof nonprofitPercentile).toBe('number');
    });

    it('should provide consistent results for same inputs', () => {
      const score = 0.65;
      const segment = 'HIGHER_ED';
      
      const result1 = calculatePeerPercentile(score, segment);
      const result2 = calculatePeerPercentile(score, segment);
      
      expect(result1).toBe(result2);
    });
  });

  describe('calculateConfidenceIntervals', () => {
    it('should calculate confidence intervals for response consistency', () => {
      const responses: AssessmentResponse[] = [
        { questionId: 'q1', value: 4, section: 'Governance & Leadership' },
        { questionId: 'q2', value: 5, section: 'Governance & Leadership' },
        { questionId: 'q3', value: 3, section: 'Finance, Budget & Procurement' },
        { questionId: 'q4', value: 4, section: 'Finance, Budget & Procurement' },
        { questionId: 'q5', value: 5, section: 'Technology & Innovation' },
      ];
      
      const answers = {
        'q1': 4, 'q2': 5, 'q3': 3, 'q4': 4, 'q5': 5
      };
      const sectionScores = {
        'Governance & Leadership': 0.9,
        'Finance, Budget & Procurement': 0.7,
        'Technology & Innovation': 1.0
      };
      
      const confidence = calculateConfidenceIntervals(answers, sectionScores);
      
      expect(confidence).toHaveProperty('overall');
      expect(confidence).toHaveProperty('sections');
      
      expect(confidence.overall).toBeGreaterThanOrEqual(0);
      expect(confidence.overall).toBeLessThanOrEqual(1);
      expect(confidence.sections).toHaveProperty('Governance & Leadership');
      expect(confidence.sections).toHaveProperty('Finance, Budget & Procurement');
      expect(confidence.sections).toHaveProperty('Technology & Innovation');
      
      Object.values(confidence.sections).forEach(sectionConfidence => {
        expect(sectionConfidence[0]).toBeGreaterThanOrEqual(0);
        expect(sectionConfidence[1]).toBeLessThanOrEqual(1);
      });
    });

    it('should handle single response per section', () => {
      const responses: AssessmentResponse[] = [
        { questionId: 'q1', value: 4, section: 'Governance & Leadership' },
        { questionId: 'q2', value: 3, section: 'Finance, Budget & Procurement' },
      ];
      
      const answers = { 'q1': 4, 'q2': 3 };
      const sectionScores = { 'Governance & Leadership': 0.8, 'Finance, Budget & Procurement': 0.6 };
      
      const confidence = calculateConfidenceIntervals(answers, sectionScores);
      
      expect(confidence.overall).toBeGreaterThanOrEqual(0);
      expect(Object.keys(confidence.sections)).toHaveLength(2);
    });

    it('should handle empty responses', () => {
      const responses: AssessmentResponse[] = [];
      
      const confidence = calculateConfidenceIntervals({}, {});
      
      expect(confidence.overall).toBe(0);
      expect(Object.keys(confidence.sections)).toHaveLength(0);
    });
  });

  describe('assignTier', () => {
    it('should assign correct tiers based on score and percentile', () => {
      // Test TRANSFORMING tier (high score, high percentile)
      const transformingTier = assignTier(0.9, 0.95, 85);
      expect(transformingTier).toBe('TRANSFORMING');
      
      // Test GROWING tier (good score, moderate percentile)
      const growingTier = assignTier(0.75, 0.85, 65);
      expect(growingTier).toBe('GROWING');
      
      // Test DEVELOPING tier (moderate score)
      const developingTier = assignTier(0.6, 0.75, 45);
      expect(developingTier).toBe('DEVELOPING');
      
      // Test ESTABLISHING tier (lower score)
      const establishingTier = assignTier(0.4, 0.65, 25);
      expect(establishingTier).toBe('ESTABLISHING');
      
      // Test EMERGING tier (low score)
      const emergingTier = assignTier(0.2, 0.55, 10);
      expect(emergingTier).toBe('EMERGING');
    });

    it('should consider confidence levels in tier assignment', () => {
      const score = 0.7;
      const percentile = 60;
      
      // High confidence should maintain tier
      const highConfidenceTier = assignTier(score, 0.95, percentile);
      
      // Low confidence might affect tier assignment
      const lowConfidenceTier = assignTier(score, 0.5, percentile);
      
      expect(typeof highConfidenceTier).toBe('string');
      expect(typeof lowConfidenceTier).toBe('string');
      
      // Both should be valid tier names
      const validTiers = ['TRANSFORMING', 'GROWING', 'DEVELOPING', 'ESTABLISHING', 'EMERGING'];
      expect(validTiers).toContain(highConfidenceTier);
      expect(validTiers).toContain(lowConfidenceTier);
    });

    it('should handle edge cases', () => {
      // Minimum values
      const minTier = assignTier(0, 0, 0);
      expect(minTier).toBe('EMERGING');
      
      // Maximum values
      const maxTier = assignTier(1, 1, 100);
      expect(maxTier).toBe('TRANSFORMING');
    });
  });

  describe('calcScoreV21 Integration', () => {
    it('should integrate all v2.1 features correctly', async () => {
      const input: ScoringAlgorithmInput = {
        segment: 'HIGHER_ED',
        answers: {
          'span_control_1': 4,
          'span_control_2': 4,
          'culture_1': 4,
          'culture_2': 3,
          'tech_fit_1': 4,
          'tech_fit_2': 4,
          'readiness_1': 4,
          'readiness_2': 4,
        },
      };
      
      const result = await calcScoreV21(input);
      
      // Check basic structure
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('tier');
      expect(result).toHaveProperty('percentile');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('sectionScores');
      
      // Validate score range
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(1);
      
      // Validate percentile
      expect(result.percentile).toBeGreaterThanOrEqual(0);
      expect(result.percentile).toBeLessThanOrEqual(100);
      
      // Validate confidence
      expect(result.confidence.overall).toBeGreaterThanOrEqual(0);
      expect(result.confidence.overall).toBeLessThanOrEqual(1);
      
      // Validate tier assignment
      const validTiers = ['TRANSFORMING', 'GROWING', 'DEVELOPING', 'ESTABLISHING', 'EMERGING'];
      expect(validTiers).toContain(result.tier);
      
      // Validate section scores
      expect(typeof result.sectionScores).toBe('object');
      Object.values(result.sectionScores).forEach(sectionScore => {
        expect(typeof sectionScore).toBe('number');
        expect(sectionScore).toBeGreaterThanOrEqual(0);
        expect(sectionScore).toBeLessThanOrEqual(1);
      });
    });

    it('should handle different organization segments consistently', async () => {
      const baseAnswers = {
        'span_control_1': 3,
        'span_control_2': 4,
        'culture_1': 3,
        'culture_2': 3,
        'tech_fit_1': 4,
        'tech_fit_2': 3,
        'readiness_1': 3,
        'readiness_2': 4,
      };
      
      const segments = ['HIGHER_ED', 'FOR_PROFIT', 'NON_PROFIT'] as const;
      
      for (const segment of segments) {
        const result = await calcScoreV21({
          segment,
          answers: baseAnswers,
        });
        
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(1);
        expect(result.percentile).toBeGreaterThanOrEqual(0);
        expect(result.percentile).toBeLessThanOrEqual(100);
        expect(typeof result.tier).toBe('string');
      }
    });

    it('should provide different results for different performance levels', async () => {
      // High performance answers
      const highPerformanceInput: ScoringAlgorithmInput = {
        segment: 'HIGHER_ED',
        answers: {
          'span_control_1': 4,
          'span_control_2': 4,
          'culture_1': 4,
          'culture_2': 4,
          'tech_fit_1': 4,
          'tech_fit_2': 4,
          'readiness_1': 4,
          'readiness_2': 4,
        },
      };
      
      // Low performance answers
      const lowPerformanceInput: ScoringAlgorithmInput = {
        segment: 'HIGHER_ED',
        answers: {
          'span_control_1': 0,
          'span_control_2': 0,
          'culture_1': 0,
          'culture_2': 0,
          'tech_fit_1': 0,
          'tech_fit_2': 0,
          'readiness_1': 0,
          'readiness_2': 0,
        },
      };
      
      const highResult = await calcScoreV21(highPerformanceInput);
      const lowResult = await calcScoreV21(lowPerformanceInput);
      
      // High performance should score better
      expect(highResult.score).toBeGreaterThan(lowResult.score);
      expect(highResult.percentile).toBeGreaterThan(lowResult.percentile);
      
      // Tier progression should make sense
      const tierOrder = ['EMERGING', 'ESTABLISHING', 'DEVELOPING', 'GROWING', 'TRANSFORMING'];
      const highTierIndex = tierOrder.indexOf(highResult.tier);
      const lowTierIndex = tierOrder.indexOf(lowResult.tier);
      
      expect(highTierIndex).toBeGreaterThanOrEqual(lowTierIndex);
    });

    it('should maintain consistency across multiple runs', async () => {
      const input: ScoringAlgorithmInput = {
        segment: 'FOR_PROFIT',
        answers: {
          'span_control_1': 3,
          'span_control_2': 4,
          'culture_1': 4,
          'culture_2': 3,
          'tech_fit_1': 3,
          'tech_fit_2': 4,
          'readiness_1': 4,
          'readiness_2': 3,
        },
      };
      
      const results = await Promise.all([
        calcScoreV21(input),
        calcScoreV21(input),
        calcScoreV21(input),
      ]);
      
      // All results should be identical
      const [first, second, third] = results;
      
      expect(first.score).toBe(second.score);
      expect(second.score).toBe(third.score);
      
      expect(first.tier).toBe(second.tier);
      expect(second.tier).toBe(third.tier);
      
      expect(first.percentile).toBe(second.percentile);
      expect(second.percentile).toBe(third.percentile);
    });

    it('should handle missing or incomplete data gracefully', async () => {
      const incompleteInput: ScoringAlgorithmInput = {
        segment: 'HIGHER_ED',
        answers: {
          'span_control_1': 3,
          'culture_1': 4,
          // Missing other questions
        },
      };
      
      const result = await calcScoreV21(incompleteInput);
      
      // Should still return valid result structure
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('tier');
      expect(result).toHaveProperty('percentile');
      expect(result).toHaveProperty('confidence');
      
      // Confidence should be lower for incomplete data
      expect(result.confidence.overall).toBeLessThan(0.8);
    });
  });

  describe('Algorithm Performance and Reliability', () => {
    it('should complete scoring within reasonable time limits', async () => {
      const start = Date.now();
      
      const input: ScoringAlgorithmInput = {
        segment: 'HIGHER_ED',
        answers: {
          'span_control_1': 4,
          'span_control_2': 3,
          'culture_1': 4,
          'culture_2': 4,
          'tech_fit_1': 3,
          'tech_fit_2': 4,
          'readiness_1': 4,
          'readiness_2': 4,
        },
      };
      
      await calcScoreV21(input);
      
      const duration = Date.now() - start;
      
      // Should complete within 1 second
      expect(duration).toBeLessThan(1000);
    });

    it('should handle large numbers of concurrent scoring requests', async () => {
      const inputs = Array(10).fill(0).map((_, i) => ({
        segment: 'HIGHER_ED' as const,
        answers: {
          'span_control_1': (i % 5) + 1,
          'span_control_2': ((i + 1) % 5) + 1,
          'culture_1': ((i + 2) % 5) + 1,
          'culture_2': ((i + 3) % 5) + 1,
          'tech_fit_1': ((i + 4) % 5) + 1,
          'tech_fit_2': (i % 5) + 1,
          'readiness_1': ((i + 1) % 5) + 1,
          'readiness_2': ((i + 2) % 5) + 1,
        },
      }));
      
      const start = Date.now();
      const results = await Promise.all(inputs.map(input => calcScoreV21(input)));
      const duration = Date.now() - start;
      
      // Should complete all requests
      expect(results).toHaveLength(10);
      
      // Each result should be valid
      results.forEach(result => {
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(1);
        expect(typeof result.tier).toBe('string');
      });
      
      // Should complete within reasonable time even with concurrent requests
      expect(duration).toBeLessThan(5000);
    });
  });
});
