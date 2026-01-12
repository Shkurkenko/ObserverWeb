// TabGroup.tsx
import { FunctionalComponent } from 'preact'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { TabButton } from '../TabButton'
import { Flex, FlexProps } from '../../Layouts/Flex'
import { cn } from '../../../Utils/Helpers'

export interface TabGroupProps<T = any> extends Omit<FlexProps, 'children' | 'as' | 'role'> {
  tabs: ITab<T>[]
  activeTabId?: string | number
  onTabClick?: (tab: ITab<T>) => void
  variant?: 'default' | 'underline' | 'pills' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showCounts?: boolean
  fullWidth?: boolean
  orientation?: 'horizontal' | 'vertical'
}

// Определяем компонент как функцию с generic
export function TabGroup<T = any>({
  tabs,
  activeTabId,
  onTabClick,
  variant,
  size,
  showCounts = false,
  fullWidth = false,
  orientation = 'horizontal',
  direction,
  justify,
  align,
  gap,
  wrap,
  inline,
  className,
  ...flexProps
}: TabGroupProps<T>) {
  const flexDirection = orientation === 'vertical' ? 'col' : 'row'
  const shouldStretch = fullWidth || orientation === 'vertical'

  const autoJustify = justify || (orientation === 'horizontal' ? 'start' : 'stretch')
  const autoAlign = align || (orientation === 'vertical' ? 'stretch' : 'center')
  const autoGap = gap || (variant === 'pills' ? 'sm' : 'md')
  const autoWrap = wrap || (orientation === 'horizontal' ? false : 'nowrap')

  return (
    <Flex
      as='nav'
      role='tablist'
      aria-orientation={orientation}
      direction={direction || flexDirection}
      justify={autoJustify}
      align={autoAlign}
      gap={autoGap}
      wrap={autoWrap}
      className={cn(
        orientation === 'horizontal' && variant === 'underline' && 'border-b border-outline',
        variant === 'pills' && 'rounded-lg p-1 bg-surface-container',
        className,
      )}
      {...flexProps}
    >
      {tabs.map((tab) => {
        const isActive =
          activeTabId !== undefined ? tab.id === activeTabId || tab.tabIndex === activeTabId : false

        return (
          <TabButton<T>
            key={tab.id}
            tabData={tab}
            isActive={isActive}
            onClick={(e, clickedTab) => onTabClick?.(clickedTab)}
            variant={variant || tab.variant}
            size={size || tab.size}
            fullWidth={shouldStretch}
            showCount={showCounts}
          />
        )
      })}
    </Flex>
  )
}

// Создаем HOC для пресетов
const createTabGroupPreset = <T = any,>(presetProps: Partial<TabGroupProps<T>>) => {
  return function TabGroupPresetComponent(props: Omit<TabGroupProps<T>, keyof typeof presetProps>) {
    return <TabGroup<T> {...presetProps} {...props} />
  }
}

// Пресеты
export const TabGroupPresets = {
  /** Горизонтальные табы с подчеркиванием (по умолчанию) */
  Underline: createTabGroupPreset({ variant: 'underline', orientation: 'horizontal' }),

  /** Табы в виде пилюль */
  Pills: createTabGroupPreset({ variant: 'pills' }),

  /** Контурные табы */
  Outline: createTabGroupPreset({ variant: 'outline' }),

  /** Вертикальные табы */
  Vertical: createTabGroupPreset({ orientation: 'vertical' }),

  /** Полноширинные табы */
  FullWidth: createTabGroupPreset({ fullWidth: true }),

  /** Маленькие табы */
  Small: createTabGroupPreset({ size: 'sm' }),

  /** Большие табы */
  Large: createTabGroupPreset({ size: 'lg' }),

  /** Центрированные табы */
  Centered: createTabGroupPreset({ justify: 'center' }),

  /** Табы растянутые по ширине */
  Justified: createTabGroupPreset({ justify: 'between', fullWidth: true }),
}
