import { useMemo } from 'preact/hooks'
import { NetworkTabData } from './NetworkTab'
import { ReoNetworkData, ReoScanStatusType } from '../../../Shared/Interfaces/Reo.interface'

export interface UseNetworkTabsOptions {
  onTabClick?: (network: ReoNetworkData) => void

  onTabClose?: (networkId: string) => void

  showCloseButtons?: boolean

  status?: ReoScanStatusType
}

export const useNetworkTabs = (networks: ReoNetworkData[], options?: UseNetworkTabsOptions) => {
  const {
    onTabClick,
    onTabClose,
    showCloseButtons = true,
    status = 'idle' as ReoScanStatusType,
  } = options || {}

  const networkTabs = useMemo(
    () =>
      networks.map((network) => ({
        id: network.id,
        index: network.index,
        label: network.name,
        networkType: network.type,
        networkIcon: network.icon,
        status,
        signalCount: network.signalCount,
        disabled: false,
        loading: false,
        onClose: onTabClose ? () => onTabClose?.(network.id) : undefined,
        showCloseButton: showCloseButtons,
      })),
    [networks, status, onTabClose, showCloseButtons],
  )

  const handleTabClick = (tabData: NetworkTabData) => {
    const network = networks.find((n) => n.id === tabData.id)
    if (network) {
      onTabClick?.(network)
    }
  }

  return {
    tabs: networkTabs,
    handleTabClick,
  }
}
