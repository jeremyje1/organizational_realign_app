import { AIReadinessScores } from './aiReadinessEngine';
import { AlignmentInsights } from './alignmentNarrative';

export interface OpportunityMapConfig {
  width: number;
  height: number;
  title: string;
  institutionName?: string;
}

export class AIOpportunityMapGenerator {
  generateOpportunityMapSVG(
    scores: AIReadinessScores,
    insights: AlignmentInsights,
    config: OpportunityMapConfig = { width: 800, height: 600, title: 'AI Opportunity Map' }
  ): string {
    const alignmentScore = scores.domains.alignment?.percentage || 0;
    const overallScore = (scores.overall / 5) * 100;
    const strategicScore = scores.domains.strategy?.percentage || 0;
    
    return `
<svg width="${config.width}" height="${config.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title { font-family: 'Arial', sans-serif; font-size: 24px; font-weight: bold; fill: #2c3e50; }
      .subtitle { font-family: 'Arial', sans-serif; font-size: 16px; fill: #34495e; }
      .section-title { font-family: 'Arial', sans-serif; font-size: 14px; font-weight: bold; fill: #2c3e50; }
      .body-text { font-family: 'Arial', sans-serif; font-size: 12px; fill: #2c3e50; }
      .small-text { font-family: 'Arial', sans-serif; font-size: 10px; fill: #7f8c8d; }
      .score-text { font-family: 'Arial', sans-serif; font-size: 14px; font-weight: bold; }
      .high-score { fill: #27ae60; }
      .medium-score { fill: #f39c12; }
      .low-score { fill: #e74c3c; }
      .quadrant { fill: #ecf0f1; stroke: #bdc3c7; stroke-width: 1; }
      .grid-line { stroke: #d5d8dc; stroke-width: 0.5; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="#ffffff"/>
  
  <!-- Header -->
  <text x="400" y="40" text-anchor="middle" class="title">${config.title}</text>
  ${config.institutionName ? `<text x="400" y="65" text-anchor="middle" class="subtitle">${config.institutionName}</text>` : ''}
  
  <!-- Main Opportunity Matrix -->
  <g transform="translate(50, 100)">
    <!-- Grid Background -->
    <rect class="quadrant" x="0" y="0" width="350" height="175"/>
    <rect class="quadrant" x="350" y="0" width="350" height="175"/>
    <rect class="quadrant" x="0" y="175" width="350" height="175"/>
    <rect class="quadrant" x="350" y="175" width="350" height="175"/>
    
    <!-- Grid Lines -->
    <line class="grid-line" x1="0" y1="87.5" x2="700" y2="87.5"/>
    <line class="grid-line" x1="0" y1="262.5" x2="700" y2="262.5"/>
    <line class="grid-line" x1="175" y1="0" x2="175" y2="350"/>
    <line class="grid-line" x1="525" y1="0" x2="525" y2="350"/>
    <line class="grid-line" x1="350" y1="0" x2="350" y2="350"/>
    
    <!-- Quadrant Labels -->
    <text x="175" y="25" text-anchor="middle" class="section-title">STRATEGIC GAPS</text>
    <text x="175" y="40" text-anchor="middle" class="small-text">High Need, Low Alignment</text>
    
    <text x="525" y="25" text-anchor="middle" class="section-title">QUICK WINS</text>
    <text x="525" y="40" text-anchor="middle" class="small-text">High Need, High Alignment</text>
    
    <text x="175" y="200" text-anchor="middle" class="section-title">LOW PRIORITY</text>
    <text x="175" y="215" text-anchor="middle" class="small-text">Low Need, Low Alignment</text>
    
    <text x="525" y="200" text-anchor="middle" class="section-title">SUSTAIN & SCALE</text>
    <text x="525" y="215" text-anchor="middle" class="small-text">Low Need, High Alignment</text>
    
    <!-- Axis Labels -->
    <text x="350" y="380" text-anchor="middle" class="section-title">Strategic Alignment →</text>
    <text x="-20" y="180" text-anchor="middle" class="section-title" transform="rotate(-90, -20, 180)">← Implementation Need</text>
    
    <!-- Current Position Indicator -->
    ${this.generatePositionIndicator(alignmentScore, overallScore)}
    
    <!-- Domain Scores as Smaller Indicators -->
    ${this.generateDomainIndicators(scores)}
  </g>
  
  <!-- Opportunity Analysis Panel -->
  <g transform="translate(50, 480)">
    <rect x="0" y="0" width="700" height="100" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>
    
    <text x="20" y="25" class="section-title">Strategic Opportunities</text>
    
    ${this.generateOpportunityList(insights, 30)}
  </g>
  
  <!-- Alignment Score Dashboard -->
  <g transform="translate(520, 80)">
    <rect x="0" y="0" width="200" height="120" fill="#ffffff" stroke="#dee2e6" stroke-width="1"/>
    
    <text x="100" y="20" text-anchor="middle" class="section-title">Alignment Scores</text>
    
    <text x="20" y="45" class="body-text">Strategic Alignment:</text>
    <text x="180" y="45" text-anchor="end" class="${this.getScoreClass(alignmentScore)} score-text">${alignmentScore.toFixed(0)}%</text>
    
    <text x="20" y="65" class="body-text">Overall Readiness:</text>
    <text x="180" y="65" text-anchor="end" class="${this.getScoreClass(overallScore)} score-text">${overallScore.toFixed(0)}%</text>
    
    <text x="20" y="85" class="body-text">Strategic Planning:</text>
    <text x="180" y="85" text-anchor="end" class="${this.getScoreClass(strategicScore)} score-text">${strategicScore.toFixed(0)}%</text>
    
    <text x="100" y="105" text-anchor="middle" class="small-text">
      Status: ${alignmentScore >= 70 ? 'ALIGNED' : alignmentScore >= 50 ? 'DEVELOPING' : 'CRITICAL GAP'}
    </text>
  </g>
  
  <!-- Footer -->
  <text x="400" y="590" text-anchor="middle" class="small-text">
    Generated by AI Readiness Assessment • Strategic Alignment Analysis
  </text>
</svg>`;
  }

