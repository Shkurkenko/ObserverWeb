import { ReoSpace } from '../../../../Shared/Interfaces/Reo.interface'
import { NetworkTabGroup } from '../NetworkTabGroup'
import { useNetworkTabs } from '..'

export interface NetworkTabsViewProps {
  networks: ReoSpace.INetworkData[]

  activeIndex?: number

  onTabClick?: (network: ReoSpace.INetworkData) => void

  onTabClose?: (networkId: string) => void

  className?: string

  status?: ReoSpace.IScanStatusTypes
}

export function NetworkTabsView({
  networks,
  onTabClick,
  onTabClose,
  className,
  status = ReoSpace.IScanStatusTypes.Idle,
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
