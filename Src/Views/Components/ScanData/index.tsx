import { useState } from 'preact/hooks'
import { Flex } from '../../../Components/Layouts/Flex'
import { NetworkTabsView } from '../NetworkTabs/NetworkTabsView'
import { NetworkTable } from '../NetworkTable'
import { ScanMetrics } from '../ScanMetrics'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { useEffect } from 'preact/hooks'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'

export interface IScanDataProps {
  isScanning: boolean

  currentData: any

  networkTabsData: ReoSpace.INetworkData[]

  currentRows: any

  stats: any

  setStats: (prev: any) => void

  className?: string
}

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

export const ScanData = ({
  networkTabsData,
  currentData,
  currentRows,
  stats,
  setStats,
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

      setStats((prev: any) => ({
        ...prev,
        totalNetworks: currentRows.length,
        activeNetworks: activeCount,
        avgSignal: `${avgSignal} dBm`,
        lastUpdate: new Date(),
      }))
    }
  }, [currentRows])

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

  const networkType = networkTabsData[activeIndex].type as ReoSpace.IScanTypes

  return (
    <Flex className={className}>
      <Flex inline={false} direction='col' className='flex-1'>
        <div className='overflow-x-auto flex'>
          <NetworkTabsView
            networks={networkTabsData}
            activeIndex={activeIndex}
            onTabClick={(network) => {
              setActiveIndex(network.index)
              console.log(currentData)
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
