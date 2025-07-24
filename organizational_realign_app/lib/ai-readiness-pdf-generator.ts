import jsPDF from 'jspdf';
import { runOpenAI } from './openai';
import { alignmentNarrativeHelper } from './alignmentNarrative';
import { StudentSuccessPlaybookGenerator, StudentSuccessPlaybook } from './studentSuccessPlaybookGenerator';
import type { AIReadinessResults, TeamMember } from './aiReadinessEngine';

export interface AIReadinessReportData {
  results: AIReadinessResults;
  institutionInfo: {
    name: string;
    type?: string;
    size?: string;
    location?: string;
  };
  tier: 'basic' | 'custom';
  submissionDate: string;
  assessmentId?: string; // For linking to AI readiness database record
  uploadedDocuments?: any[]; // Documents uploaded for enhanced analysis
}

interface AIGeneratedContent {
  executiveSummary: string;
  detailedAnalysis: string;
  strategicRecommendations: string;
  implementationPlan: string;
  policyRecommendations?: string;
  teamAnalysis?: string;
  openEndedInsights?: string;
  alignmentAnalysis?: string;
  studentSuccessPlaybook?: StudentSuccessPlaybook;
}

export async function generateAIReadinessPDFReport(data: AIReadinessReportData): Promise<jsPDF> {
  console.log('🤖 Generating AI Readiness PDF report with Student Success Playbook...');
  
  try {
    const pdf = new jsPDF();
    const { results, institutionInfo, tier } = data;
    
    // Generate AI-powered content using OpenAI with error handling
    let aiContent: AIGeneratedContent;
    try {
      aiContent = await generateAIContent(results, institutionInfo, tier, data.uploadedDocuments);
    } catch (aiError) {
      console.warn('⚠️  OpenAI content generation failed, using fallback content:', aiError);
      // Provide fallback content
      aiContent = {
        executiveSummary: `AI Readiness Assessment completed for ${institutionInfo.name}. Overall readiness score: ${results.scores.overall}/5.0. Assessment included ${results.recommendations.length} recommendations across multiple domains.`,
        detailedAnalysis: 'Detailed analysis based on assessment responses and uploaded documents.',
        strategicRecommendations: results.recommendations.map(r => r.title).join('\n'),
        implementationPlan: 'Implementation plan based on assessment findings.',
        policyRecommendations: results.policyRecommendations?.map(p => p.title).join('\n') || 'Policy recommendations included.',
        alignmentAnalysis: 'Strategic alignment analysis based on institutional priorities.'
      };
    }
    
    // Build the PDF
    await buildReportStructure(pdf, data, aiContent);
    
    return pdf;
  } catch (error) {
    console.error('❌ Error in PDF generation:', error);
    throw error;
  }
}

