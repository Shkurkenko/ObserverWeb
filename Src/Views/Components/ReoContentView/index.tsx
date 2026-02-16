import { useState, useMemo } from 'preact/hooks'
import { Container } from '../../../Components/Layouts/Container'
import { ScannerControl } from '../ScannerControl'
import { ScanViewHeader } from '../ScanViewHeader'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { Footer, FooterItem } from '../../../Components/Footer'
import { v4 as uuidv4 } from 'uuid'
import { ScanData } from '../ScanData'
import { Flex } from '../../../Components/Layouts/Flex'
import { Divider } from '../../../Components/Typography'
import { Text } from '../../../Components/Typography'
import { BatteryIndicator } from '../../../Components/BatterIndicator'

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
  const [activeNetworkType, setActiveNetworkType] = useState<ReoSpace.IScanTypes[]>(
    model.tabsModel.map((tab) => tab.data.metaInfo.scanType),
  )
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const [stats, setStats] = useState({
    totalNetworks: 0,
    activeNetworks: 0,
    avgSignal: '-75',
    noiseFloor: '-95',
    scanDuration: 0,
    lastUpdate: new Date(),
  })

  const networkTabs = useMemo(() => {
    return model.tabsModel?.map((tab, index) => {
      const tabData = tab as ReoSpace.IReoTab
      const data = tabData.data
      const metaInfo = data?.metaInfo

      const scanType = metaInfo?.scanType || 'unknown'

      const networkType = Object.values(ReoSpace.IScanTypes).includes(
        scanType as ReoSpace.IScanTypes,
      )
        ? (scanType as ReoSpace.IScanTypes)
        : ReoSpace.IScanTypes.Gsm

      const rows = data?.rows || []

      return {
        id: uuidv4(),
        index,
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
        const scanType = tab.data.metaInfo.scanType
        const rows = tab.data?.rows || []

        return {
          id: tab.id,
          index: tab.index,
          name: tab.label || scanType,
          type: scanType as ReoSpace.IScanTypes,
          icon: ObserverConfig.NetworkTypeIcons[scanType as ReoSpace.IScanTypes] || '📶',
          signalCount: rows.length,
          hasNewData: tab.data?.hasNewData || false,
        }
      }),
    [model.tabsModel],
  )

  const activeTabData = networkTabs[activeIndex]
  const currentRows = activeTabData?.data?.rows || []
  const currentData = activeTabData?.data
  const activeTabScanType = activeTabData?.data?.metaInfo.scanType

  return (
    <Container size='full' padding='lg' className='h-full flex flex-col overflow-hidden'>
      <ScanViewHeader
        title={`${headerString}`}
        description='Анализ радиоэфира в реальном времени'
        isLoading={isLoading}
        isScanning={isScanning}
        className='mb-5'
      />

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

      <Divider color='border-outline-variant/30' className='mb-4' />

      <ScanData
        isScanning={isScanning}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        currentData={currentData}
        networkTabsData={networkTabsData}
        currentRows={currentRows}
        stats={stats}
        setStats={setStats}
      />

      <Footer className='flex-1'>
        <FooterItem label='Активный тип' icon={ObserverConfig.NetworkTypeIcons[activeTabScanType]}>
          {activeNetworkType.map((scanType) => (
            <Flex>{scanType}</Flex>
          ))}
        </FooterItem>

        {/* <FooterItem label='Задача'>{headerString}</FooterItem> */}
        <FooterItem label='Обновлено'>
          <Text>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </FooterItem>
        <FooterItem label='Версия'>
          <Text className='font-mono'>v2.0.0 beta</Text>
        </FooterItem>
        <FooterItem label='Батарея'>
          <BatteryIndicator level={40} isCharging={false} lowPowerMode={true} size='sm' />
        </FooterItem>
      </Footer>
    </Container>
  )
}
