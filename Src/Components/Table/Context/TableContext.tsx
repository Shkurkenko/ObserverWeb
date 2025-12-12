import { createContext } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { MockGenHelpers } from '../../../Utils/MockGen'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'

export interface ITableContext {
  tableInfo: unknown

  rows: TableSpace.IRow[]

  columns: TableSpace.IColumn[]

  currentSelectedRow: { rowIndex: number }

  currentSelectedColumn: { colIndex: number }

  currentSelectedCell: { rowIndex: number; colIndex: number }

  setTableInfo: (tableInfo: unknown) => void

  isRowValid: (row: TableSpace.IRow) => boolean

  setColumns: (headers: TableSpace.IColumn[]) => void

  setDefaultHeaders: () => void

  addRow: (row: TableSpace.IRow) => void

  deleteRow: (index: number) => void

  clearRows: () => void

  selectColumn: (colIndex: number) => void

  selectRow: (rowIndex: number) => void

  selectCell: (coords: TableSpace.IPoint) => void

  mockAddRows: (interval: number, count: number) => void

  renderEmpty: () => JSX.Element
}

export interface ITableProviderProps {
  children: JSX.Element | JSX.Element[]

  columnsModel: TableSpace.IColumn[]

  data: TableSpace.ITableData<ReoSpace.IReoTable>

  renderEmpty: () => JSX.Element
}

export const TableContext = createContext<ITableContext | null>(null)

export const TableProvider = ({
  children,
  columnsModel,
  data,
  renderEmpty,
}: ITableProviderProps) => {
  const [rows, setRows] = useState<TableSpace.IRow[]>([])

  const [tableInfo, setTableInfo] = useState<unknown>()

  const [currentSelectedRow, setCurrentSelectedRow] = useState<{ rowIndex: number }>({
    rowIndex: -1,
  })

  const [currentSelectedColumn, setCurrentSelectedColumn] = useState<{ colIndex: number }>({
    colIndex: -1,
  })

  const [currentSelectedCell, setCurrentSelectedCell] = useState<TableSpace.IPoint>({
    rowIndex: -1,
    colIndex: -1,
  })

  const [columns, setColumns] = useState<TableSpace.IColumn[]>([])

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setTableInfo(data.metaInfo)
      setRows(data.rows)
    }
  }, [data])

  const mockAddRows = useCallback((interval: number, count: number) => {
    MockGenHelpers.processRowAddition(interval, count, addRow)
  }, [])

  const setDefaultHeaders = useCallback(() => {
    // Note: Think about this
    // const initialHeaders: TableSpace.IHeader[] =
    //   data.length > 0
    //     ? data[0].columns.reduce<TableSpace.IHeader[]>((acc, cell) => {
    //         if (cell.type !== TableSpace.IColumnTypes.Enum) {
    //           // cast via unknown first to satisfy TypeScript's recommendation about potentially incompatible unions
    //           acc.push({
    //             label: 'sjkdf',
    //             type: cell.type,
    //             role: cell.role,
    //           } as unknown as TableSpace.IHeader)
    //         }
    //         return acc
    //       }, [])
    //     : []
    // setHeaders(initialHeaders)
  }, [data])

  const isRowValid = useCallback((row: TableSpace.IRow): boolean => {
    const columnsCountEqual = columnsModel.length === row.columns.length
    const columnsTypesEqual = row.columns.every((column, index) => {
      return column.type === columnsModel[index].type
    })
    return columnsCountEqual && columnsTypesEqual
  }, [])

  const addRow = useCallback((row: TableSpace.IRow) => {
    setRows((prev: TableSpace.IRow[]) => [...prev, row])
  }, [])

  const deleteRow = useCallback((rowIndex: number) => {
    setRows((prev: TableSpace.IRow[]) => prev.filter((_, index) => index !== rowIndex))
  }, [])

  const clearRows = useCallback(() => {
    setRows((prev: TableSpace.IRow[]) => [])
  }, [])

  const selectCell = useCallback((coords: TableSpace.IPoint) => {
    setCurrentSelectedCell(coords)
  }, [])

  const selectColumn = useCallback((colIndex: number) => {
    setCurrentSelectedColumn({ colIndex })
  }, [])

  const selectRow = useCallback((rowIndex: number) => {
    setCurrentSelectedRow({ rowIndex })
  }, [])

  return (
    <TableContext.Provider
      value={{
        tableInfo,
        rows,
        columns,
        currentSelectedColumn,
        currentSelectedRow,
        currentSelectedCell,
        isRowValid,
        setColumns,
        setTableInfo,
        addRow,
        deleteRow,
        clearRows,
        selectColumn,
        selectRow,
        renderEmpty,
        setDefaultHeaders,
        mockAddRows,
        selectCell,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export default TableProvider