async function generateAIContent(
  results: AIReadinessResults, 
  institutionInfo: any, 
  tier: string,
  uploadedDocuments?: any[]
): Promise<AIGeneratedContent> {
  console.log('📝 Generating AI content using OpenAI...');
  
  const contextData = {
    overallScore: results.scores.overall,
    domainScores: results.scores.domains,
    maturityLevel: results.maturityProfile.overall.name,
    recommendations: results.recommendations,
    institutionName: institutionInfo.name,
    tier: tier,
    isTeamAssessment: results.isTeamAssessment,
    teamSize: results.teamMembers?.length || 0
  };

  // Generate Executive Summary with Higher Education Focus
  const executiveSummary = await runOpenAI(`
    Generate a comprehensive executive summary for an AI Readiness Assessment report for ${institutionInfo.name}, a higher education institution.
    
    This assessment was created by Jeremy Estrella, a former faculty member and seasoned administrator, using patent-pending algorithms specifically designed for higher education.
    
    Key Results:
    - Overall AI Readiness Score: ${results.scores.overall}/5.0 (AIRIX™ Algorithm)
    - Current Maturity Level: ${results.maturityProfile.overall.name}
    - Assessment Type: ${results.isTeamAssessment ? 'Cross-Functional Team Assessment' : 'Individual Assessment'}
    ${results.isTeamAssessment ? `- Team Size: ${results.teamMembers?.length} members across faculty, IT, and administration` : ''}
    
    Domain Scores (Patent-Pending Analysis):
    ${Object.entries(results.scores.domains || {}).map(([domain, data]: [string, any]) => 
      `- ${domain}: ${data?.score || 0}/5.0 (${data?.percentage || 0}%)`
    ).join('\n') || 'No domain scores available'}
    
    Priority Recommendations (Faculty-Centered):
    ${results.recommendations.slice(0, 3).map(rec => `- ${rec.title}`).join('\n')}
    
    Write a 300-word executive summary that emphasizes:
    1. Learning outcomes enhancement through strategic AI implementation
    2. Academic integrity preservation while enabling beneficial AI use
    3. Faculty autonomy and shared governance considerations
    4. Mission alignment with institutional educational excellence
    5. Practical bridge between pedagogical values and AI innovation
    
    Address this to higher education leadership (presidents, provosts, deans, CIOs) who need to understand both the strategic opportunity and the preservation of educational values.
    
    Use language that demonstrates understanding of higher education culture, shared governance, and the unique challenges of implementing AI in academic environments.
  `, {
    model: 'gpt-4o',
    maxTokens: 400,
    temperature: 0.7
  });

  // Generate Detailed Analysis with Higher Education Focus
  const detailedAnalysis = await runOpenAI(`
    Generate a detailed analysis section for ${institutionInfo.name}'s AI Readiness Assessment using our patent-pending algorithm suite.
    
    Institution: ${institutionInfo.name} (Higher Education)
    Overall AIRIX™ Score: ${results.scores.overall}/5.0
    Maturity Level: ${results.maturityProfile.overall.name}
    Assessment by: NorthPath Strategies (Faculty-Administrator Bridge Expertise)
    
    Domain Analysis (AIRS™, AICS™, AIMS™ Algorithms):
    ${Object.entries(results.scores.domains).map(([domain, data]: [string, any]) => 
      `${domain}: ${data.score}/5.0 (${data.maturityLevel} level)`
    ).join('\n')}
    
    ${results.scores.teamAnalysis ? `
    Team Analysis (Cross-Functional Higher Ed Team):
    - Consensus Level: ${results.scores.teamAnalysis.consensus}%
    - Faculty-Admin Alignment: ${results.scores.teamAnalysis.divergence}% divergence
    - Department Representation: ${Object.keys(results.scores.teamAnalysis.departmentBreakdown || {}).length} areas
    ` : ''}
    
    Structure your analysis around these higher education AI implementation priorities:
    
    1. LEARNING OUTCOMES & ACADEMIC INTEGRITY
       - How AI can enhance student learning while preserving critical thinking
       - Faculty development needs for pedagogical AI integration
       - Assessment innovation that maintains academic rigor
    
    2. FACULTY AI INTEGRATION & AUTONOMY
       - Current faculty attitudes and readiness for AI tools
       - Pedagogical AI applications that respect teaching autonomy
       - Research acceleration opportunities through AI
    
    3. INSTITUTIONAL READINESS & GOVERNANCE
       - Shared governance structures for AI decision-making
       - Technology infrastructure supporting educational AI
       - Change management across faculty, staff, and students
    
    4. MISSION ALIGNMENT & STRATEGIC INTEGRATION
       - How AI advances institutional mission and strategic goals
       - Student success outcome improvements through AI
       - Resource allocation for sustainable AI adoption
    
    Write for higher education professionals who understand both educational theory and institutional operations. Address the unique challenges of implementing AI in academic environments while preserving educational excellence.
    
    Length: 600-800 words with specific, higher education contextual insights.
  `, {
    model: 'gpt-4o',
    maxTokens: 900,
    temperature: 0.6
  });

  // Generate Strategic Recommendations with Policy Development Focus
  const strategicRecommendations = await runOpenAI(`
    Generate comprehensive strategic recommendations for ${institutionInfo.name} based on their AI readiness assessment, including automated AI policy development.
    
    Current State (Patent-Pending Analysis):
    - Overall AIRIX™ Score: ${results.scores.overall}/5.0
    - Maturity Level: ${results.maturityProfile.overall.name}
    - Assessment Tier: ${tier} (${tier === 'custom' ? 'Comprehensive with Policy Development' : 'Advanced Assessment'})
    
    Assessment Recommendations (Faculty-Centered):
    ${results.recommendations.map(rec => 
      `${rec.domain} (${rec.priority} priority): ${rec.title} - ${rec.description}`
    ).join('\n\n')}
    
    Structure your recommendations around these key areas:
    
    1. FACULTY AI INTEGRATION RECOMMENDATIONS
       - Pedagogical AI tools for course design and assessment
       - Faculty development programs for AI literacy
       - Research acceleration through AI applications
       - Teaching effectiveness enhancement strategies
    
    2. AUTOMATED AI POLICY DEVELOPMENT
       ${tier === 'custom' ? `
       - Faculty AI Teaching Policies (classroom use, grading, research)
       - Student AI Integrity Policies (academic honesty, acceptable use)
       - Employee AI Integration Policies (administrative use, data protection)
       - Institutional AI Governance Policies (decision-making, vendor management)
       ` : `
       - Core AI use guidelines for faculty and students
       - Basic governance framework recommendations
       - Academic integrity standards for AI use
       `}
    
    3. STUDENT SUCCESS & LEARNING OUTCOMES
       - AI-powered student support and retention strategies
       - Learning analytics for personalized education
       - Academic integrity education and digital citizenship
       - AI tools that enhance critical thinking skills
    
    4. IMPLEMENTATION ROADMAP
       - Phase 1 (Months 1-6): Foundation building and faculty development
       - Phase 2 (Months 7-12): Pilot implementations and policy rollout
       - Phase 3 (Months 13-18): Scaling and institutional integration
       - Timeline considerations for academic calendar and tenure processes
    
    Write strategic recommendations that demonstrate deep understanding of higher education culture, shared governance, and the need to balance innovation with educational values.
    
    Length: 700-800 words with specific, implementable guidance for higher education leaders.
  `, {
    model: 'gpt-4o',
    maxTokens: 800,
    temperature: 0.6
  });

  // Generate Implementation Plan
  const implementationPlan = await runOpenAI(`
    Create a detailed implementation plan for AI readiness improvement at ${institutionInfo.name}.
    
    Current Maturity: ${results.maturityProfile.overall.name}
    Target: Move to next maturity level within 18 months
    
    Priority Areas:
    ${results.recommendations.filter(rec => rec.priority === 'high').map(rec => 
      `- ${rec.title} (${rec.domain})`
    ).join('\n')}
    
    Generate a practical implementation plan that includes:
    1. Phase 1 (Months 1-6): Quick wins and foundation building
    2. Phase 2 (Months 7-12): Core infrastructure and capability development
    3. Phase 3 (Months 13-18): Advanced integration and optimization
    4. Key milestones and success metrics
    5. Resource requirements (budget, personnel, technology)
    6. Risk mitigation strategies
    7. Stakeholder engagement approach
    
    Focus on realistic, achievable steps appropriate for higher education institutions.
    Write 500-600 words with specific timelines and deliverables.
  `, {
    model: 'gpt-4o',
    maxTokens: 700,
    temperature: 0.6
  });

  const aiContent: AIGeneratedContent = {
    executiveSummary,
    detailedAnalysis,
    strategicRecommendations,
    implementationPlan
  };

  // Generate team analysis if applicable
  if (results.isTeamAssessment && results.teamMembers && results.scores.teamAnalysis) {
    aiContent.teamAnalysis = await runOpenAI(`
      Analyze the team dynamics and collaboration aspects of this AI readiness assessment.
      
      Team Composition:
      - Total Members: ${results.teamMembers.length}
      - Departments: ${Object.keys(results.scores.teamAnalysis.departmentBreakdown).join(', ')}
      - Consensus Level: ${results.scores.teamAnalysis.consensus}%
      - Divergence: ${results.scores.teamAnalysis.divergence}%
      
      Provide insights on:
      1. Team alignment and areas of consensus
      2. Significant divergences and their implications
      3. Department-specific perspectives and needs
      4. Recommendations for building team cohesion around AI initiatives
      5. Strategies for addressing disagreements constructively
      
      Write 300-400 words with actionable team development recommendations.
    `, {
      model: 'gpt-4o',
      maxTokens: 500,
      temperature: 0.7
    });
  }

  // Generate open-ended insights if available
  if (results.openEndedResponses && Object.keys(results.openEndedResponses).length > 0) {
    const openEndedSummary = Object.entries(results.openEndedResponses)
      .map(([questionId, responses]) => `${questionId}: ${responses.join('; ')}`)
      .join('\n');

    aiContent.openEndedInsights = await runOpenAI(`
      Analyze these open-ended responses from the AI readiness assessment and extract key insights:
      
      ${openEndedSummary}
      
      Provide analysis that:
      1. Identifies common themes and patterns
      2. Highlights unique perspectives or concerns
      3. Extracts actionable insights not captured in multiple choice responses
      4. Identifies cultural and contextual factors
      5. Provides recommendations based on qualitative feedback
      
      Write 300-400 words synthesizing the qualitative insights.
    `, {
      model: 'gpt-4o',
      maxTokens: 500,
      temperature: 0.7
    });
  }

  // Generate alignment analysis if alignment domain exists
  if (results.scores.domains.alignment) {
    const alignmentInsights = alignmentNarrativeHelper.generateAlignmentNarrative(
      results.scores, 
      Object.values(results.teamMembers?.[0]?.responses || {}), // Use first member's responses as baseline
      institutionInfo.name
    );
    
    aiContent.alignmentAnalysis = await runOpenAI(`
      Generate a comprehensive strategic alignment analysis for ${institutionInfo.name} based on their AI readiness assessment.
      
      Alignment Score: ${results.scores.domains.alignment.percentage}% (${results.scores.domains.alignment.maturityLevel})
      
      Strategic Gaps Identified:
      ${alignmentInsights.strategicGaps.map(gap => `• ${gap}`).join('\n')}
      
      Pedagogical Alignment Assessment:
      ${alignmentInsights.pedagogicalAlignment}
      
      Student Success Connection:
      ${alignmentInsights.studentSuccessConnection}
      
      Ethical Framework Status:
      ${alignmentInsights.ethicalConsiderations}
      
      Recommended Next Steps:
      ${alignmentInsights.nextSteps.map(step => `• ${step}`).join('\n')}
      
      Create a strategic alignment analysis that:
      1. Evaluates how well AI initiatives support institutional mission and values
      2. Assesses alignment between AI adoption and educational goals
      3. Identifies specific gaps in strategic integration
      4. Provides actionable recommendations for improving alignment
      5. Addresses change management and faculty engagement needs
      6. Includes measures for ongoing alignment assessment
      
      Focus on higher education context and institutional strategic planning.
      Write 500-600 words with specific, actionable insights.
    `, {
      model: 'gpt-4o',
      maxTokens: 700,
      temperature: 0.6
    });
  }

  // Generate Policy Recommendations if needed
  if (results.policyRecommendations && results.policyRecommendations.length > 0) {
    aiContent.policyRecommendations = await runOpenAI(`
      Generate comprehensive policy development recommendations for ${institutionInfo.name} based on their AI readiness assessment.
      
      Assessment Results Summary:
      - Overall AI Readiness Score: ${results.scores.overall}/5 (${results.maturityProfile.overall.name})
      - Governance Score: ${results.scores.domains.governance?.percentage || 'N/A'}%
      - Pedagogy Score: ${results.scores.domains.pedagogy?.percentage || 'N/A'}%
      
      Identified Policy Needs:
      ${results.policyRecommendations.map(policy => `
      - ${policy.title} (Priority: ${policy.priority})
        Stakeholders: ${policy.stakeholders.join(', ')}
        Timeline: ${policy.timeline}
      `).join('\n')}
      
      Create a comprehensive policy development analysis that:
      1. Explains why each policy is critical for this institution
      2. Provides implementation priorities and sequencing
      3. Addresses stakeholder engagement strategies
      4. Discusses change management considerations
      5. Outlines success metrics and monitoring approaches
      6. Identifies potential challenges and mitigation strategies
      7. Connects policy development to institutional mission and values
      
      Focus on higher education governance, faculty concerns, student success, and operational efficiency.
      Provide practical, actionable guidance for policy implementation.
      Write 600-700 words with specific recommendations.
    `, {
      model: 'gpt-4o',
      maxTokens: 800,
      temperature: 0.6
    });
  }

  // Generate Student Success Implementation Playbook
  if (tier === 'custom') {
    console.log('📚 Generating Student Success Implementation Playbook...');
    const playbookGenerator = new StudentSuccessPlaybookGenerator();
    
    try {
      aiContent.studentSuccessPlaybook = await playbookGenerator.generatePlaybook(
        results,
        institutionInfo,
        uploadedDocuments
      );
    } catch (error) {
      console.error('Error generating playbook:', error);
      // Continue without playbook if generation fails
    }
  }

  return aiContent;
}

