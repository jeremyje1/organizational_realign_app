import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      //  <── add this block
      colors: {
        gray: colors.neutral,  // alias old `gray-*` classes to `neutral-*`
      },
    },
  },
  plugins: [],
} satisfies Config;