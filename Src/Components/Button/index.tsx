import { ComponentChildren } from 'preact'
import { cn } from '../../Utils/Helpers'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text' | 'danger'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface IButtonProps {
  children: ComponentChildren

  variant?: ButtonVariant

  size?: ButtonSize

  disabled?: boolean

  loading?: boolean

  fullWidth?: boolean

  leftIcon?: ComponentChildren

  rightIcon?: ComponentChildren

  type?: 'button' | 'submit' | 'reset'

  iconElement?: JSX.Element

  onClick?: (event: MouseEvent) => void

  onKeyDown?: (event: KeyboardEvent) => void

  className?: string

  'aria-label'?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-dark active:bg-primary-dark/90',

  secondary: 'bg-secondary text-on-secondary hover:bg-secondary-dark active:bg-secondary-dark/90',

  tertiary: 'bg-tertiary text-on-tertiary hover:bg-tertiary-dark active:bg-tertiary-dark/90',

  outline: 'border border-outline text-on-surface hover:bg-surface-container-high',

  text: 'text-primary hover:bg-primary/10',

  danger: 'bg-error text-on-error hover:bg-error-dark active:bg-error-dark/90',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  type = 'button',
  onClick,
  onKeyDown,
  className,
  'aria-label': ariaLabel,
  ...props
}: IButtonProps) => {
  const handleClick = (event: MouseEvent) => {
    if (!disabled && !loading && onClick) {
      onClick(event)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!disabled && !loading && onKeyDown) {
      onKeyDown(event)
    }
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'cursor-pointer',
        'inline-flex items-center justify-center',
        'font-medium rounded-lg',
        'transition-colors duration-150',
        'focus:outline-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        loading && 'cursor-wait',
        className,
      )}
      {...props}
    >
      {loading && (
        <svg className='animate-spin -ml-1 mr-2 h-4 w-4' fill='none' viewBox='0 0 24 24'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
      )}

      {!loading && leftIcon && <span className='mr-2'>{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className='ml-2'>{rightIcon}</span>}
    </button>
  )
}
