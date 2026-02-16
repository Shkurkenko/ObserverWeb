import { useEffect, useState } from 'preact/hooks'
import { Card } from '../../../Components/Layouts/Card'
import { Flex } from '../../../Components/Layouts/Flex'
import { Box } from '../../../Components/Layouts/Box'
import { Caption } from '../../../Components/Typography'
import { Text } from '../../../Components/Typography'
import { Stack } from '../../../Components/Layouts/Stack'
import { PillsTabs } from '../../../Components/Tabs/TabGroup'
import { cn } from '../../../Utils/Helpers'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js'
import { Line, Pie } from 'react-chartjs-2'
import { useThemeColors } from '../../../Hooks/UseThemeColors'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
)

export interface IScanMetrics {
  id: string
  title: string
  value: string | number
  icon: string
  description: string
  color: string
}

export interface IScanMetricsProps {
  scanId: string
  metrics: IScanMetrics[]
  className?: string
}

// 👇 МОКОВЫЕ ДАННЫЕ
const MOCK_SIGNAL_HISTORY = [
  { timestamp: '12:00', signal: -67, frequency: '2.4GHz' },
  { timestamp: '12:02', signal: -65, frequency: '2.4GHz' },
  { timestamp: '12:04', signal: -71, frequency: '5GHz' },
  { timestamp: '12:06', signal: -69, frequency: '2.4GHz' },
  { timestamp: '12:08', signal: -63, frequency: '5GHz' },
  { timestamp: '12:10', signal: -72, frequency: '2.4GHz' },
  { timestamp: '12:12', signal: -68, frequency: '5GHz' },
  { timestamp: '12:14', signal: -66, frequency: '2.4GHz' },
  { timestamp: '12:16', signal: -70, frequency: '5GHz' },
  { timestamp: '12:18', signal: -64, frequency: '2.4GHz' },
]

const MOCK_OPERATOR_STATS = [
  {
    operator: 'MTS',
    count: 12,
    percentage: 40,
    colorClass: 'bg-[#E30613]/10',
    textColorClass: 'text-[#E30613]',
    hex: '#E30613',
  },
  {
    operator: 'Beeline',
    count: 8,
    percentage: 27,
    colorClass: 'bg-[#FFCC00]/10',
    textColorClass: 'text-[#FFCC00]',
    hex: '#FFCC00',
  },
  {
    operator: 'MegaFon',
    count: 6,
    percentage: 20,
    colorClass: 'bg-[#1FA93A]/10',
    textColorClass: 'text-[#1FA93A]',
    hex: '#1FA93A',
  },
  {
    operator: 'Tele2',
    count: 4,
    percentage: 13,
    colorClass: 'bg-[#1A9BCC]/10',
    textColorClass: 'text-[#1A9BCC]',
    hex: '#1A9BCC',
  },
]

const scanMetricsTabs = [
  {
    id: 'stats',
    label: 'Статистика',
    icon: '📋',
    description: 'Статистика РЭО',
  },
  {
    id: 'charts',
    label: 'Графики',
    icon: '📊',
    description: 'Графики РЭО',
  },
]

