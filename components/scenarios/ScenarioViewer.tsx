'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ScenarioResults {
  organizationalHealth: number;
  aiReadinessScore: number;
  redundancyIndex: number;
  topRecommendations: Array<{
    title: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    expectedROI: number;
  }>;
  insights: Array<{
    type: string;
    impact: number;
    description: string;
  }>;
}

export function ScenarioViewer() {
  const [results, setResults] = useState<ScenarioResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock results for demonstration
  const mockResults: ScenarioResults = useMemo(() => ({
    organizationalHealth: 72,
    aiReadinessScore: 68,
    redundancyIndex: 34,
    topRecommendations: [
      {
        title: "Implement AI Automation in Finance",
        priority: "high",
        expectedROI: 35
      },
      {
        title: "Consolidate Student Services",
        priority: "medium",
        expectedROI: 22
      },
      {
        title: "Upgrade IT Infrastructure",
        priority: "high",
        expectedROI: 28
      }
    ],
    insights: [
      {
        type: "efficiency",
        impact: 85,
        description: "Technology investment will significantly improve operational efficiency"
      },
      {
        type: "ai_opportunity",
        impact: 78,
        description: "High potential for AI automation in administrative processes"
      }
    ]
  }), []);

  useEffect(() => {
    // Simulate loading and show mock results
    setIsLoading(true);
    setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);
  }, [mockResults]); // Added mockResults to dependency array

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing Scenario...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Running scenario analysis...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Scenario Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Adjust scenario parameters and click &quot;Run Analysis&quot; to see projected results.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Projected Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Organizational Health</span>
              <span className="font-bold">{results.organizationalHealth}%</span>
            </div>
            <Progress value={results.organizationalHealth} className="w-full" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">AI Readiness Score</span>
              <span className="font-bold">{results.aiReadinessScore}%</span>
            </div>
            <Progress value={results.aiReadinessScore} className="w-full" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Redundancy Reduction</span>
              <span className="font-bold">{100 - results.redundancyIndex}%</span>
            </div>
            <Progress value={100 - results.redundancyIndex} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Top Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.topRecommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge className={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                  <span className="font-medium">{rec.title}</span>
                </div>
                <span className="text-sm font-bold text-green-600">+{rec.expectedROI}% ROI</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.insights.map((insight, index) => (
              <div key={index} className="p-3 border-l-4 border-blue-500 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{insight.type.replace('_', ' ')}</span>
                  <Badge variant="outline">{insight.impact}% Impact</Badge>
                </div>
                <p className="text-sm text-gray-700">{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
