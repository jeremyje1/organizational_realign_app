#!/usr/bin/env node

/**
 * SEO Verification Script
 * 
 * This script checks all pages in the app directory for proper SEO implementation
 * including metadata, image alt texts, and structured data.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

// Directories to search
const APP_DIR = path.join(__dirname, '../app');
const COMPONENTS_DIR = path.join(__dirname, '../components');

// Results storage
const results = {
  pagesWithMetadata: 0,
  pagesWithoutMetadata: [],
  imagesWithoutAlt: [],
  missingStructuredData: [],
  score: 0,
  suggestions: []
};

// Check if chalk is installed, if not, install it
try {
  require.resolve('chalk');
} catch (e) {
  console.log('Installing required dependencies...');
  execSync('npm install chalk --no-save', { stdio: 'inherit' });
  console.log('Dependencies installed.');
}

console.log(chalk.blue.bold('🔍 Starting SEO verification...'));

// Function to recursively find all tsx/jsx files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Check for metadata
function checkMetadata(fileContent, filePath) {
  // Check for Next.js metadata export
  const hasMetadata = fileContent.includes('export const metadata') || 
                      fileContent.includes('export const generateMetadata');
  
  // Check for client-side SEO components
  const hasClientSEO = fileContent.includes('<MetaTags') || 
                      fileContent.includes('<DynamicSEO') ||
                      fileContent.includes('<EnhancedSEO');
  
  if (!hasMetadata && !hasClientSEO && filePath.includes('/page.')) {
    results.pagesWithoutMetadata.push(path.relative(process.cwd(), filePath));
  } else if ((hasMetadata || hasClientSEO) && filePath.includes('/page.')) {
    results.pagesWithMetadata++;
  }
}

// Check images for alt text
function checkImagesForAltText(fileContent, filePath) {
  const imageRegex = /<Image[^>]*>/g;
  const matches = fileContent.match(imageRegex);
  
  if (matches) {
    matches.forEach(match => {
      if (!match.includes('alt=') || match.includes('alt=""')) {
        results.imagesWithoutAlt.push({
          file: path.relative(process.cwd(), filePath),
          imageTag: match.substring(0, 50) + '...'
        });
      }
    });
  }
}

// Check for structured data
function checkStructuredData(fileContent, filePath) {
  const isLayoutOrIndexPage = filePath.includes('layout.') || 
                             (filePath.includes('/page.') && filePath.includes('/app/') && 
                              !filePath.includes('/app/secure/'));
  
  const hasStructuredData = fileContent.includes('<StructuredData') || 
                           fileContent.includes('structuredData={true}');
  
  if (isLayoutOrIndexPage && !hasStructuredData) {
    results.missingStructuredData.push(path.relative(process.cwd(), filePath));
  }
}

// Process all files
console.log(chalk.yellow('Scanning app directory...'));
const appFiles = findFiles(APP_DIR);
const componentFiles = findFiles(COMPONENTS_DIR);
const allFiles = [...appFiles, ...componentFiles];

allFiles.forEach(filePath => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  checkMetadata(fileContent, filePath);
  checkImagesForAltText(fileContent, filePath);
  checkStructuredData(fileContent, filePath);
});

// Calculate SEO score
const totalPages = results.pagesWithMetadata + results.pagesWithoutMetadata.length;
const metadataScore = totalPages > 0 ? (results.pagesWithMetadata / totalPages) * 100 : 100;

// Missing alt text penalty (each missing alt reduces score by 2%)
const altTextPenalty = Math.min(results.imagesWithoutAlt.length * 2, 30);

// Missing structured data penalty (each important page missing data reduces score by 5%)
const structuredDataPenalty = Math.min(results.missingStructuredData.length * 5, 20);

results.score = Math.max(0, Math.min(100, Math.round(metadataScore - altTextPenalty - structuredDataPenalty)));

// Generate suggestions
if (results.pagesWithoutMetadata.length > 0) {
  results.suggestions.push('Add metadata to all pages that are missing it');
}

if (results.imagesWithoutAlt.length > 0) {
  results.suggestions.push('Add descriptive alt text to all images');
}

if (results.missingStructuredData.length > 0) {
  results.suggestions.push('Add structured data to important pages');
}

// Output results
console.log('\n' + chalk.green.bold('✅ SEO Verification Complete'));
console.log(chalk.yellow.bold(`\nSEO Score: ${results.score}/100`));

console.log(chalk.blue.bold('\n📊 Summary:'));
console.log(`Pages with metadata: ${chalk.green(results.pagesWithMetadata)}`);
console.log(`Pages missing metadata: ${chalk.red(results.pagesWithoutMetadata.length)}`);
console.log(`Images missing alt text: ${chalk.red(results.imagesWithoutAlt.length)}`);
console.log(`Important pages missing structured data: ${chalk.red(results.missingStructuredData.length)}`);

if (results.pagesWithoutMetadata.length > 0) {
  console.log(chalk.red.bold('\n⚠️ Pages missing metadata:'));
  results.pagesWithoutMetadata.slice(0, 10).forEach(page => {
    console.log(`  - ${page}`);
  });
  if (results.pagesWithoutMetadata.length > 10) {
    console.log(`  ... and ${results.pagesWithoutMetadata.length - 10} more`);
  }
}

if (results.imagesWithoutAlt.length > 0) {
  console.log(chalk.red.bold('\n⚠️ Images missing alt text:'));
  results.imagesWithoutAlt.slice(0, 5).forEach(item => {
    console.log(`  - ${item.file}: ${item.imageTag}`);
  });
  if (results.imagesWithoutAlt.length > 5) {
    console.log(`  ... and ${results.imagesWithoutAlt.length - 5} more`);
  }
}

if (results.suggestions.length > 0) {
  console.log(chalk.blue.bold('\n📝 Suggestions:'));
  results.suggestions.forEach((suggestion, index) => {
    console.log(`  ${index + 1}. ${suggestion}`);
  });
}

console.log('\n' + chalk.green.bold('🚀 Next steps:'));
console.log('1. Fix issues identified above');
console.log('2. Run a Lighthouse audit for complete SEO analysis');
console.log('3. Set up Google Search Console and Analytics');

if (results.score < 70) {
  console.log(chalk.red.bold('\n❗ Critical: Your SEO implementation needs significant improvement'));
} else if (results.score < 90) {
  console.log(chalk.yellow.bold('\n⚠️ Warning: Your SEO implementation needs some improvement'));
} else {
  console.log(chalk.green.bold('\n🎉 Excellent: Your SEO implementation is solid!'));
}
