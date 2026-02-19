// Основные компоненты
export { AlertItem } from './AlertItem'
export { AlertRoot } from './Components/AlertRoot'

// Дочерние компоненты алерта
export { AlertClose } from './Components/AlertClose'
export { AlertHeader } from './Components/AlertHeader'
export { AlertIcon } from './Components/AlertIcon'
export { AlertMessage } from './Components/AlertMessage'

// Контекст и провайдер
export { AlertsProvider } from './AlertsContext'
export { useAlerts } from './UseAlerts'

// Конфигурация и типы
export {
  getAlertConfig,
  getAlertIconComponent,
  getAlertBaseColor,
  getAlertClasses,
  isValidAlertType,
  ALERT_COLORS,
  ALERT_ICONS,
  ALERT_DEFAULT_HEADERS,
  ALERT_ARIA_LABELS,
  ALERT_TAILWIND_CLASSES,
  ALERT_PRIORITIES,
  ALERT_ANIMATIONS,
  ALERT_AUTO_CLOSE_TIMES,
} from './Alerts.config'

export { AlertLevel } from './Alerts.types'
export type { Alert, AlertLevelType } from './Alerts.types'

export type {
  AlertColorPalette,
  AlertIconConfig,
  AlertTailwindClasses,
  AlertConfig,
} from './Alerts.config'

export type {
  AlertItemProps,
  CustomAlertProps,
  CustomRenderProps,
  RenderIconFunction,
  RenderHeaderFunction,
  RenderMessageFunction,
} from './AlertItem'

// Готовые пресеты алертов
export { ErrorAlert } from './Presets/ErrorAlert'
export { SuccessAlert } from './Presets/SuccessAlert'
export { WarningAlert } from './Presets/WarningAlert'
export { InfoAlert } from './Presets/InfoAlert'

// Компонент списка
export { AlertList } from './AlertList'
export type {
  AlertListProps,
  RenderAlertFunction,
  EmptyStateComponent,
  GroupedAlerts,
} from './AlertList'
