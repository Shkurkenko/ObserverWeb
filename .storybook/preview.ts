import 'tailwindcss'
import '../Autogen/Themes/ForensicThemes/TailwindAutogen'
import '../Autogen/Themes/ForensicThemes/TailwindColors'
import '../Autogen/Themes/ForensicThemes/Theme.registry'
import '../Autogen/Themes/ForensicThemes/Theme.types'
import '../Src/style.sass'

import type { Preview } from '@storybook/preact-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
