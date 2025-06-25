// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;