import { TableSpace } from '../../../Shared/Interfaces/Table.interface'

import './style.sass'

interface ITableHeaderProps {
  headers: TableSpace.IColumn[]
}

export const TableHeader = ({ headers }: ITableHeaderProps) => {
  return (
    <thead className='sticky top-0 z-10 shadow-lg table-header w-full'>
      <tr className='cursor-pointer table-header-row'>
        <th className='hover:bg-surface-container-high'>#</th>
        {headers.map((header: TableSpace.IColumn, index) => {
          return (
            <td key={index} className='table-header-column hover:bg-surface-container-highest'>
              <b>{header.label}</b>
            </td>
          )
        })}
      </tr>
    </thead>
  )
}
