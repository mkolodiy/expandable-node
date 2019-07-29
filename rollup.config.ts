import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

// tslint:disable-next-line: no-var-requires
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
      minimize: true
    }),
    terser({
      include: [/^.+\.min\.js$/]
    }),
    copy({
      targets: [{ src: 'src/assets/icons', dest: 'dist/css' }]
    })
  ]
};
