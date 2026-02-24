import { Box } from '@Components/Layouts/Box'
import { Text } from '@Components/Typography'
import { SignalStrength } from '@Components/SignalStrength'
import { ReoSignalCellData } from '@Shared/Interfaces/Reo.interface'

import { cn } from '@Utils/Helpers'

import './style.sass'

export interface SignalColumnProps {
  data: ReoSignalCellData
  className?: string
}

export const ColumnSignal = ({ data, className = '' }: SignalColumnProps) => {
  return (
    <Box className={cn(className, 'column-signal w-full h-full')}>
      <Text bold={true} variant='body1' className='mr-3'>
        {data.value}
      </Text>
      <SignalStrength width={45} height={24} dbm={data.value} />
    </Box>
  )
}
