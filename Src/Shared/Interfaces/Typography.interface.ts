export type TextVariant = 'body1' | 'body2' | 'body3' | 'overline' | 'button'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export type CaptionVariant = 'small' | 'medium' | 'large'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'disabled'

export interface IBaseTypographyProps {
  className?: string
  children?: preact.ComponentChildren
  color?: ColorVariant
}
