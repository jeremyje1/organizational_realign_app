/* eslint-env node */
/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    /** ✅ new – standard CSS nesting */
    'postcss-nesting': {},

    /** ✅ Tailwind v4 PostCSS plugin */
    '@tailwindcss/postcss': {},

    /** keep */
    autoprefixer: {},
  },
};