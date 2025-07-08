const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { minify } = require('terser');

// Minify CSS files
async function minifyCSS() {
  const cssDir = path.resolve(__dirname, 'styles');
  const files = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
  
  for (const file of files) {
    const filePath = path.join(cssDir, file);
    const css = fs.readFileSync(filePath, 'utf8');
    
    try {
      const result = await postcss([
        autoprefixer,
        cssnano({ preset: 'default' })
      ]).process(css, { from: filePath });
      
      // Write minified file with .min.css extension
      const minifiedPath = path.join(cssDir, file.replace('.css', '.min.css'));
      fs.writeFileSync(minifiedPath, result.css);
      console.log(`✅ Minified: ${file} -> ${path.basename(minifiedPath)}`);
    } catch (error) {
      console.error(`❌ Error minifying ${file}:`, error);
    }
  }
}

// Minify JavaScript files
async function minifyJS() {
  const jsDir = path.resolve(__dirname, 'public/js');
  
  if (!fs.existsSync(jsDir)) {
    console.log('No JS directory found at public/js');
    return;
  }
  
  const files = fs.readdirSync(jsDir).filter(file => file.endsWith('.js') && !file.endsWith('.min.js'));
  
  for (const file of files) {
    const filePath = path.join(jsDir, file);
    const js = fs.readFileSync(filePath, 'utf8');
    
    try {
      const result = await minify(js, {
        compress: {
          drop_console: true,
        },
        mangle: {
          toplevel: true,
        }
      });
      
      // Write minified file with .min.js extension
      const minifiedPath = path.join(jsDir, file.replace('.js', '.min.js'));
      fs.writeFileSync(minifiedPath, result.code);
      console.log(`✅ Minified: ${file} -> ${path.basename(minifiedPath)}`);
    } catch (error) {
      console.error(`❌ Error minifying ${file}:`, error);
    }
  }
}

async function main() {
  console.log('🔍 Starting minification process...');
  await minifyCSS();
  await minifyJS();
  console.log('✨ Minification complete!');
}

main().catch(error => {
  console.error('Error during minification:', error);
  process.exit(1);
});
