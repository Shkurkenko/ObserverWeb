/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [preact()],
  // Это заставит esbuild корректно обрабатывать JSX и не подставлять "this"
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'preact',
    loader: 'tsx',
    include: /.*\.(ts|tsx|jsx|js)$/,
  },
  server: {
    watch: {
      ignored: ['**/TcpServer/**'],
    },
  },
  build: {
    assetsDir: 'assets',
    cssCodeSplit: false,
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
