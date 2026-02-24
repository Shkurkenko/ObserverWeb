import { useEffect } from 'preact/hooks'
import TableProvider from '@Components/Table/Context/TableContext'
import { Card } from '@Components/Layouts/Card'
import { Heading } from '@Components/Typography'
import { TableHeader } from '@Components/Table/Table.types'
import { TableBody } from '@Components/Table/TableBody'
import { Flex } from '@Components/Layouts/Flex'
import { TextInput } from '@Components/Form/TextInput'
import { NetworkTableEmpty } from './NetworkTableEmpty'
import { ReoScanVariant, ReoScanVariantType } from '@Shared/Interfaces/Reo.interface'
import { ReoColumnModelsConfig } from '../../../../Config/ObserverConfig'

import { cn } from '@Utils/Helpers'

export interface INetworkTableProps {
  isScanning: boolean

  networkType: ReoScanVariantType

  data: any

  onClearData?: () => void

  onExportData?: () => void

  onStartScan?: () => void

  onStopScan?: () => void

  className?: string
}

export const NetworkTable = ({
  networkType,
  data,
  isScanning,
  onClearData,
  onExportData,
  onStartScan,
  onStopScan,
  className = '',
}: INetworkTableProps) => {
  const columnsConfig = ReoColumnModelsConfig[networkType] || []

  useEffect(() => {
    console.log('network type: ', networkType)
    console.log('columns config: ', columnsConfig)
  }, [])

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
    <>
      {networkType !== ReoScanVariant.Unknown ? (
        <Card
          className={cn(
            'border border-outline-variant/50 bg-surface-container overflow-hidden',
            className,
          )}
        >
          {data.rows.length === 0 ? (
            <NetworkTableEmpty
              isScanning={isScanning}
              networkType={networkType}
              handleStartScan={handleStartScan}
            />
          ) : (
            <Flex direction='col' className={cn('w-full h-150')}>
              <TextInput
                type='text'
                value=''
                placeholder='Поиск по таблице'
                onChange={(e) => console.log(e.currentTarget.value)}
              />

              {data && (
                <TableProvider columnsModel={columnsConfig} data={data}>
                  <TableHeader headerColumns={columnsConfig} />
                  <TableBody rows={data.rows} />
                </TableProvider>
              )}
            </Flex>
          )}
        </Card>
      ) : (
        <Heading>Тут красивая свг мол че за хрень...</Heading>
      )}
    </>
  )
}
