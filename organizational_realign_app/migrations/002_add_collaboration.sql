-- Add team collaboration tables
ALTER TABLE "Assessment" ADD COLUMN "team_id" TEXT;
ALTER TABLE "Assessment" ADD COLUMN "shared_with" TEXT[]; -- Array of email addresses
ALTER TABLE "Assessment" ADD COLUMN "sharing_settings" JSONB DEFAULT '{"public": false, "team_access": true, "external_sharing": false}';

-- Create teams table
CREATE TABLE IF NOT EXISTS "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "institution_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" TEXT NOT NULL
);

-- Create team members table
CREATE TABLE IF NOT EXISTS "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team_id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member', -- 'owner', 'admin', 'member', 'viewer'
    "invited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joined_at" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'active', 'declined'
    CONSTRAINT "TeamMember_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create team comments table for collaboration
CREATE TABLE IF NOT EXISTS "AssessmentComment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessment_id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_name" TEXT,
    "content" TEXT NOT NULL,
    "section" TEXT, -- Optional: comment on specific section
    "recommendation_id" TEXT, -- Optional: comment on specific recommendation
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AssessmentComment_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create assessment versions for tracking changes
CREATE TABLE IF NOT EXISTS "AssessmentVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessment_id" TEXT NOT NULL,
    "version_number" INTEGER NOT NULL,
    "changes" JSONB NOT NULL, -- Track what changed
    "changed_by" TEXT NOT NULL,
    "change_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AssessmentVersion_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "Team_owner_id_idx" ON "Team" ("owner_id");
CREATE INDEX IF NOT EXISTS "TeamMember_team_id_idx" ON "TeamMember" ("team_id");
CREATE INDEX IF NOT EXISTS "TeamMember_user_email_idx" ON "TeamMember" ("user_email");
CREATE INDEX IF NOT EXISTS "AssessmentComment_assessment_id_idx" ON "AssessmentComment" ("assessment_id");
CREATE INDEX IF NOT EXISTS "AssessmentVersion_assessment_id_idx" ON "AssessmentVersion" ("assessment_id");
