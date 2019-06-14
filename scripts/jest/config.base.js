'use strict';

module.exports = {
  haste: {
    hasteImplModulePath: require.resolve('./noHaste.js'),
  },
  modulePathIgnorePatterns: [
    '<rootDir>/scripts/rollup/shims/',
    '<rootDir>/scripts/bench/',
  ],
  transform: {
    '.*': require.resolve('./preprocessor.js'),
  },
  setupFiles: [require.resolve('./setupEnvironment.js')],
  // Only include files directly in __tests__, not in nested folders.
  testRegex: '/__tests__/[^/]*(\\.js|\\.coffee|[^d]\\.ts)$',
  moduleFileExtensions: ['js', 'json', 'node', 'coffee', 'ts'],
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages', '<rootDir>/scripts'],
  collectCoverageFrom: [
    'packages/**/*.js',
    '!packages/**/npm/*.js',
    '!packages/**/index.js',
  ],
  timers: 'fake',
};
