import { AlertsSpace } from '../Src/Shared/Interfaces/Alerts.interface'
import { v4 as uuidv4 } from 'uuid'

export const journalAlertsData: AlertsSpace.IAlertType[] = [
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Error,
    header: 'First alert 1',
    message: 'All right bro 1!',
    show: true,
    ttl: 2000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Info,
    header: 'First alert 2',
    message: 'All right bro 2!',
    show: true,
    ttl: 2000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Warning,
    header: 'First alert 3',
    message: 'All right bro 3!',
    show: true,
    ttl: 2000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Success,
    header: 'First alert 4',
    message: 'All right bro 4!',
    show: true,
    ttl: 2000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Success,
    header: 'First alert 5',
    message: 'All right bro 5!',
    show: true,
    ttl: 2000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Success,
    header: 'First alert 6',
    message: 'All right bro 6!',
    show: true,
    ttl: 2000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Success,
    header: 'First alert 7',
    message: 'All right bro 7!',
    show: true,
    ttl: 2000,
  },
  {
    id: uuidv4(),
    type: AlertsSpace.ILevel.Success,
    header: 'First alert 8',
    message: 'All right bro 8!',
    show: true,
    ttl: 2000,
  },
]
