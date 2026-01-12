import { ComponentChildren, FunctionalComponent } from 'preact'
import { Surface, ISurfaceProps } from '../Surface'
import { cn } from '../../../Utils/Helpers'

export interface ICardProps extends Omit<ISurfaceProps, 'variant' | 'elevation' | 'rounded'> {
  title?: string
  subtitle?: string
  actions?: ComponentChildren
  header?: ComponentChildren
  footer?: ComponentChildren
}

export const Card: FunctionalComponent<ICardProps> = ({
  children,
  title,
  subtitle,
  actions,
  header,
  footer,
  className,
  ...props
}) => {
  return (
    <Surface
      variant='surface-container'
      elevation='1'
      rounded='lg'
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {/* Header */}
      {(header || title) && (
        <div className='px-6 pt-6 pb-4 border-b border-outline-variant dark:border-outline'>
          {header || (
            <div className='flex justify-between items-start'>
              <div>
                {title && (
                  <h3 className='text-lg font-semibold text-on-surface dark:text-on-surface-variant'>
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className='text-sm text-on-surface-variant dark:text-on-surface-variant/70 mt-1'>
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && <div className='ml-4'>{actions}</div>}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className='p-6'>{children}</div>

      {/* Footer */}
      {footer && (
        <div className='px-6 py-4 border-t border-outline-variant dark:border-outline bg-surface-dim/50 dark:bg-surface-dim/30'>
          {footer}
        </div>
      )}
    </Surface>
  )
}
