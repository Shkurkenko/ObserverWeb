import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { TabButton } from '../TabButton'
import { Container } from '../../Layouts/Container'
import { cn } from '../../../Utils/Helpers'

import './style.sass'

export interface ITabButtonGroupProps<T> {
  currentIndex: number
  model: ITab<T>[]
  handleClick?: (e: MouseEvent, tab: ITab<T>) => void
  direction?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  variant?: 'default' | 'pills' | 'underline' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showCounts?: boolean
  fullWidthTabs?: boolean
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  className?: string
  /** Иконки для всех табов (опционально, переопределяет tabData.icon) */
  icons?: Record<string, preact.ComponentChildren>
  /** Размер иконок */
  iconSize?: 'xs' | 'sm' | 'md' | 'lg'
  /** Отступы контейнера */
  paddingX?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Фон контейнера */
  background?: 'transparent' | 'white' | 'gray' | 'primary' | 'secondary'
  /** Скругление контейнера */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function TabButtonGroup<T>({
  currentIndex,
  model,
  handleClick,
  direction = 'horizontal',
  spacing = 'md',
  align = 'start',
  variant = 'underline',
  size,
  showCounts = false,
  fullWidthTabs = false,
  justify = 'start',
  className,
  icons,
  iconSize = 'md',
  paddingX = 'none',
  paddingY = 'md',
  background = 'transparent',
  rounded = 'none',
}: ITabButtonGroupProps<T>) {
  // Классы для выравнивания в зависимости от направления
  const getAlignClasses = () => {
    if (direction === 'horizontal') {
      return {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        stretch: 'justify-stretch',
      }[align]
    } else {
      return {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      }[align]
    }
  }

  // Классы для распределения в зависимости от направления
  const getJustifyClasses = () => {
    if (direction === 'horizontal') {
      return {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        between: 'items-between',
        around: 'items-around',
      }[justify]
    } else {
      return {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
      }[justify]
    }
  }

  // Отступы между табами
  const getSpacingClasses = () => {
    if (direction === 'horizontal') {
      return {
        none: 'gap-x-0',
        sm: 'gap-x-2',
        md: 'gap-x-4',
        lg: 'gap-x-6',
        xl: 'gap-x-8',
      }[spacing]
    } else {
      return {
        none: 'gap-y-0',
        sm: 'gap-y-2',
        md: 'gap-y-4',
        lg: 'gap-y-6',
        xl: 'gap-y-8',
      }[spacing]
    }
  }

  return (
    <Container
      as='nav'
      // size='full'
      // align='stretch'
      paddingX={paddingX}
      paddingY={paddingY}
      marginTop='none'
      marginBottom='none'
      background={background}
      rounded={rounded}
      className={cn(className)}
      aria-label='Tabs'
      role='tablist'
      aria-orientation={direction}
    >
      <div
        className={cn(
          'flex',
          direction === 'horizontal' ? 'flex-row' : 'flex-col',
          getSpacingClasses(),
          getAlignClasses(),
          getJustifyClasses(),
          direction === 'vertical' && fullWidthTabs && 'w-full',
        )}
      >
        {model.map((tab: ITab<T>) => (
          <TabButton
            key={tab.id}
            tabData={tab}
            isActive={currentIndex === tab.tabIndex}
            handleClick={handleClick}
            variant={variant || tab.variant}
            size={size || tab.size}
            fullWidth={fullWidthTabs || direction === 'vertical'}
            showCount={showCounts}
            icon={icons?.[tab.id] || tab.icon}
            iconSize={iconSize}
            badge={tab.badge}
            className={cn(direction === 'vertical' && fullWidthTabs && 'w-full', align === 'start')}
          />
        ))}
      </div>
    </Container>
  )
}
