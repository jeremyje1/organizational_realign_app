/** @type {import('next').NextConfig} */
const path = require('path')
module.exports = {
  webpack: (config) => {
    // Same mapping you put in tsconfig.json
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  }
}
