import { useEffect } from 'preact/hooks'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { ColumnHeader } from '../Columns/ColumnHeader'

import './style.sass'

interface ITableHeaderProps {
  headerColumns: TableSpace.IColumn[]
}

export enum ColumnHeaderSorters {
  Ascending,
  Descending,
  Regular,
}

export const TableHeader = ({ headerColumns }: ITableHeaderProps) => {
  return (
    <div className='sticky top-0 z-10 shadow-lg table-header w-full cursor-pointer table-header-row flex items-center'>
      {headerColumns.map((headerColumnProps: TableSpace.IColumn) => {
        return <ColumnHeader header={headerColumnProps} />
      })}
    </div>
  )
}
