import { Flex } from '../../../Layouts/Flex'
import { TableSpace } from '../../../../Shared/Interfaces/Table.interface'
import { cn } from '../../../../Utils/Helpers'

import './style.sass'

interface ITextColumnProps {
  data: TableSpace.ITextCellData
  className?: string
}

export const ColumnText = ({ data, className = '' }: ITextColumnProps) => {
  return (
    <Flex justify='center' align='center' className={cn(className, 'w-full h-full column-text')}>
      {data.text}
    </Flex>
  )
}
