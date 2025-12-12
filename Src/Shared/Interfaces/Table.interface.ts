import { ReoSpace } from './Reo.interface'
export namespace TableSpace {
  export interface IStyleSettings {
    columnWidth?: number
    columnMinWidth?: number
    columnMaxWidth?: number
    columnColors?: string[]
    gridColor?: string
    enableHorizontalGird?: boolean
    enableVerticalGrid?: boolean
    columnAlignment?: IColumnAlignment
  }

  export interface IConfig {
    enableColumnDisabling?: boolean
    enableCleanTable?: boolean
    enablePagination?: boolean
    enableSorting?: boolean
    enableFiltration?: boolean
    enableEnumiration?: boolean
    tableStyleSettings?: IStyleSettings
  }

  export enum IColumnAlignment {
    Left = 'left',
    Right = 'right',
    Center = 'center',
  }

  export enum IRowStatus {
    Normal = 'normal',
    Highlighted = 'highlighted',
    Disabled = 'disabled',
  }

  export enum IRowTypes {
    Normal,
    Colored,
  }

  export enum IColumnTypes {
    Enum,
    Text,
    Checkbox,
    Country,
    Signal,
    Operator,
    Date,
  }

  export enum IHeaderTypes {
    Static,
    Sortable,
  }

  export interface IPoint {
    rowIndex: number
    colIndex: number
  }

  export interface IHeader {
    label: string
    role: string
    type: IHeaderTypes
  }

  export interface ICell<T> {
    data: T
    position: IPoint
    type: IColumnTypes
    role: string
  }

  export enum IRoles {
    Enum,
  }

  export interface IRow {
    index: number
    columns: ICell<unknown>[] // Unknown type to allow different and custom cell types data
    status: IRowStatus
    type: IRowTypes
  }

  export interface IColumn {
    role: string
    type: IColumnTypes
    width: number
    minWidth: number
    maxWidth: number
    label: string
    align?: IColumnAlignment
  }

  export interface ITableData<T> {
    metaInfo: T
    rows: IRow[]
  }

  export interface IEnumCellData {
    rowIndex: number
  }

  export interface IBaseCellData {
    position: IPoint
  }

  export interface ITextCellData extends IBaseCellData {
    bold?: boolean
    text: string
  }

  export interface ICheckboxCellData extends IBaseCellData {
    checked: boolean
    onClick?: (e: Event) => void
  }

  export interface IOperatorCellData extends IBaseCellData {
    name?: string
    iconPath?: string
    code: number
  }

  export interface ICountryCellData extends IBaseCellData {
    name: string
    countryAbb: string
    countryCode: number
  }

  export interface ISignalCellData extends IBaseCellData {
    range: ReoSpace.ISignalRange
    value: number
  }

  export interface IRowProps extends IBaseCellData {
    index: number
    columns: IColumn[]
  }

  export interface IBodyProps extends IBaseCellData {
    rows: IRowProps[]
  }
}
