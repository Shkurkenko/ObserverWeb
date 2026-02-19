import { Icon } from '../../../Components/Typography'
import { Button } from '../../../Components/Button'
import { Heading } from '../../../Components/Typography'
import { Text } from '../../../Components/Typography'
import { ReoScanVariantType } from '../../../Shared/Interfaces/Reo.interface'
import { NetworkTypeIcons } from '../../../../Config/ObserverConfig'

export interface INetworkTableEmptyProps {
  isScanning: boolean
  networkType: ReoScanVariantType
  handleStartScan: () => void
}

export const NetworkTableEmpty = ({
  isScanning,
  networkType,
  handleStartScan,
}: INetworkTableEmptyProps) => {
  return (
    <div className='p-12 text-center'>
      <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high'>
        <Icon size='2xl' className='text-on-surface-variant'>
          {NetworkTypeIcons[networkType]}
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
  )
}
