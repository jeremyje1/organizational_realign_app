-- Add Assessment tables for payment tracking
-- This creates the tables needed for the payment system without disrupting existing schema

-- Create assessment status enum
CREATE TYPE "public"."AssessmentStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ANALYZED', 'DELIVERED');

-- Create collaborator role enum  
CREATE TYPE "public"."CollaboratorRole" AS ENUM ('ADMIN', 'COLLABORATOR', 'VIEWER');

-- Create assessments table
CREATE TABLE "public"."assessments" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "tier" TEXT NOT NULL,
  "status" "public"."AssessmentStatus" NOT NULL DEFAULT 'PENDING',
  "stripe_customer_id" TEXT,
  "stripe_session_id" TEXT,
  "survey_id" TEXT,
  "report_url" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  "completed_at" TIMESTAMP(3),

  CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- Create assessment collaborators table
CREATE TABLE "public"."assessment_collaborators" (
  "id" TEXT NOT NULL,
  "assessment_id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "role" "public"."CollaboratorRole" NOT NULL DEFAULT 'COLLABORATOR',
  "invited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "joined_at" TIMESTAMP(3),

  CONSTRAINT "assessment_collaborators_pkey" PRIMARY KEY ("id")
);

-- Create indexes
CREATE INDEX "assessments_user_id_idx" ON "public"."assessments"("user_id");
CREATE INDEX "assessments_status_idx" ON "public"."assessments"("status");
CREATE UNIQUE INDEX "assessment_collaborators_assessment_id_email_key" ON "public"."assessment_collaborators"("assessment_id", "email");

-- Add foreign key constraints (assuming users table exists in auth schema)
-- Note: This assumes the users table exists in the auth schema from Supabase
-- ALTER TABLE "public"."assessments" ADD CONSTRAINT "assessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- ALTER TABLE "public"."assessment_collaborators" ADD CONSTRAINT "assessment_collaborators_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
