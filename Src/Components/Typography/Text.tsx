import { FunctionComponent } from 'preact'
import { cn } from '../../Utils/Helpers'
import { TextVariant, IBaseTypographyProps } from '../../Shared/Interfaces/Typography.interface'

export interface ITextProps extends IBaseTypographyProps {
  variant?: TextVariant
  as?: 'p' | 'span' | 'div'
  bold?: boolean
  italic?: boolean
  underline?: boolean
  truncate?: boolean
  align?: 'left' | 'center' | 'right' | 'justify'
}

const variantClasses: Record<TextVariant, string> = {
  body1: 'text-base leading-normal',
  body2: 'text-sm leading-normal',
  body3: 'text-xs leading-normal',
  overline: 'text-xs uppercase tracking-wider',
  button: 'text-sm font-medium uppercase tracking-wide',
}

const colorClasses: Record<NonNullable<IBaseTypographyProps['color']>, string> = {
  primary: 'text-gray-900 dark:text-white',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
  disabled: 'text-gray-400 dark:text-gray-500 cursor-not-allowed',
}

export const Text: FunctionComponent<ITextProps> = ({
  variant = 'body1',
  as: Component = 'p',
  className,
  children,
  color = 'primary',
  bold = false,
  italic = false,
  underline = false,
  truncate = false,
  align = 'left',
  ...props
}) => {
  const classes = cn(
    variantClasses[variant],
    colorClasses[color],
    bold && 'font-semibold',
    italic && 'italic',
    underline && 'underline',
    `text-${align}`,
    className,
  )

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
