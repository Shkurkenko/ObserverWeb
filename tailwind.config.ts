import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './public/*.html',
    './index.html',
    './Src/**/*.{ts, tsx, html, css}',
    './Autogen/**/*.{ts, tsx, css}',
    './Config/**/*.{ts, tsx, css}',
  ],
  plugins: [],
  theme: {
    extend: {},
  },
}

export default config
