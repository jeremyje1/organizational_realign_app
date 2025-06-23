/** @type {import('postcss').Config} */
module.exports = {
  plugins: [
    require("@tailwindcss/postcss"),
    require("postcss-nesting"),
    require("autoprefixer"),
  ],
};