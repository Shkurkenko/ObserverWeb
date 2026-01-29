import { INetworkTabProps } from '../NetworkTab'
import { NetworkTabData } from '../NetworkTab'
import { NetworkTab } from '../NetworkTab'
import { cn } from '../../../../Utils/Helpers'

export interface INetworkTabGroupProps {
  tabs: INetworkTabProps[]

  activeIndex: number

  activeTabId?: string

  onTabClick?: (tab: NetworkTabData) => void

  onTabClose?: (tabId: string) => void

  className?: string
}

export const NetworkTabGroup = ({
  tabs,
  onTabClick,
  onTabClose,
  className,
  activeIndex = 0,
}: INetworkTabGroupProps) => {
  return (
    <div className={cn('flex items-end gap-1 border-b border-outline/50', className)}>
      {tabs.map((tab, index) => (
        <NetworkTab
          key={tab.id}
          {...tab}
          active={tab.index === activeIndex}
          onTabClick={onTabClick}
          onClose={onTabClose}
        />
      ))}
    </div>
  )
}
