import { ComponentChildren, FunctionalComponent } from 'preact'
import { cn } from '../../../Utils/Helpers'

export interface IContainerGroupProps {
  children?: ComponentChildren
  direction?: 'vertical' | 'horizontal'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
  className?: string
}

export const ContainerGroup: FunctionalComponent<IContainerGroupProps> = ({
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  ...props
}) => {
  const spacingClasses = {
    none: '',
    sm: direction === 'vertical' ? 'space-y-2' : 'space-x-2',
    md: direction === 'vertical' ? 'space-y-4' : 'space-x-4',
    lg: direction === 'vertical' ? 'space-y-6' : 'space-x-6',
    xl: direction === 'vertical' ? 'space-y-8' : 'space-x-8',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'jusitfy-around',
  }

  const classes = cn(
    direction === 'vertical' ? 'flex flex-col' : 'flex flex-row',
    spacingClasses[spacing],
    alignClasses[align],
    justifyClasses[justify],
    wrap && 'flex-wrap',
    className,
  )

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
