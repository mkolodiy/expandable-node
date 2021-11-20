import postcss from 'rollup-plugin-postcss';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

function emitModulePackageFile() {
  return {
    generateBundle() {
      this.emitFile({
        fileName: 'package.json',
        source: `{"type":"module"}`,
        type: 'asset'
      });
    },
    name: 'emit-module-package-file'
  };
}

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
      format: 'es',
      plugins: [emitModulePackageFile()]
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
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({ plugins: [require('postcss-inline-svg')] }),
    sourceMaps()
  ]
};
