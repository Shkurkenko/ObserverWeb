import { ReoSpace } from '../../../../Shared/Interfaces/Reo.interface'
import { ITab } from '../../../../Shared/Interfaces/Main.interface'
import { ObserverConfig } from '../../../../../Config/ObserverConfig'
import { Surface } from '../../../../Components/Layouts/Surface'
import { Flex } from '../../../../Components/Layouts/Flex'
import { ShinyLight } from '../../../../Components/ShinyLight'
import { CloseButton } from '../../../../Components/CloseButton'
import { cn } from '../../../../Utils/Helpers'

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

export interface INetworkTabProps extends ITab {
  index: number

  networkType: string

  networkIcon: string

  status: ReoSpace.IScanStatusTypes

  signalCount: number

  onClose?: (id: string) => void

  onTabClick?: (tab: NetworkTabData) => void

  active?: boolean

  showCloseButton?: boolean

  className?: string
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
  className = '',
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
        className,
        'group relative px-6 py-3',
        'border-b-0',
        active && 'border-t-2 border-t-primary',
      )}
      onClick={handleClick}
    >
      {/* Контент табы */}
      <Flex align='center'>
        {/* Иконка сети */}
        <div className='text-lg'>{networkIcon}</div>
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
        className='ml-2 mr-2'
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
