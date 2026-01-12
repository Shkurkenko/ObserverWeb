import { ComponentChildren, FunctionalComponent } from 'preact'
import { Box, IBoxProps } from '../Box'
import { cn } from '../../../Utils/Helpers'

export interface IGridProps extends Omit<IBoxProps, 'as'> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none'
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cold-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
  none: '',
}

const gapClasses = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

export const Gird: FunctionalComponent<IGridProps> = ({
  children,
  columns = 1,
  gap = 'md',
  className,
  ...props
}) => {
  return (
    <Box
      as='div'
      className={cn('grid', columnClasses[columns], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </Box>
  )
}
