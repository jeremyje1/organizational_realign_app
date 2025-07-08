'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SafeLink as Link } from '@/components/client-wrappers/DynamicClientImports';

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  description?: string;
}

const navigation: NavItem[] = [
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Company Profile',
    href: '/company-profile'
  },
  {
    label: 'Services',
    href: '/pricing'
  },
  {
    label: 'Founder',
    href: '/founder'
  },
  {
    label: 'Example Reports',
    href: '/sample-reports'
  },
  {
    label: 'Contact',
    href: '/contact'
  },
  {
    label: 'Assessment Tool',
    href: '/assessment/start'
  },
  {
    label: 'Our 5 Step Transformation Framework',
    href: '/methodology'
  },
  {
    label: 'Resources',
    href: '/resources'
  }
];

// Mobile menu component
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  // Trap focus inside the mobile menu when it's open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Mobile menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-80 bg-white z-50 lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded overflow-hidden">
                    <Image
                      src="/images/optimized-hero-logo-60.jpg"
                      alt="NorthPath Strategies Logo"
                      fill
                      sizes="32px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <span className="font-bold text-xl text-gray-900">
                    NorthPath
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  aria-label="Close navigation menu"
                >
                  ✕
                </button>
              </div>

              {/* Navigation items */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href || '#'}
                      onClick={onClose}
                      className={`block p-3 rounded-lg transition-colors ${
                        isActive(item.href) 
                          ? 'bg-primary-50 text-primary-700 font-medium' 
                          : 'text-gray-700 hover:bg-gray-100 font-medium'
                      }`}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-8 space-y-3">
                <Link href="/assessment/start" onClick={onClose}>
                  <Button size="lg" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl">
                    Start Assessment
                  </Button>
                </Link>
                <Link href="/contact" onClick={onClose}>
                  <Button variant="outline" size="lg" className="w-full rounded-xl">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Main Navbar component
export default function ModernNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event for sticky navigation styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close mobile menu with ESC key
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check if a nav item is active
  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-white/95 backdrop-blur-sm'
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group transition-opacity hover:opacity-90"
              aria-label="NorthPath Strategies Homepage"
            >
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src="/images/optimized-hero-logo-60.jpg"
                  alt="NorthPath Strategies Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">NorthPath</span>
                <span className="hidden sm:inline text-sm text-gray-600 ml-1">Strategies</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navigation.map((item) => (
                <div key={item.label} className="flex-shrink-0">
                  <Link
                    href={item.href || '#'}
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              
              {/* Desktop CTA */}
              <div className="ml-4">
                <Link href="/assessment/start">
                  <Button 
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    Start Assessment
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 lg:hidden">
              <Link href="/assessment/start" className="mr-2">
                <Button 
                  size="sm"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg"
                >
                  Assessment
                </Button>
              </Link>
              <button
                type="button"
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Open navigation menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-20" aria-hidden="true"></div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
