// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",        // ✅ all App-router files
    "./components/**/*.{ts,tsx}", // ✅ any colocated UI
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0E1A2B",
        sky: "#E6F1FF",
        gold: "#F5C249",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),      // ➊ nicer form controls
    require("@tailwindcss/typography"), // ➋ prose styling (optional)
    require("tailwindcss-animate"),     // ➌ convenience animate classes
  ],
} satisfies Config;