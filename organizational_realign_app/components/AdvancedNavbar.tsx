'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Define the navigation item type
interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  description?: string;
}

// Navigation data with descriptions
const navigation: NavItem[] = [
  {
    label: 'Assessment',
    href: '/assessment/start',
    description: '15-minute assessment - Identify savings opportunities'
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
        description: '90-day transformation programs with ROI'
      },
    ]
  },
  {
    label: 'Company',
    children: [
      { 
        label: 'About', 
        href: '/about',
        description: 'Our team and expertise'
      },
      { 
        label: 'Methodology', 
        href: '/methodology',
        description: 'Our proven transformation framework'
      },
    ]
  },
  {
    label: 'Pricing',
    href: '/pricing',
    description: 'Packages with ROI guarantee'
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Get in touch with our team'
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
              <div className="w-8 h-8 rounded-lg bg-blue-500"></div>
              <span className="font-bold text-xl text-gray-900">NorthPath</span>
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
                      className="w-full flex items-center justify-between p-3 text-left text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => toggleExpanded(item.label)}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span>{expandedItems.includes(item.label) ? '▲' : '▼'}</span>
                    </button>
                    
                    {expandedItems.includes(item.label) && (
                      <div className="pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href || '#'}
                            onClick={onClose}
                            className="block p-3 text-gray-600 hover:bg-gray-50 rounded-md"
                          >
                            <span className="font-medium">{child.label}</span>
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
                    className="block p-3 text-gray-700 hover:bg-gray-100 font-medium rounded-md"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Call to action */}
          <div className="mt-8">
            <Link 
              href="/assessment/start" 
              onClick={onClose}
              className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Dropdown menu component
function DropdownMenu({ item, isOpen, onToggle }: { 
  item: NavItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium rounded-md"
        onClick={onToggle}
      >
        {item.label}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-2">
            {item.children?.map((child) => (
              <Link
                key={child.label}
                href={child.href || '#'}
                className="block p-3 hover:bg-gray-50 rounded-md"
              >
                <div className="font-medium text-gray-800">{child.label}</div>
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

// Advanced Navbar with theme-aware styling
export default function AdvancedNavbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">NP</span>
          </div>
          <span>NorthPath</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          {navigation.map((item) => (
            <div key={item.label} onClick={(e) => e.stopPropagation()}>
              {item.children ? (
                <DropdownMenu
                  item={item}
                  isOpen={openDropdown === item.label}
                  onToggle={() => handleDropdownToggle(item.label)}
                />
              ) : (
                <Link
                  href={item.href || '#'}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium rounded-md"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* CTA Button */}
          <Link 
            href="/assessment/start"
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Start Assessment
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            className="p-2 border border-gray-300 rounded-md text-gray-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
