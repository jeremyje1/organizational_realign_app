import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, GraduationCap, Download, Calendar, Users, DollarSign } from 'lucide-react';
import { PagesBackground } from '@/components/ui/pages-background';

export const metadata: Metadata = {
  title: 'Public Research University Assessment Sample Report - NorthPath Strategies',
  description: 'Sample organizational assessment report for a large public research university showing comprehensive institutional analysis.',
};

export default function UniversityReport() {
  return (
    <PagesBackground>
      <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-purple-600">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Sample Assessment Report</h1>
              <p className="text-gray-600">Public Research University Analysis</p>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Report Header */}
          <div className="bg-white rounded-xl p-8 mb-8 shadow-sm border">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Public Research University Assessment</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">July 5, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">22,000 Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Enterprise Package</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-purple-600 cursor-pointer hover:underline">Download PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
            <p className="text-purple-800 text-sm">
              <strong>Sample Report:</strong> This enterprise-level assessment demonstrates our most comprehensive 
              institutional analysis capabilities, designed for complex multi-division academic institutions.
            </p>
          </div>

          {/* Report Content */}
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <div className="prose prose-lg max-w-none">
              
              {/* Executive Summary */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h3>
              <p className="text-gray-700 mb-6">
                NorthPath Strategies performed a deep institutional analysis using our comprehensive 104-item diagnostic 
                instrument across this public research university serving 22,000 students through 14 distinct colleges 
                and schools. This enterprise-level assessment provides system-wide insights into organizational structure, 
                operational efficiency, and strategic alignment opportunities.
              </p>

              {/* Institutional Scope */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Institutional Scope & Complexity</h4>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">14</div>
                    <div className="text-sm text-gray-600">Colleges/Schools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">22,000</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">3,200</div>
                    <div className="text-sm text-gray-600">Faculty & Staff</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">$450M</div>
                    <div className="text-sm text-gray-600">Annual Budget</div>
                  </div>
                </div>
              </div>

              {/* Key Findings */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">System-Wide Key Findings</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Multi-Campus Coordination Gaps:</strong> Inconsistent policies and procedures across colleges creating operational inefficiencies.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Research-Academic Alignment:</strong> 28% misalignment between research initiatives and academic program delivery affecting resource optimization.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Administrative Redundancy:</strong> 15% overlap in administrative functions across divisions represents $12M annual optimization opportunity.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Technology Integration:</strong> Fragmented IT systems across colleges hindering data-driven decision making and student experience.</span>
                </li>
              </ul>

              {/* Institutional Complexity Index */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Institutional Complexity Index (ICI™)</h4>
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">9.1</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">Very High</div>
                    <div className="text-sm text-gray-600">Complexity Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">72%</div>
                    <div className="text-sm text-gray-600">Optimization Potential</div>
                  </div>
                </div>
              </div>

              {/* College-by-College Analysis */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Multi-Division Performance Analysis</h4>
              <div className="space-y-4 mb-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h5 className="font-semibold text-emerald-800 mb-2">High Performing Divisions (5 colleges)</h5>
                  <p className="text-sm text-emerald-700">Strong alignment between strategic goals and operational execution. These divisions serve as models for best practices.</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h5 className="font-semibold text-yellow-800 mb-2">Moderate Performance Divisions (6 colleges)</h5>
                  <p className="text-sm text-yellow-700">Good foundational structure with identified opportunities for process optimization and resource allocation improvements.</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-semibold text-red-800 mb-2">Optimization Priority Divisions (3 colleges)</h5>
                  <p className="text-sm text-red-700">Significant structural and process improvements needed. Priority focus areas for immediate intervention.</p>
                </div>
              </div>

              {/* Strategic Recommendations */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Strategic Transformation Roadmap</h4>
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-purple-600 pl-4">
                  <h5 className="font-semibold text-gray-900">1. Establish University-Wide Governance Framework</h5>
                  <p className="text-gray-700 text-sm">Create standardized policies and procedures across all colleges while maintaining academic autonomy and flexibility.</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h5 className="font-semibold text-gray-900">2. Implement Integrated Academic-Research Strategy</h5>
                  <p className="text-gray-700 text-sm">Align research initiatives with academic programs to enhance student experience and maximize resource utilization.</p>
                </div>
                <div className="border-l-4 border-emerald-600 pl-4">
                  <h5 className="font-semibold text-gray-900">3. Optimize Administrative Services Model</h5>
                  <p className="text-gray-700 text-sm">Consolidate redundant administrative functions while maintaining college-specific needs and responsiveness.</p>
                </div>
                <div className="border-l-4 border-orange-600 pl-4">
                  <h5 className="font-semibold text-gray-900">4. Deploy Integrated Technology Infrastructure</h5>
                  <p className="text-gray-700 text-sm">Standardize core systems while allowing division-specific tools to enhance collaboration and data accessibility.</p>
                </div>
              </div>

              {/* Implementation Timeline */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Implementation Timeline</h4>
              <div className="space-y-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h6 className="font-semibold text-gray-900">Phase 1 (Months 1-3): Foundation & Planning</h6>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Establish transformation governance committee</li>
                    <li>• Complete detailed division assessments</li>
                    <li>• Develop change management strategy</li>
                    <li>• Begin pilot programs in high-performing divisions</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h6 className="font-semibold text-gray-900">Phase 2 (Months 4-9): Implementation & Integration</h6>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Roll out governance framework university-wide</li>
                    <li>• Implement technology integration initiatives</li>
                    <li>• Begin administrative consolidation projects</li>
                    <li>• Launch academic-research alignment programs</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h6 className="font-semibold text-gray-900">Phase 3 (Months 10-12): Optimization & Measurement</h6>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Monitor performance metrics and adjust strategies</li>
                    <li>• Complete system integration and training</li>
                    <li>• Establish continuous improvement processes</li>
                    <li>• Plan for ongoing assessment and optimization</li>
                  </ul>
                </div>
              </div>

              {/* Expected Outcomes */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Projected Institutional Impact</h4>
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">$12M</div>
                    <div className="text-xs text-gray-600">Annual Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">25%</div>
                    <div className="text-xs text-gray-600">Process Efficiency Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">18%</div>
                    <div className="text-xs text-gray-600">Research-Teaching Alignment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">4.2</div>
                    <div className="text-xs text-gray-600">Student Satisfaction Increase</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="border-t pt-6 mt-8">
              <div className="text-center text-gray-600">
                <p className="mb-2"><strong>Prepared by:</strong> NorthPath AI Report Engine</p>
                <p><strong>Reviewed by:</strong> Jeremy Estrella, Founder & Systems Strategist</p>
                <p className="text-xs mt-2 text-gray-500">Enterprise assessment conducted with institutional research compliance and data privacy protocols</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-purple-50 rounded-xl p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Transform Your Institution at Scale</h3>
            <p className="text-gray-600 mb-6">Get enterprise-level assessment insights for complex multi-division organizations like yours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/pricing">
                  Get Enterprise Assessment
                  <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://calendly.com/jeremyestrella/30min">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
      </div>
    </PagesBackground>
  );
}
