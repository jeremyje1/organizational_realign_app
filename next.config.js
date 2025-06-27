/ ** @type {import('next').NextConfig} * /
const nextConfig = {
  reactStrictMode: true,

  // ─── Opt‑in Next.js features ───────────────────────────────
  experimental: {
    // keep your existing opts
    typedRoutes: true,
    topLevelAwait: true,
    // ensure the `/app` directory is enabled
    appDir: true,
  },

  // ─── Image domains (Google avatars, etc.) ──────────────────
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;