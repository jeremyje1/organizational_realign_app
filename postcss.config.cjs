// postcss.config.cjs
module.exports = {
  plugins: {
    // keep import first so @tailwind directives are picked up
    'postcss-import': {},
    'postcss-nesting': {},     // for css nesting
    tailwindcss: {},
    autoprefixer: {},
  },
};