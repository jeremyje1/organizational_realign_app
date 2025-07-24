-- ==========================================================================
-- AI READINESS ASSESSMENT DATABASE SCHEMA
-- This should be run in the AI readiness Supabase instance:
-- https://jocigzsthcpspxfdfxae.supabase.co
-- ==========================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================================
-- 1. AI READINESS ASSESSMENTS TABLE (Main table)
-- ==========================================================================
CREATE TABLE public.ai_readiness_assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Institution Information
    institution_name VARCHAR(255) NOT NULL,
    institution_type VARCHAR(100),
    institution_size VARCHAR(100),
    industry VARCHAR(100),
    organization_name VARCHAR(255), -- Alias for institution_name for consistency
    
    -- Contact Information
    contact_email VARCHAR(255),
    contact_name VARCHAR(255),
    
    -- Assessment Configuration
    tier VARCHAR(50) NOT NULL CHECK (tier IN ('ai-readiness-basic', 'ai-readiness-custom')),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ANALYZED')),
    
    -- Assessment Data
    responses JSONB NOT NULL DEFAULT '{}',
    ai_readiness_score DECIMAL(5,2),
    domain_scores JSONB DEFAULT '{}',
    maturity_profile JSONB DEFAULT '{}',
    
    -- AI Analysis Results
    policy_recommendations JSONB DEFAULT '[]',
    custom_policies_generated JSONB DEFAULT '[]',
    implementation_frameworks JSONB DEFAULT '[]',
    ai_analysis JSONB DEFAULT '{}',
    analysis_results JSONB DEFAULT '{}', -- For compatibility with admin dashboard
    
    -- Team Assessment Features
    is_team_assessment BOOLEAN DEFAULT FALSE,
    team_members JSONB DEFAULT '[]',
    team_analysis JSONB DEFAULT '{}',
    
    -- Open-ended Responses
    open_ended_responses JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE,
    analyzed_at TIMESTAMP WITH TIME ZONE,
    
    -- PDF Report
    pdf_report_generated BOOLEAN DEFAULT FALSE,
    pdf_report_url TEXT
);

-- ==========================================================================
-- 2. AI READINESS TEAMS TABLE
-- ==========================================================================
CREATE TABLE public.ai_readiness_teams (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assessment_id UUID REFERENCES public.ai_readiness_assessments(id) ON DELETE CASCADE,
    team_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================================================
-- 3. AI READINESS TEAM MEMBERS TABLE
-- ==========================================================================
CREATE TABLE public.ai_readiness_team_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    team_id UUID REFERENCES public.ai_readiness_teams(id) ON DELETE CASCADE,
    assessment_id UUID REFERENCES public.ai_readiness_assessments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Member Information
    member_name VARCHAR(255),
    member_email VARCHAR(255),
    department VARCHAR(255),
    role VARCHAR(255),
    
    -- Member Responses
    responses JSONB DEFAULT '{}',
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================================================
-- 4. AI POLICY TEMPLATES TABLE
-- ==========================================================================
CREATE TABLE public.ai_policy_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    policy_type VARCHAR(20) NOT NULL CHECK (policy_type IN ('classroom', 'student', 'faculty', 'employee')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    template_content TEXT NOT NULL,
    stakeholders JSONB DEFAULT '[]',
    implementation_steps JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================================================
-- 5. AI READINESS PAYMENTS TABLE
-- ==========================================================================
CREATE TABLE public.ai_readiness_payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assessment_id UUID REFERENCES public.ai_readiness_assessments(id) ON DELETE CASCADE,
    tier VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL, -- Amount in cents
    currency VARCHAR(3) DEFAULT 'USD',
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    stripe_session_id VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================================================
-- INDEXES FOR PERFORMANCE
-- ==========================================================================
CREATE INDEX idx_ai_readiness_assessments_created_at ON public.ai_readiness_assessments(created_at DESC);
CREATE INDEX idx_ai_readiness_assessments_status ON public.ai_readiness_assessments(status);
CREATE INDEX idx_ai_readiness_assessments_tier ON public.ai_readiness_assessments(tier);
CREATE INDEX idx_ai_readiness_assessments_institution ON public.ai_readiness_assessments(institution_name);
CREATE INDEX idx_ai_readiness_assessments_contact_email ON public.ai_readiness_assessments(contact_email);

CREATE INDEX idx_ai_readiness_teams_assessment_id ON public.ai_readiness_teams(assessment_id);
CREATE INDEX idx_ai_readiness_team_members_team_id ON public.ai_readiness_team_members(team_id);
CREATE INDEX idx_ai_readiness_team_members_assessment_id ON public.ai_readiness_team_members(assessment_id);

CREATE INDEX idx_ai_policy_templates_policy_type ON public.ai_policy_templates(policy_type);
CREATE INDEX idx_ai_readiness_payments_assessment_id ON public.ai_readiness_payments(assessment_id);
CREATE INDEX idx_ai_readiness_payments_status ON public.ai_readiness_payments(payment_status);

-- ==========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================================

-- Enable RLS on all tables
ALTER TABLE public.ai_readiness_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_readiness_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_readiness_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_policy_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_readiness_payments ENABLE ROW LEVEL SECURITY;

-- AI Readiness Assessments RLS Policies
CREATE POLICY "Users can view their own assessments" ON public.ai_readiness_assessments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments" ON public.ai_readiness_assessments
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own assessments" ON public.ai_readiness_assessments
    FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Service role can access all assessments" ON public.ai_readiness_assessments
    FOR ALL USING (current_setting('role') = 'service_role');

-- Allow anonymous access for assessments without user_id (anonymous submissions)
CREATE POLICY "Allow anonymous assessment creation" ON public.ai_readiness_assessments
    FOR INSERT WITH CHECK (user_id IS NULL);

CREATE POLICY "Allow anonymous assessment updates by ID" ON public.ai_readiness_assessments
    FOR UPDATE USING (user_id IS NULL);

-- Teams RLS Policies
CREATE POLICY "Team members can view teams" ON public.ai_readiness_teams
    FOR SELECT USING (
        auth.uid() = created_by OR 
        EXISTS (
            SELECT 1 FROM public.ai_readiness_team_members 
            WHERE team_id = ai_readiness_teams.id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create teams" ON public.ai_readiness_teams
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Team Members RLS Policies
CREATE POLICY "Team members can view team member data" ON public.ai_readiness_team_members
    FOR SELECT USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM public.ai_readiness_teams 
            WHERE id = team_id AND created_by = auth.uid()
        )
    );

CREATE POLICY "Team owners can manage team members" ON public.ai_readiness_team_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.ai_readiness_teams 
            WHERE id = team_id AND created_by = auth.uid()
        )
    );

