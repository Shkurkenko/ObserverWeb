import { useEffect, useState } from 'preact/hooks'
import { useScanView } from '../../../Hooks/UseScanView'
import { useTasks } from '../../../Components/TaskSidebar/Hooks/UseTasks'
import { ReoContentView } from '../../Components/ReoContentView'
import { MockGenHelpers } from '../../../Utils/MockGen'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ScanConfigHelpers } from '../../../../Utils/ScanConfigHelper'
import { ObserverConfig } from '../../../../Config/ObserverConfig'

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
        task.types.forEach((networkType, typeIndex) => {
          const viewId = `${task.id}-${networkType}-${Date.now()}`

          console.log('===================')
          console.log('Network type: ', networkType)
          console.log('===================')

          // Генерация демо-данных для таблицы
          const columnsConfig =
            ObserverConfig.ReoColumnModelsConfig[networkType as ReoSpace.IScanTypes]
          const columnsPattern = columnsConfig.map((col) => col.type)
          const demoRows = MockGenHelpers.generateMockReoTableData(10, columnsPattern)

          addView({
            viewId,
            taskId: task.id,
            show: taskIndex === 0 && typeIndex === 0,
            tabsModel: [
              {
                id: networkType,
                label: networkType as string,
                icon: ScanConfigHelpers.getIconForNetworkType(networkType),
                badge: demoRows.length,
                data: {
                  metaInfo: {
                    scanType: networkType,
                    scanStatus: task.status,
                    currentScanCycle: task.currentScanCycle,
                  },
                  rows: demoRows,
                  hasNewData: false,
                },
              },
            ],
          })

          if (taskIndex === 0 && typeIndex === 0) {
            showView(viewId)
          }
        })
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
      <div className='flex-1 overflow-auto'>
        {activeView ? (
          <ReoContentView
            header={activeView.taskId}
            model={activeView}
            isScanning={isScanning}
            onStartScan={handleStartScan}
            onStopScan={handleStopScan}
            onClearData={handleClearData}
            onExportData={handleExportData}
          />
        ) : (
          <div className='h-full flex flex-col items-center justify-center p-8'>
            <div className='text-center max-w-lg'>
              <div className='text-8xl mb-6 opacity-20'>📡</div>
              <h2 className='text-3xl font-bold text-on-surface mb-4'>Сканер радиоэфира</h2>
              <p className='text-lg text-on-surface-variant mb-8'>
                Выберите задачу сканирования из списка слева или создайте новую для начала работы
              </p>
              <div className='grid grid-cols-2 gap-4 text-sm text-on-surface-variant'>
                <div className='text-center p-4 bg-surface-container rounded-lg'>
                  <div className='text-2xl mb-2'>📶</div>
                  <div>GSM/LTE/5G сети</div>
                </div>
                <div className='text-center p-4 bg-surface-container rounded-lg'>
                  <div className='text-2xl mb-2'>📡</div>
                  <div>Wi-Fi сети</div>
                </div>
                <div className='text-center p-4 bg-surface-container rounded-lg'>
                  <div className='text-2xl mb-2'>🔵</div>
                  <div>Bluetooth</div>
                </div>
                <div className='text-center p-4 bg-surface-container rounded-lg'>
                  <div className='text-2xl mb-2'>📊</div>
                  <div>Анализ в реальном времени</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
