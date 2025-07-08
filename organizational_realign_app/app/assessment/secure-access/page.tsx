'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function SecureAssessmentAccess() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Development password - in production, this should be handled more securely
  const ASSESSMENT_PASSWORD = 'northpath2025';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a small delay for security
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ASSESSMENT_PASSWORD) {
      // Store authorization in session storage
      sessionStorage.setItem('assessment_authorized', 'true');
      console.log('Authorization set, redirecting to assessment start...'); // Debug log
      router.push('/assessment/start');
    } else {
      setError('Invalid password. Please contact NorthPath Strategies for access.');
      setPassword('');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Assessment Access</h1>
          <p className="text-gray-600 text-sm">
            The assessment platform is available to paying customers only. 
            Enter your access password to continue.
          </p>
        </div>

        {/* Access Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Access Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="Enter password..."
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Access Assessment Platform'
            )}
          </Button>
        </form>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Need Access?</h3>
          <p className="text-xs text-gray-600 mb-3">
            The assessment platform is included with all paid packages. 
            Purchase a package to receive your access credentials.
          </p>
          <div className="space-y-2">
            <Button asChild variant="outline" size="sm" className="w-full">
              <a href="/pricing">View Pricing & Purchase</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full">
              <a href="https://calendly.com/jeremyestrella/30min" target="_blank" rel="noopener noreferrer">
                Contact for Demo Access
              </a>
            </Button>
          </div>
        </div>

        {/* Sample Reports Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">Want to see what our assessments produce?</p>
          <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            <Link href="/sample-reports">View Sample Reports</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
