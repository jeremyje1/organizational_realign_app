-- Migration: Add assessment_payments table for premium upgrade tracking
-- Created: 2025-07-02

CREATE TABLE IF NOT EXISTS "public"."assessment_payments" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "assessment_id" UUID NOT NULL,
    "plan" VARCHAR(50) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "paid_at" TIMESTAMP WITH TIME ZONE,
    "customer_email" VARCHAR(255),
    "stripe_session_id" VARCHAR(255),
    "stripe_customer_id" VARCHAR(255),
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT "assessment_payments_assessment_id_fkey" 
        FOREIGN KEY ("assessment_id") 
        REFERENCES "public"."assessments"("id") 
        ON DELETE CASCADE,
    
    CONSTRAINT "assessment_payments_assessment_id_unique" 
        UNIQUE ("assessment_id")
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "idx_assessment_payments_assessment_id" 
    ON "public"."assessment_payments" ("assessment_id");

CREATE INDEX IF NOT EXISTS "idx_assessment_payments_stripe_session_id" 
    ON "public"."assessment_payments" ("stripe_session_id");

CREATE INDEX IF NOT EXISTS "idx_assessment_payments_status" 
    ON "public"."assessment_payments" ("status");

-- Add comment
COMMENT ON TABLE "public"."assessment_payments" IS 'Tracks premium upgrade payments for assessments';

-- Grant permissions (adjust as needed for your setup)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "public"."assessment_payments" TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
