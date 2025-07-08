/**
 * Security check script
 * 
 * This script scans project files for potential security issues:
 * - Checks for hardcoded API keys and secrets
 * - Verifies .env files are properly gitignored
 * - Ensures sensitive environment variables are not exposed
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Patterns to look for
const SENSITIVE_PATTERNS = [
  { pattern: /sk_live_[0-9a-zA-Z]{24}/g, description: 'Stripe Secret Key' },
  { pattern: /pk_live_[0-9a-zA-Z]{24}/g, description: 'Stripe Publishable Key' },
  { pattern: /whsec_[0-9a-zA-Z]{24}/g, description: 'Stripe Webhook Secret' },
  { pattern: /eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/g, description: 'JWT Token or Supabase Key' },
  { pattern: /https:\/\/[a-zA-Z0-9-]+\.supabase\.co/g, description: 'Supabase URL' },
  { pattern: /postgresql:\/\/[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_-]+/g, description: 'Database Connection String' },
  { pattern: /process\.env\.[A-Z_]+/g, description: 'Environment Variable Reference' }
];

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules',
  '.git',
  '.next',
  'out',
  'build',
  'dist',
  'public',
  'coverage'
];

// Files to exclude
const EXCLUDE_FILES = [
  '.env.example',
  '.env.local.example',
  'security-check.js'
];

// Function to check if a file contains sensitive patterns
function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    // Check for sensitive patterns
    SENSITIVE_PATTERNS.forEach(({ pattern, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          file: filePath,
          description,
          count: matches.length
        });
      }
    });

    return issues;
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return [];
  }
}

// Function to walk through directory and check files
function scanDirectory(dir, issues = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        scanDirectory(filePath, issues);
      }
    } else if (stat.isFile()) {
      if (!EXCLUDE_FILES.includes(file) && !file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.ico')) {
        const fileIssues = checkFile(filePath);
        issues.push(...fileIssues);
      }
    }
  }
  
  return issues;
}

// Check .gitignore for .env files
function checkGitIgnore() {
  try {
    const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
    const envPatterns = ['.env', '*.env', '.env.local', '.env*'];
    
    const missing = envPatterns.filter(pattern => !gitignoreContent.includes(pattern));
    
    if (missing.length > 0) {
      console.error('\n❌ WARNING: .gitignore is missing patterns for environment files:');
      missing.forEach(pattern => {
        console.error(`   - ${pattern}`);
      });
      console.error('\n   Update .gitignore to include these patterns!\n');
    } else {
      console.log('\n✅ .gitignore properly configured for environment files');
    }
  } catch (error) {
    console.error('\n❌ ERROR: Could not read .gitignore file');
  }
}

// Main execution
console.log('🔒 Running security check...');
const projectDir = process.cwd();
console.log(`Scanning directory: ${projectDir}`);

// Check for sensitive patterns
const issues = scanDirectory(projectDir);

// Check .gitignore configuration
checkGitIgnore();

// Check for security vulnerabilities with npm audit
try {
  console.log('\n🔍 Running npm audit...');
  const auditOutput = execSync('npm audit --json', { encoding: 'utf8' });
  const auditResult = JSON.parse(auditOutput);
  
  const vulnerabilitiesBySeverity = {};
  Object.entries(auditResult.metadata.vulnerabilities).forEach(([severity, count]) => {
    if (count > 0) {
      vulnerabilitiesBySeverity[severity] = count;
    }
  });
  
  if (Object.keys(vulnerabilitiesBySeverity).length > 0) {
    console.error('\n❌ Vulnerabilities found in dependencies:');
    Object.entries(vulnerabilitiesBySeverity).forEach(([severity, count]) => {
      console.error(`   - ${severity}: ${count}`);
    });
    console.error('\n   Run `npm audit fix` to try to automatically fix these issues.');
  } else {
    console.log('\n✅ No vulnerabilities found in dependencies');
  }
} catch (error) {
  console.error('\n❌ Error running npm audit:', error.message);
}

// Display results
if (issues.length > 0) {
  console.error('\n❌ Potential security issues found:');
  
  const fileGroups = {};
  issues.forEach(issue => {
    if (!fileGroups[issue.file]) {
      fileGroups[issue.file] = [];
    }
    fileGroups[issue.file].push(issue);
  });
  
  Object.entries(fileGroups).forEach(([file, fileIssues]) => {
    console.error(`\n   File: ${file}`);
    fileIssues.forEach(issue => {
      console.error(`   - ${issue.description}: ${issue.count} occurrences`);
    });
  });
  
  console.error('\n⚠️  Review these files for potential sensitive information');
  process.exit(1);
} else {
  console.log('\n✅ No obvious security issues found in scanned files');
}
