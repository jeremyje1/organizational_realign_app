/ ** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
    safelist: [n    "bg-neutral-50",n  ],  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  safelist: [
    // Legacy gray-* utilities still used in codebase
    'bg-gray-50',
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