-- Policy Templates - Allow read access to all authenticated users
CREATE POLICY "All users can view policy templates" ON public.ai_policy_templates
    FOR SELECT TO authenticated USING (true);

-- Payments RLS Policies
CREATE POLICY "Users can view their assessment payments" ON public.ai_readiness_payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.ai_readiness_assessments 
            WHERE id = assessment_id AND (user_id = auth.uid() OR user_id IS NULL)
        )
    );

CREATE POLICY "Service role can manage all payments" ON public.ai_readiness_payments
    FOR ALL USING (current_setting('role') = 'service_role');

-- ==========================================================================
-- FUNCTIONS AND TRIGGERS
-- ==========================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER handle_ai_readiness_assessments_updated_at
    BEFORE UPDATE ON public.ai_readiness_assessments
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_ai_policy_templates_updated_at
    BEFORE UPDATE ON public.ai_policy_templates
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==========================================================================
-- INITIAL DATA - SAMPLE POLICY TEMPLATES
-- ==========================================================================

INSERT INTO public.ai_policy_templates (policy_type, title, description, template_content, stakeholders, implementation_steps) VALUES
('classroom', 'AI Use in Classroom Policy', 'Guidelines for AI tool usage in educational settings', 'This policy outlines the appropriate use of AI tools in classroom environments...', '["faculty", "students", "administrators"]', '["Review existing curriculum", "Train faculty", "Implement monitoring", "Gather feedback"]'),
('student', 'Student AI Usage Policy', 'Policy governing student use of AI tools for academic work', 'Students are expected to use AI tools responsibly and transparently...', '["students", "faculty", "academic_advisors"]', '["Communicate policy", "Provide training", "Set up violation procedures", "Monitor compliance"]'),
('faculty', 'Faculty AI Integration Policy', 'Guidelines for faculty incorporating AI into teaching and research', 'Faculty members may use AI tools to enhance teaching effectiveness...', '["faculty", "administrators", "IT_department"]', '["Faculty training program", "Resource allocation", "Best practice sharing", "Evaluation metrics"]'),
('employee', 'Employee AI Usage Policy', 'Institutional policy for staff AI tool usage', 'Employees may use approved AI tools to enhance productivity...', '["employees", "managers", "IT_department", "legal"]', '["Policy communication", "Tool approval process", "Training program", "Compliance monitoring"]');

-- ==========================================================================
-- GRANT PERMISSIONS
-- ==========================================================================

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.ai_readiness_assessments TO authenticated;
GRANT SELECT ON public.ai_policy_templates TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.ai_readiness_teams TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.ai_readiness_team_members TO authenticated;
GRANT SELECT ON public.ai_readiness_payments TO authenticated;

-- Grant permissions to anonymous users (for anonymous assessments)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT, UPDATE ON public.ai_readiness_assessments TO anon;
GRANT SELECT ON public.ai_policy_templates TO anon;

-- Grant full permissions to service role (for admin operations)
GRANT ALL ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
