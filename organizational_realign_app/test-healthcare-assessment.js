#!/usr/bin/env node

/**
 * Healthcare Organization Assessment Test
 * Tests healthcare-specific assessment with realistic clinical data
 */

const { 
  getQuestionsForTier,
  getRequiredQuestions,
  validateAssessmentResponses,
  getQuestionStats
} = require('./lib/enhancedQuestionBankV3.ts');

console.log('🏥 HEALTHCARE ORGANIZATION ASSESSMENT TEST\n');
console.log('=' .repeat(70));

// Test Configuration - Healthcare Organization
const TEST_CONFIG = {
  tier: 'monthly-subscription',
  organizationType: 'healthcare'
};

console.log(`📋 Testing: ${TEST_CONFIG.tier} for ${TEST_CONFIG.organizationType}`);
console.log('=' .repeat(70));

// Get assessment structure
const allQuestions = getQuestionsForTier(TEST_CONFIG.tier, TEST_CONFIG.organizationType);
const requiredQuestions = getRequiredQuestions(TEST_CONFIG.tier, TEST_CONFIG.organizationType);
const stats = getQuestionStats(TEST_CONFIG.tier, TEST_CONFIG.organizationType);

console.log('\n📊 HEALTHCARE ASSESSMENT STRUCTURE:');
console.log(`   Total Questions: ${allQuestions.length}`);
console.log(`   Required Questions: ${requiredQuestions.length}`);
console.log(`   Sections: ${stats.sections.length}`);
console.log(`   Question Types:`, stats.byType);

// Generate healthcare-specific mock responses
console.log('\n🏥 GENERATING HEALTHCARE-SPECIFIC RESPONSES...');

const mockResponses = {};

// Healthcare-specific realistic text responses
const healthcareResponses = {
  'HC_04': "Our organization has implemented multiple AI-assisted clinical decision support systems including Epic's Sepsis Model for early sepsis detection, IBM Watson for Oncology treatment recommendations, Philips IntelliSpace for medical imaging analysis, Cerner's Health Facts for population health analytics, Allscripts for clinical documentation improvement, McKesson's InterQual for utilization management, Premier's PINC AI for supply chain optimization, and Nuance's Dragon Medical for voice recognition. We utilize predictive analytics for patient deterioration monitoring through our Early Warning Score system, implement risk stratification models for readmission prevention, use machine learning algorithms for medication management and drug interaction alerts, deploy automated quality improvement tools for outcome prediction, and maintain evidence-based practice integration through our clinical pathways system. Our AI applications have demonstrated significant improvements in patient outcomes, with sepsis mortality reduced by 15% and diagnostic accuracy improved by 23% in radiology.",
  
  'default_healthcare': "Our healthcare organization has developed comprehensive protocols that include clinical best practices implementation, patient safety initiatives, quality improvement programs, regulatory compliance systems, staff training and competency development, technology integration and optimization, evidence-based care delivery, performance monitoring and outcome tracking, patient satisfaction enhancement, and operational efficiency improvements. We maintain accreditation standards, follow clinical guidelines, implement continuous quality improvement processes, and ensure patient-centered care delivery. Our approach emphasizes both clinical excellence and operational effectiveness while maintaining the highest standards of patient safety and regulatory compliance."
};

