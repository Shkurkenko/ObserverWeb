import { Alert, AlertLevel } from '@Components/Alerts'
import { v4 as uuidv4 } from 'uuid'

export const fastAlertsData: Alert[] = [
  {
    id: uuidv4(),
    type: AlertLevel.Success,
    header: 'Some header 1',
    message: 'Some message 1`',
    show: true,
  },
  {
    id: uuidv4(),
    type: AlertLevel.Error,
    header: 'Some header 2',
    message: 'Some message 2',
    show: true,
  },
  {
    id: uuidv4(),
    type: AlertLevel.Warning,
    header: 'Some header 3',
    message: 'Some message 3',
    show: true,
  },
  {
    id: uuidv4(),
    type: AlertLevel.Info,
    header: 'Some header 4',
    message: 'Some message 4',
    show: true,
  },
]
