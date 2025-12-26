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

  loading?: boolean

  error?: boolean

  hasNewData?: boolean

  active?: boolean
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
  loading = false,
  error = false,
  hasNewData = false,
  active = false,
  ...props
}) => {
  const classes = cn(
    'inline-flex items-center justify-center',
    'fill-current',
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
      {loading ? (
        <span
          className='w-full h-full border-2 border-gray-300 border-t-current rounded-full animate-spin'
          aria-hidden='true'
        />
      ) : (
        iconContent
      )}

      {/* Error Indicator */}
      {error && (
        <span
          className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white'
          aria-label='Ошибка'
        />
      )}

      {/* New data indicator */}
      {hasNewData && (
        <span
          className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse'
          aria-label='Новые данные'
        />
      )}
    </span>
  )
}
