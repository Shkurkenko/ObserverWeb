import { ComponentChildren, FunctionalComponent } from 'preact'
import { cn } from '../../../Utils/Helpers'

export interface IBoxProps {
  children?: ComponentChildren
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer' | 'nav' | 'span' | 'button'
  className?: string
  id?: string
  hidden?: boolean
  dataTestId?: string
}

export const Box: FunctionalComponent<IBoxProps> = ({
  children,
  as: Component = 'div',
  className,
  id,
  hidden,
  dataTestId,
  ...props
}) => {
  return (
    <Component
      id={id}
      className={cn(className, hidden && 'hidden')}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </Component>
  )
}
