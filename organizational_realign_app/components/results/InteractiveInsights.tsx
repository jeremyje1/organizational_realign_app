"use client";

import { useState } from 'react';
import { EnhancedChart } from '../charts/EnhancedChart';
import { 
  TrendingUp, Target, AlertTriangle, 
  CheckCircle, Zap, Download, Share2, Maximize2 
} from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'risk' | 'strength' | 'recommendation';
  priority: 'high' | 'medium' | 'low';
  impact: number; // 1-5 scale
  effort: number; // 1-5 scale
  category: string;
  metrics?: {
    current: number;
    target: number;
    unit: string;
  };
}

interface Props {
  analysisData: any;
  sectionData: any[];
  insights: Insight[];
}

export function InteractiveInsights({ analysisData: _analysisData, sectionData, insights }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(insights.map(i => i.category)))];
  const priorities = ['all', 'high', 'medium', 'low'];

  const filteredInsights = insights.filter(insight => {
    const categoryMatch = selectedCategory === 'all' || insight.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || insight.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-5 w-5 text-emerald-400" />;
      case 'risk': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'strength': return <CheckCircle className="h-5 w-5 text-blue-400" />;
      case 'recommendation': return <Target className="h-5 w-5 text-purple-400" />;
      default: return <Zap className="h-5 w-5 text-slate-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'medium': return 'text-amber-400 bg-amber-900/20 border-amber-500/30';
      case 'low': return 'text-emerald-400 bg-emerald-900/20 border-emerald-500/30';
      default: return 'text-slate-400 bg-slate-800/20 border-slate-600/30';
    }
  };

  const getImpactEffortQuadrant = (impact: number, effort: number) => {
    if (impact >= 4 && effort <= 2) return { label: 'Quick Wins', color: 'emerald' };
    if (impact >= 4 && effort >= 4) return { label: 'Major Projects', color: 'blue' };
    if (impact <= 2 && effort <= 2) return { label: 'Fill-ins', color: 'slate' };
    return { label: 'Questionable', color: 'amber' };
  };

  // Transform section data for charts
  const sectionScores = sectionData.map(section => ({
    name: section.name.split(' ').slice(0, 2).join(' '), // Shorten names
    value: section.averageScore,
    target: 4.0,
    status: (section.averageScore >= 4 ? 'excellent' : 
            section.averageScore >= 3 ? 'good' : 
            section.averageScore >= 2 ? 'needs-improvement' : 'critical') as 'excellent' | 'good' | 'needs-improvement' | 'critical'
  }));

  const priorityDistribution = [
    { name: 'High Priority', value: insights.filter(i => i.priority === 'high').length, status: 'critical' as const },
    { name: 'Medium Priority', value: insights.filter(i => i.priority === 'medium').length, status: 'needs-improvement' as const },
    { name: 'Low Priority', value: insights.filter(i => i.priority === 'low').length, status: 'good' as const }
  ];

  const _impactEffortData = insights.map(insight => ({
    name: insight.title.substring(0, 20) + '...',
    value: insight.impact,
    effort: insight.effort,
    quadrant: getImpactEffortQuadrant(insight.impact, insight.effort)
  }));

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-100">Strategic Insights</h2>
            <p className="text-sm text-slate-400">
              {filteredInsights.length} of {insights.length} insights shown
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-700/30 rounded-lg p-1">
              {['overview', 'detailed', 'recommendations'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    viewMode === mode
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {/* Filters */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-lg transition-colors">
                <Download className="h-4 w-4 text-slate-300" />
              </button>
              <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 rounded-lg transition-colors">
                <Share2 className="h-4 w-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnhancedChart
            data={sectionScores}
            type="bar"
            title="Section Performance"
            description="Average scores across organizational areas"
            showTarget={true}
            colorScheme="purple"
          />
          
          <EnhancedChart
            data={priorityDistribution}
            type="pie"
            title="Insight Priority Distribution"
            description="Breakdown of insights by priority level"
            colorScheme="amber"
          />

          <EnhancedChart
            data={sectionScores}
            type="radar"
            title="Organizational Maturity"
            description="Multi-dimensional view of capabilities"
            colorScheme="emerald"
          />

          <div className="card p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-100">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-lg">
                <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-emerald-300">
                  {insights.filter(i => i.type === 'strength').length}
                </div>
                <div className="text-sm text-emerald-200">Strengths</div>
              </div>
              
              <div className="text-center p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-300">
                  {insights.filter(i => i.type === 'opportunity').length}
                </div>
                <div className="text-sm text-purple-200">Opportunities</div>
              </div>
              
              <div className="text-center p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-300">
                  {insights.filter(i => i.type === 'risk').length}
                </div>
                <div className="text-sm text-red-200">Risks</div>
              </div>
              
              <div className="text-center p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-300">
                  {insights.filter(i => i.priority === 'high').length}
                </div>
                <div className="text-sm text-blue-200">High Priority</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Mode */}
      {viewMode === 'detailed' && (
        <div className="space-y-4">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getInsightIcon(insight.type)}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-slate-100">{insight.title}</h3>
                    <p className="text-sm text-slate-300">{insight.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(insight.priority)}`}>
                    {insight.priority.toUpperCase()}
                  </span>
                  <button
                    onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                    className="p-1 hover:bg-slate-700/50 rounded transition-colors"
                  >
                    <Maximize2 className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-slate-200">{insight.impact}/5</div>
                  <div className="text-xs text-slate-400">Impact</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-slate-200">{insight.effort}/5</div>
                  <div className="text-xs text-slate-400">Effort</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-medium ${
                    getImpactEffortQuadrant(insight.impact, insight.effort).color === 'emerald' ? 'text-emerald-400' :
                    getImpactEffortQuadrant(insight.impact, insight.effort).color === 'blue' ? 'text-blue-400' :
                    getImpactEffortQuadrant(insight.impact, insight.effort).color === 'amber' ? 'text-amber-400' :
                    'text-slate-400'
                  }`}>
                    {getImpactEffortQuadrant(insight.impact, insight.effort).label}
                  </div>
                  <div className="text-xs text-slate-400">Quadrant</div>
                </div>
              </div>

              {insight.metrics && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Current Performance</span>
                    <span className="text-sm font-medium text-slate-200">
                      {insight.metrics.current} {insight.metrics.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-slate-300">Target</span>
                    <span className="text-sm font-medium text-purple-300">
                      {insight.metrics.target} {insight.metrics.unit}
                    </span>
                  </div>
                  <div className="mt-2 bg-slate-600/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((insight.metrics.current / insight.metrics.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Recommendations Mode */}
      {viewMode === 'recommendations' && (
        <div className="space-y-6">
          {/* Quick Wins */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Wins (High Impact, Low Effort)
            </h3>
            <div className="space-y-3">
              {insights
                .filter(i => i.impact >= 4 && i.effort <= 2)
                .map(insight => (
                  <div key={insight.id} className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-lg">
                    <span className="text-slate-200">{insight.title}</span>
                    <span className="text-sm text-emerald-300">{insight.category}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Major Projects */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Major Projects (High Impact, High Effort)
            </h3>
            <div className="space-y-3">
              {insights
                .filter(i => i.impact >= 4 && i.effort >= 4)
                .map(insight => (
                  <div key={insight.id} className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                    <span className="text-slate-200">{insight.title}</span>
                    <span className="text-sm text-blue-300">{insight.category}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Risk Mitigation */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Mitigation
            </h3>
            <div className="space-y-3">
              {insights
                .filter(i => i.type === 'risk')
                .sort((a, b) => b.impact - a.impact)
                .map(insight => (
                  <div key={insight.id} className="flex items-center justify-between p-3 bg-red-500/10 border border-red-400/30 rounded-lg">
                    <span className="text-slate-200">{insight.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-red-300">{insight.category}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(insight.priority)}`}>
                        {insight.priority}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
