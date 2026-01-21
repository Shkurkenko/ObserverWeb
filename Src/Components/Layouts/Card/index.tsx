import { ComponentChildren, FunctionalComponent } from 'preact'
import { Surface, ISurfaceProps } from '../Surface'
import { cn } from '../../../Utils/Helpers'

export interface ICardProps extends Omit<ISurfaceProps, 'variant' | 'elevation' | 'rounded'> {
  title?: string

  subtitle?: string

  actions?: ComponentChildren

  header?: ComponentChildren

  footer?: ComponentChildren

  variant?: 'default' | 'elevated' | 'filled' | 'outlined'

  accent?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'none'

  compact?: boolean
}

export const Card: FunctionalComponent<ICardProps> = ({
  children,
  title,
  subtitle,
  actions,
  header,
  footer,
  variant = 'default',
  accent = 'none',
  compact = false,
  className,
  outlined,
  ...props
}) => {
  // Стили в зависимости от варианта
  const variantConfig = {
    default: {
      variant: 'surface-container' as const,
      elevation: '1' as const,
      rounded: 'lg' as const,
      outlined: false,
    },
    elevated: {
      variant: 'surface-container-highest' as const,
      elevation: '2' as const,
      rounded: 'lg' as const,
      outlined: false,
    },
    filled: {
      variant: 'surface-container' as const,
      elevation: '0' as const,
      rounded: 'lg' as const,
      outlined: false,
    },
    outlined: {
      variant: 'surface' as const,
      elevation: '0' as const,
      rounded: 'lg' as const,
      outlined: true,
    },
  }

  // Акцентные стили
  const accentStyles = {
    none: '',
    primary: 'border-t-4 border-primary',
    secondary: 'border-t-4 border-secondary',
    tertiary: 'border-t-4 border-tertiary',
    error: 'border-t-4 border-error',
  }

  const spacing = compact ? 'px-4 pt-4' : 'px-6 pt-6'
  const contentSpacing = compact ? 'p-4' : 'p-6'
  const footerSpacing = compact ? 'px-4 py-3' : 'px-6 py-4'

  const config = variantConfig[variant]

  return (
    <Surface
      variant={config.variant}
      elevation={config.elevation}
      rounded={config.rounded}
      outlined={outlined !== undefined ? outlined : config.outlined}
      className={cn(
        'overflow-hidden transition-all duration-200',
        'hover:shadow-md dark:hover:shadow-md-dark hover:-translate-y-0.5',
        accentStyles[accent],
        className,
      )}
      {...props}
    >
      {/* Header */}
      {(header || title) && (
        <div
          className={cn(
            'border-b border-outline-variant/50',
            spacing,
            !footer && 'pb-4',
            footer && compact ? 'pb-3' : 'pb-4',
          )}
        >
          {header || (
            <div className='flex justify-between items-start gap-4'>
              <div className='flex-1 min-w-0'>
                {title && (
                  <h3
                    className={cn(
                      'font-bold tracking-tight truncate',
                      compact ? 'text-base' : 'text-xl',
                      'text-on-surface',
                    )}
                  >
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p
                    className={cn(
                      'mt-1 opacity-80 truncate',
                      compact ? 'text-xs' : 'text-sm',
                      'text-on-surface-variant',
                    )}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && (
                <div className={cn('shrink-0 flex items-center gap-2', compact ? 'ml-2' : 'ml-4')}>
                  {actions}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={contentSpacing}>{children}</div>

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            footerSpacing,
            'border-t border-outline-variant/50',
            'bg-surface-dim/30 dark:bg-surface-dim/50 backdrop-blur-sm',
            'transition-colors duration-200 hover:bg-surface-dim/50 dark:hover:bg-surface-dim/70',
          )}
        >
          {footer}
        </div>
      )}

      {/* Акцентный угол (только для акцентных карточек) */}
      {accent !== 'none' && (
        <div className={cn('absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none')}>
          <div
            className={cn(
              'absolute transform rotate-45 -translate-y-1/2 translate-x-1/2',
              'w-8 h-8 opacity-10',
              accent === 'primary' && 'bg-primary',
              accent === 'secondary' && 'bg-secondary',
              accent === 'tertiary' && 'bg-tertiary',
              accent === 'error' && 'bg-error',
            )}
          />
        </div>
      )}
    </Surface>
  )
}
