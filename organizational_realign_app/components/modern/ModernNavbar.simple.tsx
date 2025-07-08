'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function ModernNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-lg text-gray-900">
                  <span className="hidden sm:inline">NorthPath Strategies</span>
                  <span className="sm:hidden">NorthPath</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/assessment/start" className="text-gray-700 hover:text-blue-600 font-medium transition-colors whitespace-nowrap">
                Assessment
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors whitespace-nowrap">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors whitespace-nowrap">
                About
              </Link>
              <Link href="/assessment/start" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
                Get Started
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-white z-50 lg:hidden shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">N</span>
                  </div>
                  <span className="font-bold text-lg">NorthPath</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-4">
                <Link 
                  href="/assessment/start" 
                  className="block py-3 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Assessment
                </Link>
                <Link 
                  href="/pricing" 
                  className="block py-3 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  href="/about" 
                  className="block py-3 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/assessment/start" 
                  className="block w-full mt-6 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
