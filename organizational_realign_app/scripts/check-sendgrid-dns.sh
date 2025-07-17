#!/bin/bash
# DNS Checker for SendGrid Records

echo "🔍 Checking SendGrid DNS Records for northpathstrategies.org..."
echo "================================================"

echo -n "✅ em9819.northpathstrategies.org: "
RESULT1=$(dig CNAME em9819.northpathstrategies.org +short)
if [ "$RESULT1" = "u54400918.wl169.sendgrid.net." ]; then
    echo "✅ CORRECT: $RESULT1"
else
    echo "❌ MISSING/WRONG: '$RESULT1' (should be 'u54400918.wl169.sendgrid.net.')"
fi

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
