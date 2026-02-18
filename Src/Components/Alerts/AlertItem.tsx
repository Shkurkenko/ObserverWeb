import { StylableProps } from '../Shared/Common.types'
import { AlertLevel, AlertLevelType } from './Alerts.types'
import { useAlerts } from './UseAlerts'
import { Box } from '../Layouts/Box'
import { Stack } from '../Layouts/Stack'
import { Flex } from '../Layouts/Flex'
import { Heading } from '../Typography'
import { Text } from '../Typography'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { getAlertConfig } from './Alerts.helpers'

import { cn } from '../../Utils/Helpers'

export interface AlertItemProps extends StylableProps {
  id: string
  type?: AlertLevelType
  header?: string
  message: string
  onDismiss?: (id: string) => void
}

export const AlertItem = ({
  id,
  type = AlertLevel.Default,
  header,
  message,
  onDismiss,
  className = '',
  style = {},
}: AlertItemProps) => {
  const { dismissAlert } = useAlerts()
  const config = getAlertConfig(type)

  const handleClose = (e: Event) => {
    e.preventDefault()
    if (onDismiss) {
      onDismiss(id)
    } else {
      dismissAlert(id)
    }
  }

  return (
    <Box
      className={cn(`alert-item pr-6 overflow-hidden`, className)}
      style={{
        borderLeft: `0.25rem solid ${config.color}`,
        ...style,
      }}
    >
      <Stack className='overflow-hidden'>
        <Flex className='notification-header'>
          <Box className='notification-icon self-start' style={{ color: config.color }}>
            {config.icon}
          </Box>

          <Heading level={4} style={{ color: config.color }}>
            {header}
          </Heading>
        </Flex>

        <Box as='article' className='notification-content text-wrap'>
          <Text className='ml-5 line-clamp-3'>{message}</Text>
        </Box>
      </Stack>

      <Box className='close-notification' onClick={handleClose}>
        <HugeiconsIcon icon={Cancel01Icon} />
      </Box>
    </Box>
  )
}
