// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',        // shared utilities
    './apps/**/*.{js,ts,jsx,tsx,mdx}',   // all app-dir workspaces
  ],
  theme: {
    extend: {
      /** add ↓ this ↓ */
      colors: {
        /* solid hex OR a CSS variable */
        background: '#ffffff',          // <- light mode
        // darkBackground: '#050505',   // <- if you need a dark token
      },
    },
  },
  plugins: [],
} satisfies Config;