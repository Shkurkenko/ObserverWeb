import { useCallback, useState } from 'preact/hooks'
import { useMemo } from 'preact/hooks'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { NetworkTabData } from './NetworkTab'

export interface UseNetworkTabsOptions {
  activeIndexOption?: number

  onTabClick?: (network: ReoSpace.INetworkData) => void

  onTabClose?: (networkId: string) => void

  showCloseButtons?: boolean

  status?: ReoSpace.IScanStatusTypes
}

export const useNetworkTabs = (
  networks: ReoSpace.INetworkData[],
  options?: UseNetworkTabsOptions,
) => {
  const {
    onTabClick,
    onTabClose,
    activeIndexOption = 0,
    showCloseButtons = true,
    status = 'idle' as ReoSpace.IScanStatusTypes,
  } = options || {}

  const [activeIndex, setActiveIndex] = useState<number>(activeIndexOption)

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
    activeIndex,
    handleTabClick,
    setActiveIndex,
  }
}
