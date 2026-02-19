// Src/Components/DataDisplay/Badge.tsx
import { ComponentChildren, FunctionalComponent } from 'preact'
import { cn } from '../../Utils/Helpers'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline'
  | 'ghost'

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

export interface BadgeProps {
  children: ComponentChildren

  variant?: BadgeVariant

  size?: BadgeSize

  rounded?: 'full' | 'md' | 'sm'

  className?: string

  icon?: ComponentChildren

  iconPosition?: 'left' | 'right'

  dot?: boolean

  dotColor?: string

  max?: number

  value?: number

  dismissible?: boolean

  onDismiss?: () => void

  'aria-label'?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-container-high text-on-surface-variant',

  primary: 'bg-primary text-on-primary',

  secondary: 'bg-secondary text-on-secondary',

  tertiary: 'bg-tertiary text-on-tertiary',

  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',

  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',

  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',

  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',

  outline: 'border border-outline text-on-surface-variant bg-transparent',

  ghost: 'bg-surface-dim text-on-surface-variant',
}

const sizeClasses: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-sm',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

const roundedClasses = {
  full: 'rounded-full',
  md: 'rounded-md',
  sm: 'rounded-sm',
}

export const Badge: FunctionalComponent<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  className,
  icon,
  iconPosition = 'left',
  dot = false,
  dotColor,
  max,
  value,
  dismissible = false,
  onDismiss,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Если есть max и value, показываем счетчик
  const displayValue = max && value && value > max ? `${max}+` : value?.toString()

  const classes = cn(
    'inline-flex items-center font-medium transition-colors',
    variantClasses[variant],
    sizeClasses[size],
    roundedClasses[rounded],
    dismissible && 'pr-1',
    className,
  )

  return (
    <span className={classes} aria-label={ariaLabel} {...props}>
      {/* Dot indicator */}
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full mr-1.5', dotColor || 'currentColor')}
          style={dotColor ? undefined : undefined}
        />
      )}

      {/* Icon on left */}
      {icon && iconPosition === 'left' && <span className='mr-1.5'>{icon}</span>}

      {/* Display value or children */}
      {displayValue ? (
        <span className='font-semibold'>{displayValue}</span>
      ) : (
        <span>{children}</span>
      )}

      {/* Icon on right */}
      {icon && iconPosition === 'right' && <span className='ml-1.5'>{icon}</span>}

      {/* Dismiss button */}
      {dismissible && (
        <button
          type='button'
          onClick={onDismiss}
          className='ml-1.5 h-4 w-4 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors'
          aria-label='Удалить'
        >
          <svg className='w-2.5 h-2.5' fill='none' viewBox='0 0 14 14'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1l12 12M13 1L1 13'
            />
          </svg>
        </button>
      )}
    </span>
  )
}

// Пресеты для удобного использования
export const BadgePresets = {
  /** Бейдж с иконкой слева */
  WithIcon: ({ icon, children, ...props }: Omit<BadgeProps, 'iconPosition'>) => (
    <Badge icon={icon} iconPosition='left' {...props}>
      {children}
    </Badge>
  ),

  /** Бейдж с точкой (индикатор) */
  Dot: ({ children, ...props }: Omit<BadgeProps, 'dot'>) => (
    <Badge dot {...props}>
      {children}
    </Badge>
  ),

  /** Бейдж-счетчик */
  Counter: ({
    value,
    max = 99,
    ...props
  }: Omit<BadgeProps, 'children'> & { value: number; max?: number }) => (
    <Badge {...props} value={value} max={max}>
      {value > max ? `${max}+` : value}
    </Badge>
  ),

  /** Уведомление с возможностью закрытия */
  Notification: ({ children, onDismiss, ...props }: BadgeProps & { onDismiss: () => void }) => (
    <Badge dismissible onDismiss={onDismiss} {...props}>
      {children}
    </Badge>
  ),
}
