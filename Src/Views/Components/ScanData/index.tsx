import { useState } from 'preact/hooks'
import { Flex } from '../../../Components/Layouts/Flex'
import { NetworkTabsView } from '../NetworkTabs/NetworkTabsView'
import { NetworkTable } from '../NetworkTable'
import { ScanMetrics } from '../ScanMetrics'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { useEffect } from 'preact/hooks'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { Button } from '../../../Components/Button'
import { Icon } from '../../../Components/Typography'
import { Box } from '../../../Components/Layouts/Box'
import { Divider } from '../../../Components/Typography'

import { cn } from '../../../Utils/Helpers'

export interface IScanDataProps {
  isScanning: boolean

  currentData: any

  networkTabsData: ReoSpace.INetworkData[]

  currentRows: any

  stats: any

  setStats: (prev: any) => void

  activeIndex: number

  setActiveIndex: (prev: number) => void

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
  setActiveIndex,
  activeIndex = 0,
  isScanning = false,
  className = '',
}: IScanDataProps) => {
  const [isStatsOpen, setStatsOpen] = useState<boolean>(false)

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

  const handleToggleStats = () => {
    setStatsOpen((prev) => !prev)
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
      <Flex inline={false} direction='col' gap='none' className='flex-1'>
        <Box className='overflow-x-auto flex border-b border-outline-variant/30'>
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
            className='w-full'
          />
          <Button variant='text' type='button' onClick={handleToggleStats} className='mb-4'>
            <Icon size='xl'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#000000'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <rect x='3' y='3' width='7' height='9' />
                <rect x='14' y='3' width='7' height='5' />
                <rect x='14' y='12' width='7' height='9' />
                <rect x='3' y='16' width='7' height='5' />
              </svg>
            </Icon>
          </Button>
        </Box>

        {/* Основной контент - таблица */}
        <div className='flex items-stretch py-3'>
          <div
            className={cn(
              'transition-all duration-700 ease-in-out',
              isStatsOpen ? 'w-3/4 pr-4' : 'w-full',
            )}
          >
            <NetworkTable
              networkType={networkType}
              isScanning={isScanning}
              data={currentData}
              onClearData={handleClearData}
              onExportData={handleExportData}
              onStartScan={handleStartScan}
              onStopScan={handleStopScan}
              className='min-w-0 h-full'
            />
          </div>

          {/* Боковая панель */}
          <div
            className={cn(
              'flex items-stretch transition-all duration-700 ease-in-out overflow-hidden',
              isStatsOpen ? 'w-1/4 opacity-100' : 'w-0 opacity-0',
            )}
          >
            <Divider color='border-outline-variant/30' vertical={true} className='h-full mr-4' />

            <ScanMetrics metrics={metrics} className='flex-1 h-full' />
          </div>
        </div>
      </Flex>
    </Flex>
  )
}
