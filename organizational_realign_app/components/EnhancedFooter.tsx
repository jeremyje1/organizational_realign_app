/**
 * Enhanced Professional Footer - Modern Business Design
 */
import Link from 'next/link';
import ResponsiveImage from '@/components/ui/responsive-image';
import { Linkedin, Twitter, Mail, Phone, Calendar, MapPin, ChevronRight } from 'lucide-react';

export default function EnhancedFooter() {
  const company = [
    { name: 'About', href: '/about' },
    { name: 'Leadership', href: '/about#leadership' },
    { name: 'Careers', href: '/careers' },
    { name: 'News', href: '/news' },
  ];

  const services = [
    { name: 'Strategy & Systems Design', href: '/solutions/strategy-systems' },
    { name: 'Institutional Transformation', href: '/solutions/institutional-transformation' },
    { name: 'Mission-Driven Solutions', href: '/solutions/mission-driven-solutions' },
    { name: 'Strategic Planning', href: '/services#strategic-planning' },
    { name: 'Accreditation Support', href: '/services#accreditation' },
  ];

  const resources = [
    { name: 'Resource Library', href: '/resources' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'FAQ', href: '/faq' },
  ];

  const contact = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'jeremy.estrella@gmail.com', 
      href: 'mailto:jeremy.estrella@gmail.com' 
    },
    { 
      icon: Calendar, 
      label: 'Schedule', 
      value: 'Book a Consultation', 
      href: 'https://calendly.com/jeremyestrella/30min' 
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'Houston, TX & Remote', 
      href: 'https://maps.google.com/?q=Houston,TX' 
    },
  ];

  return (
    <footer className="section-gradient-amber relative overflow-hidden pt-16 pb-8">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Newsletter Subscription */}
        <div className="glass-amber rounded-2xl p-8 mb-16 shadow-xl relative overflow-hidden border border-amber-200/30">
          {/* Background design elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:max-w-lg">
              <h3 className="text-2xl font-semibold mb-2 text-enhanced-dark">Stay Updated</h3>
              <p className="text-enhanced-dark opacity-80">Subscribe to our newsletter for the latest insights on organizational strategies and transformation.</p>
            </div>
            
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 glass-emerald border border-emerald-200/50 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-enhanced-dark placeholder-enhanced-dark/60 flex-grow md:w-64"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold px-4 py-3 rounded-r-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              >
                Subscribe
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center">
              <ResponsiveImage
                src="/images/northpath-logo.png"
                alt="NorthPath Strategies Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
                title="NorthPath Strategies Logo"
                structuredData={true}
              />
            </div>
            
            <p className="text-enhanced-dark opacity-80 leading-relaxed">
              At NorthPath Strategies, we don't coach individuals—we design the systems that support them. Our work lives 
              at the intersection of strategy, equity, and execution. We help mission-driven colleges, universities, and 
              nonprofits align structures, people, and outcomes to their mission.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/jeremyestrella/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-10 h-10 glass-blue rounded-lg flex items-center justify-center hover:glass-emerald transition-all duration-300 group shadow-md hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5 text-professional-blue group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="mailto:jeremy.estrella@gmail.com"
                aria-label="Email"
                className="w-10 h-10 glass-blue rounded-lg flex items-center justify-center hover:glass-emerald transition-all duration-300 group shadow-md hover:shadow-lg"
              >
                <Mail className="w-5 h-5 text-professional-blue group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-enhanced-dark/20 pb-2 text-enhanced-dark">Company</h4>
            <ul className="space-y-3">
              {company.map((link, index) => (
                <li key={index} className="group">
                  <Link 
                    href={link.href} 
                    className="text-enhanced-dark opacity-80 hover:opacity-100 hover:text-professional-blue transition-all duration-300 flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-professional-blue" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-enhanced-dark/20 pb-2 text-enhanced-dark">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="group">
                  <Link 
                    href={service.href} 
                    className="text-enhanced-dark opacity-80 hover:opacity-100 hover:text-professional-blue transition-all duration-300 flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-professional-blue" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-enhanced-dark/20 pb-2 text-enhanced-dark">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index} className="group">
                  <Link 
                    href={resource.href} 
                    className="text-enhanced-dark opacity-80 hover:opacity-100 hover:text-professional-blue transition-all duration-300 flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-professional-blue" />
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="glass-emerald rounded-2xl p-8 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border border-emerald-200/30">
          {contact.map((item, index) => {
            const Icon = item.icon;
            return (
              <a 
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center group hover:glass-blue p-3 rounded-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center mr-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 shadow-md">
                  <Icon className="w-6 h-6 text-professional-blue" />
                </div>
                <div>
                  <p className="text-sm text-enhanced-dark opacity-70">{item.label}</p>
                  <p className="text-enhanced-dark font-medium">{item.value}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-enhanced-dark/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-enhanced-dark opacity-70 text-sm">
              © {new Date().getFullYear()} NorthPath Strategies. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm justify-center">
              <Link href="/privacy" className="text-enhanced-dark opacity-70 hover:opacity-100 hover:text-professional-blue transition-all duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-enhanced-dark opacity-70 hover:opacity-100 hover:text-professional-blue transition-all duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-enhanced-dark opacity-70 hover:opacity-100 hover:text-professional-blue transition-all duration-300">
                Cookie Policy
              </Link>
              <Link href="/security" className="text-enhanced-dark opacity-70 hover:opacity-100 hover:text-professional-blue transition-all duration-300">
                Security
              </Link>
              <Link href="/sitemap" className="text-enhanced-dark opacity-70 hover:opacity-100 hover:text-professional-blue transition-all duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
