import { defineConfig } from 'vitest/config'

import viteConfig from './vite.config'
import { mergeConfig } from 'vite'

const vitestConfig = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
})

export default mergeConfig(viteConfig, vitestConfig)
