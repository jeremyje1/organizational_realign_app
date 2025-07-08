'use client';

import { useState } from 'react';
import BasicNavbar from '@/components/BasicNavbar';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import AdvancedNavbar from '@/components/AdvancedNavbar';
import StableNavbar from '@/components/StableNavbar';

export default function TestNavbarsPage() {
  const [activeNavbar, setActiveNavbar] = useState<'basic' | 'enhanced' | 'advanced' | 'stable'>('basic');

  return (
    <>
      {/* Render the currently active navbar */}
      {activeNavbar === 'basic' && <BasicNavbar />}
      {activeNavbar === 'enhanced' && <EnhancedNavbar />}
      {activeNavbar === 'advanced' && <AdvancedNavbar />}
      {activeNavbar === 'stable' && <StableNavbar />}
      
      {/* Control panel for switching between navbar implementations */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-8">Navbar Testing Console</h1>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <button 
                onClick={() => setActiveNavbar('basic')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  activeNavbar === 'basic' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Basic Navbar
              </button>
              <button 
                onClick={() => setActiveNavbar('enhanced')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  activeNavbar === 'enhanced' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Enhanced Navbar
              </button>
              <button 
                onClick={() => setActiveNavbar('advanced')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  activeNavbar === 'advanced' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Advanced Navbar
              </button>
              <button 
                onClick={() => setActiveNavbar('stable')}
                className={`px-6 py-3 rounded-lg font-medium ${
                  activeNavbar === 'stable' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Stable Navbar
              </button>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Currently Active: {activeNavbar.charAt(0).toUpperCase() + activeNavbar.slice(1)} Navbar</h2>
              <p className="text-gray-600 mb-4">
                Click the buttons above to switch between different navbar implementations.
                If any errors occur, they will appear in the browser console.
              </p>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Implementation Details:</h3>
                {activeNavbar === 'basic' && (
                  <p className="text-gray-600">Basic navbar with minimal styling and no dropdown menus.</p>
                )}
                {activeNavbar === 'enhanced' && (
                  <p className="text-gray-600">Enhanced navbar with dropdown menus and mobile responsiveness.</p>
                )}
                {activeNavbar === 'advanced' && (
                  <p className="text-gray-600">Advanced navbar with rich styling, descriptions, and enhanced dropdowns.</p>
                )}
                {activeNavbar === 'stable' && (
                  <p className="text-gray-600">Stable navbar with complete navigation structure and styling, but without any problematic features. Recommended for production use.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
