// Quick test to verify the comprehensive question bank filtering
const { comprehensiveQuestionBank, getQuestionsForInstitution, getSectionsForInstitution, consultancyAreas } = require('./data/comprehensiveQuestionBank.ts');

console.log('=== Testing Comprehensive Question Bank ===');

// Test institution types
const institutionTypes = ['community-college', 'public-university', 'private-university', 'healthcare', 'nonprofit', 'government', 'corporate'];

institutionTypes.forEach(type => {
  console.log(`\n--- ${type.toUpperCase()} ---`);
  
  const questions = getQuestionsForInstitution(type);
  const sections = getSectionsForInstitution(type);
  const consultancy = consultancyAreas[type];
  
  console.log(`Questions: ${questions.length}`);
  console.log(`Sections: ${sections.length}`);
  console.log(`Sections: ${sections.join(', ')}`);
  console.log(`Consultancy areas: ${consultancy?.length || 0}`);
  
  if (consultancy) {
    console.log(`Consultancy services: ${consultancy.join(', ')}`);
  }
});

console.log('\n=== Total Questions by Type ===');
const questionTypes = {};
comprehensiveQuestionBank.forEach(q => {
  questionTypes[q.type] = (questionTypes[q.type] || 0) + 1;
});

Object.entries(questionTypes).forEach(([type, count]) => {
  console.log(`${type}: ${count}`);
});

console.log(`\nTotal questions in bank: ${comprehensiveQuestionBank.length}`);
