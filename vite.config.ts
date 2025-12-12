import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic', importSource: 'preact' }],
        ],
      },
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'preact-jsx-automatic',
          setup(build) {
            build.onLoad({ filter: /\.[tj]sx$/ }, async (args) => ({
              loader: 'tsx',
              contents: await require('fs').promises.readFile(args.path, 'utf8'),
            }))
          },
        },
      ],
    },
  },
  build: {
    assetsDir: 'assets',
    cssCodeSplit: false,
  },
})
