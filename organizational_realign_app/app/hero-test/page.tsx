import React from 'react';
import { Metadata } from 'next';
import StableNavbar from '@/components/StableNavbar';
import EnhancedHero from '@/components/EnhancedHero';
import EnhancedFooter from '@/components/EnhancedFooter';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hero Section Test - NorthPath Strategies',
  description: 'Test page for the enhanced hero section',
};

export default function HeroTestPage() {
  return (
    <>
      <StableNavbar />
      <main>
        <EnhancedHero />
        
        {/* Navigation links */}
        <div className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Hero Section Test Page</h2>
            <p className="mb-4">
              This page demonstrates the new enhanced hero section component with:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Concise headline ("Effortlessly Realign Your Organization")</li>
              <li>Supporting subhead highlighting key benefits</li>
              <li>Primary Call-to-Action button with icon</li>
              <li>Secondary Call-to-Action button with hover effects</li>
              <li>Visually appealing background with gradient and grid pattern</li>
              <li>Fully responsive design for mobile and desktop</li>
              <li>Animated elements using Framer Motion</li>
              <li>Dashboard visualization and floating elements</li>
            </ul>
            
            <div className="flex gap-4 mt-8">
              <Link 
                href="/" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Homepage
              </Link>              <Link 
                  href="/component-showcase" 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  View All Components
                </Link>
              <Link 
                  href="/hero-test" 
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Hero Test Page
                </Link>
            </div>
          </div>
        </div>
      </main>
      <EnhancedFooter />
    </>
  );
}
