import TableProvider from '../../../Components/Table/Context/TableContext'
import { Card } from '../../../Components/Layouts/Card'
import { Flex } from '../../../Components/Layouts/Flex'
import { Heading } from '../../../Components/Typography'
import { Button } from '../../../Components/Button'
import { Icon } from '../../../Components/Typography'
import { TableSearch } from '../../../Components/Table/TableSearch'
import { TableHeader } from '../../../Components/Table/TableHeader'
import { TableBody } from '../../../Components/Table/TableBody'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { Text } from '../../../Components/Typography'

export interface INetworkTableProps {
  isScanning: boolean

  networkType: ReoSpace.IScanTypes | undefined

  data: any

  onClearData?: () => void

  onExportData?: () => void

  onStartScan?: () => void

  onStopScan?: () => void
}

export const NetworkTable = ({
  networkType,
  data,
  isScanning,
  onClearData,
  onExportData,
  onStartScan,
  onStopScan,
}: INetworkTableProps) => {
  const columnsConfig = ObserverConfig.ReoColumnModelsConfig[networkType!] || []
  const networkDescriptionConfig = ObserverConfig.NetworkDescrptions[networkType!] || 'Сети связи'

  const frequencyRange = {
    min: networkType === ReoSpace.IScanTypes.Wifi ? 2400 : 800,
    max: networkType === ReoSpace.IScanTypes.Wifi ? 5900 : 2700,
  }

  const handleClearData = () => {
    if (onClearData) onClearData()
    console.log('handle clear data network table')
  }

  const handleExportData = () => {
    if (onExportData) onExportData()
    console.log('handle export data network table')
  }

  const handleStartScan = () => {
    if (onStartScan) onStartScan()
    console.log('handle start scan network table')
  }

  const handleStopScan = () => {
    if (onStopScan) onStopScan()
    console.log('handle stop scan network table')
  }

  return (
    <div className='space-y-6'>
      {/* Таблица сетей */}
      <Card className='border border-outline-variant/50 bg-surface-container overflow-hidden'>
        {data.rows.length === 0 ? (
          <div className='p-12 text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high'>
              <Icon size='2xl' className='text-on-surface-variant'>
                {ObserverConfig.NetworkTypeIcons[networkType!]}
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
              <Button variant='primary' onClick={handleStartScan}>
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
                  <TableSearch className='' />
                </div>
                <Button variant='outline' size='sm'>
                  <Icon size='sm'>🔧</Icon>
                  Фильтры
                </Button>
              </Flex>
            </div>

            {/* Таблица */}
            <div className='h-125 overflow-hidden'>
              {data && (
                <TableProvider columnsModel={columnsConfig} data={data}>
                  <div className='relative h-full'>
                    <div className='sticky top-0 z-20 bg-surface-container shadow-sm'>
                      <TableHeader headerColumns={columnsConfig} />
                    </div>
                    <div className='h-110 overflow-auto'>
                      <TableBody rows={data.rows} />
                    </div>
                  </div>
                </TableProvider>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
