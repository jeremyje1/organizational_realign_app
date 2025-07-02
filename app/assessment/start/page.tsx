'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Brain, 
  Target, 
  FileText,
  Settings,
  BarChart3,
  Lightbulb,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';
import PublicNavigation from '@/components/PublicNavigation';

interface AssessmentInfo {
  id: string;
  tier: string;
  status: string;
  instructions: string[];
}

function AssessmentStartContent() {
  const [assessment, setAssessment] = useState<AssessmentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchAssessment(sessionId);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const fetchAssessment = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/assessment/by-session/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setAssessment(data);
      }
    } catch (error) {
      console.error('Error fetching assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <div className="card p-12 text-center max-w-lg animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
          </div>
          <h2 className="text-2xl font-semibold text-slate-100 mb-4">Setting Up Your Assessment</h2>
          <p className="text-slate-300">Preparing your personalized organizational evaluation...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen elegant-bg">
        <PublicNavigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="card p-12 text-center max-w-lg animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-4">Assessment Not Found</h1>
            <p className="text-slate-300 mb-8">
              We couldn&apos;t find your assessment. Please check your email for instructions or contact support.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.href = '/pricing'}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                View Pricing Plans
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50"
              >
                Return Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getInstructionsByTier = (tier: string) => {
    const baseInstructions = [
      "Complete the comprehensive organizational assessment survey",
      "Answer all questions honestly and thoroughly for accurate results",
      "The assessment typically takes 45-90 minutes to complete",
      "You can save your progress and return to complete it later",
      "Once submitted, AI analysis will generate your professional report",
    ];

    const tierSpecificInstructions = {
      INDIVIDUAL: [],
      TEAM: [
        "Invite team members to collaborate on sections relevant to their areas",
        "Coordinate with your team to ensure comprehensive coverage",
        "Use the discussion features to align on responses",
      ],
      ENTERPRISE: [
        "Invite unlimited team members and external consultants",
        "Upload organizational charts and supporting documents",
        "Schedule your included 2-hour strategy consultation after completion",
      ],
    };

    return [...baseInstructions, ...(tierSpecificInstructions[tier as keyof typeof tierSpecificInstructions] || [])];
  };

  const assessmentAreas = [
    { name: 'Organizational Structure', icon: Target },
    { name: 'Role Definition & Redundancy', icon: Users },
    { name: 'Decision-Making Processes', icon: Settings },
    { name: 'Curriculum Planning', icon: FileText },
    { name: 'Course Scheduling', icon: Clock },
    { name: 'Technology Integration', icon: Zap },
    { name: 'Financial Operations', icon: TrendingUp },
    { name: 'Student Services', icon: Shield },
    { name: 'Faculty Relations', icon: Users },
    { name: 'External Relations', icon: Target },
    { name: 'AI Automation Opportunities', icon: Brain },
    { name: 'Cost-Saving Recommendations', icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen elegant-bg">
      <PublicNavigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 celebrate-icon">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Payment Successful!</h1>
          <p className="text-xl text-slate-300">
            Your <span className="text-emerald-400 font-semibold">{assessment.tier.toLowerCase()}</span> assessment is ready to begin.
          </p>
        </div>

        {/* Instructions Card */}
        <div className="card p-8 mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Getting Started</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              Welcome to your Organizational Realignment Assessment. This comprehensive evaluation 
              will analyze your institution&apos;s structure, identify inefficiencies, and provide 
              AI-powered recommendations for improvement.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-400" />
                Instructions
              </h3>
              <div className="grid gap-4">
                {getInstructionsByTier(assessment.tier).map((instruction, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-slate-200">{instruction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Areas */}
        <div className="card p-8 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-400" />
            Assessment Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="flex items-center p-4 bg-slate-800/30 border border-slate-600/30 rounded-lg hover:border-slate-500/50 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mr-3">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-slate-200 text-sm font-medium">{area.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="card p-8 mb-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-400" />
            What You&apos;ll Receive
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Brain className="h-6 w-6 text-purple-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-100">AI-Powered Analysis</h4>
                  <p className="text-slate-300 text-sm">Advanced algorithms analyze your responses for deep insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-100">Comprehensive Report</h4>
                  <p className="text-slate-300 text-sm">Detailed PDF with actionable recommendations</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-emerald-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-100">ROI Projections</h4>
                  <p className="text-slate-300 text-sm">Expected returns on recommended changes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-amber-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-100">Implementation Roadmap</h4>
                  <p className="text-slate-300 text-sm">Step-by-step guide to transformation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6 animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="space-y-4">
            <Button
              onClick={() => window.location.href = '/survey'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 btn-hover-lift"
            >
              Begin Assessment
            </Button>
            
            {assessment.tier !== 'INDIVIDUAL' && (
              <div>
                <Button
                  onClick={() => window.location.href = '/assessment/team'}
                  variant="outline"
                  className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 hover:border-slate-500/50 px-8 py-3 ml-4"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team Access
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/30">
            <p className="text-sm text-slate-400">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@northpathstrategies.org" className="text-purple-400 hover:text-purple-300 transition-colors">
                support@northpathstrategies.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentStartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading assessment...</p>
        </div>
      </div>
    }>
      <AssessmentStartContent />
    </Suspense>
  );
}