import { AlertLevelType } from '../Alerts/Alerts.types'

/**
 * Позиции тостов на экране
 */
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'

/**
 * Анимации появления/исчезновения
 */
export type ToastAnimation = 'slide' | 'fade' | 'pop' | 'none'

/**
 * Интерфейс тоста
 */
export interface Toast {
  /** Уникальный идентификатор */
  id: string
  /** Тип тоста */
  type: AlertLevelType
  /** Заголовок */
  header: string
  /** Сообщение */
  message?: string
  /** Время жизни в мс (0 - бесконечно) */
  ttl?: number
  /** Показывать прогресс-бар */
  progressBar?: boolean
  /** Показывать кнопку закрытия */
  closable?: boolean
  /** Кастомная иконка */
  icon?: preact.ComponentChildren
  /** Временная метка */
  timestamp?: Date
  /** Видимость */
  visible?: boolean
  /** Действия (кнопки) */
  actions?: ToastAction[]
  /** Метаданные */
  metadata?: Record<string, any>
}

/**
 * Действие в тосте
 */
export interface ToastAction {
  /** Текст кнопки */
  label: string
  /** Обработчик клика */
  onClick: () => void
  /** Вариант кнопки */
  variant?: 'primary' | 'secondary' | 'outline'
}

/**
 * Конфигурация для создания тоста
 */
export type ToastConfig = Omit<Toast, 'id' | 'timestamp' | 'visible'> & {
  id?: string
}

/**
 * Стили для типа тоста
 */
export interface ToastTypeStyles {
  /** Цвет фона */
  background: string
  /** Цвет текста */
  color: string
  /** Цвет границы */
  borderColor: string
  /** Цвет иконки */
  iconColor: string
  /** Цвет прогресс-бара */
  progressColor: string
}

/**
 * Конфигурация типа тоста
 */
export interface ToastTypeConfig {
  /** Стили */
  styles: ToastTypeStyles
  /** Иконка по умолчанию */
  defaultIcon: preact.ComponentChildren
  /** Время жизни по умолчанию */
  defaultTTL: number
  /** Прогресс-бар по умолчанию */
  defaultProgressBar: boolean
}

/**
 * Конфигурация системы тостов
 */
export interface ToastSystemConfig {
  /** Позиция по умолчанию */
  defaultPosition: ToastPosition
  /** Максимальное количество */
  maxToasts: number
  /** Анимация по умолчанию */
  defaultAnimation: ToastAnimation
  /** Длительность анимации */
  animationDuration: number
  /** Интервал между тостами */
  gap: number
  /** Отступы от краев */
  offset: number
  /** Ширина тоста */
  width: number
  /** Конфигурации по типам */
  types: Record<AlertLevelType, ToastTypeConfig>
}
