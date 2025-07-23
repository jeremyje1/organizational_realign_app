'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  TrendingUp, 
  Target, 
  Shield, 
  Brain, 
  Zap, 
  Users,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import type { AIReadinessResults } from '@/lib/aiReadinessEngine';

interface AssessmentData {
  institutionInfo: {
    name: string;
    type: string;
    enrollmentSize: string;
  };
  results: AIReadinessResults;
  timestamp: string;
}

export default function AIReadinessResultsPage() {
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedData = sessionStorage.getItem('aiReadinessResults');
    if (storedData) {
      setAssessmentData(JSON.parse(storedData));
    } else {
      // Redirect to start if no data
      router.push('/ai-readiness/start');
    }
  }, [router]);

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      // This would call the PDF generation API
      // For now, just simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would download the PDF
      console.log('Report generated');
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { institutionInfo, results } = assessmentData;
  const { scores, recommendations, maturityProfile } = results;

  const domainIcons: { [key: string]: any } = {
    strategy: Target,
    governance: Shield,
    pedagogy: Brain,
    technology: Zap,
    culture: Users
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const priorityIcons = {
    high: AlertTriangle,
    medium: Clock,
    low: CheckCircle
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Readiness Assessment Results
          </h1>
          <p className="text-lg text-gray-600">
            {institutionInfo.name} • {institutionInfo.type}
          </p>
          <Badge variant="secondary" className="mt-2">
            Enrollment: {institutionInfo.enrollmentSize}
          </Badge>
        </div>

        {/* Overall Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Overall AI Readiness Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-4xl font-bold text-blue-600">
                  {scores.overall.toFixed(1)}/5.0
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {maturityProfile.overall.name}
                </div>
                <p className="text-gray-600 mt-1">
                  {maturityProfile.overall.description}
                </p>
              </div>
              <div className="text-right">
                <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
                  <Download className="h-4 w-4 mr-2" />
                  {isGeneratingReport ? 'Generating...' : 'Download Report'}
                </Button>
              </div>
            </div>
            <Progress value={(scores.overall / 5) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Domain Scores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(scores.domains).map(([domainId, domainScore]) => {
            const Icon = domainIcons[domainId];
            const domainInfo = maturityProfile.domains[domainId];
            
            return (
              <Card key={domainId}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg capitalize">
                      {domainId.replace('_', ' ')}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {domainScore.score}/5.0
                      </span>
                      <Badge variant="outline">
                        {domainInfo.name}
                      </Badge>
                    </div>
                    <Progress value={domainScore.percentage} className="h-2" />
                    <p className="text-sm text-gray-600">
                      {domainScore.percentage}% - {domainInfo.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Recommendations</CardTitle>
            <CardDescription>
              Actionable steps to improve your AI readiness based on your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendations.map((rec, index) => {
                const PriorityIcon = priorityIcons[rec.priority];
                
                return (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${priorityColors[rec.priority]}`}>
                        <PriorityIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{rec.title}</h3>
                          <Badge variant="outline" className={priorityColors[rec.priority]}>
                            {rec.priority.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{rec.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Action Items:</h4>
                            <ul className="space-y-1">
                              {rec.actions.map((action, actionIndex) => (
                                <li key={actionIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="mb-3">
                              <h4 className="font-medium text-gray-900 mb-1">Timeline:</h4>
                              <p className="text-sm text-gray-600">{rec.timeline}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Resources Needed:</h4>
                              <ul className="space-y-1">
                                {rec.resources.map((resource, resourceIndex) => (
                                  <li key={resourceIndex} className="text-sm text-gray-600">
                                    • {resource}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Alert className="mt-8">
          <TrendingUp className="h-4 w-4" />
          <AlertDescription>
            <strong>Next Steps:</strong> Download your comprehensive report to share with stakeholders 
            and begin implementing the priority recommendations. Consider scheduling a consultation 
            session to develop a detailed implementation roadmap.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="text-center mt-8 space-x-4">
          <Button variant="outline" onClick={() => router.push('/ai-readiness')}>
            Take Another Assessment
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Schedule Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
