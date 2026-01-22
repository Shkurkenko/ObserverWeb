// Boilerplates/RfScannerFinal.tsx
import { useState, useEffect, useCallback } from 'preact/hooks'
import { UnderlineTabs } from '../../Src/Components/Tabs/TabGroup'
import { Card } from '../../Src/Components/Layouts/Card'
import { Container } from '../../Src/Components/Layouts/Container'
import { Section } from '../../Src/Components/Layouts/Section/Section'
import { Grid } from '../../Src/Components/Layouts/Grid'
import { Stack } from '../../Src/Components/Layouts/Stack'
import { Heading } from '../../Src/Components/Typography/Heading'
import { Text } from '../../Src/Components/Typography/Text'
import { Caption } from '../../Src/Components/Typography/Caption'
import { Icon } from '../../Src/Components/Typography/Icon'
import { Label } from '../../Src/Components/Typography/Label'
import { Badge } from '../../Src/Components/Badge'
import { Button } from '../../Src/Components/Button'
import { Divider } from '../../Src/Components/Typography/Divider'
import { Skeletoned } from '../../Src/Components/Skeletoned'
import { SignalStrength } from '../../Src/Components/SignalStrength'
import { ScanSession } from '../../Src/Views/Components/ScannerControl'
import { ScannerControl } from '../../Src/Views/Components/ScannerControl'
import { ScanViewHeader } from '../../Src/Views/Components/ScanViewHeader'

// ============================================================================
// 1. ТИПЫ И КОНСТАНТЫ
// ============================================================================

type NetworkType = 'GSM' | 'LTE' | '5G' | 'WiFi' | 'Unknown' | 'CDMA' | 'WCDMA'
type SignalStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'none'
type MetricStatus = 'normal' | 'warning' | 'critical'

interface DetectedNetwork {
  id: string
  name: string
  type: NetworkType
  frequency: number // MHz
  channel: number
  signalStrength: number // dBm
  bandwidth: string
  operator?: string
  encryption?: 'WEP' | 'WPA' | 'WPA2' | 'WPA3' | 'None'
  firstSeen: Date
  lastSeen: Date
  isActive: boolean
  snr: number // Signal-to-Noise Ratio
  latitude?: number
  longitude?: number
}

interface ScannerMetric {
  id: string
  title: string
  value: string | number
  trend?: number
  icon: string
  status: MetricStatus
  description?: string
  unit?: string
}

// Константы для генерации реалистичных данных
const OPERATORS = ['МТС', 'Билайн', 'Мегафон', 'Tele2', 'Yota', 'Ростелеком', 'Сбермобайл']
const NETWORK_TYPES: NetworkType[] = ['GSM', 'LTE', '5G', 'WiFi', 'WCDMA', 'CDMA', 'Unknown']
const FREQUENCY_RANGES = {
  GSM: [900, 1800],
  LTE: [800, 1800, 2100, 2600],
  '5G': [3500, 26000],
  WiFi: [2400, 5000, 5800],
  WCDMA: [2100],
  CDMA: [850],
  Unknown: [1000, 2000, 3000],
}
const BANDWIDTHS = {
  GSM: '8 MHz',
  LTE: '20 MHz',
  '5G': '100 MHz',
  WiFi: '40 MHz',
  WCDMA: '5 MHz',
  CDMA: '1.25 MHz',
  Unknown: '10 MHz',
}

// ============================================================================
// 2. УТИЛИТНЫЕ ФУНКЦИИ
// ============================================================================

const generateId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const getSignalStatus = (dbm: number): SignalStatus => {
  if (dbm >= -70) return 'excellent'
  if (dbm >= -85) return 'good'
  if (dbm >= -100) return 'fair'
  if (dbm >= -110) return 'poor'
  return 'none'
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 60) return 'только что'
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} мин назад`
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} ч назад`
  return `${Math.floor(diffSec / 86400)} д назад`
}

// ============================================================================
// 3. СКЕЛЕТОН КОМПОНЕНТЫ
// ============================================================================

