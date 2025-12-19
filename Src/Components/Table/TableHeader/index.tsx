import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { ColumnHeader } from '../Columns/ColumnHeader'
import { useContainerSize } from '../../../Hooks/UseContainerSize'
import { SkeletonTableHeader } from '../Skeleton/SkeletonTableHeader'
import { Skeletoned } from '../../Skeletoned'

import './style.sass'
import { TableHeaderRow } from '../TableHeaderRow'

interface ITableHeaderProps {
  headerColumns: TableSpace.IColumn[]
}

export enum ColumnHeaderSorters {
  Ascending,
  Descending,
  Regular,
}

export const TableHeader = ({ headerColumns }: ITableHeaderProps) => {
  const { ref, containerHeight } = useContainerSize()

  const isLoading = headerColumns.length === 0 || containerHeight === 0

  return (
    <Skeletoned
      isLoading={isLoading}
      minDelay={100500}
      skeleton={<SkeletonTableHeader columns={5} />}
    >
      <TableHeaderRow ref={ref} columns={headerColumns} />
    </Skeletoned>
  )
}
