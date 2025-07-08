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
    label: 'Assessment',
    href: '/assessment/start',
    description: '15-minute assessment - Identify $2.4M+ savings opportunities'
  },
  {
    label: 'Results',
    children: [
      { 
        label: 'Success Stories', 
        href: '/case-studies',
        description: 'Real client results: 23% cost reduction in 90 days'
      },
      { 
        label: 'Sample Reports', 
        href: '/sample-reports',
        description: 'View detailed organizational optimization reports'
      },
    ]
  },
  {
    label: 'Solutions',
    children: [
      { 
        label: 'Cost Reduction', 
        href: '/solutions/cost-reduction',
        description: 'Proven methodologies for rapid cost optimization'
      },
      { 
        label: 'Operational Excellence', 
        href: '/solutions/operations',
        description: 'Transform operations with Fortune 500 strategies'
      },
      { 
        label: 'Implementation', 
        href: '/solutions/implementation',
        description: '90-day transformation programs with guaranteed ROI'
      },
    ]
  },
  {
    label: 'Company',
    children: [
      { 
        label: 'About Jeremy', 
        href: '/about',
        description: '15+ years transforming Fortune 500 organizations'
      },
      { 
        label: 'Methodology', 
        href: '/methodology',
        description: 'Our proven 5-step transformation framework'
      },
    ]
  },
  {
    label: 'Pricing',
    href: '/pricing',
    description: 'Risk-free packages with 10-30x ROI guarantee'
  },
  {
    label: 'Resources',
    children: [
      { label: 'Sample Reports', href: '/sample-reports' },
      { label: 'Assessment Tool', href: '/assessment/start' },
      { label: 'Contact', href: '/contact' },
      { label: 'Services', href: '/services' },
    ]
  },
];

// Mobile menu component
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

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
                    {item.children ? (
                      <>
                        <button
                          className="w-full flex items-center justify-between p-3 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
                          onClick={() => toggleExpanded(item.label)}
                          aria-expanded={expandedItems.includes(item.label)}
                          aria-controls={`panel-${item.label}`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <span aria-hidden="true">
                            {expandedItems.includes(item.label) ? '▲' : '▼'}
                          </span>
                        </button>
                        
                        <AnimatePresence>
                          {expandedItems.includes(item.label) && (
                            <motion.div 
                              id={`panel-${item.label}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href || '#'}
                                  onClick={onClose}
                                  className={`block p-3 rounded-lg transition-colors ${
                                    isActive(child.href) 
                                      ? 'bg-primary-50 text-primary-700 font-medium' 
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                                  aria-current={isActive(child.href) ? 'page' : undefined}
                                >
                                  <span>{child.label}</span>
                                  {child.description && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      {child.description}
                                    </p>
                                  )}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
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
                    )}
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

// Desktop dropdown menu
function DropdownMenu({ item, isOpen, onToggle }: { 
  item: NavItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  const pathname = usePathname();
  
  // Detect if any child is active
  const hasActiveChild = item.children?.some(child => child.href === pathname);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        onToggle();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onToggle]);
  
  return (
    <div className="relative" data-dropdown>
      <button
        className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
          hasActiveChild || isOpen
            ? 'text-primary-700 bg-primary-50'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-expanded={isOpen}
        aria-controls={`dropdown-${item.label}`}
      >
        {item.label}
        <span className="transition-transform text-xs" aria-hidden="true">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`dropdown-${item.label}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50"
            role="menu"
          >
            <div className="p-4">
              {item.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.href || '#'}
                  className={`block p-3 hover:bg-gray-50 rounded-lg transition-colors ${
                    pathname === child.href ? 'bg-primary-50 text-primary-700' : ''
                  }`}
                  role="menuitem"
                  aria-current={pathname === child.href ? 'page' : undefined}
                >
                  <div className="font-medium text-gray-800">
                    {child.label}
                  </div>
                  {child.description && (
                    <div className="text-sm text-gray-500 mt-1">
                      {child.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Navbar component
export default function ModernNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  // Handle dropdown toggle
  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Close dropdowns when clicking elsewhere or when path changes
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close mobile menu and dropdowns with ESC key
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
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
                  {item.children ? (
                    <DropdownMenu
                      item={item}
                      isOpen={openDropdown === item.label}
                      onToggle={() => handleDropdownToggle(item.label)}
                    />
                  ) : (
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
                  )}
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
