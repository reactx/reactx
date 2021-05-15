const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const Modules = require('./scripts/rollup/modules');

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const globals = {
  ...packageJson.devDependencies,
};

const importSideEffects = Modules.getImportSideEffects();
const pureExternalModules = Object.keys(importSideEffects).filter(
  (module) => !importSideEffects[module]
);
export default {
  entry: 'packages/reactx-components/index.ts',
  dest: './dist/bundle.js',
  format: 'iife',
  plugins: [
    pureExternalModules,
    resolve(),
    commonjs(),
    typescript({
      exclude: ['**/*.test.*'],
    }),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true,
    }),
  ],
};
