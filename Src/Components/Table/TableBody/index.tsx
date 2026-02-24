import { CSSProperties } from 'preact'
import { useEffect } from 'preact/hooks'
import { SkeletonTableBody } from '../Skeleton/SkeletonTableBody'
import { useContainerSize } from '@Hooks/UseContainerSize'
import { Skeletoned } from '@Components/Skeletoned'
import { Box } from '@Components/Layouts/Box'
import { TableRowData } from '../Table.types'
import { TableRow } from '../TableRow'

import VirtualList from 'react-tiny-virtual-list'

import { cn } from '@Utils/Helpers'

import './style.sass'
export interface ITableBodyProps {
  rows: TableRowData[]
  itemHeight?: number
  overscanCount?: number
  className?: string
}

export const TableBody = ({
  rows,
  overscanCount = 30,
  itemHeight = 60,
  className = '',
}: ITableBodyProps) => {
  const { ref, size } = useContainerSize<HTMLDivElement>()

  const containerWidth = size.width

  const containerHeight = size.height

  const isLoading = rows.length === 0 || containerHeight === 0

  const columnsCount = rows[0].columns.length

  const rowsCount = rows.length

  const visibleRowsCount = Math.floor(containerHeight / itemHeight)

  useEffect(() => {
    console.log('containerWidth', containerWidth)
    console.log('containerHeight', containerHeight)
  }, [])

  const tableContent = size.height > 0 && (
    <VirtualList
      width={ref.current?.getBoundingClientRect().width.toString() + 'px'}
      height={ref.current?.getBoundingClientRect().height.toString() + 'px'}
      itemCount={rowsCount}
      itemSize={itemHeight}
      overscanCount={overscanCount}
      renderItem={({ index, style }) => (
        <TableRow rowData={rows[index]} style={style as CSSProperties} />
      )}
    />
  )

  return (
    <Box ref={ref} className={cn('table-body w-full h-full')}>
      <Skeletoned
        isLoading={isLoading}
        minDelay={3000}
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
    </Box>
  )
}
