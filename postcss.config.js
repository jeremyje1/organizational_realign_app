// postcss.config.js
import postcssImport from 'postcss-import';
import tailwindcss   from 'tailwindcss';
import nesting       from 'postcss-nesting';
import autoprefixer  from 'autoprefixer';

export default {
  plugins: [
    postcssImport,   // 👈 must be first
    tailwindcss,
    nesting,         // Tailwind 4 requires PostCSS 8 nesting plugin
    autoprefixer
  ],
};