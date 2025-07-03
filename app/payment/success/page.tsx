'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, FileText, Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function NewCustomerSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [assessmentCreated, setAssessmentCreated] = useState(false);
  
  const sessionId = searchParams.get('session_id');
  const isNewCustomer = searchParams.get('new_customer') === 'true';
  
  useEffect(() => {
    async function handleNewCustomerSetup() {
      if (!sessionId || !isNewCustomer) {
        router.push('/');
        return;
      }
      
      try {
        // Verify payment and get details
        const paymentResponse = await fetch(`/api/payments/create-session?session_id=${sessionId}`);
        if (!paymentResponse.ok) {
          throw new Error('Failed to retrieve payment information');
        }
        
        const paymentData = await paymentResponse.json();
        setPaymentDetails(paymentData);

        // Create assessment for new customer
        if (paymentData.success && paymentData.session.paymentStatus === 'paid') {
          const createAssessmentResponse = await fetch('/api/assessment/create-from-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: sessionId,
              customerEmail: paymentData.session.customerEmail,
              plan: paymentData.session.metadata?.plan
            }),
          });

          if (createAssessmentResponse.ok) {
            setAssessmentCreated(true);
          }
        }
      } catch (error) {
        console.error('Error setting up new customer:', error);
      } finally {
        setLoading(false);
      }
    }
    
    handleNewCustomerSetup();
  }, [sessionId, isNewCustomer, router]);
  
  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Setting up your assessment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 border border-green-100">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to NorthPath Strategies!</h1>
          <p className="text-lg text-gray-600">
            Your payment was successful and your assessment is ready to begin.
          </p>
        </div>
        
        {/* Payment Details */}
        {paymentDetails && (
          <div className="border-t border-b border-gray-200 py-6 my-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Plan Selected</p>
                <p className="font-semibold text-lg">{paymentDetails.session.metadata?.plan || 'Professional Assessment'}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                <p className="font-semibold text-lg">
                  ${paymentDetails.session.amountTotal ? (paymentDetails.session.amountTotal / 100).toFixed(2) : '0.00'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Assessment Status</p>
                <p className="font-semibold text-lg text-green-600">
                  {assessmentCreated ? 'Ready to Start' : 'Setting Up...'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Complete Your Assessment</h3>
                <p className="text-gray-600 text-sm">
                  Begin the comprehensive organizational assessment. It typically takes 45-90 minutes to complete.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">AI Analysis Generation</h3>
                <p className="text-gray-600 text-sm">
                  Our advanced AI will analyze your responses and generate comprehensive insights and recommendations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Review Your Results</h3>
                <p className="text-gray-600 text-sm">
                  Access your professional PDF report and explore interactive visualizations of your organizational analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/survey" className="flex items-center gap-2">
              <FileText size={20} />
              Start Assessment
              <ArrowRight size={16} />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/contact" className="flex items-center gap-2">
              <Calendar size={20} />
              Schedule Consultation
            </Link>
          </Button>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Professional Report</h3>
            <p className="text-sm text-gray-600">Executive-ready PDF with detailed findings and recommendations</p>
          </div>
          
          <div className="text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Expert Support</h3>
            <p className="text-sm text-gray-600">Access to our team of organizational transformation specialists</p>
          </div>
          
          <div className="text-center">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Follow-up Consultation</h3>
            <p className="text-sm text-gray-600">Optional strategy session to discuss your results and implementation</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Questions? Contact our support team at{' '}
            <a href="mailto:support@northpathstrategies.org" className="text-blue-600 hover:underline">
              support@northpathstrategies.org
            </a>{' '}
            or call us at{' '}
            <a href="tel:+1-555-123-4567" className="text-blue-600 hover:underline">
              (555) 123-4567
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NewCustomerSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    }>
      <NewCustomerSuccessContent />
    </Suspense>
  );
}
