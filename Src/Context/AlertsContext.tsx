import { createContext, ComponentChildren } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { AlertsSpace } from '../Shared/Interfaces/Alerts.interface'

import { v4 as uuidv4 } from 'uuid'

interface IAlertsContext {
  alerts: AlertsSpace.IAlertType[]

  addAlert: (alert: AlertsSpace.IAlertType) => void

  dismissAlert: (id: string) => void
}

interface IAlertsProviderProps {
  children: ComponentChildren
}

export const AlertsContext = createContext<IAlertsContext | null>(null)
export const AlertsProvider = ({ children }: IAlertsProviderProps) => {
  const [alerts, setAlerts] = useState<AlertsSpace.IAlertType[]>([])

  const addAlert = useCallback((alert: AlertsSpace.IAlertType) => {
    const id = uuidv4()
    setAlerts((prev: AlertsSpace.IAlertType[]) => [...prev, { ...alert, id }])
  }, [])

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert: AlertsSpace.IAlertType) => alert.id !== id))
  }, [])

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, dismissAlert }}>
      {children}
    </AlertsContext.Provider>
  )
}

export default AlertsProvider
