import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { runOpenAI, generateRecommendations } from '@/lib/openai';
import { AIReportGenerator } from '@/lib/ai-report-generator';

export async function POST(request: NextRequest) {
  try {
    const { answers, scores, options = {} } = await request.json();

    if (!answers || !scores) {
      return NextResponse.json(
        { error: 'Both answers and scores are required' },
        { status: 400 }
      );
    }

    console.log('Generating AI narrative PDF report...');
    
    // Use the enhanced AI report generator
    const generator = new AIReportGenerator();
    const pdfBytes = await generator.generateReport(answers, scores, {
      includeRecommendations: options.includeRecommendations ?? true,
      includeCharts: options.includeCharts ?? true,
      templateStyle: options.templateStyle ?? 'executive',
      organizationName: options.organizationName,
      reportTitle: options.reportTitle
    });

    // Return PDF response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ai-narrative-report-${Date.now()}.pdf"`,
        'Content-Length': pdfBytes.length.toString(),
      },
    });

  } catch (error) {
    console.error('AI PDF generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate AI narrative PDF',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Legacy simple implementation for backwards compatibility
export async function generateSimplePDF(answers: any, scores: any): Promise<Uint8Array> {
  // Generate AI narrative content
  const narrative = await runOpenAI(`
    Write a comprehensive 2-page executive summary explaining the organizational assessment scores and findings:
    
    Assessment Scores:
    ${JSON.stringify(scores, null, 2)}
    
    Assessment Answers Summary:
    ${JSON.stringify(answers, null, 2)}
    
    The summary should be professional, actionable, and suitable for executive leadership. 
    Include key insights, recommendations, and strategic priorities.
    Format with clear sections and bullet points where appropriate.
  `);

  // Generate additional recommendations
  const recommendations = await generateRecommendations(answers, scores);

  // Create PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Set document metadata
  pdfDoc.setTitle('Organizational Assessment Report');
  pdfDoc.setAuthor('AI-Powered Analysis System');
  pdfDoc.setSubject('Executive Summary and Recommendations');
  pdfDoc.setCreator('Organizational Realignment App');
  pdfDoc.setProducer('AI-Narrative PDF Generator');

  // Add first page
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  // Load fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Define layout constants
  const margin = 50;
  const titleSize = 20;
  const headingSize = 14;
  const bodySize = 11;
  const lineHeight = 15;
  let currentY = height - margin;

  // Add header/title
  page.drawText('Organizational Assessment Report', {
    x: margin,
    y: currentY,
    size: titleSize,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.5),
  });
  currentY -= titleSize + 20;

  // Add generation date
  const generationDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  page.drawText(`Generated: ${generationDate}`, {
    x: margin,
    y: currentY,
    size: bodySize,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });
  currentY -= bodySize + 30;

  // Split narrative into lines and add to PDF
  const maxLineWidth = width - (margin * 2);
  const narrativeLines = wrapText(narrative, fontRegular, bodySize, maxLineWidth);
  
  for (const line of narrativeLines) {
    if (currentY < margin + 50) {
      // Add new page if needed
      const newPage = pdfDoc.addPage();
      currentY = newPage.getSize().height - margin;
      
      newPage.drawText(line, {
        x: margin,
        y: currentY,
        size: bodySize,
        font: fontRegular,
        color: rgb(0, 0, 0),
      });
    } else {
      page.drawText(line, {
        x: margin,
        y: currentY,
        size: bodySize,
        font: fontRegular,
        color: rgb(0, 0, 0),
      });
    }
    currentY -= lineHeight;
  }

  // Add scores summary section
  if (currentY < margin + 100) {
    const newPage = pdfDoc.addPage();
    currentY = newPage.getSize().height - margin;
    
    newPage.drawText('Key Performance Metrics', {
      x: margin,
      y: currentY,
      size: headingSize,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.5),
    });
  } else {
    currentY -= 30;
    page.drawText('Key Performance Metrics', {
      x: margin,
      y: currentY,
      size: headingSize,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.5),
    });
  }
  currentY -= headingSize + 15;

  // Add key scores
  const keyScores = extractKeyScores(scores);
  for (const [key, value] of Object.entries(keyScores)) {
    const scoreText = `${key}: ${value}`;
    page.drawText(scoreText, {
      x: margin + 20,
      y: currentY,
      size: bodySize,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });
    currentY -= lineHeight;
  }

  // Add recommendations
  currentY -= 20;
  if (currentY < margin + 100) {
    const newPage = pdfDoc.addPage();
    currentY = newPage.getSize().height - margin;
    
    newPage.drawText('Strategic Recommendations', {
      x: margin,
      y: currentY,
      size: headingSize,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.5),
    });
  } else {
    page.drawText('Strategic Recommendations', {
      x: margin,
      y: currentY,
      size: headingSize,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.5),
    });
  }
  currentY -= headingSize + 15;

  const recommendationLines = wrapText(recommendations, fontRegular, bodySize, maxLineWidth);
  for (const line of recommendationLines) {
    if (currentY < margin + 20) {
      const newPage = pdfDoc.addPage();
      currentY = newPage.getSize().height - margin;
      
      newPage.drawText(line, {
        x: margin,
        y: currentY,
        size: bodySize,
        font: fontRegular,
        color: rgb(0, 0, 0),
      });
    } else {
      page.drawText(line, {
        x: margin,
        y: currentY,
        size: bodySize,
        font: fontRegular,
        color: rgb(0, 0, 0),
      });
    }
    currentY -= lineHeight;
  }

  // Save PDF
  return await pdfDoc.save();
}

// Helper function to wrap text to fit within specified width
function wrapText(text: string, font: any, fontSize: number, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    
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

// Helper function to extract key scores for display
function extractKeyScores(scores: any): Record<string, string> {
  const keyScores: Record<string, string> = {};
  
  if (scores.organizationalHealth !== undefined) {
    keyScores['Organizational Health'] = `${scores.organizationalHealth}/10`;
  }
  if (scores.efficiencyScore !== undefined) {
    keyScores['Efficiency Score'] = `${scores.efficiencyScore}/10`;
  }
  if (scores.aiReadinessScore !== undefined) {
    keyScores['AI Readiness'] = `${scores.aiReadinessScore}/10`;
  }
  if (scores.riskLevel !== undefined) {
    keyScores['Risk Level'] = scores.riskLevel;
  }
  if (scores.overallScore !== undefined) {
    keyScores['Overall Score'] = `${scores.overallScore}/10`;
  }
  
  return keyScores;
}