async function buildReportStructure(
  pdf: jsPDF, 
  data: AIReadinessReportData, 
  aiContent: AIGeneratedContent
): Promise<void> {
  let currentPage = 1;
  
  // Title Page
  addTitlePage(pdf, data);
  
  // Executive Summary
  pdf.addPage();
  currentPage++;
  addSection(pdf, 'Executive Summary', aiContent.executiveSummary, currentPage);
  
  // Assessment Overview
  pdf.addPage();
  currentPage++;
  addAssessmentOverview(pdf, data, currentPage);
  
  // Detailed Analysis
  pdf.addPage();
  currentPage++;
  addSection(pdf, 'Detailed Analysis', aiContent.detailedAnalysis, currentPage);
  
  // Domain Breakdown
  pdf.addPage();
  currentPage++;
  addDomainBreakdown(pdf, data.results, currentPage);
  
  // Team Analysis (if applicable)
  if (data.results.isTeamAssessment && aiContent.teamAnalysis) {
    pdf.addPage();
    currentPage++;
    addSection(pdf, 'Team Dynamics Analysis', aiContent.teamAnalysis, currentPage);
  }
  
  // Open-ended Insights (if available)
  if (aiContent.openEndedInsights) {
    pdf.addPage();
    currentPage++;
    addSection(pdf, 'Qualitative Insights', aiContent.openEndedInsights, currentPage);
  }
  
  // Strategic Alignment Analysis (if available)
  if (aiContent.alignmentAnalysis) {
    pdf.addPage();
    currentPage++;
    addSection(pdf, 'Strategic Alignment Analysis', aiContent.alignmentAnalysis, currentPage);
    
    // Add alignment visual and opportunity map
    pdf.addPage();
    currentPage++;
    addAlignmentAppendix(pdf, data.results, currentPage);
  }

  // Policy Recommendations (if available)
  if (aiContent.policyRecommendations) {
    pdf.addPage();
    currentPage++;
    addSection(pdf, 'AI Policy Development Recommendations', aiContent.policyRecommendations, currentPage);
    
    // Add detailed policy frameworks
    if (data.results.policyRecommendations && data.results.policyRecommendations.length > 0) {
      pdf.addPage();
      currentPage++;
      addPolicyFrameworks(pdf, data.results.policyRecommendations, currentPage);
    }
  }

  // Strategic Recommendations
  pdf.addPage();
  currentPage++;
  addSection(pdf, 'Strategic Recommendations', aiContent.strategicRecommendations, currentPage);
  
  // Implementation Plan
  pdf.addPage();
  currentPage++;
  addSection(pdf, 'Implementation Roadmap', aiContent.implementationPlan, currentPage);
  
  // Student Success Implementation Playbook (Custom tier only)
  if (aiContent.studentSuccessPlaybook) {
    pdf.addPage();
    currentPage++;
    addStudentSuccessPlaybook(pdf, aiContent.studentSuccessPlaybook, currentPage);
  }
  
  // Appendix
  pdf.addPage();
  currentPage++;
  addAppendix(pdf, data, currentPage);
}

