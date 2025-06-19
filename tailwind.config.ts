// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
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