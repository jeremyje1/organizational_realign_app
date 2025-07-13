/**
 * Simplified Algorithm Runner
 * Matches the pattern from your requirements
 * 
 * @version 2.1.0
 * @author NorthPath Strategies
 */

import { calcDSCH, DSCHInput, DSCHResult } from './dsch-simple';
import { calcCRF, CRFInput, CRFResult } from './crf-simple';
import { calcLEI, LEIInput, LEIResult } from './lei-simple';

// Re-export types for external use
export { DSCHInput, DSCHResult } from './dsch-simple';
export { CRFInput, CRFResult } from './crf-simple';
export { LEIInput, LEIResult } from './lei-simple';

export interface AlgorithmPayload {
  structure: {
    layers: number;
    spanByMgr: number[];
  };
  culture: {
    cultureMetrics: {
      adaptability: number;
      cohesion: number;
      innovation: number;
    };
  };
  licenses: {
    leadership: number;
    effectiveness: number;
    impact: number;
  };
}

export interface AlgorithmResults {
  dsch: { score: number; idealSpan: number };
  crf: { score: number };
  lei: { score: number };
}

/**
 * Run all algorithms as specified in requirements
 * Matches the exact pattern from your example
 */
export const runAlgorithms = async (payload: AlgorithmPayload): Promise<AlgorithmResults> => ({
  dsch: calcDSCH(payload.structure),
  crf: calcCRF(payload.culture),
  lei: calcLEI(payload.licenses),
});

// Export individual algorithms for direct use
export { calcDSCH, calcCRF, calcLEI };
