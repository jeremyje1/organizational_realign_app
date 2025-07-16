'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

interface AssessmentData {
  id: string;
  tier: string;
  organization_type: string;
  institution_name: string;
  contact_email: string;
  contact_name: string;
  responses: Record<string, any>;
  uploaded_files: any[];
  created_at: string;
  analysis_results: any;
  ai_opportunity_assessment: any;
  ai_readiness_score: number;
}

interface QuestionDetails {
  id: string;
  text: string;
  type: string;
  section: string;
  tier: string;
  organization_type?: string;
  response: any;
}

export default function AdminAssessmentViewer() {
  const params = useParams();
  const searchParams = useSearchParams();
  const assessmentId = params.id as string;
  const isTestMode = searchParams.get('test') === 'true';

  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'responses' | 'analysis' | 'ai-assessment'>('overview');
  const [questionDetails, setQuestionDetails] = useState<QuestionDetails[]>([]);

  const parseQuestionDetails = (assessmentData: AssessmentData) => {
    const responses = assessmentData.responses || {};
    const details: QuestionDetails[] = [];

    // Parse responses and match with question bank
    Object.entries(responses).forEach(([questionId, response]) => {
      details.push({
        id: questionId,
        text: formatQuestionText(questionId),
        type: determineQuestionType(questionId, response),
        section: determineSection(questionId),
        tier: assessmentData.tier,
        organization_type: assessmentData.organization_type,
        response: response
      });
    });

    setQuestionDetails(details);
  };

  const fetchAssessmentData = async () => {
    try {
      setLoading(true);
      
      // Fetch assessment data
      const response = await fetch(`/api/admin/assessment/${assessmentId}`, {
        headers: {
          'Authorization': 'Bearer admin-token', // In production, use proper auth
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch assessment data: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Non-JSON response received:', responseText);
        throw new Error('Server returned HTML instead of JSON. Check server logs for errors.');
      }

      const data = await response.json();
      setAssessment(data);

      // Parse question details from responses
      parseQuestionDetails(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessmentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentId]);

  const formatQuestionText = (questionId: string): string => {
    // Convert snake_case to readable text
    return questionId
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const determineQuestionType = (questionId: string, response: any): string => {
    if (questionId.includes('likert')) return 'Likert Scale';
    if (questionId.includes('numeric')) return 'Numeric';
    if (questionId.includes('text')) return 'Text';
    if (questionId.includes('upload')) return 'File Upload';
    if (typeof response === 'number') return 'Numeric';
    if (typeof response === 'string' && response.length > 50) return 'Text';
    if (typeof response === 'number' && response >= 1 && response <= 5) return 'Likert Scale';
    return 'Unknown';
  };

  const determineSection = (questionId: string): string => {
    if (questionId.includes('leadership')) return 'Leadership & Vision';
    if (questionId.includes('communication')) return 'Communication';
    if (questionId.includes('organizational')) return 'Organizational Structure';
    if (questionId.includes('financial')) return 'Financial Management';
    if (questionId.includes('ai_') || questionId.includes('automation')) return 'AI & Automation';
    if (questionId.includes('student') || questionId.includes('academic')) return 'Academic Excellence';
    if (questionId.includes('patient') || questionId.includes('clinical')) return 'Clinical Operations';
    if (questionId.includes('donor') || questionId.includes('program')) return 'Program Management';
    if (questionId.includes('revenue') || questionId.includes('market')) return 'Business Operations';
    if (questionId.includes('public') || questionId.includes('service')) return 'Public Service';
    return 'General';
  };

  const formatResponseValue = (response: any, type: string): string => {
    if (response === null || response === undefined) return 'No response';
    
    switch (type) {
      case 'Likert Scale':
        const likertLabels = ['N/A', 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
        return `${response} - ${likertLabels[response] || 'Unknown'}`;
      case 'Numeric':
        return response.toLocaleString();
      case 'Text':
        return response.length > 100 ? `${response.substring(0, 100)}...` : response;
      default:
        return String(response);
    }
  };

  const getStatusBadge = (tier: string) => {
    const badges = {
      'one-time-diagnostic': 'bg-blue-100 text-blue-800',
      'monthly-subscription': 'bg-green-100 text-green-800',
      'comprehensive-package': 'bg-purple-100 text-purple-800',
      'enterprise-transformation': 'bg-red-100 text-red-800'
    };
    return badges[tier as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const triggerReanalysis = async () => {
    try {
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentId: assessmentId,
          tier: assessment?.tier,
          forceRerun: true,
          testMode: isTestMode
        }),
      });

      if (response.ok) {
        alert('Reanalysis triggered successfully');
        // Refresh the assessment data
        fetchAssessmentData();
      } else {
        alert('Failed to trigger reanalysis');
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">Error Loading Assessment</h2>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">Assessment Not Found</h2>
          <p className="mt-2 text-sm text-gray-600">The requested assessment could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assessment Details</h1>
              <p className="mt-2 text-sm text-gray-600">
                {isTestMode && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">TEST MODE</span>}
                Assessment ID: {assessmentId}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={triggerReanalysis}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Trigger Reanalysis
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'responses', name: 'Responses' },
                { id: 'analysis', name: 'Analysis Results' },
                { id: 'ai-assessment', name: 'AI Assessment' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Institution Name</dt>
                  <dd className="text-sm text-gray-900">{assessment.institution_name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Organization Type</dt>
                  <dd className="text-sm text-gray-900">{assessment.organization_type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Contact</dt>
                  <dd className="text-sm text-gray-900">{assessment.contact_name} ({assessment.contact_email})</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Tier</dt>
                  <dd>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(assessment.tier)}`}>
                      {assessment.tier.replace(/-/g, ' ').toUpperCase()}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="text-sm text-gray-900">{new Date(assessment.created_at).toLocaleString()}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Assessment Metrics</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Responses</dt>
                  <dd className="text-sm text-gray-900">{Object.keys(assessment.responses || {}).length}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">AI Readiness Score</dt>
                  <dd className="text-sm text-gray-900">
                    {assessment.ai_readiness_score ? `${assessment.ai_readiness_score}/100` : 'Not calculated'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Uploaded Files</dt>
                  <dd className="text-sm text-gray-900">{assessment.uploaded_files?.length || 0}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Analysis Status</dt>
                  <dd className="text-sm text-gray-900">
                    {assessment.analysis_results ? 'Completed' : 'Pending'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">AI Assessment Status</dt>
                  <dd className="text-sm text-gray-900">
                    {assessment.ai_opportunity_assessment ? 'Completed' : 'Pending'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'responses' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Question Responses</h2>
              <p className="text-sm text-gray-600">Total responses: {questionDetails.length}</p>
            </div>
            <div className="divide-y divide-gray-200">
              {questionDetails.map((question, idx) => (
                <div key={idx} className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">{question.text}</h3>
                      <div className="mt-1 flex items-center space-x-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {question.type}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {question.section}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className="text-sm text-gray-900 font-medium">
                        {formatResponseValue(question.response, question.type)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Analysis Results</h2>
            {assessment.analysis_results ? (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg overflow-auto">
                  {JSON.stringify(assessment.analysis_results, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No analysis results available yet.</p>
                <button
                  onClick={triggerReanalysis}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Run Analysis
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai-assessment' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">AI Opportunity Assessment</h2>
            {assessment.ai_opportunity_assessment ? (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg overflow-auto">
                  {JSON.stringify(assessment.ai_opportunity_assessment, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No AI assessment available yet.</p>
                <button
                  onClick={triggerReanalysis}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Run AI Assessment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
