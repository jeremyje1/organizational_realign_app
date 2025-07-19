#!/bin/bash
# VS Code Performance Maintenance Script

echo "🧹 Cleaning up workspace for better VS Code performance..."

# Remove build artifacts
echo "Removing build artifacts..."
rm -rf .next dist build coverage .vercel tmp temp

# Clean up logs and cache files
echo "Cleaning logs and cache..."
find . -name "*.log" -type f -delete 2>/dev/null || true
find . -name ".DS_Store" -type f -delete 2>/dev/null || true
find . -name "Thumbs.db" -type f -delete 2>/dev/null || true

# Clean TypeScript build info
echo "Cleaning TypeScript cache..."
rm -f .tsbuildinfo
rm -rf node_modules/.cache 2>/dev/null || true

# Show current stats
echo ""
echo "📊 Current workspace stats:"
echo "Size: $(du -sh . | cut -f1)"
echo "Files: $(find . -type f | wc -l | tr -d ' ')"

echo ""
echo "✅ Cleanup complete! Consider:"
echo "   1. Restarting VS Code"
echo "   2. Running 'TypeScript: Restart TS Server'"
echo "   3. Closing unused tabs"
