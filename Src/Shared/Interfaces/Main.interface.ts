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

export interface ITab<T> {
  id: string

  label: string
  data: TableSpace.ITableData<T>
  tabIndex: number

  icon?: ComponentChildren
  badge?: string | number
  count?: number
  hasNewData?: boolean
  disabled?: boolean
  loading?: boolean
  error?: boolean

  variant?: 'default' | 'pills' | 'underline' | 'outline'
  size?: 'sm' | 'md' | 'lg'

  ariaLabel?: string
  ariaDescribedby?: string

  onBeforeClick?: (tab: ITab<T>) => boolean | Promise<boolean>
  onAfterClick?: (tab: ITab<T>) => void
}

export enum IMenubarSetup {
  Notifications = 'Notifications',
  TaskManager = 'TaskManager',
}
