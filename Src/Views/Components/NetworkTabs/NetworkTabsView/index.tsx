import { NetworkTabGroup } from '../NetworkTabGroup'
import { useNetworkTabs } from '..'
import {
  ReoNetworkData,
  ReoScanStatus,
  ReoScanStatusType,
} from '../../../../Shared/Interfaces/Reo.interface'

export interface NetworkTabsViewProps {
  networks: ReoNetworkData[]

  activeIndex?: number

  onTabClick?: (network: ReoNetworkData) => void

  onTabClose?: (networkId: string) => void

  className?: string

  status?: ReoScanStatusType
}

export function NetworkTabsView({
  networks,
  onTabClick,
  onTabClose,
  className,
  status = ReoScanStatus.Idle,
  activeIndex = 0,
}: NetworkTabsViewProps) {
  const { tabs, handleTabClick } = useNetworkTabs(networks, {
    onTabClick,
    onTabClose,
    status,
  })

  return (
    <NetworkTabGroup
      tabs={tabs}
      activeIndex={activeIndex}
      onTabClick={handleTabClick}
      onTabClose={onTabClose}
      className={className}
    />
  )
}
