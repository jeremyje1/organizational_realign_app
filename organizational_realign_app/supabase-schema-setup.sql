-- Enhanced Question Bank Database Schema
-- Run this in Supabase SQL Editor to support the new mixed question types and enhanced data structure

-- 1. First, create team collaboration tables (needed for foreign key references)
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Now modify the existing assessments table
-- Fix the id column to have proper UUID default (but keep existing type if text)
DO $$
BEGIN
    -- Check current data type of id column
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'assessments' 
        AND column_name = 'id' 
        AND data_type = 'text'
    ) THEN
        -- If it's text, set a text default (we'll keep it as text for compatibility)
        ALTER TABLE public.assessments ALTER COLUMN id SET DEFAULT gen_random_uuid()::text;
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'assessments' 
        AND column_name = 'id' 
        AND data_type = 'uuid'
    ) THEN
        -- If it's already UUID, set UUID default
        ALTER TABLE public.assessments ALTER COLUMN id SET DEFAULT gen_random_uuid();
    END IF;
    
    -- Make user_id nullable for anonymous submissions
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessments' AND column_name = 'user_id') THEN
        ALTER TABLE public.assessments ALTER COLUMN user_id DROP NOT NULL;
    END IF;
END $$;

-- Add missing columns to existing assessments table
ALTER TABLE public.assessments 
ADD COLUMN IF NOT EXISTS tier TEXT,
ADD COLUMN IF NOT EXISTS organization_type TEXT,
ADD COLUMN IF NOT EXISTS institution_name TEXT,
ADD COLUMN IF NOT EXISTS contact_email TEXT,
ADD COLUMN IF NOT EXISTS contact_name TEXT,
ADD COLUMN IF NOT EXISTS responses JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS uploaded_files JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS analysis_results JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS ai_opportunity_assessment JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS ai_readiness_score INTEGER DEFAULT NULL,
ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS analyzed_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS shared_with TEXT[],
ADD COLUMN IF NOT EXISTS sharing_settings JSONB DEFAULT '{"public": false, "team_access": false, "external_sharing": false}',
ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_payment_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS test_mode BOOLEAN DEFAULT FALSE;

-- Update status column if it exists but with wrong values
DO $$
BEGIN
    -- Check if status column exists and update its constraint
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessments' AND column_name = 'status') THEN
        -- Drop existing constraint if any
        ALTER TABLE public.assessments DROP CONSTRAINT IF EXISTS assessments_status_check;
        -- Add new constraint
        ALTER TABLE public.assessments ADD CONSTRAINT assessments_status_check 
            CHECK (status IN ('PENDING', 'COMPLETED', 'ANALYZED', 'DELIVERED'));
    ELSE
        -- Add status column if it doesn't exist
        ALTER TABLE public.assessments ADD COLUMN status TEXT DEFAULT 'PENDING';
        ALTER TABLE public.assessments ADD CONSTRAINT assessments_status_check 
            CHECK (status IN ('PENDING', 'COMPLETED', 'ANALYZED', 'DELIVERED'));
    END IF;
END $$;

-- Add constraints for the new columns
DO $$
BEGIN
    -- Add tier constraint
    ALTER TABLE public.assessments DROP CONSTRAINT IF EXISTS assessments_tier_check;
    ALTER TABLE public.assessments ADD CONSTRAINT assessments_tier_check 
        CHECK (tier IS NULL OR tier IN ('one-time-diagnostic', 'monthly-subscription', 'comprehensive-package', 'enterprise-transformation'));
    
    -- Add organization_type constraint  
    ALTER TABLE public.assessments DROP CONSTRAINT IF EXISTS assessments_organization_type_check;
    ALTER TABLE public.assessments ADD CONSTRAINT assessments_organization_type_check 
        CHECK (organization_type IS NULL OR organization_type IN ('higher-education', 'healthcare', 'nonprofit', 'corporate', 'government'));
        
    -- Add subscription_status constraint
    ALTER TABLE public.assessments DROP CONSTRAINT IF EXISTS assessments_subscription_status_check;
    ALTER TABLE public.assessments ADD CONSTRAINT assessments_subscription_status_check 
        CHECK (subscription_status IS NULL OR subscription_status IN ('active', 'expired', 'cancelled', 'past_due', 'unpaid'));
END $$;

