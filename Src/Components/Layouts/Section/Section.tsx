import { FunctionalComponent } from 'preact'
import { Container, ContainerPadding, IContainerProps } from '../Container'
import { cn } from '../../../Utils/Helpers'

export interface ISectionProps extends IContainerProps {
  /** Sectioin title */
  title?: string

  /** Section description */
  description?: string

  /** Action in heading (button etc...) */
  actions?: preact.ComponentChildren

  /** Heading variant visual */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4'

  /** Show divider after heading */
  divider?: boolean

  /** Плотность контента */
  density?: 'compact' | 'comfortable' | 'spacious'
}
const densityToPadding: Record<'compact' | 'comfortable' | 'spacious', ContainerPadding> = {
  compact: 'sm',
  comfortable: 'md',
  spacious: 'lg',
}

export const Section: FunctionalComponent<ISectionProps> = ({
  title,
  description,
  actions,
  titleVariant = 'h2',
  divider = false,
  density = 'comfortable',
  children,
  paddingY,
  ...containerProps
}) => {
  const currentPaddingY = paddingY || densityToPadding[density]

  const TitleTag = titleVariant

  return (
    <Container as='section' paddingY={currentPaddingY} {...containerProps}>
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
    </Container>
  )
}
