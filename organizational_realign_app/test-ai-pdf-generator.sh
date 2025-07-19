#!/bin/bash

# Test script for AI-Narrative PDF Generator
echo "Testing AI-Narrative PDF Generator..."

# Test data
TEST_DATA='{
  "answers": {
    "organizationalStructure": "Traditional hierarchy",
    "teamCollaboration": 7,
    "digitizationLevel": 6,
    "changeReadiness": 5
  },
  "scores": {
    "organizationalHealth": 7.2,
    "efficiencyScore": 6.8,
    "aiReadinessScore": 5.5,
    "overallScore": 6.5,
    "riskLevel": "Medium"
  },
  "options": {
    "includeRecommendations": true,
    "includeCharts": true,
    "templateStyle": "executive",
    "organizationName": "Test Organization",
    "reportTitle": "AI-Generated Assessment Report"
  }
}'

echo "1. Testing AI narrative PDF generation..."
curl -X POST http://localhost:3000/api/report/generate \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" \
  -o "test-ai-report.pdf"

if [ -f "test-ai-report.pdf" ]; then
  echo "✅ PDF generated successfully: test-ai-report.pdf"
  echo "File size: $(du -h test-ai-report.pdf | cut -f1)"
else
  echo "❌ PDF generation failed"
fi

echo ""

# Test 2: Minimal options
echo "2. Testing minimal configuration..."
MINIMAL_DATA='{
  "answers": {"test": "data"},
  "scores": {"overallScore": 8.0}
}'

curl -X POST http://localhost:3000/api/report/generate \
  -H "Content-Type: application/json" \
  -d "$MINIMAL_DATA" \
  -o "test-minimal-report.pdf"

if [ -f "test-minimal-report.pdf" ]; then
  echo "✅ Minimal PDF generated successfully: test-minimal-report.pdf"
else
  echo "❌ Minimal PDF generation failed"
fi

echo ""

# Test 3: Error handling
echo "3. Testing error handling..."
curl -X POST http://localhost:3000/api/report/generate \
  -H "Content-Type: application/json" \
  -d '{"invalid": "data"}'

echo ""
echo "AI-Narrative PDF Generator tests completed!"

# Clean up test files
# rm -f test-*.pdf
