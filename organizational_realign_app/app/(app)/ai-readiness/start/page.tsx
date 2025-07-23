'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AIReadinessWizard } from '@/components/AIReadinessWizard';

export default function AIReadinessStartPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleAssessmentComplete = async (results: any) => {
    setIsProcessing(true);

    try {
      // Store results for now (in production, this would be sent to an API)
      sessionStorage.setItem('aiReadinessResults', JSON.stringify({
        ...results,
        completedAt: new Date().toISOString()
      }));

      // Redirect to results page
      router.push('/ai-readiness/results');
    } catch (error) {
      console.error('Error processing assessment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveProgress = (progress: any) => {
    // Auto-save progress to session storage
    sessionStorage.setItem('aiReadinessProgress', JSON.stringify(progress));
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">Processing Assessment</h2>
          <p className="text-slate-400">Analyzing your responses and generating insights...</p>
        </div>
      </div>
    );
  }

  return (
    <AIReadinessWizard
      onComplete={handleAssessmentComplete}
      onSave={handleSaveProgress}
      initialTeamMode={false}
    />
  );
}
