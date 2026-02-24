import { Flex } from '@Components/Layouts/Flex'
import { TableTextCellData } from '@Components/Table/Table.types'

import { cn } from '@Utils/Helpers'

export interface TextColumnProps {
  data: TableTextCellData
  className?: string
}

export const ColumnText = ({ data, className = '' }: TextColumnProps) => {
  return (
    <Flex justify='center' align='center' className={cn(className, 'w-full h-full column-text')}>
      {data.text}
    </Flex>
  )
}
