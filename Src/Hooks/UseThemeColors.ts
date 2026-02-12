import { useTheme } from '../Context/ThemeContext'
import { useMemo } from 'preact/hooks'

export interface IThemeColors {
  // Основные
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string

  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string

  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string

  // Поверхности
  surface: string
  onSurface: string
  surfaceVariant: string
  onSurfaceVariant: string

  surfaceContainer: string
  surfaceContainerLow: string
  surfaceContainerHigh: string
  surfaceContainerHighest: string

  // Состояния
  error: string
  onError: string
  errorContainer: string
  onErrorContainer: string

  // Границы
  outline: string
  outlineVariant: string

  // Фиксированные цвета операторов (не зависят от темы)
  operators: {
    mts: string
    beeline: string
    megafon: string
    tele2: string
    yota: string
    rostelecom: string
    unknown: string
  }
}

// 👇 Фиксированные цвета операторов (брендовые)
const OPERATOR_COLORS = {
  mts: '#E30613',
  beeline: '#FFCC00',
  megafon: '#1FA93A',
  tele2: '#1A9BCC',
  yota: '#99CC00',
  rostelecom: '#E31E24',
  unknown: '#6B7280',
} as const

// 👇 Хелпер для прозрачности
export const withAlpha = (color: string, alpha: number): string => {
  // Если цвет в формате rgb(r, g, b)
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`)
  }

  // Если цвет в формате hex
  if (color.startsWith('#')) {
    const hexAlpha = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')
    return `${color}${hexAlpha}`
  }

  // Если цвет уже с прозрачностью
  return color
}

// 👇 Хук для получения цветов темы
export const useThemeColors = (): IThemeColors => {
  const themeContext = useTheme()

  return useMemo(() => {
    // Если тема еще не загружена - возвращаем дефолтные цвета из forensic-green light
    if (!themeContext?.colors || Object.keys(themeContext.colors).length === 0) {
      return {
        // Основные
        primary: '#8FD5AF',
        onPrimary: '#003823',
        primaryContainer: '#005235',
        onPrimaryContainer: '#ABF2CA',

        secondary: '#B4CCBC',
        onSecondary: '#203529',
        secondaryContainer: '#364B3F',
        onSecondaryContainer: '#D0E8D7',

        tertiary: '#005235',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#ABF2CA',
        onTertiaryContainer: '#002112',

        // Поверхности
        surface: '#F5FBF4',
        onSurface: '#171D19',
        surfaceVariant: '#DEE4DE',
        onSurfaceVariant: '#414940',

        surfaceContainer: '#F5FBF4',
        surfaceContainerLow: '#F5FBF4',
        surfaceContainerHigh: '#F5FBF4',
        surfaceContainerHighest: '#F5FBF4',

        // Состояния
        error: '#BA1A1A',
        onError: '#FFFFFF',
        errorContainer: '#FFDAD6',
        onErrorContainer: '#410002',

        // Границы
        outline: '#727F77',
        outlineVariant: '#C1C9C1',

        // Операторы
        operators: OPERATOR_COLORS,
      }
    }

    const colors = themeContext.colors as Record<string, string>

    return {
      // Основные
      primary: colors.primary || '#8FD5AF',
      onPrimary: colors.onPrimary || '#003823',
      primaryContainer: colors.primaryContainer || '#005235',
      onPrimaryContainer: colors.onPrimaryContainer || '#ABF2CA',

      secondary: colors.secondary || '#B4CCBC',
      onSecondary: colors.onSecondary || '#203529',
      secondaryContainer: colors.secondaryContainer || '#364B3F',
      onSecondaryContainer: colors.onSecondaryContainer || '#D0E8D7',

      tertiary: colors.tertiary || '#005235',
      onTertiary: colors.onTertiary || '#FFFFFF',
      tertiaryContainer: colors.tertiaryContainer || '#ABF2CA',
      onTertiaryContainer: colors.onTertiaryContainer || '#002112',

      // Поверхности
      surface: colors.surface || '#F5FBF4',
      onSurface: colors.onSurface || '#171D19',
      surfaceVariant: colors.surfaceVariant || '#DEE4DE',
      onSurfaceVariant: colors.onSurfaceVariant || '#414940',

      surfaceContainer: colors.surfaceContainer || '#F5FBF4',
      surfaceContainerLow: colors.surfaceContainerLow || '#F5FBF4',
      surfaceContainerHigh: colors.surfaceContainerHigh || '#F5FBF4',
      surfaceContainerHighest: colors.surfaceContainerHighest || '#F5FBF4',

      // Состояния
      error: colors.error || '#BA1A1A',
      onError: colors.onError || '#FFFFFF',
      errorContainer: colors.errorContainer || '#FFDAD6',
      onErrorContainer: colors.onErrorContainer || '#410002',

      // Границы
      outline: colors.outline || '#727F77',
      outlineVariant: colors.outlineVariant || '#C1C9C1',

      // Операторы
      operators: OPERATOR_COLORS,
    }
  }, [themeContext?.colors])
}

// 👇 Хук для получения CSS-строки с цветом
export const useThemeCssColor = (colorKey: keyof IThemeColors, alpha: number = 1): string => {
  const colors = useThemeColors()
  const colorValue = colors[colorKey] as string

  return useMemo(() => {
    if (Array.isArray(colorValue)) return colorValue[0] || '#000000'
    return withAlpha(colorValue, alpha)
  }, [colorValue, alpha])
}
