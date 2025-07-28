#!/usr/bin/env node

/**
 * Core Organizational Assessment Test
 * Tests comprehensive package tier with multi-org type support
 */

const { 
  getQuestionsForTier,
  getRequiredQuestions,
  validateAssessmentResponses,
  getAIReadinessAssessment,
  getQuestionStats
} = require('./lib/enhancedQuestionBankV3.ts');

console.log('🏛️ CORE ORGANIZATIONAL ASSESSMENT TEST\n');
console.log('=' .repeat(70));

// Test Configuration - Higher Education Comprehensive Package
const TEST_CONFIG = {
  tier: 'comprehensive-package',
  organizationType: 'higher-education'
};

console.log(`📋 Testing: ${TEST_CONFIG.tier} for ${TEST_CONFIG.organizationType}`);
console.log('=' .repeat(70));

// Get assessment structure
const allQuestions = getQuestionsForTier(TEST_CONFIG.tier, TEST_CONFIG.organizationType);
const requiredQuestions = getRequiredQuestions(TEST_CONFIG.tier, TEST_CONFIG.organizationType);
const stats = getQuestionStats(TEST_CONFIG.tier, TEST_CONFIG.organizationType);

console.log('\n📊 ASSESSMENT STRUCTURE:');
console.log(`   Total Questions: ${allQuestions.length}`);
console.log(`   Required Questions: ${requiredQuestions.length}`);
console.log(`   Sections: ${stats.sections.length}`);
console.log(`   Meets Website Promise: ${stats.meetsWebsitePromise ? '✅' : '❌'}`);

// Generate comprehensive mock responses
console.log('\n🎭 GENERATING COMPREHENSIVE MOCK RESPONSES...');

const mockResponses = {};

// Higher education specific realistic responses
const heTextResponses = {
  'HE_04': "Our institution employs a multi-faceted approach to personalized learning including adaptive learning platforms like McGraw Hill Connect and Pearson MyLab, comprehensive learning analytics through our Canvas LMS integration, individualized learning paths developed through our honors program and learning communities, AI-powered tutoring systems including Tutor.com and our pilot implementation of Carnegie Learning's MATHia platform, competency-based progression models in our nursing and engineering programs, multimedia content delivery through Kaltura and interactive simulations, student self-assessment tools integrated into our ePortfolio system, extensive faculty training on personalization strategies through our Center for Teaching Excellence, data-driven intervention systems that identify at-risk students early, and flexible scheduling options including online, hybrid, and accelerated formats. Our personalized approach has shown particular success in STEM courses where students can progress at their own pace while maintaining rigor.",
  
  // Add more contextual responses for higher education
  'default_text': "Our institution has implemented a comprehensive strategy that includes systematic assessment of current capabilities, strategic planning with stakeholder input, dedicated resource allocation, professional development programs, technology infrastructure improvements, policy development and governance structures, regular evaluation and feedback mechanisms, and continuous improvement processes. We've established cross-functional teams to ensure coordinated implementation and have developed metrics to track progress and effectiveness. Our approach emphasizes both immediate operational improvements and long-term strategic transformation aligned with our institutional mission and student success goals."
};

