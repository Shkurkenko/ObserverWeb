import { ComponentChildren, FunctionalComponent } from 'preact'
import { Box, IBoxProps } from '../Box'
import { cn } from '../../../Utils/Helpers'

export type SurfaceVariantOptions =
  | 'surface'
  | 'surface-container'
  | 'surface-container-lowest'
  | 'surface-container-high'
  | 'surface-container-highest'
  | 'primary-container'
  | 'secondary-container'
  | 'tertiary-container'
  | 'error-container'

export type SurfaceElevationOptions = '0' | '1' | '2' | '3' | '4' | '5'

export interface ISurfaceProps extends Omit<IBoxProps, 'as'> {
  variant?: SurfaceVariantOptions
  elevation?: SurfaceElevationOptions
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  outlined?: boolean
  interactive?: boolean
}

const variantClasses: Record<SurfaceVariantOptions, string> = {
  surface: 'bg-surface',
  'surface-container': 'bg-surface-container',
  'surface-container-lowest': 'bg-surface-container-low',
  'surface-container-high': 'bg-surface-container-high',
  'surface-container-highest': 'bg-surface-container-highest',
  'primary-container': 'bg-primary-container',
  'secondary-container': 'bg-secondary-container',
  'tertiary-container': 'bg-tertiary-container',
  'error-container': 'bg-error-container',
}

const elevationClasses: Record<SurfaceElevationOptions, string> = {
  '0': '',
  '1': 'shadow-sm dark:shadow-sm-dark',
  '2': 'shadow-md dark:shadow-md-dark',
  '3': 'shadow-lg dark:shadow-lg-dark',
  '4': 'shadow-xl dark:shadow-xl-dark',
  '5': 'shadow-2xl dark:shadow-2xl-dark',
}

const roundedClasses = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

export const Surface: FunctionalComponent<ISurfaceProps> = ({
  children,
  variant = 'surface-container',
  elevation = '0',
  rounded = 'md',
  outlined = false,
  interactive = false,
  className,
  ...props
}) => {
  return (
    <Box
      as='div'
      className={cn(
        variantClasses[variant],
        elevation !== '0' && elevationClasses[elevation],
        roundedClasses[rounded],
        outlined && 'border border-outline dark:border-outline-variant',
        interactive && [
          'transition-all duration-150',
          'hover:shadow-lg dark:hover:shadow-lg-dark',
          'active:scale-[0.98]',
          'cursor-pointer',
        ],
        className,
      )}
      {...props}
    >
      {children}
    </Box>
  )
}