export const ScanMetrics = ({ scanId, metrics, className = '' }: IScanMetricsProps) => {
  const [activeTabId, setActiveTabId] = useState<string>('stats')

  const colors = useThemeColors()

  // 👇 Данные для графика сигнала
  const signalChartData = {
    labels: MOCK_SIGNAL_HISTORY.map((d) => d.timestamp),
    datasets: [
      {
        label: '2.4 GHz',
        data: MOCK_SIGNAL_HISTORY.map((d, i) => (d.frequency === '2.4GHz' ? d.signal : null)),
        borderColor: colors.primary,
        backgroundColor: colors.secondaryContainer,
        tension: 0.3,
        fill: '-1',
        above: colors.primary,
        below: colors.primary,
        pointRadius: 2,
        pointHoverRadius: 4,
        pointBackgroundColor: colors.primary,
        pointBorderColor: colors.surface,
        pointBorderWidth: 1,
        borderWidth: 1.5,
        spanGaps: true,
      },
      {
        label: '5 GHz',
        data: MOCK_SIGNAL_HISTORY.map((d, i) => (d.frequency === '5GHz' ? d.signal : null)),
        borderColor: colors.secondary,
        backgroundColor: colors.secondaryContainer,
        tension: 0.3,
        fill: '-1',
        above: colors.primary,
        below: colors.primary,
        pointRadius: 2,
        pointHoverRadius: 4,
        pointBackgroundColor: colors.secondary,
        pointBorderColor: colors.surface,
        pointBorderWidth: 1,
        borderWidth: 1.5,
        spanGaps: true,
      },
    ],
  }

  // 👇 Данные для круговой диаграммы
  const pieChartData = {
    labels: MOCK_OPERATOR_STATS.map((d) => d.operator),
    datasets: [
      {
        data: MOCK_OPERATOR_STATS.map((d) => d.count),
        backgroundColor: MOCK_OPERATOR_STATS.map((d) => d.hex),
        borderColor: colors.surface,
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  }

  // 👇 Опции для графика сигнала
  const signalChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,
          color: colors.onSurfaceVariant,
          font: {
            size: 12,
            weight: '400' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: colors.surfaceContainer,
        titleColor: colors.onSurfaceVariant,
        bodyColor: colors.onSurfaceVariant,
        borderColor: colors.outlineVariant,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: -75,
        max: -55,
        grid: {
          color: colors.outlineVariant,
          lineWidth: 1,
          drawBorder: false,
        },
        title: {
          display: false,
        },
        ticks: {
          stepSize: 5,
          color: colors.onSurfaceVariant,
          font: {
            size: 11,
            weight: '400',
          },
          padding: 8,
          callback: function (value: any) {
            return value + ' dBm'
          },
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.onSurfaceVariant,
          font: {
            size: 11,
          },
          maxRotation: 0,
          maxTicksLimit: 6,
          padding: 8,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1.5,
      },
      point: {
        radius: 2,
        hoverRadius: 4,
        borderWidth: 1,
      },
    },
  }

  // 👇 Опции для круговой диаграммы
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        align: 'center' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,
          color: colors.onSurfaceVariant,
          font: {
            size: 12,
            weight: '400' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: colors.surface,
        titleColor: colors.onSurfaceVariant,
        bodyColor: colors.onSurfaceVariant,
        borderColor: colors.outlineVariant,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const label = context.label || ''
            const value = context.raw || 0
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value} (${percentage}%)`
          },
        },
      },
    },
  }

  const handleTabClick = (tab: any) => {
    setActiveTabId(tab.id)
  }

  useEffect(() => {
    console.log(colors)
  }, [])

  return (
    <Stack className={cn(className, 'h-full flex flex-col')}>
      <Box className='shrink-0 px-1'>
        <PillsTabs
          tabs={scanMetricsTabs}
          activeTabId={activeTabId}
          onTabClick={handleTabClick}
          size='md'
        />
      </Box>

      <Box className='flex-1 min-h-0 overflow-y-auto px-1'>
        {activeTabId === 'stats' ? (
          <Flex direction='col' gap='md' className='py-4 w-full pr-4'>
            {metrics.map((metric) => (
              <Card
                key={`${scanId}-${metric.id}`}
                className='border border-outline-variant/40 bg-surface-container hover:shadow-md transition-all duration-200'
              >
                <Box className='p-5'>
                  <Flex direction='row' justify='between' align='start' className='w-full'>
                    <Box className='flex-1 min-w-0 pr-4'>
                      <Caption className='text-on-surface-variant/80 text-xs uppercase tracking-wider mb-2'>
                        {metric.title}
                      </Caption>
                      <Text className={`text-3xl font-bold ${metric.color} leading-none mb-2`}>
                        {metric.value}
                      </Text>
                      <Caption className='text-on-surface-variant/60 text-sm'>
                        {metric.description}
                      </Caption>
                    </Box>
                    <Box
                      className={cn(
                        'p-3 rounded-xl shrink-0',
                        metric.color.replace('text', 'bg') + '/10',
                      )}
                    >
                      <span className='text-2xl'>{metric.icon}</span>
                    </Box>
                  </Flex>
                </Box>
              </Card>
            ))}
          </Flex>
        ) : (
          <Flex direction='col' gap='lg' className='w-full pr-4'>
            <Card
              key={`${scanId}-signal-chart`}
              className='border border-outline-variant/40 bg-surface-container hover:shadow-md transition-all duration-200 overflow-hidden'
            >
              <Box className='p-5'>
                <Flex direction='col' gap='md' className='w-full'>
                  <Flex direction='row' justify='between' align='center' className='w-full'>
                    <Flex align='center' gap='sm'>
                      <Box className='bg-primary/10 p-2 rounded-lg'>
                        <span className='text-xl'>📶</span>
                      </Box>
                      <Box>
                        <Text className='text-base font-medium text-on-surface'>
                          Уровень сигнала
                        </Text>
                        <Caption className='text-on-surface-variant/70 text-xs'>
                          Динамика за последние 20 минут
                        </Caption>
                      </Box>
                    </Flex>
                    <Box className='bg-surface-dim/30 px-3 py-1.5 rounded-full'>
                      <Caption className='text-on-surface-variant/80 text-xs font-medium'>
                        {MOCK_SIGNAL_HISTORY[MOCK_SIGNAL_HISTORY.length - 1]?.signal || 0} dBm
                      </Caption>
                    </Box>
                  </Flex>

                  <Box className='w-full' style={{ height: '320px' }}>
                    <Line data={signalChartData} options={signalChartOptions} />
                  </Box>

                  {/* Частоты */}
                  <Flex gap='md' className='mt-1'>
                    <Flex align='center' gap='xs'>
                      <Box className='w-2 h-2 rounded-full bg-primary' />
                      <Caption className='text-on-surface-variant/70 text-xs'>2.4 GHz</Caption>
                    </Flex>
                    <Flex align='center' gap='xs'>
                      <Box className='w-2 h-2 rounded-full bg-secondary' />
                      <Caption className='text-on-surface-variant/70 text-xs'>5 GHz</Caption>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </Card>

            {/* Круговая диаграмма операторов */}
            <Card
              key={`${scanId}-operator-chart`}
              className='border border-outline-variant/40 bg-surface-container hover:shadow-md transition-all duration-200 overflow-hidden'
            >
              <Box className='p-5'>
                <Flex direction='col' gap='md' className='w-full'>
                  <Flex direction='row' justify='between' align='center'>
                    <Flex align='center' gap='sm'>
                      <Box className='bg-secondary/10 p-2 rounded-lg'>
                        <span className='text-xl'>📊</span>
                      </Box>
                      <Box>
                        <Text className='text-base font-medium text-on-surface'>
                          Распределение по операторам
                        </Text>
                        <Caption className='text-on-surface-variant/70 text-xs'>
                          {MOCK_OPERATOR_STATS.reduce((acc, op) => acc + op.count, 0)} сетей
                        </Caption>
                      </Box>
                    </Flex>
                  </Flex>

                  <Flex direction='row' gap='lg' className='w-full'>
                    {/* Диаграмма - 40% */}
                    <Box className='w-2/5' style={{ height: '200px' }}>
                      <Pie data={pieChartData} options={pieChartOptions} />
                    </Box>

                    {/* Легенда - 60% */}
                    <Flex direction='col' justify='center' className='flex-1'>
                      <Flex direction='col' gap='md' className='w-full'>
                        {MOCK_OPERATOR_STATS.map((op) => (
                          <Flex
                            key={op.operator}
                            align='center'
                            justify='between'
                            className='w-full'
                          >
                            <Flex align='center' gap='sm'>
                              <div className={cn('w-3 h-3 rounded-full', op.colorClass)} />
                              <Text className='text-sm font-medium text-on-surface'>
                                {op.operator}
                              </Text>
                            </Flex>
                            <Flex align='center' gap='md'>
                              <Text className='text-sm font-semibold text-on-surface'>
                                {op.count}
                              </Text>
                              <Caption className='text-on-surface-variant/70 text-sm min-w-12 text-right'>
                                {op.percentage}%
                              </Caption>
                            </Flex>
                          </Flex>
                        ))}
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </Card>
          </Flex>
        )}
      </Box>
    </Stack>
  )
}
