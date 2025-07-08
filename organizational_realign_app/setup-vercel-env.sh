#!/bin/bash

# NorthPath Strategies - Vercel Environment Variables Setup
# Run this script to configure all required environment variables in Vercel

echo "🚀 Setting up Vercel environment variables for NorthPath Strategies..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "npm i -g vercel"
    exit 1
fi

# Stripe Configuration (REQUIRED - Add your actual keys)
echo "📊 Setting up Stripe configuration..."
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production --force
vercel env add STRIPE_SECRET_KEY production --force
vercel env add STRIPE_WEBHOOK_SECRET production --force

# Stripe Price IDs (Current NorthPath price IDs)
echo "💳 Setting up Stripe Price IDs..."
vercel env add STRIPE_SINGLE_USE_PRICE_ID "price_1Rhdf0ELd2WOuqIWwagqCdLa" production --force
vercel env add STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID "price_1RhdgNELd2WOuqIW9HDyggY3" production --force
vercel env add STRIPE_COMPREHENSIVE_PRICE_ID "price_1RgUduELd2WOuqIWFHobukeZ" production --force
vercel env add STRIPE_ENTERPRISE_PRICE_ID "price_1RgUb8ELd2WOuqIWMxA0mLwz" production --force

# Legacy Stripe Price IDs (for backward compatibility)
vercel env add STRIPE_BASIC_PRICE_ID "price_1Rhdf0ELd2WOuqIWwagqCdLa" production --force
vercel env add STRIPE_TEAM_PRICE_ID "price_1RgUduELd2WOuqIWFHobukeZ" production --force
vercel env add STRIPE_ENTERPRISE_PRICE_ID "price_1RgUb8ELd2WOuqIWMxA0mLwz" production --force

# Application URLs
echo "🌐 Setting up application URLs..."
vercel env add NEXT_PUBLIC_BASE_URL "https://app.northpathstrategies.org" production --force
vercel env add NEXT_PUBLIC_API_URL "https://app.northpathstrategies.org" production --force

# Environment
vercel env add NODE_ENV "production" production --force

# Supabase Configuration (REQUIRED - Add your actual keys)
echo "🗄️  Setting up Supabase configuration..."
vercel env add NEXT_PUBLIC_SUPABASE_URL production --force
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --force
vercel env add DATABASE_URL production --force

# OpenAI Configuration (if using AI features)
echo "🤖 Setting up OpenAI configuration..."
vercel env add OPENAI_API_KEY production --force

# Email Configuration (for notifications)
echo "📧 Setting up email configuration..."
vercel env add SMTP_HOST production --force
vercel env add SMTP_PORT "587" production --force
vercel env add SMTP_USER production --force
vercel env add SMTP_PASS production --force
vercel env add SMTP_FROM "noreply@northpathstrategies.org" production --force

echo ""
echo "✅ Environment variable setup complete!"
echo ""
echo "📋 IMPORTANT: You still need to manually add these sensitive values:"
echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (starts with pk_)"
echo "   - STRIPE_SECRET_KEY (starts with sk_)"
echo "   - STRIPE_WEBHOOK_SECRET (starts with whsec_)"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - DATABASE_URL"
echo "   - OPENAI_API_KEY (if using AI features)"
echo "   - SMTP credentials (if using email notifications)"
echo ""
echo "🔧 Run these commands to add missing values:"
echo "   vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 'pk_test_...' production"
echo "   vercel env add STRIPE_SECRET_KEY 'sk_test_...' production"
echo "   vercel env add STRIPE_WEBHOOK_SECRET 'whsec_...' production"
echo ""
echo "💡 Get your Stripe keys from: https://dashboard.stripe.com/apikeys"
echo "💡 Get your Supabase keys from: https://supabase.com/dashboard"