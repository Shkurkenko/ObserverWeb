import { ComponentChildren, FunctionalComponent } from 'preact'
import { cn } from '../../../Utils/Helpers'

export interface IGridContainerProps {
  children?: ComponentChildren
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
  className?: string
}

export const GridContainer: FunctionalComponent<IGridContainerProps> = ({
  children,
  columns = 1,
  gap = 'md',
  responsive = true,
  className,
  ...props
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: responsive ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2',
    3: responsive ? 'grid-cols-1 sm:gird-cols-2 lg:grid-cols-3' : 'grid-cols-3',
    4: responsive ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4',
    5: responsive ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'grid-cols-5',
    6: responsive ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6' : 'grid-cols-6',
    12: responsive
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12'
      : 'grid-cols-12',
  }

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  }

  const classes = cn('grid', columnClasses[columns], gapClasses, className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
