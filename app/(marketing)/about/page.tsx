// app/(marketing)/about/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BarChart3, Users, Brain, Shield, Target, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about North Path Strategies, our mission, values, and the team behind our organizational alignment solutions.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About North Path Strategies</h1>
            <p className="text-xl text-blue-100">
              We're on a mission to help organizations achieve their full potential through strategic alignment and data-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                North Path Strategies was founded in 2022 by a team of organizational psychologists, data scientists, and business strategists who recognized a common problem across companies of all sizes: misalignment.
              </p>
              <p className="text-gray-700 mb-4">
                After years of consulting with organizations that struggled with silos, conflicting priorities, and unclear direction, our founders developed a comprehensive framework for measuring and improving organizational alignment.
              </p>
              <p className="text-gray-700">
                Today, we combine cutting-edge AI technology with proven organizational psychology principles to deliver insights that transform how teams work together. Our mission is to help every organization find its true north—the path to aligned, efficient, and purpose-driven operation.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/team-meeting.jpg"
                alt="North Path Strategies team meeting"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              These core principles guide everything we do at North Path Strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Target className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Data-Driven Decisions</h3>
                  <p className="text-gray-600">
                    We believe that the best strategies are built on solid evidence and measurable outcomes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Users className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Human-Centered</h3>
                  <p className="text-gray-600">
                    We recognize that technology serves people, not the other way around. We put human needs first.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
                  <p className="text-gray-600">
                    We're committed to evolving our methods and technology to deliver ever-better results.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600">
              How we help organizations achieve better alignment and performance.
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="p-6 bg-blue-100 rounded-full inline-flex">
                  <Brain className="h-10 w-10 text-blue-700" />
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-semibold mb-4">Comprehensive Assessment</h3>
                <p className="text-gray-700">
                  Our assessment framework evaluates all key dimensions of organizational alignment, from strategic clarity to operational execution. We gather input from all levels of your organization to build a complete picture of your current state.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 md:order-1 order-2">
                <h3 className="text-2xl font-semibold mb-4">AI-Powered Analysis</h3>
                <p className="text-gray-700">
                  Our proprietary AI engine processes assessment data to identify patterns, misalignments, and opportunities that might be missed by traditional analysis. The result is deeper insights and more effective recommendations.
                </p>
              </div>
              <div className="md:col-span-2 md:order-2 order-1">
                <div className="p-6 bg-blue-100 rounded-full inline-flex">
                  <BarChart3 className="h-10 w-10 text-blue-700" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="p-6 bg-blue-100 rounded-full inline-flex">
                  <Shield className="h-10 w-10 text-blue-700" />
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-semibold mb-4">Expert Guidance</h3>
                <p className="text-gray-700">
                  Technology is powerful, but human expertise is irreplaceable. Our consultants work with you to interpret results, develop implementation plans, and guide your organization through meaningful change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Meet the experts behind North Path Strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full">
                <Image
                  src="/images/team-member-1.jpg"
                  alt="Dr. Emily Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Dr. Emily Chen</h3>
              <p className="text-blue-700 mb-2">Co-Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Former organizational psychologist with 15+ years consulting for Fortune 500 companies.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full">
                <Image
                  src="/images/team-member-2.jpg"
                  alt="Marcus Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Marcus Johnson</h3>
              <p className="text-blue-700 mb-2">Co-Founder & CTO</p>
              <p className="text-gray-600 text-sm">
                AI specialist and former lead engineer at Google's organizational development team.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full">
                <Image
                  src="/images/team-member-3.jpg"
                  alt="Dr. Sophia Martinez"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Dr. Sophia Martinez</h3>
              <p className="text-blue-700 mb-2">Chief Research Officer</p>
              <p className="text-gray-600 text-sm">
                Published author on organizational behavior with background in quantitative analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full">
                <Image
                  src="/images/team-member-4.jpg"
                  alt="James Wilson"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">James Wilson</h3>
              <p className="text-blue-700 mb-2">Chief Client Officer</p>
              <p className="text-gray-600 text-sm">
                Former management consultant specializing in organizational transformation and change management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600">
              We collaborate with leading organizations to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex justify-center">
              <Image src="/images/partner-1.png" alt="Partner Logo" width={150} height={75} />
            </div>
            <div className="flex justify-center">
              <Image src="/images/partner-2.png" alt="Partner Logo" width={150} height={75} />
            </div>
            <div className="flex justify-center">
              <Image src="/images/partner-3.png" alt="Partner Logo" width={150} height={75} />
            </div>
            <div className="flex justify-center">
              <Image src="/images/partner-4.png" alt="Partner Logo" width={150} height={75} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
