// scripts/create-assessment-tables.ts
// Run this with: npx tsx scripts/create-assessment-tables.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAssessmentTables() {
  try {
    console.log('Creating assessment tables...');
    
    // Create enums first
    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "public"."AssessmentStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ANALYZED', 'DELIVERED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "public"."CollaboratorRole" AS ENUM ('ADMIN', 'COLLABORATOR', 'VIEWER');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    // Create assessments table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "public"."assessments" (
        "id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "tier" TEXT NOT NULL,
        "status" "public"."AssessmentStatus" NOT NULL DEFAULT 'PENDING',
        "stripe_customer_id" TEXT,
        "stripe_session_id" TEXT,
        "survey_id" TEXT,
        "report_url" TEXT,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "completed_at" TIMESTAMP(3),
        CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
      );
    `;

    // Create assessment collaborators table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "public"."assessment_collaborators" (
        "id" TEXT NOT NULL,
        "assessment_id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "role" "public"."CollaboratorRole" NOT NULL DEFAULT 'COLLABORATOR',
        "invited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "joined_at" TIMESTAMP(3),
        CONSTRAINT "assessment_collaborators_pkey" PRIMARY KEY ("id")
      );
    `;

    // Create indexes
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "assessments_user_id_idx" ON "public"."assessments"("user_id");
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "assessments_status_idx" ON "public"."assessments"("status");
    `;
    
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "assessment_collaborators_assessment_id_email_key" 
      ON "public"."assessment_collaborators"("assessment_id", "email");
    `;

    console.log('✅ Assessment tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating assessment tables:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAssessmentTables();
