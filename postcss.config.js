/* eslint-env node */
/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    /* 1️⃣ required for @apply inside nested selectors */
    'tailwindcss/nesting': {},

    /* 2️⃣ the NEW Tailwind v4 PostCSS plugin  */
    '@tailwindcss/postcss': {},

    /* 3️⃣ normal PostCSS goodies */
    autoprefixer: {},
  },
};