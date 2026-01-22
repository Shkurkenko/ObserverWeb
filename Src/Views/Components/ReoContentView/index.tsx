// src/Views/ReoContentView.tsx
import { useState, useEffect, useMemo } from 'preact/hooks'
import TableProvider from '../../../Components/Table/Context/TableContext'
import { UnderlineTabs } from '../../../Components/Tabs/TabGroup'
import { Container } from '../../../Components/Layouts/Container'
import { Grid } from '../../../Components/Layouts/Grid'
import { Flex } from '../../../Components/Layouts/Flex'
import { Card } from '../../../Components/Layouts/Card'
import { Heading } from '../../../Components/Typography'
import { Text } from '../../../Components/Typography'
import { Caption } from '../../../Components/Typography'
import { Icon } from '../../../Components/Typography'
import { Button } from '../../../Components/Button'
import { Badge } from '../../../Components/Badge'
import { ScannerControl } from '../ScannerControl'
import { ScanViewHeader } from '../ScanViewHeader'
import { TableSearch } from '../../../Components/Table/TableSearch'
import { TableBody } from '../../../Components/Table/TableBody'
import { TableHeader } from '../../../Components/Table/TableHeader'
import { TableHelper } from '../../../Components/Table/TableHelper'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { Divider } from '../../../Components/Typography'

export interface IReoTabData {
  metaInfo: {
    scanType: ReoSpace.IScanTypes
    scanStatus: ReoSpace.IScanStatusTypes
    currentScanCycle: number
  }
  rows: TableSpace.IRow[]
  hasNewData: boolean
}

// Вкладка сканирования
export interface IReoTab extends ITab {
  data: IReoTabData
}

export interface ReoView {
  viewId: string
  taskId: string
  show: boolean
  tabsModel: IReoTab[]

  // Дополнительные метаданные (опционально)
  metadata?: {
    createdAt: Date
    updatedAt: Date
    createdBy?: string
    description?: string
    tags?: string[]
  }

  // Настройки вьюшки (опционально)
  settings?: {
    autoRefresh?: boolean
    refreshInterval?: number
    showSpectrum?: boolean
    showMap?: boolean
    theme?: 'light' | 'dark' | 'auto'
  }

  // Состояние фильтров (опционально)
  filters?: {
    signalStrength?: { min: number; max: number }
    operators?: string[]
    frequencyRange?: { min: number; max: number }
    activeOnly?: boolean
    sortBy?: 'signal' | 'frequency' | 'operator' | 'date'
    sortOrder?: 'asc' | 'desc'
  }
}

export interface IReoContentViewProps {
  header: string
  model: ReoView
  isScanning: boolean
  onStartScan: () => void
  onStopScan: () => void
  onClearData: () => void
  onExportData: () => void
}

// Карта иконок для типов сетей
const NETWORK_ICONS: Record<ReoSpace.IScanTypes, string> = {
  [ReoSpace.IScanTypes.Gsm]: '📶',
  [ReoSpace.IScanTypes.Lte]: '4️⃣',
  [ReoSpace.IScanTypes.Umts]: '3️⃣',
  [ReoSpace.IScanTypes.FiveG]: '5️⃣',
  [ReoSpace.IScanTypes.Wifi]: '📡',
  [ReoSpace.IScanTypes.Bluetooth]: '🔵',
  [ReoSpace.IScanTypes.Unknown]: '❓',
}

// Описания типов сетей
const NETWORK_DESCRIPTIONS: Record<ReoSpace.IScanTypes, string> = {
  [ReoSpace.IScanTypes.Gsm]: 'GSM сети 900/1800 MHz',
  [ReoSpace.IScanTypes.Lte]: 'LTE сети (4G)',
  [ReoSpace.IScanTypes.Umts]: 'UMTS сети (3G)',
  [ReoSpace.IScanTypes.FiveG]: '5G сети',
  [ReoSpace.IScanTypes.Wifi]: 'Wi-Fi сети 2.4/5 GHz',
  [ReoSpace.IScanTypes.Bluetooth]: 'Bluetooth устройства',
  [ReoSpace.IScanTypes.Unknown]: 'Неопознано вид связи'
}

