import { TableRow } from '../TableRow'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import VirtualList from 'react-tiny-virtual-list'

import './style.sass'

interface ITableBodyProps {
  rows: TableSpace.IRow[]
}

export const TableBody = ({ rows }: ITableBodyProps) => {
  return (
    <div className='table-body w-full h-full relative'>
      <VirtualList
        width='100%'
        height='100%'
        itemCount={rows.length}
        itemSize={70}
        renderItem={({ index, style }) => (
          <div
            key={index}
            style={style as React.CSSProperties}
            className='observer-table-body-row w-full flex items-center'
          >
            <TableRow rowData={rows[index]} />
          </div>
        )}
      />
    </div>
  )
}
