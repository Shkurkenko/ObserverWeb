import { useState } from 'preact/hooks'
import { Flex } from '../../../Components/Layouts/Flex'
import { NetworkTabsView } from '../NetworkTabs/NetworkTabsView'
import { NetworkTable } from '../NetworkTable'
import { ScanMetrics } from '../ScanMetrics'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'

export interface IScanDataProps {
  isScanning: boolean

  currentData: any

  networkType: ReoSpace.IScanTypes

  networkTabsData: ReoSpace.INetworkData[]

  className?: string
}

export const ScanData = ({
  networkTabsData,
  currentData,
  networkType,
  isScanning = false,
  className = '',
}: IScanDataProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleClearData = () => {
    console.log('Handle clear data from ScanData called')
  }

  const handleExportData = () => {
    console.log('Handle export data from ScanData called')
  }

  const handleStartScan = () => {
    console.log('handle start scan from ScanData called')
  }

  const handleStopScan = () => {
    console.log('Handle stop scan from ScanData called')
  }

  // Метрики для панели статистики
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
    <Flex className={className}>
      <Flex inline={false} direction='col' className='flex-1'>
        <div className='overflow-x-auto'>
          <NetworkTabsView
            networks={networkTabsData}
            activeIndex={activeIndex}
            onTabClick={(network) => {
              setActiveIndex(network.index)
            }}
            onTabClose={(networkId) => {
              console.log('Closing tab:', networkId)
            }}
            status={isScanning ? ReoSpace.IScanStatusTypes.Running : ReoSpace.IScanStatusTypes.Idle}
            className='mb-4 w-full'
          />
        </div>
        {/* Основной контент - таблица */}
        <div className='flex-1 overflow-auto'>
          <NetworkTable
            networkType={networkType}
            isScanning={isScanning}
            data={currentData}
            onClearData={handleClearData}
            onExportData={handleExportData}
            onStartScan={handleStartScan}
            onStopScan={handleStopScan}
          />
        </div>
      </Flex>
      <ScanMetrics metrics={metrics} className='max-w-[25%]' />
    </Flex>
  )
}
