'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Define the navigation item type
interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

// Simple navigation data
const navigation: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Solutions',
    children: [
      { label: 'Cost Reduction', href: '/solutions/cost-reduction' },
      { label: 'Operational Excellence', href: '/solutions/operations' },
      { label: 'Implementation', href: '/solutions/implementation' },
    ]
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Contact',
    href: '/contact',
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
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
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
                            {child.label}
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
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-2">
            {item.children?.map((child) => (
              <Link
                key={child.label}
                href={child.href || '#'}
                className="block px-4 py-2 hover:bg-gray-50 rounded-md"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Navbar with dropdowns
export default function EnhancedNavbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">NP</span>
          </div>
          <span>NorthPath</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
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
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium rounded-md"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
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
