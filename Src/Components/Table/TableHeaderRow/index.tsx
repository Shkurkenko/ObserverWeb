import { forwardRef } from 'preact/compat'
import { ColumnHeader } from '../Columns/ColumnHeader'
import { Flex } from '@Components/Layouts/Flex'
import { TableColumn } from '../Table.types'

import { cn } from '@Utils/Helpers'

export interface TableHeaderRowProps {
  columns: TableColumn[]
  className?: string
}

export const TableHeaderRow = forwardRef<HTMLDivElement, TableHeaderRowProps>(
  ({ columns, className = '' }, ref) => {
    return (
      <Flex
        ref={ref}
        align='center'
        gap='none'
        className={cn(
          `transition-opacity duration-600 ease-out sticky`,
          `top-0 z-10 shadow-lg table-header w-full`,
          `cursor-pointer table-header-row`,
          className,
        )}
      >
        {columns.map((headerColumnProps: TableColumn, index: number) => {
          return <ColumnHeader key={index} header={headerColumnProps} />
        })}
      </Flex>
    )
  },
)
