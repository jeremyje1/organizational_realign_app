// Design tokens for Organizational Realignment App
// Based on NorthPath brand assets and extracted color palette

export const designTokens = {
  // NorthPath Brand Colors - extracted from logo and brand assets
  colors: {
    // Primary brand colors from NorthPath logo analysis
    primary: {
      deepBlue: '#0B2F5C',       // Primary dark blue from logo
      primaryBlue: '#1654A3',    // Main brand blue
      brightBlue: '#2B7CE9',     // Accent blue
      lightBlue: '#5BA3F5',      // Light accent
    },
    
    // Secondary brand colors
    secondary: {
      steelGray: '#4A5568',      // Professional gray
      warmGray: '#718096',       // Neutral gray
      lightGray: '#E2E8F0',      // Background gray
      offWhite: '#F7FAFC',       // Clean background
    },
    
    // Accent colors from brand materials
    accent: {
      gold: '#F6B945',           // Premium gold accent
      amber: '#ED8936',          // Warm amber
      successGreen: '#38A169',   // Success states
      warningOrange: '#DD6B20',  // Warning states
    },
    
    // Semantic colors using brand palette
    semantic: {
      success: '#38A169',        // Using brand success green
      warning: '#F6B945',        // Using brand gold
      error: '#DC2626',          // Standard error red
      info: '#1654A3',           // Using primary brand blue
    },
    
    // Neutral palette
    neutral: {
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
    
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
    }
  },
  
  // Typography scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
    },
    
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px  
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  
  // Spacing scale
  spacing: {
    px: '1px',
    0.5: '0.125rem',    // 2px
    1: '0.25rem',       // 4px
    2: '0.5rem',        // 8px
    3: '0.75rem',       // 12px
    4: '1rem',          // 16px
    5: '1.25rem',       // 20px
    6: '1.5rem',        // 24px
    8: '2rem',          // 32px
    10: '2.5rem',       // 40px
    12: '3rem',         // 48px
    16: '4rem',         // 64px
    20: '5rem',         // 80px
    24: '6rem',         // 96px
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',     // 2px
    base: '0.25rem',    // 4px
    md: '0.375rem',     // 6px
    lg: '0.5rem',       // 8px
    xl: '0.75rem',      // 12px
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  // Animation durations
  transitionDuration: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
  }
} as const;

// Export individual token groups for easier imports
export const { colors, typography, spacing, borderRadius, boxShadow, transitionDuration } = designTokens;