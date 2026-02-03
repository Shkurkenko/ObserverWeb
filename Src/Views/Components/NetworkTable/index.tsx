import TableProvider from '../../../Components/Table/Context/TableContext'
import { Card } from '../../../Components/Layouts/Card'
import { Heading } from '../../../Components/Typography'
import { TableSearch } from '../../../Components/Table/TableSearch'
import { TableHeader } from '../../../Components/Table/TableHeader'
import { TableBody } from '../../../Components/Table/TableBody'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { useEffect } from 'preact/hooks'
import { NetworkTableEmpty } from './NetworkTableEmpty'

export interface INetworkTableProps {
  isScanning: boolean

  networkType: ReoSpace.IScanTypes

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
  const columnsConfig = ObserverConfig.ReoColumnModelsConfig[networkType] || []
  const networkDescriptionConfig = ObserverConfig.NetworkDescrptions[networkType] || 'Сети связи'

  useEffect(() => {
    console.log('network type: ', networkType)
    console.log('columns config: ', columnsConfig)
  }, [])

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
      {networkType !== ReoSpace.IScanTypes.Unknown ? (
        <Card className='border border-outline-variant/50 bg-surface-container overflow-hidden'>
          {data.rows.length === 0 ? (
            <NetworkTableEmpty
              isScanning={isScanning}
              networkType={networkType}
              handleStartScan={handleStartScan}
            />
          ) : (
            <>
              <TableSearch className='w-[95%] ml-1 mb-3' />

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
      ) : (
        <Heading>Тут красивая свг мол че за хрень...</Heading>
      )}
    </div>
  )
}
