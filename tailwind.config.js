/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      gray: colors.neutral,        // enable bg-gray-50 etc.
    },
    extend: {},
  },
  plugins: [],
};
