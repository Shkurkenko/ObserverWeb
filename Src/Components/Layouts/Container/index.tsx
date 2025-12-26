import { ComponentChildren, FunctionalComponent } from 'preact'
import { cn } from '../../../Utils/Helpers'

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid'
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type ContainerMargin = 'none' | 'auto' | 'sm' | 'md' | 'lg'
export type ContainerAlign = 'left' | 'center' | 'right' | 'stretch'

export interface IContainerProps {
  children?: ComponentChildren
  size?: ContainerSize
  align?: ContainerAlign
  paddingY?: ContainerPadding
  paddingX?: ContainerPadding
  marginTop?: ContainerMargin
  marginBottom?: ContainerMargin
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer' | 'nav'
  background?: 'transparent' | 'white' | 'gray' | 'primary' | 'secondary'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  border?: 'none' | 'thin' | 'medium' | 'thick'
  borderColor?: 'gray' | 'primary' | 'secondary' | 'transparent'
  hidden?: {
    sm?: boolean
    md?: boolean
    lg?: boolean
    xl?: boolean
    '2xl'?: boolean
  }
  className?: string
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string

  onClick?: (event: MouseEvent) => void
}

const sizeClasses: Record<ContainerSize, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
  fluid: 'max-w-screen-2xl',
}

const paddingClasses: Record<ContainerPadding, string> = {
  none: '',
  sm: 'py-2',
  md: 'py-4',
  lg: 'py-6',
  xl: 'py-8',
}

const paddingXClasses: Record<ContainerPadding, string> = {
  none: '',
  sm: 'px-3 sm:px-4',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-10',
  xl: 'px-8 sm:px-10 lg:px-12',
}

const alignClasses: Record<ContainerAlign, string> = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
  stretch: 'w-full',
}

const backgroundClasses = {
  transparent: 'bg-transparent',
  white: 'bg-white dark:bg-gray-900',
  gray: 'bg-gray-50 dark:bg-gray-800',
  primary: 'bg-blue-50 dark:bg-blue-900/20',
  secondary: 'bg-gray-100 dark:bg-gray-800',
}

const roundedClasses = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
}

const borderClasses = {
  none: '',
  thin: 'border',
  medium: 'border-2',
  thick: 'border-4',
}

const borderColorClasses = {
  gray: 'border-gray-200 dark:border-gray-700',
  primary: 'border-blue-200 dark:border-blue-700',
  secondary: 'border-gray-300 dark:border-gray-600',
  transparent: 'border-transparent',
}

export const Container: FunctionalComponent<IContainerProps> = ({
  children,
  size = 'fluid',
  align = size === 'fluid' ? 'stretch' : 'center',
  paddingY = 'md',
  paddingX = 'md',
  marginTop = 'none',
  marginBottom = 'none',
  as: Component = 'div',
  background = 'transparent',
  rounded = 'none',
  border = 'none',
  shadow = 'none',
  borderColor = 'gray',
  hidden,
  className,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  onClick,
  ...props
}) => {
  const hiddenClasses = hidden
    ? Object.entries(hidden)
        .filter(([_, value]) => value)
        .map(([breakpoint]) => `${breakpoint}:hidden`)
        .join(' ')
    : ''

  const classes = cn(
    'w-full',
    size !== 'fluid' && sizeClasses[size],
    alignClasses[align],

    paddingClasses[paddingY],
    paddingXClasses[paddingX],

    marginTop === 'auto' && 'mt-auto',
    marginTop == 'sm' && 'mt-4',
    marginTop === 'md' && 'mt-8',
    marginTop === 'lg' && 'mt-12',

    marginBottom === 'auto' && 'mb-auto',
    marginBottom === 'sm' && 'mb-4',
    marginBottom === 'md' && 'mb-8',
    marginBottom === 'lg' && 'mb-12',

    backgroundClasses[background],
    roundedClasses[rounded],
    shadowClasses[shadow],
    border !== 'none' && borderClasses[border],
    border !== 'none' && borderColorClasses[borderColor],

    hiddenClasses,

    onClick && 'transition-transform hover:scale-[1.005] active:scale-[0.995]',

    className,
  )

  return (
    <Component
      id={id}
      className={classes}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabindex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </Component>
  )
}

export const ContainerLayouts = {
  /** Standard container for content */
  Content: (props: Omit<IContainerProps, 'size' | 'align' | 'paddingX'>) => (
    <Container size='fluid' align='center' paddingX='md' {...props} />
  ),

  /** Container for wide elements */
  Wide: (props: Omit<IContainerProps, 'size' | 'align'>) => (
    <Container size='xl' align='center' paddingX='lg' {...props} />
  ),

  /** Thin container for forms and modals */
  Narrow: (props: Omit<IContainerProps, 'size' | 'align'>) => (
    <Container size='md' align='center' paddingX='sm' {...props} />
  ),

  /** Container without width limits */
  FullWidth: (props: Omit<IContainerProps, 'size' | 'align'>) => (
    <Container size='full' align='stretch' paddingX='none' {...props} />
  ),

  /** Container for cards in grid */
  Card: (props: Omit<IContainerProps, 'backgound' | 'rounded' | 'shadow'>) => (
    <Container background='white' rounded='lg' shadow='md' {...props} />
  ),
}
