// tailwind.config.ts
import { type Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  content: [
    // App & page directories
    './apps/**/*.{ts,tsx,js,jsx,mdx}',
    './app/**/*.{ts,tsx,js,jsx,mdx}',   // if you still have top-level app dir
    // Shared libs / components
    './lib/**/*.{ts,tsx,js,jsx}',
    // Static HTML (optional)
    './public/**/*.html',
  ],
  theme: {
    /** --------------------------------------------------------------------
     *  Design-token colour system
     *  ------------------------------------------------------------------ */
    extend: {
      colors: {
        /* Base tokens */
        background:   '#ffffff', // ← light‐mode canvas
        foreground:   '#111827', // ← on-background text (≈ gray-900)

        /* Optional semantic aliases */
        primary:      {
          DEFAULT: '#2563eb',    // blue-600
          foreground: '#ffffff', // text on primary
        },
        secondary:    {
          DEFAULT: '#7c3aed',    // violet-600
          foreground: '#ffffff',
        },

        /* Neutrals (replace or remove as needed) */
        neutral: {
          50:  '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  /* ---------------------------------------------------------------------- */
  plugins: [
    animate,          // tailwindcss-animate
    // add other plugins here
  ],
} satisfies Config