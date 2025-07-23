import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    // Simple admin authentication check
    if (!authHeader || !authHeader.includes('admin-token')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Fetch recent assessments for debugging
    const { data: assessments, error } = await supabase
      .from('assessments')
      .select('id, institution_name, contact_email, tier, created_at, status')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching assessments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch assessments', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      count: assessments?.length || 0,
      assessments: assessments || []
    });

  } catch (error) {
    console.error('Admin assessments list error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
