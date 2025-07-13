'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AssessmentPage() {
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier');

  useEffect(() => {
    // If coming from a payment success, redirect to tier-specific start
    if (tier) {
      window.location.href = `/assessment/start?tier=${tier}`;
    } else {
      // Otherwise, show the onboarding page
      window.location.href = '/assessment/onboarding';
    }
  }, [tier]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to assessment...</p>
      </div>
    </div>
  );
}