const MetricCardSkeleton = () => (
  <Card className='border border-outline-variant/50 bg-surface-container p-6'>
    <div className='flex items-start justify-between'>
      <div className='space-y-3 flex-1'>
        <div className='h-4 from-surface-container-high to-surface-container rounded-lg w-3/4 animate-pulse' />
        <div className='h-10 from-surface-container-high to-surface-container rounded-lg w-1/2 animate-pulse' />
        <div className='h-3 from-surface-container-high to-surface-container rounded-lg w-1/3 animate-pulse' />
      </div>
      <div className='w-12 h-12 from-surface-container-high to-surface-container rounded-xl animate-pulse' />
    </div>
  </Card>
)

const NetworkCardSkeleton = () => (
  <Card className='border border-outline-variant/50 bg-surface-container p-5'>
    <div className='flex items-start justify-between mb-4'>
      <div className='space-y-2 flex-1'>
        <div className='flex gap-2'>
          <div className='h-6 rounded-full w-16 animate-pulse' />
          <div className='h-6 rounded-full w-20 animate-pulse' />
        </div>
        <div className='h-6 rounded-lg w-2/3 animate-pulse' />
        <div className='h-4 rounded-lg w-1/2 animate-pulse' />
      </div>
      <div className='w-16 h-12 rounded-lg animate-pulse' />
    </div>

    <Divider className='my-4' />

    <Grid columns={2} gap='md'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='space-y-2'>
          <div className='h-3 rounded-lg w-2/3 animate-pulse' />
          <div className='h-4 rounded-lg w-full animate-pulse' />
        </div>
      ))}
    </Grid>

    <div className='mt-5 flex justify-between items-center'>
      <div className='h-3 rounded-lg w-1/3 animate-pulse' />
      <div className='h-8 rounded-lg w-20 animate-pulse' />
    </div>
  </Card>
)

// ============================================================================
// 4. ОСНОВНЫЕ КОМПОНЕНТЫ
// ============================================================================

interface MetricCardProps {
  metric: ScannerMetric
  loading?: boolean
}

