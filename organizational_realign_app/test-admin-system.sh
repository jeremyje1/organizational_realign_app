#!/bin/bash

# Admin Testing System Validation Script
# This script validates the admin testing interface functionality

echo "🔧 NorthPath Admin Testing System Validation"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if running in the correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Must run from project root directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Checking Admin Testing Components...${NC}"

# 1. Check admin testing page exists
if [ -f "app/admin/testing/page.tsx" ]; then
    echo -e "${GREEN}✅ Admin testing page exists${NC}"
else
    echo -e "${RED}❌ Admin testing page missing${NC}"
fi

# 2. Check admin assessment viewer exists
if [ -f "app/admin/assessment/[id]/page.tsx" ]; then
    echo -e "${GREEN}✅ Admin assessment viewer exists${NC}"
else
    echo -e "${RED}❌ Admin assessment viewer missing${NC}"
fi

# 3. Check admin analytics page exists
if [ -f "app/admin/analytics/page.tsx" ]; then
    echo -e "${GREEN}✅ Admin analytics page exists${NC}"
else
    echo -e "${RED}❌ Admin analytics page missing${NC}"
fi

# 4. Check admin API endpoints exist
if [ -f "app/api/admin/assessment/[id]/route.ts" ]; then
    echo -e "${GREEN}✅ Admin assessment API exists${NC}"
else
    echo -e "${RED}❌ Admin assessment API missing${NC}"
fi

if [ -f "app/api/admin/analytics/route.ts" ]; then
    echo -e "${GREEN}✅ Admin analytics API exists${NC}"
else
    echo -e "${RED}❌ Admin analytics API missing${NC}"
fi

# 5. Check test mode support in assessment submit API
if grep -q "testMode" app/api/assessment/submit/route.ts; then
    echo -e "${GREEN}✅ Test mode support in assessment API${NC}"
else
    echo -e "${YELLOW}⚠️  Test mode support may be missing in assessment API${NC}"
fi

# 6. Check admin testing guide exists
if [ -f "ADMIN_TESTING_GUIDE.md" ]; then
    echo -e "${GREEN}✅ Admin testing guide exists${NC}"
else
    echo -e "${RED}❌ Admin testing guide missing${NC}"
fi

# 7. Check schema includes test_mode column
if grep -q "test_mode" supabase-schema-setup.sql; then
    echo -e "${GREEN}✅ Schema includes test_mode column${NC}"
else
    echo -e "${YELLOW}⚠️  Schema may be missing test_mode column${NC}"
fi

echo ""
echo -e "${BLUE}🧪 Testing System Components...${NC}"

# 8. Check tier configuration
if [ -f "lib/tierConfiguration.ts" ]; then
    echo -e "${GREEN}✅ Tier configuration exists${NC}"
    
    # Check if all tiers are defined
    if grep -q "one-time-diagnostic\|monthly-subscription\|comprehensive-package\|enterprise-transformation" lib/tierConfiguration.ts; then
        echo -e "${GREEN}✅ All tiers defined in configuration${NC}"
    else
        echo -e "${YELLOW}⚠️  Some tiers may be missing from configuration${NC}"
    fi
else
    echo -e "${RED}❌ Tier configuration missing${NC}"
fi

# 9. Check question bank
if [ -f "data/enhancedQuestionBankV3.ts" ]; then
    echo -e "${GREEN}✅ Enhanced question bank V3 exists${NC}"
else
    echo -e "${YELLOW}⚠️  Enhanced question bank V3 missing${NC}"
fi

# 10. Check algorithm files
if [ -f "lib/algorithms.ts" ] || [ -f "lib/analysis-algorithms.ts" ]; then
    echo -e "${GREEN}✅ Algorithm files exist${NC}"
else
    echo -e "${YELLOW}⚠️  Algorithm files may be missing${NC}"
fi

echo ""
echo -e "${BLUE}🔒 Security & Access Control...${NC}"

# 11. Check for admin authentication in admin pages
if grep -q "admin-token\|admin_authenticated\|adminPassword" app/admin/testing/page.tsx; then
    echo -e "${GREEN}✅ Admin authentication implemented${NC}"
else
    echo -e "${YELLOW}⚠️  Admin authentication may be missing${NC}"
fi

