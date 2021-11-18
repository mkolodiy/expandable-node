// tslint:disable
import postcss from 'rollup-plugin-postcss';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const baseOutput = {
  name: 'expandable-node',
  sourcemap: true
};

export default {
  input: 'src/index.ts',
  output: [
    {
      ...baseOutput,
      file: 'dist/esm/expandable-node.js',
      format: 'es'
    },
    {
      ...baseOutput,
      file: 'dist/esm/expandable-node.min.js',
      format: 'es',
      plugins: [terser({ module: true })]
    },
    {
      ...baseOutput,
      file: 'dist/umd/expandable-node.js',
      format: 'umd'
    },
    {
      ...baseOutput,
      file: 'dist/umd/expandable-node.min.js',
      format: 'umd',
      plugins: [terser()]
    }
  ],
  plugins: [typescript(), postcss(), sourceMaps()]
};
