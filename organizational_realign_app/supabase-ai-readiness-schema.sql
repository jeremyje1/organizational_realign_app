-- AI Readiness Assessment Database Schema
-- This creates dedicated tables for the AI readiness assessment tool
-- Separate from the organizational realignment assessment

-- 1. Create AI Readiness Assessments Table
CREATE TABLE IF NOT EXISTS public.ai_readiness_assessments (
    id TEXT DEFAULT gen_random_uuid()::text PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Institution Information
    institution_name TEXT,
    institution_type TEXT,
    institution_size TEXT,
    contact_email TEXT,
    contact_name TEXT,
    
    -- Assessment Metadata
    tier TEXT CHECK (tier IN ('basic', 'custom')),
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ANALYZED')),
    
    -- AI Readiness Data (100 questions)
    responses JSONB DEFAULT '{}',
    
    -- AI Readiness Results
    ai_readiness_score DECIMAL(3,2), -- Overall score 0.00-5.00
    domain_scores JSONB DEFAULT '{}', -- Scores for 8 domains
    maturity_profile JSONB DEFAULT '{}', -- Maturity assessment
    
    -- Policy Recommendations
    policy_recommendations JSONB DEFAULT '[]',
    custom_policies_generated JSONB DEFAULT '[]',
    implementation_frameworks JSONB DEFAULT '[]',
    
    -- AI-Generated Analysis
    ai_analysis JSONB DEFAULT '{}', -- Executive summary, recommendations, etc.
    
    -- Team Assessment Data (if applicable)
    is_team_assessment BOOLEAN DEFAULT FALSE,
    team_members JSONB DEFAULT '[]',
    team_analysis JSONB DEFAULT '{}',
    
    -- Open-ended responses for qualitative analysis
    open_ended_responses JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    analyzed_at TIMESTAMPTZ,
    
    -- PDF Report
    pdf_report_generated BOOLEAN DEFAULT FALSE,
    pdf_report_url TEXT
);

-- 2. Create AI Readiness Teams Table (for collaborative assessments)
CREATE TABLE IF NOT EXISTS public.ai_readiness_teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assessment_id TEXT REFERENCES public.ai_readiness_assessments(id) ON DELETE CASCADE,
    team_name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create AI Readiness Team Members Table
CREATE TABLE IF NOT EXISTS public.ai_readiness_team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES public.ai_readiness_teams(id) ON DELETE CASCADE,
    assessment_id TEXT REFERENCES public.ai_readiness_assessments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    member_name TEXT,
    member_email TEXT,
    department TEXT,
    role TEXT,
    responses JSONB DEFAULT '{}',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(team_id, user_id)
);

-- 4. Create AI Policy Templates Table
CREATE TABLE IF NOT EXISTS public.ai_policy_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    policy_type TEXT NOT NULL, -- 'classroom', 'student', 'faculty', 'employee'
    title TEXT NOT NULL,
    description TEXT,
    template_content TEXT NOT NULL,
    stakeholders TEXT[] DEFAULT '{}',
    implementation_steps TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create AI Assessment Payments Table
CREATE TABLE IF NOT EXISTS public.ai_readiness_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assessment_id TEXT REFERENCES public.ai_readiness_assessments(id) ON DELETE CASCADE,
    tier TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    stripe_session_id TEXT,
    stripe_payment_intent_id TEXT,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assessment_id)
);

-- 6. Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_ai_readiness_assessments_user_id ON public.ai_readiness_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_assessments_status ON public.ai_readiness_assessments(status);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_assessments_tier ON public.ai_readiness_assessments(tier);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_assessments_institution_type ON public.ai_readiness_assessments(institution_type);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_assessments_created_at ON public.ai_readiness_assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_assessments_ai_score ON public.ai_readiness_assessments(ai_readiness_score);

-- GIN indexes for JSONB columns
CREATE INDEX IF NOT EXISTS idx_ai_readiness_responses ON public.ai_readiness_assessments USING GIN(responses);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_domain_scores ON public.ai_readiness_assessments USING GIN(domain_scores);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_policy_recs ON public.ai_readiness_assessments USING GIN(policy_recommendations);

-- Team-related indexes
CREATE INDEX IF NOT EXISTS idx_ai_readiness_teams_assessment_id ON public.ai_readiness_teams(assessment_id);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_team_members_team_id ON public.ai_readiness_team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_team_members_assessment_id ON public.ai_readiness_team_members(assessment_id);

-- Payment indexes
CREATE INDEX IF NOT EXISTS idx_ai_readiness_payments_assessment_id ON public.ai_readiness_payments(assessment_id);
CREATE INDEX IF NOT EXISTS idx_ai_readiness_payments_status ON public.ai_readiness_payments(payment_status);

-- 7. Create Update Trigger
CREATE OR REPLACE FUNCTION update_ai_readiness_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_ai_readiness_assessments_updated_at ON public.ai_readiness_assessments;
CREATE TRIGGER update_ai_readiness_assessments_updated_at
    BEFORE UPDATE ON public.ai_readiness_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_ai_readiness_updated_at();

