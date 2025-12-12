import { useContext } from 'preact/hooks'
import { AlertsContext } from '../../../Context/AlertsContext'

export const useAlerts = () => {
  const context = useContext(AlertsContext)

  if (!context) {
    throw new Error('useAlerts must be used within an AlertsProvider')
  }

  const { alerts, addAlert, dismissAlert } = context

  return { alerts, addAlert, dismissAlert }
}
