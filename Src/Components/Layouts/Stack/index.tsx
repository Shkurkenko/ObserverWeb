import { Box, IBoxProps } from '../Box'
import { cn } from '../../../Utils/Helpers'

export interface IStackProps extends Omit<IBoxProps, 'as'> {
  direction?: 'vertical' | 'horizontal'
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

const spacingClasses = {
  none: 'space-y-0',
  xs: 'space-y-1',
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8',
}

const horizontalSpacingClasses = {
  none: 'space-x-0',
  xs: 'space-x-1',
  sm: 'space-x-2',
  md: 'space-x-4',
  lg: 'space-x-6',
  xl: 'space-x-8',
}

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

export const Stack = ({
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  className,
  ...props
}: IStackProps) => {
  const isHorizontal = direction === 'horizontal'

  return (
    <Box
      as='div'
      className={cn(
        'flex',
        isHorizontal ? 'flex-row' : 'flex-col',
        isHorizontal ? horizontalSpacingClasses[spacing] : spacingClasses[spacing],
        alignClasses[align],
        className,
      )}
      {...props}
    >
      {children}
    </Box>
  )
}
