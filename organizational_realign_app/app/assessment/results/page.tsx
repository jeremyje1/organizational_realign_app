'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
  Award
} from 'lucide-react';
import { calcScoreV21 } from '@/lib/algorithm/score';

function AssessmentResultsContent() {
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get('assessmentId');
  const segment = searchParams.get('segment') || 'HIGHER_ED';

  // Simulate fetching answers from API or localStorage
  const [answers, setAnswers] = useState<Record<string, number> | null>(null);
  const [algoResult, setAlgoResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [_error, _setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading answers (replace with real fetch)
    setTimeout(() => {
      setAnswers({
        'span_control_1': 2,
        'span_control_2': 3,
        'culture_1': 3,
        'culture_2': 3,
        'tech_fit_1': 2,
        'tech_fit_2': 3,
        'readiness_1': 3,
        'readiness_2': 3
      });
    }, 500);
  }, []);

  useEffect(() => {
    if (answers) {
      calcScoreV21({ answers, segment: segment as any }).then(setAlgoResult).finally(() => setLoading(false));
    }
  }, [answers, segment]);

  const _getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  const _getScoreBgColor = (score: number) => {
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

  if (loading || !algoResult) {
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
        </div>
      </div>
    );
  }

  if (_error || !algoResult) {
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
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
      <section className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-white drop-shadow-2xl mb-6 tracking-tight">
          Assessment Results
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 font-light mb-8">
          Your custom analysis and recommendations from <span className="font-semibold text-emerald-300">NorthPath Strategies</span>
        </p>
      </section>
      <section className="w-full max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 mb-16">
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
              Assessment ID: {assessmentId || 'N/A'}
            </p>
            <p className="text-slate-400">
              Segment: {segment}
            </p>
          </div>

          {/* v2.1 Algorithm Results */}
          <div className="mb-12 animate-slide-up">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/30">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-slate-100 mb-2">
                  v2.1 Optimization Score
                </CardTitle>
                <div className="text-6xl font-bold text-purple-300 mb-4">
                  {(algoResult.score * 100).toFixed(1)}
                </div>
                <CardDescription className="text-lg text-slate-300">
                  Tier: <span className="font-semibold text-emerald-400">{algoResult.tier}</span>
                  <br />
                  Confidence Interval: <span className="text-amber-400">±{(algoResult.ci * 100).toFixed(1)}%</span>
                  <br />
                  Peer Percentile: <span className="text-blue-400">{algoResult.peerPercentile.toFixed(0)}th</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Explainability Table */}
          <div className="mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-purple-400" />
              Score Explainability
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-slate-900/80 rounded-xl text-slate-200">
                <tbody>
                  {Object.entries(algoResult.explainability).map(([factor, explanation]) => (
                    <tr key={factor} className="border-b border-slate-700 last:border-0">
                      <td className="py-2 px-4 font-semibold text-slate-100 whitespace-nowrap">{factor}</td>
                      <td className="py-2 px-4 text-slate-300">{String(explanation)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-purple-400" />
              Prioritized Recommendations
            </h2>
            
            <div className="space-y-6">
              {algoResult.recommendations.map((rec: any, index: number) => (
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
            {/* Next Steps Card - fixed syntax and premium polish */}
            <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-600/30 shadow-lg shadow-purple-500/10 mt-8">
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
      </section>
      <footer className="w-full py-8 border-t-2 border-slate-800 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-center text-slate-400 text-xs font-serif shadow-inner mt-auto">
        <span>Organizational Realignment Tool v1.0 © {new Date().getFullYear()} NorthPath Strategies</span>
        <span className="mx-2">|</span>
        <a href="mailto:feedback@northpathstrategies.org" className="text-emerald-400 hover:underline font-medium">Send Feedback</a>
      </footer>
    </main>
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
