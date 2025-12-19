import { TableRow } from '../TableRow'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { SkeletonTableBody } from '../Skeleton/SkeletonTableBody'
import { useContainerSize } from '../../../Hooks/UseContainerSize'
import { Skeletoned } from '../../Skeletoned'
import VirtualList from 'react-tiny-virtual-list'

import './style.sass'

interface ITableBodyProps {
  rows: TableSpace.IRow[]
  itemHeight?: number
  overscanCount?: number
}

export const TableBody = ({ rows, overscanCount = 12, itemHeight = 60 }: ITableBodyProps) => {
  const { ref, size, containerWidth, containerHeight } = useContainerSize<HTMLDivElement>()

  const isLoading = rows.length === 0 || containerHeight === 0

  const columnsCount = rows[0].columns.length

  const rowsCount = rows.length

  const visibleRowsCount = Math.floor(containerHeight / itemHeight)

  const tableContent = size.height > 0 && (
    <VirtualList
      width={containerWidth.toString() + 'px'}
      height={containerHeight.toString() + 'px'}
      itemCount={rowsCount}
      itemSize={itemHeight}
      overscanCount={overscanCount}
      renderItem={({ index, style }) => (
        <div
          key={index}
          style={style as React.CSSProperties}
          className='observer-table-body-row w-full flex items-center border-b border-outline-variant'
        >
          <TableRow rowData={rows[index]} />
        </div>
      )}
    />
  )

  return (
    <div ref={ref} className='table-body w-full h-full'>
      <Skeletoned
        isLoading={isLoading}
        minDelay={100500}
        skeleton={
          <SkeletonTableBody
            rows={visibleRowsCount}
            columns={columnsCount}
            rowHeight={itemHeight}
          />
        }
      >
        {tableContent}
      </Skeletoned>
    </div>
  )
}
