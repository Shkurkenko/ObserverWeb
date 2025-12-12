import { createContext, ComponentChildren } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { ReoView } from '../Views/Pages/ReoScan'

interface ISidebarContext {
  scanViews: ReoView[]

  setScanViews: (view: ReoView[]) => void

  addView: (view: ReoView) => void

  deleteView: (id: string) => void

  setViewVisibility: (id: string, status: boolean) => void

  toggleView: (id: string) => void

  showView: (id: string) => void

  hideView: (id: string) => void
}
interface IScanViewProviderProps {
  children: ComponentChildren
}

export const ScanViewContext = createContext<ISidebarContext | null>(null)
const ScanViewProvider = ({ children }: IScanViewProviderProps) => {
  const [scanViews, setScanViews] = useState<ReoView[]>([])

  const addView = useCallback((view: ReoView): void => {
    setScanViews((prev: ReoView[]) => [...prev, view])
  }, [])

  const deleteView = useCallback((id: string): void => {
    setScanViews((prev: ReoView[]) => prev.filter((view: ReoView) => id !== view.taskId))
  }, [])

  const setViewVisibility = useCallback((id: string, status: boolean): void => {
    setScanViews((prev: ReoView[]) =>
      prev.map((view: ReoView) =>
        id === view.taskId ? { ...view, show: status } : { ...view, show: !status },
      ),
    )
  }, [])

  const toggleView = useCallback((id: string): void => {
    setScanViews((prev: ReoView[]) =>
      prev.map((view: ReoView) => (id === view.taskId ? { ...view, show: !view.show } : view)),
    )
  }, [])

  const showView = useCallback((id: string): void => {
    setViewVisibility(id, true)
  }, [])

  const hideView = useCallback((id: string): void => {
    setViewVisibility(id, false)
  }, [])

  return (
    <ScanViewContext.Provider
      value={{
        scanViews,
        addView,
        deleteView,
        setScanViews,
        setViewVisibility,
        toggleView,
        showView,
        hideView,
      }}
    >
      {children}
    </ScanViewContext.Provider>
  )
}

export default ScanViewProvider