// Generate responses based on question types and context
allQuestions.forEach(question => {
  switch (question.type) {
    case 'likert':
      // Generate realistic higher education responses (slightly higher scores)
      const weights = [0.05, 0.1, 0.25, 0.35, 0.25]; // Distribution favoring 3-5
      const rand = Math.random();
      let score = 1;
      let cumulative = 0;
      for (let i = 0; i < weights.length; i++) {
        cumulative += weights[i];
        if (rand <= cumulative) {
          score = i + 1;
          break;
        }
      }
      mockResponses[question.id] = score;
      break;
    
    case 'text':
      // Use question-specific responses where available
      if (heTextResponses[question.id]) {
        mockResponses[question.id] = heTextResponses[question.id];
      } else {
        // Generate context-aware responses based on question content
        if (question.prompt.toLowerCase().includes('faculty') || question.prompt.toLowerCase().includes('teaching')) {
          mockResponses[question.id] = "Our faculty development initiatives include comprehensive training programs, mentorship opportunities, sabbatical support, conference funding, teaching excellence awards, research collaboration opportunities, and ongoing professional development workshops. We've established faculty learning communities, provide instructional design support, offer technology training, and maintain a robust faculty evaluation and feedback system. Our approach emphasizes both individual growth and institutional excellence while supporting work-life balance and career advancement.";
        } else if (question.prompt.toLowerCase().includes('student') || question.prompt.toLowerCase().includes('learning')) {
          mockResponses[question.id] = "Our student success initiatives encompass comprehensive academic support services, career counseling and planning, mental health and wellness programs, financial aid and scholarship opportunities, academic advising and mentoring, tutoring and supplemental instruction, student engagement activities, diversity and inclusion programs, and technological support systems. We've implemented early warning systems, provide extensive orientation programs, offer flexible learning options, and maintain strong alumni networks to support current students.";
        } else if (question.prompt.toLowerCase().includes('technology') || question.prompt.toLowerCase().includes('infrastructure')) {
          mockResponses[question.id] = "Our technology infrastructure includes robust network capabilities, comprehensive learning management systems, integrated student information systems, advanced classroom technology, high-performance computing resources, cybersecurity measures, cloud-based services, mobile applications, accessibility tools, and 24/7 technical support. We regularly update our systems, provide training for users, maintain redundancy and backup systems, and ensure compliance with data privacy and security regulations.";
        } else {
          mockResponses[question.id] = heTextResponses['default_text'];
        }
      }
      break;
    
    case 'numeric':
      // Generate realistic percentages based on question context
      if (question.prompt.toLowerCase().includes('percentage') || question.prompt.toLowerCase().includes('%')) {
        // AI opportunity questions typically have higher percentages
        if (question.tags?.includes('ai-opportunity')) {
          mockResponses[question.id] = Math.floor(Math.random() * 40) + 30; // 30-70%
        } else {
          mockResponses[question.id] = Math.floor(Math.random() * 60) + 20; // 20-80%
        }
      } else {
        mockResponses[question.id] = Math.floor(Math.random() * 100);
      }
      break;
    
    case 'upload':
      // Only add uploads for required questions to test validation
      if (question.required) {
        mockResponses[question.id] = [
          { name: 'strategic-plan-2024.pdf', size: 512000, type: 'application/pdf' },
          { name: 'annual-report.pdf', size: 1024000, type: 'application/pdf' }
        ];
      }
      break;
    
    case 'boolean':
      mockResponses[question.id] = Math.random() > 0.25; // 75% true
      break;
    
    case 'multiple-choice':
      mockResponses[question.id] = Math.floor(Math.random() * 5) + 1; // 1-5
      break;
    
    default:
      mockResponses[question.id] = `Comprehensive response for ${question.type} question in higher education context`;
  }
});

console.log(`✅ Generated responses for ${Object.keys(mockResponses).length} questions`);

// Test validation
console.log('\n🔍 VALIDATION TESTING...');

const validationResult = validateAssessmentResponses(
  mockResponses, 
  TEST_CONFIG.tier, 
  TEST_CONFIG.organizationType
);

console.log('\n📋 VALIDATION RESULTS:');
console.log(`   ✅ Valid Assessment: ${validationResult.valid ? 'YES' : 'NO'}`);
console.log(`   📊 AI Opportunity Score: ${validationResult.aiOpportunityScore}%`);
console.log(`   ⚠️  Warnings: ${validationResult.warningOptional.length}`);
console.log(`   ❌ Missing Required: ${validationResult.missingRequired.length}`);

// Calculate detailed metrics
const responseCount = Object.keys(mockResponses).length;
const completionRate = (responseCount / allQuestions.length * 100).toFixed(1);

console.log('\n' + '=' .repeat(70));
console.log('🎓 HIGHER EDUCATION ORGANIZATIONAL ASSESSMENT REPORT');
console.log('=' .repeat(70));

console.log(`\n📈 ASSESSMENT OVERVIEW:`);
console.log(`   🎯 Completion Rate: ${completionRate}%`);
console.log(`   📊 Questions Answered: ${responseCount}/${allQuestions.length}`);
console.log(`   ✅ Validation Status: ${validationResult.valid ? 'PASSED' : 'FAILED'}`);
console.log(`   🤖 AI Opportunity Score: ${validationResult.aiOpportunityScore}%`);

// Analyze by section with detailed scoring
const sectionAnalysis = {};

allQuestions.forEach(q => {
  if (!sectionAnalysis[q.section]) {
    sectionAnalysis[q.section] = {
      total: 0,
      answered: 0,
      required: 0,
      requiredAnswered: 0,
      likertScores: [],
      questionTypes: {}
    };
  }
  
  const section = sectionAnalysis[q.section];
  section.total++;
  
  if (q.required) section.required++;
  
  // Track question types
  if (!section.questionTypes[q.type]) section.questionTypes[q.type] = 0;
  section.questionTypes[q.type]++;
  
  const response = mockResponses[q.id];
  if (response !== undefined && response !== null && response !== '') {
    section.answered++;
    if (q.required) section.requiredAnswered++;
    
    if (q.type === 'likert' && typeof response === 'number') {
      section.likertScores.push(response);
    }
  }
});

