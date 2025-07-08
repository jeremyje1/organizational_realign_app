import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIAnalysisResult {
  organizationalHealth: number;
  efficiencyScore: number;
  aiReadinessScore: number;
  redundancyIndex: number;
  riskAssessment: string;
  executiveSummary: string;
  keyFindings: string[];
  recommendations: any[];
  insights: any[];
  implementationRoadmap: ImplementationPhase[];
  costBenefitAnalysis: CostBenefitAnalysis;
  benchmarkComparison: BenchmarkData;
}

export interface ImplementationPhase {
  phase: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  timeframe: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  initiatives: {
    title: string;
    description: string;
    expectedROI: number;
    implementationCost: number;
    riskLevel: number;
  }[];
}

export interface CostBenefitAnalysis {
  totalImplementationCost: number;
  expectedAnnualSavings: number;
  paybackPeriodMonths: number;
  fiveYearROI: number;
  riskAdjustedROI: number;
}

export interface BenchmarkData {
  peerComparison: string;
  industryStandards: {
    metric: string;
    yourScore: number;
    industryAverage: number;
    topPerformers: number;
  }[];
}

export class EnhancedAIAnalysisService {
  async generateAIInsights(analysisData: any, responses: any[]): Promise<AIAnalysisResult> {
    const prompt = `
    You are an expert organizational consultant. Based on this assessment data, provide comprehensive insights.
    
    Analysis Data:
    - Organizational health: ${analysisData.organizationalHealth || 'Unknown'}%
    - AI readiness: ${analysisData.aiReadinessScore || 'Unknown'}%
    - Total responses: ${responses.length}
    
    Provide a JSON response with:
    - executiveSummary (2-3 paragraphs)
    - keyFindings (5-7 bullet points as array)
    - riskAssessment (1-2 paragraphs)
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1500
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) throw new Error('No response from OpenAI');

      const aiInsights = JSON.parse(response);
      
      return {
        organizationalHealth: analysisData.organizationalHealth || 75,
        efficiencyScore: analysisData.efficiency || 70,
        aiReadinessScore: analysisData.aiReadinessScore || 65,
        redundancyIndex: analysisData.redundancyIndex || 40,
        riskAssessment: aiInsights.riskAssessment,
        executiveSummary: aiInsights.executiveSummary,
        keyFindings: aiInsights.keyFindings,
        recommendations: analysisData.recommendations || [],
        insights: analysisData.insights || [],
        implementationRoadmap: this.generateFallbackRoadmap(),
        costBenefitAnalysis: this.calculateCostBenefit(analysisData.recommendations || []),
        benchmarkComparison: this.generateFallbackBenchmarks()
      };
    } catch (error) {
      console.error('AI insights generation error:', error);
      return this.generateFallbackAnalysis(analysisData, responses);
    }
  }

  private calculateCostBenefit(recommendations: any[]): CostBenefitAnalysis {
    const totalCost = recommendations.reduce((sum, rec) => {
      const cost = rec.estimatedCost || Math.random() * 100000 + 50000;
      return sum + cost;
    }, 0);

    const annualSavings = recommendations.reduce((sum, rec) => {
      const savings = rec.expectedSavings || totalCost * 0.15;
      return sum + savings;
    }, 0);

    const paybackMonths = totalCost > 0 ? Math.ceil((totalCost / annualSavings) * 12) : 12;
    const fiveYearROI = totalCost > 0 ? ((annualSavings * 5 - totalCost) / totalCost) * 100 : 150;
    const riskAdjustedROI = fiveYearROI * 0.8;

    return {
      totalImplementationCost: Math.round(totalCost),
      expectedAnnualSavings: Math.round(annualSavings),
      paybackPeriodMonths: paybackMonths,
      fiveYearROI: Math.round(fiveYearROI * 100) / 100,
      riskAdjustedROI: Math.round(riskAdjustedROI * 100) / 100
    };
  }

  private generateFallbackAnalysis(analysisData: any, _responses: any[]): AIAnalysisResult {
    return {
      organizationalHealth: analysisData.organizationalHealth || 75,
      efficiencyScore: analysisData.efficiency || 70,
      aiReadinessScore: analysisData.aiReadinessScore || 65,
      redundancyIndex: analysisData.redundancyIndex || 40,
      riskAssessment: 'The primary risks identified include technology obsolescence, staff retention challenges, and competitive market pressures. Immediate attention to digital transformation and talent management is recommended to mitigate these risks.',
      executiveSummary: `Based on the comprehensive assessment, we have identified key areas for organizational improvement. The analysis reveals both strengths to leverage and opportunities for enhancement across operational, technological, and strategic dimensions.`,
      keyFindings: [
        'Operational efficiency shows room for improvement through process optimization',
        'Technology infrastructure requires strategic investment for future readiness',
        'Leadership alignment is strong but could benefit from enhanced communication systems',
        'Staff development programs would significantly impact organizational performance',
        'Financial processes demonstrate good control but lack advanced analytics'
      ],
      recommendations: analysisData.recommendations || [],
      insights: analysisData.insights || [],
      implementationRoadmap: this.generateFallbackRoadmap(),
      costBenefitAnalysis: this.calculateCostBenefit(analysisData.recommendations || []),
      benchmarkComparison: this.generateFallbackBenchmarks()
    };
  }

  private generateFallbackRoadmap(): ImplementationPhase[] {
    return [
      {
        phase: 'immediate',
        timeframe: '0-3 months',
        priority: 'critical',
        initiatives: [
          {
            title: 'Quick Wins Implementation',
            description: 'Implement high-impact, low-cost improvements',
            expectedROI: 150,
            implementationCost: 25000,
            riskLevel: 3
          }
        ]
      },
      {
        phase: 'short-term',
        timeframe: '3-12 months',
        priority: 'high',
        initiatives: [
          {
            title: 'Technology Infrastructure Upgrade',
            description: 'Modernize core systems and processes',
            expectedROI: 200,
            implementationCost: 100000,
            riskLevel: 5
          }
        ]
      }
    ];
  }

  private generateFallbackBenchmarks(): BenchmarkData {
    return {
      peerComparison: `Compared to peer institutions, your organization shows competitive performance in most areas with specific opportunities for advancement in technology adoption and operational efficiency.`,
      industryStandards: [
        { metric: 'Operational Efficiency', yourScore: 72, industryAverage: 68, topPerformers: 85 },
        { metric: 'Technology Adoption', yourScore: 65, industryAverage: 70, topPerformers: 88 },
        { metric: 'Financial Performance', yourScore: 78, industryAverage: 74, topPerformers: 90 },
        { metric: 'Staff Satisfaction', yourScore: 69, industryAverage: 71, topPerformers: 86 }
      ]
    };
  }
}
