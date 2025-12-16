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
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-surface-container-high) var(--color-surface-container)',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--color-surface-container)',
            borderRadius: '20px',
            border: '1px solid white',
          },
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
  theme: {
    extend: {},
  },
}

export default config
