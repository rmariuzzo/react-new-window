import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import { minify } from 'uglify-es'
import pkg from './package.json';

const plugins = [
  babel({ exclude: ['node_modules/**'] }),
  resolve(),
  commonjs(),
  replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
  uglify({}, minify),
  filesize(),
]

export default [

  // browser-friendly UMD build
  {
    input: 'src/NewWindow.js',
    output: {
      name: 'ReactNewWindow',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      },
    },
    external: ['react', 'react-dom'],
    plugins
  },

  // ES module build.
  {
    input: 'src/NewWindow.js',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
    external: ['react', 'react-dom'],
    plugins
  }
];
