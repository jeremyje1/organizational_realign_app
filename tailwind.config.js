

/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Re-enable legacy gray-* utilities by mapping to the neutral palette
        gray: colors.neutral,
      },
    },
  },
  plugins: [],
};