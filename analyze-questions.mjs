#!/usr/bin/env node

// Script to analyze and display questions by institution type
import { 
  comprehensiveQuestionBank, 
  getQuestionsForInstitution, 
  getSectionsForInstitution, 
  consultancyAreas,
  InstitutionType 
} from './data/comprehensiveQuestionBank.js';

console.log('📊 COMPREHENSIVE ORGANIZATIONAL REALIGNMENT ASSESSMENT');
console.log('=' .repeat(80));
console.log(`Total Questions in Bank: ${comprehensiveQuestionBank.length}`);
console.log('DEI Questions: REMOVED ❌');
console.log('=' .repeat(80));

const institutionTypes = [
  'community-college', 
  'public-university', 
  'private-university', 
  'healthcare', 
  'nonprofit', 
  'government', 
  'corporate'
];

institutionTypes.forEach(type => {
  console.log(`\n🏛️  ${type.toUpperCase().replace('-', ' ')}`);
  console.log('-' .repeat(60));
  
  const questions = getQuestionsForInstitution(type);
  const sections = getSectionsForInstitution(type);
  const consultancy = consultancyAreas[type];
  
  console.log(`📝 Total Questions: ${questions.length}`);
  console.log(`📋 Sections: ${sections.length}`);
  console.log(`🔧 Consultancy Services: ${consultancy?.length || 0}`);
  
  console.log('\n📋 SECTIONS:');
  sections.forEach((section, idx) => {
    const sectionQuestions = questions.filter(q => q.section === section);
    const aiQuestions = sectionQuestions.filter(q => q.tags?.includes('AI')).length;
    const hoQuestions = sectionQuestions.filter(q => q.tags?.includes('HO')).length;
    const highPriority = sectionQuestions.filter(q => q.priority === 'high').length;
    
    console.log(`  ${idx + 1}. ${section}`);
    console.log(`     Questions: ${sectionQuestions.length} | AI: ${aiQuestions} | Human Oversight: ${hoQuestions} | High Priority: ${highPriority}`);
  });
  
  if (consultancy) {
    console.log('\n🔧 CONSULTANCY SERVICES:');
    consultancy.forEach((service, idx) => {
      console.log(`  ${idx + 1}. ${service}`);
    });
  }
  
  // Show sample questions for this institution type
  console.log('\n📝 SAMPLE QUESTIONS:');
  const sampleQuestions = questions.slice(0, 5);
  sampleQuestions.forEach((q, idx) => {
    const tags = q.tags ? ` [${q.tags.join(', ')}]` : '';
    const priority = q.priority ? ` (${q.priority.toUpperCase()})` : '';
    console.log(`  ${idx + 1}. ${q.prompt}${tags}${priority}`);
  });
});

// Summary statistics
console.log('\n\n📊 SUMMARY STATISTICS');
console.log('=' .repeat(80));

const questionTypes = {};
const tagStats = {};
const priorityStats = {};

comprehensiveQuestionBank.forEach(q => {
  // Count question types
  questionTypes[q.type] = (questionTypes[q.type] || 0) + 1;
  
  // Count tags
  if (q.tags) {
    q.tags.forEach(tag => {
      tagStats[tag] = (tagStats[tag] || 0) + 1;
    });
  }
  
  // Count priorities
  if (q.priority) {
    priorityStats[q.priority] = (priorityStats[q.priority] || 0) + 1;
  }
});

console.log('\n📝 QUESTION TYPES:');
Object.entries(questionTypes).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});

console.log('\n🏷️  QUESTION TAGS:');
Object.entries(tagStats).forEach(([tag, count]) => {
  console.log(`  ${tag}: ${count}`);
});

console.log('\n⚡ QUESTION PRIORITIES:');
Object.entries(priorityStats).forEach(([priority, count]) => {
  console.log(`  ${priority}: ${count}`);
});

// Institution overlap analysis
console.log('\n\n🔗 INSTITUTION OVERLAP ANALYSIS');
console.log('=' .repeat(80));

institutionTypes.forEach(type1 => {
  const questions1 = new Set(getQuestionsForInstitution(type1).map(q => q.id));
  
  institutionTypes.forEach(type2 => {
    if (type1 !== type2) {
      const questions2 = new Set(getQuestionsForInstitution(type2).map(q => q.id));
      const overlap = new Set([...questions1].filter(x => questions2.has(x)));
      const percentage = Math.round((overlap.size / questions1.size) * 100);
      
      if (percentage > 50) {
        console.log(`${type1} ↔ ${type2}: ${overlap.size}/${questions1.size} (${percentage}%)`);
      }
    }
  });
});

console.log('\n✅ Assessment is ready for deployment with institution-specific questions and consultancy services.');
