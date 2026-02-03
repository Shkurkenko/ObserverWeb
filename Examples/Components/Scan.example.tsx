// src/pages/RadioScanner.tsx
import { useState, useEffect, useCallback, useRef } from 'preact/hooks'
import { UnderlineTabs } from '../../Src/Components/Tabs/TabGroup'
import { Card } from '../../Src/Components/Layouts/Card'
import { Container } from '../../Src/Components/Layouts/Container'
import { Section } from '../../Src/Components/Layouts/Section/Section'
import { Grid } from '../../Src/Components/Layouts/Grid'
import { Heading } from '../../Src/Components/Typography/Heading'
import { Text } from '../../Src/Components/Typography/Text'
import { Caption } from '../../Src/Components/Typography/Caption'
import { Icon } from '../../Src/Components/Typography/Icon'
import { Label } from '../../Src/Components/Typography/Label'
import { Badge } from '../../Src/Components/Badge'
import { Button } from '../../Src/Components/Button'
import { Divider } from '../../Src/Components/Typography/Divider'
import { SignalStrength } from '../../Src/Components/SignalStrength'
import { TextInput } from '../../Src/Components/Form/TextInput'

// Интерфейсы для данных
interface NetworkSignal {
  id: string
  type: 'GSM' | 'LTE' | 'UMTS' | 'WIFI' | 'BLUETOOTH' | '5G' | 'UNKNOWN'
  name: string
  frequency: number
  channel: number
  signalStrength: number // dBm
  snr: number
  bandwidth?: string
  mcc?: number
  mnc?: number
  cellId?: string
  lac?: number
  pci?: number
  bssid?: string
  ssid?: string
  security?: string
  timestamp: number
  operator?: string
  isActive: boolean
}

interface ScannerMetrics {
  totalNetworks: number
  activeNetworks: number
  avgSignal: number
  strongestSignal: number
  weakestSignal: number
  networksByType: Record<string, number>
}

interface ServerResponse {
  status?: 'success' | 'error'
  command?: string
  activeTypes?: string[]
  error?: string
  type?: string
  data?: any
  timestamp?: number
  message?: string
}

