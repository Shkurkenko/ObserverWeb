import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { useContainerSize } from '../../../Hooks/UseContainerSize'
import { SkeletonTableHeader } from '../Skeleton/SkeletonTableHeader'
import { Skeletoned } from '../../Skeletoned'

import './style.sass'
import { TableHeaderRow } from '../TableHeaderRow'
import { useEffect } from 'preact/hooks'

interface ITableHeaderProps {
  headerColumns: TableSpace.IColumn[]
}

export enum ColumnHeaderSorters {
  Ascending,
  Descending,
  Regular,
}

export const TableHeader = ({ headerColumns }: ITableHeaderProps) => {
  const { ref, size } = useContainerSize()

  const isLoading = headerColumns.length === 0 || size.height === 0

  return (
    <Skeletoned
      isLoading={isLoading}
      minDelay={2000}
      skeleton={<SkeletonTableHeader columns={5} />}
    >
      <TableHeaderRow ref={ref} columns={headerColumns} />
    </Skeletoned>
  )
}
