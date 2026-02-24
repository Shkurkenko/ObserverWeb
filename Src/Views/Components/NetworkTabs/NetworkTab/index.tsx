import { useState } from 'preact/hooks'
import { Surface } from '@Components/Layouts/Surface'
import { Flex } from '@Components/Layouts/Flex'
import { ShinyLight } from '@Components/ShinyLight'
import { CloseButton } from '@Components/CloseButton'
import { Box } from '@Components/Layouts/Box'
import { Text } from '@Components/Typography'
import { ReoScanStatus, ReoScanStatusType } from '@Shared/Interfaces/Reo.interface'
import { Tab } from '@Components/Tabs/TabGroup'
import { ScanStatusColors } from '@Views/Components/ScanLightStatus/ScanLightStatus.config'
import { cn } from '@Utils/Helpers'

export interface NetworkTabData {
  id: string

  label: string

  networkType: string

  networkIcon: string

  status: ReoScanStatusType

  signalCount: number

  disabled?: boolean

  loading?: boolean
}

export interface NetworkTabProps extends Tab {
  index: number

  networkType: string

  networkIcon: string

  status: ReoScanStatusType

  signalCount: number

  onTabClose?: (id: string) => void

  onTabClick?: (tab: NetworkTabData) => void

  active?: boolean

  showCloseButton?: boolean

  isUnderlined?: boolean

  className?: string
}

export function NetworkTab({
  id,
  label,
  networkType,
  networkIcon,
  onTabClick,
  onTabClose,
  status = ReoScanStatus.Idle,
  signalCount = 0,
  active = false,
  showCloseButton = true,
  disabled = false,
  loading = false,
  isUnderlined = false,
  className = '',
}: NetworkTabProps) {
  const [isHovered, setIsHovered] = useState<Boolean>(false)

  const statusConfig = ScanStatusColors[status]

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

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
    onTabClose?.(id)
  }

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        className,
        'group relative px-6 py-3 min-w-10 overflow-hidden select-none',
        'border-b-0 transition-all duration-200',
        active && 'border-t-2 border-t-primary',
        !disabled && !loading && 'hover:bg-surface-container-high',
      )}
      onClick={handleClick}
    >
      {/* Контент табы */}
      <Flex align='center' className='min-w-0'>
        {/* Иконка сети */}
        <Box className='text-lg shrink-0 mr-2'>{networkIcon}</Box>

        {/* Лейбл табы */}
        <Text variant='body1' className='font-medium truncate min-w-0 flex-1'>
          {label}
        </Text>

        {/* Кол-во строк в таблице / кол-во сигналов */}
        <Text
          variant='body1'
          className={cn(
            'px-1 py-1 rounded',
            active ? 'bg-primary/10' : 'bg-surface-container-highest',
            'text-sm mr-4 min-w-8 text-center',
          )}
        >
          {signalCount}
        </Text>
      </Flex>

      {/* Индикатор статуса сканирования */}
      <Box>
        {!isHovered && (
          <ShinyLight
            size='sm'
            isShining={status === ReoScanStatus.Running}
            color={statusConfig.bg}
            glowColor={statusConfig.glow}
            className='ml-3 shrink-0 mr-3 absolute right-1 top-1/2 -translate-y-1/2'
          />
        )}
        {showCloseButton && !disabled && isHovered && (
          <CloseButton
            onClose={handleClose}
            className='absolute right-2 top-1/2 -translate-y-1/2'
          />
        )}
      </Box>

      {/* Активная полоска снизу */}
      {active && isUnderlined && (
        <Box
          className='absolute -bottom-px left-0 right-0 h-1'
          style={{ backgroundColor: statusConfig.glow }}
        />
      )}
    </Surface>
  )
}
