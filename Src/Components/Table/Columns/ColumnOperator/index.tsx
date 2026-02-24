import { Box } from '@Components/Layouts/Box'
import { Flex } from '@Components/Layouts/Flex'
import { Text } from '@Components/Typography'
import { ReoOperatorCellData } from '@Shared/Interfaces/Reo.interface'

import { cn } from '@Utils/Helpers'

import './style.sass'

export interface ColumnOperatorProps {
  data: ReoOperatorCellData
  className?: string
}

const operatorTestCircles: Record<string, JSX.Element> = {
  mts: <Box className={'operator-circle mts-operator-circle'}></Box>,
  tele2: <Box className={'operator-circle tele2-operator-circle'}></Box>,
  beeline: <Box className={'operator-circle beeline-operator-circle'}></Box>,
  megafone: <Box className={'operator-circle megafone-operator-circle'}></Box>,
  default: <Box className={'operator-circle'}></Box>,
}

export const ColumnOperator = ({ data, className = '' }: ColumnOperatorProps) => {
  return (
    <Flex align='center' className={cn(className, 'operator-column-container')}>
      <Text variant='body1' className='w-full h-full column-operator'>
        {data.name}
      </Text>
      <Box className='operator-icon mr-2 ml-2'>
        {
          operatorTestCircles[
            data.name && data.name.toLocaleLowerCase() in operatorTestCircles
              ? data.name.toLowerCase()
              : 'default'
          ]
        }
      </Box>
    </Flex>
  )
}
