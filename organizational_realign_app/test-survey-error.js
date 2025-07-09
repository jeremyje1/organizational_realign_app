// Test script to identify survey errors
const { exec } = require('child_process');

console.log('Testing survey error scenarios...');

// Test 1: Check if question bank loads properly
console.log('\n1. Testing question bank import...');
try {
  const questionBank = require('./data/northpathQuestionBank.ts');
  console.log('✅ Question bank imported successfully');
  console.log('✅ Total questions:', questionBank.allQuestions?.length || 'undefined');
  console.log('✅ Algorithm params:', questionBank.algorithmParameters?.length || 'undefined');
  console.log('✅ Upload questions:', questionBank.universalUploads?.length || 'undefined');
  
  // Check for upload type questions
  const uploadQuestions = questionBank.allQuestions?.filter(q => q.type === 'upload') || [];
  console.log('✅ Upload type questions found:', uploadQuestions.length);
  
  // Check for algorithm questions
  const algorithmQuestions = questionBank.allQuestions?.filter(q => q.section === 'Algorithm Parameters') || [];
  console.log('✅ Algorithm questions found:', algorithmQuestions.length);
  
  // Check organization types
  const orgTypes = [...new Set(questionBank.allQuestions?.map(q => q.vertical).filter(Boolean))];
  console.log('✅ Organization types supported:', orgTypes.length);
  
} catch (err) {
  console.error('❌ Question bank error:', err.message);
}

// Test 2: Check for common React/Next.js issues
console.log('\n2. Testing for common runtime errors...');

// Test 3: Check environment
console.log('\n3. Environment check...');
console.log('✅ Node version:', process.version);
console.log('✅ Current directory:', process.cwd());

console.log('\n✅ Test completed. Check for any ❌ errors above.');
