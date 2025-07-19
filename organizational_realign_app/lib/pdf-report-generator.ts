import jsPDF from 'jspdf';
import { translateText, translateUIElement, getReportLabels, InstitutionType } from './industryLanguageMapping';

export interface ReportData {
  analysis: any;
  institutionName?: string;
  assessmentDate: string;
  generatedBy?: string;
  includeAI?: boolean;
  isStaticContent?: boolean;
  institutionType?: InstitutionType;
}

export class PDFReportGenerator {
  private pdf: jsPDF;
  private pageHeight: number;
  private pageWidth: number;
  private currentY: number;
  private margin: number;
  private institutionType: InstitutionType | null;

  constructor(institutionType?: InstitutionType) {
    this.pdf = new jsPDF('p', 'mm', 'a4');
    this.pageHeight = this.pdf.internal.pageSize.height;
    this.pageWidth = this.pdf.internal.pageSize.width;
    this.margin = 20;
    this.currentY = this.margin;
    this.institutionType = institutionType || null;
  }

  private translateContent(text: string): string {
    if (!this.institutionType) return text;
    return translateText(text, this.institutionType);
  }

  private translateReportElement(element: string): string {
    if (!this.institutionType) return element;
    return translateUIElement(element, this.institutionType);
  }

  private getIndustryReportLabels(): Record<string, string> {
    if (!this.institutionType) return {};
    return getReportLabels(this.institutionType);
  }

  async generateReport(data: ReportData): Promise<Blob> {
    // Set institution type for language customization
    if (data.institutionType) {
      this.institutionType = data.institutionType;
    }
    
    // Handle static content documents
    if (data.isStaticContent) {
      return await this.generateStaticContentPDF(data);
    }

    await this.createCoverPage(data);
    await this.createExecutiveSummary(data.analysis.executiveSummary);
    await this.createKeyMetrics(data.analysis);
    await this.createRecommendations(data.analysis.recommendations);
    await this.createSectionAnalysis(data.analysis.sectionsAnalysis);
    await this.createAIRoadmap(data.analysis.aiImplementationPlan);
    await this.createTransformationPlan(data.analysis.transformationRoadmap);
    await this.createAppendix();

    return this.pdf.output('blob');
  }

  async generateStaticContentPDF(data: ReportData): Promise<Blob> {
    // Create professional static content PDF
    this.pdf.setFillColor(25, 43, 81); // Professional dark blue header
    this.pdf.rect(0, 0, this.pageWidth, 60, 'F');
    
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.setFontSize(24);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('NORTHPATH STRATEGIES', this.margin, 30);
    this.pdf.setFontSize(16);
    this.pdf.text(this.translateContent(data.institutionName || 'Resource Guide'), this.margin, 45);

    this.pdf.setTextColor(0, 0, 0);
    this.currentY = 80;

    // Process and add content with language translation
    if (data.analysis.content) {
      const content = this.translateContent(data.analysis.content);
      const lines = content.split('\n');
      
      for (const line of lines) {
        this.checkPageSpace(15);
        
        if (line.startsWith('# ')) {
          // Main heading
          this.pdf.setFontSize(18);
          this.pdf.setFont('helvetica', 'bold');
          this.pdf.text(this.translateContent(line.substring(2)), this.margin, this.currentY);
          this.currentY += 15;
        } else if (line.startsWith('## ')) {
          // Subheading
          this.pdf.setFontSize(14);
          this.pdf.setFont('helvetica', 'bold');
          this.pdf.text(this.translateContent(line.substring(3)), this.margin, this.currentY);
          this.currentY += 10;
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          // Bullet point
          this.pdf.setFontSize(12);
          this.pdf.setFont('helvetica', 'normal');
          this.pdf.text('• ' + this.translateContent(line.substring(2)), this.margin + 5, this.currentY);
          this.currentY += 8;
        } else if (line.trim()) {
          // Regular paragraph
          this.pdf.setFontSize(12);
          this.pdf.setFont('helvetica', 'normal');
          const translatedLine = this.translateContent(line);
          const splitText = this.pdf.splitTextToSize(translatedLine, this.pageWidth - 2 * this.margin);
          this.pdf.text(splitText, this.margin, this.currentY);
          this.currentY += splitText.length * 6;
        } else {
          // Empty line
          this.currentY += 6;
        }
      }
    }

    // Footer
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(100, 100, 100);
    this.pdf.text('© 2025 NorthPath Strategies', this.margin, this.pageHeight - 20);
    this.pdf.text(`Generated: ${new Date().toLocaleDateString()}`, this.pageWidth - 80, this.pageHeight - 20);

    return this.pdf.output('blob');
  }

