import { NextRequest, NextResponse } from 'next/server';
import { parseUploads } from '@/lib/parseUploads';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only CSV and XLSX files are supported.' }, 
        { status: 400 }
      );
    }

    // Get file content as buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Parse the uploaded file
    const result = await parseUploads(buffer, file.name, file.type);
    
    return NextResponse.json({
      success: result.success,
      fileName: file.name,
      recordsProcessed: result.recordsProcessed,
      tables: result.tables,
      warnings: result.warnings,
      errors: result.errors
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}
