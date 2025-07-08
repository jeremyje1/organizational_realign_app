/**
 * Sample Reports Component - Showcases NorthPath Assessment Results
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Heart, GraduationCap, Eye } from 'lucide-react';

export default function SampleReports() {
  const reports = [
    {
      icon: Building2,
      title: "Community College",
      institution: "Mid-sized Community College",
      size: "7,200 FTE Students",
      tier: "Comprehensive Package ($3,999)",
      description: "Comprehensive organizational efficiency assessment revealing optimization opportunities across academic and administrative departments.",
      highlights: [
        "15% efficiency improvement identified",
        "Streamlined administrative processes",
        "Enhanced student services workflow",
        "Technology integration roadmap"
      ],
      reportFile: "/sample-reports/community-college",
      color: "blue"
    },
    {
      icon: Heart,
      title: "Regional Hospital",
      institution: "350-bed Healthcare Network",
      size: "4 Satellite Clinics",
      tier: "Comprehensive Package ($3,999)",
      description: "Full organizational assessment focusing on patient care efficiency, staff alignment, and operational optimization.",
      highlights: [
        "20% workflow optimization potential",
        "Enhanced patient care pathways", 
        "Staff role clarity improvements",
        "Technology integration strategy"
      ],
      reportFile: "/sample-reports/hospital",
      color: "emerald"
    },
    {
      icon: GraduationCap,
      title: "Public Research University",
      institution: "Research University",
      size: "22,000 Students, 14 Colleges",
      tier: "Enterprise Package ($8,999)",
      description: "Deep institutional analysis using 104-item diagnostic instrument across multiple schools and administrative divisions.",
      highlights: [
        "System-wide structural insights",
        "Multi-campus coordination strategy",
        "Research-academic alignment plan",
        "Institutional benchmarking data"
      ],
      reportFile: "/sample-reports/university",
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          icon: 'bg-blue-100 text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50',
          icon: 'bg-emerald-100 text-emerald-600',
          button: 'bg-emerald-600 hover:bg-emerald-700'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'bg-purple-100 text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'bg-gray-100 text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {reports.map((report, index) => {
        const colors = getColorClasses(report.color);
        return (
          <div key={index} className={`${colors.bg} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100`}>
            {/* Icon & Header */}
            <div className="flex items-start space-x-4 mb-6">
              <div className={`w-16 h-16 ${colors.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <report.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{report.title}</h3>
                <p className="text-sm text-gray-600">{report.institution}</p>
                <p className="text-xs text-gray-500">{report.size}</p>
              </div>
            </div>

            {/* Assessment Tier */}
            <div className="bg-white/70 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-gray-700">{report.tier}</p>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{report.description}</p>

            {/* Key Highlights */}
            <ul className="space-y-2 mb-6">
              {report.highlights.map((highlight, highlightIndex) => (
                <li key={highlightIndex} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">{highlight}</span>
                </li>
              ))}
            </ul>

            {/* View Report Button */}
            <Button asChild className={`w-full ${colors.button} text-white`}>
              <Link href={report.reportFile}>
                <Eye className="w-4 h-4 mr-2" />
                View Sample Report
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
