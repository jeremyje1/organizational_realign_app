// filepath: /__tests__/lib/algorithm/score.test.ts
import { calcScoreV21, scoreAssessment } from '../../../lib/algorithm/score';
import { AssessmentResponse } from '../../../lib/realignment-engine';

describe('Algorithm v2.1', () => {
  describe('calcScoreV21', () => {
    it('calculates correct score for sample Higher Ed data', async () => {
      const result = await calcScoreV21({
        segment: 'HIGHER_ED',
        answers: {
          'span_control_1': 2,
          'span_control_2': 3,
          'culture_1': 3,
          'culture_2': 3,
          'tech_fit_1': 2,
          'tech_fit_2': 3,
          'readiness_1': 3,
          'readiness_2': 3
        },
      });
      
      expect(result.score).toBeGreaterThan(0.4);
      expect(result.score).toBeLessThan(0.8);
      expect(result.tier).toMatch(/TRANSFORMING|GROWING|DEVELOPING|ESTABLISHING|EMERGING/);
      expect(result.ci).toBeGreaterThan(0);
      expect(result.peerPercentile).toBeGreaterThan(0);
      expect(result.explainability).toHaveProperty('Overall Score');
      expect(result.sectionScores).toHaveProperty('spanControl');
    });

    it('applies correct segment weights for NON_PROFIT', async () => {
      const result = await calcScoreV21({
        segment: 'NON_PROFIT',
        answers: {
          'span_control_1': 4,
          'culture_1': 4,
          'tech_fit_1': 4,
          'readiness_1': 4,
        },
      });
      
      expect(result.score).toBeGreaterThan(0.7);
      expect(result.tier).toBe('TRANSFORMING');
      expect(result.explainability['Culture']).toContain('Weight: 0.3');
    });

    it('handles missing answers with penalty', async () => {
      const incompleteAnswers = {
        'span_control_1': 4,
        'culture_1': 0, // missing
        'tech_fit_1': 4,
        'readiness_1': 4,
      };
      
      const result = await calcScoreV21({
        segment: 'HIGHER_ED',
        answers: incompleteAnswers,
      });
      
      expect(result.ci).toBeGreaterThan(0.05); // Higher uncertainty due to missing data
      expect(result.explainability['Confidence']).toContain('1 missing');
    });

    it('returns correct tier boundaries', async () => {
      // High score
      const highResult = await calcScoreV21({
        segment: 'HIGHER_ED',
        answers: {
          'span_control_1': 4, 'span_control_2': 4,
          'culture_1': 4, 'culture_2': 4,
          'tech_fit_1': 4, 'tech_fit_2': 4,
          'readiness_1': 4, 'readiness_2': 4,
        },
      });
      expect(highResult.tier).toBe('TRANSFORMING');
      expect(highResult.score).toBeGreaterThan(0.75);
      
      // Low score
      const lowResult = await calcScoreV21({
        segment: 'HIGHER_ED',
        answers: {
          'span_control_1': 1, 'span_control_2': 1,
          'culture_1': 1, 'culture_2': 1,
          'tech_fit_1': 1, 'tech_fit_2': 1,
          'readiness_1': 1, 'readiness_2': 1,
        },
      });
      expect(lowResult.tier).toBe('EMERGING');
      expect(lowResult.score).toBeLessThan(0.5);
    });
  });

  describe('Legacy scoreAssessment (backward compatibility)', () => {
    const responses: AssessmentResponse[] = [
      { questionId: 'q1', value: 4, section: 'Governance & Leadership' },
      { questionId: 'q2', value: 5, section: 'Governance & Leadership' },
      { questionId: 'q3', value: 3, section: 'Finance, Budget & Procurement' },
      { questionId: 'q4', value: 4, section: 'Finance, Budget & Procurement' },
    ];

    it('maintains backward compatibility', () => {
      const result = scoreAssessment(responses, 'HIGHER_ED');
      expect(result.totalScore).toBeGreaterThan(0);
      expect(result.sectionScores).toHaveProperty('Governance & Leadership');
      expect(result.tier).toMatch(/Strategic Assessment|Transformation Planning|Implementation Support/);
      expect(result.explainability).toHaveProperty('Governance & Leadership');
    });

    it('handles empty responses gracefully', () => {
      const result = scoreAssessment([], 'HIGHER_ED');
      expect(result.totalScore).toBe(0);
      expect(Object.keys(result.sectionScores)).toHaveLength(0);
      expect(result.tier).toBe('Strategic Assessment');
    });
  });
});
