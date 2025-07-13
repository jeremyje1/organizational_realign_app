/**
 * Admin Dashboard Page
 * Main administrative interface with feature flag management
 * 
 * @version 1.0.0
 * @author NorthPath Strategies
 */

import React from 'react';
import { Metadata } from 'next';
import FeatureFlagsAdmin from '@/components/FeatureFlagsAdmin';
import { FeatureGate } from '@/components/FeatureGate';

export const metadata: Metadata = {
  title: 'Admin Dashboard | NorthPath Organizational Realignment',
  description: 'Administrative dashboard for managing enterprise features and system configuration',
  robots: 'noindex, nofollow'
};

export default function AdminDashboard() {
  // In a real app, these would come from authentication context
  const userTier = 'enterprise'; // Mock admin user as enterprise
  const userGroups = ['admin', 'enterprise'];
  const isAdmin = true;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage enterprise features, system configuration, and organizational data
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-blue-500 text-blue-600 py-2 px-1 text-sm font-medium">
              Feature Flags
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 text-sm font-medium">
              System Config
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 text-sm font-medium">
              Data Management
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 text-sm font-medium">
              User Management
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Feature Flags Section */}
          <FeatureFlagsAdmin
            userTier={userTier}
            userGroups={userGroups}
            isAdmin={isAdmin}
          />

          {/* Enterprise Features Quick Access */}
          <FeatureGate
            flag="AUDIT_LOGGING"
            userTier={userTier}
            userGroups={userGroups}
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Monitoring</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">System Health</p>
                      <p className="text-sm text-green-600">All systems operational</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Active Users</p>
                      <p className="text-sm text-blue-600">147 online</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-800">API Requests</p>
                      <p className="text-sm text-purple-600">2.4K today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FeatureGate>

          {/* Monte Carlo Simulation Admin */}
          <FeatureGate
            flag="MONTE_CARLO_SIMULATION"
            userTier={userTier}
            userGroups={userGroups}
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Monte Carlo Simulation Management</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Simulation Queue</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <span className="text-sm font-medium text-yellow-800">Engineering Dept Restructure</span>
                      <span className="text-xs text-yellow-600">Running</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-sm font-medium text-gray-800">Marketing Team Optimization</span>
                      <span className="text-xs text-gray-600">Queued</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Simulation Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Simulations</span>
                      <span className="text-sm font-medium text-gray-900">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Processing Time</span>
                      <span className="text-sm font-medium text-gray-900">3.2 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="text-sm font-medium text-green-600">98.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FeatureGate>

          {/* ERP Integration Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FeatureGate
              flag="BANNER_ERP_INTEGRATION"
              userTier={userTier}
              userGroups={userGroups}
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Banner ERP Integration</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Connection Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Last Sync</span>
                    <span className="text-xs text-gray-600">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Records Synced</span>
                    <span className="text-xs text-gray-600">45,231</span>
                  </div>
                </div>
              </div>
            </FeatureGate>

            <FeatureGate
              flag="WORKDAY_ENHANCED"
              userTier={userTier}
              userGroups={userGroups}
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Workday Integration</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Connection Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Last Sync</span>
                    <span className="text-xs text-gray-600">1 hour ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Records Synced</span>
                    <span className="text-xs text-gray-600">32,847</span>
                  </div>
                </div>
              </div>
            </FeatureGate>
          </div>
        </div>
      </div>
    </div>
  );
}
