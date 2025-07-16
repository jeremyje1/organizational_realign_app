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
        'nps-blue': '#1654A3',
        'nps-slate': '#2A2E33',
        'nps-light': '#F6F8FC',
        
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
          950: '#020617',
        },
        neutral: {
          50: '#F8FAFC',   // Modern light gray
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',   // Deep slate
          950: '#020617',   // Almost black
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Emerald success
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#F43F5E', // Rose error
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
        
        // Legacy compatibility
        northpath: {
          'deep-blue': '#0F172A',     // Updated to modern slate
          'primary-blue': '#6366F1',   // Updated to modern primary
          'bright-blue': '#8B5CF6',    // Updated to secondary
          'light-blue': '#C084FC',     // Updated to light secondary
          'steel-gray': '#475569',     // Updated to neutral
          'warm-gray': '#64748B',      // Updated to neutral
          'light-gray': '#E2E8F0',     // Updated to neutral
          'off-white': '#F8FAFC',      // Updated to neutral
          'gold': '#F59E0B',           // Updated to accent
          'amber': '#D97706',          // Updated to accent
          'success-green': '#10B981',   // Updated to success
          'warning-orange': '#F59E0B',  // Updated to accent
        },
        
        // Legacy mappings for backward compatibility
        'np-blue': {
          50: '#F0F4FF',
          100: '#E5ECFF', 
          200: '#C3D4FF',
          300: '#A0BBFF',
          400: '#7B9CFF',
          500: '#6366F1',
          600: '#5B5CE0',
          700: '#5044D4',
          800: '#4338CA',
          900: '#3730A3',
        },
        'np-gray': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        'np-gold': {
          50: '#FFFBEA',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        
        // Updated legacy colors for modern design
        midnight: '#0F172A',      // Updated to modern slate
        gold: '#F59E0B',          // Updated to modern accent
        sage: '#10B981',          // Updated to modern success
        cream: '#F8FAFC',         // Updated to modern neutral
        charcoal: '#334155',      // Updated to modern slate
        coral: '#F43F5E',         // Updated to modern error
        
        // Modern design system extensions
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          black: 'rgba(0, 0, 0, 0.1)',
          primary: 'rgba(99, 102, 241, 0.1)',
          secondary: 'rgba(139, 92, 246, 0.1)',
        },
        
        // Standard blue colors for backwards compatibility
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      
      // Modern Typography System
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      
      // Variable Font Support
      fontWeight: {
        thin: '100',
        extralight: '200', 
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      // Enhanced Typography Scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.03em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.035em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.045em' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.05em' }],
        '8xl': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.055em' }],
        '9xl': ['8rem', { lineHeight: '1.1', letterSpacing: '-0.06em' }],
      },
      
      // Modern Spacing Scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
      },
      
      // Advanced Border Radius
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        'full': '9999px',
        // NPS Brand Token
        'nps': '0.5rem', // nps-radius
      },
      
      // Premium Shadow System
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        
        // NPS Brand Token
        'nps': '0 4px 14px rgba(0,0,0,0.06)', // nps-shadow
        
        // Glass morphism shadows
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 25px 45px 0 rgba(31, 38, 135, 0.25)',
        
        // Neumorphism shadows
        'neumorph-inset': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'neumorph': '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)',
        'neumorph-lg': '20px 20px 40px rgba(0, 0, 0, 0.1), -20px -20px 40px rgba(255, 255, 255, 0.8)',
        
        // Premium shadows
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'elegant': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      
      // Animation System
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(139, 92, 246, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 5px rgba(99, 102, 241, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(139, 92, 246, 0.6)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'rotate-in': {
          '0%': { opacity: '0', transform: 'rotate(-180deg) scale(0.5)' },
          '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'blob-slow': {
          '0%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translate(10px, 5px) scale(1.05)',
            opacity: '0.7',
          },
          '100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.6',
          },
        },
        'creative-waves': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%, 100% 50%, 0% 0%, 0% 0%' 
          },
          '50%': { 
            backgroundPosition: '100% 50%, 0% 50%, 0% 0%, 0% 0%' 
          },
        },
        'dots-float': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '12px 12px' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in-up': 'slideInUp 0.6s ease-out',
        'slide-in-down': 'slideInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float-delayed 3s ease-in-out infinite 1s',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out',
        'text-glow': 'text-glow 2s ease-in-out infinite alternate',
        'scale-in': 'scale-in 0.5s ease-out',
        'bounce-in': 'bounce-in 0.8s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'rotate-in': 'rotate-in 0.6s ease-out',
        blob: 'blob 7s infinite',
        'blob-slow': 'blob 10s infinite',
        'creative-waves': 'creative-waves 8s ease-in-out infinite',
        'dots-float': 'dots-float 20s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),      // Custom plugin for modern utilities
    function({ addUtilities, addComponents, theme }) {
      // Glass morphism utilities
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.neumorph': {
          background: '#f0f0f0',
          boxShadow: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff',
        },
        '.neumorph-inset': {
          background: '#f0f0f0',
          boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff',
        },
        // Pages background utility
        '.bg-pages': {
          backgroundColor: 'red',
          backgroundImage: 'url("/images/pages-background-60.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        },
      });
      
      // Modern gradient components
      addComponents({
        '.gradient-primary': {
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        },
        '.gradient-secondary': {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%)',
        },
        '.gradient-accent': {
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        },
        '.gradient-text': {
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      });
      
      // Animation delay utilities
      addUtilities({
        '.animation-delay-500': {
          animationDelay: '0.5s',
        },
        '.animation-delay-1000': {
          animationDelay: '1s',
        },
        '.animation-delay-1500': {
          animationDelay: '1.5s',
        },
        '.animation-delay-2000': {
          animationDelay: '2s',
        },
        '.animation-delay-2500': {
          animationDelay: '2.5s',
        },
        '.animation-delay-3000': {
          animationDelay: '3s',
        },
        '.animation-delay-3500': {
          animationDelay: '3.5s',
        },
        '.animation-delay-4000': {
          animationDelay: '4s',
        },
        '.animation-delay-4500': {
          animationDelay: '4.5s',
        },
        '.animation-delay-5000': {
          animationDelay: '5s',
        },
        '.animation-delay-6000': {
          animationDelay: '6s',
        },
        '.animation-delay-7000': {
          animationDelay: '7s',
        },
        '.animation-delay-8000': {
          animationDelay: '8s',
        },
        '.animation-delay-9000': {
          animationDelay: '9s',
        },
        '.animation-delay-10000': {
          animationDelay: '10s',
        },
      });
    },
  ],
};