-- 2. Create or update the surveys table (alternative/backup storage)
CREATE TABLE IF NOT EXISTS public.surveys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Assessment data stored as JSON for flexibility
    data JSONB NOT NULL,
    
    -- Survey type for filtering
    survey_type TEXT DEFAULT 'tier-based-assessment',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to surveys table if needed
ALTER TABLE public.surveys 
ADD COLUMN IF NOT EXISTS survey_type TEXT DEFAULT 'tier-based-assessment',
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Create remaining team collaboration tables
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(team_id, user_id),
    CONSTRAINT team_members_role_check CHECK (role IN ('admin', 'member', 'viewer'))
);

CREATE TABLE IF NOT EXISTS public.team_invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    invited_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT team_invitations_role_check CHECK (role IN ('admin', 'member', 'viewer'))
);

CREATE TABLE IF NOT EXISTS public.assessment_collaborators (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assessment_id TEXT REFERENCES public.assessments(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'VIEWER',
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    joined_at TIMESTAMPTZ,
    UNIQUE(assessment_id, email),
    CONSTRAINT assessment_collaborators_role_check CHECK (role IN ('ADMIN', 'COLLABORATOR', 'VIEWER'))
);

CREATE TABLE IF NOT EXISTS public.assessment_shares (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assessment_id TEXT REFERENCES public.assessments(id) ON DELETE CASCADE,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    permissions JSONB DEFAULT '{"read": true, "write": false, "admin": false}',
    shared_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assessment_id, team_id)
);

CREATE TABLE IF NOT EXISTS public.assessment_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assessment_id TEXT REFERENCES public.assessments(id) ON DELETE CASCADE,
    plan TEXT NOT NULL,
    amount DECIMAL(10,2) DEFAULT 0,
    status TEXT DEFAULT 'completed',
    paid_at TIMESTAMPTZ DEFAULT NOW(),
    customer_email TEXT,
    stripe_session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assessment_id)
);

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_assessments_tier ON public.assessments(tier);
CREATE INDEX IF NOT EXISTS idx_assessments_org_type ON public.assessments(organization_type);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON public.assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON public.assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_assessments_responses ON public.assessments USING GIN(responses);
CREATE INDEX IF NOT EXISTS idx_assessments_ai_assessment ON public.assessments USING GIN(ai_opportunity_assessment);
CREATE INDEX IF NOT EXISTS idx_assessments_ai_score ON public.assessments(ai_readiness_score);
CREATE INDEX IF NOT EXISTS idx_assessments_team_id ON public.assessments(team_id);
CREATE INDEX IF NOT EXISTS idx_assessments_shared_with ON public.assessments USING GIN(shared_with);
CREATE INDEX IF NOT EXISTS idx_assessments_subscription_expires ON public.assessments(subscription_expires_at);
CREATE INDEX IF NOT EXISTS idx_assessments_last_payment ON public.assessments(last_payment_date);
CREATE INDEX IF NOT EXISTS idx_assessments_subscription_status ON public.assessments(subscription_status);

CREATE INDEX IF NOT EXISTS idx_surveys_type ON public.surveys(survey_type);
CREATE INDEX IF NOT EXISTS idx_surveys_created_at ON public.surveys(created_at);
CREATE INDEX IF NOT EXISTS idx_surveys_data ON public.surveys USING GIN(data);

