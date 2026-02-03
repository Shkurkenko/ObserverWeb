import { Box } from '../../../Layouts/Box'
import { Flex } from '../../../Layouts/Flex'
import { Text } from '../../../Typography'
import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'
import { cn } from '../../../../Utils/Helpers'

import './style.sass'

export interface IColumnOperatorProps {
  data: TableSpace.IOperatorCellData
  className?: string
}

const operatorTestCircles: Record<string, JSX.Element> = {
  mts: <Box className={'operator-circle mts-operator-circle'}></Box>,
  tele2: <Box className={'operator-circle tele2-operator-circle'}></Box>,
  beeline: <Box className={'operator-circle beeline-operator-circle'}></Box>,
  megafone: <Box className={'operator-circle megafone-operator-circle'}></Box>,
  default: <Box className={'operator-circle'}></Box>,
}

export const ColumnOperator = ({ data, className = '' }: IColumnOperatorProps) => {
  return (
    <Flex align='center' className={cn(className, 'operator-column-container')}>
      <Text variant='body1' className='w-full h-full column-operator'>{data.name}</Text>
      <div className='operator-icon mr-2 ml-2'>
        {
          operatorTestCircles[
            data.name && data.name.toLocaleLowerCase() in operatorTestCircles
              ? data.name.toLowerCase()
              : 'default'
          ]
        }
      </div>
    </Flex>
  )
}
