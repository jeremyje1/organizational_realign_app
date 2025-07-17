'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

const TIER_CONFIGS: TierTestConfig[] = [
  {
    tier: 'one-time-diagnostic',
    displayName: 'One-Time Diagnostic ($4,995)',
    questionCount: 100,
    algorithms: ['DSCH', 'CRF', 'LEI'],
    features: ['Basic upload', 'PDF report', 'Org chart', 'Basic AI assessment']
  },
  {
    tier: 'monthly-subscription',
    displayName: 'Monthly Subscription ($2,995/mo)',
    questionCount: 120,
    algorithms: ['DSCH', 'CRF', 'LEI', 'OCI', 'HOCI'],
    features: ['Unlimited assessments', 'Dashboard refresh', 'Advanced AI analysis', 'CSV exports']
  },
  {
    tier: 'comprehensive-package',
    displayName: 'Comprehensive Package ($9,900)',
    questionCount: 150,
    algorithms: ['All basic', 'Advanced DSCH', 'Cost-savings analysis'],
    features: ['Scenario builder', '30-page report', 'Strategy session', 'Team collaboration']
  },
  {
    tier: 'enterprise-transformation',
    displayName: 'Enterprise Transformation ($24,000)',
    questionCount: 200,
    algorithms: ['All algorithms', 'Monte Carlo', 'Predictive analytics'],
    features: ['Power BI dashboard', 'API connectors', 'Real-time collaboration', 'Quarterly audits']
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

export default function AdminTestingPanel() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [runningTests, setRunningTests] = useState<Set<string>>(new Set());
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);
  const [recentAssessments, setRecentAssessments] = useState<any[]>([]);
  const [loadingAssessments, setLoadingAssessments] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated as admin
    const adminAuth = sessionStorage.getItem('admin_authenticated');
    if (adminAuth === 'true') {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      loadRecentAssessments();
    }
    setLoading(false);
  }, []);

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
        const errorData = await response.json();
        console.error('Failed to load recent assessments:', errorData);
      }
    } catch (error) {
      console.error('Error loading recent assessments:', error);
    } finally {
      setLoadingAssessments(false);
    }
  };

  const authenticateAdmin = () => {
    // Simple admin authentication (in production, use proper auth)
    if (adminPassword === 'northpath-admin-2025') {
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
        testMode: true // Flag to identify test assessments
      };

      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();

      if (response.ok) {
        const newResult: TestResult = {
          tier,
          industry,
          status: 'success',
          message: `✅ Assessment created successfully`,
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
          message: `❌ ${result.error || 'Unknown error'}`,
          timestamp: new Date().toISOString()
        };
        setTestResults(prev => [...prev, newResult]);
      }
    } catch (error) {
      const newResult: TestResult = {
        tier,
        industry,
        status: 'error',
        message: `❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
      const analysisResponse = await fetch('/api/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentId,
          tier,
          testMode: true
        }),
      });

      if (analysisResponse.ok) {
        console.log(`✅ Analysis triggered for assessment ${assessmentId}`);
      }
    } catch (error) {
      console.error(`❌ Failed to trigger analysis for ${assessmentId}:`, error);
    }
  };

  const generateTestResponses = (tier: string, industry: string) => {
    const responses: Record<string, any> = {};
    
    // Generate realistic test responses based on tier and industry
    const tierConfig = TIER_CONFIGS.find(t => t.tier === tier);
    const industryConfig = INDUSTRY_CONFIGS.find(i => i.industry === industry);
    
    if (!tierConfig || !industryConfig) return responses;

    // Basic leadership questions (all tiers)
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

    // AI/Automation questions (for all tiers)
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              
              <button
                onClick={authenticateAdmin}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            Test the assessment tool across all tiers and industries to validate functionality
          </p>
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
                  <p><strong>Algorithms:</strong> {tier.algorithms.join(', ')}</p>
                  <div>
                    <strong>Features:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {tier.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
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
                            {isRunning ? 'Testing...' : testResult ? testResult.status : 'Test'}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
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
