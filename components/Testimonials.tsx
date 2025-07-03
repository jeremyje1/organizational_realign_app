/**
 * @generated from HOMEPAGE_INSTRUCTIONS.md – do not delete.
 * Testimonials slider with orange accent quote marks
 */
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  organization: string;
  sector: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "NorthPath's DSCH analysis revealed inefficiencies we never knew existed. Within 90 days, we achieved a 23% reduction in administrative overhead while improving service delivery.",
    author: "Dr. Sarah Chen",
    title: "Vice President of Operations",
    organization: "Metropolitan University System",
    sector: "Higher Education"
  },
  {
    quote: "The Cultural Resilience Factor modeling was game-changing. We successfully navigated a major reorganization with 95% employee retention and zero disruption to patient care.",
    author: "Michael Rodriguez",
    title: "Chief Operating Officer", 
    organization: "Regional Medical Center",
    sector: "Healthcare"
  },
  {
    quote: "Their License Efficiency Index optimization saved us $2.3M annually in software costs alone. The ROI was evident within the first quarter of implementation.",
    author: "Jennifer Walsh",
    title: "Executive Director",
    organization: "Community Impact Foundation",
    sector: "Nonprofit"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from organizations that transformed with NorthPath&apos;s proprietary methodologies.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="relative bg-gray-50 rounded-2xl p-8 md:p-12">
                    {/* Orange Quote Mark Backdrop */}
                    <div className="absolute top-6 left-6 w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center opacity-20">
                      <Quote size={32} className="text-white" />
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="relative z-10 text-lg md:text-xl leading-relaxed text-gray-700 mb-8 font-medium italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">
                          {testimonial.author}
                        </div>
                        <div className="text-gray-600">
                          {testimonial.title}
                        </div>
                        <div className="text-gray-600">
                          {testimonial.organization}
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          {testimonial.sector}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous/Next Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                onClick={nextSlide}
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </Button>
            </div>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
