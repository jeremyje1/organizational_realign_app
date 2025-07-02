'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const sessionId = searchParams.get('session_id');
  
  useEffect(() => {
    async function getPaymentDetails() {
      if (!sessionId) {
        router.push('/dashboard');
        return;
      }
      
      try {
        // Fetch payment details from the API
        const response = await fetch(`/api/payments/session?session_id=${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to retrieve payment information');
        }
        
        const data = await response.json();
        setPaymentDetails(data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setLoading(false);
      }
    }
    
    getPaymentDetails();
  }, [sessionId, router]);
  
  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Processing your payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 border border-green-100">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your assessment plan has been activated.
          </p>
        </div>
        
        {paymentDetails && (
          <div className="border-t border-b border-gray-200 py-4 my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Reference</p>
                <p className="font-medium">{paymentDetails.payment_id || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Plan</p>
                <p className="font-medium">{paymentDetails.plan_name || 'Premium Assessment'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">${paymentDetails.amount ? (paymentDetails.amount / 100).toFixed(2) : '0.00'}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link 
            href="/dashboard" 
            className="inline-flex justify-center items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/assessment/new" 
            className="inline-flex justify-center items-center px-5 py-2.5 text-sm font-medium text-center text-primary bg-white border border-primary rounded-lg hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-primary-light"
          >
            Start New Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}