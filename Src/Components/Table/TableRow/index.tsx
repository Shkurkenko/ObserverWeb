import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { ColumnBase } from '../Columns/ColumnBase'
import { ColumnSignal } from '../Columns/ColumnSignal/ColumnSignal'
import { ColumnOperator } from '../Columns/ColumnOperator'
import { ColumnEnum } from '../Columns/ColumnEnum'
import { ColumnText } from '../Columns/ColumnText/ColumnText'
import { ColumnCountry } from '../Columns/ColumnCountry'
import { ColumnCheckbox } from '../Columns/ColumnCheckbox'

import './style.sass'

export function ColumnMatcher({
  columnData,
}: {
  columnData: TableSpace.ICell<unknown>
}): JSX.Element {
  switch (columnData.type) {
    case TableSpace.IColumnTypes.Enum:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnEnum index={columnData.position.rowIndex} />
        </ColumnBase>
      )
    case TableSpace.IColumnTypes.Text:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnText data={columnData.data as TableSpace.ITextCellData} />
        </ColumnBase>
      )
    case TableSpace.IColumnTypes.Operator:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnOperator data={columnData.data as TableSpace.IOperatorCellData} />
        </ColumnBase>
      )
    case TableSpace.IColumnTypes.Signal:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnSignal data={columnData.data as TableSpace.ISignalCellData} />
        </ColumnBase>
      )
    case TableSpace.IColumnTypes.Country:
      return (
        <ColumnBase position={columnData.position}>
          <ColumnCountry data={columnData.data as TableSpace.ICountryCellData} />
        </ColumnBase>
      )
    case TableSpace.IColumnTypes.Checkbox:
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
export interface ITableRowProps {
  rowData: TableSpace.IRow
}

export function TableRow({ rowData }: ITableRowProps) {
  return (
    <tr key={rowData.index} className='observer-table-body-row'>
      {rowData.columns.map((column: TableSpace.ICell<unknown>, counter: number) => (
        <ColumnMatcher columnData={column} key={counter} />
      ))}
    </tr>
  )
}