  private generatePositionIndicator(alignmentScore: number, overallScore: number): string {
    // Map scores to quadrant coordinates (0-100% to 0-700px for alignment, 0-350px for need)
    const x = (alignmentScore / 100) * 700;
    const y = 350 - ((100 - overallScore) / 100) * 350; // Inverted Y for higher need at top
    
    return `
    <!-- Current Position -->
    <circle cx="${x}" cy="${y}" r="8" fill="#e74c3c" stroke="#ffffff" stroke-width="2"/>
    <text x="${x}" y="${y - 15}" text-anchor="middle" class="small-text" fill="#e74c3c">Current Position</text>
    `;
  }

  private generateDomainIndicators(scores: AIReadinessScores): string {
    const domains = [
      { id: 'strategy', label: 'Strategy', color: '#3498db' },
      { id: 'infrastructure', label: 'Tech', color: '#9b59b6' },
      { id: 'governance', label: 'Governance', color: '#e67e22' },
      { id: 'culture', label: 'Culture', color: '#1abc9c' },
      { id: 'ethics', label: 'Ethics', color: '#f1c40f' }
    ];

    return domains.map(domain => {
      const domainScore = scores.domains[domain.id];
      if (!domainScore) return '';
      
      const x = (domainScore.percentage / 100) * 700;
      const y = 350 - ((100 - domainScore.percentage) / 100) * 350;
      
      return `
      <circle cx="${x}" cy="${y}" r="4" fill="${domain.color}" opacity="0.7"/>
      <text x="${x}" y="${y - 10}" text-anchor="middle" class="small-text" fill="${domain.color}">${domain.label}</text>
      `;
    }).join('');
  }

