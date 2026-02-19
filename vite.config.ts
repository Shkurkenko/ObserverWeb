/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './Src'),
      '@Components': resolve(__dirname, './Src/Components'),
      '@Context': resolve(__dirname, './Src/Context'),
      '@Hooks': resolve(__dirname, './Src/Hooks'),
      '@Config': resolve(__dirname, './Config'),
      '@Utils': resolve(__dirname, './Utils'),
      '@Examples': resolve(__dirname, './Examples'),
      '@Assets': resolve(__dirname, './Src/Assets'),
      '@Shared': resolve(__dirname, './Src/Shared'),
      '@Views': resolve(__dirname, './Src/Views'),
    },
  },
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
