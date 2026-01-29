// src/Hooks/useScanView.ts
import { useContext } from 'preact/hooks'
import { ScanViewContext } from '../Context/ReoScanViewContext'

export const useScanView = () => {
  const context = useContext(ScanViewContext)

  if (!context) {
    throw new Error('useScanView must be used within a ScanViewProvider')
  }

  const {
    scanViews,
    activeViewId,
    setScanViews,
    addScanView,
    deleteScanView,
    toggleScanView,
    showScanView,
    hideScanView,
    setActiveScanView,
    getActiveScanView,
    getScanViewById,
    updateScanViewData,
    addRowToScanViewView,
    updateScanViewTabData,
    clearScanViewData,
    updateScanViewStatus,
    updateScanViewCycle,
    addTabToScanView,
    removeTabFromScanView,
    setActiveTab,
  } = context

  return {
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
    addRowToView,
    updateViewTabData,
    clearViewData,
    updateViewScanStatus,
    updateViewScanCycle,
    addTabToView,
    removeTabFromView,
    setActiveTab,
  }
}
