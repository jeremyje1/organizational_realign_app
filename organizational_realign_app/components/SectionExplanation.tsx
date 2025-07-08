/**
 * Section explanation component for survey sections
 */
'use client';

interface SectionExplanationProps {
  sectionName: string;
  className?: string;
}

export default function SectionExplanation({ sectionName, className = '' }: SectionExplanationProps) {
  const explanations: Record<string, { description: string; why: string }> = {
    'Algorithm Parameters': {
      description: 'Configure the optimization parameters for NorthPath\'s proprietary algorithms.',
      why: 'These settings calibrate DSCH (Dynamic Span-of-Control Heuristic) and CRF (Cultural Resilience Factor) calculations to match your organization\'s risk tolerance and objectives.'
    },
    'Organizational Structure & Role Alignment': {
      description: 'Analyze your current organizational hierarchy and role definitions.',
      why: 'Understanding span-of-control ratios and role clarity helps identify optimization opportunities and structural inefficiencies.'
    },
    'Decision‑Making & Governance': {
      description: 'Evaluate decision-making processes and governance structures.',
      why: 'Streamlined decision processes directly impact organizational agility and implementation speed of optimizations.'
    },
    'Process & Workflow Efficiency': {
      description: 'Assess operational processes and workflow bottlenecks.',
      why: 'Process mapping reveals redundancies and automation opportunities that complement structural changes.'
    },
    'Technology & AI Readiness': {
      description: 'Review technology infrastructure and AI implementation potential.',
      why: 'Technology capabilities determine which organizational changes can be automated or optimized through digital solutions.'
    },
    'Communication & Collaboration': {
      description: 'Analyze communication channels and collaboration effectiveness.',
      why: 'Strong communication systems are essential for successful organizational transitions and change management.'
    },
    'Data & Metrics': {
      description: 'Evaluate data governance and performance measurement systems.',
      why: 'Data-driven decision making enables continuous optimization and validates the impact of organizational changes.'
    },
    'Financial Health & ROI': {
      description: 'Assess financial performance and return on investment potential.',
      why: 'Financial metrics guide optimization priorities and measure the success of organizational realignment efforts.'
    },
    'Change Management & Readiness': {
      description: 'Measure organizational capacity for change and transformation.',
      why: 'Change readiness determines implementation timelines and the scope of viable organizational modifications.'
    }
  };

  const explanation = explanations[sectionName];
  if (!explanation) return null;

  return (
    <div className={`bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-md border border-slate-600/30 rounded-xl p-6 mb-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-slate-100 font-semibold text-lg">About This Section</h3>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <p className="text-slate-200 text-base leading-relaxed font-medium">
              {explanation.description}
            </p>
            <div className="bg-slate-800/50 rounded-lg p-3 border-l-4 border-blue-400/50">
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-blue-300 font-semibold">Why this matters:</strong> {explanation.why}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
