import { createContext, ComponentChildren } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { TableSpace } from '../Shared/Interfaces/Table.interface'
import { ReoScanStatusType, ReoView } from '../Shared/Interfaces/Reo.interface'

export interface IScanViewContext {
  scanViews: ReoView[]

  activeScanViewId: string | null

  setScanViews: (views: ReoView[]) => void

  addReoScanView: (view: ReoView) => void

  addTabToScanView?: (viewId: string, tabData: any) => void

  deleteScanView: (id: string) => void

  toggleScanView: (id: string) => void

  showScanView: (id: string) => void

  hideScanView: (id: string) => void

  setActiveScanView: (id: string | null) => void

  getActiveScanView: () => ReoView | undefined

  getScanViewById: (id: string) => ReoView | undefined

  addRowToScanView?: (viewId: string, tabIndex: number, row: TableSpace.IRow) => void

  clearScanViewData?: (viewId: string, tabId?: string) => void

  updateScanViewTabData?: (viewId: string, tabId: string, rows: TableSpace.IRow[]) => void

  updateScanViewData: (id: string, data: Partial<ReoView>) => void

  updateScanViewStatus?: (viewId: string, status: ReoScanStatusType) => void

  updateScanViewCycle?: (viewId: string) => void

  removeTabFromScanView?: (viewId: string, tabId: string) => void

  setActiveScanTab?: (viewId: string, tabId: string) => void
}

export const ScanViewContext = createContext<IScanViewContext | null>(null)

export const ScanViewProvider = ({
  children,
  initialViews = [],
}: {
  children: ComponentChildren
  initialViews?: ReoView[]
}) => {
  const [scanViews, setScanViews] = useState<ReoView[]>(initialViews)
  const [activeScanViewId, setActiveScanViewId] = useState<string | null>(
    initialViews[0]?.id || null,
  )

  const addReoScanView = useCallback((view: ReoView) => {
    setScanViews((prev) => {
      if (prev.some((v) => v.id === view.id)) return prev
      const newViews = [...prev, { ...view, show: true }]
      setActiveScanViewId(view.id)
      return newViews
    })
  }, [])

  const deleteScanView = useCallback(
    (id: string) => {
      setScanViews((prev) => {
        const newViews = prev.filter((view) => view.id !== id)
        if (activeScanViewId === id && newViews.length > 0) {
          setActiveScanViewId(newViews[0].id)
        } else if (newViews.length === 0) {
          setActiveScanViewId(null)
        }
        return newViews
      })
    },
    [activeScanViewId],
  )

  const toggleScanView = useCallback((id: string) => {
    setScanViews((prev) =>
      prev.map((view) => (view.id === id ? { ...view, show: !view.show } : view)),
    )
  }, [])

  const showScanView = useCallback((id: string) => {
    setScanViews((prev) => prev.map((view) => (view.id === id ? { ...view, show: true } : view)))
    setActiveScanViewId(id)
  }, [])

  const hideScanView = useCallback((id: string) => {
    setScanViews((prev) => prev.map((view) => (view.id === id ? { ...view, show: false } : view)))
  }, [])

  const setActiveScanView = useCallback(
    (id: string | null) => {
      setActiveScanViewId(id)
      if (id) showScanView(id)
    },
    [showScanView],
  )

  const getActiveScanView = useCallback((): ReoView | undefined => {
    return scanViews.find((view) => view.id === activeScanViewId)
  }, [scanViews, activeScanViewId])

  const getScanViewById = useCallback(
    (id: string): ReoView | undefined => {
      return scanViews.find((view) => view.id === id)
    },
    [scanViews],
  )

  const updateScanViewData = useCallback((id: string, data: Partial<ReoView>) => {
    setScanViews((prev) => prev.map((view) => (view.id === id ? { ...view, ...data } : view)))
  }, [])

  const addRowToScanView = useCallback((viewId: string, tabIndex: number, row: TableSpace.IRow) => {
    console.log('addRowToScanView called', { viewId, tabIndex, row })
    // Реализация по желанию
  }, [])

  const updateScanViewTabData = useCallback(
    (viewId: string, tabId: string, rows: TableSpace.IRow[]) => {
      console.log('updateScanViewTabData called', { viewId, tabId, rows })
      // Реализация по желанию
    },
    [],
  )

  const clearScanViewData = useCallback((viewId: string, tabId?: string) => {
    console.log('clearScanViewData called', { viewId, tabId })
    // Реализация по желанию
  }, [])

  const updateScanViewStatus = useCallback((viewId: string, status: ReoScanStatusType) => {
    console.log('updateScanViewStatus called', { viewId, status })
    // Реализация по желанию
  }, [])

  const updateScanViewCycle = useCallback((viewId: string) => {
    console.log('updateScanViewCycle called', { viewId })
    // Реализация по желанию
  }, [])

  const addTabToScanView = useCallback((viewId: string, tabData: any) => {
    console.log('addTabToScanView called', { viewId, tabData })
    // Реализация по желанию
  }, [])

  const removeTabFromScanView = useCallback((viewId: string, tabId: string) => {
    console.log('removeTabFromScanView called', { viewId, tabId })
    // Реализация по желанию
  }, [])

  const setActiveScanTab = useCallback((viewId: string, tabId: string) => {
    console.log('setActiveScanTab called', { viewId, tabId })
    // Реализация по желанию
  }, [])

  return (
    <ScanViewContext.Provider
      value={{
        scanViews,
        activeScanViewId,
        setScanViews,
        addReoScanView,
        deleteScanView,
        toggleScanView,
        showScanView,
        hideScanView,
        setActiveScanView,
        getActiveScanView,
        getScanViewById,
        updateScanViewData,
        addRowToScanView,
        updateScanViewTabData,
        clearScanViewData,
        updateScanViewStatus,
        updateScanViewCycle,
        addTabToScanView,
        removeTabFromScanView,
        setActiveScanTab,
      }}
    >
      {children}
    </ScanViewContext.Provider>
  )
}