  private async createCoverPage(data: ReportData) {
    // Header
    this.pdf.setFontSize(28);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Organizational Realignment', this.margin, 50);
    this.pdf.text('Assessment Report', this.margin, 65);

    // Institution name
    if (data.institutionName) {
      this.pdf.setFontSize(20);
      this.pdf.setFont('helvetica', 'normal');
      this.pdf.text(data.institutionName, this.margin, 85);
    }

    // Assessment date
    this.pdf.setFontSize(14);
    this.pdf.text(`Assessment Date: ${new Date(data.assessmentDate).toLocaleDateString()}`, this.margin, 105);
    this.pdf.text(`Report Generated: ${new Date().toLocaleDateString()}`, this.margin, 115);

    // Powered by
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'italic');
    this.pdf.text('Powered by OREA (Organizational Realignment Engine Algorithm)', this.margin, 135);
    this.pdf.text('Northpath Strategies AI-Powered Analysis', this.margin, 145);

    // Key metrics preview
    const { organizationalHealth, aiReadinessScore, redundancyIndex } = data.analysis;
    
    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Key Results', this.margin, 170);

    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(`Organizational Health: ${Math.round(organizationalHealth)}/100`, this.margin, 185);
    this.pdf.text(`AI Readiness Score: ${Math.round(aiReadinessScore)}/100`, this.margin, 195);
    this.pdf.text(`Redundancy Index: ${Math.round(redundancyIndex)}%`, this.margin, 205);

    // Footer
    this.pdf.setFontSize(10);
    this.pdf.text('Confidential - For Internal Use Only', this.margin, 270);
    this.pdf.text('© 2025 Northpath Strategies', this.pageWidth - 80, 270);

