/**
 * @generated from HOMEPAGE_INSTRUCTIONS.md – do not delete.
 * Footer with logo, quick-links, and social icons
 */
import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Solutions', href: '#services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Assessment', href: '/assessment/start' },
    { name: 'Results', href: '/results' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Logo & Mission */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-serif">N</span>
              </div>
              <div>
                <span className="text-xl font-serif font-bold">NorthPath</span>
                <span className="text-xl font-light text-gray-300"> Strategies</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Transforming organizations through proprietary AI-powered algorithms and proven methodologies. 
              Expert realignment consulting for measurable results.
            </p>
          </div>

          {/* Middle Column: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Social Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/northpath-strategies"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com/northpathstrat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm text-gray-400">
              <div>contact@northpathstrategies.org</div>
              <div>Patent-pending technology</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            © 2025 NorthPath Strategies. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}