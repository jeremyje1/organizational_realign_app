'use client';

import React from 'react';
import { TourProvider, Tour, TourButton, TourStep } from '@/components/ui/onboarding-tour';

export default function TourDemoPage() {
  // Define your tour steps
  const tourSteps: TourStep[] = [
    {
      target: '#welcome-section',
      title: 'Welcome to NorthPath',
      content: (
        <p>
          Welcome to the NorthPath platform! This tour will guide you through the main features
          and help you get started quickly.
        </p>
      ),
      placement: 'bottom',
    },
    {
      target: '#dashboard-stats',
      title: 'Dashboard Statistics',
      content: (
        <p>
          Here you can see your key performance metrics at a glance. Track your progress and
          identify areas that need attention.
        </p>
      ),
      placement: 'bottom',
    },
    {
      target: '#recent-activities',
      title: 'Recent Activities',
      content: (
        <p>
          View your recent activities and actions. This section helps you stay updated on the
          latest changes and events within your organization.
        </p>
      ),
      placement: 'right',
    },
    {
      target: '#action-buttons',
      title: 'Quick Actions',
      content: (
        <p>
          These action buttons let you perform common tasks quickly. Use them to create new
          assessments, view reports, or invite team members.
        </p>
      ),
      placement: 'top',
    },
    {
      target: '#user-settings',
      title: 'User Settings',
      content: (
        <p>
          Access your profile settings, notification preferences, and account options here.
          You can also log out from this menu.
        </p>
      ),
      placement: 'left',
    }
  ];

  return (
    <TourProvider onComplete={() => console.log('Tour completed')} onSkip={() => console.log('Tour skipped')}>
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold">NorthPath Dashboard</h1>
          <div id="user-settings" className="relative">
            <button className="rounded-full bg-gray-200 p-2">
              <span className="font-bold">JD</span>
            </button>
          </div>
        </header>
        
        <section id="welcome-section" className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Welcome to Your Dashboard</h2>
          <p className="mb-4">
            Get started with NorthPath's organizational alignment tools and resources.
          </p>
          <TourButton>Start Guided Tour</TourButton>
        </section>
        
        <section id="dashboard-stats" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium text-gray-500">Assessments Completed</h3>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium text-gray-500">Team Alignment Score</h3>
            <p className="text-3xl font-bold">76%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium text-gray-500">Action Items</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section id="recent-activities" className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item} className="border-b pb-2">
                    <p className="font-medium">Assessment #{item} completed</p>
                    <p className="text-gray-500 text-sm">2 days ago</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          
          <div>
            <section className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div id="action-buttons" className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  New Assessment
                </button>
                <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                  Generate Report
                </button>
                <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                  Invite Team Member
                </button>
              </div>
            </section>
          </div>
        </div>
        
        {/* Register the tour with the defined steps */}
        <Tour steps={tourSteps} />
      </div>
    </TourProvider>
  );
}
