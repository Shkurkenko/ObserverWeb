// src/Context/ReoScanViewContext.tsx
import { createContext, ComponentChildren } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { TableSpace } from '../Shared/Interfaces/Table.interface'
import { ReoSpace } from '../Shared/Interfaces/Reo.interface'

export interface IScanViewContext {
  scanViews: ReoSpace.IReoView[]

  activeViewId: string | null

  setScanViews: (views: ReoSpace.IReoView[]) => void

  addView: (view: ReoSpace.IReoView) => void

  deleteView: (id: string) => void

  toggleView: (id: string) => void

  showView: (id: string) => void

  hideView: (id: string) => void

  setActiveView: (id: string | null) => void

  getActiveView: () => ReoSpace.IReoView | undefined

  getViewById: (id: string) => ReoSpace.IReoView | undefined

  updateViewData: (id: string, data: Partial<ReoSpace.IReoView>) => void

  addRowToView?: (viewId: string, tabIndex: number, row: TableSpace.IRow) => void

  updateViewTabData?: (viewId: string, tabId: string, rows: TableSpace.IRow[]) => void

  clearViewData?: (viewId: string, tabId?: string) => void

  updateViewScanStatus?: (viewId: string, status: ReoSpace.IScanStatusTypes) => void

  updateViewScanCycle?: (viewId: string, cycle: number) => void

  addTabToView?: (viewId: string, tabData: any) => void

  removeTabFromView?: (viewId: string, tabId: string) => void

  setActiveTab?: (viewId: string, tabId: string) => void
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
  const [activeViewId, setActiveViewId] = useState<string | null>(initialViews[0]?.viewId || null)

  // Базовые методы
  const addView = useCallback((view: ReoSpace.IReoView) => {
    setScanViews((prev) => {
      if (prev.some((v) => v.viewId === view.viewId)) return prev
      const newViews = [...prev, { ...view, show: true }]
      setActiveViewId(view.viewId)
      return newViews
    })
  }, [])

  const deleteView = useCallback(
    (id: string) => {
      setScanViews((prev) => {
        const newViews = prev.filter((view) => view.viewId !== id)
        if (activeViewId === id && newViews.length > 0) {
          setActiveViewId(newViews[0].viewId)
        } else if (newViews.length === 0) {
          setActiveViewId(null)
        }
        return newViews
      })
    },
    [activeViewId],
  )

  const toggleView = useCallback((id: string) => {
    setScanViews((prev) =>
      prev.map((view) => (view.viewId === id ? { ...view, show: !view.show } : view)),
    )
  }, [])

  const showView = useCallback((id: string) => {
    setScanViews((prev) =>
      prev.map((view) => (view.viewId === id ? { ...view, show: true } : view)),
    )
    setActiveViewId(id)
  }, [])

  const hideView = useCallback((id: string) => {
    setScanViews((prev) =>
      prev.map((view) => (view.viewId === id ? { ...view, show: false } : view)),
    )
  }, [])

  const setActiveView = useCallback(
    (id: string | null) => {
      setActiveViewId(id)
      if (id) showView(id)
    },
    [showView],
  )

  const getActiveView = useCallback((): ReoSpace.IReoView | undefined => {
    return scanViews.find((view) => view.viewId === activeViewId)
  }, [scanViews, activeViewId])

  const getViewById = useCallback(
    (id: string): ReoSpace.IReoView | undefined => {
      return scanViews.find((view) => view.viewId === id)
    },
    [scanViews],
  )

  const updateViewData = useCallback((id: string, data: Partial<ReoSpace.IReoView>) => {
    setScanViews((prev) => prev.map((view) => (view.viewId === id ? { ...view, ...data } : view)))
  }, [])

  // Расширенные методы (опционально)
  const addRowToView = useCallback((viewId: string, tabIndex: number, row: TableSpace.IRow) => {
    console.log('addRowToView called', { viewId, tabIndex, row })
    // Реализация по желанию
  }, [])

  const updateViewTabData = useCallback(
    (viewId: string, tabId: string, rows: TableSpace.IRow[]) => {
      console.log('updateViewTabData called', { viewId, tabId, rows })
      // Реализация по желанию
    },
    [],
  )

  const clearViewData = useCallback((viewId: string, tabId?: string) => {
    console.log('clearViewData called', { viewId, tabId })
    // Реализация по желанию
  }, [])

  const updateViewScanStatus = useCallback((viewId: string, status: ReoSpace.IScanStatusTypes) => {
    console.log('updateViewScanStatus called', { viewId, status })
    // Реализация по желанию
  }, [])

  const updateViewScanCycle = useCallback((viewId: string, cycle: number) => {
    console.log('updateViewScanCycle called', { viewId, cycle })
    // Реализация по желанию
  }, [])

  const addTabToView = useCallback((viewId: string, tabData: any) => {
    console.log('addTabToView called', { viewId, tabData })
    // Реализация по желанию
  }, [])

  const removeTabFromView = useCallback((viewId: string, tabId: string) => {
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
        activeViewId,
        setScanViews,
        addView,
        deleteView,
        toggleView,
        showView,
        hideView,
        setActiveView,
        getActiveView,
        getViewById,
        updateViewData,
        // Добавляем методы (опционально)
        addRowToView,
        updateViewTabData,
        clearViewData,
        updateViewScanStatus,
        updateViewScanCycle,
        addTabToView,
        removeTabFromView,
        setActiveTab,
      }}
    >
      {children}
    </ScanViewContext.Provider>
  )
}
