import { CaptionVariant, IBaseTypographyProps } from '../../Shared/Interfaces/Typography.interface'
import { cn } from '../../Utils/Helpers'

export interface ICaptionProps extends IBaseTypographyProps {
  variant?: CaptionVariant
  as?: 'span' | 'div' | 'p'
}

export const Caption = ({
  variant = 'medium',
  as: Component = 'span',
  className,
  children,
  color = 'secondary',
  ...props
}: ICaptionProps) => {
  const variantClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }

  const colorClasses = {
    primary: 'text-gray-600 dark:text-gray-400',
    secondary: 'text-gray-500 dark:text-gray-500',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    disabled: 'text-gray-400 dark:text-gray-500',
  }

  const classes = cn(variantClasses[variant], colorClasses[color], 'leading-tight', className)

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
