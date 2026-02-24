import { useEffect, useState, useContext, useCallback } from 'preact/hooks'
import { createContext } from 'preact'
import { ComponentChildren } from 'preact'
import { ThemeName } from '../../Autogen/Themes/ForensicThemes/Theme.registry'
import { toKebabCase } from '../../Utils/Helpers'
import { Theme, Variant, Themes } from '@Config/Themes/Theme.types'

interface ThemeContextProps {
  theme: Theme
  variant: Variant
  variants?: Variant[]
  themes?: Theme[]
  colors?: {}
  setThemeVariant: (theme: Theme, variant: Variant) => void
}

const ThemeContext = createContext<ThemeContextProps | null>(null)

interface IThemeProvider {
  children: ComponentChildren
}

export const ThemeProvider = ({ children, ...props }: IThemeProvider) => {
  const [theme, setTheme] = useState<Theme>('ForensicBlue')
  const [variant, setVariant] = useState<Variant>('dark')
  const [colors, setColors] = useState({})

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

  const getThemeColor = useCallback((variable: string): string => {
    // Пробуем найти переменную в :root
    const root = document.documentElement
    const value = getComputedStyle(root).getPropertyValue(variable).trim()

    if (!value) {
      console.warn(`Color variable ${variable} not found`)
      return '#000000'
    }

    // Если это rgb кортеж (123, 45, 67)
    if (value.includes(',')) {
      return `rgb(${value})`
    }

    // Если это уже цвет
    return value
  }, [])

  useEffect(() => {
    const apply = async () => {
      const prev = document.getElementById('dynamic-theme')
      if (prev) prev.remove()

      const mod = await Themes[theme][variant]()
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

      // Initialize colors sate to get this colors from hook later
      setColors((prev) => {
        return {
          background: getThemeColor('--md-sys-color-background'),
          error: getThemeColor('--md-sys-color-error'),
          errorContainer: getThemeColor('--md-sys-color-error-container'),
          highest: getThemeColor('--md-sys-color-highest'),
          inverseOnSurface: getThemeColor('--md-sys-color-inverse-on-surface'),
          inversePrimary: getThemeColor('--md-sys-color-inverse-primary'),
          inverseSurface: getThemeColor('--md-sys-color-inverse-surface'),
          onBackground: getThemeColor('--md-sys-color-on-background'),
          onError: getThemeColor('--md-sys-color-on-error'),
          onErrorContainer: getThemeColor('--md-sys-color-on-error-container'),
          onPrimary: getThemeColor('--md-sys-color-on-primary'),
          onPrimaryContainer: getThemeColor('--md-sys-color-on-primary-container'),
          onPrimaryFixed: getThemeColor('--md-sys-color-on-primary-fixed'),
          onPrimaryFixedVariant: getThemeColor('--md-sys-color-on-primary-fixed-variant'),
          onSecondary: getThemeColor('--md-sys-color-on-secondary'),
          onSecondaryContainer: getThemeColor('--md-sys-color-on-secondary-container'),
          onSecondaryFixed: getThemeColor('--md-sys-color-on-secondary-fixed'),
          onSecondaryFixedVariant: getThemeColor('--md-sys-color-on-secondary-fixed-variant'),
          onSurface: getThemeColor('--md-sys-color-on-surface'),
          onSurfaceVariant: getThemeColor('--md-sys-color-on-surface-variant'),
          onTertiary: getThemeColor('--md-sys-color-on-tertiary'),
          onTertiaryContainer: getThemeColor('--md-sys-color-on-tertiary-container'),
          onTertiaryFixed: getThemeColor('--md-sys-color-on-tertiary-fixed'),
          onTertiaryFixedVariant: getThemeColor('--md-sys-color-on-tertiary-fixed-variant'),
          outline: getThemeColor('--md-sys-color-outline'),
          outlineVariant: getThemeColor('--md-sys-color-outline-variant'),
          primary: getThemeColor('--md-sys-color-primary'),
          primaryContainer: getThemeColor('--md-sys-color-primary-container'),
          primaryFixed: getThemeColor('--md-sys-color-primary-fixed'),
          primaryFixedDim: getThemeColor('--md-sys-color-primary-fixed-dim'),
          scrim: getThemeColor('--md-sys-color-scrim'),
          secondary: getThemeColor('--md-sys-color-secondary'),
          secondaryContainer: getThemeColor('--md-sys-color-secondary-container'),
          secondaryFixed: getThemeColor('--md-sys-color-secondary-fixed'),
          secondaryFixedDim: getThemeColor('--md-sys-color-secondary-fixed-dim'),
          shadow: getThemeColor('--md-sys-color-shadow'),
          surface: getThemeColor('--md-sys-color-surface'),
          surfaceBright: getThemeColor('--md-sys-color-surface-bright'),
          surfaceContainer: getThemeColor('--md-sys-color-surface-container'),
          surfaceContainerHigh: getThemeColor('--md-sys-color-surface-container-high'),
          surfaceContainerHighest: getThemeColor('--md-sys-color-surface-container-highest'),
          surfaceContainerLow: getThemeColor('--md-sys-color-surface-container-low'),
          surfaceContainerLowest: getThemeColor('--md-sys-color-surface-container-lowest'),
          surfaceDim: getThemeColor('--md-sys-color-surface-dim'),
          surfaceTint: getThemeColor('--md-sys-color-surface-tint'),
          surfaceVariant: getThemeColor('--md-sys-color-surface-variant'),
          tertiary: getThemeColor('--md-sys-color-tertiary'),
          tertiaryContainer: getThemeColor('--md-sys-color-tertiary-container'),
          tertiaryFixed: getThemeColor('--md-sys-color-tertiary-fixed'),
          tertiaryFixedDim: getThemeColor('--md-sys-color-tertiary-fixed-dim'),
        }
      })
    }

    apply()
  }, [theme, variant])

  const variants = Object.keys(Themes[theme]) as Variant[]

  return (
    <ThemeContext.Provider value={{ theme, variant, variants, colors, setThemeVariant }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
