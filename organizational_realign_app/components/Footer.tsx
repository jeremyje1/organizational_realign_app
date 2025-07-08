/**
 * Professional Footer - Clean Business Design
 */
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Platform', href: '/assessment/secure-access' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Strategic Assessment', href: '/pricing' },
    { name: 'Transformation Consulting', href: '/contact' },
    { name: 'AI-Powered Platform', href: '/assessment/secure-access' },
    { name: 'Executive Coaching', href: '/contact' },
  ];

  const contact = [
    { label: 'Email', value: 'jeremy.estrella@gmail.com', href: 'mailto:jeremy.estrella@gmail.com' },
    { label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { label: 'Schedule', value: 'Book Consultation', href: 'https://calendly.com/jeremyestrella/30min' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/northpath-logo.png"
                alt="NorthPath Strategies"
                width={120}
                height={43}
                className="h-10 w-auto"
              />
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Strategic organizational consulting combined with AI-powered assessment technology. 
              Transforming organizations for measurable results.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/jeremyestrella/" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:jeremy.estrella@gmail.com"
                 className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-gray-300 hover:text-white transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              {contact.map((item, index) => (
                <li key={index}>
                  <a href={item.href} 
                     className="text-gray-300 hover:text-white transition-colors block"
                     target={item.href.startsWith('http') ? '_blank' : undefined}
                     rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    <span className="text-sm text-gray-400">{item.label}:</span>
                    <br />
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 NorthPath Strategies. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/security" className="text-gray-400 hover:text-white transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}