import preact, { ComponentChildren } from 'preact'
import { TableSpace } from './Table.interface'
import { ReoSpace } from './Reo.interface'

export type IReoColumnsModelsConfig = Record<ReoSpace.IScanTypes, TableSpace.IColumn[]>

export interface IIconProps {
  width?: number

  height?: number

  color?: string

  style?: preact.JSX.CSSProperties
}

export interface ITab {
  id: string

  label: string

  icon?: ComponentChildren | string

  badge?: string | number

  count?: number

  disabled?: boolean

  loading?: boolean
}

export enum IMenubarSetup {
  Notifications = 'Notifications',

  TaskManager = 'TaskManager',
}
