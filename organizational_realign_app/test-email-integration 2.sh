#!/bin/bash

echo "🧪 Testing Email Integration with SendGrid"
echo "========================================="

# Check environment variables
echo "1. Checking SendGrid Configuration..."
if [ -n "$SENDGRID_API_KEY" ]; then
    echo "✅ SENDGRID_API_KEY is set"
else
    echo "❌ SENDGRID_API_KEY not found in environment"
fi

if [ -n "$FROM_EMAIL" ]; then
    echo "✅ FROM_EMAIL is set: $FROM_EMAIL"
else
    echo "❌ FROM_EMAIL not found in environment"
fi

# Check email notification files
echo ""
echo "2. Checking Email Notification Implementation..."
if grep -q "sendTeamInvitation" lib/email-notifications.ts; then
    echo "✅ sendTeamInvitation function found"
else
    echo "❌ sendTeamInvitation function missing"
fi

if grep -q "getTeamInvitationTemplate" lib/email-notifications.ts; then
    echo "✅ getTeamInvitationTemplate function found"
else
    echo "❌ getTeamInvitationTemplate function missing"
fi

# Check API integration
echo ""
echo "3. Checking API Integration..."
if grep -q "sendTeamInvitation" app/api/teams/*/members/route.ts; then
    echo "✅ Email sending integrated in members API"
else
    echo "❌ Email sending not integrated in API"
fi

# Check if app is ready for testing
echo ""
echo "4. Application Status..."
if [ -f "package.json" ]; then
    echo "✅ Application ready for testing"
    echo ""
    echo "🚀 Ready to Test Email Integration!"
    echo ""
    echo "Test Steps:"
    echo "1. Start the development server: npm run dev"
    echo "2. Visit: http://localhost:3000/teams"
    echo "3. Create a team or select existing team"
    echo "4. Click 'Add Team Member' and invite someone"
    echo "5. Check that email is sent via SendGrid"
    echo ""
    echo "Email Template Preview:"
    echo "Subject: You've been invited to join [Team Name]"
    echo "Content: Professional invitation with accept/decline links"
    echo ""
else
    echo "❌ Application files not found"
fi

echo "========================================="
