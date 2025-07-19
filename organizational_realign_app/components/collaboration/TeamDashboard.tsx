// Placeholder TeamDashboard component
import React from 'react';

interface TeamDashboardProps {
  userId: string;
}

export function TeamDashboard({ userId }: TeamDashboardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Team Dashboard</h2>
      <p className="text-gray-600">
        Team collaboration features coming soon. User ID: {userId}
      </p>
    </div>
  );
}