-- 8. Row Level Security (RLS) Policies
ALTER TABLE public.ai_readiness_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_readiness_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_readiness_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_policy_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_readiness_payments ENABLE ROW LEVEL SECURITY;

-- AI Readiness Assessment Policies
CREATE POLICY "Allow anonymous AI readiness submissions" ON public.ai_readiness_assessments
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can read own AI readiness assessments" ON public.ai_readiness_assessments
    FOR SELECT
    USING (
        auth.uid() IS NULL OR 
        user_id IS NULL OR 
        user_id = auth.uid() OR
        -- Allow team members to read team assessments
        EXISTS (
            SELECT 1 FROM public.ai_readiness_team_members 
            WHERE assessment_id = ai_readiness_assessments.id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own AI readiness assessments" ON public.ai_readiness_assessments
    FOR UPDATE
    USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.ai_readiness_team_members 
            WHERE assessment_id = ai_readiness_assessments.id AND user_id = auth.uid()
        )
    );

-- AI Policy Templates (read-only for all)
CREATE POLICY "Anyone can read AI policy templates" ON public.ai_policy_templates
    FOR SELECT
    USING (true);

-- Team policies
CREATE POLICY "Team creators can manage teams" ON public.ai_readiness_teams
    FOR ALL
    USING (created_by = auth.uid());

CREATE POLICY "Team members can read team info" ON public.ai_readiness_team_members
    FOR SELECT
    USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.ai_readiness_teams 
            WHERE id = team_id AND created_by = auth.uid()
        )
    );

-- Payment policies
CREATE POLICY "Users can read own AI payments" ON public.ai_readiness_payments
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.ai_readiness_assessments 
            WHERE id = assessment_id AND user_id = auth.uid()
        )
    );

-- 9. Grant Permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.ai_readiness_assessments TO anon, authenticated;
GRANT ALL ON public.ai_readiness_teams TO anon, authenticated;
GRANT ALL ON public.ai_readiness_team_members TO anon, authenticated;
GRANT SELECT ON public.ai_policy_templates TO anon, authenticated;
GRANT ALL ON public.ai_readiness_payments TO anon, authenticated;

-- 10. Insert Sample Policy Templates
INSERT INTO public.ai_policy_templates (policy_type, title, description, template_content, stakeholders, implementation_steps) VALUES 
(
    'classroom',
    'Faculty AI Use in Teaching and Assessment',
    'Guidelines for faculty use of AI tools in classroom instruction, grading, and student interaction',
    'This policy establishes guidelines for faculty use of artificial intelligence tools in teaching, grading, and student interactions...',
    ARRAY['Faculty', 'Academic Affairs', 'IT Department', 'Students'],
    ARRAY[
        'Form AI policy committee with faculty representation',
        'Conduct faculty training on AI tools and ethical use',
        'Develop disclosure requirements for AI use in courses',
        'Create approval process for new AI teaching tools',
        'Establish monitoring and compliance procedures'
    ]
),
(
    'student',
    'Student AI Use and Academic Integrity',
    'Policies governing student use of AI tools for academic work and learning',
    'This policy defines acceptable use of artificial intelligence tools by students in their academic work...',
    ARRAY['Students', 'Faculty', 'Academic Affairs', 'Registrar'],
    ARRAY[
        'Define acceptable vs. prohibited AI use by academic context',
        'Create clear citation and disclosure requirements',
        'Develop detection and enforcement procedures',
        'Implement student education and training programs',
        'Establish appeals and review processes'
    ]
),
(
    'faculty',
    'Faculty AI Integration and Professional Development',
    'Framework for faculty professional development and AI tool integration',
    'This policy supports faculty in integrating AI tools professionally and ethically...',
    ARRAY['Faculty', 'Professional Development', 'IT Department', 'Academic Affairs'],
    ARRAY[
        'Assess faculty AI literacy and training needs',
        'Develop tiered professional development programs',
        'Create AI tool evaluation and approval processes',
        'Establish peer mentoring and support networks',
        'Implement ongoing assessment and improvement'
    ]
),
(
    'employee',
    'Employee AI Use and Workplace Integration',
    'Guidelines for staff and administrative use of AI tools in workplace functions',
    'This policy governs employee use of AI tools in administrative and operational functions...',
    ARRAY['All Staff', 'Human Resources', 'IT Department', 'Department Heads'],
    ARRAY[
        'Define institutionally approved AI tools for different job functions',
        'Establish security requirements and data protection protocols',
        'Create procedures for requesting access to new AI applications',
        'Develop training and support programs for staff',
        'Implement monitoring and compliance frameworks'
    ]
) ON CONFLICT DO NOTHING;

-- Success message
SELECT 'AI Readiness Assessment database schema created successfully! ✅' as status;
