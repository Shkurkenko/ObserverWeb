import { useContainerSize } from '@Hooks/UseContainerSize'
import { SkeletonTableHeader } from '../Skeleton/SkeletonTableHeader'
import { Skeletoned } from '@Components/Skeletoned'
import { TableHeaderRow } from '../TableHeaderRow'
import { TableColumn } from '@Shared/Interfaces/Table.types'

import './style.sass'

export interface TableHeaderProps {
  headerColumns: TableColumn[]
  className?: string
}

export const ColumnHeaderSorters = {
  Ascending: 'ascending' as const,
  Descending: 'descending' as const,
  Regular: 'regular' as const,
} as const

export const TableHeader = ({ headerColumns, className = '' }: TableHeaderProps) => {
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