function addTitlePage(pdf: jsPDF, data: AIReadinessReportData): void {
  const { results, institutionInfo, tier } = data;
  const pageWidth = pdf.internal.pageSize.width;
  
  // Background header
  pdf.setFillColor(25, 43, 81); // NorthPath blue
  pdf.rect(0, 0, pageWidth, 80, 'F');
  
  // NorthPath Strategies branding
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('NorthPath Strategies', pageWidth / 2, 30, { align: 'center' });
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Enhanced AI Readiness Assessment for Higher Education', pageWidth / 2, 50, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.text('Patent-Pending Algorithm Suite: AIRIX™ • AIRS™ • AICS™ • AIMS™', pageWidth / 2, 65, { align: 'center' });
  
  // Institution information
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.text(institutionInfo.name, pageWidth / 2, 110, { align: 'center' });
  
  // Assessment results
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(14);
  pdf.text(`Overall AI Readiness Score: ${results.scores.overall.toFixed(1)}/5.0`, pageWidth / 2, 135, { align: 'center' });
  pdf.text(`Maturity Level: ${results.maturityProfile.overall.name}`, pageWidth / 2, 152, { align: 'center' });
  
  // Tier-specific messaging
  const tierMessage = tier === 'custom' 
    ? 'Comprehensive Assessment with AI Policy Development'
    : 'Advanced Assessment with Strategic Recommendations';
  pdf.setFontSize(12);
  pdf.text(tierMessage, pageWidth / 2, 170, { align: 'center' });
  
  if (results.isTeamAssessment) {
    pdf.text(`Cross-Functional Team Assessment: ${results.teamMembers?.length} participants`, pageWidth / 2, 185, { align: 'center' });
  }
  
  // Higher education specialization
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(11);
  pdf.text('Faculty-Centered • Learning Outcome Focused • Academic Integrity Preserving', pageWidth / 2, 210, { align: 'center' });
  
  // Generation details
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text(`Generated: ${new Date(data.submissionDate).toLocaleDateString()}`, pageWidth / 2, 235, { align: 'center' });
  pdf.text(`Assessment ID: ${data.assessmentId || 'AI-' + Date.now()}`, pageWidth / 2, 250, { align: 'center' });
  
  // Bottom branding
  pdf.setFontSize(9);
  pdf.text('Created by Jeremy Estrella - Former Faculty Member & Seasoned Administrator', pageWidth / 2, 270, { align: 'center' });
  pdf.text('northpathstrategies.org/ai-alignment', pageWidth / 2, 280, { align: 'center' });
}