// Generate contextual responses for healthcare
allQuestions.forEach(question => {
  switch (question.type) {
    case 'likert':
      // Healthcare tends to have more conservative but consistent scores
      const healthcareWeights = [0.1, 0.15, 0.3, 0.35, 0.1]; // More centered distribution
      const rand = Math.random();
      let score = 1;
      let cumulative = 0;
      for (let i = 0; i < healthcareWeights.length; i++) {
        cumulative += healthcareWeights[i];
        if (rand <= cumulative) {
          score = i + 1;
          break;
        }
      }
      mockResponses[question.id] = score;
      break;
    
    case 'text':
      if (healthcareResponses[question.id]) {
        mockResponses[question.id] = healthcareResponses[question.id];
      } else if (question.prompt.toLowerCase().includes('clinical') || question.prompt.toLowerCase().includes('patient')) {
        mockResponses[question.id] = "Our clinical operations include comprehensive patient care protocols, evidence-based treatment pathways, quality assurance programs, patient safety initiatives, clinical staff development, technology integration, outcome measurement, regulatory compliance, interdisciplinary care coordination, and continuous improvement processes. We maintain Joint Commission standards, implement clinical guidelines, monitor patient satisfaction, ensure regulatory compliance, and focus on patient-centered care delivery with measurable outcomes and safety metrics.";
      } else if (question.prompt.toLowerCase().includes('staff') || question.prompt.toLowerCase().includes('professional')) {
        mockResponses[question.id] = "Our healthcare professional development programs include continuing education requirements, competency assessments, skills training, certification support, mentorship programs, leadership development, interdisciplinary collaboration training, quality improvement education, patient safety training, and career advancement opportunities. We provide ongoing medical education, maintain professional licenses and certifications, support conference attendance, offer internal training programs, and ensure compliance with regulatory requirements for professional development.";
      } else {
        mockResponses[question.id] = healthcareResponses['default_healthcare'];
      }
      break;
    
    case 'numeric':
      if (question.prompt.toLowerCase().includes('percentage')) {
        // Healthcare automation percentages tend to be more conservative
        if (question.tags?.includes('ai-opportunity')) {
          mockResponses[question.id] = Math.floor(Math.random() * 30) + 25; // 25-55%
        } else {
          mockResponses[question.id] = Math.floor(Math.random() * 50) + 15; // 15-65%
        }
      } else {
        mockResponses[question.id] = Math.floor(Math.random() * 100);
      }
      break;
    
    case 'upload':
      if (question.required) {
        mockResponses[question.id] = [
          { name: 'clinical-protocols-2024.pdf', size: 756000, type: 'application/pdf' },
          { name: 'quality-metrics-report.pdf', size: 423000, type: 'application/pdf' },
          { name: 'accreditation-documents.pdf', size: 892000, type: 'application/pdf' }
        ];
      }
      break;
    
    case 'boolean':
      mockResponses[question.id] = Math.random() > 0.2; // 80% true for healthcare compliance
      break;
    
    case 'multiple-choice':
      mockResponses[question.id] = Math.floor(Math.random() * 5) + 1;
      break;
    
    default:
      mockResponses[question.id] = `Healthcare-specific response for ${question.type} question`;
  }
});

console.log(`✅ Generated responses for ${Object.keys(mockResponses).length} questions`);

// Test validation
console.log('\n🔍 HEALTHCARE VALIDATION TESTING...');

const validationResult = validateAssessmentResponses(
  mockResponses, 
  TEST_CONFIG.tier, 
  TEST_CONFIG.organizationType
);

console.log('\n' + '=' .repeat(70));
console.log('🏥 HEALTHCARE ORGANIZATION ASSESSMENT REPORT');
console.log('=' .repeat(70));

console.log('\n📋 VALIDATION & OVERVIEW:');
console.log(`   ✅ Valid Assessment: ${validationResult.valid ? 'YES' : 'NO'}`);
console.log(`   📊 Questions Answered: ${Object.keys(mockResponses).length}/${allQuestions.length}`);
console.log(`   🎯 Completion Rate: ${(Object.keys(mockResponses).length / allQuestions.length * 100).toFixed(1)}%`);
console.log(`   🤖 AI Opportunity Score: ${validationResult.aiOpportunityScore}%`);
console.log(`   ⚠️  Warnings: ${validationResult.warningOptional.length}`);
console.log(`   ❌ Missing Required: ${validationResult.missingRequired.length}`);

// Analyze healthcare-specific sections
const sectionAnalysis = {};

allQuestions.forEach(q => {
  if (!sectionAnalysis[q.section]) {
    sectionAnalysis[q.section] = {
      total: 0,
      answered: 0,
      likertScores: [],
      clinicalRelevance: 0
    };
  }
  
  const section = sectionAnalysis[q.section];
  section.total++;
  
  // Assess clinical relevance
  if (q.prompt.toLowerCase().includes('patient') || 
      q.prompt.toLowerCase().includes('clinical') ||
      q.prompt.toLowerCase().includes('care') ||
      q.prompt.toLowerCase().includes('safety')) {
    section.clinicalRelevance++;
  }
  
  const response = mockResponses[q.id];
  if (response !== undefined && response !== null && response !== '') {
    section.answered++;
    
    if (q.type === 'likert' && typeof response === 'number') {
      section.likertScores.push(response);
    }
  }
});

