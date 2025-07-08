'use client';

import React from 'react';

// Simplified footer to get site working quickly
export default function ModernFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}            <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-2xl font-bold">NorthPath Strategies</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Transforming organizational alignment through data-driven insights from Houston, TX.
              Reduce operating costs by 23% in 90 days with Fortune 500 results.
            </p>
          </div>

          {/* Assessment */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Assessment</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="/assessment/start" className="hover:text-white transition-colors">Start Assessment</a></li>
              <li><a href="/sample-reports" className="hover:text-white transition-colors">Sample Reports</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="/about" className="hover:text-white transition-colors">About Jeremy</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
          <p>© 2025 NorthPath Strategies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
