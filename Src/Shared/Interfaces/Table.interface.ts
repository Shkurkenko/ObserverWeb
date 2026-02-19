export interface TableStyleSettings {
  columnWidth?: number

  columnMinWidth?: number

  columnMaxWidth?: number

  columnColors?: string[]

  gridColor?: string

  enableHorizontalGird?: boolean

  enableVerticalGrid?: boolean

  columnAlignment?: TableColumnAlignmentType
}

export interface TableConfig {
  enableColumnDisabling?: boolean

  enableCleanTable?: boolean

  enablePagination?: boolean

  enableSorting?: boolean

  enableFiltration?: boolean

  enableEnumiration?: boolean

  tableStyleSettings?: TableStyleSettings
}

export const TableColumnAlignment = {
  Left: 'left',

  Right: 'right',

  Center: 'center',
} as const
export type TableColumnAlignmentType =
  (typeof TableColumnAlignment)[keyof typeof TableColumnAlignment]

export const TableRowStatus = {
  Normal: 'normal',

  Highlighted: 'highlighted',

  Disabled: 'disabled',
} as const
export type TableRowStatusType = (typeof TableRowStatus)[keyof typeof TableRowStatus]

export const TableRow = {
  Normal: 'normal',

  Colored: 'colored',
} as const
export type TableRowType = (typeof TableRow)[keyof typeof TableRow]

export const TableColumn = {
  Enum: 'enum',

  Text: 'text',

  Checkbox: 'checkbox',

  Country: 'country',

  Signal: 'signal',

  Operator: 'operator',

  Date: 'date',
} as const
export type TableColumnType = (typeof TableColumn)[keyof typeof TableColumn]

export const TableHeader = {
  Static: 'static',

  Sortable: 'sortable',
} as const
export type TableHeaderType = (typeof TableHeader)[keyof typeof TableHeader]

export interface TablePoint {
  rowIndex: number
  colIndex: number
}

export interface IHeader {
  label: string
  role: string
  type: TableHeaderType
}

export interface TableCell<T> {
  data: T
  position: TablePoint
  type: TableColumnType
  role: string
}

export enum TableRoles {
  Enum = 'Enum',
}

export interface TableRow {
  index: number
  columns: TableCell<unknown>[] // Unknown type to allow different and custom cell types data
  status: TableRowStatusType
  type: TableRowType
}

export interface TableColumn {
  role: string
  type: TableColumnType
  width?: number
  align?: TableColumnAlignmentType
  minWidth?: number
  maxWidth?: number
  label: string
}

export interface TableData<T> {
  hasNewData: boolean
  metaInfo: T
  rows: TableRow[]
}

export interface TableEnumCellData {
  rowIndex: number
}

export interface TableBaseCellData {
  position: TablePoint
}

export interface TableTextCellData extends TableBaseCellData {
  bold?: boolean
  text: string
}

export interface TableCheckboxCellData extends TableBaseCellData {
  checked: boolean
  onClick?: (e: Event) => void
}

export interface TableRowProps extends TableBaseCellData {
  index: number
  columns: TableColumn[]
}

export interface TableBodyProps extends TableBaseCellData {
  rows: TableRowProps[]
}
