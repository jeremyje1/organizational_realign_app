'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface TestResult {
  tier: string;
  industry: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
  assessmentId?: string;
  timestamp?: string;
}

interface TierTestConfig {
  tier: string;
  displayName: string;
  questionCount: number;
  algorithms: string[];
  features: string[];
}

interface IndustryTestConfig {
  industry: string;
  displayName: string;
  contextualQuestions: number;
  specificFeatures: string[];
}

interface TierTestConfig {
  tier: string;
  displayName: string;
  questionCount: number;
  algorithms: string[];
  features: string[];
  assessmentType?: 'organizational' | 'ai-readiness';
}

interface IndustryTestConfig {
  industry: string;
  displayName: string;
  contextualQuestions: number;
  specificFeatures: string[];
}

// Organizational Assessment Tiers
const ORG_TIER_CONFIGS: TierTestConfig[] = [
  {
    tier: 'one-time-diagnostic',
    displayName: 'One-Time Diagnostic ($4,995)',
    questionCount: 100,
    algorithms: ['DSCH', 'CRF', 'LEI'],
    features: ['Basic upload', 'PDF report', 'Org chart', 'Basic AI assessment'],
    assessmentType: 'organizational'
  },
  {
    tier: 'monthly-subscription',
    displayName: 'Monthly Subscription ($2,995/mo)',
    questionCount: 120,
    algorithms: ['DSCH', 'CRF', 'LEI', 'OCI', 'HOCI'],
    features: ['Unlimited assessments', 'Dashboard refresh', 'Advanced AI analysis', 'CSV exports'],
    assessmentType: 'organizational'
  },
  {
    tier: 'comprehensive-package',
    displayName: 'Comprehensive Package ($9,900)',
    questionCount: 150,
    algorithms: ['All basic', 'Advanced DSCH', 'Cost-savings analysis'],
    features: ['Scenario builder', '30-page report', 'Strategy session', 'Team collaboration'],
    assessmentType: 'organizational'
  },
  {
    tier: 'enterprise-transformation',
    displayName: 'Enterprise Transformation ($24,000)',
    questionCount: 200,
    algorithms: ['All algorithms', 'Monte Carlo', 'Predictive analytics'],
    features: ['Power BI dashboard', 'API connectors', 'Real-time collaboration', 'Quarterly audits'],
    assessmentType: 'organizational'
  }
];

// AI Readiness Assessment Tiers
const AI_READINESS_TIER_CONFIGS: TierTestConfig[] = [
  {
    tier: 'ai-readiness-basic',
    displayName: 'Advanced AI Assessment (105 Questions)',
    questionCount: 105,
    algorithms: ['AI Readiness Index', 'Technology Maturity', 'Change Management'],
    features: ['AI readiness score', 'Technology gaps analysis', 'Implementation roadmap', 'PDF report'],
    assessmentType: 'ai-readiness'
  },
  {
    tier: 'ai-readiness-custom',
    displayName: 'Comprehensive AI Assessment (150 Questions)',
    questionCount: 150,
    algorithms: ['Advanced AI Index', 'Predictive Readiness', 'Risk Assessment', 'ROI Analysis'],
    features: ['Comprehensive analysis', 'Custom recommendations', 'Strategic planning', 'Executive dashboard', 'Quarterly reviews'],
    assessmentType: 'ai-readiness'
  }
];

const INDUSTRY_CONFIGS: IndustryTestConfig[] = [
  {
    industry: 'higher-education',
    displayName: 'Higher Education',
    contextualQuestions: 25,
    specificFeatures: ['Student success metrics', 'Academic program analysis', 'Enrollment optimization']
  },
  {
    industry: 'healthcare',
    displayName: 'Healthcare',
    contextualQuestions: 30,
    specificFeatures: ['Patient care optimization', 'Regulatory compliance', 'Clinical workflow analysis']
  },
  {
    industry: 'nonprofit',
    displayName: 'Nonprofit',
    contextualQuestions: 20,
    specificFeatures: ['Donor engagement', 'Program effectiveness', 'Mission alignment']
  },
  {
    industry: 'corporate',
    displayName: 'Corporate',
    contextualQuestions: 25,
    specificFeatures: ['Operational efficiency', 'Revenue optimization', 'Market positioning']
  },
  {
    industry: 'government',
    displayName: 'Government',
    contextualQuestions: 35,
    specificFeatures: ['Public service delivery', 'Compliance tracking', 'Resource allocation']
  }
];

function AdminTestingPanelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [runningTests, setRunningTests] = useState<Set<string>>(new Set());
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);
  const [recentAssessments, setRecentAssessments] = useState<any[]>([]);
  const [loadingAssessments, setLoadingAssessments] = useState(false);
  
  // Check URL parameter for assessment type, default to organizational
  const urlType = searchParams.get('type');
  const [assessmentType, setAssessmentType] = useState<'organizational' | 'ai-readiness'>(
    urlType === 'ai-readiness' ? 'ai-readiness' : 'organizational'
  );

  // Get current tier configs based on assessment type
  const TIER_CONFIGS = assessmentType === 'ai-readiness' ? AI_READINESS_TIER_CONFIGS : ORG_TIER_CONFIGS;

  useEffect(() => {
    // Set assessment type based on URL parameter
    if (urlType === 'ai-readiness') {
      setAssessmentType('ai-readiness');
    }

    // Check if user is already authenticated as admin
    const adminAuth = sessionStorage.getItem('admin_authenticated');
    if (adminAuth === 'true') {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      loadRecentAssessments();
    }
    setLoading(false);
  }, [urlType]);

  const loadRecentAssessments = async () => {
    setLoadingAssessments(true);
    try {
      const response = await fetch('/api/admin/assessments/list', {
        headers: {
          'Authorization': 'Bearer admin-token',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecentAssessments(data.assessments || []);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        console.error('Failed to load recent assessments:', errorData);
        // For development/debugging - you can uncomment the line below to see the actual error
        // alert(`Error loading assessments: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error loading recent assessments:', error);
      // For development/debugging
      // alert(`Network error: ${error.message}`);
    } finally {
      setLoadingAssessments(false);
    }
  };

  const authenticateAdmin = () => {
    // Simple admin authentication (in production, use proper auth)
    if (adminPassword === 'stardynamics1124*') {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      sessionStorage.setItem('admin_authenticated', 'true');
      loadRecentAssessments();
    } else {
      alert('Invalid admin password');
    }
  };

  const runTierTest = async (tier: string, industry: string) => {
    const testKey = `${tier}-${industry}`;
    setRunningTests(prev => new Set(prev).add(testKey));

    try {
      // Create test assessment with specific tier and industry
      const testData = {
        tier,
        organizationType: industry,
        institutionName: `Test Institution - ${INDUSTRY_CONFIGS.find(i => i.industry === industry)?.displayName}`,
        contactEmail: 'admin@test.com',
        contactName: 'Admin Tester',
        userId: 'admin-test-user',
        responses: generateTestResponses(tier, industry),
        uploadedFiles: [],
        testMode: true, // Flag to identify test assessments
        assessmentType: assessmentType // Add assessment type to the request
      };

      // Use appropriate API endpoint based on assessment type
      const apiEndpoint = assessmentType === 'ai-readiness' 
        ? '/api/ai-readiness/submit' 
        : '/api/assessment/submit';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      let result;
      const responseText = await response.text();
      
      try {
        result = JSON.parse(responseText);
      } catch {
        console.error('Failed to parse response as JSON:', responseText.substring(0, 500));
        throw new Error(`Invalid JSON response. Got: ${responseText.substring(0, 200)}...`);
      }

      if (response.ok) {
        const newResult: TestResult = {
          tier,
          industry,
          status: 'success',
          message: `${assessmentType === 'ai-readiness' ? 'AI readiness' : 'Organizational'} assessment created successfully`,
          assessmentId: result.id,
          timestamp: new Date().toISOString()
        };
        setTestResults(prev => [...prev, newResult]);

        // Trigger analysis for the test assessment
        if (result.id) {
          await triggerTestAnalysis(result.id, tier);
        }
      } else {
        const newResult: TestResult = {
          tier,
          industry,
          status: 'error',
          message: `${result.error || 'Unknown error'}`,
          timestamp: new Date().toISOString()
        };
        setTestResults(prev => [...prev, newResult]);
      }
    } catch (error) {
      const newResult: TestResult = {
        tier,
        industry,
        status: 'error',
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString()
      };
      setTestResults(prev => [...prev, newResult]);
    } finally {
      setRunningTests(prev => {
        const newSet = new Set(prev);
        newSet.delete(testKey);
        return newSet;
      });
    }
  };

  const triggerTestAnalysis = async (assessmentId: string, tier: string) => {
    try {
      // Use appropriate analysis endpoint based on assessment type
      const analysisEndpoint = assessmentType === 'ai-readiness' 
        ? '/api/ai-readiness/analysis' 
        : '/api/analysis';

      const analysisResponse = await fetch(analysisEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentId,
          tier,
          testMode: true,
          assessmentType: assessmentType
        }),
      });

      if (analysisResponse.ok) {
        console.log(`${assessmentType === 'ai-readiness' ? 'AI readiness' : 'Organizational'} analysis triggered for assessment ${assessmentId}`);
      }
    } catch (error) {
      console.error(`Failed to trigger analysis for ${assessmentId}:`, error);
    }
  };

  const generateTestResponses = (tier: string, industry: string) => {
    const responses: Record<string, any> = {};
    
    // Generate realistic test responses based on tier and industry
    const tierConfig = TIER_CONFIGS.find(t => t.tier === tier);
    const industryConfig = INDUSTRY_CONFIGS.find(i => i.industry === industry);
    
    if (!tierConfig || !industryConfig) return responses;

    if (assessmentType === 'ai-readiness') {
      // AI Readiness specific questions (105 for basic, 150 for comprehensive)
      const questionCount = tier === 'ai-readiness-custom' ? 150 : 105;
      
      // Strategic Leadership (18 Questions)
      responses.strategic_leadership_ai_vision = Math.floor(Math.random() * 3) + 3; // 3-5 range
      responses.strategic_ai_budget_allocation = Math.floor(Math.random() * 4) + 2;
      responses.leadership_ai_commitment = Math.floor(Math.random() * 3) + 3;
      responses.ai_governance_structure = Math.floor(Math.random() * 4) + 2;
      
      // Governance & Policy (20 Questions)
      responses.governance_ai_policies = Math.floor(Math.random() * 4) + 2;
      responses.ai_ethics_committee = Math.floor(Math.random() * 3) + 3;
      responses.ai_risk_management = Math.floor(Math.random() * 4) + 2;
      responses.vendor_ai_policies = Math.floor(Math.random() * 3) + 3;
      
      // Faculty AI Integration (18 Questions)
      responses.faculty_ai_integration = Math.floor(Math.random() * 3) + 3;
      responses.pedagogical_ai_use = Math.floor(Math.random() * 4) + 2;
      responses.ai_course_design = Math.floor(Math.random() * 3) + 3;
      responses.faculty_ai_training = Math.floor(Math.random() * 4) + 2;
      
      // Student AI Policy (12 Questions)
      responses.student_ai_policies = Math.floor(Math.random() * 4) + 2;
      responses.academic_integrity_ai = Math.floor(Math.random() * 3) + 3;
      responses.student_ai_training = Math.floor(Math.random() * 4) + 2;
      
      // Employee Integration (10 Questions)
      responses.employee_ai_training = Math.floor(Math.random() * 3) + 3;
      responses.workplace_ai_policies = Math.floor(Math.random() * 4) + 2;
      
      // Technology Infrastructure (10 Questions)
      responses.technology_infrastructure_ai = Math.floor(Math.random() * 4) + 2;
      responses.ai_security_framework = Math.floor(Math.random() * 3) + 3;
      
      // Cultural Transformation (8 Questions)
      responses.cultural_change_management = Math.floor(Math.random() * 3) + 3;
      responses.ai_innovation_culture = Math.floor(Math.random() * 4) + 2;
      
      // Mission Alignment (4 Questions)
      responses.mission_alignment_ai = Math.floor(Math.random() * 4) + 2;
      responses.strategic_plan_ai_integration = Math.floor(Math.random() * 3) + 3;

      // Higher education specific AI questions
      if (industry === 'higher-education') {
        responses.learning_outcomes_preservation = Math.floor(Math.random() * 3) + 3;
        responses.faculty_autonomy_ai = Math.floor(Math.random() * 4) + 2;
        responses.student_success_ai_metrics = Math.floor(Math.random() * 3) + 3;
        responses.ai_pedagogical_integration = Math.floor(Math.random() * 4) + 2;
      }

      // AI readiness text responses
      responses.ai_vision_statement = `Test AI vision for ${industryConfig.displayName} - leveraging AI to enhance educational outcomes while preserving academic integrity`;
      responses.ai_implementation_challenges = 'Faculty resistance, infrastructure limitations, policy development needs';
      responses.ai_success_metrics = 'Student learning outcomes, operational efficiency, cost savings, faculty satisfaction';

      // Comprehensive tier additional features (150 questions)
      if (tier === 'ai-readiness-custom') {
        // Advanced AI Strategy (25 Questions)
        responses.ai_scenario_modeling = Math.floor(Math.random() * 3) + 3;
        responses.ai_board_readiness = Math.floor(Math.random() * 4) + 2;
        responses.ai_collaboration_needs = Math.floor(Math.random() * 3) + 3;
        responses.ai_competitive_analysis = Math.floor(Math.random() * 4) + 2;
        responses.ai_strategic_partnerships = Math.floor(Math.random() * 3) + 3;
        
        // Implementation Planning (25 Questions)
        responses.ai_roadmap_development = Math.floor(Math.random() * 4) + 2;
        responses.ai_pilot_program_design = Math.floor(Math.random() * 3) + 3;
        responses.ai_success_measurement = Math.floor(Math.random() * 4) + 2;
        responses.ai_resource_allocation = Math.floor(Math.random() * 3) + 3;
        responses.ai_timeline_planning = Math.floor(Math.random() * 4) + 2;
        
        // Generate additional responses to reach 150 questions
        for (let i = 1; i <= 45; i++) {
          responses[`ai_additional_question_${i}`] = Math.floor(Math.random() * 4) + 2;
        }
      }
    } else {
      // Original organizational assessment questions
      responses.leadership_vision_likert = Math.floor(Math.random() * 3) + 3; // 3-5 range
      responses.leadership_vision_text = `Test vision statement for ${industryConfig.displayName} organization`;
      responses.communication_effectiveness_likert = Math.floor(Math.random() * 3) + 3;
      responses.organizational_structure_clarity_likert = Math.floor(Math.random() * 5) + 1;

      // Industry-specific responses
      switch (industry) {
        case 'higher-education':
          responses.student_enrollment_numeric = 5000 + Math.floor(Math.random() * 15000);
          responses.faculty_satisfaction_likert = Math.floor(Math.random() * 3) + 3;
          responses.academic_programs_count = 50 + Math.floor(Math.random() * 100);
          break;
        case 'healthcare':
          responses.patient_volume_numeric = 1000 + Math.floor(Math.random() * 5000);
          responses.clinical_efficiency_likert = Math.floor(Math.random() * 4) + 2;
          responses.regulatory_compliance_likert = 4 + Math.floor(Math.random() * 2);
          break;
        case 'nonprofit':
          responses.annual_budget_numeric = 100000 + Math.floor(Math.random() * 900000);
          responses.donor_retention_likert = Math.floor(Math.random() * 3) + 3;
          responses.program_impact_likert = Math.floor(Math.random() * 3) + 3;
          break;
        case 'corporate':
          responses.annual_revenue_numeric = 1000000 + Math.floor(Math.random() * 50000000);
          responses.market_position_likert = Math.floor(Math.random() * 4) + 2;
          responses.operational_efficiency_likert = Math.floor(Math.random() * 3) + 3;
          break;
        case 'government':
          responses.public_satisfaction_likert = Math.floor(Math.random() * 3) + 2;
          responses.budget_utilization_likert = Math.floor(Math.random() * 4) + 2;
          responses.service_delivery_likert = Math.floor(Math.random() * 3) + 3;
          break;
      }

      // AI/Automation questions (for organizational assessments)
      responses.ai_chatbot_usage_likert = Math.floor(Math.random() * 5) + 1;
      responses.automation_processes_likert = Math.floor(Math.random() * 4) + 2;
      responses.data_analytics_capability_likert = Math.floor(Math.random() * 4) + 2;

      // Tier-specific additional questions
      if (tier !== 'one-time-diagnostic') {
        responses.financial_stability_numeric = 70 + Math.floor(Math.random() * 25);
        responses.infrastructure_capacity_likert = Math.floor(Math.random() * 3) + 3;
      }

      if (tier === 'comprehensive-package' || tier === 'enterprise-transformation') {
        responses.strategic_planning_likert = Math.floor(Math.random() * 3) + 3;
        responses.change_management_likert = Math.floor(Math.random() * 4) + 2;
        responses.stakeholder_engagement_likert = Math.floor(Math.random() * 3) + 3;
      }

      if (tier === 'enterprise-transformation') {
        responses.digital_transformation_likert = Math.floor(Math.random() * 3) + 3;
        responses.innovation_capacity_likert = Math.floor(Math.random() * 4) + 2;
        responses.scalability_readiness_likert = Math.floor(Math.random() * 3) + 3;
      }
    }

    return responses;
  };

  const runAllTests = async () => {
    for (const tier of TIER_CONFIGS) {
      for (const industry of INDUSTRY_CONFIGS) {
        await runTierTest(tier.tier, industry.industry);
        // Add small delay between tests to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  const clearTestResults = () => {
    setTestResults([]);
  };

  const viewTestAssessment = (assessmentId: string) => {
    if (assessmentId) {
      router.push(`/admin/assessment/${assessmentId}?test=true`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (showPasswordPrompt) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Admin Access Required</h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter the admin password to access the testing panel
              </p>
            </div>
            
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && authenticateAdmin()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              />
              
              <button
                onClick={authenticateAdmin}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Authenticate
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-500 text-center">
              <p>Hint: Check your admin credentials documentation</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">Access Denied</h2>
          <p className="mt-2 text-sm text-gray-600">You do not have admin access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Assessment Testing Panel</h1>
          <p className="mt-2 text-sm text-gray-600">
            Test both organizational and AI readiness assessments across all tiers and industries
          </p>
        </div>

        {/* Assessment Type Toggle */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Assessment Type</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setAssessmentType('organizational');
                setTestResults([]);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                assessmentType === 'organizational'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📊 Organizational Assessment
            </button>
            <button
              onClick={() => {
                setAssessmentType('ai-readiness');
                setTestResults([]);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                assessmentType === 'ai-readiness'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🤖 AI Readiness Assessment
            </button>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              {assessmentType === 'ai-readiness' ? '🤖 AI Readiness Testing' : '📊 Organizational Assessment Testing'}
            </h3>
            <p className="text-sm text-gray-600">
              {assessmentType === 'ai-readiness' 
                ? 'Test AI readiness assessments with proprietary algorithms (AIRIX™, AIRS™, AICS™) and higher education focus.'
                : 'Test organizational assessments with traditional algorithms (DSCH, CRF, LEI) across multiple industries.'
              }
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={runAllTests}
              disabled={runningTests.size > 0}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {runningTests.size > 0 ? 'Running Tests...' : 'Run All Tests'}
            </button>
            
            <button
              onClick={clearTestResults}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Clear Results
            </button>
            
            <button
              onClick={() => router.push('/admin/analytics')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Recent Assessments */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Assessments</h2>
            <button
              onClick={loadRecentAssessments}
              disabled={loadingAssessments}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
            >
              {loadingAssessments ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          {loadingAssessments ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Loading assessments...</p>
            </div>
          ) : recentAssessments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assessment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentAssessments.slice(0, 10).map((assessment) => (
                    <tr key={assessment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {assessment.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {assessment.tier_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {assessment.industry_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(assessment.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        <button
                          onClick={() => router.push(`/admin/assessment/${assessment.id}`)}
                          className="hover:text-blue-800 font-medium"
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No assessments found</p>
          )}
        </div>

        {/* Tier Configuration Overview */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Tier Configurations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIER_CONFIGS.map((tier) => (
              <div key={tier.tier} className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{tier.displayName}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Questions:</strong> {tier.questionCount}</p>
                  <p><strong>Algorithms:</strong> {tier.algorithms?.join(', ') || 'N/A'}</p>
                  <div>
                    <strong>Features:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {tier.features?.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      )) || <li>No features listed</li>}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testing Matrix */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Testing Matrix</h2>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Testing Options:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>Auto Test:</strong> Generates synthetic data and runs automated test</li>
              <li><strong>Manual Test:</strong> Opens assessment in new tab - go through question by question with real data entry</li>
            </ul>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry / Tier
                  </th>
                  {TIER_CONFIGS.map((tier) => (
                    <th key={tier.tier} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {tier.tier.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {INDUSTRY_CONFIGS.map((industry) => (
                  <tr key={industry.industry}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {industry.displayName}
                    </td>
                    {TIER_CONFIGS.map((tier) => {
                      const testKey = `${tier.tier}-${industry.industry}`;
                      const isRunning = runningTests.has(testKey);
                      const testResult = testResults.find(r => r.tier === tier.tier && r.industry === industry.industry);
                      
                      return (
                        <td key={tier.tier} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => runTierTest(tier.tier, industry.industry)}
                              disabled={isRunning}
                              className={`px-3 py-1 rounded text-xs font-medium ${
                                isRunning 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : testResult?.status === 'success'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : testResult?.status === 'error'
                                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              }`}
                            >
                              {isRunning ? 'Testing...' : testResult ? testResult.status : 'Auto Test'}
                            </button>
                            <a
                              href={assessmentType === 'ai-readiness' 
                                ? `/assessment/tier-based?tier=${tier.tier}&org=${industry.industry}&assessment_type=ai-readiness&test_mode=admin`
                                : `/assessment/tier-based?tier=${tier.tier}&org=${industry.industry}&test_mode=admin`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 text-center"
                            >
                              Manual Test
                            </a>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Manual Testing Links */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Manual Testing Links</h2>
          <p className="text-sm text-gray-600 mb-4">
            Click any link below to open a full assessment in a new tab. Go through each question manually to test the complete user experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIER_CONFIGS.map((tier) => (
              <div key={tier.tier} className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-2">{tier.displayName}</h3>
                <p className="text-xs text-gray-600 mb-3">{tier.questionCount} questions</p>
                <div className="space-y-2">
                  {INDUSTRY_CONFIGS.slice(0, 3).map((industry) => (
                    <a
                      key={industry.industry}
                      href={assessmentType === 'ai-readiness' 
                        ? `/assessment/tier-based?tier=${tier.tier}&org=${industry.industry}&assessment_type=ai-readiness&test_mode=admin`
                        : `/assessment/tier-based?tier=${tier.tier}&org=${industry.industry}&test_mode=admin`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-3 py-2 text-xs font-medium text-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      {industry.displayName}
                    </a>
                  ))}
                  <details className="mt-2">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                      More industries...
                    </summary>
                    <div className="mt-2 space-y-2">
                      {INDUSTRY_CONFIGS.slice(3).map((industry) => (
                        <a
                          key={industry.industry}
                          href={assessmentType === 'ai-readiness' 
                            ? `/assessment/tier-based?tier=${tier.tier}&org=${industry.industry}&assessment_type=ai-readiness&test_mode=admin`
                            : `/assessment/tier-based?tier=${tier.tier}&org=${industry.industry}&test_mode=admin`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full px-3 py-2 text-xs font-medium text-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          {industry.displayName}
                        </a>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Test Results</h2>
            <div className="space-y-3">
              {testResults.slice(-10).reverse().map((result, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${
                  result.status === 'success' ? 'bg-green-50 border-green-200' :
                  result.status === 'error' ? 'bg-red-50 border-red-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {TIER_CONFIGS.find(t => t.tier === result.tier)?.displayName} - 
                        {INDUSTRY_CONFIGS.find(i => i.industry === result.industry)?.displayName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                      {result.timestamp && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(result.timestamp).toLocaleString()}
                        </p>
                      )}
                    </div>
                    {result.assessmentId && (
                      <button
                        onClick={() => viewTestAssessment(result.assessmentId!)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Assessment →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminTestingPanel() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="text-lg">Loading admin panel...</div></div>}>
      <AdminTestingPanelContent />
    </Suspense>
  );
}
