import { AlertLevel, AlertLevelType } from '../Alerts/Alerts.types'
import { ToastSystemConfig, ToastTypeConfig } from './Toast.types'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  CancelCircleIcon,
  CheckmarkCircle04Icon,
  Alert01Icon,
  InformationSquareIcon,
} from '@hugeicons/core-free-icons'

/**
 * Конфигурация стилей для каждого типа тоста
 */
const TOAST_TYPE_STYLES: Record<AlertLevelType, ToastTypeConfig> = {
  [AlertLevel.Error]: {
    styles: {
      background: '#341b2a',
      color: '#ecc6c9',
      borderColor: '#4b1d2c',
      iconColor: '#ea5233',
      progressColor: '#ea5233',
    },
    defaultIcon: <HugeiconsIcon icon={CancelCircleIcon} size={20} />,
    defaultTTL: 5000,
    defaultProgressBar: true,
  },
  [AlertLevel.Success]: {
    styles: {
      background: '#0e2a2c',
      color: '#b9f8b5',
      borderColor: '#0d3b30',
      iconColor: '#5dad58',
      progressColor: '#5dad58',
    },
    defaultIcon: <HugeiconsIcon icon={CheckmarkCircle04Icon} size={20} />,
    defaultTTL: 4000,
    defaultProgressBar: true,
  },
  [AlertLevel.Warning]: {
    styles: {
      background: '#262724',
      color: '#fef9b8',
      borderColor: '#322f22',
      iconColor: '#fad947',
      progressColor: '#fad947',
    },
    defaultIcon: <HugeiconsIcon icon={Alert01Icon} size={20} />,
    defaultTTL: 6000,
    defaultProgressBar: true,
  },
  [AlertLevel.Info]: {
    styles: {
      background: '#12233e',
      color: '#8ec5ff',
      borderColor: '#162c54',
      iconColor: '#0288D1',
      progressColor: '#0288D1',
    },
    defaultIcon: <HugeiconsIcon icon={InformationSquareIcon} size={20} />,
    defaultTTL: 4000,
    defaultProgressBar: true,
  },
  [AlertLevel.Default]: {
    styles: {
      background: '#2d2d2d',
      color: '#e0e0e0',
      borderColor: '#404040',
      iconColor: '#9e9e9e',
      progressColor: '#9e9e9e',
    },
    defaultIcon: <HugeiconsIcon icon={InformationSquareIcon} size={20} />,
    defaultTTL: 4000,
    defaultProgressBar: true,
  },
}

/**
 * Глобальная конфигурация системы тостов
 */
export const TOAST_CONFIG: ToastSystemConfig = {
  defaultPosition: 'bottom-right',
  maxToasts: 5,
  defaultAnimation: 'slide',
  animationDuration: 300,
  gap: 12,
  offset: 24,
  width: 360,
  types: TOAST_TYPE_STYLES,
}

/**
 * Получить конфигурацию для типа тоста
 */
export const getToastTypeConfig = (type: AlertLevelType): ToastTypeConfig => {
  return TOAST_TYPE_STYLES[type]
}

/**
 * Получить иконку для типа тоста
 */
export const getToastIcon = (type: AlertLevelType): preact.ComponentChildren => {
  return TOAST_TYPE_STYLES[type].defaultIcon
}
