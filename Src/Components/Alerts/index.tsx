import { AlertsSpace } from '../../Shared/Interfaces/Alerts.interface'
import { AlertItem } from './AlertItem'
import { Box } from '../Layouts/Box'

import './style.sass'

interface IAlertListProps {
  model: AlertsSpace.IAlertType[]
}

export function AlertList({ model }: IAlertListProps) {
  return (
    <Box className='flex alert-list w-full scrollbar-thin overflow-hidden'>
      {model.map((alert: AlertsSpace.IAlertType) => (
        <AlertItem
          key={alert.id}
          id={alert.id}
          type={alert.type}
          header={alert.header}
          message={alert.message}
          handleDismiss={() => console.log('dismiss alert')}
        />
      ))}
    </Box>
  )
}