// Calculate healthcare-specific metrics
Object.keys(sectionAnalysis).forEach(sectionName => {
  const data = sectionAnalysis[sectionName];
  data.completionRate = ((data.answered / data.total) * 100).toFixed(1);
  data.clinicalRelevancePercent = ((data.clinicalRelevance / data.total) * 100).toFixed(1);
  
  if (data.likertScores.length > 0) {
    data.avgScore = (data.likertScores.reduce((a, b) => a + b, 0) / data.likertScores.length).toFixed(1);
    
    // Healthcare-specific performance levels
    const score = parseFloat(data.avgScore);
    if (score >= 4.5) data.performanceLevel = 'Exceptional Clinical Excellence';
    else if (score >= 4.0) data.performanceLevel = 'Strong Clinical Performance';
    else if (score >= 3.5) data.performanceLevel = 'Good Clinical Standards';
    else if (score >= 3.0) data.performanceLevel = 'Adequate Clinical Practice';
    else data.performanceLevel = 'Clinical Improvement Needed';
  }
});

console.log('\n📊 HEALTHCARE SECTION ANALYSIS:');

// Sort by clinical relevance and performance
const sortedHealthcareSections = Object.entries(sectionAnalysis)
  .sort(([,a], [,b]) => {
    // Prioritize by clinical relevance first, then score
    if (a.clinicalRelevance !== b.clinicalRelevance) {
      return b.clinicalRelevance - a.clinicalRelevance;
    }
    return (parseFloat(b.avgScore) || 0) - (parseFloat(a.avgScore) || 0);
  });

sortedHealthcareSections.forEach(([sectionName, data], index) => {
  console.log(`\n${index + 1}. 🏥 ${sectionName}`);
  console.log(`   📊 Completion: ${data.answered}/${data.total} (${data.completionRate}%)`);
  console.log(`   🩺 Clinical Relevance: ${data.clinicalRelevance}/${data.total} questions (${data.clinicalRelevancePercent}%)`);
  
  if (data.avgScore) {
    console.log(`   ⭐ Performance Score: ${data.avgScore}/5.0`);
    console.log(`   📈 Assessment: ${data.performanceLevel}`);
    
    // Healthcare-specific recommendations
    const score = parseFloat(data.avgScore);
    if (score < 3.5 && data.clinicalRelevance > 0) {
      console.log(`   🚨 Priority: High clinical impact area requiring immediate attention`);
    } else if (score < 4.0 && data.clinicalRelevance > 2) {
      console.log(`   ⚠️  Priority: Important clinical area with improvement opportunities`);
    } else if (score >= 4.0) {
      console.log(`   ✅ Status: Strong performance - maintain and optimize`);
    }
  }
});

// Healthcare-specific strategic analysis
console.log('\n' + '=' .repeat(70));
console.log('🎯 HEALTHCARE STRATEGIC ANALYSIS');
console.log('=' .repeat(70));

// Calculate clinical excellence score
const clinicalSections = Object.entries(sectionAnalysis)
  .filter(([name, data]) => data.clinicalRelevance > 0);

const clinicalExcellenceScore = clinicalSections.length > 0 ? 
  (clinicalSections.reduce((sum, [,data]) => sum + (parseFloat(data.avgScore) || 0), 0) / clinicalSections.length).toFixed(1) : 0;

const operationalSections = Object.entries(sectionAnalysis)
  .filter(([name, data]) => data.clinicalRelevance === 0);

const operationalExcellenceScore = operationalSections.length > 0 ?
  (operationalSections.reduce((sum, [,data]) => sum + (parseFloat(data.avgScore) || 0), 0) / operationalSections.length).toFixed(1) : 0;

console.log(`\n🏥 CLINICAL EXCELLENCE SCORE: ${clinicalExcellenceScore}/5.0`);
console.log(`⚙️  OPERATIONAL EXCELLENCE SCORE: ${operationalExcellenceScore}/5.0`);
console.log(`🤖 AI READINESS FOR HEALTHCARE: ${validationResult.aiOpportunityScore}%`);

// Healthcare-specific recommendations
const healthcareRecommendations = [];

