// Автоматически сгенерировано

import type { IThemeConfig as ForensicBlueTheme } from '/home/ilya/Documents/Projects/PreactViteBundle/Config/Themes/ForensicThemes/WEB/ForensicBlue/config'
import type { IThemeConfig as ForensicGreenTheme } from '/home/ilya/Documents/Projects/PreactViteBundle/Config/Themes/ForensicThemes/WEB/ForensicGreen/config'

export const themeRegistry = {
  ForensicBlue: () =>
    import('/home/ilya/Documents/Projects/PreactViteBundle/Config/Themes/ForensicThemes/WEB/ForensicBlue/config').then(
      (m) => m.default || m,
    ),
  ForensicGreen: () =>
    import('/home/ilya/Documents/Projects/PreactViteBundle/Config/Themes/ForensicThemes/WEB/ForensicGreen/config').then(
      (m) => m.default || m,
    ),
} as const

export type ThemeName = keyof typeof themeRegistry
