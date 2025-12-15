import { AlertsSpace } from '../../Shared/Interfaces/Alerts.interface'
import { AlertItem } from './AlertItem'

import './style.sass'

interface IAlertListProps {
  model: AlertsSpace.IAlertType[]
}

export function AlertList({ model }: IAlertListProps) {
  return (
    <div className='flex alert-list w-full scrollbar-thin'>
      {model.map((alert: AlertsSpace.IAlertType) => (
        <AlertItem
          key={alert.id}
          id={alert.id}
          type={alert.type}
          header={alert.header}
          message={alert.message}
          handleDismiss={null}
        />
      ))}
    </div>
  )
}
