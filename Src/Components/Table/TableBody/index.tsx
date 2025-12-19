import { TableRow } from '../TableRow'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { SkeletonTableBody } from '../Skeleton/SkeletonTableBody'
import { useContainerSize } from '../../../Hooks/UseContainerSize'
import { useMinLoadingDelay } from '../../../Hooks/useMinLoadingDelay'
import { useEffect } from 'preact/hooks'
import VirtualList from 'react-tiny-virtual-list'

import './style.sass'

interface ITableBodyProps {
  rows: TableSpace.IRow[]
  itemHeight?: number
  overscanCount?: number
}

export const TableBody = ({ rows, overscanCount = 12, itemHeight = 60 }: ITableBodyProps) => {
  const { ref, size } = useContainerSize()

  const isLoading = rows.length === 0 || size.height === 0

  const isReadyToShowTable = useMinLoadingDelay(isLoading, 450)

  const columnsCount = rows[0].columns.length

  const rowsCount = rows.length

  const visibleRowsCount = Math.floor(size.height / itemHeight) + 5

  useEffect(() => {
    console.log('size: ', size)
  }, [])

  return (
    <div ref={ref} className='table-body w-full h-full relative'>
      {/* Скелетон — показываем пока НЕ ready */}
      {!isReadyToShowTable && (
        <div className='absolute inset-0 pointer-events-none'>
          <SkeletonTableBody
            rows={visibleRowsCount}
            columns={columnsCount}
            rowHeight={itemHeight}
          />
        </div>
      )}

      {/* Реальная таблица — плавно появляется */}
      <div
        className={`w-full h-full transition-opacity duration-600 ease-out ${
          isReadyToShowTable ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {size.height > 0 && isReadyToShowTable && (
          <VirtualList
            width={size.width.toString() + 'px'}
            height={size.height.toString() + 'px'}
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
        )}
      </div>
    </div>
  )
}
