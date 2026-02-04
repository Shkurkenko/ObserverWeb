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

export type SurfaceRoundedOptions = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type SurfacePaddingOptions = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type SurfaceBorderOptions = 'none' | 'default' | 'strong' | 'primary' | 'error' | 'outline'

export interface ISurfaceProps extends Omit<IBoxProps, 'as'> {
  variant?: SurfaceVariantOptions

  elevation?: SurfaceElevationOptions

  rounded?: SurfaceRoundedOptions

  border?: SurfaceBorderOptions

  padding?: SurfacePaddingOptions

  paddingX?: SurfacePaddingOptions

  paddingY?: SurfacePaddingOptions

  disabled?: boolean

  interactive?: boolean

  selected?: boolean
}

const variantClasses: Record<SurfaceVariantOptions, string> = {
  surface: 'bg-surface text-on-surface',

  'surface-container': 'bg-surface-container text-on-surface-container',

  'surface-container-lowest': 'bg-surface-container-low text-on-surface-container',

  'surface-container-high': 'bg-surface-container-high text-on-surface-container',

  'surface-container-highest': 'bg-surface-container-highest text-on-surface-container',

  'primary-container': 'bg-primary-container text-on-primary-container',

  'secondary-container': 'bg-secondary-container text-on-secondary-container',

  'tertiary-container': 'bg-tertiary-container text-on-tertiary-container',

  'error-container': 'bg-error-container text-on-error-container',
}

const elevationClasses: Record<SurfaceElevationOptions, string> = {
  '0': '',
  '1': 'shadow-sm',
  '2': 'shadow',
  '3': 'shadow-md',
  '4': 'shadow-lg',
  '5': 'shadow-xl',
}

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

const paddingClasses: Record<SurfacePaddingOptions, string> = {
  none: '',
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
  xl: 'p-8',
}

const paddingXClasses: Record<SurfacePaddingOptions, string> = {
  none: '',
  xs: 'py-2',
  sm: 'py-3',
  md: 'py-4',
  lg: 'py-5',
  xl: 'py-8',
}

const paddingYClasses: Record<SurfacePaddingOptions, string> = {
  none: '',
  xs: 'py-2',
  sm: 'py-3',
  md: 'py-4',
  lg: 'py-5',
  xl: 'py-8',
}

const borderClasses: Record<SurfaceBorderOptions, string> = {
  none: '',
  default: 'border border-outline/50',
  strong: 'border-2 border-outline',
  primary: 'border border-primary',
  error: 'border border-error',
  outline: 'border border-outline-variant',
}

export const Surface = ({
  children,
  variant = 'surface-container',
  elevation = '0',
  rounded = 'md',
  border = 'none',
  padding,
  paddingX,
  paddingY,
  interactive = false,
  disabled = false,
  selected = false,
  className,
  ...props
}: ISurfaceProps) => {
  const stateClasses = cn(
    interactive && [
      'transition-all duration-200',
      'cursor-pointer',
      'hover:shadow-md',
      'active: scale-[0.98] active:shadow-sm',
      !disabled && 'hover:bg-opacity-90',
    ],

    disabled && [
      'opacity-50',
      'cursor-not-allowed',
      interactive && 'hover:shadow-none hover:scale-100',
    ],

    selected && ['ring-2 ring-primary/30'],
    'border-primary/50',
  )

  const paddingClass = cn(
    padding && paddingClasses[padding],
    paddingX && paddingXClasses[paddingX],
    paddingY && paddingYClasses[paddingY],
  )

  return (
    <Box
      as='div'
      className={cn(
        'relative',

        variantClasses[variant],

        elevation !== '0' && elevationClasses[elevation],

        roundedClasses[rounded],

        border !== 'none' && borderClasses[border],

        paddingClass,

        stateClasses,

        className,
      )}
      aria-disabled={disabled}
      aria-selected={selected}
      {...props}
    >
      {children}
    </Box>
  )
}
