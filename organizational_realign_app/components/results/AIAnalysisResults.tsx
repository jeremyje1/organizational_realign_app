'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  CheckCircle, 
  Brain, 
  Target,
  Clock,
  DollarSign,
  Lightbulb,
  Download,
  Share2,
  MessageSquare,
  Activity,
  BarChart3,
  Users,
  Shield,
  Cpu,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// Import the AI analysis types and language hooks
import type { AIAnalysisResult } from '@/lib/ai-analysis';
import { useTranslatedText, useTranslatedUI, useLanguage } from '@/hooks/useLanguage';

interface AIAnalysisResultsProps {
  analysis: AIAnalysisResult;
  isLoading?: boolean;
  onExportPDF?: () => void;
  onScheduleConsultation?: () => void;
  onShareResults?: () => void;
}

export function AIAnalysisResults({ 
  analysis, 
  isLoading = false,
  onExportPDF,
  onScheduleConsultation,
  onShareResults 
}: AIAnalysisResultsProps) {
  const [selectedPhase, setSelectedPhase] = useState<string>('immediate');
  const [expandedRecommendations, setExpandedRecommendations] = useState<Set<string>>(new Set());
  
  const { translateText } = useTranslatedText();
  const { translateUI } = useTranslatedUI();
  const { institutionType: _institutionType, getContext } = useLanguage();
  
  // Get industry-specific context
  const _industryContext = getContext();

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-slate-700/30 rounded-lg"></div>
        ))}
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const _getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'high': return 'text-amber-400 bg-amber-900/20 border-amber-500/30';
      case 'medium': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      default: return 'text-slate-400 bg-slate-900/20 border-slate-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'consolidation': return <Users className="h-4 w-4" />;
      case 'automation': return <Cpu className="h-4 w-4" />;
      case 'restructure': return <BarChart3 className="h-4 w-4" />;
      case 'investment': return <DollarSign className="h-4 w-4" />;
      case 'elimination': return <Target className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const toggleRecommendation = (id: string) => {
    const newExpanded = new Set(expandedRecommendations);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRecommendations(newExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-2">{translateUI('AI-Enhanced Analysis Results')}</h1>
          <p className="text-slate-400">{translateText('Comprehensive organizational assessment with strategic recommendations')}</p>
        </div>
        <div className="flex gap-3">
          {onExportPDF && (
            <Button onClick={onExportPDF} variant="outline" className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50">
              <Download className="h-4 w-4 mr-2" />
              {translateUI('Export PDF')}
            </Button>
          )}
          {onShareResults && (
            <Button onClick={onShareResults} variant="outline" className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50">
              <Share2 className="h-4 w-4 mr-2" />
              {translateUI('Share')}
            </Button>
          )}
          {onScheduleConsultation && (
            <Button onClick={onScheduleConsultation} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              {translateUI('Schedule Consultation')}
            </Button>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-400/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-200">
            <Brain className="h-5 w-5" />
            {translateUI('Executive Summary')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed mb-4">{translateText(analysis.executiveSummary)}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(analysis.organizationalHealth)}`}>
                {Math.round(analysis.organizationalHealth)}%
              </div>
              <div className="text-sm text-slate-400">{translateUI('Organizational Health')}</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(analysis.efficiencyScore)}`}>
                {Math.round(analysis.efficiencyScore)}%
              </div>
              <div className="text-sm text-slate-400">{translateUI('Efficiency Score')}</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(analysis.aiReadinessScore)}`}>
                {Math.round(analysis.aiReadinessScore)}%
              </div>
              <div className="text-sm text-slate-400">{translateUI('AI Readiness')}</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${analysis.redundancyIndex > 30 ? 'text-red-400' : analysis.redundancyIndex > 15 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {Math.round(analysis.redundancyIndex)}%
              </div>
              <div className="text-sm text-slate-400">{translateUI('Redundancy Index')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="findings" className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-6 bg-slate-800/50 border border-slate-600/50">
          <TabsTrigger value="findings" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-200">
            <Target className="h-4 w-4 mr-1" />
            {translateUI('Key Findings')}
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-200">
            <Lightbulb className="h-4 w-4 mr-1" />
            {translateUI('Recommendations')}
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-200">
            <Clock className="h-4 w-4 mr-1" />
            {translateUI('Roadmap')}
          </TabsTrigger>
          <TabsTrigger value="financial" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-200">
            <DollarSign className="h-4 w-4 mr-1" />
            {translateUI('Financial')}
          </TabsTrigger>
          <TabsTrigger value="benchmarks" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-200">
            <BarChart3 className="h-4 w-4 mr-1" />
            {translateUI('Benchmarks')}
          </TabsTrigger>
          <TabsTrigger value="risks" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-200">
            <Shield className="h-4 w-4 mr-1" />
            {translateUI('Risk Assessment')}
          </TabsTrigger>
        </TabsList>

        {/* Key Findings Tab */}
        <TabsContent value="findings" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  {translateUI('Key Findings')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.keyFindings.map((finding, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-slate-300 leading-relaxed">{translateText(finding)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organizational Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  {translateUI('Organizational Insights')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {analysis.insights.map((insight, index) => (
                    <div key={index} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {translateText(insight.type.replace('_', ' ').toUpperCase())}
                        </Badge>
                        <Badge variant={insight.impact >= 70 ? 'destructive' : insight.impact >= 40 ? 'secondary' : 'default'}>
                          {insight.impact >= 70 ? 'High Impact' : insight.impact >= 40 ? 'Medium Impact' : 'Low Impact'}
                        </Badge>
                      </div>
                      <p className="text-slate-300">{insight.description}</p>
                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Impact Score: </span>
                          <span className="text-slate-200">{insight.impact}/100</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Confidence: </span>
                          <span className="text-slate-200">{insight.confidence}/100</span>
                        </div>
                      </div>
                      {insight.affectedSections && insight.affectedSections.length > 0 && (
                        <div className="mt-2">
                          <div className="text-sm text-slate-400 mb-1">Affected Areas:</div>
                          <div className="flex flex-wrap gap-1">
                            {insight.affectedSections.map((section, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {section}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-4">
            {analysis.recommendations.map((rec, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleRecommendation(`rec-${index}`)}
                    className="w-full p-6 text-left hover:bg-slate-800/30 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(rec.category)}
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-100 mb-1">{rec.title}</h3>
                          <p className="text-sm text-slate-400">{rec.section}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-400">{rec.expectedROI}%</div>
                          <div className="text-xs text-slate-400">Expected ROI</div>
                        </div>
                      </div>
                      {expandedRecommendations.has(`rec-${index}`) ? (
                        <ChevronDown className="h-5 w-5 text-slate-400 ml-4" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-slate-400 ml-4" />
                      )}
                    </div>
                  </button>
                  
                  {expandedRecommendations.has(`rec-${index}`) && (
                    <div className="px-6 pb-6 border-t border-slate-700/50">
                      <div className="pt-4 space-y-4">
                        <p className="text-slate-300">{rec.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-slate-400 mb-1">Implementation Time</div>
                            <div className="font-medium text-slate-200">{rec.timeToImplement} months</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400 mb-1">Complexity</div>
                            <div className="flex items-center gap-2">
                              <Progress value={rec.implementationComplexity * 10} className="flex-1" />
                              <span className="text-sm text-slate-300">{rec.implementationComplexity}/10</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400 mb-1">Risk Level</div>
                            <div className="flex items-center gap-2">
                              <Progress value={rec.riskLevel * 10} className="flex-1" />
                              <span className="text-sm text-slate-300">{rec.riskLevel}/10</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400 mb-1">Category</div>
                            <Badge variant="outline" className="text-xs">
                              {rec.category}
                            </Badge>
                          </div>
                        </div>

                        {rec.dependencies.length > 0 && (
                          <div>
                            <div className="text-sm text-slate-400 mb-2">Dependencies</div>
                            <div className="flex flex-wrap gap-2">
                              {rec.dependencies.map((dep, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {dep}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {rec.aiOpportunity && (
                          <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Cpu className="h-4 w-4 text-blue-400" />
                              <span className="font-medium text-blue-300">AI Automation Opportunity</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <span className="text-slate-400">Automation Potential: </span>
                                <span className="text-blue-300">{rec.aiOpportunity.automationPotential}%</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Implementation Cost: </span>
                                <span className="text-blue-300">${rec.aiOpportunity.implementationCost.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Tools Required: </span>
                                <span className="text-blue-300">{rec.aiOpportunity.toolsRequired.join(', ')}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Implementation Roadmap Tab */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                Implementation Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Phase selector */}
                <div className="flex flex-wrap gap-2">
                  {analysis.implementationRoadmap.map((phase) => (
                    <button
                      key={phase.phase}
                      onClick={() => setSelectedPhase(phase.phase)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        selectedPhase === phase.phase
                          ? 'bg-purple-500/20 border-purple-400/50 text-purple-200'
                          : 'bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-600/40'
                      }`}
                    >
                      {phase.phase.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                      <span className="ml-2 text-xs">({phase.timeframe})</span>
                    </button>
                  ))}
                </div>

                {/* Selected phase details */}
                {analysis.implementationRoadmap
                  .filter(phase => phase.phase === selectedPhase)
                  .map((phase) => (
                    <div key={phase.phase} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Badge className={getPriorityColor(phase.priority)}>
                          {phase.priority} Priority
                        </Badge>
                        <span className="text-slate-400">Timeline: {phase.timeframe}</span>
                      </div>
                      
                      <div className="grid gap-4">
                        {phase.initiatives.map((initiative, index) => (
                          <div key={index} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-semibold text-slate-100">{initiative.title}</h4>
                              <div className="text-right">
                                <div className="font-bold text-emerald-400">{initiative.expectedROI}%</div>
                                <div className="text-xs text-slate-400">ROI</div>
                              </div>
                            </div>
                            <p className="text-slate-300 mb-3">{initiative.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-slate-400">Implementation Cost: </span>
                                <span className="text-slate-200">${initiative.implementationCost.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Risk Level: </span>
                                <div className="flex items-center gap-2 mt-1">
                                  <Progress value={initiative.riskLevel * 10} className="flex-1" />
                                  <span className="text-slate-300">{initiative.riskLevel}/10</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-slate-400">Expected ROI: </span>
                                <span className="text-emerald-400 font-medium">{initiative.expectedROI}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Analysis Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                  Cost-Benefit Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                      <div className="text-2xl font-bold text-red-400">
                        ${analysis.costBenefitAnalysis.totalImplementationCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-400">Total Implementation Cost</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-400">
                        ${analysis.costBenefitAnalysis.expectedAnnualSavings.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-400">Expected Annual Savings</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                      <div className="text-xl font-bold text-blue-400">
                        {analysis.costBenefitAnalysis.paybackPeriodMonths} months
                      </div>
                      <div className="text-sm text-slate-400">Payback Period</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                      <div className="text-xl font-bold text-purple-400">
                        {analysis.costBenefitAnalysis.fiveYearROI}%
                      </div>
                      <div className="text-sm text-slate-400">5-Year ROI</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-amber-400" />
                      <span className="font-medium text-amber-300">Risk-Adjusted ROI</span>
                    </div>
                    <div className="text-lg font-bold text-amber-300">
                      {analysis.costBenefitAnalysis.riskAdjustedROI}%
                    </div>
                    <div className="text-sm text-amber-400/70">
                      Accounts for implementation risks and market uncertainty
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((year) => {
                    const cumulativeSavings = analysis.costBenefitAnalysis.expectedAnnualSavings * year;
                    const netValue = cumulativeSavings - analysis.costBenefitAnalysis.totalImplementationCost;
                    const isPositive = netValue > 0;
                    
                    return (
                      <div key={year} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                        <span className="text-slate-300">Year {year}</span>
                        <div className="text-right">
                          <div className={`font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            ${Math.abs(netValue).toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-400">
                            {isPositive ? 'Net Gain' : 'Net Investment'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Benchmarks Tab */}
        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Industry Benchmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-6">{analysis.benchmarkComparison.peerComparison}</p>
              
              <div className="space-y-4">
                {analysis.benchmarkComparison.industryStandards.map((metric, index) => (
                  <div key={index} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-200">{metric.metric}</h4>
                      <Badge variant={metric.yourScore >= metric.industryAverage ? 'default' : 'secondary'}>
                        {metric.yourScore >= metric.industryAverage ? 'Above Average' : 'Below Average'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{metric.yourScore}</div>
                        <div className="text-slate-400">Your Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">{metric.industryAverage}</div>
                        <div className="text-slate-400">Industry Average</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-400">{metric.topPerformers}</div>
                        <div className="text-slate-400">Top Performers</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Performance Comparison</span>
                        <span>{Math.round((metric.yourScore / metric.topPerformers) * 100)}% of top performers</span>
                      </div>
                      <Progress value={(metric.yourScore / metric.topPerformers) * 100} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Risk Assessment & Mitigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-lg">
                  <h4 className="font-medium text-amber-300 mb-2">Overall Risk Assessment</h4>
                  <p className="text-slate-300">{analysis.riskAssessment}</p>
                </div>
                
                {/* Implementation Risk Breakdown */}
                <div className="grid gap-4">
                  <h4 className="font-medium text-slate-200">Implementation Risk Factors</h4>
                  
                  {[
                    { name: 'Technology Adoption', level: 3, description: 'Staff resistance to new technology platforms' },
                    { name: 'Change Management', level: 4, description: 'Organizational change fatigue and workflow disruption' },
                    { name: 'Budget Constraints', level: 2, description: 'Funding availability for recommended investments' },
                    { name: 'Timeline Pressure', level: 3, description: 'Compressed implementation schedules' },
                    { name: 'Stakeholder Buy-in', level: 2, description: 'Leadership and department alignment' }
                  ].map((risk, index) => (
                    <div key={index} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-200">{risk.name}</span>
                        <Badge className={
                          risk.level >= 4 ? 'text-red-400 bg-red-900/20 border-red-500/30' :
                          risk.level >= 3 ? 'text-amber-400 bg-amber-900/20 border-amber-500/30' :
                          'text-emerald-400 bg-emerald-900/20 border-emerald-500/30'
                        }>
                          {risk.level >= 4 ? 'High' : risk.level >= 3 ? 'Medium' : 'Low'} Risk
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{risk.description}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={risk.level * 20} className="flex-1" />
                        <span className="text-sm text-slate-300">{risk.level}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Ready to Transform Your Organization?</h3>
              <p className="text-slate-400">
                Get personalized guidance on implementing these recommendations with our strategic consultation services.
              </p>
            </div>
            <div className="flex gap-3">
              {onExportPDF && (
                <Button onClick={onExportPDF} variant="outline" className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              )}
              {onScheduleConsultation && (
                <Button onClick={onScheduleConsultation} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Schedule Strategy Session
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AIAnalysisResults;