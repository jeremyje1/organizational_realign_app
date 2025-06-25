import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Providers from "./providers";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Organizational Realignment Tool",
  description:
    "Wizard for proposing and tracking organizational realignment scenarios",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
        <Providers>
          <nav className="bg-white shadow-sm px-6 py-3 mb-6" role="navigation" aria-label="Main navigation">
            <ul className="flex space-x-4 text-sm font-medium text-gray-700">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/survey"
                  className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
                >
                  Survey
                </Link>
              </li>
              <li>
                <Link
                  href="/realignment"
                  className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
                >
                  Realignment
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
                >
                  Results
                </Link>
              </li>
              <li>
                <Link
                  href="/workspaces"
                  className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
                >
                  Workspaces
                </Link>
              </li>
            </ul>
          </nav>
          <div className="max-w-6xl mx-auto px-4">{children}</div>
          <footer role="contentinfo" className="mt-12 py-6 text-center text-sm text-gray-500 border-t">
            <p>
              Organizational Realignment Tool v1.0 —{" "}
              <a href="mailto:support@northpathstrategies.org" className="text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 ring-blue-500 rounded">
                Send Feedback
              </a>
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}