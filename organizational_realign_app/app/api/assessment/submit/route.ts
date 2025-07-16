import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers';
import {
  createServerClient,
  type CookieOptions,
} from '@supabase/ssr';
import { EmailNotifications } from '../../../lib/email-notifications';

export const dynamic = 'force-dynamic';

/** POST /api/assessment/submit – persists tier-based assessment data */
export async function POST(req: NextRequest) {
  try {
    // Build a fresh Supabase client **inside** the request scope so that
    // the cookies helper receives the current request/response context.
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

    const body = await req.json();
    
    // Validate required fields
    const { tier, organizationType, institutionName, responses, uploadedFiles } = body;
    
    if (!tier || !organizationType || !responses) {
      return NextResponse.json(
        { error: 'Missing required fields: tier, organizationType, and responses are required' },
        { status: 400 }
      );
    }

    // Prepare assessment data
    const assessmentData = {
      tier,
      organization_type: organizationType,
      institution_name: institutionName || 'Anonymous Institution',
      responses,
      uploaded_files: uploadedFiles || [],
      status: 'completed',
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Try to insert into assessments table first
    let assessmentResult;
    try {
      const { data, error } = await supabase
        .from('assessments')
        .insert([assessmentData])
        .select()
        .single();

      if (error) {
        console.warn('[assessment/submit] Assessments table not available, falling back to surveys table:', error.message);
        assessmentResult = null;
      } else {
        assessmentResult = data;
      }
    } catch {
      console.warn('[assessment/submit] Assessments table not available, falling back to surveys table');
      assessmentResult = null;
    }

    // If assessments table doesn't exist, fall back to surveys table
    if (!assessmentResult) {
      const { data: surveyData, error: surveyError } = await supabase
        .from('surveys')
        .insert([{ 
          answers: assessmentData,
          type: 'tier-based-assessment',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (surveyError) {
        console.error('[assessment/submit] Error saving to surveys table:', surveyError);
        return NextResponse.json(
          { error: 'Failed to save assessment data' },
          { status: 500 }
        );
      }

      assessmentResult = surveyData;
    }

    // Send email notification to support team
    try {
      const emailNotifications = new EmailNotifications();
      await emailNotifications.sendAssessmentSubmissionNotification({
        toEmail: 'support@northpathstrategies.org',
        assessmentId: assessmentResult.id.toString(),
        tier,
        organizationType,
        institutionName: institutionName || 'Anonymous Institution',
        responseCount: Object.keys(responses).length,
        uploadedFileCount: uploadedFiles?.length || 0,
        submittedAt: new Date().toISOString()
      });
    } catch (emailError) {
      // Log email error but don't fail the submission
      console.error('[assessment/submit] Failed to send email notification:', emailError);
    }

    // Generate a session ID for the results
    const sessionId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json({ 
      success: true,
      assessmentId: assessmentResult.id,
      sessionId,
      message: 'Assessment submitted successfully',
      redirectUrl: `/assessment/results?sessionId=${sessionId}&tier=${tier}&orgType=${organizationType}`
    });

  } catch (error) {
    console.error('[assessment/submit] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
