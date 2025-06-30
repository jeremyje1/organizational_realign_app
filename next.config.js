/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ─── Opt‑in features you actually need ─────────────
  experimental: {
    // keep typed routes if you use them
    typedRoutes: true
  },

  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;