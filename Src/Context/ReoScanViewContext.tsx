// src/Context/ReoScanViewContext.tsx
import { createContext, ComponentChildren } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { TableSpace } from '../Shared/Interfaces/Table.interface'
import { ReoSpace } from '../Shared/Interfaces/Reo.interface'

export interface IScanViewContext {
  scanViews: ReoSpace.IReoView[]

  activeScanViewId: string | null

  setScanViews: (views: ReoSpace.IReoView[]) => void

  addReoScanView: (view: ReoSpace.IReoView) => void

  addTabToScanView?: (viewId: string, tabData: any) => void

  deleteScanView: (id: string) => void

  toggleScanView: (id: string) => void

  showScanView: (id: string) => void

  hideScanView: (id: string) => void

  setActiveScanView: (id: string | null) => void

  getActiveScanView: () => ReoSpace.IReoView | undefined

  getScanViewById: (id: string) => ReoSpace.IReoView | undefined

  addRowToScanView?: (viewId: string, tabIndex: number, row: TableSpace.IRow) => void

  clearScanViewData?: (viewId: string, tabId?: string) => void

  updateScanViewTabData?: (viewId: string, tabId: string, rows: TableSpace.IRow[]) => void

  updateScanViewData: (id: string, data: Partial<ReoSpace.IReoView>) => void

  updateScanViewStatus?: (viewId: string, status: ReoSpace.IScanStatusTypes) => void

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
  initialViews?: ReoSpace.IReoView[]
}) => {
  const [scanViews, setScanViews] = useState<ReoSpace.IReoView[]>(initialViews)
  const [activeScanViewId, setActiveScanViewId] = useState<string | null>(
    initialViews[0]?.viewId || null,
  )

  // Базовые методы
  const addReoScanView = useCallback((view: ReoSpace.IReoView) => {
    setScanViews((prev) => {
      if (prev.some((v) => v.viewId === view.viewId)) return prev
      const newViews = [...prev, { ...view, show: true }]
      setActiveScanViewId(view.viewId)
      return newViews
    })
  }, [])

  const deleteScanView = useCallback(
    (id: string) => {
      setScanViews((prev) => {
        const newViews = prev.filter((view) => view.viewId !== id)
        if (activeScanViewId === id && newViews.length > 0) {
          setActiveScanViewId(newViews[0].viewId)
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
      prev.map((view) => (view.viewId === id ? { ...view, show: !view.show } : view)),
    )
  }, [])

  const showScanView = useCallback((id: string) => {
    setScanViews((prev) =>
      prev.map((view) => (view.viewId === id ? { ...view, show: true } : view)),
    )
    setActiveScanViewId(id)
  }, [])

  const hideScanView = useCallback((id: string) => {
    setScanViews((prev) =>
      prev.map((view) => (view.viewId === id ? { ...view, show: false } : view)),
    )
  }, [])

  const setActiveScanView = useCallback(
    (id: string | null) => {
      setActiveScanViewId(id)
      if (id) showScanView(id)
    },
    [showScanView],
  )

  const getActiveScanView = useCallback((): ReoSpace.IReoView | undefined => {
    return scanViews.find((view) => view.viewId === activeScanViewId)
  }, [scanViews, activeScanViewId])

  const getScanViewById = useCallback(
    (id: string): ReoSpace.IReoView | undefined => {
      return scanViews.find((view) => view.viewId === id)
    },
    [scanViews],
  )

  const updateScanViewData = useCallback((id: string, data: Partial<ReoSpace.IReoView>) => {
    setScanViews((prev) => prev.map((view) => (view.viewId === id ? { ...view, ...data } : view)))
  }, [])

  const addRowToScanView = useCallback((viewId: string, tabIndex: number, row: TableSpace.IRow) => {
    console.log('addRowToView called', { viewId, tabIndex, row })
    // Реализация по желанию
  }, [])

  const updateScanViewTabData = useCallback(
    (viewId: string, tabId: string, rows: TableSpace.IRow[]) => {
      console.log('updateViewTabData called', { viewId, tabId, rows })
      // Реализация по желанию
    },
    [],
  )

  const clearScanViewData = useCallback((viewId: string, tabId?: string) => {
    console.log('clearViewData called', { viewId, tabId })
    // Реализация по желанию
  }, [])

  const updateScanViewScanStatus = useCallback(
    (viewId: string) => {
      console.log('updateViewScanStatus called', { viewId, status })
      // Реализация по желанию
    },
    [],
  )

  const updateScanViewScanCycle = useCallback((viewId: string, cycle: number) => {
    console.log('updateViewScanCycle called', { viewId, cycle })
    // Реализация по желанию
  }, [])

  const addTabToScanView = useCallback((viewId: string, tabData: any) => {
    console.log('addTabToView called', { viewId, tabData })
    // Реализация по желанию
  }, [])

  const updateScanViewStatus = useCallback((viewId: string, cycle: number) => {
    console.log('updateScanViewStatus called')
  }, [])

  const removeTabFromScanView = useCallback((viewId: string, tabId: string) => {
    console.log('removeTabFromView called', { viewId, tabId })
    // Реализация по желанию
  }, [])

  const setActiveTab = useCallback((viewId: string, tabId: string) => {
    console.log('setActiveTab called', { viewId, tabId })
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
        // updateScanViewStatus,
        // updateScanViewScanCycle,
        addTabToScanView,
        removeTabFromScanView,
        // setActiveTab,
      }}
    >
      {children}
    </ScanViewContext.Provider>
  )
}
