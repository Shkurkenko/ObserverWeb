import { useState, useMemo } from 'preact/hooks'
import { Container } from '../../../Components/Layouts/Container'
import { ScannerControl } from '../ScannerControl'
import { ScanViewHeader } from '../ScanViewHeader'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { Footer, FooterItem } from '../../../Components/Footer'
import { v4 as uuidv4 } from 'uuid'
import { ScanData } from '../ScanData'

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
  const [activeNetworkId, setActiveNetworkId] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  // Преобразуем вкладки модели для табов с проверкой данных
  const networkTabs = useMemo(() => {
    return model.tabsModel?.map((tab) => {
      const tabData = tab as any
      const data = tabData.data
      const metaInfo = data?.metaInfo

      const scanType = metaInfo?.scanType || 'unknown scan type'

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

  const networkTabsData: ReoSpace.INetworkData[] = useMemo(
    () =>
      model.tabsModel.map((tab) => {
        const scanType = tab.id
        const rows = tab.data?.rows || []

        return {
          id: tab.id,
          index: tab.index,
          name: tab.label || scanType,
          type: scanType,
          icon: ObserverConfig.NetworkTypeIcons[scanType as ReoSpace.IScanTypes] || '📶',
          signalCount: rows.length,
          hasNewData: tab.data?.hasNewData || false,
        }
      }),
    [model.tabsModel],
  )

  const activeTabData = networkTabs?.find((tab) => tab.id === activeNetworkType) || networkTabs![0]
  const currentColumns = ObserverConfig.ReoColumnModelsConfig[activeNetworkType] || []
  const currentRows = activeTabData?.data?.rows || []
  const currentData = activeTabData?.data

  return (
    <Container size='full' padding='lg' className='h-full flex flex-col bg-surface'>
      {/* Header с названием */}
      <ScanViewHeader
        title={`Сканирование: ${headerString}`}
        description='Анализ радиоэфира в реальном времени'
        isLoading={isLoading}
        isScanning={isScanning}
        className='mb-5'
      />

      {/* Панель управления сканированием */}
      <ScannerControl
        isScanning={isScanning}
        isLoading={isLoading}
        session={{
          id: `session-${Date.now()}`,
          startTime: new Date(),
          duration: stats.scanDuration,
          networksFound: stats.totalNetworks,
          isActive: isScanning,
          scanMode: 'fast' as ReoSpace.IScanMode,
        }}
        onStartScan={onStartScan}
        onStopScan={onStopScan}
        onClearData={onClearData}
        onExportData={onExportData}
        className='mb-4 mt-4'
      />

      <ScanData
        isScanning={isScanning}
        currentData={currentData}
        networkTabsData={networkTabsData}
      />

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
