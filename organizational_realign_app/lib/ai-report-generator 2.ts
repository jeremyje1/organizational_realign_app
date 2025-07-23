import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
import { runOpenAI } from '@/lib/openai';

export interface ChartData {
  type: 'bar' | 'pie' | 'line';
  title: string;
  data: Array<{ label: string; value: number; color?: string }>;
  width?: number;
  height?: number;
}

export interface ReportOptions {
  includeRecommendations?: boolean;
  includeCharts?: boolean;
  templateStyle?: 'executive' | 'detailed' | 'minimal';
  organizationName?: string;
  reportTitle?: string;
}

export class AIReportGenerator {
  private pdfDoc: PDFDocument;
  private currentPage: PDFPage;
  private currentY: number;
  private margin: number = 50;
  private fontRegular: any;
  private fontBold: any;
  private pageWidth: number;
  private pageHeight: number;

  constructor() {
    this.currentY = 0;
    this.pageWidth = 0;
    this.pageHeight = 0;
  }

  async initialize() {
    this.pdfDoc = await PDFDocument.create();
    this.fontRegular = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
    this.fontBold = await this.pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Set document metadata
    this.pdfDoc.setTitle('AI-Generated Organizational Assessment Report');
    this.pdfDoc.setAuthor('AI Analysis System');
    this.pdfDoc.setSubject('Executive Summary and Strategic Analysis');
    this.pdfDoc.setCreator('Organizational Realignment Platform');
    
    this.addNewPage();
  }

  addNewPage(): PDFPage {
    this.currentPage = this.pdfDoc.addPage();
    const { width, height } = this.currentPage.getSize();
    this.pageWidth = width;
    this.pageHeight = height;
    this.currentY = height - this.margin;
    return this.currentPage;
  }

  async generateReport(answers: any, scores: any, options: ReportOptions = {}): Promise<Uint8Array> {
    await this.initialize();

    // Generate AI content
    const narrative = await this.generateNarrative(answers, scores);
    
    // Add title page
    this.addTitlePage(options);
    
    // Add executive summary
    this.addNewPage();
    this.addSection('Executive Summary', narrative);
    
    // Add scores section
    this.addScoresSection(scores);
    
    // Add charts if requested
    if (options.includeCharts) {
      await this.addChartsSection(scores);
    }
    
    // Add recommendations if requested
    if (options.includeRecommendations) {
      const recommendations = await this.generateRecommendations(answers, scores);
      this.addNewPage();
      this.addSection('Strategic Recommendations', recommendations);
    }

    // Add footer to all pages
    this.addFootersToAllPages();

    return await this.pdfDoc.save();
  }

  private async generateNarrative(answers: any, scores: any): Promise<string> {
    const prompt = `
      Create a comprehensive executive summary for an organizational assessment report.
      
      Assessment Scores:
      ${JSON.stringify(scores, null, 2)}
      
      Key Assessment Data:
      ${JSON.stringify(answers, null, 2)}
      
      Please provide:
      1. Overall organizational health assessment
      2. Key strengths and areas for improvement
      3. Critical insights from the data
      4. Executive-level strategic observations
      
      Use professional business language suitable for C-level executives.
      Keep it concise but comprehensive, approximately 400-500 words.
    `;

    return await runOpenAI(prompt, { maxTokens: 1500, temperature: 0.7 });
  }

  private async generateRecommendations(answers: any, scores: any): Promise<string> {
    const prompt = `
      Based on the organizational assessment data provided, generate specific, actionable recommendations:
      
      Scores: ${JSON.stringify(scores, null, 2)}
      Assessment Data: ${JSON.stringify(answers, null, 2)}
      
      Structure the recommendations as:
      1. Immediate Actions (0-3 months)
      2. Short-term Initiatives (3-12 months)  
      3. Long-term Strategic Changes (1-3 years)
      4. Risk Mitigation Strategies
      5. Success Metrics and KPIs
      
      Each recommendation should include specific actions, expected outcomes, and implementation considerations.
    `;

    return await runOpenAI(prompt, { maxTokens: 2000, temperature: 0.6 });
  }

