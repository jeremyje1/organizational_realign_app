'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { PageContainer } from '@/components/ui/page-container';
import { PageHero } from '@/components/ui/page-hero';
import { NpsCard } from '@/components/ui/nps-card';
import { NpsButton } from '@/components/ui/nps-button';

export default function SecureAssessmentAccess() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Development password - in production, this should be handled more securely
  const ASSESSMENT_PASSWORD = 'northpath2025';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication delay
    setTimeout(() => {
      if (password === ASSESSMENT_PASSWORD) {
        // Set authorization flag in sessionStorage
        sessionStorage.setItem('assessment_authorized', 'true');
        router.push('/assessment/start');
      } else {
        setError('Invalid password. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <PageContainer className="max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/NorthPath_logo_optimized.jpg"
            alt="NorthPath Strategies"
            width={200}
            height={80}
            className="rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Header */}
        <PageHero
          title="Secure Assessment Access"
          subtitle="Enter your access credentials to continue"
          icon="🔒"
          className="mb-8"
        />

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <NpsCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-nps-slate mb-3">
                  Assessment Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-nps-slate/50" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-nps bg-white focus:outline-none focus:ring-2 focus:ring-nps-blue/50 focus:border-nps-blue text-nps-slate placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-nps-slate/50 hover:text-nps-slate transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-nps-slate/50 hover:text-nps-slate transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div 
                  className="bg-red-50 border border-red-200 rounded-nps p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-red-600 text-sm font-medium text-center">{error}</p>
                </motion.div>
              )}

              <NpsButton
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full py-4"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying Access...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Access Assessment
                  </>
                )}
              </NpsButton>
            </form>

            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-nps-slate hover:text-nps-blue font-medium transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </motion.div>
          </NpsCard>
        </motion.div>

        {/* Security Notice */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-blue-50/50 rounded-nps p-4 border border-blue-200/50 text-center">
            <p className="text-sm text-nps-slate">
              <Lock className="inline h-4 w-4 mr-1" />
              Your session is secured with enterprise-grade encryption
            </p>
          </div>
        </motion.div>
      </PageContainer>
    </div>
  );
}