function addSection(pdf: jsPDF, title: string, content: string, pageNumber: number): void {
  addHeader(pdf, title, pageNumber);
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const splitContent = pdf.splitTextToSize(content, 170);
  pdf.text(splitContent, 20, 40);
}

function addAssessmentOverview(pdf: jsPDF, data: AIReadinessReportData, pageNumber: number): void {
  addHeader(pdf, 'Assessment Overview', pageNumber);
  
  const { results } = data;
  let yPos = 40;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Assessment Summary', 20, yPos);
  yPos += 15;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const summaryLines = [
    `Institution: ${data.institutionInfo.name}`,
    `Assessment Date: ${new Date(data.submissionDate).toLocaleDateString()}`,
    `Overall Score: ${results.scores.overall}/5.0`,
    `Maturity Level: ${results.maturityProfile.overall.name}`,
    `Total Questions: ${Object.keys(results.scores.domains || {}).reduce((sum, domain) => sum + (results.scores.domains[domain]?.questions || 0), 0)}`,
    results.isTeamAssessment ? `Team Size: ${results.teamMembers?.length} members` : 'Individual Assessment'
  ];
  
  summaryLines.forEach(line => {
    pdf.text(line, 20, yPos);
    yPos += 10;
  });
  
  yPos += 10;
  pdf.setFont('helvetica', 'bold');
  pdf.text('Domain Scores', 20, yPos);
  yPos += 15;
  
  pdf.setFont('helvetica', 'normal');
  Object.entries(results.scores.domains || {}).forEach(([domainId, domainData]: [string, any]) => {
    pdf.text(`${domainId.replace('_', ' ').toUpperCase()}: ${domainData?.score || 0}/5.0 (${domainData?.percentage || 0}%)`, 20, yPos);
    yPos += 10;
  });
}

