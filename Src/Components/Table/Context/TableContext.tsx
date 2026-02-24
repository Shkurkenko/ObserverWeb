import { createContext, ComponentType } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { TableColumn, TableData, TablePoint, TableRowData } from '../Table.types'

import { processRowAddition } from '@Utils/MockGen'

import { ReoTable } from '@Shared/Interfaces/Reo.interface'

export interface TableContextProps {
  tableInfo: unknown

  rows: TableRowData[]

  columns: TableColumn[]

  currentSelectedRow: { rowIndex: number }

  currentSelectedColumn: { colIndex: number }

  currentSelectedCell: { rowIndex: number; colIndex: number }

  setRows: (rows: TableRowData[]) => void

  setTableInfo: (tableInfo: unknown) => void

  isRowValid: (row: TableRowData) => boolean

  setColumns: (columns: TableColumn[]) => void

  addRow: (row: TableRowData) => void

  deleteRow: (index: number) => void

  clearRows: () => void

  selectColumn: (colIndex: number) => void

  selectRow: (rowIndex: number) => void

  selectCell: (coords: TablePoint) => void

  mockAddRows: (interval: number, count: number) => void

  renderEmpty?: () => JSX.Element
}

export interface TableProviderProps {
  children: JSX.Element | JSX.Element[]

  columnsModel: TableColumn[]

  data: TableData<ReoTable>

  renderEmpty?: () => ComponentType
}

export const TableContext = createContext<TableContextProps | null>(null)

export const TableProvider = ({
  children,
  columnsModel,
  data,
  renderEmpty,
}: TableProviderProps) => {
  const [rows, setRows] = useState<TableRowData[]>([])

  const [tableInfo, setTableInfo] = useState<unknown>()

  const [currentSelectedRow, setCurrentSelectedRow] = useState<{ rowIndex: number }>({
    rowIndex: -1,
  })

  const [currentSelectedColumn, setCurrentSelectedColumn] = useState<{ colIndex: number }>({
    colIndex: -1,
  })

  const [currentSelectedCell, setCurrentSelectedCell] = useState<TablePoint>({
    rowIndex: -1,
    colIndex: -1,
  })

  const [columns, setColumns] = useState<TableColumn[]>([])

  const [headerRefs, setHeaderRefs] = useState<any[]>()

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setColumns(columnsModel)
      setTableInfo(data.metaInfo)
      setRows(data.rows)
    }
  }, [data])

  const mockAddRows = useCallback((interval: number, count: number) => {
    processRowAddition(interval, count, addRow)
  }, [])

  const isRowValid = useCallback((row: TableRowData): boolean => {
    const columnsCountEqual = columnsModel.length === row.columns.length
    const columnsTypesEqual = row.columns.every((column, index) => {
      return column.type === columnsModel[index].type
    })
    return columnsCountEqual && columnsTypesEqual
  }, [])

  const addRow = useCallback((row: TableRowData) => {
    setRows((prev: TableRowData[]) => [...prev, row])
  }, [])

  const deleteRow = useCallback((rowIndex: number) => {
    setRows((prev: TableRowData[]) => prev.filter((_, index) => index !== rowIndex))
  }, [])

  const clearRows = useCallback(() => {
    setRows((prev: TableRowData[]) => [])
  }, [])

  const selectCell = useCallback((coords: TablePoint) => {
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
        setRows,
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
        mockAddRows,
        selectCell,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export default TableProvider
