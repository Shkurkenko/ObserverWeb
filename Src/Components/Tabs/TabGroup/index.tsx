import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { TabButton } from '../TabButton'
import { Flex, IFlexProps } from '../../Layouts/Flex'
import { cn } from '../../../Utils/Helpers'
import { createPreset } from '../../../../Utils/CreatePreset'
import { useEffect } from 'preact/hooks'

export interface ITabGroupProps extends Omit<IFlexProps, 'children' | 'as' | 'role'> {
  tabs: ITab[]

  activeTabId?: string | number

  onTabClick?: (tab: ITab) => void

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
}: ITabGroupProps) {
  const flexDirection = orientation === 'vertical' ? 'col' : 'row'
  const shouldStretch = fullWidth || orientation === 'vertical'

  const autoJustify = justify || (orientation === 'horizontal' ? 'start' : 'stretch')
  const autoAlign = align || (orientation === 'vertical' ? 'stretch' : 'center')
  const autoGap = gap || (variant === 'pills' ? 'sm' : 'md')
  const autoWrap = wrap || (orientation === 'horizontal' ? false : 'nowrap')

  const isTabActive = (tab: ITab) => {
    if (activeTabId === undefined) return false
    return tab.id === activeTabId
  }

  const handleTabClick = (e: MouseEvent, tab: ITab) => {
    console.log(tab)
    onTabClick?.(tab)
  }

  return (
    <Flex
      as='nav'
      aria-orientation={orientation}
      direction={direction || flexDirection}
      justify={autoJustify}
      align={autoAlign}
      gap={autoGap}
      wrap={autoWrap}
      className={cn(
        orientation === 'horizontal' && variant === 'underline',
        variant === 'pills' && 'rounded-lg p-1 bg-surface-container',
        className,
      )}
      {...flexProps}
    >
      {tabs.map((tab) => {
        const isActive = isTabActive(tab)

        return (
          <TabButton<T>
            key={tab.id}
            tabData={tab}
            isActive={isActive}
            onClick={handleTabClick}
            variant={variant}
            size={size}
            fullWidth={shouldStretch}
            showCount={showCounts}
          />
        )
      })}
    </Flex>
  )
}

const createTabGroupPreset = createPreset(TabGroup)

export const TabGroupPresets = {
  Underline: createTabGroupPreset({
    variant: 'underline' as const,
    orientation: 'horizontal' as const,
  }),

  Pills: createTabGroupPreset({
    variant: 'pills' as const,
  }),

  Outline: createTabGroupPreset({
    variant: 'outline' as const,
  }),

  Vertical: createTabGroupPreset({
    orientation: 'vertical' as const,
  }),
}

export type TabGroupPreset = keyof typeof TabGroupPresets

export const UnderlineTabs = TabGroupPresets.Underline
export const OutlineTabs = TabGroupPresets.Outline
export const PillsTabs = TabGroupPresets.Pills
export const VerticalTabs = TabGroupPresets.Vertical
