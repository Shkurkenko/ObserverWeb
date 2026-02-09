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

export enum ColumnHeaderSorters {
  Ascending,
  Descending,
  Regular,
}

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
