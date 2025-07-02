import "./globals.css";
import type { Metadata } from "next";
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
      <body className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}