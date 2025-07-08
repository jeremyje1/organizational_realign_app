/**
 * Contact Section - Professional Contact with Clear CTAs
 */
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone, Calendar, MessageSquare, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform
              <span className="text-blue-600 block">Your Organization?</span>
            </h2>
            <p className="text-xl text-gray-600">
              Take the first step toward strategic transformation. Choose the option that best fits your immediate needs.
            </p>
          </div>

          {/* Contact Options Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            
            {/* Primary CTA - Consultation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200 relative">
              <div className="absolute -top-4 left-8 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Strategic Consultation</h3>
                  <p className="text-blue-600 font-semibold">Free 30-Minute Discovery Call</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Schedule a complimentary consultation to discuss your organizational challenges and explore how our strategic approach can help you achieve your goals.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Custom organizational assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Strategic roadmap discussion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Implementation planning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">No obligation or commitment</span>
                </div>
              </div>
              
              <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-lg">
                <a href="https://calendly.com/jeremyestrella/30min" target="_blank" rel="noopener noreferrer">
                  Schedule Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>

            {/* Secondary CTA - Assessment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Professional Assessment Platform</h3>
                  <p className="text-gray-600 font-semibold">Comprehensive Organizational Analysis</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our advanced assessment platform provides deep insights into organizational structure, efficiency, and optimization opportunities. Available to all paying customers.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">15-minute assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Instant AI-powered analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Actionable recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">No registration required</span>
                </div>
              </div>
              
              <Button asChild variant="outline" size="lg" className="w-full text-lg border-2">
                <Link href="/pricing">
                  View Assessment Packages
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Additional Contact Info */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Have Questions? Get in Touch
              </h3>
              <p className="text-gray-600 mb-6">
                Prefer to reach out directly? Jeremy Estrella is available for strategic discussions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" size="lg">
                  <a href="mailto:jeremy.estrella@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Jeremy
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+18005551234">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Direct
                  </a>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