if (parseFloat(clinicalExcellenceScore) < 3.5) {
  healthcareRecommendations.push('🚨 CRITICAL: Clinical performance requires immediate improvement across multiple areas');
  healthcareRecommendations.push('🩺 Focus on patient safety protocols, clinical pathway optimization, and staff competency');
} else if (parseFloat(clinicalExcellenceScore) < 4.0) {
  healthcareRecommendations.push('⚠️  Clinical performance shows opportunities for enhancement');
  healthcareRecommendations.push('📊 Implement quality improvement initiatives and evidence-based practice protocols');
} else {
  healthcareRecommendations.push('✅ Clinical performance demonstrates strong healthcare delivery capabilities');
  healthcareRecommendations.push('🌟 Consider clinical excellence recognition and best practice sharing');
}

if (parseFloat(operationalExcellenceScore) < 3.5) {
  healthcareRecommendations.push('🔧 Operational systems require significant improvement for efficiency and effectiveness');
} else if (parseFloat(operationalExcellenceScore) < 4.0) {
  healthcareRecommendations.push('⚙️  Operational systems show good foundation with optimization opportunities');
} else {
  healthcareRecommendations.push('🎯 Operational systems demonstrate strong performance supporting clinical excellence');
}

if (validationResult.aiOpportunityScore >= 60) {
  healthcareRecommendations.push('🤖 HIGH AI POTENTIAL: Develop comprehensive healthcare AI strategy for clinical and operational enhancement');
  healthcareRecommendations.push('📱 Prioritize AI applications in clinical decision support, predictive analytics, and workflow optimization');
} else if (validationResult.aiOpportunityScore >= 30) {
  healthcareRecommendations.push('🔍 MODERATE AI POTENTIAL: Explore targeted AI pilots in high-impact clinical areas');
} else {
  healthcareRecommendations.push('🏗️  BUILD AI FOUNDATION: Focus on data infrastructure and clinical workflow standardization');
}

// Regulatory and compliance focus
healthcareRecommendations.push('📋 Ensure all improvement initiatives maintain regulatory compliance and accreditation standards');
healthcareRecommendations.push('👥 Engage clinical staff in quality improvement planning and implementation');
healthcareRecommendations.push('📈 Establish measurement systems for tracking clinical outcomes and patient satisfaction');

console.log('\n💊 HEALTHCARE-SPECIFIC RECOMMENDATIONS:');
healthcareRecommendations.forEach((rec, index) => {
  console.log(`\n   ${index + 1}. ${rec}`);
});

console.log('\n🏥 NEXT STEPS FOR HEALTHCARE EXCELLENCE:');
const nextSteps = [
  '🩺 Review clinical performance metrics and identify priority improvement areas',
  '👩‍⚕️ Engage clinical leadership in developing targeted improvement plans',
  '📊 Implement measurement systems for tracking progress in clinical and operational metrics',
  '🎯 Develop 60-90 day action plans for lowest-scoring clinical areas',
  '🤝 Consider healthcare benchmarking with similar organizations',
  '📅 Schedule quarterly progress reviews with clinical and administrative leadership'
];

nextSteps.forEach((step, index) => {
  console.log(`   ${index + 1}. ${step}`);
});

console.log('\n' + '=' .repeat(70));
console.log('✅ HEALTHCARE ASSESSMENT COMPLETE');
console.log('=' .repeat(70));

console.log('\n🏥 HEALTHCARE EXECUTIVE SUMMARY:');
console.log(`   • Clinical Excellence Score: ${clinicalExcellenceScore}/5.0`);
console.log(`   • Operational Excellence Score: ${operationalExcellenceScore}/5.0`);
console.log(`   • Assessment Completion: ${(Object.keys(mockResponses).length / allQuestions.length * 100).toFixed(1)}%`);
console.log(`   • Validation Status: ${validationResult.valid ? 'PASSED' : 'FAILED'}`);
console.log(`   • AI Opportunity Score: ${validationResult.aiOpportunityScore}%`);
console.log(`   • Clinical Focus Areas: ${clinicalSections.length}`);
console.log(`   • Strategic Recommendations: ${healthcareRecommendations.length}`);

console.log('\n🚀 This healthcare assessment provides targeted insights for clinical excellence');
console.log('   and operational improvement in your healthcare organization!\n');
