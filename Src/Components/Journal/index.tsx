import { AlertList } from '../Alerts'
import { useAlerts } from '../Alerts/Hooks/UseAlerts'
import { Box } from '../Layouts/Box'
import { Heading, Icon } from '../Typography'
import { Flex } from '../Layouts/Flex'
import { Button } from '../Button'
import { cn } from '../../Utils/Helpers'
import { ITab } from '../../Shared/Interfaces/Main.interface'
import { UnderlineTabs } from '../Tabs/TabGroup'
import { useEffect, useState } from 'preact/hooks'
import { AlertsSpace } from '../../Shared/Interfaces/Alerts.interface'

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

export const AppLogs = () => {
  return <div>Log something</div>
}

const journalTabs: ITab[] = [
  {
    id: 'AppEvents',
    index: 0,
    label: 'Собития',
  },
  {
    id: 'AppLogs',
    index: 1,
    label: 'Лог',
  },
]

export function Journal() {
  const { alerts } = useAlerts()
  const [activeTab, setActiveTab] = useState('AppEvents')

  useEffect(() => {
    alerts.push(
      {
        header: 'Test Event Error:',
        message:
          'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
        show: true,
        type: AlertsSpace.ILevel.Error,
        id: '09i98sdfs',
        ttl: 3000,
      },
      {
        header: 'Test Event Warning',
        message:
          'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
        show: true,
        type: AlertsSpace.ILevel.Warning,
        id: '09i98sdfssdf',
        ttl: 3000,
      },
      {
        header: 'Test Event Info',
        message:
          'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
        show: true,
        type: AlertsSpace.ILevel.Info,
        id: 'asdfaa',
        ttl: 3000,
      },
      {
        header: 'Test Event ',
        message:
          'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
        show: true,
        type: AlertsSpace.ILevel.Success,
        id: '09i98saaadfdfssdssssdsdfss',
        ttl: 3000,
      },
      {
        header: 'Test Event Info',
        message:
          'Test event for viewing alert message and style it more text and more and more and more and more and more!!!',
        show: true,
        type: AlertsSpace.ILevel.Info,
        id: '09i98sdfssdshdjfkjsdfsssss',
        ttl: 3000,
      },
    )
  }, [])

  return (
    <Box className='journal-container w-full border-outline-variant/80 border-r'>
      <Flex direction='col' className='w-full border-outline-variant/80 border-b p-7' gap='xl'>
        <Heading level={3}>Журнал</Heading>
        <RoundedCloseButton
          onClose={() => console.log('Journal close')}
          className='absolute rounded-full right-0 translate-x-1/2 bg-background hover:bg-surface-container'
        />
      </Flex>
      <UnderlineTabs
        tabs={journalTabs}
        activeTabId={activeTab}
        onTabClick={(tab: any) => setActiveTab(tab.id)}
        fullWidth
        className={'border-b border-outline-variant/90 w-full'}
      />
      <Box className='w-full'>
        {activeTab === 'AppEvents' && <AlertList model={alerts} />}
        {activeTab === 'AppLogs' && <AppLogs />}
      </Box>
    </Box>
  )
}
