import { useEffect, useState, useContext, useCallback } from 'preact/hooks'
import { createContext } from 'preact'
import { ComponentChildren } from 'preact'
import { ThemeName } from '../../Autogen/Themes/ForensicThemes/Theme.registry'
import { toKebabCase } from '../../Utils/Helpers'
import { ObserverConfig } from '../../Config/ObserverConfig'

export type Theme = keyof typeof ObserverConfig.Themes
export type Variant = keyof (typeof ObserverConfig.Themes)[Theme]

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

      const mod = await ObserverConfig.Themes[theme][variant]()
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

  const variants = Object.keys(ObserverConfig.Themes[theme]) as Variant[]

  return (
    <ThemeContext.Provider value={{ theme, variant, variants, setThemeVariant }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
