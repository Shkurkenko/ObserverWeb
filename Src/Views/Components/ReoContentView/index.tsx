import { useState, useEffect, useMemo } from 'preact/hooks'
import { Container } from '../../../Components/Layouts/Container'
import { Card } from '../../../Components/Layouts/Card'
import { ScannerControl } from '../ScannerControl'
import { ScanViewHeader } from '../ScanViewHeader'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { Divider } from '../../../Components/Typography'
import { ScanMetrics } from '../ScanMetrics'
import { NetworkTable } from '../NetworkTable'
import { v4 as uuidv4 } from 'uuid'
import { Footer, FooterItem } from '../../../Components/Footer'
import { NetworkTabsView } from '../NetworkTabs'
import { INetworkData } from '../NetworkTabs'

export interface IReoContentViewProps {
  headerString: string

  model: ReoSpace.IReoView

  isScanning: boolean

  onStartScan: () => void

  onStopScan: () => void

  onClearData: () => void

  onExportData: () => void
}

export function ReoContentView({
  headerString,
  model,
  isScanning,
  onStartScan,
  onStopScan,
  onClearData,
  onExportData,
}: IReoContentViewProps) {
  const [activeNetworkType, setActiveNetworkType] = useState<ReoSpace.IScanTypes>(
    model.tabsModel[0].data.metaInfo.scanType || ReoSpace.IScanTypes.Gsm,
  )
  const [isLoading, setIsLoading] = useState(false)

  const [stats, setStats] = useState({
    totalNetworks: 0,
    activeNetworks: 0,
    avgSignal: '-75',
    noiseFloor: '-95',
    scanDuration: 0,
    lastUpdate: new Date(),
  })

  // Преобразуем вкладки модели для табов с проверкой данных
  const networkTabs = useMemo(() => {
    return model.tabsModel?.map((tab) => {
      // Безопасный доступ к данным
      const tabData = tab as any
      const data = tabData.data
      const metaInfo = data?.metaInfo

      // Получаем тип сети или используем ID таба как fallback
      const scanType = metaInfo?.scanType || 'unknown scan type'

      // Проверяем, является ли scanType валидным типом сети
      const networkType = Object.values(ReoSpace.IScanTypes).includes(
        scanType as ReoSpace.IScanTypes,
      )
        ? (scanType as ReoSpace.IScanTypes)
        : ReoSpace.IScanTypes.Gsm

      const rows = data?.rows || []

      return {
        id: uuidv4(),
        label: tab.label || networkType,
        icon: ObserverConfig.NetworkTypeIcons[networkType] || '📶',
        badge: rows.length,
        description: ObserverConfig.NetworkTypeIcons[networkType] || 'Сети связи',
        data: data,
      }
    })
  }, [model.tabsModel])

  const networkTabsData: INetworkData[] = useMemo(
    () =>
      model.tabsModel.map((tab) => {
        const scanType = tab.id
        const rows = tab.data?.rows || []

        return {
          id: tab.id,
          name: tab.label || scanType,
          type: scanType,
          icon: ObserverConfig.NetworkTypeIcons[scanType as ReoSpace.IScanTypes] || '📶',
          signalCount: rows.length,
          hasNewData: tab.data?.hasNewData || false,
        }
      }),
    [model.tabsModel],
  )

  // Находим активную вкладку
  const activeTabData = networkTabs?.find((tab) => tab.id === activeNetworkType) || networkTabs![0]

  // Получаем колонки и данные для активного типа сети
  const currentColumns = ObserverConfig.ReoColumnModelsConfig[activeNetworkType] || []
  const currentRows = activeTabData?.data?.rows || []
  const currentData = activeTabData?.data

  // Обновление статистики
  useEffect(() => {
    if (currentRows.length > 0) {
      // Подсчет активных сетей (сигнал лучше -95 dBm)
      const activeCount = currentRows.filter((row: TableSpace.IRow) => {
        const signalCell = row.columns.find((col: any) => col.type === 'Signal')
        if (!signalCell) return false
        const signalValue = (signalCell.data as any)?.value
        return signalValue && signalValue > -95
      }).length

      // Расчет средней силы сигнала
      const signals = currentRows
        .map((row: TableSpace.IRow) => {
          const signalCell = row.columns.find((col: any) => col.type === 'Signal')
          return signalCell ? (signalCell.data as any)?.value : null
        })
        .filter((val: number | null) => val !== null)

      const avgSignal =
        signals.length > 0
          ? Math.round(signals.reduce((a: number, b: number) => a + b, 0) / signals.length)
          : -95

      setStats((prev) => ({
        ...prev,
        totalNetworks: currentRows.length,
        activeNetworks: activeCount,
        avgSignal: `${avgSignal} dBm`,
        lastUpdate: new Date(),
      }))
    }
  }, [currentRows, activeNetworkType])

  // Форматирование длительности
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  // Метрики для верхней панели
  const metrics = [
    {
      id: 'total',
      title: 'Всего сетей',
      value: stats.totalNetworks,
      icon: '📡',
      description: 'Обнаружено сетей',
      color: 'text-primary',
    },
    {
      id: 'active',
      title: 'Активных',
      value: stats.activeNetworks,
      icon: '⚡',
      description: 'Сетей с хорошим сигналом',
      color: 'text-secondary',
    },
    {
      id: 'signal',
      title: 'Средний сигнал',
      value: stats.avgSignal,
      icon: '📊',
      description: 'Средняя мощность сигнала',
      color: 'text-tertiary',
    },
    {
      id: 'duration',
      title: 'Длительность',
      value: formatDuration(stats.scanDuration),
      icon: '⏱️',
      description: 'Время сканирования',
      color: 'text-primary',
    },
  ]

  return (
    <Container size='full' padding='lg' className='h-full flex flex-col bg-surface'>
      {/* Header с названием */}
      <div className='mb-6'>
        <ScanViewHeader
          title={`Сканирование: ${headerString}`}
          description='Анализ радиоэфира в реальном времени'
          isLoading={isLoading}
          isScanning={isScanning}
        />
      </div>

      {/* Панель управления сканированием */}
      <Card className='mb-6 border border-outline-variant/50 bg-surface-container p-1'>
        <ScannerControl
          isScanning={isScanning}
          isLoading={isLoading}
          session={{
            id: `session-${Date.now()}`,
            startTime: new Date(),
            duration: stats.scanDuration,
            networksFound: stats.totalNetworks,
            frequencyRange: { min: 2400, max: 6000 },
            isActive: isScanning,
            scanMode: 'continuous',
          }}
          onStartScan={onStartScan}
          onStopScan={onStopScan}
          onClearData={onClearData}
          onExportData={onExportData}
        />
      </Card>

      <ScanMetrics metrics={metrics} />

      <Divider />

      {/* Табы типов сетей
      <UnderlineTabs
        tabs={networkTabs}
        activeTabId={activeNetworkType}
        onTabClick={(tab) => setActiveNetworkType(tab.id as ReoSpace.IScanTypes)}
        // className=''
        fullWidth
      /> */}

      <NetworkTabsView
        networks={networkTabsData}
        activeTabId={activeNetworkType}
        onTabClick={(network) => {
          setActiveNetworkType(network.type as ReoSpace.IScanTypes)
        }}
        onTabClose={(networkId) => {
          console.log('Closing tab:', networkId)
        }}
        status={isScanning ? 'scanning' : 'idle'}
        className='mb-4'
      />

      {/* Основной контент - таблица */}
      <div className='flex-1 overflow-auto'>
        <NetworkTable
          networkType={activeNetworkType}
          isScanning={isScanning}
          data={currentData}
          onClearData={onClearData}
          onExportData={onExportData}
          onStartScan={onStartScan}
          onStopScan={onStopScan}
        />
      </div>

      <Footer>
        <FooterItem label='Активный тип' icon={ObserverConfig.NetworkTypeIcons[activeNetworkType]}>
          {activeNetworkType}
        </FooterItem>

        <FooterItem label='Задача'>{headerString}</FooterItem>
        <FooterItem label='Обновлено'>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </FooterItem>
        <FooterItem label='Версия'>
          <span className='font-mono'>v2.0.0 beta</span>
        </FooterItem>
      </Footer>
    </Container>
  )
}