-- Add indexes for team collaboration tables
CREATE INDEX IF NOT EXISTS idx_teams_created_by ON public.teams(created_by);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_team_id ON public.team_invitations(team_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_email ON public.team_invitations(email);
CREATE INDEX IF NOT EXISTS idx_team_invitations_token ON public.team_invitations(token);
CREATE INDEX IF NOT EXISTS idx_assessment_collaborators_assessment_id ON public.assessment_collaborators(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_collaborators_email ON public.assessment_collaborators(email);
CREATE INDEX IF NOT EXISTS idx_assessment_shares_assessment_id ON public.assessment_shares(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_shares_team_id ON public.assessment_shares(team_id);
CREATE INDEX IF NOT EXISTS idx_assessment_payments_assessment_id ON public.assessment_payments(assessment_id);

-- 4. Add trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_assessments_updated_at ON public.assessments;
CREATE TRIGGER update_assessments_updated_at
    BEFORE UPDATE ON public.assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_surveys_updated_at ON public.surveys;
CREATE TRIGGER update_surveys_updated_at
    BEFORE UPDATE ON public.surveys
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add triggers for team tables
DROP TRIGGER IF EXISTS update_teams_updated_at ON public.teams;
CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON public.teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Row Level Security (RLS) Policies
-- Enable RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous assessment submissions" ON public.assessments;
DROP POLICY IF EXISTS "Allow anonymous survey submissions" ON public.surveys;
DROP POLICY IF EXISTS "Users can read own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Allow survey reads" ON public.surveys;

-- Drop team collaboration policies if they exist
DROP POLICY IF EXISTS "Users can read teams they belong to" ON public.teams;
DROP POLICY IF EXISTS "Authenticated users can create teams" ON public.teams;
DROP POLICY IF EXISTS "Team creators and admins can update teams" ON public.teams;
DROP POLICY IF EXISTS "Users can read team members for teams they belong to" ON public.team_members;
DROP POLICY IF EXISTS "Team admins can manage members" ON public.team_members;
DROP POLICY IF EXISTS "Assessment owners and collaborators can read collaborators" ON public.assessment_collaborators;
DROP POLICY IF EXISTS "Assessment owners can manage collaborators" ON public.assessment_collaborators;

-- Policy: Allow anonymous inserts for assessment submissions
CREATE POLICY "Allow anonymous assessment submissions" ON public.assessments
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow anonymous inserts for survey submissions
CREATE POLICY "Allow anonymous survey submissions" ON public.surveys
    FOR INSERT
    WITH CHECK (true);

-- Policy: Users can read their own assessments and shared assessments (handle UUID properly)
CREATE POLICY "Users can read own assessments" ON public.assessments
    FOR SELECT
    USING (
        auth.uid() IS NULL OR 
        user_id IS NULL OR 
        user_id = auth.uid()::text OR
        -- Allow access for team members
        (team_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.team_members 
            WHERE team_id = assessments.team_id AND user_id = auth.uid()
        )) OR
        -- Allow access for assessment collaborators
        EXISTS (
            SELECT 1 FROM public.assessment_collaborators ac
            JOIN auth.users u ON u.email = ac.email
            WHERE ac.assessment_id = assessments.id AND u.id = auth.uid()
        )
    );

-- Policy: Allow reading surveys for authenticated users
CREATE POLICY "Allow survey reads" ON public.surveys
    FOR SELECT
    USING (true);

-- Team collaboration policies
-- Team policies
CREATE POLICY "Users can read teams they belong to" ON public.teams
    FOR SELECT
    USING (
        auth.uid() = created_by OR 
        EXISTS (
            SELECT 1 FROM public.team_members 
            WHERE team_id = teams.id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Authenticated users can create teams" ON public.teams
    FOR INSERT
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Team creators and admins can update teams" ON public.teams
    FOR UPDATE
    USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.team_members 
            WHERE team_id = teams.id AND user_id = auth.uid() AND role = 'admin'
        )
    );

-- Team member policies
CREATE POLICY "Users can read team members for teams they belong to" ON public.team_members
    FOR SELECT
    USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.team_members tm2
            WHERE tm2.team_id = team_members.team_id AND tm2.user_id = auth.uid()
        )
    );

CREATE POLICY "Team admins can manage members" ON public.team_members
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.team_members 
            WHERE team_id = team_members.team_id AND user_id = auth.uid() AND role = 'admin'
        )
    );

-- Assessment collaborator policies
CREATE POLICY "Assessment owners and collaborators can read collaborators" ON public.assessment_collaborators
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.assessments 
            WHERE id = assessment_id AND user_id = auth.uid()::text
        ) OR
        email = (
            SELECT email FROM auth.users WHERE id = auth.uid()
        )
    );

CREATE POLICY "Assessment owners can manage collaborators" ON public.assessment_collaborators
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.assessments 
            WHERE id = assessment_id AND user_id = auth.uid()::text
        )
    );

-- Policy: Admin users can read all assessments (optional)
-- CREATE POLICY "Admins can read all assessments" ON public.assessments
--     FOR ALL
--     USING (auth.jwt() ->> 'role' = 'admin');

-- 6. Create a view for enhanced assessment analytics
-- Drop the existing view first to avoid column naming conflicts
DROP VIEW IF EXISTS public.assessment_analytics;

