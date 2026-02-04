import { HeadingLevel, IBaseTypographyProps } from '../../Shared/Interfaces/Typography.interface'
import { cn } from '../../Utils/Helpers'

export interface IHeadingProps extends IBaseTypographyProps {
  level?: HeadingLevel
  as?: `h${HeadingLevel}` | 'div'
}

const headingClasses: Record<HeadingLevel, string> = {
  1: `text-4xl md:text-5xl font-bold tracking-tight`,
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-2xl md:text-3xl font-semibold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg md:text-xl font-medium',
  6: 'text-base md:text-lg font-medium',
}

const colorClasses = {
  primary: 'text-gray-900 dark:text-white',
  secondary: 'text-gray-700 dark:text-gray-300',
  success: 'text-green-700 dark:text-green-300',
  warning: 'text-yellow-700 dark:text-yellow-300',
  error: 'text-red-700 dark:text-red-300',
  disabled: 'text-gray-400 dark:text-gray-500',
}

export const Heading = ({
  level = 1,
  as: Component = `h${level}` as `h${HeadingLevel}`,
  className,
  children,
  color = 'primary',
  ...props
}: IHeadingProps) => {
  const classes = cn(headingClasses[level], colorClasses[color], 'font-heading', className)
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
