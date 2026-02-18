import { Alert } from './Alerts.types'
import { createContext, ComponentChildren } from 'preact'
import { useState, useCallback } from 'preact/hooks'

import { v4 as uuidv4 } from 'uuid'

export interface AlertsContext {
  alerts: Alert[]

  addAlert: (alert: Alert) => void

  dismissAlert: (id: string) => void
}

export interface AlertsProviderProps {
  children: ComponentChildren
}

export const AlertsContext = createContext<AlertsContext | null>(null)
export const AlertsProvider = ({ children }: AlertsProviderProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([])

  const addAlert = useCallback((alert: Alert) => {
    const id = uuidv4()
    setAlerts((prev: Alert[]) => [...prev, { ...alert, id }])
  }, [])

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert: Alert) => alert.id !== id))
  }, [])

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, dismissAlert }}>
      {children}
    </AlertsContext.Provider>
  )
}
