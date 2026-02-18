import { type AlertLevelType, AlertLevel } from './Alerts.types'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  CancelCircleIcon,
  InformationSquareIcon,
  CheckmarkCircle04Icon,
  Alert01Icon,
} from '@hugeicons/core-free-icons'

// Конфиг цветов и иконок (как в твоем ObserverConfig)
const ALERTS_CONFIG = {
  [AlertLevel.Error]: {
    color: '#F44336',
    icon: <HugeiconsIcon icon={CancelCircleIcon} size={28} />,
  },
  [AlertLevel.Info]: {
    color: '#2a86cf',
    icon: <HugeiconsIcon icon={InformationSquareIcon} size={28} />,
  },
  [AlertLevel.Success]: {
    color: '#4CAF50',
    icon: <HugeiconsIcon icon={CheckmarkCircle04Icon} size={28} />,
  },
  [AlertLevel.Warning]: {
    color: '#e9c731',
    icon: <HugeiconsIcon icon={Alert01Icon} size={28} />,
  },
  [AlertLevel.Default]: {
    color: '#9E9E9E',
    icon: <HugeiconsIcon icon={InformationSquareIcon} size={28} />,
  },
} as const

export const getAlertConfig = (type: AlertLevelType) => {
  return ALERTS_CONFIG[type] || ALERTS_CONFIG[AlertLevel.Default]
}
