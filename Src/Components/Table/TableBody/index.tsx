import { TableRow } from '../TableRow'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { SkeletonTableBody } from '../Skeleton/SkeletonTableBody'
import { useContainerSize } from '../../../Hooks/UseContainerSize'
import { useMinLoadingDelay } from '../../../Hooks/useMinLoadingDelay'

import VirtualList from 'react-tiny-virtual-list'

import './style.sass'
import { useCallback } from 'preact/hooks'

interface ITableBodyProps {
  rows: TableSpace.IRow[]
}

export const TableBody = ({ rows }: ITableBodyProps) => {
  const { ref, size, isStable } = useContainerSize(100)

  const isLoading = !isStable || rows.length === 0

  const isReadyToShowTable = useMinLoadingDelay(isLoading, 450)

  return (
    <div ref={ref} className='table-body w-full h-full relative overflow-hidden'>
      {/* Скелетон — показываем пока НЕ ready */}
      {!isReadyToShowTable && (
        <div className='absolute inset-0 pointer-events-none'>
          <SkeletonTableBody rows={15} columns={6} rowHeight={60} />
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
            width={size.width.toString() + 'px' || '100%'}
            height={size.height}
            itemCount={rows.length}
            itemSize={60}
            overscanCount={12}
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
