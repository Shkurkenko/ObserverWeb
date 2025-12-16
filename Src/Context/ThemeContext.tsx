import { useEffect, useState, useContext, useCallback } from 'preact/hooks'
import { createContext } from 'preact'
import { ComponentChildren } from 'preact'
import { ThemeName } from '../../Autogen/Themes/ForensicThemes/Theme.registry'
import { toKebabCase } from '../../Utils/Helpers'

const themes = {
  ForensicGreen: {
    light: async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/light.css?raw'),
    'light-hc': async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/dark-high-contrast.css?raw'),
    'light-mc': async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/light-mid-contrast.css?raw'),
    dark: async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/dark.css?raw'),
    'dark-hc': async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/dark-high-contrast.css?raw'),
    'dark-mc': async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicGreen/css/dark-mid-contrast.css?raw'),
  },
  ForensicBlue: {
    light: async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/light.css?raw'),
    'light-hc': async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/dark-high-contrast.css?raw'),
    'light-mc': async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/light-mid-contrast.css?raw'),
    dark: async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/dark.css?raw'),
    'dark-hc': async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/dark-high-contrast.css?raw'),
    'dark-mc': async () =>
      await import('../../Config/Themes/ForensicThemes/WEB/ForensicBlue/css/dark-mid-contrast.css?raw'),
  },
} as const

export type Theme = keyof typeof themes
export type Variant = keyof (typeof themes)[Theme]

interface IThemeContext {
  theme: Theme
  variant: Variant
  variants?: Variant[]
  themes?: Theme[]
  setThemeVariant: (theme: Theme, variant: Variant) => void
}

const ThemeContext = createContext<IThemeContext | null>(null)

interface IThemeProvider {
  children: ComponentChildren
}

export const ThemeProvider = ({ children, ...props }: IThemeProvider) => {
  const [theme, setTheme] = useState<Theme>('ForensicGreen')
  const [variant, setVariant] = useState<Variant>('dark')

  const getClassNameFromThemeName = useCallback((themeName: ThemeName | string) => {
    return `theme-${toKebabCase(themeName)}`
  }, [])

  const validCssClass = useCallback((css: string) => {
    return css
      .replace('.dark', ':root')
      .replace('.dark-hc', ':root')
      .replace('.dark-mc', ':root')
      .replace('.light', ':root')
      .replace('.light-hc', ':root')
      .replace('.light-mc', ':root')
      .replace('-high-contrast', '')
      .replace('-mid-contrast', '')
  }, [])

  const setThemeVariant = useCallback((theme: Theme, variant: Variant) => {
    setTheme((prev) => theme)
    setVariant((prev) => variant)
  }, [])

  useEffect(() => {
    const apply = async () => {
      const prev = document.getElementById('dynamic-theme')
      if (prev) prev.remove()

      const mod = await themes[theme][variant]()
      const css = (mod as { default: string }).default

      const style = document.createElement('style')
      style.id = 'dynamic-theme'
      style.textContent = validCssClass(css)
      document.head.appendChild(style)

      document.documentElement.className = ''
      document.documentElement.classList.add(
        getClassNameFromThemeName(theme),
        variant.includes('dark') ? 'dark' : 'light',
      )
    }
    apply()
  }, [theme, variant])

  const variants = Object.keys(themes[theme]) as Variant[]

  return (
    <ThemeContext.Provider value={{ theme, variant, variants, setThemeVariant }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
