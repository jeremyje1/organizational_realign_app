import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, Download, Calendar, Users, DollarSign } from 'lucide-react';
import { PagesBackground } from '@/components/ui/pages-background';

export const metadata: Metadata = {
  title: 'Community College Assessment Sample Report - NorthPath Strategies',
  description: 'Sample organizational assessment report for a mid-sized community college showing comprehensive analysis and recommendations.',
};

export default function CommunityCollegeReport() {
  return (
    <PagesBackground>
      <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-blue-600">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Sample Assessment Report</h1>
              <p className="text-gray-600">Community College Organization Analysis</p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Report Header */}
          <div className="bg-white rounded-xl p-8 mb-8 shadow-sm border">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Community College Assessment Report</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">July 5, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">7,200 FTE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Comprehensive Package</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-blue-600 cursor-pointer hover:underline">Download PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800 text-sm">
              <strong>Sample Report:</strong> This is a demonstration of our comprehensive assessment output. 
              Actual reports are customized to each organization&apos;s specific data and context.
            </p>
          </div>

          {/* Report Content */}
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <div className="prose prose-lg max-w-none">
              
              {/* Executive Summary */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h3>
              <p className="text-gray-700 mb-6">
                NorthPath Strategies conducted a comprehensive organizational efficiency assessment for this mid-sized 
                community college serving 7,200 FTE students. Our analysis identified significant opportunities for 
                operational optimization, improved communication pathways, and enhanced student service delivery.
              </p>

              {/* Key Findings */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Findings</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>15% Efficiency Improvement Potential:</strong> Streamlining administrative processes could reduce processing time and improve student satisfaction.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Communication Gaps:</strong> Cross-departmental information flow needs optimization to reduce duplicated efforts.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Technology Integration:</strong> Opportunity to leverage existing systems more effectively for data-driven decision making.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Student Services Optimization:</strong> Reorganizing service touchpoints could improve student experience and retention.</span>
                </li>
              </ul>

              {/* Organizational Complexity Index */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Organizational Complexity Index (OCI™)</h4>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">7.2</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">Medium</div>
                    <div className="text-sm text-gray-600">Complexity Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">85%</div>
                    <div className="text-sm text-gray-600">Optimization Potential</div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Priority Recommendations</h4>
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h5 className="font-semibold text-gray-900">1. Implement Cross-Departmental Communication Protocol</h5>
                  <p className="text-gray-700 text-sm">Establish regular interdepartmental meetings and shared project management tools to reduce information silos.</p>
                </div>
                <div className="border-l-4 border-emerald-600 pl-4">
                  <h5 className="font-semibold text-gray-900">2. Streamline Student Services Workflow</h5>
                  <p className="text-gray-700 text-sm">Create centralized student service hub to reduce redundant processes and improve response times.</p>
                </div>
                <div className="border-l-4 border-orange-600 pl-4">
                  <h5 className="font-semibold text-gray-900">3. Optimize Technology Integration</h5>
                  <p className="text-gray-700 text-sm">Leverage existing systems for better data analytics and automated reporting capabilities.</p>
                </div>
              </div>

              {/* Next Steps */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Recommended Next Steps</h4>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                <li className="text-gray-700">Schedule implementation planning session with key stakeholders</li>
                <li className="text-gray-700">Develop 90-day action plan for priority recommendations</li>
                <li className="text-gray-700">Establish success metrics and monitoring protocols</li>
                <li className="text-gray-700">Consider follow-up assessment in 6 months to measure progress</li>
              </ol>

            </div>

            {/* Footer */}
            <div className="border-t pt-6 mt-8">
              <div className="text-center text-gray-600">
                <p className="mb-2"><strong>Prepared by:</strong> NorthPath AI Report Engine</p>
                <p><strong>Reviewed by:</strong> Jeremy Estrella, Founder & Systems Strategist</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-xl p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for Your Organization&apos;s Assessment?</h3>
            <p className="text-gray-600 mb-6">Get customized insights like these for your organization with our comprehensive assessment platform.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/pricing">
                  Get Your Assessment
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
