import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // publish “gray-*” again by re‑exporting neutral
      colors: {
        gray: colors.neutral,
      },
    },
  },
  plugins: [
    // let Tailwind know the alias is intentional (suppresses warnings)
    plugin(function () {}),
  ],
} satisfies Config

export default config