/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // alias old gray-* utilities → neutral-*
      colors: {
        gray: require("tailwindcss/colors").neutral,
      },
    },
  },
  plugins: [],
};
