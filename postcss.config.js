/** postcss.config.js – _only_ this content */
module.exports = {
  plugins: {
    'postcss-import': {},       // keep @import support
    '@tailwindcss/postcss': {}, // Tailwind v4 PostCSS plugin
    autoprefixer: {},
  },
};