CREATE VIEW public.assessment_analytics AS
SELECT 
    id,
    tier,
    organization_type,
    institution_name,
    status,
    created_at,
    submitted_at,
    ai_readiness_score as ai_score,
    
    -- Extract AI opportunity metrics
    CASE 
        WHEN ai_opportunity_assessment IS NOT NULL AND jsonb_typeof(ai_opportunity_assessment) = 'object' THEN 
            (ai_opportunity_assessment->>'scope')
        ELSE NULL
    END as ai_assessment_scope,
    
    CASE 
        WHEN ai_opportunity_assessment IS NOT NULL AND jsonb_typeof(ai_opportunity_assessment) = 'object' THEN 
            (ai_opportunity_assessment->>'readinessLevel')
        ELSE NULL
    END as ai_readiness_level,
    
    -- Extract key metrics from responses (handle both JSONB and TEXT)
    CASE 
        WHEN jsonb_typeof(responses) = 'object' THEN (responses->>'leadership_vision_likert')::INTEGER
        ELSE NULL
    END as leadership_vision_score,
    
    CASE 
        WHEN jsonb_typeof(responses) = 'object' THEN (responses->>'communication_effectiveness_likert')::INTEGER
        ELSE NULL
    END as communication_score,
    
    CASE 
        WHEN jsonb_typeof(responses) = 'object' THEN (responses->>'organizational_structure_clarity_likert')::INTEGER
        ELSE NULL
    END as structure_score,
    
    CASE 
        WHEN jsonb_typeof(responses) = 'object' THEN (responses->>'infrastructure_capacity_likert')::INTEGER
        ELSE NULL
    END as infrastructure_score,
    
    -- Count different question types answered (handle JSONB safely)
    CASE 
        WHEN jsonb_typeof(responses) = 'object' THEN (
            SELECT COUNT(*)
            FROM jsonb_each(responses)
            WHERE key LIKE '%_likert'
        )
        ELSE 0
    END as likert_questions_answered,
    
    CASE 
        WHEN jsonb_typeof(responses) = 'object' THEN (
            SELECT COUNT(*)
            FROM jsonb_each(responses)
            WHERE key LIKE '%_numeric'
        )
        ELSE 0
    END as numeric_questions_answered,
    
    CASE 
        WHEN jsonb_typeof(responses) = 'object' THEN (
            SELECT COUNT(*)
            FROM jsonb_each(responses)
            WHERE key LIKE '%_text'
        )
        ELSE 0
    END as text_questions_answered,
    
    -- Total responses and files
    CASE 
        WHEN uploaded_files IS NOT NULL THEN jsonb_array_length(uploaded_files)
        ELSE 0
    END as files_uploaded,
    
    CASE 
        WHEN jsonb_typeof(responses) = 'object' THEN (
            SELECT COUNT(*)
            FROM jsonb_each(responses)
        )
        ELSE 0
    END as total_responses
    
FROM public.assessments
WHERE status = 'COMPLETED' OR status = 'ANALYZED' OR status = 'DELIVERED';

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.assessments TO anon, authenticated;
GRANT ALL ON public.surveys TO anon, authenticated;
GRANT SELECT ON public.assessment_analytics TO anon, authenticated;
GRANT ALL ON public.teams TO anon, authenticated;
GRANT ALL ON public.team_members TO anon, authenticated;
GRANT ALL ON public.team_invitations TO anon, authenticated;
GRANT ALL ON public.assessment_collaborators TO anon, authenticated;
GRANT ALL ON public.assessment_shares TO anon, authenticated;
GRANT ALL ON public.assessment_payments TO anon, authenticated;

-- 8. Insert sample data to test the schema (optional)
INSERT INTO public.assessments (
    tier,
    organization_type,
    institution_name,
    contact_email,
    contact_name,
    responses,
    status,
    submitted_at
) VALUES (
    'one-time-diagnostic',
    'higher-education',
    'Sample University',
    'admin@sample.edu',
    'John Doe',
    '{
        "leadership_vision_likert": 4,
        "leadership_vision_text": "Our vision focuses on student success and innovation.",
        "leadership_vision_numeric": 85,
        "communication_effectiveness_likert": 3,
        "communication_effectiveness_text": "Multiple channels but need consistency.",
        "organizational_structure_clarity_likert": 2,
        "financial_stability_numeric": 78,
        "infrastructure_capacity_likert": 4,
        "ai_chatbot_usage_likert": 2,
        "automation_processes_likert": 3,
        "data_analytics_capability_likert": 3
    }',
    'COMPLETED',
    NOW()
) ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Enhanced Question Bank schema with team collaboration setup complete! ✅' as status;
