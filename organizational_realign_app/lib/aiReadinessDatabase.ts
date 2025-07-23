/**
 * AI Readiness Database Operations
 * Handles all database interactions for the AI Readiness Assessment tool
 * Uses separate Supabase database from organizational realignment tool
 */

import { createClient } from '@supabase/supabase-js';
import type { AIReadinessResults, TeamMember } from './aiReadinessEngine';

// AI Readiness Database Configuration
const AI_READINESS_SUPABASE_URL = process.env.AI_READINESS_SUPABASE_URL || process.env.NEXT_PUBLIC_AI_READINESS_SUPABASE_URL;
const AI_READINESS_SUPABASE_ANON_KEY = process.env.AI_READINESS_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_AI_READINESS_SUPABASE_ANON_KEY;

if (!AI_READINESS_SUPABASE_URL || !AI_READINESS_SUPABASE_ANON_KEY) {
  console.warn('⚠️  AI Readiness Supabase credentials not found. Database operations will be disabled.');
}

// Create AI Readiness Supabase client
export const aiReadinessDb = AI_READINESS_SUPABASE_URL && AI_READINESS_SUPABASE_ANON_KEY 
  ? createClient(AI_READINESS_SUPABASE_URL, AI_READINESS_SUPABASE_ANON_KEY)
  : null;

// Database Types
export interface AIReadinessAssessment {
  id: string;
  user_id?: string;
  institution_name: string;
  institution_type?: string;
  institution_size?: string;
  contact_email?: string;
  contact_name?: string;
  tier: 'basic' | 'custom';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ANALYZED';
  responses: Record<string, any>;
  ai_readiness_score?: number;
  domain_scores: Record<string, any>;
  maturity_profile: Record<string, any>;
  policy_recommendations: any[];
  custom_policies_generated: any[];
  implementation_frameworks: any[];
  ai_analysis: Record<string, any>;
  is_team_assessment: boolean;
  team_members: TeamMember[];
  team_analysis: Record<string, any>;
  open_ended_responses: Record<string, any>;
  created_at: string;
  updated_at: string;
  submitted_at?: string;
  analyzed_at?: string;
  pdf_report_generated: boolean;
  pdf_report_url?: string;
}

export interface AIReadinessTeam {
  id: string;
  assessment_id: string;
  team_name: string;
  description?: string;
  created_by: string;
  created_at: string;
}

export interface AIReadinessTeamMember {
  id: string;
  team_id: string;
  assessment_id: string;
  user_id?: string;
  member_name?: string;
  member_email?: string;
  department?: string;
  role?: string;
  responses: Record<string, any>;
  completed_at?: string;
  created_at: string;
}

export interface AIPolicyTemplate {
  id: string;
  policy_type: 'classroom' | 'student' | 'faculty' | 'employee';
  title: string;
  description?: string;
  template_content: string;
  stakeholders: string[];
  implementation_steps: string[];
  created_at: string;
  updated_at: string;
}

export interface AIReadinessPayment {
  id: string;
  assessment_id: string;
  tier: string;
  amount: number;
  currency: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  paid_at?: string;
  created_at: string;
}

/**
 * Database Operations
 */

export class AIReadinessDatabase {
  private static instance: AIReadinessDatabase;
  private db: typeof aiReadinessDb;

  private constructor() {
    this.db = aiReadinessDb;
  }

  public static getInstance(): AIReadinessDatabase {
    if (!AIReadinessDatabase.instance) {
      AIReadinessDatabase.instance = new AIReadinessDatabase();
    }
    return AIReadinessDatabase.instance;
  }

  /**
   * Check if database is available
   */
  isAvailable(): boolean {
    return this.db !== null;
  }