  private generateOpportunityList(insights: AlignmentInsights, startY: number): string {
    const opportunities = insights.nextSteps.slice(0, 4); // Top 4 opportunities
    
    return opportunities.map((opportunity, index) => {
      const y = startY + (index * 15);
      return `<text x="20" y="${y}" class="body-text">• ${opportunity}</text>`;
    }).join('');
  }

  private getScoreClass(score: number): string {
    if (score >= 70) return 'high-score';
    if (score >= 50) return 'medium-score';
    return 'low-score';
  }

  generateConsultingArtefactSVG(
    scores: AIReadinessScores,
    insights: AlignmentInsights,
    institutionName?: string
  ): string {
    return `
<svg width="1000" height="700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .main-title { font-family: 'Arial', sans-serif; font-size: 28px; font-weight: bold; fill: #2c3e50; }
      .section-header { font-family: 'Arial', sans-serif; font-size: 18px; font-weight: bold; fill: #34495e; }
      .subsection { font-family: 'Arial', sans-serif; font-size: 14px; font-weight: bold; fill: #2c3e50; }
      .content-text { font-family: 'Arial', sans-serif; font-size: 12px; fill: #2c3e50; }
      .highlight-text { font-family: 'Arial', sans-serif; font-size: 12px; font-weight: bold; fill: #e74c3c; }
      .instruction-text { font-family: 'Arial', sans-serif; font-size: 11px; fill: #7f8c8d; }
      .section-box { fill: #f8f9fa; stroke: #dee2e6; stroke-width: 1; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="#ffffff"/>
  
  <!-- Header -->
  <rect x="0" y="0" width="1000" height="80" fill="#2c3e50"/>
  <text x="500" y="35" text-anchor="middle" class="main-title" fill="white">AI Strategic Alignment Workshop</text>
  <text x="500" y="55" text-anchor="middle" class="content-text" fill="white">Facilitation Guide & Assessment Results</text>
  ${institutionName ? `<text x="500" y="70" text-anchor="middle" class="instruction-text" fill="white">${institutionName}</text>` : ''}
  
  <!-- Current State Panel -->
  <rect class="section-box" x="20" y="100" width="300" height="250"/>
  <text x="170" y="125" text-anchor="middle" class="section-header">Current State</text>
  
  <text x="40" y="155" class="subsection">Alignment Level</text>
  <text x="40" y="175" class="highlight-text">${scores.domains.alignment?.percentage.toFixed(0) || '0'}% - ${this.getAlignmentLevel(scores.domains.alignment?.percentage || 0)}</text>
  
  <text x="40" y="205" class="subsection">Critical Gaps</text>
  ${insights.strategicGaps.slice(0, 3).map((gap, i) => 
    `<text x="40" y="${225 + (i * 15)}" class="content-text">• ${gap.substring(0, 35)}${gap.length > 35 ? '...' : ''}</text>`
  ).join('')}
  
  <!-- Workshop Agenda Panel -->
  <rect class="section-box" x="340" y="100" width="320" height="250"/>
  <text x="500" y="125" text-anchor="middle" class="section-header">Workshop Agenda</text>
  
  <text x="360" y="155" class="subsection">1. Current State Review (20 min)</text>
  <text x="360" y="175" class="content-text">   Review assessment results & gaps</text>
  
  <text x="360" y="205" class="subsection">2. Strategic Mapping (30 min)</text>
  <text x="360" y="225" class="content-text">   Map AI opportunities to mission</text>
  
  <text x="360" y="255" class="subsection">3. Priority Setting (25 min)</text>
  <text x="360" y="275" class="content-text">   Identify quick wins & long-term goals</text>
  
  <text x="360" y="305" class="subsection">4. Action Planning (15 min)</text>
  <text x="360" y="325" class="content-text">   Next steps & accountability</text>
  
  <!-- Facilitation Questions Panel -->
  <rect class="section-box" x="680" y="100" width="300" height="250"/>
  <text x="830" y="125" text-anchor="middle" class="section-header">Key Questions</text>
  
  <text x="700" y="155" class="subsection">Mission Alignment</text>
  <text x="700" y="175" class="content-text">How do AI initiatives advance</text>
  <text x="700" y="190" class="content-text">our core mission?</text>
  
  <text x="700" y="220" class="subsection">Student Impact</text>
  <text x="700" y="240" class="content-text">What student success metrics</text>
  <text x="700" y="255" class="content-text">should guide AI decisions?</text>
  
  <text x="700" y="285" class="subsection">Cultural Fit</text>
  <text x="700" y="305" class="content-text">How can AI enhance rather than</text>
  <text x="700" y="320" class="content-text">compromise our values?</text>
  
  <!-- Opportunity Matrix -->
  ${this.generateWorkshopMatrix(scores, insights)}
  
  <!-- Action Planning Template -->
  <rect class="section-box" x="20" y="550" width="960" height="130"/>
  <text x="500" y="575" text-anchor="middle" class="section-header">Action Planning Template</text>
  
  <text x="40" y="605" class="subsection">90-Day Priorities:</text>
  <rect x="200" y="590" width="760" height="20" fill="white" stroke="#bdc3c7" stroke-width="1"/>
  
  <text x="40" y="635" class="subsection">6-Month Goals:</text>
  <rect x="200" y="620" width="760" height="20" fill="white" stroke="#bdc3c7" stroke-width="1"/>
  
  <text x="40" y="665" class="subsection">Success Metrics:</text>
  <rect x="200" y="650" width="760" height="20" fill="white" stroke="#bdc3c7" stroke-width="1"/>
</svg>`;
  }

