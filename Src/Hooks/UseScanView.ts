import { useContext } from 'preact/hooks'
import { ScanViewContext } from '../Context/ReoScanViewContext'

export const useScanView = () => {
  const context = useContext(ScanViewContext)

  if (!context) {
    throw new Error('useScanView must be used within a ScanViewProvider')
  }

  const {
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
  } = context

  return {
    scanViews,
    activeScanViewId,
    setScanViews,
    addScanView: addReoScanView,
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
  }
}
