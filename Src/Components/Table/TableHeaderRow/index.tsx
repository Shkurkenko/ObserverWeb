import { forwardRef } from 'preact/compat'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { ColumnHeader } from '../Columns/ColumnHeader'
import { Flex } from '../../Layouts/Flex'
import { cn } from '../../../Utils/Helpers'

interface ITableHeaderRowProps {
  columns: TableSpace.IColumn[]
}

export const TableHeaderRow = forwardRef<HTMLDivElement, ITableHeaderRowProps>(
  ({ columns }, ref) => {
    return (
      <Flex
        ref={ref}
        align='center'
        className={cn(
          `transition-opacity duration-600 ease-out sticky`,
          `top-0 z-10 shadow-lg table-header w-full`,
          `cursor-pointer table-header-row`,
        )}
      >
        {columns.map((headerColumnProps: TableSpace.IColumn, index: number) => {
          return <ColumnHeader key={index} header={headerColumnProps} />
        })}
      </Flex>
    )
  },
)
