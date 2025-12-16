import { useCallback, useState } from 'preact/hooks'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'

import './style.sass'
import { ColumnHeader } from '../Columns/ColumnHeader'

interface ITableHeaderProps {
  headers: TableSpace.IColumn[]
}

export enum ColumnHeaderSorters {
  Ascending,
  Descending,
  Regular,
}

export const TableHeader = ({ headers }: ITableHeaderProps) => {
  return (
    <thead className='sticky top-0 z-10 shadow-lg table-header w-full'>
      <tr className='cursor-pointer table-header-row'>
        <th className='hover:bg-surface-container-high'>#</th>
        {headers.map((headerColumnProps: TableSpace.IColumn) => {
          return <ColumnHeader header={headerColumnProps} />
        })}
      </tr>
    </thead>
  )
}
