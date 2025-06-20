// @ts-nocheck
import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    { files: ["./app/**/*.{ts,tsx}"], relative: true },
    { files: ["./components/**/*.{ts,tsx}"], relative: true },
  ],
  safelist: ["bg-background", "text-foreground", "text-primary"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(function () {}), // keep if you need future helpers
  ],
} satisfies Config;
