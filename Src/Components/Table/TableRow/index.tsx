import { CSSProperties } from 'preact'
import { ColumnBase } from '../Columns/ColumnBase'
import { ColumnSignal } from '../Columns/ColumnSignal/ColumnSignal'
import { ColumnOperator } from '../Columns/ColumnOperator'
import { ColumnEnum } from '../Columns/ColumnEnum'
import { ColumnText } from '../Columns/ColumnText/ColumnText'
import { ColumnCountry } from '../Columns/ColumnCountry'
import { ColumnCheckbox } from '../Columns/ColumnCheckbox'
import { Box } from '@Components/Layouts/Box'
import { TableCell, TableColumn, TableRowData, TableTextCellData } from '../Table.types'
import {
  ReoCountryCellData,
  ReoOperatorCellData,
  ReoSignalCellData,
} from '@Shared/Interfaces/Reo.interface'

import { cn } from '@Utils/Helpers'

import './style.sass'

export function ColumnMatcher({ columnData }: { columnData: TableCell<unknown> }): JSX.Element {
  switch (columnData.type) {
    case TableColumn.Enum:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnEnum index={columnData.position.rowIndex} />
        </ColumnBase>
      )
    case TableColumn.Text:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnText data={columnData.data as TableTextCellData} />
        </ColumnBase>
      )
    case TableColumn.Operator:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnOperator data={columnData.data as ReoOperatorCellData} />
        </ColumnBase>
      )
    case TableColumn.Signal:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnSignal data={columnData.data as ReoSignalCellData} />
        </ColumnBase>
      )
    case TableColumn.Country:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnCountry data={columnData.data as ReoCountryCellData} />
        </ColumnBase>
      )
    case TableColumn.Checkbox:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnCheckbox />
        </ColumnBase>
      )
    default:
      console.warn(`Unknown column type: ${columnData.type}`, columnData)
      return (
        <ColumnBase position={columnData.position}>
          <span>Unknown Column Type</span>
        </ColumnBase>
      )
  }
}

export interface TableRowProps {
  rowData: TableRowData
  style?: CSSProperties
  className?: string
}

export const TableRow = ({ rowData, style, className = '' }: TableRowProps) => {
  return (
    <Box
      style={style}
      className={cn(
        className,
        'observer-table-body-row w-full flex items-center border-b border-surface-container',
      )}
    >
      {rowData.columns.map((column: TableCell<unknown>, counter: number) => (
        <ColumnMatcher columnData={column} key={counter} />
      ))}
    </Box>
  )
}
