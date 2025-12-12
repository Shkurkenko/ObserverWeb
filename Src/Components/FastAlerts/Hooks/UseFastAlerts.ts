import { useContext } from 'preact/hooks'
import { FastAlertsContext } from '../../../Context/FastAlertsContext'

export function useFastAlerts() {
  const context = useContext(FastAlertsContext)

  if (!context) {
    throw new Error('FastAlertsContext is not available')
  }

  const {
    fastAlerts,
    addFastNotification,
    deleteFastNotification,
    deleteFastNotificationWithDelay,
    showFastNotification,
    hideFastNotification,
    hideFastNotificationWithDelay,
    toggleFastNotification,
  } = context

  return {
    fastAlerts,
    addFastNotification,
    deleteFastNotification,
    deleteFastNotificationWithDelay,
    showFastNotification,
    hideFastNotification,
    hideFastNotificationWithDelay,
    toggleFastNotification,
  }
}
