'use client';

import React, { useState, useEffect } from 'react';
import { AdminAuth } from '@/components/AdminAuth';
import Link from 'next/link';

interface Assessment {
  id: string;
  type: 'organizational' | 'ai-readiness';
  tier: string;
  industry?: string;
  status: 'pending' | 'completed' | 'in-progress';
  createdAt: string;
  completedAt?: string;
  results?: any;
}

interface TestConfig {
  id: string;
  name: string;
  type: 'organizational' | 'ai-readiness';
  tier: string;
  description: string;
  estimatedTime: string;
  questionCount: number;
  features: string[];
}

const ASSESSMENT_CONFIGS: TestConfig[] = [
  // Organizational Realignment Assessments
  {
    id: 'org-diagnostic',
    name: 'One-Time Diagnostic',
    type: 'organizational',
    tier: 'one-time-diagnostic',
    description: 'Basic organizational assessment with foundational analysis',
    estimatedTime: '25-30 minutes',
    questionCount: 100,
    features: ['DSCH Analysis', 'CRF Scoring', 'LEI Assessment', 'PDF Report', 'Org Chart']
  },
  {
    id: 'org-monthly',
    name: 'Monthly Subscription',
    type: 'organizational',
    tier: 'monthly-subscription',
    description: 'Comprehensive monthly assessment with advanced features',
    estimatedTime: '35-40 minutes',
    questionCount: 120,
    features: ['All Basic Features', 'Dashboard Refresh', 'Advanced AI Analysis', 'CSV Exports']
  },
  {
    id: 'org-comprehensive',
    name: 'Comprehensive Package',
    type: 'organizational',
    tier: 'comprehensive-package',
    description: 'Full organizational transformation assessment',
    estimatedTime: '45-50 minutes',
    questionCount: 150,
    features: ['Scenario Builder', '30-Page Report', 'Strategy Session', 'Team Collaboration']
  },
  {
    id: 'org-enterprise',
    name: 'Enterprise Transformation',
    type: 'organizational',
    tier: 'enterprise-transformation',
    description: 'Complete enterprise-level assessment with predictive analytics',
    estimatedTime: '60+ minutes',
    questionCount: 200,
    features: ['Power BI Dashboard', 'API Connectors', 'Real-time Collaboration', 'Quarterly Audits']
  },
  // AI Readiness Assessments
  {
    id: 'ai-pulse-check',
    name: 'AI Pulse Check',
    type: 'ai-readiness',
    tier: 'higher-ed-ai-pulse-check',
    description: 'Quick AI readiness assessment for educational institutions',
    estimatedTime: '15-20 minutes',
    questionCount: 20,
    features: ['Basic AI Readiness Score', 'Quick Recommendations', 'PDF Summary']
  },
  {
    id: 'ai-assessment',
    name: 'Comprehensive AI Assessment',
    type: 'ai-readiness',
    tier: 'higher-ed-ai-assessment',
    description: 'Detailed AI readiness with implementation roadmap',
    estimatedTime: '30-35 minutes',
    questionCount: 50,
    features: ['Detailed AI Analysis', 'Implementation Roadmap', 'Technology Gap Analysis']
  },
  {
    id: 'ai-blueprint',
    name: 'AI Blueprint Program',
    type: 'ai-readiness',
    tier: 'higher-ed-ai-blueprint',
    description: 'Complete AI transformation blueprint with strategic planning',
    estimatedTime: '45-50 minutes',
    questionCount: 75,
    features: ['Strategic Planning', 'Custom Recommendations', 'Executive Dashboard', 'Ongoing Support']
  }
];