  private generateWorkshopMatrix(scores: AIReadinessScores, insights: AlignmentInsights): string {
    return `
    <!-- Opportunity Matrix for Workshop -->
    <g transform="translate(20, 370)">
      <rect class="section-box" x="0" y="0" width="960" height="160"/>
      <text x="480" y="25" text-anchor="middle" class="section-header">AI Opportunity Matrix</text>
      
      <!-- Matrix Grid -->
      <rect x="50" y="40" width="400" height="80" fill="white" stroke="#bdc3c7" stroke-width="1"/>
      <rect x="450" y="40" width="400" height="80" fill="white" stroke="#bdc3c7" stroke-width="1"/>
      <rect x="50" y="120" width="400" height="80" fill="white" stroke="#bdc3c7" stroke-width="1"/>
      <rect x="450" y="120" width="400" height="80" fill="white" stroke="#bdc3c7" stroke-width="1"/>
      
      <line x1="250" y1="40" x2="250" y2="200" stroke="#dee2e6" stroke-width="1"/>
      <line x1="650" y1="40" x2="650" y2="200" stroke="#dee2e6" stroke-width="1"/>
      <line x1="50" y1="120" x2="850" y2="120" stroke="#dee2e6" stroke-width="1"/>
      
      <!-- Matrix Labels -->
      <text x="150" y="30" text-anchor="middle" class="subsection">High Impact</text>
      <text x="550" y="30" text-anchor="middle" class="subsection">Quick Wins</text>
      <text x="150" y="215" text-anchor="middle" class="subsection">Fill-in</text>
      <text x="550" y="215" text-anchor="middle" class="subsection">Major Projects</text>
      
      <text x="25" y="85" text-anchor="middle" class="subsection" transform="rotate(-90, 25, 85)">Low Effort</text>
      <text x="25" y="165" text-anchor="middle" class="subsection" transform="rotate(-90, 25, 165)">High Effort</text>
      
      <!-- Instructions -->
      <text x="480" y="150" text-anchor="middle" class="instruction-text">Use sticky notes to map AI opportunities during workshop</text>
    </g>`;
  }

  private getAlignmentLevel(score: number): string {
    if (score >= 80) return 'STRONG';
    if (score >= 60) return 'MODERATE';
    if (score >= 40) return 'DEVELOPING';
    return 'CRITICAL GAP';
  }
}

export const aiOpportunityMapGenerator = new AIOpportunityMapGenerator();
