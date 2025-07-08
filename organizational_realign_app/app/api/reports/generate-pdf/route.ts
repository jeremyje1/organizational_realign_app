import { NextRequest, NextResponse } from 'next/server';
import { generatePDFReport } from '@/lib/pdf-report-generator';

export async function POST(request: NextRequest) {
  try {
    const { analysis } = await request.json();

    if (!analysis) {
      return NextResponse.json({ error: 'Analysis data is required' }, { status: 400 });
    }

    // Generate PDF buffer
    const pdfBuffer = await generatePDFReport(analysis);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="organizational-analysis-${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF report' },
      { status: 500 }
    );
  }
}
