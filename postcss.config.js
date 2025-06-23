/ ** @type {import('postcss').Config} * /
module.exports = {
  plugins: {
    // CSS nesting via PostCSS plugin (avoids Tailwind sub‑path error)
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};