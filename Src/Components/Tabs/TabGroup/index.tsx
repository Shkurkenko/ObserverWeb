import { TabButton } from '../TabButton'
import { Flex, IFlexProps } from '../../Layouts/Flex'
import { ComponentChildren } from 'preact'
import { createPreset } from '../../../../Utils/CreatePreset'

import { cn } from '../../../Utils/Helpers'

export interface Tab {
  id: string

  index: number

  label: string

  icon?: ComponentChildren | string

  badge?: string | number

  count?: number

  disabled?: boolean

  loading?: boolean
}

export interface ITabGroupProps extends Omit<IFlexProps, 'children' | 'as' | 'role'> {
  tabs: Tab[]

  activeTabId?: string | number

  onTabClick?: (tab: Tab) => void

  orientation?: 'horizontal' | 'vertical'

  variant?: 'default' | 'underline' | 'pills' | 'outline'

  size?: 'sm' | 'md' | 'lg'

  showCounts?: boolean

  fullWidth?: boolean

  tabStyles?: string
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
  className = '',
  tabStyles = '',
  ...flexProps
}: ITabGroupProps) {
  const flexDirection = orientation === 'vertical' ? 'col' : 'row'

  const shouldStretch = fullWidth || orientation === 'vertical'

  const autoJustify = justify || (orientation === 'horizontal' ? 'start' : 'stretch')

  const autoAlign = align || (orientation === 'vertical' ? 'stretch' : 'center')

  const autoGap = gap || (variant === 'pills' ? 'sm' : 'none')

  const autoWrap = wrap || (orientation === 'horizontal' ? false : 'nowrap')

  const isTabActive = (tab: Tab) => {
    if (activeTabId === undefined) return false
    return tab.id === activeTabId
  }

  const handleTabClick = (e: MouseEvent, tab: Tab) => {
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
        variant === 'pills' && 'rounded-lg p-1 ',
        className,
      )}
      {...flexProps}
    >
      {tabs.map((tab) => {
        const isActive = isTabActive(tab)

        console.log('tab id debug: ', tab)

        return (
          <TabButton
            key={tab.id}
            tabData={tab}
            isActive={isActive}
            onClick={handleTabClick}
            variant={variant}
            size={size}
            fullWidth={shouldStretch}
            showCount={showCounts}
            className={tabStyles}
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
