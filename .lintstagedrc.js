const path = require('path')

// auto lint setting
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`
const buildPrettierCommand = () => `npx prettier --write './**/*.{js,ts,tsx}'`
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand],
}
