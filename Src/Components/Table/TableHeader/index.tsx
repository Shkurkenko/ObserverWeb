import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { useContainerSize } from '../../../Hooks/UseContainerSize'
import { SkeletonTableHeader } from '../Skeleton/SkeletonTableHeader'
import { Skeletoned } from '../../Skeletoned'

import { TableHeaderRow } from '../TableHeaderRow'

import './style.sass'

interface ITableHeaderProps {
  headerColumns: TableSpace.IColumn[]
  className?: string
}

export const ColumnHeaderSorters = {
  Ascending: 'ascending' as const,
  Descending: 'descending' as const,
  Regular: 'regular' as const,
} as const

export const TableHeader = ({ headerColumns, className = '' }: ITableHeaderProps) => {
  const { ref, size } = useContainerSize()

  const isLoading = headerColumns.length === 0 || size.height === 0

  return (
    <Skeletoned
      isLoading={isLoading}
      minDelay={2000}
      skeleton={<SkeletonTableHeader columns={5} />}
    >
      <TableHeaderRow ref={ref} columns={headerColumns} className='' />
    </Skeletoned>
  )
}
