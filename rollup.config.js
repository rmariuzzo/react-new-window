import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
import { minify } from 'uglify-es'
import pkg from './package.json';

export default [

  // browser-friendly UMD build
  {
    input: 'src/NewWindow.js',
    external: ['react', 'react-dom'],
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    output: {
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    name: 'ReactNewWindow',
    plugins: [
      babel(),
      uglify({}, minify),
      filesize(),
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/NewWindow.js',
    external: ['react', 'react-dom'],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
      babel(),
      uglify({}, minify),
      filesize(),
    ]
  }
];
