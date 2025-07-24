import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// AI Readiness database client
const aiReadinessSupabase = createClient(
  process.env.NEXT_PUBLIC_AI_READINESS_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_AI_READINESS_SUPABASE_ANON_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: assessmentId } = await params;
    const authHeader = request.headers.get('Authorization');
    
    // Simple admin authentication check
    if (!authHeader || !authHeader.includes('admin-token')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Determine if this is an AI readiness assessment based on ID prefix
    const isAiReadiness = assessmentId.startsWith('ai-') || assessmentId.startsWith('ai_');
    let assessment;
    let error;
    
    if (isAiReadiness) {
      // Fetch from AI readiness database
      const { data, error: aiError } = await aiReadinessSupabase
        .from('ai_readiness_assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();
      
      assessment = data;
      error = aiError;
    } else {
      // Fetch assessment data with admin privileges (bypassing RLS)
      const { data, error: orgError } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();
      
      assessment = data;
      error = orgError;
    }

    if (error) {
      console.error('Error fetching assessment:', error);
      return NextResponse.json(
        { error: 'Failed to fetch assessment' },
        { status: 500 }
      );
    }

    if (!assessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    // Format the response to match the expected interface
    const formattedAssessment = {
      id: assessment.id,
      tier: assessment.tier,
      organization_type: assessment.organization_type || 'unknown',
      institution_name: assessment.institution_name || 'Unknown Institution',
      contact_email: assessment.contact_email || '',
      contact_name: assessment.contact_name || '',
      responses: assessment.responses || {},
      uploaded_files: assessment.uploaded_files || [],
      created_at: assessment.created_at,
      analysis_results: assessment.analysis_results,
      ai_opportunity_assessment: assessment.ai_opportunity_assessment,
      ai_readiness_score: assessment.ai_readiness_score
    };

    return NextResponse.json(formattedAssessment);

  } catch (error) {
    console.error('Admin assessment fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: assessmentId } = await params;
    const authHeader = request.headers.get('Authorization');
    
    // Simple admin authentication check
    if (!authHeader || !authHeader.includes('admin-token')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, updateData } = body;

    switch (action) {
      case 'update-status':
        // Determine if this is an AI readiness assessment
        const isAiReadiness = assessmentId.startsWith('ai-') || assessmentId.startsWith('ai_');
        let updated, updateError;

        if (isAiReadiness) {
          // Update in AI readiness database
          const { data, error } = await aiReadinessSupabase
            .from('ai_readiness_assessments')
            .update(updateData)
            .eq('id', assessmentId)
            .select()
            .single();
          updated = data;
          updateError = error;
        } else {
          // Update assessment status or other admin-only fields
          const { data, error } = await supabase
            .from('assessments')
            .update(updateData)
            .eq('id', assessmentId)
            .select()
            .single();
          updated = data;
          updateError = error;
        }

        if (updateError) {
          throw updateError;
        }

        return NextResponse.json({ success: true, data: updated });

      case 'delete':
        // Determine database and delete
        const isAiReadinessDelete = assessmentId.startsWith('ai-') || assessmentId.startsWith('ai_');
        let deleteError;

        if (isAiReadinessDelete) {
          const { error } = await aiReadinessSupabase
            .from('ai_readiness_assessments')
            .delete()
            .eq('id', assessmentId);
          deleteError = error;
        } else {
          // Admin-only delete operation
          const { error } = await supabase
            .from('assessments')
            .delete()
            .eq('id', assessmentId);
          deleteError = error;
        }

        if (deleteError) {
          throw deleteError;
        }

        return NextResponse.json({ success: true, message: 'Assessment deleted' });

      case 'regenerate-analysis':
        // Trigger analysis regeneration
        // This would typically call the analysis API
        return NextResponse.json({ 
          success: true, 
          message: 'Analysis regeneration queued' 
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Admin assessment operation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
