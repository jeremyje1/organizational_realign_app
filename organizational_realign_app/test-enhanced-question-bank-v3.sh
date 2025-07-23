#!/bin/bash

echo "=== ENHANCED QUESTION BANK V3 - WEBSITE COMPLIANCE TEST ==="
echo "Testing question counts to verify 100+ questions per tier"
echo ""

# Count total questions in the new question bank
TOTAL_QUESTIONS=$(grep -c 'id: "' lib/enhancedQuestionBankV3.ts)
echo "Total Questions in Enhanced Question Bank V3: $TOTAL_QUESTIONS"

# Count AI opportunity questions
AI_QUESTIONS=$(grep -c 'ai-opportunity' lib/enhancedQuestionBankV3.ts)
echo "AI Opportunity Questions: $AI_QUESTIONS"

# Count different question types
LIKERT_COUNT=$(grep -A2 'id: "' lib/enhancedQuestionBankV3.ts | grep -c 'type: "likert"')
NUMERIC_COUNT=$(grep -A2 'id: "' lib/enhancedQuestionBankV3.ts | grep -c 'type: "numeric"')
TEXT_COUNT=$(grep -A2 'id: "' lib/enhancedQuestionBankV3.ts | grep -c 'type: "text"')
UPLOAD_COUNT=$(grep -A2 'id: "' lib/enhancedQuestionBankV3.ts | grep -c 'type: "upload"')

echo ""
echo "Question Type Distribution:"
echo "- Likert Scale: $LIKERT_COUNT"
echo "- Numeric: $NUMERIC_COUNT" 
echo "- Text/Essay: $TEXT_COUNT"
echo "- File Upload: $UPLOAD_COUNT"

# Count sections
SECTIONS=$(grep -o 'section: "[^"]*"' lib/enhancedQuestionBankV3.ts | sort -u | wc -l)
echo "- Total Sections: $SECTIONS"

echo ""
echo "CORE QUESTION COUNTS BY SECTION:"
echo "- Governance & Leadership: $(grep -A3 'section: "Governance & Leadership"' lib/enhancedQuestionBankV3.ts | grep -c 'id: "')"
echo "- Administrative Processes: $(grep -A3 'section: "Administrative Processes & Communication"' lib/enhancedQuestionBankV3.ts | grep -c 'id: "')"
echo "- Structure & Performance: $(grep -A3 'section: "Structure, Capacity & Performance"' lib/enhancedQuestionBankV3.ts | grep -c 'id: "')"
echo "- Professional Development: $(grep -A3 'section: "Professional Development & Support"' lib/enhancedQuestionBankV3.ts | grep -c 'id: "')"
echo "- Technology & Digital: $(grep -A3 'section: "Technology & Digital Infrastructure"' lib/enhancedQuestionBankV3.ts | grep -c 'id: "')"
echo "- AI & Automation: $(grep -A3 'section: "AI & Automation Opportunities"' lib/enhancedQuestionBankV3.ts | grep -c 'id: "')"

echo ""
echo "WEBSITE COMPLIANCE CHECK:"
if [ $TOTAL_QUESTIONS -ge 100 ]; then
    echo "✅ MEETS WEBSITE PROMISE: $TOTAL_QUESTIONS questions (100+ required)"
else
    echo "❌ FAILS WEBSITE PROMISE: $TOTAL_QUESTIONS questions (100+ required)"
fi

if [ $AI_QUESTIONS -ge 10 ]; then
    echo "✅ ADEQUATE AI COVERAGE: $AI_QUESTIONS AI opportunity questions"
else
    echo "⚠️  LIMITED AI COVERAGE: $AI_QUESTIONS AI opportunity questions"
fi

echo ""
echo "Ready to integrate Enhanced Question Bank V3!"