    this.addNewPage();
  }

  private async createEnhancedCoverPage(data: ReportData) {
    // Professional header with logo space
    this.pdf.setFillColor(25, 43, 81); // Professional dark blue
    this.pdf.rect(0, 0, this.pageWidth, 60, 'F');
    
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.setFontSize(32);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('ORGANIZATIONAL', this.margin, 30);
    this.pdf.text('REALIGNMENT REPORT', this.margin, 45);

    // Reset text color
    this.pdf.setTextColor(0, 0, 0);
    
    // Institution name with enhanced styling
    if (data.institutionName) {
      this.pdf.setFontSize(24);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.text(data.institutionName, this.margin, 85);
    }

    // AI-Enhanced badge if applicable
    if (data.includeAI) {
      this.pdf.setFillColor(138, 43, 226); // Purple for AI
      this.pdf.roundedRect(this.margin, 95, 80, 15, 3, 3, 'F');
      this.pdf.setTextColor(255, 255, 255);
      this.pdf.setFontSize(10);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.text('AI-ENHANCED ANALYSIS', this.margin + 5, 105);
      this.pdf.setTextColor(0, 0, 0);
    }

    // Assessment details
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(`Assessment Date: ${new Date(data.assessmentDate).toLocaleDateString()}`, this.margin, 130);
    this.pdf.text(`Report Generated: ${new Date().toLocaleDateString()}`, this.margin, 145);
    this.pdf.text(`Generated for: ${data.generatedBy || 'Organization Leadership'}`, this.margin, 160);

    // Key metrics preview with enhanced design
    const { organizationalHealth, aiReadinessScore, redundancyIndex } = data.analysis;
    
    this.pdf.setFillColor(248, 249, 250);
    this.pdf.rect(this.margin, 175, this.pageWidth - 2 * this.margin, 60, 'F');
    this.pdf.setDrawColor(220, 221, 225);
    this.pdf.rect(this.margin, 175, this.pageWidth - 2 * this.margin, 60);

    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('EXECUTIVE SUMMARY', this.margin + 10, 190);

    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    const healthColor = organizationalHealth >= 80 ? [34, 197, 94] : organizationalHealth >= 60 ? [251, 146, 60] : [239, 68, 68];
    const aiColor = aiReadinessScore >= 80 ? [34, 197, 94] : aiReadinessScore >= 60 ? [251, 146, 60] : [239, 68, 68];
    
    this.pdf.setTextColor(healthColor[0], healthColor[1], healthColor[2]);
    this.pdf.text(`Organizational Health: ${Math.round(organizationalHealth)}/100`, this.margin + 10, 205);
    
    this.pdf.setTextColor(aiColor[0], aiColor[1], aiColor[2]);
    this.pdf.text(`AI Readiness Score: ${Math.round(aiReadinessScore)}/100`, this.margin + 10, 220);
    
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text(`Optimization Potential: ${Math.round(redundancyIndex)}%`, this.margin + 10, 235);

    // Professional footer
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'italic');
    this.pdf.text('Powered by OREA (Organizational Realignment Engine Algorithm)', this.margin, 255);
    this.pdf.text('Northpath Strategies - Strategic Organizational Consulting', this.margin, 265);
    
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text('CONFIDENTIAL - For Internal Use Only', this.margin, 280);
    this.pdf.text('© 2025 Northpath Strategies', this.pageWidth - 80, 280);

    this.addNewPage();
  }

  private async createTableOfContents() {
    this.addSectionHeader('Table of Contents');
    
    const contents = [
      { title: 'Executive Summary', page: 3 },
      { title: 'Key Performance Metrics', page: 4 },
      { title: 'Priority Recommendations', page: 5 },
      { title: 'Detailed Section Analysis', page: 6 },
      { title: 'AI Implementation Roadmap', page: 7 },
      { title: 'Transformation Strategy', page: 8 },
      { title: 'Cost-Benefit Analysis', page: 9 },
      { title: 'Industry Benchmarks', page: 10 },
      { title: 'Risk Assessment', page: 11 },
      { title: 'Implementation Timeline', page: 12 },
      { title: 'Appendix', page: 13 }
    ];

    contents.forEach((item, index) => {
      const y = this.currentY + (index * 12);
      this.pdf.setFontSize(12);
      this.pdf.text(item.title, this.margin, y);
      
      // Draw dots
      const dotsStart = this.margin + 120;
      const dotsEnd = this.pageWidth - 40;
      this.pdf.setFontSize(8);
      let dotX = dotsStart;
      while (dotX < dotsEnd) {
        this.pdf.text('.', dotX, y);
        dotX += 3;
      }
      
      this.pdf.setFontSize(12);
      this.pdf.text(item.page.toString(), this.pageWidth - 30, y);
    });

    this.addNewPage();
  }

  private async createExecutiveSummary(executiveSummary: any) {
    this.addSectionHeader('Executive Summary');

    // Organizational Health
    this.addSubheader('Organizational Health Assessment');
    this.addText(`Status: ${executiveSummary.organizationalHealth.status}`);
    this.addText(`Score: ${executiveSummary.organizationalHealth.score}/100`);
    this.addText(executiveSummary.organizationalHealth.description);
    this.addSpacing(5);

    // AI Readiness
    this.addSubheader('AI Readiness Evaluation');
    this.addText(`Level: ${executiveSummary.aiReadiness.level}`);
    this.addText(`Score: ${executiveSummary.aiReadiness.score}/100`);
    this.addText(executiveSummary.aiReadiness.description);
    this.addSpacing(5);

    // Redundancy Assessment
    this.addSubheader('Redundancy Assessment');
    this.addText(`Index: ${executiveSummary.redundancyAssessment.index}%`);
    this.addText(executiveSummary.redundancyAssessment.description);
    this.addSpacing(5);

    // Action Required
    this.addSubheader('Immediate Actions Required');
    this.addText(`Critical Issues: ${executiveSummary.actionRequired.critical}`);
    this.addText(`High Priority Items: ${executiveSummary.actionRequired.high}`);
    this.addText(executiveSummary.actionRequired.description);

    this.addNewPage();
  }

  private async createAIExecutiveSummary(analysis: any) {
    this.addSectionHeader('AI-Enhanced Executive Summary');
    
    if (analysis.executiveSummary) {
      this.addText(analysis.executiveSummary);
      this.addSpacing(10);
    }
    
    this.addSubheader('AI-Generated Insights');
    this.addText('This analysis leverages advanced artificial intelligence to provide deeper insights into your organizational structure, efficiency patterns, and strategic opportunities.');
    
    this.addNewPage();
  }

  private async createAIKeyFindings(analysis: any) {
    this.addSectionHeader('Key Findings');
    
    if (analysis.keyFindings && Array.isArray(analysis.keyFindings)) {
      analysis.keyFindings.forEach((finding: string, index: number) => {
        this.pdf.setFontSize(12);
        this.pdf.setFont('helvetica', 'bold');
        this.pdf.text(`${index + 1}.`, this.margin, this.currentY);
        
        this.pdf.setFont('helvetica', 'normal');
        const lines = this.pdf.splitTextToSize(finding, this.pageWidth - 2 * this.margin - 10);
        this.pdf.text(lines, this.margin + 10, this.currentY);
        
        this.currentY += lines.length * 6 + 5;
        this.checkPageSpace(10);
      });
    }
    
    this.addNewPage();
  }

  private async createKeyMetrics(analysis: any) {
    this.addSectionHeader('Key Performance Metrics');

    // Create a simple bar chart representation
    const metrics = [
      { label: 'Organizational Health', value: analysis.organizationalHealth },
      { label: 'AI Readiness', value: analysis.aiReadinessScore },
      { label: 'Efficiency Index', value: 100 - analysis.redundancyIndex }
    ];

    metrics.forEach((metric, index) => {
      const y = this.currentY + (index * 25);
      this.pdf.setFontSize(12);
      this.pdf.text(metric.label, this.margin, y);
      
      // Draw bar
      const barWidth = (metric.value / 100) * 100;
      this.pdf.setFillColor(metric.value > 70 ? 76 : metric.value > 50 ? 255 : 220, 
                           metric.value > 70 ? 175 : metric.value > 50 ? 193 : 53, 
                           metric.value > 70 ? 80 : metric.value > 50 ? 7 : 69);
      this.pdf.rect(this.margin + 50, y - 5, barWidth, 8, 'F');
      
      // Draw border
      this.pdf.setDrawColor(200, 200, 200);
      this.pdf.rect(this.margin + 50, y - 5, 100, 8);
      
      // Add percentage
      this.pdf.text(`${Math.round(metric.value)}%`, this.margin + 160, y);
    });

    this.currentY += 80;
    this.addNewPage();
  }

  private async createRecommendations(recommendations: any[]) {
    this.addSectionHeader('Priority Recommendations');

    recommendations.slice(0, 10).forEach((rec, index) => {
      this.checkPageSpace(40);
      
      this.addSubheader(`${index + 1}. ${rec.title}`);
      this.addText(`Priority: ${rec.priority.toUpperCase()}`);
      this.addText(`Category: ${rec.category}`);
      this.addText(`Section: ${rec.section}`);
      this.addText(`Description: ${rec.description}`);
      this.addText(`Expected ROI: ${rec.expectedROI}%`);
      this.addText(`Implementation Time: ${rec.timeToImplement} months`);
      this.addText(`Risk Level: ${rec.riskLevel}/10`);
      
      if (rec.aiOpportunity) {
        this.addText(`AI Automation Potential: ${rec.aiOpportunity.automationPotential}%`);
        this.addText(`Required Tools: ${rec.aiOpportunity.toolsRequired.join(', ')}`);
      }
      
      this.addSpacing(8);
    });

    this.addNewPage();
  }

  private async createSectionAnalysis(sectionsAnalysis: any[]) {
    this.addSectionHeader('Detailed Section Analysis');

    sectionsAnalysis.forEach((section) => {
      this.checkPageSpace(35);
      
      this.addSubheader(section.section);
      this.addText(`Performance: ${section.performance}`);
      this.addText(`Average Score: ${section.averageScore}/5.0`);
      this.addText(`Consistency: ${section.consistency}%`);
      this.addText(`Strength Areas: ${section.strengthAreas} questions`);
      this.addText(`Improvement Areas: ${section.improvementAreas} questions`);
      this.addText(`Total Questions: ${section.totalQuestions}`);
      
      this.addSpacing(6);
    });

    this.addNewPage();
  }

  private async createAIRoadmap(aiPlan: any) {
    this.addSectionHeader('AI Implementation Roadmap');

    this.addSubheader('Quick Wins (0-6 months)');
    aiPlan.quickWins.slice(0, 5).forEach((win: any) => {
      this.addText(`• ${win.section}: ${win.title}`);
      this.addText(`  ROI: ${win.expectedROI}%, Time: ${win.timeToImplement} months`);
    });

    this.addSpacing(10);

    this.addSubheader('Strategic Initiatives (6-18 months)');
    aiPlan.strategicInitiatives.slice(0, 5).forEach((initiative: any) => {
      this.addText(`• ${initiative.section}: ${initiative.title}`);
      this.addText(`  ROI: ${initiative.expectedROI}%, Cost: $${initiative.estimatedCost?.toLocaleString() || 'TBD'}`);
    });

    this.addNewPage();
  }

  private async createTransformationPlan(roadmap: any[]) {
    this.addSectionHeader('Transformation Roadmap');

    roadmap.forEach((phase) => {
      this.checkPageSpace(25);
      
      this.addSubheader(`Phase ${phase.phase}: ${phase.name}`);
      this.addText(`Duration: ${phase.duration} months`);
      this.addText(`Expected Impact: ${phase.expectedImpact}`);
      this.addText(`Recommendations: ${phase.recommendations.length} items`);
      
      this.addSpacing(6);
    });

    this.addNewPage();
  }

  private async createCostBenefitAnalysis(analysis: any) {
    this.addSectionHeader('Cost-Benefit Analysis');
    
    if (analysis.costBenefitAnalysis) {
      const cba = analysis.costBenefitAnalysis;
      
      this.addSubheader('Financial Impact Summary');
      this.addText(`Total Implementation Cost: $${cba.totalImplementationCost?.toLocaleString() || 'N/A'}`);
      this.addText(`Expected Annual Savings: $${cba.expectedAnnualSavings?.toLocaleString() || 'N/A'}`);
      this.addText(`Payback Period: ${cba.paybackPeriodMonths || 'N/A'} months`);
      this.addText(`5-Year ROI: ${cba.fiveYearROI || 'N/A'}%`);
      this.addText(`Risk-Adjusted ROI: ${cba.riskAdjustedROI || 'N/A'}%`);
    }
    
    this.addNewPage();
  }

  private async createBenchmarkComparison(analysis: any) {
    this.addSectionHeader('Industry Benchmarks');
    
    if (analysis.benchmarkComparison) {
      const benchmark = analysis.benchmarkComparison;
      
      this.addSubheader('Peer Comparison');
      this.addText(benchmark.peerComparison);
      this.addSpacing(10);
      
      this.addSubheader('Performance Metrics vs Industry Standards');
      
      if (benchmark.industryStandards) {
        benchmark.industryStandards.forEach((metric: any) => {
          this.addText(`${metric.metric}:`);
          this.addText(`  Your Score: ${metric.yourScore}`);
          this.addText(`  Industry Average: ${metric.industryAverage}`);
          this.addText(`  Top Performers: ${metric.topPerformers}`);
          this.addSpacing(5);
        });
      }
    }
    
    this.addNewPage();
  }

  private async createRiskAssessment(analysis: any) {
    this.addSectionHeader('Risk Assessment');
    
    if (analysis.riskAssessment) {
      this.addText(analysis.riskAssessment);
    }
    
    this.addNewPage();
  }

  private async createImplementationRoadmap(analysis: any) {
    this.addSectionHeader('Implementation Roadmap');
    
    if (analysis.implementationRoadmap) {
      analysis.implementationRoadmap.forEach((phase: any) => {
        this.addSubheader(`${phase.phase.toUpperCase()} (${phase.timeframe})`);
        this.addText(`Priority: ${phase.priority.toUpperCase()}`);
        
        if (phase.initiatives) {
          phase.initiatives.forEach((initiative: any) => {
            this.pdf.setFontSize(11);
            this.pdf.setFont('helvetica', 'bold');
            this.pdf.text(`• ${initiative.title}`, this.margin + 5, this.currentY);
            this.currentY += 6;
            
            this.pdf.setFont('helvetica', 'normal');
            this.pdf.setFontSize(10);
            this.addText(`  ${initiative.description}`);
            this.addText(`  Expected ROI: ${initiative.expectedROI}% | Cost: $${initiative.implementationCost.toLocaleString()} | Risk Level: ${initiative.riskLevel}/10`);
            this.addSpacing(3);
          });
        }
        
        this.addSpacing(10);
      });
    }
    
    this.addNewPage();
  }

  private async createAppendix() {
    this.addSectionHeader('Appendix');
    
    this.addSubheader('Methodology');
    this.addText('This analysis was conducted using the Organizational Realignment Engine Algorithm (OREA), which evaluates organizational efficiency, AI readiness, and optimization opportunities across multiple dimensions.');
    
    this.addSpacing(5);
    
    this.addSubheader('Data Sources');
    this.addText('• Assessment responses from key stakeholders');
    this.addText('• Industry benchmarking data');
    this.addText('• Best practice frameworks');
    this.addText('• AI capability assessments');
    
    this.addSpacing(5);
    
    this.addSubheader('Scoring Methodology');
    this.addText('Scores are calculated using weighted averages across response categories, with additional algorithms for consistency checking and outlier detection.');
    
    this.addNewPage();
  }

  private addSectionHeader(title: string) {
    this.checkPageSpace(15);
    this.pdf.setFontSize(18);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title, this.margin, this.currentY);
    this.currentY += 10;
  }

  private addSubheader(title: string) {
    this.checkPageSpace(10);
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title, this.margin, this.currentY);
    this.currentY += 8;
  }

  private addText(text: string) {
    this.checkPageSpace(8);
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    
    // Handle text wrapping
    const lines = this.pdf.splitTextToSize(text, this.pageWidth - (this.margin * 2));
    lines.forEach((line: string) => {
      this.checkPageSpace(5);
      this.pdf.text(line, this.margin, this.currentY);
      this.currentY += 5;
    });
  }

  private addSpacing(space: number) {
    this.currentY += space;
  }

  private checkPageSpace(requiredSpace: number) {
    if (this.currentY + requiredSpace > this.pageHeight - this.margin) {
      this.addNewPage();
    }
  }

  private addNewPage() {
    this.pdf.addPage();
    this.currentY = this.margin;
  }

  private addPageNumbers() {
    const pageCount = this.pdf.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      this.pdf.setPage(i);
      this.pdf.setFontSize(10);
      this.pdf.setFont('helvetica', 'normal');
      this.pdf.text(`Page ${i} of ${pageCount}`, this.pageWidth - 40, this.pageHeight - 10);
    }
  }
}

