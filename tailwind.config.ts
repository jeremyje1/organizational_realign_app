import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,     // bg-gray-50 -> zinc-50
        neutral: colors.zinc,  // bg-neutral-50 -> zinc-50
      },
    },
  },
  plugins: [],
}

export default config