/**
 * Уровни/типы алертов в системе
 * Используется для определения внешнего вида и поведения алерта
 *
 * @example
 * ```tsx
 * // Использование в компоненте
 * <Alert type={AlertLevel.Error} header="Ошибка" message="..." />
 * ```
 */

export const AlertLevel = {
  /** Просто серый алерт */

  Default: 'default',

  /** Алерт об ошибке (красный) */

  Error: 'error',

  /** Алерт об успешном выполнении (зеленый) */
  Success: 'success',

  /** Информационный алерт (синий) */
  Info: 'info',

  /** Предупреждение (желтый) */
  Warning: 'warning',
} as const

/**
 * Тип уровня алерта
 * Объединение всех возможных значений AlertLevel
 *
 * @example
 * ```typescript
 * let type: AlertLevelType = AlertLevel.Error // ✅
 * 
 * let type: AlertLevelType = 'error' // ✅
 * 
 * let type: AlertLevelType = 'critical' // ❌ ошибка типов
 * ```
 */
export type AlertLevelType = (typeof AlertLevel)[keyof typeof AlertLevel]

/**
 * Базовый интерфейс алерта
 * Представляет собой уведомление в системе
 *
 * @example
 * ```typescript
 * const alert: Alert = {
 *   id: '123e4567-e89b-12d3-a456-426614174000',
 *   type: AlertLevel.Error,
 *   header: 'Ошибка загрузки',
 *   message: 'Не удалось загрузить данные пользователя',
 *   timestamp: new Date(),
 *   read: false,
 *   ttl: 5000,
 *   metadata: {
 *     userId: '123',
 *     errorCode: 404
 *   }
 * }
 * ```
 */
export interface Alert {
  /** Уникальный идентификатор алерта (обычно UUID) */
  id: string

  /** Тип алерта (определяет цвет, иконку и поведение) */
  type: AlertLevelType

  show?: boolean

  /** Заголовок алерта (краткое описание) */
  header: string

  /** Текст сообщения (подробное описание) */
  message: string

  /** Временная метка создания алерта (для сортировки) */
  timestamp?: string | Date

  /** Флаг прочитан/не прочитан */
  read?: boolean

  /**
   * Время жизни алерта в миллисекундах
   * @remarks
   * - 0 или undefined - бесконечное время жизни
   * - >0 - авто-закрытие через указанное количество миллисекунд
   *
   * @example
   * 3000 - закроется через 3 секунды
   * 0 - не закроется автоматически
   */
}
