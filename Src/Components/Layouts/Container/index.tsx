import { FunctionalComponent } from 'preact'
import { cn } from '../../../Utils/Helpers'
import { Box, IBoxProps } from '../Box'

export type ContainerPadding = boolean | 'sm' | 'md' | 'lg'

export interface IContainerProps extends IBoxProps {
  size?: ContainerSizeOptions
  padding?: ContainerPadding
  centered?: boolean
}

export type ContainerSizeOptions = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid'

const sizeClasses: Record<ContainerSizeOptions, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-full',
  fluid: 'max-w-screen-2xl',
}

const paddingClasses = {
  true: 'px-4 sm:px-6 lg:px-8',
  sm: 'px-2 sm:px-4',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-10 xl:px-12',
}

export const Container: FunctionalComponent<IContainerProps> = ({
  children,
  size = 'fluid',
  padding = 'md',
  centered = true,
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
        padding && paddingClasses[padding === true ? 'md' : padding],
        className,
      )}
      {...props}
    >
      {children}
    </Box>
  )
}
