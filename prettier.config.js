/** @type {import('prettier').Config} */
export default {
  // Core formatting
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',

  // Language-specific
  parser: 'typescript',
  plugins: ['prettier-plugin-tailwindcss'],

  // Tailwind CSS class sorting - auto-detects tailwind.config.js
  // tailwindConfig option removed as it expects a string path

  // Overrides for specific file types
  overrides: [
    {
      files: ['*.json', '*.jsonc'],
      options: {
        parser: 'json',
        printWidth: 120,
      },
    },
    {
      files: ['*.md', '*.mdx'],
      options: {
        parser: 'markdown',
        printWidth: 120,
        proseWrap: 'always',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        parser: 'yaml',
        singleQuote: false,
      },
    },
    {
      files: ['*.css', '*.scss', '*.sass'],
      options: {
        parser: 'css',
        singleQuote: false,
      },
    },
    {
      files: ['*.html', '*.htm'],
      options: {
        parser: 'html',
        singleQuote: false,
      },
    },
  ],
};