function addDomainBreakdown(pdf: jsPDF, results: AIReadinessResults, pageNumber: number): void {
  addHeader(pdf, 'Domain Analysis', pageNumber);
  
  let yPos = 40;
  
  Object.entries(results.scores.domains || {}).forEach(([domainId, domainData]: [string, any]) => {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(domainId.replace('_', ' ').toUpperCase(), 20, yPos);
    yPos += 15;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Score: ${domainData?.score || 0}/5.0 (${domainData?.percentage || 0}%)`, 20, yPos);
    pdf.text(`Maturity Level: ${domainData?.maturityLevel || 'Unknown'}`, 20, yPos + 10);
    pdf.text(`Questions Assessed: ${domainData?.questions || 0}`, 20, yPos + 20);
    
    yPos += 40;
    
    if (yPos > 250) {
      pdf.addPage();
      addHeader(pdf, 'Domain Analysis (continued)', ++pageNumber);
      yPos = 40;
    }
  });
}

function addAppendix(pdf: jsPDF, data: AIReadinessReportData, pageNumber: number): void {
  addHeader(pdf, 'Appendix', pageNumber);
  
  let yPos = 40;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Methodology', 20, yPos);
  yPos += 15;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const methodology = [
    '• This assessment evaluates AI readiness across six key domains',
    '• Each domain is weighted based on its importance to overall AI success',
    '• Maturity levels range from Initial/Ad Hoc (1) to Optimized (5)',
    '• Recommendations are prioritized based on impact and feasibility',
    '• Analysis is powered by GPT-4o for contextual insights'
  ];
  
  methodology.forEach(line => {
    pdf.text(line, 20, yPos);
    yPos += 10;
  });
  
  yPos += 20;
  pdf.setFont('helvetica', 'bold');
  pdf.text('Contact Information', 20, yPos);
  yPos += 15;
  
  pdf.setFont('helvetica', 'normal');
  pdf.text('For questions about this assessment or implementation support:', 20, yPos);
  pdf.text('NorthPath Strategies', 20, yPos + 15);
  pdf.text('Email: info@northpathstrategies.com', 20, yPos + 25);
}

function addHeader(pdf: jsPDF, title: string, pageNumber: number): void {
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text(title, 20, 25);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Page ${pageNumber}`, 180, 25);
  
  // Add a line under the header
  pdf.setLineWidth(0.5);
  pdf.line(20, 30, 190, 30);
}

function addAlignmentAppendix(pdf: jsPDF, results: AIReadinessResults, pageNumber: number): void {
  addHeader(pdf, 'Strategic Alignment Resources', pageNumber);
  
  let yPos = 50;
  
  // Generate alignment insights and visuals
  const alignmentInsights = alignmentNarrativeHelper.generateAlignmentNarrative(
    results.scores, 
    Object.values(results.teamMembers?.[0]?.responses || {}),
    results.institutionName
  );
  
  // Add alignment visual
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Alignment Dashboard', 20, yPos);
  yPos += 15;
  
  const alignmentVisual = alignmentNarrativeHelper.generateAlignmentVisual(results.scores);
  
  pdf.setFontSize(10);
  pdf.setFont('courier', 'normal');
  const visualLines = alignmentVisual.split('\n');
  visualLines.forEach(line => {
    if (yPos > 250) {
      pdf.addPage();
      yPos = 30;
    }
    pdf.text(line, 20, yPos);
    yPos += 8;
  });
  
  yPos += 10;
  
  // Add opportunity map
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('AI Opportunity Map (For Consulting Sessions)', 20, yPos);
  yPos += 15;
  
  const opportunityMap = alignmentNarrativeHelper.generateOpportunityMap(results.scores, alignmentInsights);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  const mapLines = opportunityMap.split('\n');
  mapLines.forEach(line => {
    if (yPos > 270) {
      pdf.addPage();
      addHeader(pdf, 'Strategic Alignment Resources (continued)', ++pageNumber);
      yPos = 50;
    }
    if (line.trim().length > 0) {
      // Handle different line types for formatting
      if (line.includes('OPPORTUNITY MAP') || line.includes('ALIGNMENT LEVEL:')) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
      } else if (line.startsWith('•') || line.match(/^\d+\./)) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
      } else if (line.includes(':') && line.length < 50) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
      } else {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
      }
      
      // Wrap long lines
      const maxWidth = 170;
      const wrappedLines = pdf.splitTextToSize(line, maxWidth);
      wrappedLines.forEach((wrappedLine: string) => {
        pdf.text(wrappedLine, 20, yPos);
        yPos += 8;
      });
    } else {
      yPos += 4; // Add spacing for empty lines
    }
  });
}

