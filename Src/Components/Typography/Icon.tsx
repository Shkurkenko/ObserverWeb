import { isValidElement, cloneElement } from 'preact'
import { FunctionalComponent } from 'preact'
import { IconSize } from '../../Shared/Interfaces/Typography.interface'
import { cn } from '../../Utils/Helpers'

export interface IIconProps {
  className?: string
  size?: IconSize
  color?: string
  strokeWidth?: number
  children?: preact.ComponentChildren
  onClick?: (event: MouseEvent) => void
  ariaLabel?: string
}

const sizeClasses: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
}

export const Icon: FunctionalComponent<IIconProps> = ({
  className,
  size = 'md',
  color = 'currentColor',
  strokeWidth = 2,
  children,
  onClick,
  ariaLabel,
  ...props
}) => {
  const classes = cn(
    'inline-flex items-center justify-center',
    'fill-curent',
    sizeClasses[size],
    onClick && 'cursor-pointer',
    className,
  )

  const iconContent = isValidElement(children)
    ? cloneElement(children, {
        width: '100%',
        height: '100%',
        stroke: color,
        'stroke-width': strokeWidth,
        fill: color === 'currentColor' ? 'none' : color,
      })
    : children

  return (
    <span
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel}
      {...props}
    >
      {iconContent}
    </span>
  )
}