  /**
   * Create new AI readiness assessment
   */
  async createAssessment(assessmentData: Partial<AIReadinessAssessment>): Promise<AIReadinessAssessment | null> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return null;
    }

    try {
      const { data, error } = await this.db
        .from('ai_readiness_assessments')
        .insert([assessmentData])
        .select()
        .single();

      if (error) {
        console.error('Error creating AI readiness assessment:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Database error creating assessment:', error);
      return null;
    }
  }

  /**
   * Update existing assessment
   */
  async updateAssessment(assessmentId: string, updates: Partial<AIReadinessAssessment>): Promise<AIReadinessAssessment | null> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return null;
    }

    try {
      const { data, error } = await this.db
        .from('ai_readiness_assessments')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', assessmentId)
        .select()
        .single();

      if (error) {
        console.error('Error updating AI readiness assessment:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Database error updating assessment:', error);
      return null;
    }
  }

  /**
   * Get assessment by ID
   */
  async getAssessment(assessmentId: string): Promise<AIReadinessAssessment | null> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return null;
    }

    try {
      const { data, error } = await this.db
        .from('ai_readiness_assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (error) {
        console.error('Error fetching AI readiness assessment:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Database error fetching assessment:', error);
      return null;
    }
  }

  /**
   * Get assessments for a user
   */
  async getUserAssessments(userId: string): Promise<AIReadinessAssessment[]> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return [];
    }

    try {
      const { data, error } = await this.db
        .from('ai_readiness_assessments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user AI readiness assessments:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error fetching user assessments:', error);
      return [];
    }
  }

  /**
   * Save assessment results
   */
  async saveResults(assessmentId: string, results: AIReadinessResults): Promise<boolean> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return false;
    }

    try {
      const { error } = await this.db
        .from('ai_readiness_assessments')
        .update({
          ai_readiness_score: results.scores.overall,
          domain_scores: results.scores.domains,
          maturity_profile: results.maturityProfile,
          policy_recommendations: results.policyRecommendations || [],
          team_analysis: results.scores.teamAnalysis || {},
          open_ended_responses: results.openEndedResponses || {},
          status: 'ANALYZED',
          analyzed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', assessmentId);

      if (error) {
        console.error('Error saving AI readiness results:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Database error saving results:', error);
      return false;
    }
  }

  /**
   * Create team for assessment
   */
  async createTeam(teamData: Partial<AIReadinessTeam>): Promise<AIReadinessTeam | null> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return null;
    }

    try {
      const { data, error } = await this.db
        .from('ai_readiness_teams')
        .insert([teamData])
        .select()
        .single();

      if (error) {
        console.error('Error creating AI readiness team:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Database error creating team:', error);
      return null;
    }
  }

  /**
   * Add team member
   */
  async addTeamMember(memberData: Partial<AIReadinessTeamMember>): Promise<AIReadinessTeamMember | null> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return null;
    }

    try {
      const { data, error } = await this.db
        .from('ai_readiness_team_members')
        .insert([memberData])
        .select()
        .single();

      if (error) {
        console.error('Error adding AI readiness team member:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Database error adding team member:', error);
      return null;
    }
  }

  /**
   * Get team members for assessment
   */
  async getTeamMembers(assessmentId: string): Promise<AIReadinessTeamMember[]> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return [];
    }

    try {
      const { data, error } = await this.db
        .from('ai_readiness_team_members')
        .select('*')
        .eq('assessment_id', assessmentId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching AI readiness team members:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error fetching team members:', error);
      return [];
    }
  }

  /**
   * Get policy templates
   */
  async getPolicyTemplates(policyType?: string): Promise<AIPolicyTemplate[]> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return [];
    }

    try {
      let query = this.db.from('ai_policy_templates').select('*');
      
      if (policyType) {
        query = query.eq('policy_type', policyType);
      }

      const { data, error } = await query.order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching AI policy templates:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error fetching policy templates:', error);
      return [];
    }
  }

  /**
   * Create payment record
   */
  async createPayment(paymentData: Partial<AIReadinessPayment>): Promise<AIReadinessPayment | null> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return null;
    }

    try {
      const { data, error } = await this.db
        .from('ai_readiness_payments')
        .insert([paymentData])
        .select()
        .single();

      if (error) {
        console.error('Error creating AI readiness payment:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Database error creating payment:', error);
      return null;
    }
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    assessmentId: string, 
    status: AIReadinessPayment['payment_status'],
    stripePaymentIntentId?: string
  ): Promise<boolean> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return false;
    }

    try {
      const updateData: any = {
        payment_status: status
      };

      if (status === 'completed') {
        updateData.paid_at = new Date().toISOString();
      }

      if (stripePaymentIntentId) {
        updateData.stripe_payment_intent_id = stripePaymentIntentId;
      }

      const { error } = await this.db
        .from('ai_readiness_payments')
        .update(updateData)
        .eq('assessment_id', assessmentId);

      if (error) {
        console.error('Error updating AI readiness payment status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Database error updating payment status:', error);
      return false;
    }
  }

  /**
   * Mark PDF report as generated
   */
  async markPDFGenerated(assessmentId: string, pdfUrl: string): Promise<boolean> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return false;
    }

    try {
      const { error } = await this.db
        .from('ai_readiness_assessments')
        .update({
          pdf_report_generated: true,
          pdf_report_url: pdfUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', assessmentId);

      if (error) {
        console.error('Error marking PDF as generated:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Database error marking PDF generated:', error);
      return false;
    }
  }

  /**
   * Get assessment analytics (for admin dashboard)
   */
  async getAnalytics(startDate?: string, endDate?: string): Promise<any> {
    if (!this.db) {
      console.warn('AI Readiness database not available');
      return null;
    }

    try {
      let query = this.db
        .from('ai_readiness_assessments')
        .select('id, tier, status, ai_readiness_score, institution_type, created_at, submitted_at');

      if (startDate) {
        query = query.gte('created_at', startDate);
      }

      if (endDate) {
        query = query.lte('created_at', endDate);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching AI readiness analytics:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Database error fetching analytics:', error);
      return null;
    }
  }
}

// Export singleton instance
export const aiReadinessDatabase = AIReadinessDatabase.getInstance();

/**
 * Utility functions for working with AI readiness data
 */

export function generateAssessmentId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ai_${timestamp}_${random}`;
}

export function formatAssessmentForDatabase(
  responses: Record<string, any>,
  institutionInfo: any,
  tier: 'basic' | 'custom',
  uploadedDocuments?: Array<{category: string, filename: string, type: string}>
): Partial<AIReadinessAssessment> {
  return {
    id: generateAssessmentId(),
    institution_name: institutionInfo.name,
    institution_type: institutionInfo.type,
    institution_size: institutionInfo.size,
    contact_email: institutionInfo.email,
    contact_name: institutionInfo.contactName,
    tier,
    status: 'PENDING',
    responses,
    domain_scores: {},
    maturity_profile: {},
    policy_recommendations: [],
    custom_policies_generated: [],
    implementation_frameworks: [],
    ai_analysis: {
      uploaded_documents: uploadedDocuments || []
    },
    is_team_assessment: false,
    team_members: [],
    team_analysis: {},
    open_ended_responses: {},
    pdf_report_generated: false
  };
}

export function formatTeamAssessmentForDatabase(
  teamResponses: Record<string, Record<string, any>>,
  institutionInfo: any,
  tier: 'basic' | 'custom',
  teamMembers: TeamMember[],
  uploadedDocuments?: Array<{category: string, filename: string, type: string}>
): Partial<AIReadinessAssessment> {
  const baseAssessment = formatAssessmentForDatabase({}, institutionInfo, tier, uploadedDocuments);
  
  return {
    ...baseAssessment,
    is_team_assessment: true,
    team_members: teamMembers,
    responses: teamResponses
  };
}
