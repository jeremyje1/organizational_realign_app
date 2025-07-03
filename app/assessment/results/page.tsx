'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PublicNavigation from '@/components/PublicNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  Calendar,
  BarChart3,
  Target,
  Zap,
  Brain,
  Shield,
  Award
} from 'lucide-react';

interface AnalysisResults {
  sessionId: string;
  organizationType: string;
  assessmentId: string;
  dschScore: number;
  crfScore: number;
  leiScore: number;
  overallScore: number;
  recommendations: Array<{
    category: string;
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impact: string;
  }>;
  completedAt: string;
}

function AssessmentResultsContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const assessmentId = searchParams.get('assessmentId');
  
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [_error, _setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, we would fetch results from an API
    // For now, we'll simulate the results
    const simulateResults = () => {
      setTimeout(() => {
        const mockResults: AnalysisResults = {
          sessionId: sessionId || 'demo',
          organizationType: 'Community College',
          assessmentId: assessmentId || `NP-${Date.now()}`,
          dschScore: 78,
          crfScore: 85,
          leiScore: 72,
          overallScore: 78,
          recommendations: [
            {
              category: 'Dynamic Span-of-Control',
              priority: 'high',
              title: 'Optimize Management Structure',
              description: 'Reduce management layers from 7 to 5 levels to improve communication flow and decision-making speed.',
              impact: 'Cost savings of $180K annually + 25% faster decision cycles'
            },
            {
              category: 'Cultural Resilience',
              priority: 'medium',
              title: 'Enhance Cross-Department Collaboration',
              description: 'Implement matrix reporting structure for key strategic projects and initiatives.',
              impact: 'Improved project delivery success rate by 25%'
            },
            {
              category: 'License Efficiency',
              priority: 'high',
              title: 'Consolidate Software Licenses',
              description: 'Audit and consolidate overlapping software subscriptions and unutilized licenses.',
              impact: 'Immediate savings of $45K annually'
            },
            {
              category: 'Process Optimization',
              priority: 'medium',
              title: 'Automate Routine Administrative Tasks',
              description: 'Implement workflow automation for student registration, grade processing, and scheduling.',
              impact: 'Free up 15 hours/week of staff time'
            }
          ],
          completedAt: new Date().toISOString()
        };
        
        setResults(mockResults);
        setLoading(false);
      }, 2000);
    };

    simulateResults();
  }, [sessionId, assessmentId]);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500/20 border-emerald-400/30';
    if (score >= 70) return 'bg-amber-500/20 border-amber-400/30';
    return 'bg-red-500/20 border-red-400/30';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-200 border-red-400/30';
      case 'medium': return 'bg-amber-500/20 text-amber-200 border-amber-400/30';
      case 'low': return 'bg-blue-500/20 text-blue-200 border-blue-400/30';
      default: return 'bg-slate-500/20 text-slate-200 border-slate-400/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <div className="card p-12 text-center max-w-lg animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
          </div>
          <h2 className="text-2xl font-semibold text-slate-100 mb-4">Analyzing Your Organization</h2>
          <p className="text-slate-300 mb-4">
            Our proprietary algorithms are processing your responses...
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <Brain className="h-4 w-4 text-purple-400" />
              <span>Running Dynamic Span-of-Control Heuristic (DSCH)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              <span>Calculating Cultural Resilience Factor (CRF)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Computing License Efficiency Index (LEI)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (_error || !results) {
    return (
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <div className="card p-12 text-center max-w-lg">
          <AlertTriangle className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-slate-100 mb-4">Results Error</h2>
          <p className="text-slate-300 mb-6">
            Unable to load your assessment results. Please try again or contact support.
          </p>
          <Button onClick={() => window.location.href = '/assessment/start'}>
            Return to Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen elegant-bg">
      <PublicNavigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            NorthPath Assessment Results
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Assessment ID: {results.assessmentId}
          </p>
          <p className="text-slate-400">
            {results.organizationType} • Completed {new Date(results.completedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Overall Score */}
        <div className="mb-12 animate-slide-up">
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-slate-100 mb-2">
                Overall Optimization Score
              </CardTitle>
              <div className="text-6xl font-bold text-purple-300 mb-4">
                {results.overallScore}
              </div>
              <CardDescription className="text-lg text-slate-300">
                Your organization shows {results.overallScore >= 80 ? 'excellent' : results.overallScore >= 70 ? 'good' : 'significant'} potential for optimization across all measured dimensions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Algorithm Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <Card className={getScoreBgColor(results.dschScore)}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-slate-100">DSCH Score</CardTitle>
              <CardDescription className="text-slate-300">Dynamic Span-of-Control Heuristic</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.dschScore)}`}>
                {results.dschScore}
              </div>
              <p className="text-sm text-slate-400">
                Management structure efficiency and communication flow optimization
              </p>
            </CardContent>
          </Card>

          <Card className={getScoreBgColor(results.crfScore)}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-slate-100">CRF Score</CardTitle>
              <CardDescription className="text-slate-300">Cultural Resilience Factor</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.crfScore)}`}>
                {results.crfScore}
              </div>
              <p className="text-sm text-slate-400">
                Organizational adaptability and change management capacity
              </p>
            </CardContent>
          </Card>

          <Card className={getScoreBgColor(results.leiScore)}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-slate-100">LEI Score</CardTitle>
              <CardDescription className="text-slate-300">License Efficiency Index</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.leiScore)}`}>
                {results.leiScore}
              </div>
              <p className="text-sm text-slate-400">
                Resource allocation and technology utilization optimization
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-400" />
            Prioritized Recommendations
          </h2>
          
          <div className="space-y-6">
            {results.recommendations.map((rec, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-600/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority.toUpperCase()} PRIORITY
                        </span>
                        <span className="text-sm text-slate-400">{rec.category}</span>
                      </div>
                      <CardTitle className="text-slate-100 text-lg">
                        {rec.title}
                      </CardTitle>
                    </div>
                    <TrendingUp className="h-5 w-5 text-emerald-400 flex-shrink-0 ml-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-3">
                    {rec.description}
                  </p>
                  <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-emerald-200">
                      <BarChart3 className="h-4 w-4" />
                      <span className="font-medium">Expected Impact:</span>
                    </div>
                    <p className="text-emerald-100 mt-1">{rec.impact}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6 animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
            
            <Button 
              variant="outline"
              className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50"
              onClick={() => window.location.href = '/contact'}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Consultation
            </Button>
            
            <Button 
              variant="outline"
              className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50"
              onClick={() => window.location.href = '/'}
            >
              Return to Homepage
            </Button>
          </div>
          
          <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-600/30">
            <h3 className="text-lg font-semibold text-slate-100 mb-3">Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Review detailed recommendations and implementation roadmap</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Schedule a consultation to discuss your optimization strategy</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Access our implementation toolkit and change management resources</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>Begin phased implementation with our expert guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading results...</p>
        </div>
      </div>
    }>
      <AssessmentResultsContent />
    </Suspense>
  );
}
