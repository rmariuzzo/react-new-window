import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import terser from "@rollup/plugin-terser";


import pkg from './package.json'

const plugins = [
  babel({ exclude: ['node_modules/**'], babelHelpers: 'runtime' }),
  resolve(),
  commonjs(),
  replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
  terser(),
  filesize()
]

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
}

const external = ['react', 'react-dom']

export default [
  // CommonJS
  {
    input: 'src/NewWindow.js',
    output: {
      name: 'ReactNewWindow',
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      globals,
    },
    external,
    plugins
  },

  // browser-friendly UMD build
  {
    input: 'src/NewWindow.js',
    output: {
      name: 'ReactNewWindow',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      globals
    },
    external,
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
    external,
    plugins
  }
]
