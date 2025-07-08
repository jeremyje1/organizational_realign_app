import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Download, Calendar, Users, DollarSign } from 'lucide-react';
import { PagesBackground } from '@/components/ui/pages-background';

export const metadata: Metadata = {
  title: 'Hospital Network Assessment Sample Report - NorthPath Strategies',
  description: 'Sample organizational assessment report for a regional hospital network showing comprehensive healthcare operational analysis.',
};

export default function HospitalReport() {
  return (
    <PagesBackground>
      <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-emerald-600">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Sample Assessment Report</h1>
              <p className="text-gray-600">Regional Hospital Network Analysis</p>
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
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Regional Hospital Network Assessment</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">July 5, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">350-bed + 4 Clinics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Comprehensive Package</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-emerald-600 cursor-pointer hover:underline">Download PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8">
            <p className="text-emerald-800 text-sm">
              <strong>Sample Report:</strong> This healthcare assessment demonstrates our specialized approach to medical 
              facility optimization, focusing on patient care workflows and operational efficiency.
            </p>
          </div>

          {/* Report Content */}
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <div className="prose prose-lg max-w-none">
              
              {/* Executive Summary */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h3>
              <p className="text-gray-700 mb-6">
                NorthPath Strategies completed a comprehensive organizational assessment of this regional hospital network, 
                encompassing a 350-bed main facility and four satellite clinics. Our analysis focused on patient care 
                efficiency, staff role optimization, and operational workflow improvements to enhance both patient outcomes 
                and staff satisfaction.
              </p>

              {/* Key Findings */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Findings</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>20% Workflow Optimization Potential:</strong> Streamlining patient care pathways could significantly reduce wait times and improve satisfaction scores.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Staff Role Clarity Issues:</strong> 32% of staff reported unclear role boundaries, leading to inefficient task distribution.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Technology Integration Opportunities:</strong> Existing EMR system underutilized for workflow optimization and predictive analytics.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <span className="text-gray-700"><strong>Inter-facility Communication:</strong> Coordination between main hospital and satellite clinics could be enhanced for better patient continuity.</span>
                </li>
              </ul>

              {/* Healthcare Complexity Index */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Healthcare Organizational Complexity Index (HOCI™)</h4>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">8.4</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">High</div>
                    <div className="text-sm text-gray-600">Complexity Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">78%</div>
                    <div className="text-sm text-gray-600">Optimization Potential</div>
                  </div>
                </div>
              </div>

              {/* Patient Care Metrics */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Patient Care Pathway Analysis</h4>
              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-700">28 min</div>
                    <div className="text-xs text-gray-600">Avg. Wait Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">4.2</div>
                    <div className="text-xs text-gray-600">Patient Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-700">12%</div>
                    <div className="text-xs text-gray-600">Readmission Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-700">89%</div>
                    <div className="text-xs text-gray-600">Staff Efficiency</div>
                  </div>
                </div>
              </div>

              {/* Priority Recommendations */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Priority Recommendations</h4>
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-emerald-600 pl-4">
                  <h5 className="font-semibold text-gray-900">1. Implement Integrated Care Pathways</h5>
                  <p className="text-gray-700 text-sm">Standardize patient flow processes across all departments to reduce handoff delays and improve care coordination.</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h5 className="font-semibold text-gray-900">2. Enhance Staff Role Definition</h5>
                  <p className="text-gray-700 text-sm">Clarify responsibilities and create cross-training programs to improve flexibility and reduce workflow bottlenecks.</p>
                </div>
                <div className="border-l-4 border-orange-600 pl-4">
                  <h5 className="font-semibold text-gray-900">3. Optimize EMR Utilization</h5>
                  <p className="text-gray-700 text-sm">Leverage existing technology for predictive analytics and automated workflow management to reduce administrative burden.</p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <h5 className="font-semibold text-gray-900">4. Strengthen Network Coordination</h5>
                  <p className="text-gray-700 text-sm">Create standardized communication protocols between main facility and satellite clinics for seamless patient transfers.</p>
                </div>
              </div>

              {/* Implementation Roadmap */}
              <h4 className="text-xl font-semibold text-gray-900 mb-4">90-Day Implementation Roadmap</h4>
              <div className="space-y-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h6 className="font-semibold text-gray-900">Days 1-30: Foundation Phase</h6>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Establish implementation team and governance structure</li>
                    <li>• Conduct staff role clarification workshops</li>
                    <li>• Begin EMR optimization assessment</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h6 className="font-semibold text-gray-900">Days 31-60: Implementation Phase</h6>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Roll out new care pathway protocols</li>
                    <li>• Implement staff cross-training programs</li>
                    <li>• Deploy EMR workflow improvements</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h6 className="font-semibold text-gray-900">Days 61-90: Optimization Phase</h6>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Monitor performance metrics and adjust protocols</li>
                    <li>• Expand successful improvements network-wide</li>
                    <li>• Establish continuous improvement processes</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="border-t pt-6 mt-8">
              <div className="text-center text-gray-600">
                <p className="mb-2"><strong>Prepared by:</strong> NorthPath AI Report Engine</p>
                <p><strong>Reviewed by:</strong> Jeremy Estrella, Founder & Systems Strategist</p>
                <p className="text-xs mt-2 text-gray-500">Healthcare compliance and patient privacy protocols maintained throughout assessment</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-emerald-50 rounded-xl p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Transform Your Healthcare Organization</h3>
            <p className="text-gray-600 mb-6">Get specialized healthcare assessment insights to improve patient care and operational efficiency.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
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
