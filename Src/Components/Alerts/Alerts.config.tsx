import { type AlertLevelType, AlertLevel } from './Alerts.types'
import {
  Alert01Icon,
  InformationSquareIcon,
  CheckmarkCircle04Icon,
  CancelCircleIcon,
} from '@hugeicons/core-free-icons'

export const ALERT_COLORS: Record<AlertLevelType, string> = {
  [AlertLevel.Default]: 'gray',
  [AlertLevel.Error]: 'red',
  [AlertLevel.Info]: 'blue',
  [AlertLevel.Success]: 'green',
  [AlertLevel.Warning]: 'yellow',
} as const

export const ALERT_ICONS = {
  [AlertLevel.Error]: 'cancel-circle',
  [AlertLevel.Info]: 'information-square',
  [AlertLevel.Success]: 'checkmark-circle',
  [AlertLevel.Warning]: 'alert',
  // Default без иконки
} as const

export const ICON_COMPONENTS = {
  'cancel-circle': CancelCircleIcon,
  'information-square': InformationSquareIcon,
  'checkmark-circle': CheckmarkCircle04Icon,
  alert: Alert01Icon,
} as const
