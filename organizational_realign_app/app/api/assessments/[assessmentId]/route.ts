import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { assessmentId: string } }
) {
  try {
    const { assessmentId } = await params;

    if (!assessmentId) {
      return NextResponse.json(
        { error: 'Assessment ID is required' },
        { status: 400 }
      );
    }

    // Build a fresh Supabase client inside the request scope
    const cookieStore = nextCookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: async (name) => {
            const cookie = await cookieStore;
            return cookie.get(name)?.value;
          },
          set: async (name: string, value: string, options?: CookieOptions) => {
            const cookie = await cookieStore;
            cookie.set({ name, value, ...(options ?? {}) });
          },
          remove: async (name: string, options?: CookieOptions) => {
            const cookie = await cookieStore;
            cookie.delete({ name, ...(options ?? {}) });
          },
        },
      },
    );

    // Handle test IDs with mock data
    if (assessmentId.startsWith('test-')) {
      console.log(`[GET /api/assessments/${assessmentId}] Returning mock data for test ID`);
      
      const mockAssessment = {
        id: assessmentId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: 'test-user',
        company_name: 'Demo Company',
        title: 'Demo Assessment',
        assessment_type: 'organizational_readiness',
        status: 'completed',
        responses: {
          span_control_1: 2,
          span_control_2: 3,
          culture_1: 3,
          culture_2: 3,
          tech_fit_1: 2,
          tech_fit_2: 4,
          readiness_1: 3,
          readiness_2: 2,
          industry: 'technology',
          company_size: 'medium',
          segment: 'midmarket'
        },
        segment: 'midmarket',
        metadata: {
          source: 'secure_access_demo',
          demo_mode: true
        }
      };

      return NextResponse.json({ 
        success: true, 
        data: mockAssessment,
        source: 'mock'
      });
    }

    // Try to fetch from the assessments table
    console.log(`[GET /api/assessments/${assessmentId}] Fetching assessment...`);
    
    const { data: assessmentData, error: assessmentError } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', assessmentId)
      .single();

    if (assessmentError) {
      console.error('Error fetching assessment:', assessmentError);
      
      // If we get a policy error or not found, return a structured response
      if (assessmentError.code === '42P17' || assessmentError.message?.includes('policy')) {
        return NextResponse.json(
          { error: 'Access denied or assessment not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    // Return the assessment data
    return NextResponse.json({ 
      success: true, 
      data: assessmentData,
      source: 'current'
    });

  } catch (error) {
    console.error('Error in GET /api/assessments/[assessmentId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