  private addTitlePage(options: ReportOptions) {
    const centerX = this.pageWidth / 2;
    
    // Main title
    const title = options.reportTitle || 'Organizational Assessment Report';
    this.currentPage.drawText(title, {
      x: centerX - (this.fontBold.widthOfTextAtSize(title, 24) / 2),
      y: this.currentY - 100,
      size: 24,
      font: this.fontBold,
      color: rgb(0.1, 0.1, 0.5),
    });

    // Organization name
    if (options.organizationName) {
      this.currentPage.drawText(options.organizationName, {
        x: centerX - (this.fontRegular.widthOfTextAtSize(options.organizationName, 18) / 2),
        y: this.currentY - 150,
        size: 18,
        font: this.fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });
    }

    // Generation date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.currentPage.drawText(`Generated: ${date}`, {
      x: centerX - (this.fontRegular.widthOfTextAtSize(`Generated: ${date}`, 12) / 2),
      y: this.currentY - 200,
      size: 12,
      font: this.fontRegular,
      color: rgb(0.5, 0.5, 0.5),
    });

    // AI-powered notice
    const aiNotice = 'Powered by AI Analysis';
    this.currentPage.drawText(aiNotice, {
      x: centerX - (this.fontRegular.widthOfTextAtSize(aiNotice, 10) / 2),
      y: this.margin,
      size: 10,
      font: this.fontRegular,
      color: rgb(0.6, 0.6, 0.6),
    });
  }

  private addSection(title: string, content: string) {
    // Check if we need a new page
    if (this.currentY < this.margin + 100) {
      this.addNewPage();
    }

    // Add section title
    this.currentPage.drawText(title, {
      x: this.margin,
      y: this.currentY,
      size: 16,
      font: this.fontBold,
      color: rgb(0.1, 0.1, 0.5),
    });
    this.currentY -= 30;

    // Add content
    this.addWrappedText(content, 11);
  }

  private addScoresSection(scores: any) {
    this.addSection('Key Performance Metrics', '');
    
    const keyScores = this.extractKeyScores(scores);
    for (const [key, value] of Object.entries(keyScores)) {
      if (this.currentY < this.margin + 20) {
        this.addNewPage();
      }
      
      this.currentPage.drawText(`• ${key}: ${value}`, {
        x: this.margin + 20,
        y: this.currentY,
        size: 11,
        font: this.fontRegular,
        color: rgb(0, 0, 0),
      });
      this.currentY -= 20;
    }
  }

  private async addChartsSection(scores: any) {
    // Create simple text-based charts for now
    // In a full implementation, you would generate SVG charts and convert them
    this.addNewPage();
    this.addSection('Performance Visualization', '');
    
    const chartData = this.createChartData(scores);
    
    for (const chart of chartData) {
      if (this.currentY < this.margin + 100) {
        this.addNewPage();
      }
      
      this.currentPage.drawText(chart.title, {
        x: this.margin + 20,
        y: this.currentY,
        size: 12,
        font: this.fontBold,
        color: rgb(0.2, 0.2, 0.2),
      });
      this.currentY -= 25;
      
      // Simple text-based bar chart representation
      for (const item of chart.data) {
        const barLength = Math.round((item.value / 10) * 30); // Scale to 30 chars max
        const bar = '█'.repeat(barLength) + '░'.repeat(30 - barLength);
        
        this.currentPage.drawText(`${item.label}: ${bar} ${item.value}/10`, {
          x: this.margin + 40,
          y: this.currentY,
          size: 9,
          font: this.fontRegular,
          color: rgb(0, 0, 0),
        });
        this.currentY -= 15;
      }
      this.currentY -= 20;
    }
  }

  private addWrappedText(text: string, fontSize: number) {
    const maxWidth = this.pageWidth - (this.margin * 2);
    const lines = this.wrapText(text, fontSize, maxWidth);
    
    for (const line of lines) {
      if (this.currentY < this.margin + 20) {
        this.addNewPage();
      }
      
      this.currentPage.drawText(line, {
        x: this.margin,
        y: this.currentY,
        size: fontSize,
        font: this.fontRegular,
        color: rgb(0, 0, 0),
      });
      this.currentY -= fontSize + 5;
    }
  }

  private wrapText(text: string, fontSize: number, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = this.fontRegular.widthOfTextAtSize(testLine, fontSize);
      
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  }

  private extractKeyScores(scores: any): Record<string, string> {
    const keyScores: Record<string, string> = {};
    
    // Extract common score fields
    const scoreFields = [
      'organizationalHealth',
      'efficiencyScore', 
      'aiReadinessScore',
      'overallScore',
      'riskLevel'
    ];

    for (const field of scoreFields) {
      if (scores[field] !== undefined) {
        const value = typeof scores[field] === 'number' 
          ? `${scores[field]}/10`
          : scores[field];
        keyScores[this.formatFieldName(field)] = value;
      }
    }
    
    return keyScores;
  }

  private formatFieldName(fieldName: string): string {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private createChartData(scores: any): ChartData[] {
    const charts: ChartData[] = [];
    
    // Create a performance overview chart
    const performanceData = [];
    if (scores.organizationalHealth !== undefined) {
      performanceData.push({ label: 'Organizational Health', value: scores.organizationalHealth });
    }
    if (scores.efficiencyScore !== undefined) {
      performanceData.push({ label: 'Efficiency', value: scores.efficiencyScore });
    }
    if (scores.aiReadinessScore !== undefined) {
      performanceData.push({ label: 'AI Readiness', value: scores.aiReadinessScore });
    }
    
    if (performanceData.length > 0) {
      charts.push({
        type: 'bar',
        title: 'Performance Overview',
        data: performanceData
      });
    }
    
    return charts;
  }

  private addFootersToAllPages() {
    const pages = this.pdfDoc.getPages();
    const footerText = 'Confidential - Organizational Assessment Report';
    
    pages.forEach((page, index) => {
      const pageNumber = `Page ${index + 1} of ${pages.length}`;
      
      page.drawText(footerText, {
        x: this.margin,
        y: 30,
        size: 8,
        font: this.fontRegular,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      page.drawText(pageNumber, {
        x: this.pageWidth - this.margin - this.fontRegular.widthOfTextAtSize(pageNumber, 8),
        y: 30,
        size: 8,
        font: this.fontRegular,
        color: rgb(0.5, 0.5, 0.5),
      });
    });
  }
}