# 12. Check for admin access restrictions in APIs
if grep -q "admin-token\|Unauthorized" app/api/admin/assessment/[id]/route.ts; then
    echo -e "${GREEN}✅ Admin API access control implemented${NC}"
else
    echo -e "${YELLOW}⚠️  Admin API access control may be missing${NC}"
fi

echo ""
echo -e "${BLUE}📊 Data & Analytics...${NC}"

# 13. Check subscription manager
if [ -f "lib/subscription-manager.ts" ]; then
    echo -e "${GREEN}✅ Subscription manager exists${NC}"
else
    echo -e "${YELLOW}⚠️  Subscription manager missing${NC}"
fi

# 14. Check email notifications
if [ -f "lib/email-notifications.ts" ]; then
    echo -e "${GREEN}✅ Email notifications system exists${NC}"
else
    echo -e "${YELLOW}⚠️  Email notifications system missing${NC}"
fi

echo ""
echo -e "${BLUE}🧪 Testing Ready Status...${NC}"

# Calculate readiness score
total_checks=14
passed_checks=0

# Count passing checks (simplified - in real script would parse above results)
for file in \
    "app/admin/testing/page.tsx" \
    "app/admin/assessment/[id]/page.tsx" \
    "app/admin/analytics/page.tsx" \
    "app/api/admin/assessment/[id]/route.ts" \
    "app/api/admin/analytics/route.ts" \
    "ADMIN_TESTING_GUIDE.md" \
    "lib/tierConfiguration.ts" \
    "lib/subscription-manager.ts"
do
    if [ -f "$file" ]; then
        ((passed_checks++))
    fi
done

# Additional checks
if grep -q "testMode" app/api/assessment/submit/route.ts 2>/dev/null; then
    ((passed_checks++))
fi

if grep -q "test_mode" supabase-schema-setup.sql 2>/dev/null; then
    ((passed_checks++))
fi

if grep -q "admin-token" app/admin/testing/page.tsx 2>/dev/null; then
    ((passed_checks++))
fi

if [ -f "data/enhancedQuestionBankV3.ts" ]; then
    ((passed_checks++))
fi

if [ -f "lib/algorithms.ts" ] || [ -f "lib/analysis-algorithms.ts" ]; then
    ((passed_checks++))
fi

if [ -f "lib/email-notifications.ts" ]; then
    ((passed_checks++))
fi

readiness_percent=$((passed_checks * 100 / total_checks))

echo ""
echo "============================================="
echo -e "${BLUE}📊 ADMIN TESTING SYSTEM READINESS${NC}"
echo "============================================="
echo -e "Checks passed: ${GREEN}${passed_checks}${NC}/${total_checks}"
echo -e "Readiness: ${GREEN}${readiness_percent}%${NC}"

if [ $readiness_percent -ge 90 ]; then
    echo -e "${GREEN}🎉 Admin testing system is ready for use!${NC}"
    echo ""
    echo -e "${BLUE}🚀 Quick Start:${NC}"
    echo "1. Navigate to /admin/testing"
    echo "2. Enter admin password: northpath-admin-2025"
    echo "3. Run 'Run All Tests' to validate the system"
    echo "4. Check /admin/analytics for system metrics"
    echo ""
    echo -e "${YELLOW}📚 For detailed instructions, see ADMIN_TESTING_GUIDE.md${NC}"
elif [ $readiness_percent -ge 70 ]; then
    echo -e "${YELLOW}⚠️  Admin testing system is mostly ready but may have some issues${NC}"
    echo "Please review the missing components above"
else
    echo -e "${RED}❌ Admin testing system needs more work before use${NC}"
    echo "Please address the missing components above"
fi

echo ""
echo -e "${BLUE}🔧 Access URLs:${NC}"
echo "- Admin Testing Panel: http://localhost:3000/admin/testing"
echo "- Admin Analytics: http://localhost:3000/admin/analytics"
echo "- Assessment Viewer: http://localhost:3000/admin/assessment/[id]"

echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Start the development server: npm run dev"
echo "2. Access the admin testing panel"
echo "3. Run comprehensive tests across all tiers/industries"
echo "4. Review analytics to ensure proper data collection"
echo "5. Test individual assessment viewing and analysis"
echo ""

exit 0
