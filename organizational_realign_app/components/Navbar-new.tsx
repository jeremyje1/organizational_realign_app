/**
 * Modern Professional Navbar - Premium business template style
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Solutions', href: '#services' },
    { name: 'Founder', href: '#founder' },
    { name: 'Assessment', href: '/assessment/start' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-white/10 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl font-serif">N</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold transition-colors leading-none ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                NORTHPATH
              </span>
              <span className={`text-sm font-light transition-colors leading-none ${
                isScrolled ? 'text-gray-600' : 'text-blue-200'
              }`}>
                STRATEGIES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-blue-600 text-sm tracking-wide ${
                  isScrolled ? 'text-gray-700' : 'text-white hover:text-blue-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium">
              <a href="https://calendly.com/jeremyestrella/30min" target="_blank" rel="noopener noreferrer">
                Schedule Call
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 space-y-4 bg-white/95 backdrop-blur-lg rounded-2xl mt-2 shadow-xl border border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-6 py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-6">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 rounded-full">
                <a href="https://calendly.com/jeremyestrella/30min" target="_blank" rel="noopener noreferrer">
                  Schedule Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
