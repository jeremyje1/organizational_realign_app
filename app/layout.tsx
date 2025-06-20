import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizational Realignment Tool",
  description:
    "Wizard for proposing and tracking organizational realignment scenarios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e40af" />
        <meta property="og:title" content="Organizational Realignment Tool" />
        <meta property="og:description" content="Propose and manage realignment scenarios." />
        <meta property="og:image" content="/og-image.png" />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
        <nav className="bg-white shadow-sm px-6 py-3 mb-6" role="navigation" aria-label="Main navigation">
          <ul className="flex space-x-4 text-sm font-medium text-gray-700">
            <li>
              <a
                href="/dashboard"
                aria-current="page"
                className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/survey"
                aria-current="page"
                className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
              >
                Survey
              </a>
            </li>
            <li>
              <a
                href="/realignment"
                aria-current="page"
                className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
              >
                Realignment
              </a>
            </li>
            <li>
              <a
                href="/results"
                aria-current="page"
                className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
              >
                Results
              </a>
            </li>
            <li>
              <a
                href="/workspaces"
                aria-current="page"
                className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 ring-blue-500 rounded"
              >
                Workspaces
              </a>
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
      </body>
    </html>
  );
}