const MetricCard = ({ metric, loading = false }: MetricCardProps) => {
  const statusConfig = {
    normal: {
      bg: 'bg-primary/10',
      icon: 'text-primary',
      border: '',
      accent: 'none' as const,
    },
    warning: {
      bg: 'bg-warning/10',
      icon: 'text-warning',
      border: 'border-warning/20',
      accent: 'secondary' as const, // или 'tertiary' в зависимости от вашего дизайна
    },
    critical: {
      bg: 'bg-error/10',
      icon: 'text-error',
      border: 'border-error/20',
      accent: 'error' as const,
    },
  }

  const config = statusConfig[metric.status]

  return (
    <Skeletoned isLoading={loading} skeleton={<MetricCardSkeleton />}>
      <Card
        className={`border border-outline-variant/50 bg-surface-container hover:shadow-lg transition-all duration-200 ${config.border}`}
        accent={config.accent}
      >
        <div className='flex items-start justify-between'>
          <div>
            <Label className='text-sm font-medium text-on-surface-variant mb-2'>
              {metric.title}
            </Label>
            <div className='flex items-baseline gap-2'>
              <Text bold className='text-3xl font-bold text-on-surface'>
                {metric.value}
              </Text>
              {metric.unit && <Caption className='text-on-surface-variant'>{metric.unit}</Caption>}
            </div>
            {metric.trend !== undefined && (
              <div className='mt-2 flex items-center gap-1'>
                <Icon size='sm' className={metric.trend > 0 ? 'text-green-500' : 'text-red-500'}>
                  {metric.trend > 0 ? '↗' : '↘'}
                </Icon>
                <Caption className={metric.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                  {Math.abs(metric.trend)}%
                </Caption>
              </div>
            )}
            {metric.description && (
              <Caption className='mt-1 text-on-surface-variant'>{metric.description}</Caption>
            )}
          </div>
          <div className={`rounded-xl p-3 ${config.bg}`}>
            <Icon size='lg' className={config.icon}>
              {metric.icon}
            </Icon>
          </div>
        </div>
      </Card>
    </Skeletoned>
  )
}

interface NetworkCardProps {
  network: DetectedNetwork
  onAnalyze?: (id: string) => void
  loading?: boolean
}

const NetworkCard = ({ network, onAnalyze, loading = false }: NetworkCardProps) => {
  const signalStatus = getSignalStatus(network.signalStrength)

  const statusColors = {
    excellent: 'bg-green-500/10 text-green-600 border-green-500/20',
    good: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    fair: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    poor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    none: 'bg-red-500/10 text-red-600 border-red-500/20',
  }

  const typeConfig = {
    '5G': { variant: 'primary' as const, icon: '5️⃣' },
    LTE: { variant: 'secondary' as const, icon: '4️⃣' },
    GSM: { variant: 'default' as const, icon: '2️⃣' },
    WiFi: { variant: 'tertiary' as const, icon: '📡' },
    WCDMA: { variant: 'default' as const, icon: '3️⃣' },
    CDMA: { variant: 'default' as const, icon: '📶' },
    Unknown: { variant: 'outline' as const, icon: '❓' },
  }

  const config = typeConfig[network.type]
  const statusText = {
    excellent: 'Отлично',
    good: 'Хорошо',
    fair: 'Удовл.',
    poor: 'Слабо',
    none: 'Нет',
  }

  return (
    <Skeletoned isLoading={loading} skeleton={<NetworkCardSkeleton />}>
      <Card
        className='border border-outline-variant/50 bg-surface-container hover:border-primary/30 transition-all duration-200 group'
        accent={
          signalStatus === 'excellent' ? 'primary' : signalStatus === 'good' ? 'secondary' : 'none'
        }
      >
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-2'>
              <Badge variant={config.variant} size='sm' className='font-medium'>
                <div className='flex items-center gap-1.5'>
                  <span className='text-xs'>{config.icon}</span>
                  {network.type}
                </div>
              </Badge>

              {network.isActive ? (
                <Badge variant='success' size='xs' dot className='animate-pulse'>
                  LIVE
                </Badge>
              ) : (
                <Badge variant='outline' size='xs'>
                  Неактивна
                </Badge>
              )}

              {network.encryption && network.encryption !== 'None' && (
                <Badge variant='default' size='xs'>
                  {network.encryption}
                </Badge>
              )}
            </div>

            <Text bold className='text-lg text-on-surface truncate'>
              {network.name || 'Скрытая сеть'}
            </Text>

            {network.operator && (
              <Caption className='text-on-surface-variant mt-1'>{network.operator}</Caption>
            )}
          </div>

          <div className='flex flex-col items-end gap-2'>
            <SignalStrength width={80} height={32} dbm={network.signalStrength} />
            <div className='flex items-center gap-2'>
              <Text className='font-mono font-bold text-on-surface'>
                {network.signalStrength} dBm
              </Text>
              <Badge size='xs' className={statusColors[signalStatus]}>
                {statusText[signalStatus]}
              </Badge>
            </div>
          </div>
        </div>

        <Divider className='my-4' />

        <Grid columns={2} gap='md'>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Частота</Caption>
            <Text className='font-mono text-on-surface font-medium'>{network.frequency} MHz</Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Канал</Caption>
            <Text className='font-mono text-on-surface font-medium'>{network.channel}</Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Ширина</Caption>
            <Text className='font-mono text-on-surface font-medium'>{network.bandwidth}</Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>SNR</Caption>
            <Text className='font-mono text-on-surface font-medium'>{network.snr} dB</Text>
          </div>
        </Grid>

        <div className='mt-5 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Caption className='text-on-surface-variant/70'>
              Обнаружена: {formatTimeAgo(network.firstSeen)}
            </Caption>
            {network.latitude && network.longitude && (
              <Badge size='xs' variant='outline'>
                <Icon size='xs'>📍</Icon>
                Геометка
              </Badge>
            )}
          </div>

          {onAnalyze && (
            <Button
              variant='text'
              size='sm'
              onClick={() => onAnalyze(network.id)}
              className='text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-200'
            >
              <div className='flex items-center gap-1.5'>
                <span>Анализ</span>
                <Icon size='sm'>🔍</Icon>
              </div>
            </Button>
          )}
        </div>
      </Card>
    </Skeletoned>
  )
}

// ============================================================================
// 5. ГЛАВНЫЙ КОМПОНЕНТ
// ============================================================================

export function RfScannerFinal() {
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [networks, setNetworks] = useState<DetectedNetwork[]>([])
  const [activeTab, setActiveTab] = useState('dashboard')

  const [scanSession, setScanSession] = useState<ScanSession>({
    id: generateId('session'),
    startTime: new Date(),
    duration: 0,
    networksFound: 0,
    frequencyRange: { min: 2400, max: 6000 },
    isActive: false,
    scanMode: 'continuous',
  })

  const [metrics, setMetrics] = useState<ScannerMetric[]>([
    {
      id: 'metric-1',
      title: 'Активных сетей',
      value: 0,
      trend: 0,
      icon: '📶',
      status: 'normal',
      description: 'Сетей в эфире прямо сейчас',
    },
    {
      id: 'metric-2',
      title: 'Средний сигнал',
      value: '— dBm',
      trend: 0,
      icon: '📊',
      status: 'normal',
      description: 'Среднее значение по всем сетям',
    },
    {
      id: 'metric-3',
      title: 'Плотность сетей',
      value: '0.0',
      trend: 0,
      icon: '🗺️',
      status: 'normal',
      unit: 'сетей/ГГц',
      description: 'На 1 ГГц диапазона',
    },
    {
      id: 'metric-4',
      title: 'Шумовая полоса',
      value: '-95',
      trend: -2,
      icon: '📡',
      status: 'warning',
      unit: 'dBm',
      description: 'Уровень шума в эфире',
    },
  ])

  // Генерация начальных данных
  const generateInitialNetworks = useCallback(() => {
    const initialNetworks: DetectedNetwork[] = []

    for (let i = 0; i < 12; i++) {
      const type = NETWORK_TYPES[Math.floor(Math.random() * NETWORK_TYPES.length)]
      const frequencies = FREQUENCY_RANGES[type]
      const frequency = frequencies[Math.floor(Math.random() * frequencies.length)]

      initialNetworks.push({
        id: generateId('net'),
        name:
          type === 'WiFi'
            ? `WiFi_${['Home', 'Office', 'Guest', 'Public'][Math.floor(Math.random() * 4)]}_${Math.floor(Math.random() * 1000)}`
            : type === 'Unknown'
              ? ''
              : `${OPERATORS[Math.floor(Math.random() * OPERATORS.length)]}_${type}`,
        type,
        frequency: frequency + Math.floor(Math.random() * 100),
        channel: Math.floor(Math.random() * 200),
        signalStrength: -(40 + Math.random() * 60),
        bandwidth: BANDWIDTHS[type],
        operator:
          type !== 'WiFi' && type !== 'Unknown'
            ? OPERATORS[Math.floor(Math.random() * OPERATORS.length)]
            : undefined,
        encryption:
          type === 'WiFi'
            ? (['WPA2', 'WPA3', 'WPA', 'None'][Math.floor(Math.random() * 4)] as any)
            : undefined,
        firstSeen: new Date(Date.now() - Math.random() * 86400000),
        lastSeen: new Date(),
        isActive: Math.random() > 0.3,
        snr: Math.floor(10 + Math.random() * 30),
        latitude: Math.random() > 0.7 ? 55.7558 + (Math.random() - 0.5) * 0.1 : undefined,
        longitude: Math.random() > 0.7 ? 37.6173 + (Math.random() - 0.5) * 0.1 : undefined,
      })
    }

    return initialNetworks
  }, [])

  // Инициализация
  useEffect(() => {
    const initialNetworks = generateInitialNetworks()
    setNetworks(initialNetworks)
    updateMetrics(initialNetworks)

    setTimeout(() => setIsLoading(false), 1200)
  }, [generateInitialNetworks])

  // Обновление метрик
  const updateMetrics = useCallback((currentNetworks: DetectedNetwork[]) => {
    const activeNetworks = currentNetworks.filter((n) => n.isActive)
    const avgSignal =
      activeNetworks.length > 0
        ? Math.round(
            activeNetworks.reduce((acc, n) => acc + n.signalStrength, 0) / activeNetworks.length,
          )
        : null

    const density = currentNetworks.length / 10

    setMetrics((prev) =>
      prev.map((metric) => {
        switch (metric.id) {
          case 'metric-1':
            return {
              ...metric,
              value: activeNetworks.length,
              trend: 5,
              status:
                activeNetworks.length > 15
                  ? 'warning'
                  : activeNetworks.length > 25
                    ? 'critical'
                    : 'normal',
            }
          case 'metric-2':
            return {
              ...metric,
              value: avgSignal ? `${avgSignal} dBm` : '— dBm',
              trend: avgSignal ? (avgSignal > -70 ? 2 : -3) : 0,
              status: avgSignal && avgSignal < -90 ? 'warning' : 'normal',
            }
          case 'metric-3':
            return {
              ...metric,
              value: density.toFixed(1),
              trend: 8,
              status: density > 3 ? 'warning' : density > 5 ? 'critical' : 'normal',
            }
          default:
            return metric
        }
      }),
    )
  }, [])

  // Таймер сессии
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null

    if (isScanning) {
      interval = setInterval(() => {
        setScanSession((prev) => ({
          ...prev,
          duration: prev.duration + 1,
          isActive: true,
        }))
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isScanning])

  // Симуляция сканирования
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isScanning) {
      interval = setInterval(() => {
        // Обновляем существующие сети
        setNetworks((prev) =>
          prev.map((network) => {
            if (Math.random() < 0.15) {
              const variation = (Math.random() - 0.5) * 8
              const newSignal = Math.max(-120, Math.min(-30, network.signalStrength + variation))

              return {
                ...network,
                signalStrength: Math.round(newSignal * 10) / 10,
                lastSeen: new Date(),
                isActive: Math.random() > 0.1,
                snr: Math.max(0, network.snr + (Math.random() - 0.5) * 3),
              }
            }
            return network
          }),
        )

        // Добавляем новую сеть с шансом 25%
        if (Math.random() < 0.25) {
          const type = NETWORK_TYPES[Math.floor(Math.random() * NETWORK_TYPES.length)]
          const frequencies = FREQUENCY_RANGES[type]
          const frequency = frequencies[Math.floor(Math.random() * frequencies.length)]

          const newNetwork: DetectedNetwork = {
            id: generateId('net'),
            name:
              type === 'WiFi'
                ? `WiFi_${['New', 'Temp', 'Mobile', 'Hotspot'][Math.floor(Math.random() * 4)]}_${Math.floor(Math.random() * 1000)}`
                : type === 'Unknown'
                  ? ''
                  : `${OPERATORS[Math.floor(Math.random() * OPERATORS.length)]}_${type}_New`,
            type,
            frequency: frequency + Math.floor(Math.random() * 100),
            channel: Math.floor(Math.random() * 200),
            signalStrength: -(45 + Math.random() * 50),
            bandwidth: BANDWIDTHS[type],
            operator:
              type !== 'WiFi' && type !== 'Unknown'
                ? OPERATORS[Math.floor(Math.random() * OPERATORS.length)]
                : undefined,
            encryption:
              type === 'WiFi'
                ? (['WPA2', 'WPA3'][Math.floor(Math.random() * 2)] as any)
                : undefined,
            firstSeen: new Date(),
            lastSeen: new Date(),
            isActive: true,
            snr: Math.floor(15 + Math.random() * 25),
          }

          setNetworks((prev) => [newNetwork, ...prev.slice(0, 49)]) // Максимум 50 сетей
          setScanSession((prev) => ({ ...prev, networksFound: prev.networksFound + 1 }))
        }

        // Обновляем метрики
        setNetworks((current) => {
          updateMetrics(current)
          return current
        })
      }, 3000) // Обновление каждые 3 секунды
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isScanning, updateMetrics])

  const handleStartScan = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsScanning(true)
      setScanSession((prev) => ({
        ...prev,
        id: generateId('session'),
        startTime: new Date(),
        duration: 0,
        isActive: true,
        scanMode: 'continuous',
      }))
      setIsLoading(false)
    }, 800)
  }

  const handleStopScan = () => {
    setIsScanning(false)
    setScanSession((prev) => ({ ...prev, isActive: false }))
  }

  const handleClearData = () => {
    setIsLoading(true)

    setTimeout(() => {
      setNetworks([])
      setScanSession((prev) => ({ ...prev, networksFound: 0 }))
      updateMetrics([])
      setIsLoading(false)
    }, 600)
  }

  const handleExportData = () => {
    console.log('Exporting data:', { networks, session: scanSession, metrics })
    // Здесь была бы реальная логика экспорта
  }

  const handleAnalyzeNetwork = (networkId: string) => {
    console.log('Analyzing network:', networkId)
    // Навигация или открытие модального окна
  }

  const scannerTabs = [
    {
      id: 'dashboard',
      label: 'Панель управления',
      icon: '📊',
      badge: networks.filter((n) => n.isActive).length,
      description: 'Обзор радиообстановки',
    },
    {
      id: 'spectrum',
      label: 'Спектр',
      icon: '📡',
      description: 'Анализатор спектра',
    },
    {
      id: 'networks',
      label: 'Сети',
      icon: '📶',
      badge: networks.length,
      description: 'Обнаруженные сети',
    },
    {
      id: 'analysis',
      label: 'Анализ',
      icon: '🔍',
      description: 'Детальный анализ',
    },
    {
      id: 'logs',
      label: 'Логи',
      icon: '📋',
      description: 'История сканирования',
    },
  ]

  const renderDashboard = () => (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <Heading level={3} className='text-on-surface'>
          {isScanning ? 'Сканирование в реальном времени' : 'Мониторинг радиообстановки'}
        </Heading>
        <Caption className='text-on-surface-variant'>
          {isScanning
            ? `Обновлено: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Сетей обнаружено: ${scanSession.networksFound}`
            : 'Запустите сканирование для обнаружения сетей в диапазоне 2400-6000 MHz'}
        </Caption>
      </div>

      <ScannerControl
        isScanning={isScanning}
        isLoading={isLoading}
        session={scanSession}
        onStartScan={handleStartScan}
        onStopScan={handleStopScan}
        onClearData={handleClearData}
        onExportData={handleExportData}
      />

      <Grid columns={2} lg={4} gap='lg'>
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} loading={isLoading} />
        ))}
      </Grid>

      <Divider />

      <div className='space-y-5'>
        <div className='flex justify-between items-center'>
          <div>
            <Heading level={4} className='text-on-surface'>
              Обнаруженные сети
            </Heading>
            <Caption className='text-on-surface-variant'>
              {networks.length} сетей всего • {networks.filter((n) => n.isActive).length} активны
              сейчас
            </Caption>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm' leftIcon={<Icon size='sm'>📊</Icon>}>
              Статистика
            </Button>
            <Button variant='outline' size='sm' leftIcon={<Icon size='sm'>🔧</Icon>}>
              Фильтры
            </Button>
          </div>
        </div>

        {networks.length === 0 ? (
          <Card className='border-2 border-dashed border-outline-variant/50 p-12 text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high'>
              <Icon size='2xl' className='text-on-surface-variant'>
                📡
              </Icon>
            </div>
            <Heading level={4} className='text-on-surface mb-2'>
              Сети не обнаружены
            </Heading>
            <Text className='text-on-surface-variant mb-6'>
              Запустите сканирование для обнаружения беспроводных сетей
            </Text>
            <Button variant='primary' onClick={handleStartScan}>
              <Icon size='sm' className='mr-2'>
                ▶️
              </Icon>
              Запустить сканирование
            </Button>
          </Card>
        ) : (
          <>
            <Grid columns={1} lg={2} xl={3} gap='lg'>
              {networks.slice(0, 6).map((network) => (
                <NetworkCard
                  key={network.id}
                  network={network}
                  onAnalyze={handleAnalyzeNetwork}
                  loading={isLoading}
                />
              ))}
            </Grid>

            {networks.length > 6 && (
              <div className='text-center pt-6'>
                <Button
                  variant='outline'
                  onClick={() => setActiveTab('networks')}
                  className='border-primary/30 text-primary hover:border-primary'
                >
                  Показать все {networks.length} сетей
                  <Icon size='sm' className='ml-2'>
                    →
                  </Icon>
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Activity Log */}
      <Card className='border border-outline-variant/50 bg-surface-container'>
        <div className='p-5 border-b border-outline-variant/50'>
          <div className='flex items-center justify-between'>
            <Text bold className='text-on-surface'>
              Журнал активности
            </Text>
            <Badge size='sm' variant='outline'>
              {isScanning ? 'Живой' : 'История'}
            </Badge>
          </div>
        </div>
        <div className='p-5'>
          <Stack spacing='sm'>
            {[
              { time: '14:30:00', event: 'Сканирование запущено', type: 'start', icon: '▶️' },
              {
                time: '14:31:15',
                event: 'Обнаружена сеть MTS_5G (-62 dBm)',
                type: 'detection',
                icon: '📡',
              },
              {
                time: '14:32:45',
                event: 'Обновлены метрики сканирования',
                type: 'update',
                icon: '📊',
              },
              {
                time: '14:33:30',
                event: 'Сигнал WiFi_Office усилился до -45 dBm',
                type: 'signal',
                icon: '⚡',
              },
              isScanning && {
                time: '14:34:10',
                event: 'Сканирование продолжается...',
                type: 'live',
                icon: '🔄',
              },
            ]
              .filter(Boolean)
              .map((item: any, i) => (
                <div
                  key={i}
                  className='flex items-start gap-3 p-3 hover:bg-surface-container-high rounded-lg transition-colors'
                >
                  <Icon
                    size='sm'
                    className={
                      item.type === 'start'
                        ? 'text-green-500'
                        : item.type === 'detection'
                          ? 'text-primary'
                          : item.type === 'update'
                            ? 'text-secondary'
                            : item.type === 'signal'
                              ? 'text-tertiary'
                              : 'text-primary animate-pulse'
                    }
                  >
                    {item.icon}
                  </Icon>
                  <div className='flex-1 min-w-0'>
                    <Text className='text-sm text-on-surface truncate'>{item.event}</Text>
                    <Caption className='text-on-surface-variant/70 mt-0.5'>{item.time}</Caption>
                  </div>
                  {item.type === 'live' && (
                    <span className='w-2 h-2 bg-primary rounded-full animate-pulse mt-1.5' />
                  )}
                </div>
              ))}
          </Stack>
        </div>
      </Card>
    </div>
  )

  return (
    <Container size='full' padding='lg'>
      {/* Header */}
      <ScanViewHeader
        title='Сканирование #1'
        description='Результаты сканирования'
        isLoading={isLoading}
        isScanning={isScanning}
      />

      <UnderlineTabs
        tabs={scannerTabs}
        activeTabId={activeTab}
        onTabClick={(tab) => setActiveTab(tab.id)}
        fullWidth
      />

      {/* Main Content */}
      <Section>{renderDashboard()}</Section>

      {/* Footer */}
      <div className='mt-12 pt-6 border-t border-outline-variant/30'>
        <Grid columns={2} lg={4} gap='lg'>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Сессия</Caption>
            <Text className='font-mono font-medium text-on-surface'>
              {scanSession.id.slice(0, 12)}...
            </Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Диапазон</Caption>
            <Text className='font-mono font-medium text-on-surface'>
              {scanSession.frequencyRange.min}-{scanSession.frequencyRange.max} MHz
            </Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Обновлено</Caption>
            <Text className='font-medium text-on-surface'>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Версия</Caption>
            <Text className='font-mono font-medium text-on-surface'>v2.4.1</Text>
          </div>
        </Grid>
      </div>
    </Container>
  )
}

export default RfScannerFinal
