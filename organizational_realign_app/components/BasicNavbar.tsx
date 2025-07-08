'use client';

import React from 'react';
import Link from 'next/link';

export default function BasicNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-gray-900">
          NorthPath
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/" className="text-gray-700">
            Home
          </Link>
          <Link href="/about" className="text-gray-700">
            About
          </Link>
          <Link href="/contact" className="text-gray-700">
            Contact
          </Link>
          <Link href="/pricing" className="text-gray-700">
            Pricing
          </Link>
        </nav>
      </div>
    </header>
  );
}
