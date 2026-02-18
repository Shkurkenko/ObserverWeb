import { ComponentChildren, ComponentType, JSX } from 'preact'

export interface FastAlertItemStyleConfig {
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
  error: FastAlertItemStyleConfig

  warning: FastAlertItemStyleConfig

  success: FastAlertItemStyleConfig

  info: FastAlertItemStyleConfig
}
