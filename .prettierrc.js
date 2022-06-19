'use strict';

const esNextPaths = [
  // Source files
  'packages/**/src/**/*.js',
  'packages/**/src/**/*.ts',
  'packages/**/src/**/*.tsx',
];

module.exports = {
  bracketSpacing: false,
  singleQuote: true,
  bracketSameLine: true,
  printWidth: 80,
  parser: 'typescript',
  semi: true,
  tabWidth: 2,
  trailingComma: "all",
  jsxSingleQuote: true
};