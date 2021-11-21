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

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/esm/expandable-node.js',
      format: 'es',
      sourcemap: true,
      plugins: [emitModulePackageFile()]
    },
    {
      file: 'dist/esm/expandable-node.min.js',
      format: 'es',
      sourcemap: true,
      plugins: [terser({ module: true })]
    },
    {
      file: 'dist/umd/expandable-node.js',
      format: 'umd',
      sourcemap: true,
      name: 'expandableNode'
    },
    {
      file: 'dist/umd/expandable-node.min.js',
      format: 'umd',
      name: 'expandableNode',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({ plugins: [require('postcss-inline-svg')] }),
    sourceMaps()
  ]
};
