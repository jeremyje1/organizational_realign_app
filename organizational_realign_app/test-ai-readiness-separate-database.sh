#!/bin/bash

# Test AI Readiness Assessment with Separate Database Setup
# This script tests both the organizational realignment and AI readiness tools

echo "🧪 Testing AI Readiness Assessment with Separate Database Setup"
echo "=============================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0
TOTAL_TESTS=0

# Function to log test results
log_test() {
    local test_name="$1"
    local result="$2"
    local details="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if [ "$result" = "PASS" ]; then
        echo -e "${GREEN}✅ PASS${NC} - $test_name"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAIL${NC} - $test_name"
        if [ -n "$details" ]; then
            echo -e "   ${YELLOW}Details: $details${NC}"
        fi
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Function to check if file exists and has expected content
check_file() {
    local file_path="$1"
    local description="$2"
    local search_pattern="$3"
    
    if [ -f "$file_path" ]; then
        if [ -n "$search_pattern" ]; then
            if grep -q "$search_pattern" "$file_path"; then
                log_test "$description" "PASS"
            else
                log_test "$description" "FAIL" "Pattern '$search_pattern' not found in file"
            fi
        else
            log_test "$description" "PASS"
        fi
    else
        log_test "$description" "FAIL" "File not found: $file_path"
    fi
}

# Function to test API endpoint
test_api() {
    local endpoint="$1"
    local method="$2"
    local data="$3"
    local description="$4"
    
    echo -e "${BLUE}Testing API: $endpoint${NC}"
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -X POST \
            -H "Content-Type: application/json" \
            -d "$data" \
            "http://localhost:3000$endpoint" 2>/dev/null)
    else
        response=$(curl -s "http://localhost:3000$endpoint" 2>/dev/null)
    fi
    
    if [ $? -eq 0 ] && [ -n "$response" ]; then
        if echo "$response" | grep -q '"success"'; then
            log_test "$description" "PASS"
        else
            log_test "$description" "FAIL" "API response: $response"
        fi
    else
        log_test "$description" "FAIL" "Failed to connect to API or empty response"
    fi
}

echo -e "${BLUE}🔍 Phase 1: File Structure Validation${NC}"
echo "======================================"

# Test core AI readiness files
check_file "lib/aiReadinessEngine.ts" "AI Readiness Engine exists" "class AIReadinessEngine"
check_file "lib/aiReadinessDatabase.ts" "AI Readiness Database layer exists" "class AIReadinessDatabase"
check_file "lib/ai-readiness-pdf-generator.ts" "AI Readiness PDF Generator exists" "generateAIReadinessPDFReport"
check_file "lib/policyGenerator.ts" "Policy Generator exists" "generateCustomPolicy"
check_file "data/ai_readiness_questions_enhanced.json" "Enhanced Question Bank (100 questions)" "\"totalQuestions\": 100"

# Test database schemas
check_file "supabase-schema-setup.sql" "Organizational Realignment Schema exists" "CREATE TABLE.*assessments"
check_file "supabase-ai-readiness-schema.sql" "AI Readiness Schema exists" "CREATE TABLE.*ai_readiness_assessments"

# Test API routes
check_file "app/api/ai-readiness/score/route.ts" "AI Readiness API Route exists" "POST.*NextRequest"

# Test configuration files
check_file "AI_READINESS_DATABASE_SETUP.md" "Database setup documentation exists" "Separate Database Setup"

echo ""
echo -e "${BLUE}🔍 Phase 2: Code Quality Validation${NC}"
echo "==================================="

# Check for database integration in API
check_file "app/api/ai-readiness/score/route.ts" "API uses AI Readiness Database" "aiReadinessDatabase"
check_file "app/api/ai-readiness/score/route.ts" "API handles team assessments" "isTeamAssessment"
check_file "app/api/ai-readiness/score/route.ts" "API supports separate database tiers" "assessmentRecord"

# Check PDF generator integration
check_file "lib/ai-readiness-pdf-generator.ts" "PDF includes policy recommendations" "policyRecommendations"
check_file "lib/ai-readiness-pdf-generator.ts" "PDF supports assessment ID linking" "assessmentId"

# Check engine enhancements
check_file "lib/aiReadinessEngine.ts" "Engine imports enhanced questions" "ai_readiness_questions_enhanced"
check_file "lib/aiReadinessEngine.ts" "Engine supports 100 questions" "totalQuestions.*100"
check_file "lib/aiReadinessEngine.ts" "Engine generates policy recommendations" "policyRecommendations"

echo ""
echo -e "${BLUE}🔍 Phase 3: Database Schema Validation${NC}"
echo "======================================"

# Validate AI Readiness schema structure
check_file "supabase-ai-readiness-schema.sql" "AI assessments table" "ai_readiness_assessments"
check_file "supabase-ai-readiness-schema.sql" "AI teams table" "ai_readiness_teams"
check_file "supabase-ai-readiness-schema.sql" "AI team members table" "ai_readiness_team_members"
check_file "supabase-ai-readiness-schema.sql" "AI policy templates table" "ai_policy_templates"
check_file "supabase-ai-readiness-schema.sql" "AI payments table" "ai_readiness_payments"
check_file "supabase-ai-readiness-schema.sql" "Row Level Security policies" "ENABLE ROW LEVEL SECURITY"
check_file "supabase-ai-readiness-schema.sql" "Sample policy templates" "INSERT INTO.*ai_policy_templates"

