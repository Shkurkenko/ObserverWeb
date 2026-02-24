import { CSSProperties, ComponentChildren } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'
import { AlertLevel, AlertLevelType, AlertList } from '@Components/Alerts'
import { useAlerts } from '@Components/Alerts'
import { Box } from '@Components/Layouts/Box'
import { Divider, Heading, Icon } from '@Components/Typography'
import { Flex } from '@Components/Layouts/Flex'
import { Button } from '@Components/Button'
import { TabBadge } from '@Components/Tabs/TabBadge'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Notebook02Icon,
  CancelCircleIcon,
  InformationSquareIcon,
  CheckmarkCircle04Icon,
  Alert01Icon,
} from '@hugeicons/core-free-icons'

import { cn } from '@Utils/Helpers'

export interface IRoundedCloseButtonProps {
  onClose: (event: MouseEvent) => void
  className?: string
}

export const RoundedCloseButton = ({ onClose, className = '' }: IRoundedCloseButtonProps) => {
  const handleClose = (event: MouseEvent) => {
    onClose(event)
    console.log('close button pushed')
  }

  return (
    <Button
      onClick={handleClose}
      className={cn(className, 'border-outline-variant text-on-background border')}
      size='sm'
      variant='text'
      aria-label={`Закрыть`}
    >
      <Icon size='lg'>✕</Icon>
    </Button>
  )
}

export const JournalFilters = {
  All: 'All' as const,
  Error: 'Error' as const,
  Warning: 'Warning' as const,
  Info: 'Info' as const,
  Success: 'Success' as const,
} as const
export type JournalFiltersType = (typeof JournalFilters)[keyof typeof JournalFilters]

export type JournalFilterButtonVariant = 'default' | 'error' | 'success' | 'info' | 'warning'

export const journalFilterButtonVariantBackground: Record<JournalFilterButtonVariant, string> = {
  default: 'bg-surface-container',
  error: 'bg-red-900',
  success: 'bg-green-900',
  info: 'bg-blue-900',
  warning: 'bg-yellow-900',
}

export interface IJournalFilterProps {
  show: boolean

  active?: boolean

  variant?: JournalFilterButtonVariant

  level: AlertLevelType

  filter: JournalFiltersType

  count: number

  text?: string

  icon?: ComponentChildren

  handleClick: (e?: MouseEvent) => void

  className?: string

  style?: CSSProperties
}

export const JournalFilterButton = ({
  show,
  filter,
  count,
  icon,
  handleClick,
  variant = 'default',
  active = false,
  text = '',
  className = '',
  style = {},
}: IJournalFilterProps) => {
  return (
    <>
      {show && (
        <Button
          variant='text'
          className={cn(
            `${active ? 'bg-primary text-on-primary' : journalFilterButtonVariantBackground[variant]}`,
            'hover:bg-surface-container-highest hover:text-on-surface-variant',
            className,
          )}
          style={style}
          onClick={handleClick}
        >
          {icon}
          {text}
          <TabBadge className='ml-2' content={count} />
        </Button>
      )}
    </>
  )
}

export const Journal = () => {
  const { alerts } = useAlerts()
  const [activeFilter, setActiveFilter] = useState<JournalFiltersType>(JournalFilters.All)

  const displayedAlerts = useMemo(() => {
    if (activeFilter === JournalFilters.All) return alerts
    return alerts.filter(
      (alert) =>
        (alert.type === AlertLevel.Error && activeFilter === JournalFilters.Error) ||
        (alert.type === AlertLevel.Info && activeFilter === JournalFilters.Info) ||
        (alert.type === AlertLevel.Success && activeFilter === JournalFilters.Success) ||
        (alert.type === AlertLevel.Warning && activeFilter === JournalFilters.Warning),
    )
  }, [alerts, activeFilter])

  const handleFilterClick = useCallback((filter: JournalFiltersType) => {
    setActiveFilter(filter)
  }, [])

  const allCount = alerts.length
  const errorsCount = alerts.filter((alert) => alert.type === AlertLevel.Error).length
  const warningsCount = alerts.filter((alert) => alert.type === AlertLevel.Warning).length
  const successCount = alerts.filter((alert) => alert.type === AlertLevel.Success).length
  const infoCount = alerts.filter((alert) => alert.type === AlertLevel.Info).length

  const alertsEmpty = alerts.length === 0
  const errorsExists = errorsCount !== 0
  const warningExists = warningsCount !== 0
  const successExists = successCount !== 0
  const infoExists = infoCount !== 0

  return (
    <Box className='journal-container w-full border-outline-variant/80 border-r overflow-hidden'>
      <Flex direction='col' justify='center' className='w-full p-7' gap='xl'>
        <Flex align='center'>
          <HugeiconsIcon icon={Notebook02Icon} />
          <Heading level={3}>Журнал</Heading>
        </Flex>

        <RoundedCloseButton
          onClose={() => console.log('Journal close')}
          className='absolute rounded-full right-0 translate-x-1/2 bg-background hover:bg-surface-container'
        />

        <Divider className='border-outline-variant/80' />

        <Flex>
          <JournalFilterButton
            show={!alertsEmpty}
            active={activeFilter === JournalFilters.All}
            text={'Все'}
            variant='default'
            count={allCount}
            filter={JournalFilters.All}
            level={AlertLevel.Default}
            handleClick={() => handleFilterClick(JournalFilters.All)}
          />

          <JournalFilterButton
            show={errorsExists}
            active={activeFilter === JournalFilters.Error}
            count={errorsCount}
            variant={'error'}
            icon={<HugeiconsIcon icon={CancelCircleIcon} size={25} />}
            filter={JournalFilters.Error}
            level={AlertLevel.Error}
            handleClick={() => handleFilterClick(JournalFilters.Error)}
          />

          <JournalFilterButton
            show={warningExists}
            active={activeFilter === JournalFilters.Warning}
            count={warningsCount}
            variant={'warning'}
            icon={<HugeiconsIcon icon={Alert01Icon} size={25} />}
            filter={JournalFilters.Warning}
            level={AlertLevel.Warning}
            handleClick={() => handleFilterClick(JournalFilters.Warning)}
          />

          <JournalFilterButton
            show={successExists}
            active={activeFilter === JournalFilters.Success}
            count={successCount}
            variant={'success'}
            icon={<HugeiconsIcon icon={CheckmarkCircle04Icon} size={25} />}
            filter={JournalFilters.Success}
            level={AlertLevel.Success}
            handleClick={() => handleFilterClick(JournalFilters.Success)}
          />

          <JournalFilterButton
            show={infoExists}
            active={activeFilter === JournalFilters.Info}
            count={infoCount}
            variant={'info'}
            icon={<HugeiconsIcon icon={InformationSquareIcon} size={25} />}
            filter={JournalFilters.Info}
            level={AlertLevel.Info}
            handleClick={() => handleFilterClick(JournalFilters.Info)}
          />
        </Flex>
      </Flex>
      <Box className='w-full flex-1'>
        <AlertList alerts={alerts} />
      </Box>
    </Box>
  )
}
