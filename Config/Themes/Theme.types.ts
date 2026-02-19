export const Themes = {
  ForensicGreen: {
    light: async () => await import('./ForensicThemes/WEB/ForensicGreen/css/light.css?raw'),
    'light-hc': async () =>
      await import('./ForensicThemes/WEB/ForensicGreen/css/dark-high-contrast.css?raw'),
    'light-mc': async () =>
      await import('./ForensicThemes/WEB/ForensicGreen/css/light-mid-contrast.css?raw'),
    dark: async () => await import('./ForensicThemes/WEB/ForensicGreen/css/dark.css?raw'),
    'dark-hc': async () =>
      await import('./ForensicThemes/WEB/ForensicGreen/css/dark-high-contrast.css?raw'),
    'dark-mc': async () =>
      await import('./ForensicThemes/WEB/ForensicGreen/css/dark-mid-contrast.css?raw'),
  },
  ForensicBlue: {
    light: async () => await import('./ForensicThemes/WEB/ForensicBlue/css/light.css?raw'),
    'light-hc': async () =>
      await import('./ForensicThemes/WEB/ForensicBlue/css/dark-high-contrast.css?raw'),
    'light-mc': async () =>
      await import('./ForensicThemes/WEB/ForensicBlue/css/light-mid-contrast.css?raw'),
    dark: async () => await import('./ForensicThemes/WEB/ForensicBlue/css/dark.css?raw'),
    'dark-hc': async () =>
      await import('./ForensicThemes/WEB/ForensicBlue/css/dark-high-contrast.css?raw'),
    'dark-mc': async () =>
      await import('./ForensicThemes/WEB/ForensicBlue/css/dark-mid-contrast.css?raw'),
  },
} as const

export type Theme = keyof typeof Themes
export type Variant = keyof (typeof Themes)[Theme]
