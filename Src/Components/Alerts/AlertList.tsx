import { AlertItem } from './AlertItem'
import { Alert } from './Alerts.types'
import { Box } from '../Layouts/Box'
import { Stack } from '../Layouts/Stack'
import { Text } from '../Typography'
import { cn } from '../../Utils/Helpers'
import { type StylableProps } from '../Shared/Common.types'

interface AlertListProps extends StylableProps {
  model: Alert[]
  onAlertDismiss?: (id: string) => void
}

export const AlertList = ({
  model,
  onAlertDismiss,
  className = '',
  style = {},
}: AlertListProps) => {
  if (!model.length) {
    return (
      <Box className={cn('flex items-center justify-center p-8', className)} style={style}>
        <Text>Нет уведомлений</Text>
      </Box>
    )
  }
  return (
    <Box
      className={cn('flex alert-list w-full scrollbar-thin overflow-hidden', className)}
      style={style}
    >
      <Stack className='gap-2'>
        {model.map((alert: Alert) => (
          <AlertItem
            key={alert.id}
            id={alert.id}
            type={alert.type}
            header={alert.header}
            message={alert.message}
            onDismiss={onAlertDismiss}
          />
        ))}
      </Stack>
    </Box>
  )
}
