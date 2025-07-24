/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia'],
      },
      colors: {
        // NorthPath Strategies Brand Colors
        'nps-blue': {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b8ddff',
          300: '#78c2ff',
          400: '#2da5ff',
          500: '#1654A3', // Primary brand blue
          600: '#1248a3',
          700: '#0f3d8a',
          800: '#0c3270',
          900: '#0a2856',
          950: '#051a3f',
          DEFAULT: '#1654A3', // This allows bg-nps-blue to work
        },
        'nps-slate': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#2A2E33', // Brand slate
          900: '#1e293b',
          950: '#0f172a',
          DEFAULT: '#2A2E33', // This allows text-nps-slate to work
        },
        'nps-light': {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fcfcfc',
          300: '#fafafa',
          400: '#f8f8f8',
          500: '#F6F8FC', // Brand light
          600: '#f1f5f9',
          700: '#e2e8f0',
          800: '#cbd5e1',
          900: '#94a3b8',
          950: '#64748b',
          DEFAULT: '#F6F8FC', // This allows bg-nps-light to work
        },
        
        // Extended palette based on brand colors
        primary: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#BAD7FF',
          300: '#7DB8FF',
          400: '#3B94FF',
          500: '#1654A3',  // nps-blue
          600: '#1048A3',
          700: '#0D3A8A',
          800: '#0B2F70',
          900: '#082456',
          950: '#051A3F',
        },
        secondary: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
          950: '#422006',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#2A2E33',  // nps-slate
          900: '#1E293B',
          950: '#0F172A',
        },
          800: '#1E293B',
          900: '#0F172A',
  }
}
