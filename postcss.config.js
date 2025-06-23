/** @type {import('postcss').Config} */
module.exports = {
  plugins: [
    require("@tailwindcss/postcss"),   // Tailwind 4 plugin
    require("postcss-nesting"),
    require("autoprefixer"),
  ],
};