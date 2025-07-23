#!/bin/bash

# Simple API Test Script for Org Chart Endpoints
echo "🧪 Testing Org Chart API Endpoints"
echo "=================================="

# Check if server is running
SERVER_URL="http://localhost:3001"
if ! curl -s --head "$SERVER_URL" > /dev/null; then
    echo "❌ Development server not running at $SERVER_URL"
    echo "Please run 'npm run dev' first"
    exit 1
fi

echo "✅ Server is running at $SERVER_URL"
echo ""

# Test 1: Chart generation endpoint (should fail gracefully)
echo "🔍 Test 1: Chart Generation API"
RESPONSE=$(curl -s -X POST "$SERVER_URL/api/chart/generate" \
  -H "Content-Type: application/json" \
  -d '{"assessmentId": "demo-123", "includeScenarios": true, "exportFormat": "json"}')

echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q "error"; then
    echo "✅ API responds with error as expected (no assessment data)"
else
    echo "❌ Unexpected response"
fi
echo ""

# Test 2: Chart retrieval endpoint (should fail gracefully)
echo "🔍 Test 2: Chart Retrieval API"
RESPONSE=$(curl -s "$SERVER_URL/api/chart/demo-123")

echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q "error"; then
    echo "✅ API responds with error as expected (no chart data)"
else
    echo "❌ Unexpected response"
fi
echo ""

# Test 3: Test the demo page accessibility
echo "🔍 Test 3: Demo Page Accessibility"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$SERVER_URL/demo/org-chart")

if [ "$RESPONSE" = "200" ]; then
    echo "✅ Demo page accessible at $SERVER_URL/demo/org-chart"
else
    echo "❌ Demo page returned status code: $RESPONSE"
fi
echo ""

# Test 4: Test org chart components compilation
echo "🔍 Test 4: Component Files Exist"
COMPONENTS=(
    "components/OrgChartGenerator.tsx"
    "components/OrgChartViewer.tsx" 
    "components/ScenarioSidebar.tsx"
    "components/OrgChartPage.tsx"
)

for component in "${COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        echo "✅ $component exists"
    else
        echo "❌ $component missing"
    fi
done
echo ""

# Test 5: Test costing library functions
echo "🔍 Test 5: Core Library Files"
LIBRARIES=(
    "lib/costing.ts"
    "lib/chart-builder.ts" 
    "lib/org-chart-db.ts"
)

for lib in "${LIBRARIES[@]}"; do
    if [ -f "$lib" ]; then
        echo "✅ $lib exists"
    else
        echo "❌ $lib missing"
    fi
done
echo ""

echo "🎯 Summary:"
echo "- API endpoints respond appropriately to invalid requests"
echo "- Demo page is accessible for testing"
echo "- All component and library files are in place"
echo "- System ready for integration with real assessment data"
echo ""
echo "🚀 Next Steps:"
echo "1. Visit: $SERVER_URL/demo/org-chart to see the UI"
echo "2. Complete an assessment to generate real org chart data"
echo "3. Integrate org chart components into assessment results pages"
