#!/bin/bash

# Quick Setup Script for AI Readiness Database
# Run this after creating your new Supabase project

echo "🚀 AI Readiness Database Quick Setup"
echo "===================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Your New AI Readiness Project Details:${NC}"
echo "Project URL: https://jocigzsthcpspxfdfxae.supabase.co"
echo "Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvY2lnenN0aGNwc3B4ZmRmeGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzExNzYsImV4cCI6MjA2ODgwNzE3Nn0.krJk0mzZQ3wmo_isokiYkm5eCTfMpIZcGP6qfSKYrHA"
echo ""

echo -e "${YELLOW}📋 NEXT STEPS:${NC}"
echo ""

echo "1. 🗄️  SET UP THE DATABASE SCHEMA"
echo "   → Go to: https://jocigzsthcpspxfdfxae.supabase.co/project/default/sql"
echo "   → Copy and paste the contents of: supabase-ai-readiness-schema.sql"
echo "   → Click 'Run' to create all tables and policies"
echo ""

echo "2. 🔧 UPDATE ENVIRONMENT VARIABLES"
echo "   → Add these lines to your .env.local file:"
echo ""
echo "# AI Readiness Database (NEW)"
echo "NEXT_PUBLIC_AI_READINESS_SUPABASE_URL=https://jocigzsthcpspxfdfxae.supabase.co"
echo "NEXT_PUBLIC_AI_READINESS_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvY2lnenN0aGNwc3B4ZmRmeGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzExNzYsImV4cCI6MjA2ODgwNzE3Nn0.krJk0mzZQ3wmo_isokiYkm5eCTfMpIZcGP6qfSKYrHA"
echo ""

echo "3. ✅ TEST THE SETUP"
echo "   → Run: ./test-ai-readiness-separate-database.sh"
echo ""

echo "4. 🎉 READY TO USE"
echo "   → Your AI readiness assessment will now use the separate database!"
echo ""

echo -e "${GREEN}💡 HELPFUL COMMANDS:${NC}"
echo ""
echo "# Check if schema file exists"
echo "ls -la supabase-ai-readiness-schema.sql"
echo ""
echo "# View the schema file"
echo "head -20 supabase-ai-readiness-schema.sql"
echo ""
echo "# Test the setup"
echo "./test-ai-readiness-separate-database.sh"
echo ""
echo "# Start development server"
echo "npm run dev"
echo ""

echo -e "${BLUE}🔗 Quick Links:${NC}"
echo "• Supabase SQL Editor: https://jocigzsthcpspxfdfxae.supabase.co/project/default/sql"
echo "• Project Dashboard: https://jocigzsthcpspxfdfxae.supabase.co/project/default"
echo "• Database Tables: https://jocigzsthcpspxfdfxae.supabase.co/project/default/editor"
echo ""

echo -e "${GREEN}🎯 What This Gives You:${NC}"
echo "✅ Separate database for AI readiness assessments"
echo "✅ 100-question comprehensive evaluation"
echo "✅ Automated policy recommendations"
echo "✅ Team collaboration features"
echo "✅ Advanced PDF reporting"
echo "✅ Clean separation from realignment tool"
echo ""

# Check if schema file exists
if [ -f "supabase-ai-readiness-schema.sql" ]; then
    echo -e "${GREEN}✅ Schema file found: supabase-ai-readiness-schema.sql${NC}"
else
    echo -e "${YELLOW}⚠️  Schema file not found. Make sure supabase-ai-readiness-schema.sql exists.${NC}"
fi

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ Environment file found: .env.local${NC}"
    if grep -q "AI_READINESS_SUPABASE" .env.local; then
        echo -e "${GREEN}✅ AI Readiness variables already configured${NC}"
    else
        echo -e "${YELLOW}⚠️  Need to add AI Readiness variables to .env.local${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  .env.local file not found. Create it with the environment variables above.${NC}"
fi

echo ""
echo -e "${BLUE}Need help? Check: AI_READINESS_DATABASE_SETUP.md${NC}"
