import { useState } from 'preact/hooks'
import { Flex } from '../../../Components/Layouts/Flex'
import { Grid } from '../../../Components/Layouts/Grid'
import { Box } from '../../../Components/Layouts/Box'
import { NetworkTabsView } from '../NetworkTabs/NetworkTabsView'
import { NetworkTable } from '../NetworkTable'
import { ScanMetrics } from '../ScanMetrics'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { useEffect } from 'preact/hooks'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { Button } from '../../../Components/Button'
import { Icon } from '../../../Components/Typography'
import { Divider } from '../../../Components/Typography'
import { formatDuration } from '../../../../Utils/Helpers'

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

  useEffect(() => {
    if (currentRows.length > 0) {
      const activeCount = currentRows.filter((row: TableSpace.IRow) => {
        const signalCell = row.columns.find((col: any) => col.type === 'Signal')
        if (!signalCell) return false
        const signalValue = (signalCell.data as any)?.value
        return signalValue && signalValue > -95
      }).length

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
    <Flex direction='col' inline={false} className={cn('h-full min-h-0', className)}>
      {/* Верхняя панель с табами и кнопкой статистики */}
      <Flex
        as='header'
        align='center'
        justify='between'
        className='border-b border-outline-variant/30 pr-2 shrink-0'
      >
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
          className='flex-1 min-w-0'
        />
        <Button
          variant='text'
          type='button'
          onClick={handleToggleStats}
          className={cn(
            'ml-2 transition-colors duration-200 shrink-0 -mt-5',
            isStatsOpen && 'bg-primary/10 text-primary',
          )}
        >
          <Icon size='xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='3' y='3' width='7' height='9' />
              <rect x='14' y='3' width='7' height='5' />
              <rect x='14' y='12' width='7' height='9' />
              <rect x='3' y='16' width='7' height='5' />
            </svg>
          </Icon>
        </Button>
      </Flex>

      <Box className='flex-1 min-h-0 py-3 overflow-hidden'>
        <Grid
          className='h-full min-h-0 transition-[grid-template-columns] duration-500 ease-in-out will-change-[grid-template-columns]'
          style={{
            gridTemplateColumns: isStatsOpen ? '3fr 1fr' : '1fr 0fr',
          }}
        >
          {/* Таблица */}
          <Box className='min-w-0 min-h-0 overflow-hidden'>
            <Box
              className={cn(
                'h-full transition-[padding] duration-500',
                isStatsOpen ? 'pr-4' : 'pr-0',
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
                className='w-full h-full'
              />
            </Box>
          </Box>

          {/* Статистика */}
          <Box className='min-w-0 min-h-0 overflow-hidden'>
            <Box
              className={cn(
                'relative h-full transition-opacity duration-500',
                isStatsOpen ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Divider
                color='border-outline-variant/30'
                vertical={true}
                className='absolute left-0 h-full'
              />
              <Box className='h-full pl-6'>
                <ScanMetrics
                  scanId={networkTabsData[activeIndex].id}
                  metrics={metrics}
                  className='h-full'
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Flex>
  )
}
