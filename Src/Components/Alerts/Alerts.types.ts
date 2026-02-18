export const AlertLevel = {
  Default: 'default',

  Error: 'error',

  Success: 'success',

  Info: 'info',

  Warning: 'warning',
} as const

export type AlertLevelType = (typeof AlertLevel)[keyof typeof AlertLevel]

/** Базовый интерфейс алерта */
export interface Alert {
  /** Уникальный идентификатор */
  id: string
  /** Тип алерта */
  type?: AlertLevelType
  /** Заголовок */
  header: string
  /** Текст сообщения */
  message: string
  /** Временная метка (для сортировки) */
  timestamp?: string | Date
  /** Прочитан ли алерт */
  read?: boolean
  /** Дополнительные данные */
  metadata?: Record<string, unknown>
}
