import React from 'react';
import { Metadata } from 'next';
import EnhancedFooter from '@/components/EnhancedFooter';
import ImprovedModernContact from '@/components/modern/ImprovedModernContact';
import Link from 'next/link';
import { PageWrapper } from '@/components/ui/page-wrapper';
import { PagesBackground } from '@/components/ui/pages-background';

export const metadata: Metadata = {
  title: 'Component Showcase - NorthPath Strategies',
  description: 'A showcase of all improved components for NorthPath Strategies',
};

export default function ComponentShowcasePage() {
  return (
    <PagesBackground>
      <PageWrapper>
        <main>
          <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Component Showcase</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                This page demonstrates all the improved components for the NorthPath Strategies website,
                including navigation, footer, and contact forms.
              </p>
            </div>

            {/* Component Navigation */}
            <div className="bg-white shadow rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-semibold mb-4">Component Navigation</h2>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#navbar" 
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Stable Navbar
                </Link>
                <Link 
                  href="#footer" 
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Enhanced Footer
                </Link>
                <Link 
                  href="#contact" 
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Improved Contact Form
                </Link>
                <Link 
                  href="/" 
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  Homepage
                </Link>
                <Link 
                  href="/about" 
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  About Page
                </Link>
                <Link 
                  href="/contact" 
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  Contact Page
                </Link>
              </div>
            </div>

            {/* Hero Section */}
            <section id="hero" className="mb-16">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Enhanced Hero Component</h2>
                <p className="mb-6 text-gray-600">
                  The EnhancedHero component provides a modern, visually appealing hero section with animated elements, 
                  clear call-to-action buttons, and a responsive design that works on both mobile and desktop.
                </p>
                <div className="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
                  <div className="text-sm text-gray-500 mb-2">View full implementation on <a href="/hero-test" className="text-blue-600 hover:underline">Hero Test Page</a></div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Concise headline ("Effortlessly Realign Your Organization")</li>
                    <li>Supporting subheadline highlighting key benefits</li>
                    <li>Primary and secondary Call-to-Action buttons with hover effects</li>
                    <li>Visually appealing gradient background with subtle grid pattern</li>
                    <li>Fully responsive for mobile and desktop viewing</li>
                    <li>Animated elements using Framer Motion for better UX</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Navbar Section */}
            <section id="navbar" className="mb-16">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Navbar Component</h2>
                <p className="mb-6 text-gray-600">
                  The Stable Navbar has been implemented across all pages, replacing the previous version 
                  that was causing TypeErrors. This implementation avoids using problematic Lucide icons 
                  directly in the server components.
                </p>
                <div className="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
                  <div className="text-sm text-gray-500 mb-2">Current implementation shown above ↑</div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Fixed serialization issues with React Server Components</li>
                    <li>Improved mobile responsiveness with smoother transitions</li>
                    <li>Added proper dropdown functionality with keyboard navigation</li>
                    <li>Used Unicode symbols (▲/▼) instead of Lucide icons for toggles</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="mb-16">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Improved Contact Form</h2>
                <p className="mb-6 text-gray-600">
                  The ModernContact component has been improved with better accessibility, 
                  enhanced validation, and a more intuitive user interface.
                </p>
                <div className="mt-8">
                  <ImprovedModernContact />
                </div>
              </div>
            </section>

            {/* Footer Section */}
            <section id="footer" className="mb-16">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Enhanced Footer Component</h2>
                <p className="mb-6 text-gray-600">
                  The EnhancedFooter component provides a more comprehensive and visually appealing footer 
                  with newsletter subscription, improved navigation, and contact information.
                </p>
                <div className="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
                  <div className="text-sm text-gray-500 mb-2">Enhanced footer shown below ↓</div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Added newsletter subscription section</li>
                    <li>Improved layout with grid system for better organization</li>
                    <li>Enhanced contact information with icons and visual indicators</li>
                    <li>Added hover effects and animations for better user engagement</li>
                    <li>Updated copyright year to be dynamic</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </main>
        <EnhancedFooter />
      </PageWrapper>
    </PagesBackground>
  );
}
