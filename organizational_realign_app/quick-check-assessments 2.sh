#!/bin/bash

echo "🔍 Checking for TEST 1 assessment submission..."

# Check assessments API
curl -s "https://app.northpathstrategies.org/api/admin/assessments/list" \
  -H "Authorization: Bearer admin-token stardynamics1124*" \
  -H "Content-Type: application/json" | \
  python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print('✅ API Response: Success')
    print(f'📊 Total Assessments: {data.get(\"count\", 0)}')
    
    assessments = data.get('assessments', [])
    if assessments:
        print('\n📋 Recent Assessments:')
        for i, assessment in enumerate(assessments[:5]):
            print(f'{i+1}. {assessment.get(\"id\", \"N/A\")}')
            print(f'   Institution: {assessment.get(\"institution_name\", \"N/A\")}')
            print(f'   Email: {assessment.get(\"contact_email\", \"N/A\")}')
            print(f'   Tier: {assessment.get(\"tier\", \"N/A\")}')
            print(f'   Created: {assessment.get(\"created_at\", \"N/A\")}')
            print()
        
        # Check for TEST 1 indicators
        test_assessments = [a for a in assessments if 
                          'test' in a.get('institution_name', '').lower() or
                          'test' in a.get('contact_email', '').lower() or
                          'express' in a.get('tier', '').lower()]
        
        if test_assessments:
            print(f'🎯 Found {len(test_assessments)} potential test submissions')
        else:
            print('⚠️  No obvious test submissions found')
    else:
        print('❌ No assessments found in database')
        
except Exception as e:
    print(f'❌ Error parsing response: {e}')
    print('Raw response:', sys.stdin.read()[:200])
" 2>/dev/null || echo "❌ Failed to check assessments"
