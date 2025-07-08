import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Brain, 
  Target,
  Clock,
  DollarSign,
  Lightbulb,
  Zap,
  Download,
  Share2,
  MessageSquare,
  Activity
} from 'lucide-react';
import {
  SectionScoresChart,
  AIReadinessRadar,
  TransformationPriorityMatrix,
  ImplementationTimeline,
  OrganizationalHealthMetrics,
  RiskAssessmentChart
} from '../charts/DataVisualization';

interface AnalysisResultsProps {
  analysis: {
    organizationalHealth: number;
    aiReadinessScore: number;
    redundancyIndex: number;
    recommendations: Array<{
      priority: 'critical' | 'high' | 'medium' | 'low';
      category: string;
      section: string;
      title: string;
      description: string;
      expectedROI: number;
      timeToImplement: number;
      riskLevel: number;
      aiOpportunity?: {
        automationPotential: number;
        toolsRequired: string[];
        implementationCost: number;
      };
    }>;
    insights: Array<{
      type: string;
      impact: number;
      confidence: number;
      description: string;
      affectedSections: string[];
    }>;
    transformationRoadmap: Array<{
      phase: number;
      name: string;
      duration: number;
      recommendations: any[];
      expectedImpact: string;
    }>;
    executiveSummary: {
      organizationalHealth: {
        score: number;
        status: string;
        description: string;
      };
      aiReadiness: {
        score: number;
        level: string;
        description: string;
      };
      redundancyAssessment: {
        index: number;
        description: string;
      };
      actionRequired: {
        critical: number;
        high: number;
        description: string;
      };
    };
    sectionsAnalysis: Array<{
      section: string;
      averageScore: number;
      performance: string;
      consistency: number;
      strengthAreas: number;
      improvementAreas: number;
      totalQuestions: number;
    }>;
    aiImplementationPlan: {
      totalOpportunities: number;
      quickWins: any[];
      strategicInitiatives: any[];
      prioritizedRoadmap: any[];
    };
    methodology: string;
    generatedAt: string;
  };
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { executiveSummary, recommendations, insights, transformationRoadmap, sectionsAnalysis, aiImplementationPlan } = analysis;

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/api/reports/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `organizational-analysis-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('PDF download failed:', error);
    }
  };

  // Prepare data for visualizations
  const sectionScores = sectionsAnalysis.map(section => ({
    section: section.section,
    currentScore: section.averageScore,
    targetScore: Math.min(section.averageScore + (section.improvementAreas * 10), 100),
    consistency: section.consistency
  }));

  const aiReadinessData = [
    { dimension: 'Technology Infrastructure', currentLevel: executiveSummary.aiReadiness.score * 0.8, targetLevel: 85 },
    { dimension: 'Data Governance', currentLevel: executiveSummary.aiReadiness.score * 0.9, targetLevel: 80 },
    { dimension: 'Skills & Training', currentLevel: executiveSummary.aiReadiness.score * 0.7, targetLevel: 90 },
    { dimension: 'Change Management', currentLevel: executiveSummary.aiReadiness.score * 0.6, targetLevel: 75 },
    { dimension: 'Leadership Support', currentLevel: executiveSummary.aiReadiness.score * 1.1, targetLevel: 95 },
    { dimension: 'Ethical Framework', currentLevel: executiveSummary.aiReadiness.score * 0.5, targetLevel: 70 }
  ];

  const departmentPriorities = sectionsAnalysis.map(section => ({
    name: section.section,
    aiReadiness: section.averageScore,
    transformationPriority: 100 - section.consistency,
    impact: section.strengthAreas + section.improvementAreas
  }));

  const implementationPhases = transformationRoadmap.map(phase => ({
    name: phase.name,
    duration: phase.duration,
    effort: phase.recommendations.length * 10,
    risk: Math.random() * 30 + 20 // Mock risk data
  }));

  const organizationalMetrics = {
    efficiency: { score: executiveSummary.organizationalHealth.score, trend: 'up', change: 12, benchmark: 75 },
    agility: { score: executiveSummary.aiReadiness.score, trend: 'up', change: 8, benchmark: 68 },
    innovation: { score: Math.round(analysis.aiReadinessScore * 0.9), trend: 'up', change: 15, benchmark: 62 },
    resilience: { score: Math.round(100 - analysis.redundancyIndex), trend: 'down', change: -3, benchmark: 72 }
  };

  const riskData = [
    { category: 'Technology', probability: 30, impact: 80 },
    { category: 'Change Management', probability: 60, impact: 70 },
    { category: 'Resource Allocation', probability: 40, impact: 60 },
    { category: 'Skills Gap', probability: 70, impact: 50 },
    { category: 'Compliance', probability: 20, impact: 90 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-np-warning-orange';
      case 'medium': return 'bg-np-gold';
      case 'low': return 'bg-np-primary-blue';
      default: return 'bg-np-warm-gray';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Excellent': return 'text-np-success-green';
      case 'Good': return 'text-np-bright-blue';
      case 'Fair': return 'text-np-gold';
      case 'Needs Improvement': return 'text-np-warning-orange';
      case 'Critical': return 'text-red-600';
      default: return 'text-np-warm-gray';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizational Realignment Analysis</h1>
          <p className="text-gray-600 mt-2">AI-Powered Assessment & Strategic Recommendations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Analysis
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Add Comment
          </Button>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizational Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executiveSummary.organizationalHealth.score}%</div>
            <p className="text-xs text-muted-foreground">
              {executiveSummary.organizationalHealth.status}
            </p>
            <Progress value={executiveSummary.organizationalHealth.score} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Readiness</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executiveSummary.aiReadiness.score}%</div>
            <p className="text-xs text-muted-foreground">
              {executiveSummary.aiReadiness.level}
            </p>
            <Progress value={executiveSummary.aiReadiness.score} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Index</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(100 - analysis.redundancyIndex)}%</div>
            <p className="text-xs text-muted-foreground">
              Redundancy: {analysis.redundancyIndex}%
            </p>
            <Progress value={100 - analysis.redundancyIndex} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executiveSummary.actionRequired.critical + executiveSummary.actionRequired.high}</div>
            <p className="text-xs text-muted-foreground">
              {executiveSummary.actionRequired.critical} Critical, {executiveSummary.actionRequired.high} High
            </p>
            <div className="flex gap-1 mt-2">
              <div className="h-2 bg-red-500 rounded flex-1" style={{ flexBasis: `${executiveSummary.actionRequired.critical * 10}%` }} />
              <div className="h-2 bg-orange-500 rounded flex-1" style={{ flexBasis: `${executiveSummary.actionRequired.high * 10}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="ai-plan">AI Strategy</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OrganizationalHealthMetrics metrics={organizationalMetrics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SectionScoresChart scores={sectionScores} />
            <AIReadinessRadar readiness={aiReadinessData} />
          </div>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {insights.slice(0, 3).map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <div className="mt-1">
                      <Badge variant="secondary">{insight.type}</Badge>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{insight.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Impact: {insight.impact}%</span>
                        <span>Confidence: {insight.confidence}%</span>
                        <div className="flex gap-1">
                          {insight.affectedSections.map(section => (
                            <Badge key={section} variant="outline" className="text-xs">
                              {section}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TransformationPriorityMatrix departments={departmentPriorities} />
            <RiskAssessmentChart risks={riskData} />
          </div>
          
          <ImplementationTimeline phases={implementationPhases} />

          {/* Section Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Section Performance Analysis</CardTitle>
              <CardDescription>Detailed breakdown by organizational section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectionsAnalysis.map((section, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{section.section}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className={getPerformanceColor(section.performance)}>
                          {section.performance}
                        </span>
                        <span>Consistency: {section.consistency}%</span>
                        <span>{section.totalQuestions} questions</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{section.averageScore}%</div>
                      <Progress value={section.averageScore} className="mt-1 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className="border-l-4" style={{ borderLeftColor: getPriorityColor(rec.priority).replace('bg-', '#') }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {rec.section} • {rec.category}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority}
                      </Badge>
                      {rec.aiOpportunity && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Brain className="h-3 w-3" />
                          AI
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{rec.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>ROI: {rec.expectedROI}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{rec.timeToImplement} months</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span>Risk: {rec.riskLevel}/10</span>
                    </div>
                    {rec.aiOpportunity && (
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span>Automation: {rec.aiOpportunity.automationPotential}%</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <div className="space-y-6">
            {transformationRoadmap.map((phase, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {phase.phase}
                    </div>
                    {phase.name}
                  </CardTitle>
                  <CardDescription>
                    Duration: {phase.duration} months • Expected Impact: {phase.expectedImpact}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {phase.recommendations.map((rec: any, recIndex: number) => (
                      <div key={recIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{rec.title || rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-plan" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Wins
                </CardTitle>
                <CardDescription>
                  {aiImplementationPlan.quickWins.length} immediate opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiImplementationPlan.quickWins.map((win: any, index: number) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900">{win.title}</h4>
                      <p className="text-sm text-green-700 mt-1">{win.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">ROI: {win.roi}%</Badge>
                        <Badge variant="outline">{win.timeframe}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Strategic Initiatives
                </CardTitle>
                <CardDescription>
                  {aiImplementationPlan.strategicInitiatives.length} long-term projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiImplementationPlan.strategicInitiatives.map((initiative: any, index: number) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">{initiative.title}</h4>
                      <p className="text-sm text-blue-700 mt-1">{initiative.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">Impact: {initiative.impact}</Badge>
                        <Badge variant="outline">{initiative.timeline}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Implementation Roadmap</CardTitle>
              <CardDescription>Prioritized sequence of AI initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiImplementationPlan.prioritizedRoadmap.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{item.priority}</div>
                      <div className="text-xs text-gray-500">{item.quarter}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <RiskAssessmentChart risks={riskData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  High-Risk Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskData.filter(risk => risk.probability * risk.impact > 3000).map((risk, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-900">{risk.category}</h4>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="destructive">Probability: {risk.probability}%</Badge>
                        <Badge variant="destructive">Impact: {risk.impact}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Mitigation Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Risk Management Framework</h4>
                    <p className="text-sm text-green-700 mt-1">Implement comprehensive risk assessment and mitigation protocols</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Change Management</h4>
                    <p className="text-sm text-green-700 mt-1">Structured approach to organizational change with stakeholder engagement</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Continuous Monitoring</h4>
                    <p className="text-sm text-green-700 mt-1">Regular assessment and adjustment of transformation initiatives</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pt-8 border-t">
        <p>Analysis generated on {new Date(analysis.generatedAt).toLocaleDateString()}</p>
        <p className="mt-1">Methodology: {analysis.methodology}</p>
      </div>
    </div>
  );
}