function addPolicyFrameworks(pdf: jsPDF, policyRecommendations: any[], pageNumber: number): void {
  addHeader(pdf, 'Policy Development Frameworks', pageNumber);
  
  let yPos = 50;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Recommended Policy Development Framework', 20, yPos);
  yPos += 15;
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Based on your assessment results, the following policy frameworks are recommended:', 20, yPos);
  yPos += 15;
  
  policyRecommendations.forEach((policy, index) => {
    if (yPos > 250) {
      pdf.addPage();
      addHeader(pdf, 'Policy Development Frameworks (continued)', ++pageNumber);
      yPos = 50;
    }
    
    // Policy title
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}. ${policy.title}`, 20, yPos);
    yPos += 10;
    
    // Priority and timeline
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'italic');
    pdf.text(`Priority: ${policy.priority.toUpperCase()} | Timeline: ${policy.timeline}`, 25, yPos);
    yPos += 8;
    
    // Description
    pdf.setFont('helvetica', 'normal');
    const descLines = pdf.splitTextToSize(policy.description, 160);
    descLines.forEach((line: string) => {
      if (yPos > 270) {
        pdf.addPage();
        addHeader(pdf, 'Policy Development Frameworks (continued)', ++pageNumber);
        yPos = 50;
      }
      pdf.text(line, 25, yPos);
      yPos += 6;
    });
    yPos += 5;
    
    // Key stakeholders
    pdf.setFont('helvetica', 'bold');
    pdf.text('Key Stakeholders:', 25, yPos);
    yPos += 6;
    pdf.setFont('helvetica', 'normal');
    pdf.text(policy.stakeholders.join(', '), 25, yPos);
    yPos += 10;
    
    // Implementation steps (first 3)
    pdf.setFont('helvetica', 'bold');
    pdf.text('Key Implementation Steps:', 25, yPos);
    yPos += 6;
    pdf.setFont('helvetica', 'normal');
    
    const stepsToShow = policy.implementationSteps.slice(0, 3);
    stepsToShow.forEach((step: string, stepIndex: number) => {
      if (yPos > 270) {
        pdf.addPage();
        addHeader(pdf, 'Policy Development Frameworks (continued)', ++pageNumber);
        yPos = 50;
      }
      const stepLines = pdf.splitTextToSize(`${stepIndex + 1}. ${step}`, 150);
      stepLines.forEach((line: string) => {
        pdf.text(line, 30, yPos);
        yPos += 6;
      });
    });
    
    if (policy.implementationSteps.length > 3) {
      pdf.setFont('helvetica', 'italic');
      pdf.text(`... and ${policy.implementationSteps.length - 3} additional steps`, 30, yPos);
      yPos += 6;
    }
    
    yPos += 10;
  });
  
  // Add note about full policy templates
  yPos += 10;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Need Complete Policy Templates?', 20, yPos);
  yPos += 8;
  pdf.setFont('helvetica', 'normal');
  pdf.text('Upgrade to our AI Transformation Intensive for full policy templates, implementation', 20, yPos);
  yPos += 6;
  pdf.text('guides, and personalized consulting support.', 20, yPos);
}

function addStudentSuccessPlaybook(pdf: jsPDF, playbook: StudentSuccessPlaybook, pageNumber: number): void {
  addHeader(pdf, 'Student Success Implementation Playbook', pageNumber);
  
  let yPos = 40;
  
  // Executive Summary Section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Executive Summary', 20, yPos);
  yPos += 10;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const summaryItems = [
    `AI Readiness Score: ${playbook.executiveSummary.readinessScore}/100`,
    `Institution Type: ${playbook.institutionProfile.type}`,
    `Priority Areas: ${playbook.institutionProfile.priorityAreas.slice(0, 3).join(', ')}`,
    `Implementation Timeline: ${playbook.timeline.overview}`
  ];
  
  summaryItems.forEach(item => {
    const lines = pdf.splitTextToSize(`• ${item}`, 170);
    lines.forEach((line: string) => {
      pdf.text(line, 25, yPos);
      yPos += 6;
    });
  });
  
  yPos += 10;
  
  // Student Success Framework
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Student Success Framework', 20, yPos);
  yPos += 10;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Core Principles:', 20, yPos);
  yPos += 8;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  playbook.studentSuccessFramework.coreprinciples.slice(0, 3).forEach(principle => {
    const lines = pdf.splitTextToSize(`• ${principle.principle}: ${principle.description}`, 170);
    lines.forEach((line: string) => {
      pdf.text(line, 25, yPos);
      yPos += 6;
    });
    yPos += 3;
  });
  
  // Check if we need a new page
  if (yPos > 250) {
    pdf.addPage();
    pageNumber++;
    addHeader(pdf, 'Student Success Implementation Playbook (cont.)', pageNumber);
    yPos = 40;
  }
  
  // Implementation Phases
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Implementation Phases', 20, yPos);
  yPos += 10;
  
  playbook.implementationPhases.slice(0, 3).forEach(phase => {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Phase ${phase.phase}: ${phase.name}`, 20, yPos);
    yPos += 8;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const phaseDescription = pdf.splitTextToSize(`Duration: ${phase.duration} | ${phase.description}`, 170);
    phaseDescription.forEach((line: string) => {
      pdf.text(line, 25, yPos);
      yPos += 6;
    });
    
    // Student Success Goals
    if (phase.studentSuccessGoals.length > 0) {
      pdf.setFont('helvetica', 'bold');
      pdf.text('Student Success Goals:', 25, yPos);
      yPos += 6;
      pdf.setFont('helvetica', 'normal');
      
      phase.studentSuccessGoals.slice(0, 2).forEach(goal => {
        const goalLines = pdf.splitTextToSize(`• ${goal}`, 165);
        goalLines.forEach((line: string) => {
          pdf.text(line, 30, yPos);
          yPos += 6;
        });
      });
    }
    
    yPos += 5;
    
    // Check if we need a new page
    if (yPos > 250) {
      pdf.addPage();
      pageNumber++;
      addHeader(pdf, 'Student Success Implementation Playbook (cont.)', pageNumber);
      yPos = 40;
    }
  });
  
  // Expected Outcomes
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Expected Student Success Outcomes', 20, yPos);
  yPos += 10;
  
  playbook.executiveSummary.expectedOutcomes.forEach(outcome => {
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${outcome.metric}:`, 20, yPos);
    yPos += 6;
    
    pdf.setFont('helvetica', 'normal');
    const outcomeText = `Current: ${outcome.currentBaseline} → Target: ${outcome.projectedImprovement} (${outcome.timeline})`;
    const outcomeLines = pdf.splitTextToSize(outcomeText, 170);
    outcomeLines.forEach((line: string) => {
      pdf.text(line, 25, yPos);
      yPos += 6;
    });
    yPos += 3;
  });
  
  // Key Success Factors
  if (yPos > 220) {
    pdf.addPage();
    pageNumber++;
    addHeader(pdf, 'Student Success Implementation Playbook (cont.)', pageNumber);
    yPos = 40;
  }
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Critical Success Factors', 20, yPos);
  yPos += 10;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  playbook.executiveSummary.criticalSuccessFactors.forEach(factor => {
    const factorLines = pdf.splitTextToSize(`• ${factor}`, 170);
    factorLines.forEach((line: string) => {
      pdf.text(line, 25, yPos);
      yPos += 6;
    });
  });
  
  // Investment Summary
  yPos += 10;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Investment Summary', 20, yPos);
  yPos += 10;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const investmentSummary = playbook.executiveSummary.investmentSummary;
  const investmentLines = [
    `Total Estimated Investment: ${investmentSummary.totalEstimatedCost}`,
    `Expected ROI: ${investmentSummary.expectedROI}`,
    `Primary Funding Sources: ${investmentSummary.fundingSources.join(', ')}`
  ];
  
  investmentLines.forEach(line => {
    const lines = pdf.splitTextToSize(`• ${line}`, 170);
    lines.forEach((textLine: string) => {
      pdf.text(textLine, 25, yPos);
      yPos += 6;
    });
  });
  
  // Footer note
  yPos += 20;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('This playbook is generated based on your institution\'s specific AI readiness assessment', 20, yPos);
  yPos += 6;
  pdf.text('and uploaded documents. For detailed implementation support, consider our', 20, yPos);
  yPos += 6;
  pdf.text('AI Transformation Intensive program with dedicated consulting and training.', 20, yPos);
}
