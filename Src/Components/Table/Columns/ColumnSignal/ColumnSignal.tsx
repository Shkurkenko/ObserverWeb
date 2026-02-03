import { Box } from '../../../Layouts/Box'
import { Text } from '../../../Typography'
import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'
import { SignalStrength } from '../../../SignalStrength'
import { cn } from '../../../../Utils/Helpers'

import './style.sass'

interface ISignalColumnProps {
  data: TableSpace.ISignalCellData
  className?: string
}

export const ColumnSignal = ({ data, className = '' }: ISignalColumnProps) => {
  return (
    <Box className={cn(className, 'column-signal w-full h-full')}>
      <Text bold={true} variant='body1' className='mr-3'>
        {data.value}
      </Text>
      <SignalStrength width={45} height={24} dbm={data.value} />
    </Box>
  )
}
