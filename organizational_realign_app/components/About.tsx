/**
 * About Section - Professional Company Overview
 */
'use client';

import { CheckCircle, BarChart3, Shield, Target } from 'lucide-react';

export default function About() {
  const capabilities = [
    {
      icon: BarChart3,
      title: "Data-Driven Analysis",
      description: "Advanced analytics and AI-powered insights to identify organizational inefficiencies and optimization opportunities."
    },
    {
      icon: Target,
      title: "Strategic Implementation", 
      description: "Proven methodologies for executing complex organizational transformations with minimal disruption."
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Comprehensive change management strategies that ensure sustainable transformation and cultural adoption."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About NorthPath Strategies
            </h2>
            <p className="text-xl text-gray-600">
              We combine decades of strategic consulting experience with cutting-edge AI technology 
              to deliver measurable organizational transformation results.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  Strategic Excellence Meets
                  <span className="text-blue-600 block">Technological Innovation</span>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  NorthPath Strategies was founded on the principle that successful organizational transformation 
                  requires both strategic expertise and data-driven insights. Our approach combines traditional 
                  consulting excellence with advanced AI-powered assessment tools.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We specialize in helping organizations navigate complex change initiatives, optimize their 
                  structures, and achieve sustainable performance improvements. Our methodology has been proven 
                  across diverse industries and organizational sizes.
                </p>
              </div>

              {/* Key Differentiators */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Our Approach</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Comprehensive organizational assessment and analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">AI-powered insights and recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Structured implementation and change management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Continuous monitoring and optimization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Our Core Capabilities</h4>
                <div className="space-y-6">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <capability.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">{capability.title}</h5>
                        <p className="text-sm text-gray-600">{capability.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </section>
  );
}
