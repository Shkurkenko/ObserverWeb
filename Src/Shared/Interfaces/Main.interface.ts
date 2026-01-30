import preact, { ComponentChildren } from 'preact'
import { TableSpace } from './Table.interface'
import { ReoSpace } from './Reo.interface'

export type IReoColumnsModelsConfig = Record<ReoSpace.IScanTypes, TableSpace.IColumn[]>

export interface IIconProps {
  width?: number

  height?: number

  color?: string

  style?: preact.JSX.CSSProperties

  className?: string
}

export interface ITab {
  id: string

  index: number

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

export interface IView {
  viewId: string
  show: boolean

  // Дополнительные метаданные (опционально)
  metadata?: {
    createdAt: Date
    updatedAt: Date
    createdBy?: string
    description?: string
    tags?: string[]
  }

  // Настройки вьюшки (опционально)
  settings?: {
    autoRefresh?: boolean
    refreshInterval?: number
    showSpectrum?: boolean
  }

  // Состояние фильтров (опционально)
  filters?: {
    signalStrength?: { min: number; max: number }
    operators?: string[]
    frequencyRange?: { min: number; max: number }
    activeOnly?: boolean
    sortBy?: 'signal' | 'frequency' | 'operator' | 'date'
    sortOrder?: 'asc' | 'desc'
  }
}
