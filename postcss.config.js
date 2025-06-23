/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    // the order matters
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};