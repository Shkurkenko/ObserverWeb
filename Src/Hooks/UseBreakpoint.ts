import { UseMediaQuery } from './UseMediaQuery'

export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',

  mobile: '(max-width: 639px)',
  tablet: '(min-width: 640px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',

  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',

  reudcedMotion: '(prefers-reduced-motion: reduce)',
  hover: '(hover: hover)',
  touch: '(hover: none)',
} as const

export type BreakpointKey = keyof typeof breakpoints

export const UseBreakpoint = (breakpoint: BreakpointKey): boolean => {
  return UseMediaQuery(breakpoints[breakpoint])
}

export const UseCurrentBreakpoint = (): BreakpointKey | null => {
  const isSm = UseMediaQuery(breakpoints.sm)
  const isMd = UseMediaQuery(breakpoints.md)
  const isLg = UseMediaQuery(breakpoints.lg)
  const isXl = UseMediaQuery(breakpoints.xl)
  const is2Xl = UseMediaQuery(breakpoints['2xl'])

  if (is2Xl) return '2xl'
  if (isXl) return 'xl'
  if (isMd) return 'md'
  if (isLg) return 'lg'
  if (isSm) return 'sm'

  return null
}
