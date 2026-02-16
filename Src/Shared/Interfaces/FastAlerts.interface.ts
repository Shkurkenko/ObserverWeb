import { ComponentChildren, ComponentType, JSX } from 'preact'

export namespace FastAlertsSpace {
  export interface ItemStyleConfig {
    icon: ComponentChildren
    iconColor: string
    backgroundColor: string
    color: string
    borderColor: string
  }

  export interface IStyleConfig {
    general: {
      transition: number
    }
    error: ItemStyleConfig
    warning: ItemStyleConfig
    success: ItemStyleConfig
    info: ItemStyleConfig
  }
}
