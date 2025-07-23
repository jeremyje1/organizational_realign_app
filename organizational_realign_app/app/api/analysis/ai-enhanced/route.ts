// app/api/analysis/ai-enhanced/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { EnhancedAIAnalysisService } from '@/lib/ai-analysis';
import { createClient } from '@supabase/supabase-js';
import { AssessmentDB } from '@/lib/assessment-db';

export async function POST(request: NextRequest) {
  try {
    const { assessmentId } = await request.json();

    if (!assessmentId) {
      return NextResponse.json(
        { error: 'Missing required field: assessmentId' },
        { status: 400 }
      );
    }

    const assessmentData = await AssessmentDB.getAssessmentResponses(assessmentId);

    if (!assessmentData) {
      return NextResponse.json(
        { error: 'Assessment data not found' },
        { status: 404 }
      );
    }

    // Initialize AI analysis service
    const aiService = new EnhancedAIAnalysisService();
    
    // Perform comprehensive analysis
    const analysis = await aiService.generateAIInsights(assessmentData, []);

    // If assessmentId is provided, save the analysis to the database
    if (assessmentId) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
      
      const { error: saveError } = await supabase
        .from('assessment_analyses')
        .upsert({
          assessment_id: assessmentId,
          analysis_data: analysis,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (saveError) {
        console.error('Failed to save analysis:', saveError);
        // Continue anyway - don't fail the request if save fails
      }
    }

    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('AI analysis failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const assessmentId = searchParams.get('assessmentId');

    if (!assessmentId) {
      return NextResponse.json(
        { error: 'Assessment ID is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data, error } = await supabase
      .from('assessment_analyses')
      .select('analysis_data, created_at, updated_at')
      .eq('assessment_id', assessmentId)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Analysis not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      analysis: data.analysis_data,
      metadata: {
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    });

  } catch (error) {
    console.error('Failed to retrieve analysis:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve analysis' },
      { status: 500 }
    );
  }
}
