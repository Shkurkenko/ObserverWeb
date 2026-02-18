import { AlertList } from '../Alerts/Components/AlertRoot'
import { useAlerts } from '../Alerts/UseAlerts'
import { Box } from '../Layouts/Box'
import { Divider, Heading, Icon } from '../Typography'
import { Flex } from '../Layouts/Flex'
import { Button } from '../Button'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { AlertsSpace } from '../../Shared/Interfaces/Alerts.interface'
import { HugeiconsIcon } from '@hugeicons/react'
import { TabBadge } from '../Tabs/TabBadge'
import { CSSProperties } from 'preact'
import { ComponentChildren } from 'preact'
import {
  Notebook02Icon,
  CancelCircleIcon,
  InformationSquareIcon,
  CheckmarkCircle04Icon,
  Alert01Icon,
} from '@hugeicons/core-free-icons'

import { cn } from '../../Utils/Helpers'

import './style.sass'

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

  level: AlertsSpace.ILevel

  filter: JournalFilters

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
  const [activeFilter, setActiveFilter] = useState<JournalFilters>(JournalFilters.All)

  const displayedAlerts = useMemo(() => {
    if (activeFilter === JournalFilters.All) return alerts
    return alerts.filter((alert) => alert.type === activeFilter)
  }, [alerts, activeFilter])

  const handleFilterClick = useCallback(
    (filter: JournalFilters, level?: AlertsSpace.ILevel, e?: MouseEvent) => {
      if (filter === JournalFilters.All) {
        setJournalAlerts((prev) => alerts)
        return
      }
      setJournalAlerts((prev) => alerts.filter((alert) => alert.type === level))
      setActiveFilter((prev) => filter)
    },
    [alerts],
  )

  useEffect(() => {
    setJournalAlerts(alerts)
  }, [alerts])

  const allCount = alerts.length
  const errorsCount = alerts.filter((alert) => alert.type === AlertsSpace.ILevel.Error).length
  const warningsCount = alerts.filter((alert) => alert.type === AlertsSpace.ILevel.Warning).length
  const successCount = alerts.filter((alert) => alert.type === AlertsSpace.ILevel.Success).length
  const infoCount = alerts.filter((alert) => alert.type === AlertsSpace.ILevel.Info).length

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
            level={AlertsSpace.ILevel.Default}
            handleClick={() => handleFilterClick(JournalFilters.All)}
          />

          <JournalFilterButton
            show={errorsExists}
            active={activeFilter === JournalFilters.Error}
            count={errorsCount}
            variant={'error'}
            icon={<HugeiconsIcon icon={CancelCircleIcon} size={25} />}
            filter={JournalFilters.Error}
            level={AlertsSpace.ILevel.Error}
            handleClick={() => handleFilterClick(JournalFilters.Error, AlertsSpace.ILevel.Error)}
          />

          <JournalFilterButton
            show={warningExists}
            active={activeFilter === JournalFilters.Warning}
            count={warningsCount}
            variant={'warning'}
            icon={<HugeiconsIcon icon={Alert01Icon} size={25} />}
            filter={JournalFilters.Warning}
            level={AlertsSpace.ILevel.Warning}
            handleClick={() =>
              handleFilterClick(JournalFilters.Warning, AlertsSpace.ILevel.Warning)
            }
          />

          <JournalFilterButton
            show={successExists}
            active={activeFilter === JournalFilters.Success}
            count={successCount}
            variant={'success'}
            icon={<HugeiconsIcon icon={CheckmarkCircle04Icon} size={25} />}
            filter={JournalFilters.Success}
            level={AlertsSpace.ILevel.Success}
            handleClick={() =>
              handleFilterClick(JournalFilters.Success, AlertsSpace.ILevel.Success)
            }
          />

          <JournalFilterButton
            show={infoExists}
            active={activeFilter === JournalFilters.Info}
            count={infoCount}
            variant={'info'}
            icon={<HugeiconsIcon icon={InformationSquareIcon} size={25} />}
            filter={JournalFilters.Info}
            level={AlertsSpace.ILevel.Info}
            handleClick={() => handleFilterClick(JournalFilters.Info, AlertsSpace.ILevel.Info)}
          />
        </Flex>
      </Flex>
      <Box className='w-full flex-1'>
        <AlertList model={journalAlerts} />
      </Box>
    </Box>
  )
}