export function RadioScanner() {
  // Состояние
  const [isConnected, setIsConnected] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [networks, setNetworks] = useState<NetworkSignal[]>([])
  const [metrics, setMetrics] = useState<ScannerMetrics>({
    totalNetworks: 0,
    activeNetworks: 0,
    avgSignal: -100,
    strongestSignal: -50,
    weakestSignal: -120,
    networksByType: {},
  })

  // WebSocket рефы
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimerRef = useRef<ReturnType<typeof setInterval> | null>()

  // Настройки подключения
  const [connectionSettings, setConnectionSettings] = useState({
    host: 'localhost',
    port: '8889',
    autoConnect: true,
  })

  // Таймеры
  const [scanStartTime, setScanStartTime] = useState<Date | null>(null)
  const [scanDuration, setScanDuration] = useState(0)

  // ============================================================================
  // УТИЛИТНЫЕ ФУНКЦИИ
  // ============================================================================

  const generateId = () => `net_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const getSignalQuality = (dbm: number): 'excellent' | 'good' | 'fair' | 'poor' | 'none' => {
    if (dbm >= -70) return 'excellent'
    if (dbm >= -85) return 'good'
    if (dbm >= -100) return 'fair'
    if (dbm >= -110) return 'poor'
    return 'none'
  }

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now()
    const diff = now - timestamp

    if (diff < 60000) return 'только что'
    if (diff < 3600000) return `${Math.floor(diff / 60000)} мин назад`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} ч назад`
    return `${Math.floor(diff / 86400000)} д назад`
  }

  const formatSignalType = (type: string): string => {
    const types: Record<string, string> = {
      GSM: 'GSM',
      LTE: 'LTE',
      UMTS: '3G/UMTS',
      WIFI: 'Wi-Fi',
      BLUETOOTH: 'Bluetooth',
      UNKNOWN: 'Неизвестно',
    }
    return types[type] || type
  }

  const getSignalColor = (dbm: number): string => {
    const quality = getSignalQuality(dbm)
    const colors = {
      excellent: 'text-green-500',
      good: 'text-primary',
      fair: 'text-yellow-500',
      poor: 'text-orange-500',
      none: 'text-error',
    }
    return colors[quality]
  }

  const getOperatorName = (mcc?: number, mnc?: number): string => {
    if (!mcc || !mnc) return 'Неизвестно'

    if (mcc === 250) {
      const operators: Record<number, string> = {
        1: 'МТС',
        2: 'МегаФон',
        20: 'Tele2',
        11: 'Yota',
        99: 'Билайн',
      }
      return operators[mnc] || `Оператор ${mnc}`
    }

    return `MCC: ${mcc}, MNC: ${mnc}`
  }

  const parseServerMessage = (data: any): NetworkSignal | null => {
    if (!data.type || !data.data) return null

    return {
      id: generateId(),
      type: data.type.includes('GSM')
        ? 'GSM'
        : data.type.includes('LTE')
          ? 'LTE'
          : data.type.includes('UMTS')
            ? 'UMTS'
            : data.type.includes('WIFI')
              ? 'WIFI'
              : data.type.includes('BLUETOOTH')
                ? 'BLUETOOTH'
                : 'UNKNOWN',
      name: data.type,
      frequency: data.data.arfcn || data.data.earfcn || data.data.frequency || 0,
      channel: data.data.channel || 0,
      signalStrength: data.data.rxLev || data.data.rsrp || data.data.rssi || -100,
      snr: data.data.sinr || data.data.ecno || 20,
      bandwidth: data.data.bandwidth ? `${data.data.bandwidth} MHz` : undefined,
      mcc: data.data.MCC,
      mnc: data.data.MNC,
      cellId: data.data.cellIdentity || data.data.cellId,
      lac: data.data.lac || data.data.locationAreaCode,
      pci: data.data.pci,
      bssid: data.data.bssid || data.data.address,
      ssid: data.data.ssid || data.data.name,
      security: data.data.security || data.data.encryption,
      timestamp: data.timestamp || Date.now(),
      operator: getOperatorName(data.data.MCC, data.data.MNC),
      isActive: true,
    }
  }

  // ============================================================================
  // WEB SOCKET УПРАВЛЕНИЕ
  // ============================================================================

  const connectToServer = useCallback(() => {
    // Закрываем существующее соединение
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close()
    }

    setIsLoading(true)
    setError(null)

    try {
      const url = `ws://${connectionSettings.host}:${connectionSettings.port}`
      console.log(`🔗 Подключаюсь к: ${url}`)

      const socket = new WebSocket(url)
      wsRef.current = socket

      socket.onopen = () => {
        console.log('✅ WebSocket подключен')
        setIsConnected(true)
        setIsLoading(false)
        setError(null)

        // Отправляем приветственное сообщение
        socket.send(JSON.stringify({ command: 'status' }))
      }

      socket.onmessage = (event) => {
        try {
          const rawData = event.data.toString().trim()

          // Разделяем по переносу строки, так как сервер может отправлять несколько JSON
          const lines = rawData.split('\n').filter((line: string) => line.trim())

          lines.forEach((line: string) => {
            try {
              const data: ServerResponse = JSON.parse(line)

              // Обработка ответов на команды
              if (data.status) {
                console.log('📨 Ответ сервера:', data)

                if (data.command === 'start' && data.status === 'success') {
                  console.log('✅ Сканирование запущено:', data.activeTypes)
                } else if (data.command === 'stop' && data.status === 'success') {
                  console.log('✅ Сканирование остановлено')
                  setIsScanning(false)
                }
              }
              // Обработка данных сканирования
              else if (data.type) {
                const network = parseServerMessage(data)
                if (network) {
                  setNetworks((prev) => {
                    const updated = [network, ...prev.slice(0, 49)] // Храним последние 50
                    updateMetrics(updated)
                    return updated
                  })
                }
              }
              // Приветственное сообщение
              else if (data.message) {
                console.log('📨 Сообщение сервера:', data.message)
              }
            } catch (jsonError) {
              console.error('❌ Ошибка парсинга JSON:', jsonError, 'Строка:', line)
            }
          })
        } catch (err) {
          console.error('❌ Ошибка обработки сообщения:', err, 'Raw:', event.data)
        }
      }

      socket.onerror = (event) => {
        console.error('❌ WebSocket ошибка:', event)
        setError('Ошибка подключения к серверу')
        setIsLoading(false)
        setIsConnected(false)
      }

      socket.onclose = (event) => {
        console.log(`❌ WebSocket отключен: код ${event.code}, причина: ${event.reason}`)
        setIsConnected(false)
        setIsScanning(false)
        setScanDuration(0)
        setScanStartTime(null)

        // Автоматическое переподключение через 3 секунды
        if (connectionSettings.autoConnect) {
          reconnectTimerRef.current = setTimeout(() => {
            console.log('🔄 Автоматическое переподключение...')
            connectToServer()
          }, 3000)
        }
      }
    } catch (err) {
      console.error('❌ Ошибка создания WebSocket:', err)
      setError(`Ошибка: ${err}`)
      setIsLoading(false)
    }
  }, [connectionSettings.host, connectionSettings.port, connectionSettings.autoConnect])

  const disconnectFromServer = useCallback(() => {
    // Очищаем таймер переподключения
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current)
      reconnectTimerRef.current = undefined
    }

    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setIsConnected(false)
    setIsScanning(false)
    setScanDuration(0)
    setScanStartTime(null)
  }, [])

  const sendCommand = useCallback((command: string, data?: any) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setError('Не подключено к серверу')
      return false
    }

    try {
      const message = { command, ...data }
      console.log('📤 Отправляю команду:', message)
      wsRef.current.send(JSON.stringify(message))
      return true
    } catch (err) {
      console.error('❌ Ошибка отправки команды:', err)
      setError(`Ошибка отправки: ${err}`)
      return false
    }
  }, [])

  const startScanning = useCallback(async () => {
    const success = sendCommand('start', {
      types: ['GSM', 'LTE', 'WIFI'],
    })

    if (success) {
      setIsScanning(true)
      setScanStartTime(new Date())
      setScanDuration(0)
      setError(null)
    }
  }, [sendCommand])

  const stopScanning = useCallback(async () => {
    sendCommand('stop')
    setIsScanning(false)
  }, [sendCommand])

  const getStatus = useCallback(() => {
    sendCommand('status')
  }, [sendCommand])

  // ============================================================================
  // ОБНОВЛЕНИЕ МЕТРИК
  // ============================================================================

  const updateMetrics = useCallback((currentNetworks: NetworkSignal[]) => {
    const activeNetworks = currentNetworks.filter((n) => n.isActive)
    const signals = activeNetworks.map((n) => n.signalStrength)

    const newMetrics: ScannerMetrics = {
      totalNetworks: currentNetworks.length,
      activeNetworks: activeNetworks.length,
      avgSignal:
        signals.length > 0 ? Math.round(signals.reduce((a, b) => a + b, 0) / signals.length) : -100,
      strongestSignal: signals.length > 0 ? Math.max(...signals) : -50,
      weakestSignal: signals.length > 0 ? Math.min(...signals) : -120,
      networksByType: currentNetworks.reduce(
        (acc, network) => {
          acc[network.type] = (acc[network.type] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ),
    }

    setMetrics(newMetrics)
  }, [])

  // ============================================================================
  // ТАЙМЕР СКАНИРОВАНИЯ
  // ============================================================================

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null

    if (isScanning && scanStartTime) {
      interval = setInterval(() => {
        setScanDuration(Math.floor((Date.now() - scanStartTime.getTime()) / 1000))
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isScanning, scanStartTime])

  // ============================================================================
  // АВТОПОДКЛЮЧЕНИЕ
  // ============================================================================

  useEffect(() => {
    if (connectionSettings.autoConnect && !isConnected) {
      connectToServer()
    }

    return () => {
      disconnectFromServer()
    }
  }, [connectionSettings.autoConnect])

  // ============================================================================
  // КОМПОНЕНТЫ ИНТЕРФЕЙСА
  // ============================================================================

  const StatusIndicator = ({ connected, scanning }: { connected: boolean; scanning: boolean }) => (
    <div className='flex items-center gap-2'>
      <div
        className={`w-3 h-3 rounded-full ${connected ? (scanning ? 'bg-green-500 animate-pulse' : 'bg-primary') : 'bg-error'}`}
      />
      <span className='text-sm'>
        {connected ? (scanning ? 'Сканирование...' : 'Подключено') : 'Отключено'}
      </span>
    </div>
  )

  const SignalQualityBadge = ({ dbm }: { dbm: number }) => {
    const quality = getSignalQuality(dbm)
    const labels = {
      excellent: 'Отлично',
      good: 'Хорошо',
      fair: 'Удовл.',
      poor: 'Слабо',
      none: 'Нет',
    }

    const colors = {
      excellent: 'bg-green-500/10 text-green-500 border-green-500/20',
      good: 'bg-primary/10 text-primary border-primary/20',
      fair: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      poor: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      none: 'bg-error/10 text-error border-error/20',
    }

    return (
      <Badge size='sm' className={`${colors[quality]} font-medium`}>
        {labels[quality]}
      </Badge>
    )
  }

  const NetworkTypeBadge = ({ type }: { type: string }) => {
    const colors: Record<string, string> = {
      GSM: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      LTE: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      UMTS: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      WIFI: 'bg-primary/10 text-primary border-primary/20',
      BLUETOOTH: 'bg-secondary/10 text-secondary border-secondary/20',
      UNKNOWN: 'bg-surface-variant text-on-surface-variant border-outline-variant',
    }

    return (
      <Badge size='sm' className={`${colors[type] || colors.UNKNOWN} font-medium`}>
        {formatSignalType(type)}
      </Badge>
    )
  }

  const MetricCard = ({
    title,
    value,
    icon,
    unit,
    trend,
  }: {
    title: string
    value: string | number
    icon: string
    unit?: string
    trend?: number
  }) => (
    <Card className='border border-outline-variant bg-surface-container p-4 hover:border-primary/30 transition-colors'>
      <div className='flex items-start justify-between'>
        <div>
          <Label className='text-sm text-on-surface-variant mb-1'>{title}</Label>
          <div className='flex items-baseline gap-2'>
            <Text bold className='text-2xl text-on-surface'>
              {value}
            </Text>
            {unit && <Caption className='text-on-surface-variant'>{unit}</Caption>}
          </div>
          {trend !== undefined && (
            <div className='flex items-center gap-1 mt-1'>
              <Icon size='xs' className={trend > 0 ? 'text-green-500' : 'text-error'}>
                {trend > 0 ? '↗' : '↘'}
              </Icon>
              <Caption className={trend > 0 ? 'text-green-500' : 'text-error'}>
                {Math.abs(trend)}%
              </Caption>
            </div>
          )}
        </div>
        <div className='bg-primary/10 p-2 rounded-lg'>
          <Icon size='lg' className='text-primary'>
            {icon}
          </Icon>
        </div>
      </div>
    </Card>
  )

  const NetworkCard = ({ network }: { network: NetworkSignal }) => (
    <Card className='border border-outline-variant bg-surface-container p-4 hover:border-primary/30 transition-colors group'>
      <div className='flex justify-between items-start mb-3'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-2'>
            <NetworkTypeBadge type={network.type} />
            {network.isActive && (
              <Badge size='xs' variant='success' dot className='animate-pulse'>
                LIVE
              </Badge>
            )}
            {network.security && network.security !== 'None' && (
              <Badge size='xs' variant='outline'>
                {network.security}
              </Badge>
            )}
          </div>

          <div className='mb-2'>
            <Text bold className='text-on-surface truncate'>
              {network.type === 'WIFI'
                ? network.ssid || 'Скрытая сеть'
                : network.type === 'BLUETOOTH'
                  ? network.name || 'Bluetooth устройство'
                  : network.operator || formatSignalType(network.type)}
            </Text>
            {network.type === 'WIFI' && network.bssid && (
              <Caption className='text-on-surface-variant font-mono text-xs'>
                {network.bssid}
              </Caption>
            )}
            {network.type === 'GSM' && network.cellId && (
              <Caption className='text-on-surface-variant font-mono text-xs'>
                Cell: {network.cellId}
              </Caption>
            )}
          </div>
        </div>

        <div className='flex flex-col items-end gap-2'>
          <SignalStrength width={60} height={30} dbm={network.signalStrength} />
          <div className='flex items-center gap-2'>
            <Text className={`font-mono font-bold ${getSignalColor(network.signalStrength)}`}>
              {network.signalStrength} dBm
            </Text>
            <SignalQualityBadge dbm={network.signalStrength} />
          </div>
        </div>
      </div>

      <Divider className='my-3' />

      <Grid columns={2} gap='sm'>
        {network.frequency > 0 && (
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Частота</Caption>
            <Text className='font-mono text-on-surface text-sm'>{network.frequency} MHz</Text>
          </div>
        )}

        {network.channel > 0 && (
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Канал</Caption>
            <Text className='font-mono text-on-surface text-sm'>{network.channel}</Text>
          </div>
        )}

        {network.snr && (
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>SNR</Caption>
            <Text className='font-mono text-on-surface text-sm'>{network.snr} dB</Text>
          </div>
        )}

        {network.bandwidth && (
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Полоса</Caption>
            <Text className='font-mono text-on-surface text-sm'>{network.bandwidth}</Text>
          </div>
        )}

        {network.mcc && network.mnc && (
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Сеть</Caption>
            <Text className='font-mono text-on-surface text-sm'>
              {network.mcc}/{network.mnc}
            </Text>
          </div>
        )}

        {network.pci && (
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>PCI</Caption>
            <Text className='font-mono text-on-surface text-sm'>{network.pci}</Text>
          </div>
        )}
      </Grid>

      <div className='flex justify-between items-center mt-4 pt-3 border-t border-outline-variant/30'>
        <Caption className='text-on-surface-variant/70'>{formatTimeAgo(network.timestamp)}</Caption>

        <div className='flex items-center gap-2'>
          {network.type === 'GSM' && network.lac && (
            <Badge size='xs' variant='outline'>
              LAC: {network.lac}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )

  // ============================================================================
  // КОМПОНЕНТЫ ВКЛАДОК
  // ============================================================================

  const renderDashboard = () => (
    <div className='space-y-6'>
      {/* Метрики */}
      <Grid columns={2} lg={4} gap='md'>
        <MetricCard
          title='Активных сетей'
          value={metrics.activeNetworks}
          icon='📶'
          trend={isScanning ? 5 : 0}
        />
        <MetricCard
          title='Средний сигнал'
          value={`${metrics.avgSignal}`}
          icon='📊'
          unit='dBm'
          trend={metrics.avgSignal > -85 ? 2 : -3}
        />
        <MetricCard title='Сильнейший' value={`${metrics.strongestSignal}`} icon='⚡' unit='dBm' />
        <MetricCard title='Слабейший' value={`${metrics.weakestSignal}`} icon='📉' unit='dBm' />
      </Grid>

      {/* Распределение по типам */}
      {networks.length > 0 && (
        <Card className='border border-outline-variant bg-surface-container p-5'>
          <Heading level={4} className='text-on-surface mb-4'>
            Распределение сетей
          </Heading>
          <div className='space-y-3'>
            {Object.entries(metrics.networksByType).map(([type, count]) => (
              <div key={type} className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <NetworkTypeBadge type={type} />
                  <Caption className='text-on-surface-variant'>{formatSignalType(type)}</Caption>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-32 h-2 bg-surface-container-high rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-primary rounded-full'
                      style={{ width: `${(count / metrics.totalNetworks) * 100}%` }}
                    />
                  </div>
                  <Text bold className='text-on-surface'>
                    {count}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Последние сети */}
      <div>
        <div className='flex justify-between items-center mb-4'>
          <Heading level={4} className='text-on-surface'>
            Последние сети
          </Heading>
          <div className='flex items-center gap-2'>
            <Button
              variant='text'
              size='sm'
              onClick={getStatus}
              disabled={!isConnected}
              className='text-primary'
            >
              <Icon size='sm'>🔄</Icon>
              Обновить
            </Button>
            <Caption className='text-on-surface-variant'>
              {isScanning
                ? 'Сканирование...'
                : `Обновлено: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </Caption>
          </div>
        </div>

        {networks.length === 0 ? (
          <Card className='border-2 border-dashed border-outline-variant/50 p-8 text-center'>
            <div className='mx-auto mb-4 w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center'>
              <Icon size='xl' className='text-on-surface-variant'>
                📡
              </Icon>
            </div>
            <Heading level={5} className='text-on-surface mb-2'>
              Сети не обнаружены
            </Heading>
            <Text className='text-on-surface-variant mb-4'>
              {isConnected
                ? isScanning
                  ? 'Идет сканирование...'
                  : 'Запустите сканирование для обнаружения сетей'
                : 'Подключитесь к серверу для начала работы'}
            </Text>
            {!isConnected ? (
              <Button variant='primary' onClick={connectToServer} disabled={isLoading}>
                {isLoading ? 'Подключение...' : 'Подключиться к серверу'}
              </Button>
            ) : (
              <Button variant='secondary' onClick={startScanning} disabled={isScanning}>
                {isScanning ? 'Сканирование...' : 'Запустить сканирование'}
              </Button>
            )}
          </Card>
        ) : (
          <Grid columns={1} lg={2} xl={3} gap='lg'>
            {networks.slice(0, 6).map((network) => (
              <NetworkCard key={network.id} network={network} />
            ))}
          </Grid>
        )}
      </div>
    </div>
  )

  const renderNetworks = () => (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <Heading level={4} className='text-on-surface'>
            Обнаруженные сети
          </Heading>
          <Caption className='text-on-surface-variant'>
            {networks.length} сетей • {metrics.activeNetworks} активны •
            {isScanning &&
              ` Сканирование: ${Math.floor(scanDuration / 60)}:${String(scanDuration % 60).padStart(2, '0')}`}
          </Caption>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setNetworks([])}
            disabled={networks.length === 0 || isScanning}
          >
            <Icon size='sm'>🗑️</Icon>
            Очистить
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => navigator.clipboard.writeText(JSON.stringify(networks, null, 2))}
            disabled={networks.length === 0}
          >
            <Icon size='sm'>📋</Icon>
            Экспорт
          </Button>
        </div>
      </div>

      {networks.length === 0 ? (
        <Card className='border-2 border-dashed border-outline-variant/50 p-12 text-center'>
          <Icon size='2xl' className='text-on-surface-variant mb-4'>
            📶
          </Icon>
          <Heading level={5} className='text-on-surface mb-2'>
            Нет данных
          </Heading>
          <Text className='text-on-surface-variant'>
            {isConnected
              ? 'Запустите сканирование для обнаружения сетей'
              : 'Подключитесь к серверу для начала работы'}
          </Text>
        </Card>
      ) : (
        <div className='space-y-4'>
          {networks.map((network) => (
            <NetworkCard key={network.id} network={network} />
          ))}
        </div>
      )}
    </div>
  )

  const renderSettings = () => (
    <div className='space-y-6'>
      <Heading level={4} className='text-on-surface'>
        Настройки подключения
      </Heading>

      <Card className='border border-outline-variant bg-surface-container p-6'>
        <Grid columns={1} lg={2} gap='lg'>
          <div className='space-y-4'>
            <TextInput
              label='Хост сервера'
              value={connectionSettings.host}
              onChange={(e) =>
                setConnectionSettings((prev) => ({
                  ...prev,
                  host: e.currentTarget.value,
                }))
              }
              placeholder='localhost'
            />

            <TextInput
              label='WebSocket порт'
              type='number'
              value={connectionSettings.port}
              onChange={(e) =>
                setConnectionSettings((prev) => ({
                  ...prev,
                  port: e.currentTarget.value,
                }))
              }
              placeholder='8889'
            />

            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='autoConnect'
                checked={connectionSettings.autoConnect}
                onChange={(e) =>
                  setConnectionSettings((prev) => ({
                    ...prev,
                    autoConnect: e.currentTarget.checked,
                  }))
                }
                className='rounded border-outline-variant bg-surface-container-high'
              />
              <label htmlFor='autoConnect' className='text-sm text-on-surface-variant'>
                Автоподключение при запуске
              </label>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='p-4 border border-outline-variant/50 rounded-lg'>
              <Label className='text-sm text-on-surface-variant mb-2'>Статус подключения</Label>
              <div className='space-y-3'>
                <StatusIndicator connected={isConnected} scanning={isScanning} />

                {isConnected && (
                  <div className='space-y-2'>
                    {isScanning && scanStartTime && (
                      <div className='space-y-1'>
                        <Caption className='text-on-surface-variant'>
                          Длительность сканирования
                        </Caption>
                        <Text className='font-mono text-on-surface text-sm'>
                          {Math.floor(scanDuration / 60)}:
                          {String(scanDuration % 60).padStart(2, '0')}
                        </Text>
                      </div>
                    )}

                    <div className='space-y-1'>
                      <Caption className='text-on-surface-variant'>Получено данных</Caption>
                      <Text className='font-mono text-on-surface text-sm'>{networks.length}</Text>
                    </div>

                    <div className='space-y-1'>
                      <Caption className='text-on-surface-variant'>Типы сетей</Caption>
                      <Text className='text-on-surface text-sm'>
                        {Object.keys(metrics.networksByType)
                          .map((t) => formatSignalType(t))
                          .join(', ')}
                      </Text>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='flex gap-2'>
              <Button
                variant={isConnected ? 'secondary' : 'primary'}
                onClick={isConnected ? disconnectFromServer : connectToServer}
                disabled={isLoading}
                className='flex-1'
              >
                {isLoading ? '...' : isConnected ? 'Отключиться' : 'Подключиться'}
              </Button>

              <Button
                variant={isScanning ? 'danger' : 'secondary'}
                onClick={isScanning ? stopScanning : startScanning}
                disabled={!isConnected || isLoading}
                className='flex-1'
              >
                {isScanning ? 'Остановить' : 'Сканировать'}
              </Button>
            </div>

            {isConnected && (
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  onClick={getStatus}
                  disabled={isLoading}
                  className='flex-1'
                >
                  <Icon size='sm' className='mr-2'>
                    📊
                  </Icon>
                  Статус
                </Button>
              </div>
            )}
          </div>
        </Grid>
      </Card>

      {error && (
        <Card className='border border-error/30 bg-error/5 p-4'>
          <div className='flex items-start gap-3'>
            <Icon size='sm' className='text-error mt-0.5'>
              ⚠️
            </Icon>
            <div className='flex-1'>
              <Text className='text-error text-sm'>{error}</Text>
            </div>
            <Button
              variant='text'
              size='sm'
              onClick={() => setError(null)}
              className='text-error hover:bg-error/10'
            >
              <Icon size='sm'>✕</Icon>
            </Button>
          </div>
        </Card>
      )}

      <Divider />

      <div className='space-y-4'>
        <Heading level={5} className='text-on-surface'>
          Информация о сервере
        </Heading>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='p-3 border border-outline-variant/50 rounded-lg'>
            <Caption className='text-on-surface-variant'>WebSocket порт</Caption>
            <Text className='font-mono text-sm'>8889</Text>
          </div>
          <div className='p-3 border border-outline-variant/50 rounded-lg'>
            <Caption className='text-on-surface-variant'>Формат данных</Caption>
            <Text className='font-mono text-sm'>JSON</Text>
          </div>
          <div className='p-3 border border-outline-variant/50 rounded-lg'>
            <Caption className='text-on-surface-variant'>Команды</Caption>
            <Text className='font-mono text-sm'>start/stop/status</Text>
          </div>
          <div className='p-3 border border-outline-variant/50 rounded-lg'>
            <Caption className='text-on-surface-variant'>Версия</Caption>
            <Text className='font-mono text-sm'>v1.0</Text>
          </div>
        </div>

        <div className='p-3 border border-primary/20 bg-primary/5 rounded-lg'>
          <div className='flex items-start gap-2'>
            <Icon size='sm' className='text-primary mt-0.5'>
              💡
            </Icon>
            <div>
              <Caption className='text-primary'>Пример команд для сервера:</Caption>
              <div className='space-y-1 mt-1'>
                <code className='block text-xs bg-surface p-2 rounded border border-outline-variant'>
                  {'{'}"command": "start", "types": ["GSM", "LTE", "WIFI"]{'}'}
                </code>
                <code className='block text-xs bg-surface p-2 rounded border border-outline-variant'>
                  {'{'}"command": "stop"{'}'}
                </code>
                <code className='block text-xs bg-surface p-2 rounded border border-outline-variant'>
                  {'{'}"command": "status"{'}'}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // ============================================================================
  // ГЛАВНЫЙ КОМПОНЕНТ
  // ============================================================================

  const scannerTabs = [
    {
      id: 'dashboard',
      label: 'Панель управления',
      icon: '📊',
      badge: metrics.activeNetworks,
      description: 'Обзор и метрики',
    },
    {
      id: 'networks',
      label: 'Сети',
      icon: '📶',
      badge: networks.length,
      description: 'Обнаруженные сети',
    },
    {
      id: 'settings',
      label: 'Настройки',
      icon: '⚙️',
      description: 'Подключение и управление',
    },
  ]

  return (
    <Container size='xl' padding='lg'>
      {/* Заголовок */}
      <div className='mb-8 space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <Heading level={1} className='text-3xl font-bold text-on-surface'>
              RF Сканер
            </Heading>
            <Caption className='text-on-surface-variant mt-2'>
              {isConnected
                ? `Подключено к ${connectionSettings.host}:${connectionSettings.port}`
                : 'Отключено от сервера'}
              {isScanning &&
                ` • Сканирование ${Math.floor(scanDuration / 60)}:${String(scanDuration % 60).padStart(2, '0')}`}
            </Caption>
          </div>

          <div className='flex items-center gap-4'>
            <StatusIndicator connected={isConnected} scanning={isScanning} />

            <div className='flex gap-2'>
              <Button
                variant={isConnected ? 'secondary' : 'primary'}
                size='sm'
                onClick={isConnected ? disconnectFromServer : connectToServer}
                disabled={isLoading}
              >
                {isLoading ? '...' : isConnected ? 'Отключиться' : 'Подключиться'}
              </Button>

              <Button
                variant={isScanning ? 'danger' : 'secondary'}
                size='sm'
                onClick={isScanning ? stopScanning : startScanning}
                disabled={!isConnected || isLoading}
              >
                {isScanning ? 'Стоп' : 'Старт'}
              </Button>
            </div>
          </div>
        </div>

        <Divider />
      </div>

      {/* Вкладки */}
      <UnderlineTabs
        tabs={scannerTabs}
        activeTabId={activeTab}
        onTabClick={(tab: any) => setActiveTab(tab.id)}
        fullWidth
        className='mb-6'
      />

      {/* Контент вкладок */}
      <Section>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'networks' && renderNetworks()}
        {activeTab === 'settings' && renderSettings()}
      </Section>

      {/* Футер */}
      <div className='mt-12 pt-6 border-t border-outline-variant/30'>
        <Grid columns={2} lg={4} gap='lg'>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Всего сетей</Caption>
            <Text className='font-mono font-medium text-on-surface'>{networks.length}</Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Диапазон частот</Caption>
            <Text className='font-mono font-medium text-on-surface'>400-6000 MHz</Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Обновлено</Caption>
            <Text className='font-medium text-on-surface'>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Версия сканера</Caption>
            <Text className='font-mono font-medium text-on-surface'>v2.0.0</Text>
          </div>
        </Grid>
      </div>
    </Container>
  )
}

export default RadioScanner
