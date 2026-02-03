import { useContext } from 'preact/hooks'
import { TableContext, ITableContext } from '../Context/TableContext'

export function useTable(): ITableContext {
  const context = useContext(TableContext)

  if (!context) {
    throw new Error('useTable must be used within a TableProvider')
  }

  const {
    setRows,
    tableInfo,
    rows,
    columns,
    currentSelectedRow,
    currentSelectedColumn,
    currentSelectedCell,
    isRowValid,
    setColumns,
    setTableInfo,
    addRow,
    deleteRow,
    clearRows,
    selectColumn,
    selectCell,
    selectRow,
    renderEmpty,
    mockAddRows,
  } = context

  return {
    setRows,
    tableInfo,
    rows,
    columns,
    currentSelectedRow,
    currentSelectedColumn,
    currentSelectedCell,
    isRowValid,
    setColumns,
    setTableInfo,
    addRow,
    deleteRow,
    clearRows,
    selectColumn,
    selectRow,
    selectCell,
    renderEmpty,
    mockAddRows,
  }
}