export function ReoContentView({
  header,
  model,
  isScanning,
  onStartScan,
  onStopScan,
  onClearData,
  onExportData,
}: IReoContentViewProps) {
  const [activeNetworkType, setActiveNetworkType] = useState<ReoSpace.IScanTypes>(
    (model.tabsModel[0]?.id as ReoSpace.IScanTypes) || ReoSpace.IScanTypes.Gsm,
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
    return model.tabsModel.map((tab) => {
      // Безопасный доступ к данным
      const tabData = tab as any
      const data = tabData.data
      const metaInfo = data?.metaInfo

      // Получаем тип сети или используем ID таба как fallback
      const scanType = metaInfo?.scanType || tab.id

      // Проверяем, является ли scanType валидным типом сети
      const networkType = Object.values(ReoSpace.IScanTypes).includes(
        scanType as ReoSpace.IScanTypes,
      )
        ? (scanType as ReoSpace.IScanTypes)
        : ReoSpace.IScanTypes.Gsm

      const rows = data?.rows || []

      return {
        id: networkType,
        label: tab.label || networkType,
        icon: NETWORK_ICONS[networkType] || '📶',
        badge: rows.length,
        description: NETWORK_DESCRIPTIONS[networkType] || 'Сети связи',
        data: data,
      }
    })
  }, [model.tabsModel])

  // Находим активную вкладку
  const activeTabData = networkTabs.find((tab) => tab.id === activeNetworkType) || networkTabs[0]

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

  const renderNetworkTable = () => {
    const networkDescription = NETWORK_DESCRIPTIONS[activeNetworkType] || 'Сети связи'
    const frequencyRange = {
      min: activeNetworkType === ReoSpace.IScanTypes.Wifi ? 2400 : 800,
      max: activeNetworkType === ReoSpace.IScanTypes.Wifi ? 5900 : 2700,
    }

    return (
      <div className='space-y-6'>
        {/* Информация о текущем типе сети */}
        <Card className='border border-outline-variant/50 bg-surface-container p-4'>
          <Flex justify='between' align='center'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <div className='text-2xl'>{NETWORK_ICONS[activeNetworkType]}</div>
                <div>
                  <Heading level={4} className='text-on-surface'>
                    {activeNetworkType} сети
                  </Heading>
                  <Caption className='text-on-surface-variant'>
                    {networkDescription} • {frequencyRange.min}-{frequencyRange.max} MHz
                  </Caption>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Badge variant={currentRows.length > 0 ? 'success' : 'outline'}>
                  {currentRows.length} сетей
                </Badge>
                <Caption className='text-on-surface-variant/70'>
                  Обновлено:{' '}
                  {stats.lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Caption>
              </div>
            </div>

            <Flex gap='md'>
              <Button
                variant='outline'
                size='sm'
                onClick={onClearData}
                disabled={!currentRows.length}
              >
                <Icon size='sm'>🗑️</Icon>
                Очистить
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={onExportData}
                disabled={!currentRows.length}
              >
                <Icon size='sm'>📥</Icon>
                Экспорт
              </Button>
            </Flex>
          </Flex>
        </Card>

        {/* Таблица сетей */}
        <Card className='border border-outline-variant/50 bg-surface-container overflow-hidden'>
          {currentRows.length === 0 ? (
            <div className='p-12 text-center'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high'>
                <Icon size='2xl' className='text-on-surface-variant'>
                  {NETWORK_ICONS[activeNetworkType]}
                </Icon>
              </div>
              <Heading level={4} className='text-on-surface mb-2'>
                {isScanning ? 'Сканирование выполняется...' : 'Сети не обнаружены'}
              </Heading>
              <Text className='text-on-surface-variant mb-6'>
                {isScanning
                  ? 'Ожидайте появления данных...'
                  : 'Запустите сканирование для обнаружения сетей'}
              </Text>
              {!isScanning && (
                <Button variant='primary' onClick={onStartScan}>
                  <Icon size='sm' className='mr-2'>
                    ▶️
                  </Icon>
                  Запустить сканирование
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Поиск и фильтры */}
              <div className='p-4 border-b border-outline-variant/50'>
                <Flex justify='between' align='center' gap='md'>
                  <div className='flex-1'>
                    <TableSearch />
                  </div>
                  <Button variant='outline' size='sm'>
                    <Icon size='sm'>🔧</Icon>
                    Фильтры
                  </Button>
                </Flex>
              </div>

              {/* Таблица */}
              <div className='h-125 overflow-hidden'>
                {currentData && (
                  <TableProvider columnsModel={currentColumns} data={currentData}>
                    <div className='relative h-full'>
                      <div className='sticky top-0 z-20 bg-surface-container shadow-sm'>
                        <TableHeader headerColumns={currentColumns} />
                      </div>
                      <div className='h-110 overflow-auto'>
                        <TableBody rows={currentRows} />
                      </div>
                    </div>
                  </TableProvider>
                )}
              </div>

              {/* Панель управления таблицей */}
              <div className='p-4 border-t border-outline-variant/50'>
                <TableHelper />
              </div>
            </>
          )}
        </Card>
      </div>
    )
  }

  return (
    <Container size='full' padding='lg' className='h-full flex flex-col bg-surface'>
      {/* Header с названием */}
      <div className='mb-6'>
        <ScanViewHeader
          title={`Сканирование: ${header}`}
          description='Анализ радиоэфира в реальном времени'
          isLoading={isLoading}
          isScanning={isScanning}
        />
      </div>

      {/* Панель управления сканированием */}
      <Card className='mb-6 border border-outline-variant/50 bg-surface-container p-4'>
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

      {/* Метрики */}
      <Grid columns={2} lg={4} gap='lg' className='mb-6'>
        {metrics.map((metric) => (
          <Card
            key={metric.id}
            className='border border-outline-variant/50 bg-surface-container p-4 hover:shadow-md transition-shadow'
          >
            <Flex justify='between' align='start'>
              <div>
                <Caption className='text-on-surface-variant mb-1'>{metric.title}</Caption>
                <Text className={`text-2xl font-bold ${metric.color}`}>{metric.value}</Text>
                <Caption className='text-on-surface-variant/70 mt-1'>{metric.description}</Caption>
              </div>
              <div className='bg-primary/10 p-2 rounded-lg'>
                <div className='text-xl'>{metric.icon}</div>
              </div>
            </Flex>
          </Card>
        ))}
      </Grid>

      <Divider />

      {/* Табы типов сетей */}
      <div className='mb-4'>
        {networkTabs.length > 1 ? (
          <UnderlineTabs
            tabs={networkTabs}
            activeTabId={activeNetworkType}
            onTabClick={(tab) => setActiveNetworkType(tab.id as ReoSpace.IScanTypes)}
            fullWidth
          />
        ) : (
          <div className='flex items-center gap-3 p-2'>
            <div className='text-2xl'>{NETWORK_ICONS[activeNetworkType]}</div>
            <div>
              <Heading level={4} className='text-on-surface'>
                {activeNetworkType} сети
              </Heading>
              <Caption className='text-on-surface-variant'>
                {currentRows.length} сетей обнаружено
              </Caption>
            </div>
          </div>
        )}
      </div>

      {/* Основной контент - таблица */}
      <div className='flex-1 overflow-auto'>{renderNetworkTable()}</div>

      {/* Footer */}
      <div className='mt-6 pt-4 border-t border-outline-variant/30'>
        <Grid columns={2} lg={4} gap='lg'>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Активный тип</Caption>
            <Text className='font-medium text-on-surface flex items-center gap-2'>
              <span>{NETWORK_ICONS[activeNetworkType]}</span>
              {activeNetworkType}
            </Text>
          </div>
          <div className='space-y-1'>
            <Caption className='text-on-surface-variant'>Задача</Caption>
            <Text className='font-medium text-on-surface truncate'>{header}</Text>
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
