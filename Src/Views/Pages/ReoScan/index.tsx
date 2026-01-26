import { useEffect, useState } from 'preact/hooks'
import { useScanView } from '../../../Hooks/UseScanView'
import { useTasks } from '../../../Components/TaskSidebar/Hooks/UseTasks'
import { ReoContentView } from '../../Components/ReoContentView'
import { MockGenHelpers } from '../../../Utils/MockGen'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ScanConfigHelpers } from '../../../../Utils/ScanConfigHelper'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { v4 as uuidv4 } from 'uuid'
import { EmptyReoView } from '../../Components/EmptyReoView'

export function ReoScan() {
  const { scanViews, activeViewId, addView, showView, updateViewData, getViewById } = useScanView()
  const { tasks } = useTasks()
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sessionData, setSessionData] = useState({
    id: `session-${Date.now()}`,
    startTime: new Date(),
    duration: 0,
    networksFound: 0,
    frequencyRange: { min: 2400, max: 6000 },
    isActive: false,
    scanMode: 'continuous' as const,
  })

  // Инициализация начальных данных
  useEffect(() => {
    if (scanViews.length === 0 && tasks.length > 0) {
      tasks.forEach((task, taskIndex) => {
        const currentHeaderString = `Сканирование ${taskIndex}`
        const viewId = uuidv4()

        const tabsModel = task.types.map((scanType) => {
          const columnsConfig =
            ObserverConfig.ReoColumnModelsConfig[scanType as ReoSpace.IScanTypes]

          const columnsPattern = columnsConfig.map((col) => col.type)

          const demoRows = MockGenHelpers.generateMockReoTableData(100, columnsPattern)

          return {
            id: uuidv4(),
            label: scanType as string,
            icon: ScanConfigHelpers.getIconForNetworkType(scanType),
            badge: demoRows.length,
            data: {
              metaInfo: {
                scanType: scanType,
                scanStatus: task.status,
                currentScanCycle: task.currentScanCycle,
              },
              rows: demoRows,
              hasNewData: false,
            },
          }
        })

        addView({
          viewId,
          headerString: currentHeaderString,
          taskId: task.id,
          isScanning: false,
          show: taskIndex === 0 && taskIndex === 0,
          tabsModel: tabsModel,
        })

        if (taskIndex === 0 && taskIndex === 0) {
          showView(viewId)
        }
      })
    }
  }, [tasks])

  // Таймер сессии
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isScanning) {
      interval = setInterval(() => {
        setSessionData((prev) => ({
          ...prev,
          duration: prev.duration + 1,
          isActive: true,
        }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isScanning])

  const activeView = getViewById(activeViewId || '')

  const handleStartScan = () => {
    setIsLoading(true)
    setIsScanning(true)

    setSessionData({
      id: `session-${Date.now()}`,
      startTime: new Date(),
      duration: 0,
      networksFound: 0,
      frequencyRange: { min: 2400, max: 6000 },
      isActive: true,
      scanMode: 'continuous',
    })

    // Обновляем статус вьюшки
    if (activeViewId && activeView) {
      updateViewData(activeViewId, {
        ...activeView,
        tabsModel: activeView.tabsModel.map((tab) => ({
          ...tab,
          data: tab.data
            ? {
                ...tab.data,
                metaInfo: {
                  ...tab.data.metaInfo,
                  scanStatus: ReoSpace.IScanStatusTypes.Running,
                },
              }
            : tab.data,
        })),
      })
    }

    // Симуляция загрузки
    setTimeout(() => setIsLoading(false), 800)
  }

  const handleStopScan = () => {
    setIsScanning(false)
    setSessionData((prev) => ({ ...prev, isActive: false }))

    if (activeViewId && activeView) {
      updateViewData(activeViewId, {
        ...activeView,
        tabsModel: activeView.tabsModel.map((tab) => ({
          ...tab,
          data: tab.data
            ? {
                ...tab.data,
                metaInfo: {
                  ...tab.data.metaInfo,
                  scanStatus: ReoSpace.IScanStatusTypes.Finished,
                },
              }
            : tab.data,
        })),
      })
    }
  }

  const handleClearData = () => {
    setIsLoading(true)

    if (activeViewId && activeView) {
      updateViewData(activeViewId, {
        ...activeView,
        tabsModel: activeView.tabsModel.map((tab) => ({
          ...tab,
          badge: 0,
          data: tab.data
            ? {
                ...tab.data,
                rows: [],
                hasNewData: false,
              }
            : tab.data,
        })),
      })
    }

    setSessionData((prev) => ({ ...prev, networksFound: 0 }))

    setTimeout(() => setIsLoading(false), 600)
  }

  const handleExportData = () => {
    console.log('Exporting data:', {
      view: activeView,
      session: sessionData,
      timestamp: new Date().toISOString(),
    })
    // Здесь будет реальная логика экспорта
  }

  return (
    <div className='h-full w-full flex bg-surface'>
      {/* Основной контент */}
      <div className='flex-1'>
        {activeView ? (
          <ReoContentView
            headerString={activeView.headerString}
            model={activeView}
            isScanning={isScanning}
            onStartScan={handleStartScan}
            onStopScan={handleStopScan}
            onClearData={handleClearData}
            onExportData={handleExportData}
          />
        ) : (
          <EmptyReoView />
        )}
      </div>
    </div>
  )
}
