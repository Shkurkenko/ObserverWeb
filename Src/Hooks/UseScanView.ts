import { useContext } from 'preact/hooks'
import { ScanViewContext } from '../Context/ReoScanViewContext'

export const useScanView = () => {
  const context = useContext(ScanViewContext)
  if (!context) {
    throw new Error('useScanView must be used within a ScanViewContext provider')
  }
  const { scanViews, setScanViews, addView, deleteView, toggleView, showView, hideView } = context

  return { scanViews, setScanViews, addView, deleteView, toggleView, showView, hideView }
}