export async function generatePDFReport(analysisData: any, institutionName?: string): Promise<Blob> {
  const generator = new PDFReportGenerator();
  
  const reportData: ReportData = {
    analysis: analysisData,
    institutionName: institutionName || 'Your Institution',
    assessmentDate: analysisData.generatedAt || new Date().toISOString(),
    generatedBy: 'Northpath Strategies AI Assessment'
  };

  return await generator.generateReport(reportData);
}

/**
 * Generates industry-specific PDF content based on institution type
 * This function is used for testing and specialized report generation
 */
export function generateIndustrySpecificPDFContent(
  analysisData: any, 
  institutionType: InstitutionType
): { translatedSections: Record<string, string>; customTerms: Record<string, string> } {
  const reportLabels = getReportLabels(institutionType);
  
  // Create sample translated sections for testing
  const translatedSections: Record<string, string> = {};
  const customTerms: Record<string, string> = {};
  
  // Translate common report sections
  const commonSections = [
    'Executive Summary',
    'Recommendations', 
    'Implementation Plan',
    'Success Metrics',
    'Cost Analysis',
    'Risk Assessment'
  ];
  
  commonSections.forEach(section => {
    translatedSections[section] = reportLabels[section] || section;
  });
  
  // Translate common terms based on institution type
  const commonTerms = ['student', 'curriculum', 'enrollment'];
  commonTerms.forEach(term => {
    customTerms[term] = translateText(term, institutionType);
  });
  
  return {
    translatedSections,
    customTerms
  };
}
