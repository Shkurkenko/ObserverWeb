import preact from 'preact'
import { TableSpace } from './Table.interface'
import { ReoSpace } from './Reo.interface'

export type IReoColumnsModelsConfig = {
  [key in ReoSpace.IScanTypes]: TableSpace.IColumn[]
}

export interface IIconProps {
  width?: number
  height?: number
  color?: string
  style?: preact.JSX.CSSProperties
}

export interface ITab<T> {
  id: string
  label: string
  data: TableSpace.ITableData<T>
  tabIndex: number
}

export enum IMenubarSetup {
  Notifications = 'Notifications',
  TaskManager = 'TaskManager',
}
