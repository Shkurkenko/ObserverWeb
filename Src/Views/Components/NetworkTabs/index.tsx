import { useMemo } from 'preact/hooks'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { Flex } from '../../../Components/Layouts/Flex'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { cn } from '../../../Utils/Helpers'
import { CloseButton } from '../../../Components/CloseButton'
import { ShinyLight } from '../../../Components/ShinyLight'
import { Surface } from '../../../Components/Layouts/Surface'

// Базовый тип данных для табы сети
export interface NetworkTabData {
  id: string

  label: string

  networkType: string

  networkIcon: string

  status: ReoSpace.IScanStatusTypes

  signalCount: number

  disabled?: boolean

  loading?: boolean
}

// Основной интерфейс для компонента NetworkTab
export interface INetworkTabProps extends ITab {
  networkType: string

  networkIcon: string

  status: ReoSpace.IScanStatusTypes

  signalCount: number

  onClose?: (id: string) => void

  onTabClick?: (tab: NetworkTabData) => void

  active?: boolean

  showCloseButton?: boolean
}

export function NetworkTab({
  id,
  label,
  networkType,
  networkIcon,
  status = ReoSpace.IScanStatusTypes.Idle,
  signalCount = 0,
  onClose,
  onTabClick,
  active = false,
  showCloseButton = true,
  disabled = false,
  loading = false,
}: INetworkTabProps) {
  const statusConfig = ObserverConfig.ScanStatusColors[status]

  const handleClick = (e: MouseEvent) => {
    if (disabled || loading) return

    const tabData: NetworkTabData = {
      id,
      label,
      networkType,
      networkIcon,
      status,
      signalCount,
      disabled,
      loading,
    }

    onTabClick?.(tabData)
  }

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation()
    onClose?.(id)
  }

  const surfaceVariant = active ? '1' : '0'

  return (
    <Surface
      role='tab'
      aria-selected={active}
      aria-disabled={disabled || loading}
      interactive={!disabled && !loading}
      variant={active ? 'surface' : 'surface-container'}
      elevation={active ? '1' : '0'}
      border={active ? 'none' : 'default'}
      rounded='none'
      className={cn(
        'group relative px-6 py-3',
        'border-b-0',
        active && 'border-t-2 border-t-primary',
      )}
      onClick={handleClick}
    >
      {/* Иконка сети */}
      <div className='text-lg'>{networkIcon}</div>

      {/* Контент табы */}
      <Flex align='center'>
        <span className='font-medium truncate'>{label}</span>
        <span
          className={cn(
            'px-1 py-1 rounded',
            active ? 'bg-primary/10' : 'bg-surface-container-high',
            'text-sm',
          )}
        >
          {signalCount}
        </span>
        {/* <span className='text-on-surface-variant/70'>{status}</span> */}
      </Flex>

      {/* Индикатор статуса сканирования */}
      <ShinyLight
        size='md'
        isShining={status === ReoSpace.IScanStatusTypes.Running}
        color={statusConfig.bg}
        glowColor={statusConfig.glow}
      />

      {showCloseButton && !disabled && <CloseButton onClose={handleClose} />}

      {/* Активная полоска снизу */}
      {active && (
        <div
          className='absolute -bottom-px left-0 right-0 h-1'
          style={{ backgroundColor: statusConfig.glow }}
        />
      )}
    </Surface>
  )
}

// Интерфейс для группы табов
export interface INetworkTabGroupProps {
  tabs: INetworkTabProps[]
  activeTabId?: string
  onTabClick?: (tab: NetworkTabData) => void
  onTabClose?: (tabId: string) => void
  className?: string
}

export const NetworkTabGroup = ({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  className,
}: INetworkTabGroupProps) => {
  return (
    <div className={cn('flex items-end gap-1 border-b border-outline/50', className)}>
      {tabs.map((tab) => (
        <NetworkTab
          key={tab.id}
          {...tab}
          isActive={tab.id === activeTabId}
          onTabClick={onTabClick}
          onClose={onTabClose}
        />
      ))}
    </div>
  )
}

// Тип для исходных данных сети
export interface INetworkData {
  id: string
  name: string
  type: string
  icon: string
  signalCount: number
  hasNewData?: boolean
  lastUpdate?: Date
  description?: string
}

// Хук для преобразования данных
export interface UseNetworkTabsOptions {
  onTabClick?: (network: INetworkData) => void
  onTabClose?: (networkId: string) => void
  activeTabId?: string
  showCloseButtons?: boolean
  status?: ReoSpace.IScanStatusTypes
}

export const useNetworkTabs = (networks: INetworkData[], options?: UseNetworkTabsOptions) => {
  const {
    onTabClick,
    onTabClose,
    activeTabId,
    showCloseButtons = true,
    status = 'idle',
  } = options || {}

  const networkTabs = useMemo(
    () =>
      networks.map((network) => ({
        id: network.id,
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

// Готовый компонент для отображения табов
export interface NetworkTabsViewProps {
  networks: INetworkData[]
  activeTabId?: string
  onTabClick?: (network: INetworkData) => void
  onTabClose?: (networkId: string) => void
  className?: string
  status?: ReoSpace.IScanStatusTypes
}

export function NetworkTabsView({
  networks,
  activeTabId,
  onTabClick,
  onTabClose,
  className,
  status = ReoSpace.IScanStatusTypes.Idle,
}: NetworkTabsViewProps) {
  const { tabs, handleTabClick } = useNetworkTabs(networks, {
    onTabClick,
    onTabClose,
    activeTabId,
    status,
  })

  return (
    <NetworkTabGroup
      tabs={tabs}
      activeTabId={activeTabId}
      onTabClick={handleTabClick}
      onTabClose={onTabClose}
      className={className}
    />
  )
}
