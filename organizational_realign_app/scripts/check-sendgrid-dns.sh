#!/bin/bash
# DNS Checker for SendGrid Records

echo "🔍 Checking SendGrid DNS Records for northpathstrategies.org..."
echo "================================================"

# Check both possible mail subdomains
echo "🔍 Checking possible mail subdomains..."
echo -n "📧 em4533.northpathstrategies.org: "
RESULT_EM4533=$(dig CNAME em4533.northpathstrategies.org +short)
if [ "$RESULT_EM4533" = "u54400918.wl169.sendgrid.net." ]; then
    echo "✅ CORRECT: $RESULT_EM4533"
else
    echo "❌ MISSING/WRONG: '$RESULT_EM4533' (should be 'u54400918.wl169.sendgrid.net.')"
fi

echo -n "📧 em9819.northpathstrategies.org: "
RESULT_EM9819=$(dig CNAME em9819.northpathstrategies.org +short)
if [ "$RESULT_EM9819" = "u54400918.wl169.sendgrid.net." ]; then
    echo "✅ CORRECT: $RESULT_EM9819"
else
    echo "❌ MISSING/WRONG: '$RESULT_EM9819' (should be 'u54400918.wl169.sendgrid.net.')"
fi

echo ""
echo "🔍 Checking DKIM records..."

echo -n "✅ s1._domainkey.northpathstrategies.org: "
RESULT2=$(dig CNAME s1._domainkey.northpathstrategies.org +short)
if [ "$RESULT2" = "s1.domainkey.u54400918.wl169.sendgrid.net." ]; then
    echo "✅ CORRECT: $RESULT2"
else
    echo "❌ MISSING/WRONG: '$RESULT2' (should be 's1.domainkey.u54400918.wl169.sendgrid.net.')"
fi

echo -n "✅ s2._domainkey.northpathstrategies.org: "
RESULT3=$(dig CNAME s2._domainkey.northpathstrategies.org +short)
if [ "$RESULT3" = "s2.domainkey.u54400918.wl169.sendgrid.net." ]; then
    echo "✅ CORRECT: $RESULT3"
else
    echo "❌ MISSING/WRONG: '$RESULT3' (should be 's2.domainkey.u54400918.wl169.sendgrid.net.')"
fi

echo "================================================"
echo "💡 DNS propagation can take 15-60 minutes"
echo "💡 Run this script again to check progress"
