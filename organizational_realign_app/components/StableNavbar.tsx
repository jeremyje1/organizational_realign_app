'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';

// Safe Link wrapper to avoid "Cannot read properties of undefined (reading 'call')" error
function Link({ href, children, className, onClick, ...props }: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  return (
    <NextLink href={href} {...props} onClick={onClick} className={className}>
      {children}
    </NextLink>
  );
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  description?: string;
}

// Complete navigation structure
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
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Mobile menu */}
      <div
        className="fixed top-0 right-0 h-full w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-lg"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
              <span className="font-bold text-xl text-gray-900">
                NorthPath
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-600"
            >
              Close
            </button>
          </div>

          {/* Navigation items */}
          <nav className="space-y-2">
            {navigation.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between p-3 text-left text-gray-700 hover:bg-gray-100"
                      onClick={() => toggleExpanded(item.label)}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span>
                        {expandedItems.includes(item.label) ? '▲' : '▼'}
                      </span>
                    </button>
                    
                    {expandedItems.includes(item.label) && (
                      <div className="pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href || '#'}
                            onClick={onClose}
                            className="block p-3 text-gray-600 hover:bg-gray-50"
                          >
                            <span>{child.label}</span>
                            {child.description && (
                              <p className="text-xs text-gray-500 mt-1">
                                {child.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    onClick={onClose}
                    className="block p-3 text-gray-700 hover:bg-gray-100 font-medium"
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
              <div className="w-full py-3 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition">
                Start Assessment
              </div>
            </Link>
            <Link href="/contact" onClick={onClose}>
              <div className="w-full py-3 border border-gray-300 text-gray-700 text-center font-medium rounded-lg hover:bg-gray-50 transition">
                Contact Sales
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Desktop dropdown menu
function DropdownMenu({ item, isOpen, onToggle }: { 
  item: NavItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {item.label}
        <span className="ml-1">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50"
        >
          <div className="p-4">
            {item.children?.map((child) => (
              <Link
                key={child.label}
                href={child.href || '#'}
                className="block p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="font-medium text-gray-800">
                  {child.label}
                </div>
                {child.description && (
                  <div className="text-sm text-gray-500">
                    {child.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Main Navbar component
export default function StableNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside() {
      setOpenDropdown(null);
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold">NP</span>
            </div>
            <span className="font-bold text-xl text-gray-900">NorthPath</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <DropdownMenu
                    item={item}
                    isOpen={openDropdown === item.label}
                    onToggle={() => handleDropdownToggle(item.label)}
                  />
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              className="p-2 border border-gray-300 rounded-lg text-gray-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
