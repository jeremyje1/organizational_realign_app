/**
 * Admin Dashboard Page
 * Main administrative interface with comprehensive admin functionality
 * 
 * @version 2.0.0
 * @author NorthPath Strategies
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminAuth } from '@/components/AdminAuth';
import FeatureFlagsAdmin from '@/components/FeatureFlagsAdmin';

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [assessments, setAssessments] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalAssessments: 0,
    activeUsers: 0,
    systemHealth: 'Healthy',
    assessmentsByType: {
      'organizational': 0,
      'ai-readiness': 0
    } as Record<string, number>
  });

  useEffect(() => {
    fetchRecentAssessments();
    fetchSystemStats();
  }, []);

  const fetchRecentAssessments = async () => {
    try {
      const response = await fetch('/api/admin/assessments/list', {
        headers: {
          'Authorization': 'Bearer admin-token stardynamics1124*'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAssessments(data.assessments || []);
      }
    } catch (error) {
      console.error('Failed to fetch assessments:', error);
    }
  };

  const fetchSystemStats = async () => {
    try {
      const response = await fetch('/api/admin/analytics', {
        headers: {
          'Authorization': 'Bearer admin-token stardynamics1124*'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSystemStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch system stats:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Assessments</dt>
                      <dd className="text-lg font-medium text-gray-900">{systemStats.totalAssessments}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Organizational</dt>
                      <dd className="text-lg font-medium text-blue-600">
                        {systemStats.assessmentsByType?.organizational || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">AI Readiness</dt>
                      <dd className="text-lg font-medium text-purple-600">
                        {systemStats.assessmentsByType?.['ai-readiness'] || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">System Health</dt>
                      <dd className="text-lg font-medium text-green-600">{systemStats.systemHealth}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Assessments</h3>
                <div className="mt-6 flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {assessments.slice(0, 5).map((assessment: any) => (
                      <li key={assessment.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              Assessment ID: {assessment.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              Type: <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                assessment.type === 'ai-readiness' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {assessment.type === 'ai-readiness' ? 'AI Readiness' : 'Organizational'}
                              </span> • Tier: {assessment.tier} • Created: {new Date(assessment.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <Link
                              href={`/admin/assessment/${assessment.id}?type=${assessment.type}`}
                              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'assessments':
        return (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">All Assessments</h3>
              <div className="mt-6">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {assessments.map((assessment: any) => (
                        <tr key={assessment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {assessment.id.slice(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              assessment.type === 'ai-readiness' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {assessment.type === 'ai-readiness' ? 'AI Readiness' : 'Organizational'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {assessment.tier}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(assessment.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              href={`/admin/assessment/${assessment.id}?type=${assessment.type}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'testing':
        return (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">System Testing</h3>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/admin/testing"
                    className="block p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Organizational Testing</h4>
                        <p className="text-sm text-gray-500">Test organizational assessments</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/admin/testing?type=ai-readiness"
                    className="block p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">🤖 AI Readiness Testing</h4>
                        <p className="text-sm text-gray-500">Test AI readiness assessments (105/150 questions)</p>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => window.open('/assessment/start', '_blank')}
                    className="block p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors w-full text-left"
                  >
                    <div className="flex items-center">
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Live Assessment Test</h4>
                        <p className="text-sm text-gray-500">Run a new live test assessment</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'testing':
        return (
          <div className="space-y-6">
            {/* Assessment Testing Section */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Assessment Testing</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Test both assessment types with different tiers and configurations
                </p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Organizational Realignment Testing */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      Organizational Realignment
                    </h4>
                    
                    <div className="space-y-3">
                      <Link
                        href="/assessment/tier-based?tier=express-diagnostic&org=higher-education"
                        className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        <div className="font-medium">Express Diagnostic ($2,495)</div>
                        <div className="text-gray-500">60 questions • 25 page report</div>
                      </Link>
                      
                      <Link
                        href="/assessment/tier-based?tier=one-time-diagnostic&org=higher-education"
                        className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        <div className="font-medium">One-Time Diagnostic ($4,995)</div>
                        <div className="text-gray-500">100+ questions • 35 page report</div>
                      </Link>
                      
                      <Link
                        href="/assessment/tier-based?tier=comprehensive-package&org=higher-education"
                        className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        <div className="font-medium">Comprehensive Package ($15,000)</div>
                        <div className="text-gray-500">150+ questions • 60 page report</div>
                      </Link>
                      
                      <Link
                        href="/assessment/tier-based?tier=enterprise-transformation&org=higher-education"
                        className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        <div className="font-medium">Enterprise Transformation ($45,000)</div>
                        <div className="text-gray-500">200+ questions • 100 page report</div>
                      </Link>
                    </div>
                  </div>

                  {/* AI Readiness Testing */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                      AI Readiness Assessment
                    </h4>
                    
                    <div className="space-y-3">
                      <Link
                        href="/assessment/tier-based?tier=ai-readiness-advanced&assessment_type=ai-readiness"
                        className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        <div className="font-medium">Advanced AI Assessment ($4,995)</div>
                        <div className="text-gray-500">105 questions • 12 page report</div>
                      </Link>
                      
                      <Link
                        href="/assessment/tier-based?tier=ai-readiness-comprehensive&assessment_type=ai-readiness"
                        className="block w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        <div className="font-medium">Comprehensive AI Assessment ($12,000)</div>
                        <div className="text-gray-500">150 questions • 30 page report</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stripe Integration Testing */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Stripe Integration Testing</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Test Stripe checkout flows for different tier combinations
                </p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Organizational Tiers</h4>
                    <div className="space-y-2">
                      <a
                        href="/api/stripe/create-tier-checkout?tier=express-diagnostic"
                        target="_blank"
                        className="block px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        Test Express Diagnostic Checkout
                      </a>
                      <a
                        href="/api/stripe/create-tier-checkout?tier=one-time-diagnostic"
                        target="_blank"
                        className="block px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        Test One-Time Diagnostic Checkout
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">AI Readiness Tiers</h4>
                    <div className="space-y-2">
                      <a
                        href="/api/stripe/create-tier-checkout?tier=ai-readiness-advanced"
                        target="_blank"
                        className="block px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        Test AI Advanced Checkout
                      </a>
                      <a
                        href="/api/stripe/create-tier-checkout?tier=ai-readiness-comprehensive"
                        target="_blank"
                        className="block px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        Test AI Comprehensive Checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Access Links */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Access</h3>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link
                    href="/pricing"
                    className="text-center px-4 py-3 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  >
                    Organizational Pricing
                  </Link>
                  <Link
                    href="/ai-readiness/pricing"
                    className="text-center px-4 py-3 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  >
                    AI Readiness Pricing
                  </Link>
                  <Link
                    href="/admin/analytics"
                    className="text-center px-4 py-3 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  >
                    Analytics Dashboard
                  </Link>
                  <Link
                    href="/admin/testing"
                    className="text-center px-4 py-3 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  >
                    Algorithmic Testing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <FeatureFlagsAdmin />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Comprehensive administrative interface for NorthPath Strategies
        </p>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'assessments', label: 'Assessments' },
            { id: 'testing', label: 'Testing' },
            { id: 'settings', label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } py-2 px-1 text-sm font-medium`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminAuth>
      <AdminDashboardContent />
    </AdminAuth>
  );
}
