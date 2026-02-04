import { ComponentChildren } from 'preact'
import { cn } from '../../../Utils/Helpers'

interface SectionProps {
  title?: string
  description?: string
  actions?: ComponentChildren
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4'
  divider?: boolean
  density?: 'compact' | 'comfortable' | 'spacious'
  className?: string
  children?: ComponentChildren
}

export const Section = ({
  title,
  description,
  actions,
  titleVariant = 'h2',
  divider = false,
  density = 'comfortable',
  className,
  children,
}: SectionProps) => {
  const TitleTag = titleVariant

  return (
    <section
      className={cn(
        'w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10',
        className,
      )}
    >
      {(title || description || actions) && (
        <div className='mb-8'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              {title && (
                <TitleTag
                  className={cn(
                    'font-bold tracking-tight',
                    titleVariant === 'h1' && 'text-4xl',
                    titleVariant === 'h2' && 'text-3xl',
                    titleVariant === 'h3' && 'text-2xl',
                    titleVariant === 'h4' && 'text-xl',
                  )}
                >
                  {title}
                </TitleTag>
              )}
              {description && (
                <p className='mt-2 text-gray-600 dark:text-gray-400'>{description}</p>
              )}
            </div>
            {actions && <div className='flex items-center gap-2'>{actions}</div>}
          </div>
          {divider && <hr className='mt-6 border-gray-200 dark:border-gray-700' />}
        </div>
      )}

      <div
        className={cn(
          density === 'compact' && 'space-y-4',
          density === 'comfortable' && 'space-y-6',
          density === 'spacious' && 'space-y-8',
        )}
      >
        {children}
      </div>
    </section>
  )
}
