// lib/assessment-db.ts
// Direct database operations for assessments since they're not in the main Prisma schema

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type AssessmentStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ANALYZED' | 'DELIVERED';
export type AssessmentTier = 'INDIVIDUAL' | 'TEAM' | 'ENTERPRISE';
export type CollaboratorRole = 'ADMIN' | 'COLLABORATOR' | 'VIEWER';

export interface Assessment {
  id: string;
  user_id: string;
  tier: AssessmentTier;
  status: AssessmentStatus;
  stripe_customer_id?: string;
  stripe_session_id?: string;
  survey_id?: string;
  report_url?: string;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}

export interface AssessmentCollaborator {
  id: string;
  assessment_id: string;
  email: string;
  role: CollaboratorRole;
  invited_at: Date;
  joined_at?: Date;
}

export class AssessmentDB {
  static async createAssessment(data: {
    userId: string;
    tier: AssessmentTier;
    stripeCustomerId?: string;
    stripeSessionId?: string;
  }): Promise<Assessment> {
    const id = crypto.randomUUID();
    const now = new Date();
    
    await prisma.$executeRaw`
      INSERT INTO "public"."assessments" (
        "id", "user_id", "tier", "status", "stripe_customer_id", "stripe_session_id", 
        "created_at", "updated_at"
      ) VALUES (
        ${id}, ${data.userId}, ${data.tier}, 'PENDING', 
        ${data.stripeCustomerId}, ${data.stripeSessionId}, ${now}, ${now}
      )
    `;

    const assessment = await this.findAssessmentById(id);
    if (!assessment) {
      throw new Error('Failed to create assessment');
    }
    return assessment;
  }

  static async findAssessmentById(id: string): Promise<Assessment | null> {
    const result = await prisma.$queryRaw<Assessment[]>`
      SELECT * FROM "public"."assessments" WHERE "id" = ${id}
    `;
    
    return result[0] || null;
  }

  static async findAssessmentBySessionId(sessionId: string): Promise<Assessment | null> {
    const result = await prisma.$queryRaw<Assessment[]>`
      SELECT * FROM "public"."assessments" WHERE "stripe_session_id" = ${sessionId}
    `;
    
    return result[0] || null;
  }

  static async updateAssessmentStatus(id: string, status: AssessmentStatus): Promise<Assessment | null> {
    const now = new Date();
    
    await prisma.$executeRaw`
      UPDATE "public"."assessments" 
      SET "status" = ${status}, "updated_at" = ${now}
      WHERE "id" = ${id}
    `;

    return this.findAssessmentById(id);
  }

  static async findUserAssessments(userId: string): Promise<Assessment[]> {
    const result = await prisma.$queryRaw<Assessment[]>`
      SELECT * FROM "public"."assessments" 
      WHERE "user_id" = ${userId}
      ORDER BY "created_at" DESC
    `;
    
    return result;
  }
}

export { prisma as assessmentPrisma };
