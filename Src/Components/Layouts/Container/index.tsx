import { FunctionalComponent } from 'preact'
import { cn } from '../../../Utils/Helpers'
import { Box, IBoxProps } from '../Box'

export type ContainerPadding =
  | boolean
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | { x?: string; y?: string } // Кастомные отступы

export interface IContainerProps extends IBoxProps {
  size?: ContainerSizeOptions
  padding?: ContainerPadding
  centered?: boolean
  fullHeight?: boolean
}

export type ContainerSizeOptions = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid'

const sizeClasses: Record<ContainerSizeOptions, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'w-full',
  fluid: 'max-w-screen-2xl',
}

// Более гибкая система отступов
const getPaddingClasses = (padding: ContainerPadding): string => {
  if (padding === false || padding === 'none') return ''

  if (typeof padding === 'object') {
    // Кастомные отступы { x: 'px-4', y: 'py-6' }
    return cn(padding.x, padding.y)
  }

  const paddingMap = {
    true: 'px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10',
    xs: 'px-2 py-2',
    sm: 'px-3 sm:px-4 py-4 sm:py-5',
    md: 'px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10',
    lg: 'px-6 sm:px-8 lg:px-10 xl:px-12 py-8 sm:py-10 lg:py-12',
    xl: 'px-8 sm:px-10 lg:px-12 xl:px-16 py-10 sm:py-12 lg:py-16',
  }

  return paddingMap[padding === true ? 'md' : padding]
}

export const Container: FunctionalComponent<IContainerProps> = ({
  children,
  size = 'fluid',
  padding = 'md',
  centered = true,
  fullHeight = false,
  className,
  ...props
}) => {
  return (
    <Box
      as='div'
      className={cn(
        'w-full',
        sizeClasses[size],
        centered && 'mx-auto',
        getPaddingClasses(padding),
        fullHeight && 'min-h-screen',
        className,
      )}
      {...props}
    >
      {children}
    </Box>
  )
}
