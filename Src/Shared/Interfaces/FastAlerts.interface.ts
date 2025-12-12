import { JSX } from 'preact'

export namespace FastAlertsSpace {
  export interface ItemStyleConfig {
    icon: JSX.Element
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
