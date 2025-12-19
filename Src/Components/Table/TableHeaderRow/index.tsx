import { forwardRef } from 'preact/compat'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { ColumnHeader } from '../Columns/ColumnHeader'

interface ITableHeaderRowProps {
  columns: TableSpace.IColumn[]
}

export const TableHeaderRow = forwardRef<HTMLDivElement, ITableHeaderRowProps>(
  ({ columns }, ref) => {
    return (
      <div
        ref={ref}
        className={`transition-opacity duration-600 ease-out sticky top-0 z-10 shadow-lg table-header w-full cursor-pointer table-header-row flex items-center`}
      >
        {columns.map((headerColumnProps: TableSpace.IColumn, index: number) => {
          return <ColumnHeader key={index} header={headerColumnProps} />
        })}
      </div>
    )
  },
)
