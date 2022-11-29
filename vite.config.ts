import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/NewWindow.ts'),
      name: 'ReactNewWindow',
      formats: ['es', 'umd'],
      fileName: 'react-new-window',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [
    dts({
      skipDiagnostics: false,
      insertTypesEntry: true,
      libFolderPath: './node_modules/typescript/lib',
      outputDir: ['types'],
      include: ['./src/NewWindow.ts'],
      exclude: ['node_modules'],
    }),
  ],
})