function UnifiedTestingInterface() {
  const [activeTab, setActiveTab] = useState<'all' | 'organizational' | 'ai-readiness'>('all');
  const [testResults, setTestResults] = useState<Assessment[]>([]);
  const [isRunningTest, setIsRunningTest] = useState<string | null>(null);

  useEffect(() => {
    fetchTestResults();
  }, []);

  const fetchTestResults = async () => {
    try {
      const response = await fetch('/api/admin/assessments/list', {
        headers: {
          'Authorization': 'Bearer admin-token stardynamics1124*'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTestResults(data.assessments || []);
      }
    } catch (error) {
      console.error('Failed to fetch test results:', error);
    }
  };

  const startAssessmentTest = async (config: TestConfig) => {
    setIsRunningTest(config.id);
    
    // Open assessment in new tab for testing
    const baseUrl = window.location.origin;
    let assessmentUrl = '';
    
    if (config.type === 'organizational') {
      assessmentUrl = `${baseUrl}/assessment/start?tier=${config.tier}&test=true`;
    } else {
      assessmentUrl = `${baseUrl}/assessment/start?tier=${config.tier}&type=ai-readiness&test=true`;
    }
    
    window.open(assessmentUrl, '_blank');
    
    // Reset loading state after a moment
    setTimeout(() => {
      setIsRunningTest(null);
      fetchTestResults();
    }, 2000);
  };

  const filteredConfigs = ASSESSMENT_CONFIGS.filter(config => 
    activeTab === 'all' || config.type === activeTab
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Testing Center</h1>
        <p className="text-gray-600">Test all organizational and AI readiness assessments from one interface</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'All Assessments', count: ASSESSMENT_CONFIGS.length },
            { key: 'organizational', label: 'Organizational', count: ASSESSMENT_CONFIGS.filter(c => c.type === 'organizational').length },
            { key: 'ai-readiness', label: 'AI Readiness', count: ASSESSMENT_CONFIGS.filter(c => c.type === 'ai-readiness').length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredConfigs.map(config => (
          <div key={config.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  config.type === 'organizational' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <h3 className="text-lg font-semibold text-gray-900">{config.name}</h3>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                config.type === 'organizational' 
                  ? 'text-blue-700 bg-blue-100' 
                  : 'text-green-700 bg-green-100'
              }`}>
                {config.type === 'organizational' ? 'ORG' : 'AI'}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{config.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Questions:</span>
                <span className="font-medium">{config.questionCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Est. Time:</span>
                <span className="font-medium">{config.estimatedTime}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
              <div className="flex flex-wrap gap-1">
                {config.features.slice(0, 3).map(feature => (
                  <span key={feature} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {feature}
                  </span>
                ))}
                {config.features.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    +{config.features.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => startAssessmentTest(config)}
              disabled={isRunningTest === config.id}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRunningTest === config.id ? 'Starting Test...' : 'Start Test'}
            </button>
          </div>
        ))}
      </div>

      {/* Recent Test Results */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Test Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testResults.slice(0, 10).map(result => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.tier}</div>
                    <div className="text-sm text-gray-500">ID: {result.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      result.type === 'organizational' 
                        ? 'text-blue-700 bg-blue-100'
                        : 'text-green-700 bg-green-100'
                    }`}>
                      {result.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/assessment/${result.id}`} className="text-indigo-600 hover:text-indigo-900">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin"
          className="bg-indigo-600 text-white p-4 rounded-lg text-center hover:bg-indigo-700 transition-colors"
        >
          <h3 className="font-semibold mb-1">Admin Dashboard</h3>
          <p className="text-sm opacity-90">View business analytics and system status</p>
        </Link>
        <Link
          href="/admin/analytics"
          className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors"
        >
          <h3 className="font-semibold mb-1">Analytics</h3>
          <p className="text-sm opacity-90">Track assessment performance and usage</p>
        </Link>
        <Link
          href="/admin/testing?type=bulk"
          className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors"
        >
          <h3 className="font-semibold mb-1">Bulk Testing</h3>
          <p className="text-sm opacity-90">Run multiple assessments automatically</p>
        </Link>
      </div>
    </div>
  );
}

export default function UnifiedTestingPage() {
  return (
    <AdminAuth>
      <UnifiedTestingInterface />
    </AdminAuth>
  );
}
