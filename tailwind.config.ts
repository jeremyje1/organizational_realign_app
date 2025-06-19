// tailwind.config.ts
import { type Config } from 'tailwindcss';

const config = {
  content: {
    files: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './lib/**/*.{js,ts,jsx,tsx}',
      './apps/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: ['bg-background', 'text-foreground'],
  },
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: 'hsl(var(--primary) / <alpha-value>)',
        'primary-foreground': 'hsl(var(--primary-foreground) / <alpha-value>)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
} satisfies Config;

export default config;