// Calculate section metrics
Object.keys(sectionAnalysis).forEach(sectionName => {
  const data = sectionAnalysis[sectionName];
  data.completionRate = ((data.answered / data.total) * 100).toFixed(1);
  data.requiredCompletionRate = data.required > 0 ? ((data.requiredAnswered / data.required) * 100).toFixed(1) : 'N/A';
  
  if (data.likertScores.length > 0) {
    data.avgScore = (data.likertScores.reduce((a, b) => a + b, 0) / data.likertScores.length).toFixed(1);
    data.strengthLevel = parseFloat(data.avgScore) >= 4.0 ? 'Strong' : 
                       parseFloat(data.avgScore) >= 3.0 ? 'Moderate' : 'Developing';
  }
});

console.log('\n📊 SECTION-BY-SECTION ANALYSIS:');

// Sort sections by average score for prioritization
const sortedSections = Object.entries(sectionAnalysis)
  .sort(([,a], [,b]) => (parseFloat(b.avgScore) || 0) - (parseFloat(a.avgScore) || 0));

sortedSections.forEach(([sectionName, data], index) => {
  console.log(`\n${index + 1}. 📁 ${sectionName}`);
  console.log(`   📊 Completion: ${data.answered}/${data.total} (${data.completionRate}%)`);
  console.log(`   ✅ Required: ${data.requiredAnswered}/${data.required} (${data.requiredCompletionRate}%)`);
  
  if (data.avgScore) {
    console.log(`   ⭐ Average Score: ${data.avgScore}/5.0 (${data.strengthLevel})`);
    
    // Provide detailed assessment
    const score = parseFloat(data.avgScore);
    let assessment = '';
    let icon = '';
    
    if (score >= 4.5) {
      assessment = 'Exceptional - Significant institutional strength';
      icon = '🌟';
    } else if (score >= 4.0) {
      assessment = 'Strong - Well-developed with minor enhancement opportunities';
      icon = '🟢';
    } else if (score >= 3.5) {
      assessment = 'Good - Solid foundation with clear improvement pathways';
      icon = '🟡';
    } else if (score >= 3.0) {
      assessment = 'Moderate - Developing capabilities requiring focused attention';
      icon = '🟠';
    } else {
      assessment = 'Below Average - Significant development needed';
      icon = '🔴';
    }
    
    console.log(`   ${icon} Assessment: ${assessment}`);
  }
});

// Generate strategic recommendations
console.log('\n' + '=' .repeat(70));
console.log('🎯 STRATEGIC RECOMMENDATIONS');
console.log('=' .repeat(70));

// Calculate overall institutional readiness
const allScores = Object.values(sectionAnalysis)
  .filter(s => s.avgScore)
  .map(s => parseFloat(s.avgScore));

const overallAverage = allScores.length > 0 ? 
  (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1) : 0;

console.log(`\n📈 OVERALL INSTITUTIONAL READINESS: ${overallAverage}/5.0`);

const recommendations = [
  `📊 Focus on sections scoring below ${overallAverage} for priority improvement`,
  '🎯 Develop 90-day action plans for lowest-scoring areas',
  '👥 Engage stakeholders in strategic planning based on these results',
  '📅 Schedule follow-up assessment in 6-12 months to track progress',
  '🤝 Consider peer institution benchmarking for best practices'
];

if (validationResult.aiOpportunityScore >= 50) {
  recommendations.push('🤖 High AI opportunity - develop comprehensive AI strategy');
}

console.log('\n💡 KEY RECOMMENDATIONS:');
recommendations.forEach((rec, index) => {
  console.log(`   ${index + 1}. ${rec}`);
});

console.log('\n' + '=' .repeat(70));
console.log('✅ COMPREHENSIVE ASSESSMENT COMPLETE');
console.log('=' .repeat(70));

console.log('\n🎯 EXECUTIVE SUMMARY:');
console.log(`   • Overall Readiness: ${overallAverage}/5.0`);
console.log(`   • Assessment Completion: ${completionRate}%`);
console.log(`   • Sections Analyzed: ${Object.keys(sectionAnalysis).length}`);
console.log(`   • Validation Status: ${validationResult.valid ? 'PASSED' : 'FAILED'}`);
console.log(`   • AI Opportunity Score: ${validationResult.aiOpportunityScore}%`);

console.log('\n🚀 Assessment provides actionable insights for strategic planning!\n');
