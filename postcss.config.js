/ ** @type {import('postcss').ProcessOptions} * /
export default {
  plugins: {
    // Tailwind CSS v4 PostCSS plugin
    '@tailwindcss/postcss': {},
    // Add vendor prefixes automatically
    autoprefixer: {},
  },
};