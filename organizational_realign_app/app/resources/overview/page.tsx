'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ResourceOverviewPage() {
  // Server-side redirect for better performance
  if (typeof window === 'undefined') {
    redirect('/downloads/NorthPath_Strategies_Profile.pdf');
  }
  
  // Client-side redirect for browsers
  useEffect(() => {
    window.location.href = '/downloads/NorthPath_Strategies_Profile.pdf';
  }, []);

  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Company Profile...</h1>
      <p>If you are not redirected automatically, please <a href="/downloads/NorthPath_Strategies_Profile.pdf" className="text-blue-600 underline">click here</a>.</p>
    </div>
  );
}