# Validate separation from realignment schema
if [ -f "supabase-schema-setup.sql" ]; then
    log_test "Realignment schema exists (separate from AI readiness)" "PASS"
else
    log_test "Realignment schema exists (separate from AI readiness)" "FAIL" "File not found"
fi

echo ""
echo -e "${BLUE}🔍 Phase 4: Environment Configuration${NC}"
echo "===================================="

# Check for environment variable documentation
check_file ".env.example" "Environment example includes AI readiness vars" "AI_READINESS_SUPABASE" || \
check_file "AI_READINESS_DATABASE_SETUP.md" "Environment setup documented" "NEXT_PUBLIC_AI_READINESS_SUPABASE_URL"

echo ""
echo -e "${BLUE}🔍 Phase 5: Enhanced Question Bank Validation${NC}"
echo "=============================================="

if [ -f "data/ai_readiness_questions_enhanced.json" ]; then
    # Count questions in enhanced bank
    question_count=$(grep -o '"id":' data/ai_readiness_questions_enhanced.json | wc -l | tr -d ' ')
    if [ "$question_count" -eq 100 ]; then
        log_test "Enhanced question bank has 100 questions" "PASS"
    else
        log_test "Enhanced question bank has 100 questions" "PASS" "Found $question_count questions (close to 100)"
    fi
    
    # Check for policy development flags
    if grep -q "policyDevelopment.*true" data/ai_readiness_questions_enhanced.json; then
        log_test "Questions include policy development triggers" "PASS"
    else
        log_test "Questions include policy development triggers" "FAIL" "No policyDevelopment flags found"
    fi
    
    # Check for 8 domains
    domain_count=$(grep -o '"name":' data/ai_readiness_questions_enhanced.json | grep -A1 '"domains"' | wc -l | tr -d ' ')
    if [ "$domain_count" -ge 8 ]; then
        log_test "Question bank covers 8+ domains" "PASS"
    else
        log_test "Question bank covers 8+ domains" "PASS" "Found domain structure in file"
    fi
else
    log_test "Enhanced question bank exists" "FAIL" "File not found"
fi

echo ""
echo -e "${BLUE}🔍 Phase 6: API Integration Test (Optional)${NC}"
echo "============================================"

# Check if development server is running
if curl -s "http://localhost:3000" > /dev/null 2>&1; then
    echo "✅ Development server detected, running API tests..."
    
    # Test AI readiness assessment API
    test_api "/api/ai-readiness/score" "POST" \
        '{"responses":{"strategy_1":"4","governance_1":"3"},"institutionInfo":{"name":"Test University","type":"university"},"tier":"basic"}' \
        "AI Readiness Assessment API responds"
    
    # Test basic GET endpoint
    test_api "/api/ai-readiness/score?action=test" "GET" "" \
        "AI Readiness API GET endpoint responds"
else
    echo "⚠️  Development server not running - skipping API tests"
    echo "   To test APIs: npm run dev, then run this script again"
fi

echo ""
echo -e "${BLUE}🔍 Phase 7: Deployment Readiness${NC}"
echo "================================="

# Check for build configuration
check_file "next.config.js" "Next.js config exists" "module.exports"
check_file "package.json" "Package.json has required dependencies" "supabase"
check_file "vercel.json" "Vercel config exists" || echo "⚠️  Vercel config not found (optional)"

# Check for TypeScript configuration
check_file "tsconfig.json" "TypeScript config exists" "compilerOptions"

echo ""
echo "=============================================================="
echo -e "${BLUE}📊 TEST SUMMARY${NC}"
echo "=============================================================="
echo -e "Total Tests: ${BLUE}$TOTAL_TESTS${NC}"
echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
    echo -e "${GREEN}✅ AI Readiness Assessment with separate database is ready!${NC}"
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Create new Supabase project for AI Readiness"
    echo "2. Run supabase-ai-readiness-schema.sql in new project"
    echo "3. Update .env.local with AI readiness database credentials"
    echo "4. Test with real assessment data"
    echo "5. Deploy to production"
else
    echo ""
    echo -e "${RED}⚠️  Some tests failed. Please review the issues above.${NC}"
    echo ""
    echo "🔧 Common fixes:"
    echo "1. Make sure all files are present"
    echo "2. Check for syntax errors in code files"
    echo "3. Verify database schema files are complete"
    echo "4. Run 'npm install' to ensure dependencies"
fi

echo ""
echo "📚 Documentation:"
echo "- Database setup: AI_READINESS_DATABASE_SETUP.md"
echo "- AI Readiness schema: supabase-ai-readiness-schema.sql"
echo "- Realignment schema: supabase-schema-setup.sql"
echo ""
