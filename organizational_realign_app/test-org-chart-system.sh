#!/bin/bash

# Org Chart System Testing Script
# Version 1.0.0
# Author: NorthPath Strategies

echo "🚀 Testing Org Chart System Components"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counter
TESTS_RUN=0
TESTS_PASSED=0

# Function to run test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    TESTS_RUN=$((TESTS_RUN + 1))
    echo -e "\n${BLUE}Test $TESTS_RUN:${NC} $test_name"
    
    if eval "$test_command"; then
        echo -e "${GREEN}✅ PASSED${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAILED${NC}"
    fi
}

# Test 1: TypeScript compilation
run_test "TypeScript Compilation" "npm run build > /dev/null 2>&1"

# Test 2: Lint check
run_test "ESLint Validation" "npm run lint > /dev/null 2>&1"

# Test 3: Check if Prisma schema includes OrgChart model
run_test "Prisma Schema - OrgChart Model" "grep -q 'model OrgChart' prisma/schema.prisma"

# Test 4: Check if Prisma schema includes PositionCost model
run_test "Prisma Schema - PositionCost Model" "grep -q 'model PositionCost' prisma/schema.prisma"

# Test 5: Verify costing library exists
run_test "Costing Library Exists" "test -f lib/costing.ts"

# Test 6: Verify chart builder exists
run_test "Chart Builder Exists" "test -f lib/chart-builder.ts"

# Test 7: Verify org chart database functions exist
run_test "Org Chart DB Functions Exist" "test -f lib/org-chart-db.ts"

# Test 8: Verify API routes exist
run_test "API Route - Generate Chart" "test -f app/api/chart/generate/route.ts"
run_test "API Route - Get Chart" "test -f app/api/chart/[assessmentId]/route.ts"

# Test 9: Verify frontend components exist
run_test "Component - OrgChartGenerator" "test -f components/OrgChartGenerator.tsx"
run_test "Component - OrgChartViewer" "test -f components/OrgChartViewer.tsx"
run_test "Component - ScenarioSidebar" "test -f components/ScenarioSidebar.tsx"
run_test "Component - OrgChartPage" "test -f components/OrgChartPage.tsx"

# Test 10: Check imports in costing library
run_test "Costing Library Imports" "grep -q 'export.*buildOrgTree' lib/costing.ts"

# Test 11: Check API endpoint structure
run_test "API Generate Endpoint Structure" "grep -q 'POST.*request.*NextRequest' app/api/chart/generate/route.ts"

# Test 12: Check component exports
run_test "Component Exports" "grep -q 'export.*OrgChartGenerator' components/OrgChartGenerator.tsx"

# Test 13: Verify D3 integration in viewer
run_test "D3 Integration" "grep -q 'import.*d3' components/OrgChartViewer.tsx"

# Test 14: Check scenario types
run_test "Scenario Types Definition" "grep -q 'interface.*Scenarios' components/ScenarioSidebar.tsx"

# Test 15: Database model relationships
run_test "OrgChart Assessment Relationship" "grep -q 'assessment.*Assessment' prisma/schema.prisma"

echo -e "\n${YELLOW}======================================"
echo -e "Test Results Summary${NC}"
echo -e "======================================"
echo -e "Tests Run: ${BLUE}$TESTS_RUN${NC}"
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$((TESTS_RUN - TESTS_PASSED))${NC}"

if [ $TESTS_PASSED -eq $TESTS_RUN ]; then
    echo -e "\n${GREEN}🎉 All tests passed! Org Chart system is ready.${NC}"
    exit 0
else
    echo -e "\n${RED}⚠️  Some tests failed. Please review the issues above.${NC}"
    exit 1
fi
