import { createContext, ComponentChildren } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { AlertsSpace } from '../Shared/Interfaces/Alerts.interface'

interface IFastAlertsContext {
  fastAlerts: AlertsSpace.IAlertType[]

  addFastNotification: (alert: AlertsSpace.IAlertType) => void

  deleteFastNotification: (id: string) => void

  deleteFastNotificationWithDelay: (delay: number, id: string) => void

  clearFastNotifications: () => void

  toggleFastNotification: (id: string) => void

  showFastNotification: (id: string) => void

  hideFastNotification: (id: string, callback: Function) => void

  hideFastNotificationWithDelay: (delay: number, id: string, callback: Function) => void
}

interface IFastAlertsProviderProps {
  children: ComponentChildren
}

export const FastAlertsContext = createContext<IFastAlertsContext | null>(null)
export const FastAlertsProvider = ({ children }: IFastAlertsProviderProps) => {
  const [notificaitonDelay, setNotificationDelay] = useState<number>(1000)
  const [maxCount, setMaxCount] = useState<number>(5)
  const [queue, setQueue] = useState<AlertsSpace.IAlertType[]>([])
  const [fastAlerts, setFastAlerts] = useState<AlertsSpace.IAlertType[]>([])

  const toggleFastNotification = useCallback((id: string): void => {
    setFastAlerts((prev: AlertsSpace.IAlertType[]) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, show: !notification.show } : notification,
      ),
    )
  }, [])

  const showFastNotification = useCallback((id: string): void => {
    setFastAlerts((prev: AlertsSpace.IAlertType[]) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, show: true } : notification,
      ),
    )
  }, [])

  const hideFastNotification = useCallback((id: string, callback: Function): void => {
    setFastAlerts((prev: AlertsSpace.IAlertType[]) =>
      prev.map((notification: AlertsSpace.IAlertType) => {
        if (notification.id === id) {
          return { ...notification, show: false }
        }
        return { ...notification }
      }),
    )
    callback()
  }, [])

  const hideFastNotificationWithDelay = useCallback(
    (delay: number, id: string, callback: Function) => {
      setTimeout(() => hideFastNotification(id, callback), delay)
    },
    [],
  )

  const addFastNotification = useCallback((alert: AlertsSpace.IAlertType): void => {
    setFastAlerts((prev: AlertsSpace.IAlertType[]) => [...prev, alert])
  }, [])

  const deleteFastNotification = useCallback((id: string): void => {
    setFastAlerts((prev: AlertsSpace.IAlertType[]) =>
      prev.filter((notification) => notification.id !== id),
    )
  }, [])

  const deleteFastNotificationWithDelay = useCallback((delay: number, id: string): void => {
    setTimeout(() => {
      deleteFastNotification(id)
    }, delay)
  }, [])

  const clearFastNotifications = useCallback(() => {
    setFastAlerts((prev: AlertsSpace.IAlertType[]) => [])
  }, [])

  return (
    <FastAlertsContext.Provider
      value={{
        fastAlerts,
        addFastNotification,
        deleteFastNotification,
        deleteFastNotificationWithDelay,
        clearFastNotifications,
        toggleFastNotification,
        showFastNotification,
        hideFastNotification,
        hideFastNotificationWithDelay,
      }}
    >
      {children}
    </FastAlertsContext.Provider>
  )
}
