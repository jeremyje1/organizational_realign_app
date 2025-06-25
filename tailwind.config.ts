import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,        // restore canonical gray palette
        neutral: colors.neutral,  // keep neutral available too
      },
    },
  },
  plugins: [],
};

export default config;