import { Skeletoned } from '../../../Components/Skeletoned'
import { Icon } from '../../../Components/Typography'
import { Card } from '../../../Components/Layouts/Card'
import { Divider } from '../../../Components/Typography'
import { Grid } from '../../../Components/Layouts/Grid'
import { Text } from '../../../Components/Typography'
import { Caption } from '../../../Components/Typography'
import { Button } from '../../../Components/Button'
import { formatDuration } from '../../../../Utils/Helpers'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { cn } from '../../../Utils/Helpers'

export interface IScanSession {
  id: string

  startTime: Date

  duration: number

  networksFound: number

  isActive: boolean

  scanMode: ReoSpace.IScanMode
}

export interface IScannerControlProps {
  isScanning: boolean

  isLoading: boolean

  session: IScanSession

  onStartScan: () => void

  onStopScan: () => void

  onClearData?: () => void

  onExportData?: () => void

  className?: string
}

const ScannerControlSkeleton = () => (
  <Card className='border border-outline-variant/50 bg-surface-container p-6'>
    <div className='flex items-center justify-between mb-6'>
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 from-surface-container-high to-surface-container rounded-xl animate-pulse' />
        <div className='space-y-2'>
          <div className='h-5 from-surface-container-high to-surface-container rounded-lg w-40 animate-pulse' />
          <div className='h-3 from-surface-container-high to-surface-container rounded-lg w-60 animate-pulse' />
        </div>
      </div>
      <div className='flex gap-2'>
        <div className='h-10 from-surface-container-high to-surface-container rounded-lg w-32 animate-pulse' />
        <div className='h-10 from-surface-container-high to-surface-container rounded-lg w-28 animate-pulse' />
      </div>
    </div>

    <Divider />

    <Grid columns={3} gap='lg' className='mt-6'>
      {[...Array(3)].map((_, i) => (
        <div key={i} className='text-center p-4'>
          <div className='h-8 from-surface-container-high to-surface-container rounded-lg w-24 mx-auto mb-2 animate-pulse' />
          <div className='h-3 from-surface-container-high to-surface-container rounded-lg w-16 mx-auto animate-pulse' />
        </div>
      ))}
    </Grid>
  </Card>
)

export interface IScannerControlStatsProps {
  isScanning: boolean
  session: IScanSession
}

export const ScannerControlStats = ({ isScanning, session }: IScannerControlStatsProps) => {
  return (
    <Grid columns={3} gap='lg' className='mt-6'>
      <div className='text-center p-2'>
        <Text bold className='text-2xl text-primary font-mono'>
          {formatDuration(session.duration)}
        </Text>
        <Caption className='text-on-surface-variant mt-1'>Длительность</Caption>
      </div>

      <div className='text-center p-2'>
        <Text bold className='text-2xl text-secondary font-mono'>
          {session.networksFound}
        </Text>
        <Caption className='text-on-surface-variant mt-1'>Обнаружено сетей</Caption>
      </div>

      <div className='text-center p-2'>
        <div className='flex items-center justify-center gap-2'>
          <Text bold className='text-2xl text-tertiary font-mono'>
            {isScanning ? 'LIVE' : 'IDLE'}
          </Text>
          {isScanning && <span className='w-2 h-2 bg-tertiary rounded-full animate-pulse' />}
        </div>
        <Caption className='text-on-surface-variant mt-1'>Статус</Caption>
      </div>
    </Grid>
  )
}

export const ScannerControl = ({
  isScanning,
  isLoading,
  session,
  onStartScan,
  onStopScan,
  onClearData,
  onExportData,
  className = '',
}: IScannerControlProps) => {
  return (
    <Skeletoned isLoading={isLoading} skeleton={<ScannerControlSkeleton />}>
      <Card className={cn('border border-outline-variant/50 bg-surface-container', className)}>
        <div className='p-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div
                className={`relative p-3 rounded-xl ${isScanning ? 'bg-primary/10 animate-pulse' : 'bg-surface-container-high'}`}
              >
                <Icon size='xl' className={isScanning ? 'text-primary' : 'text-on-surface-variant'}>
                  {isScanning ? '📡' : '⏸️'}
                </Icon>
                {isScanning && (
                  <>
                    <span className='absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping' />
                    <span className='absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full' />
                  </>
                )}
              </div>

              <div>
                <Text bold className='text-lg text-on-surface'>
                  {isScanning ? 'Сканирование активно' : 'Сканирование остановлено'}
                </Text>
                <Caption className='text-on-surface-variant mt-1'>
                  {isScanning
                    ? `Режим: ${session.scanMode}`
                    : 'Нажмите "Запуск" для начала сканирования'}
                </Caption>
              </div>
            </div>

            <div className='flex gap-3'>
              {onExportData && (
                <Button
                  variant='outline'
                  onClick={onExportData}
                  disabled={isLoading}
                  leftIcon={<Icon size='sm'>📊</Icon>}
                  className='border-outline-variant hover:border-primary'
                >
                  Экспорт
                </Button>
              )}

              {onClearData && !isScanning && (
                <Button
                  variant='outline'
                  onClick={onClearData}
                  disabled={isLoading}
                  leftIcon={<Icon size='sm'>🗑️</Icon>}
                  className='border-outline-variant hover:border-error text-error hover:text-error'
                >
                  Очистить
                </Button>
              )}

              <Button
                variant={isScanning ? 'danger' : 'primary'}
                onClick={isScanning ? onStopScan : onStartScan}
                loading={isLoading}
                leftIcon={isScanning ? <Icon size='sm'>⏸️</Icon> : <Icon size='sm'>▶️</Icon>}
                className='min-w-35'
              >
                {isScanning ? 'Остановить' : 'Запуск'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Skeletoned>
  )
}
