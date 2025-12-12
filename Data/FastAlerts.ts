import { AlertsSpace } from '../Shared/Interfaces/Alerts.interface'
import { v4 as uuidv4 } from 'uuid'

export const fastAlertsData: AlertsSpace.IAlertType[] = [
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Success,
    header: 'Some header 1',
    message: 'Some message 1`',
    show: true,
    ttl: 3000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Error,
    header: 'Some header 2',
    message: 'Some message 2',
    show: true,
    ttl: 3000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Warning,
    header: 'Some header 3',
    message: 'Some message 3',
    show: true,
    ttl: 3000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Info,
    header: 'Some header 4',
    message: 'Some message 4',
    show: true,
    ttl: 3000,
  },
]
