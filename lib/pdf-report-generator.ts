import jsPDF from 'jspdf';

export interface ReportData {
  analysis: any;
  institutionName?: string;
  assessmentDate: string;
  generatedBy?: string;
}

export class PDFReportGenerator {
  private pdf: jsPDF;
  private pageHeight: number;
  private pageWidth: number;
  private currentY: number;
  private margin: number;

  constructor() {
    this.pdf = new jsPDF('p', 'mm', 'a4');
    this.pageHeight = this.pdf.internal.pageSize.height;
    this.pageWidth = this.pdf.internal.pageSize.width;
    this.margin = 20;
    this.currentY = this.margin;
  }

  async generateReport(data: ReportData): Promise<Blob> {
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
    this.pdf.text('NorthPath Strategies AI-Powered Analysis', this.margin, 145);

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
    this.pdf.text('© 2025 NorthPath Strategies', this.pageWidth - 80, 270);

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

  private async createAppendix() {
    this.addSectionHeader('Appendix');

    this.addSubheader('Methodology');
    this.addText('This assessment utilizes the OREA (Organizational Realignment Engine Algorithm),');
    this.addText('a proprietary AI-powered analysis system that combines:');
    this.addText('• Entropy-based redundancy detection');
    this.addText('• Multi-dimensional efficiency scoring');
    this.addText('• AI readiness assessment with risk adjustment');
    this.addText('• Dynamic resource allocation optimization');
    this.addText('• Predictive transformation modeling');

    this.addSpacing(10);

    this.addSubheader('About NorthPath Strategies');
    this.addText('NorthPath Strategies specializes in higher education organizational');
    this.addText('transformation, combining strategic consulting with cutting-edge AI analytics');
    this.addText('to help institutions optimize their operations and embrace digital innovation.');

    this.addSpacing(10);

    this.addSubheader('Next Steps');
    this.addText('1. Schedule a consultation to discuss your results');
    this.addText('2. Develop a detailed implementation plan');
    this.addText('3. Begin pilot programs for high-ROI recommendations');
    this.addText('4. Monitor progress and adjust strategies as needed');

    this.addSpacing(5);
    this.addText('Contact: consultation@northpathstrategies.org');
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
}

export async function generatePDFReport(analysisData: any, institutionName?: string): Promise<Blob> {
  const generator = new PDFReportGenerator();
  
  const reportData: ReportData = {
    analysis: analysisData,
    institutionName: institutionName || 'Your Institution',
    assessmentDate: analysisData.generatedAt || new Date().toISOString(),
    generatedBy: 'NorthPath Strategies AI Assessment'
  };

  return await generator.generateReport(reportData);
}
