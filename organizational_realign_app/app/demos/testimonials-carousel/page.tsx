'use client';

import React from 'react';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TestimonialsCarouselDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Testimonials Carousel Demo
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A showcase of our new testimonials carousel component with auto-scroll, user controls, and responsive design.
            </p>
          </motion.div>
        </div>
        
        <div className="my-12">
          {/* The TestimonialsCarousel component will be rendered here */}
          <TestimonialsCarousel />
        </div>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Component Features:</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Auto-scrolling carousel with 5-second interval</li>
            <li>User controls for next/previous and pause/play</li>
            <li>Navigation dots for direct slide access</li>
            <li>Smooth animations between testimonials</li>
            <li>Responsive design that works on all devices</li>
            <li>Accessibility features including ARIA labels</li>
            <li>Auto-pauses when scrolled out of view</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
