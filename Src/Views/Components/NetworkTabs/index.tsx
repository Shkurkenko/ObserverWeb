import { useMemo } from 'preact/hooks'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { Icon } from '../../../Components/Typography'
import { Flex } from '../../../Components/Layouts/Flex'
import { cn } from '../../../Utils/Helpers'

// Базовый тип данных для табы сети
export interface NetworkTabData {
  id: string
  label: string
  networkType: string
  networkIcon: string
  status: 'scanning' | 'idle' | 'error' | 'paused' | 'complete'
  signalCount: number
  disabled?: boolean
  loading?: boolean
}

// Основной интерфейс для компонента NetworkTab
export interface INetworkTabProps extends Omit<ITab, 'id' | 'label'> {
  id: string
  label: string
  networkType: string
  networkIcon: string
  status: 'scanning' | 'idle' | 'error' | 'paused' | 'complete'
  signalCount: number
  onClose?: (id: string) => void
  onTabClick?: (tab: NetworkTabData) => void
  isActive?: boolean
  showCloseButton?: boolean
}

// Цвета статусов
const statusColors = {
  scanning: {
    bg: '#8FD5AF', // primary
    glow: '#8FD5AF',
    text: '#003823', // onPrimary
  },
  idle: {
    bg: '#B4CCBC', // secondary
    glow: '#B4CCBC',
    text: '#203529', // onSecondary
  },
  error: {
    bg: '#FFB4AB', // error
    glow: '#FFB4AB',
    text: '#690005', // onError
  },
  paused: {
    bg: '#D0E8D7', // onSecondaryContainer
    glow: '#B4CCBC',
    text: '#203529',
  },
  complete: {
    bg: '#005235', // primaryContainer
    glow: '#8FD5AF',
    text: '#ABF2CA', // onPrimaryContainer
  },
}

export function NetworkTab({
  id,
  label,
  networkType,
  networkIcon,
  status = 'idle',
  signalCount = 0,
  onClose,
  onTabClick,
  isActive = false,
  showCloseButton = true,
  disabled = false,
  loading = false,
}: INetworkTabProps) {
  const statusConfig = statusColors[status]

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

  return (
    <div
      role='tab'
      aria-selected={isActive}
      aria-disabled={disabled}
      className={cn(
        'group relative flex items-center gap-2 px-8 py-4 cursor-pointer',
        'border border-outline/50',
        'transition-all duration-200',
        isActive
          ? 'bg-surface border-b-0 text-on-surface'
          : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant',
        disabled && 'opacity-50 cursor-not-allowed',
        isActive && 'border-primary/30',
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
            isActive ? 'bg-primary/10' : 'bg-surface-container-high',
            'text-sm',
          )}
        >
          {signalCount}
        </span>
        {/* <span className='text-on-surface-variant/70'>{status}</span> */}
      </Flex>

      {/* Индикатор статуса */}
      <div className='relative'>
        <div
          className={cn(
            'w-2 h-2 rounded-full',
            'transition-all duration-300',
            status === 'scanning' && 'animate-pulse',
          )}
          style={{
            backgroundColor: statusConfig.bg,
            boxShadow: `0 0 8px ${statusConfig.glow}`,
          }}
        />
        {status === 'scanning' && (
          <div
            className='absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-75'
            style={{ backgroundColor: statusConfig.glow }}
          />
        )}
      </div>

      {/* Кнопка закрытия */}
      {showCloseButton && !disabled && (
        <button
          onClick={handleClose}
          className={cn(
            'opacity-0 group-hover:opacity-100 transition-opacity',
            'ml-2 p-1 rounded hover:bg-outline-variant/20',
            'text-on-surface-variant hover:text-on-surface',
          )}
          aria-label={`Закрыть ${label}`}
        >
          <Icon size='sm'>✕</Icon>
        </button>
      )}

      {/* Активная полоска снизу */}
      {isActive && (
        <div
          className='absolute -bottom-px left-0 right-0 h-1'
          style={{ backgroundColor: statusConfig.glow }}
        />
      )}
    </div>
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
  status?: 'scanning' | 'idle' | 'error' | 'paused' | 'complete'
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
  status?: 'scanning' | 'idle' | 'error' | 'paused' | 'complete'
}

export function NetworkTabsView({
  networks,
  activeTabId,
  onTabClick,
  onTabClose,
  className,
  status = 'idle',
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
