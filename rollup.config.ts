// tslint:disable
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: pkg.name,
      format: 'umd',
      sourcemap: true
    },
    {
      file: pkg.module,
      name: pkg.name,
      format: 'es',
      sourcemap: true
    }
  ],
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true
    }),
    commonjs(),
    resolve(),
    sourceMaps(),
    postcss({
      extract: `dist/css/${pkg.name}.min.css`,
      minimize: true,
      sourceMap: true,
      plugins: [require('postcss-inline-svg')]
    }),
    terser({
      include: [/^.+\.min\.js$/]
    })
  ]
};
