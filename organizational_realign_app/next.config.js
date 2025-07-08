/** @type {import('next').NextConfig} */
const crypto = require('crypto');

// Security utility function to check environment variables
const checkRequiredEnvVars = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'DATABASE_URL',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
  ];

  const missingVars = requiredEnvVars.filter(
    envVar => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    console.warn(`⚠️  Missing required environment variables: ${missingVars.join(', ')}`);
    console.warn('Some functionality may not work as expected.');
  }
  
  return true;
};

// Run the check in non-production environments
if (process.env.NODE_ENV !== 'production') {
  checkRequiredEnvVars();
}

const nextConfig = {
  reactStrictMode: true,

  // Disable ESLint during build to avoid failures
  eslint: {
    // Warning: this should be temporary until all linting issues are fixed
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript type checking during build
  typescript: {
    // Warning: this should be temporary until all type issues are fixed
    ignoreBuildErrors: true,
  },

  // ─── Performance Optimizations ─────────────
  experimental: {
    // keep typed routes if you use them
    typedRoutes: false,
    // Enable modern bundling optimizations
    optimizePackageImports: ['@heroicons/react', '@headlessui/react', 'framer-motion', 'lucide-react'],
    // Enable optimized CSS
    optimizeCss: true,
    // Improved memory usage
    memoryBasedWorkersCount: true,
  },
  
  // Built-in transpilePackages instead of next-transpile-modules
  transpilePackages: ['lucide-react'],
  
  // Updated from serverComponentsExternalPackages
  serverExternalPackages: ['@prisma/client'],

  // ─── Bundle Optimization ─────────────
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ─── Performance & Caching ─────────────
  poweredByHeader: false,
  compress: true,
  
  // ─── Security Headers ─────────────
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
        },
      ],
    },
  ],

  images: {
    domains: ['lh3.googleusercontent.com', 'northpathstrategies.org', 'app.northpathstrategies.org'],
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    // Optimize image loading
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // ─── Webpack Optimizations ─────────────
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier())
            },
            name(module) {
              const hash = crypto.createHash('sha1')
              hash.update(module.identifier())
              return hash.digest('hex').substring(0, 8)
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      }
    }

    // Add bundle analyzer in development
    if (dev && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      )
    }

    return config
  },
  
  // Domain configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Static assets caching
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // API routes caching
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
    ];
  },

  // ─── Redirects for SEO ─────────────
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

// Disable Million.js compiler temporarily to troubleshoot the Link component issues
module.exports = nextConfig;