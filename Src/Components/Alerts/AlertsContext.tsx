import { Alert } from './Alerts.types'
import { createContext, ComponentChildren } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { v4 as uuidv4 } from 'uuid'

/**
 * Контекст для управления алертами/уведомлениями в приложении.
 * Предоставляет доступ к списку алертов и методам управления ими.
 */
export interface AlertsContext {
  /** Текущий список алертов */
  alerts: Alert[]
  /** Добавить новый алерт */
  addAlert: (alert: Alert) => void
  /** Удалить алерт по ID */
  dismissAlert: (id: string) => void
}

/**
 * Пропсы для провайдера контекста алертов
 */
export interface AlertsProviderProps {
  /** Дочерние компоненты, которые будут иметь доступ к контексту */
  children: ComponentChildren
}

/**
 * Контекст для управления системой уведомлений
 * @example
 * const { alerts, addAlert, dismissAlert } = useContext(AlertsContext)
 */
export const AlertsContext = createContext<AlertsContext | null>(null)

/**
 * Провайдер контекста для управления алертами в приложении.
 * Хранит состояние алертов и предоставляет методы для их добавления/удаления.
 *
 * @component
 * @example
 * // Оборачиваем приложение
 * <AlertsProvider>
 *   <App />
 * </AlertsProvider>
 *
 * @example
 * // Использование в компоненте
 * const MyComponent = () => {
 *   const { addAlert } = useContext(AlertsContext)!
 *
 *   const handleError = () => {
 *     addAlert({
 *       type: AlertLevel.Error,
 *       header: 'Ошибка',
 *       message: 'Что-то пошло не так',
 *       timestamp: new Date(),
 *       read: false
 *     })
 *   }
 *
 *   return <button onClick={handleError}>Показать ошибку</button>
 * }
 *
 * @example
 * // Автоматическое закрытие алертов
 * const { addAlert, dismissAlert } = useContext(AlertsContext)!
 *
 * const showTemporaryAlert = () => {
 *   const id = uuidv4()
 *   addAlert({
 *     id,
 *     type: AlertLevel.Success,
 *     header: 'Успешно',
 *     message: 'Изменения сохранены'
 *   })
 *
 *   setTimeout(() => dismissAlert(id), 3000)
 * }
 *
 * @param props - Свойства компонента
 * @param props.children - Дочерние компоненты
 *
 * @returns Провайдер контекста с состоянием алертов
 */
export const AlertsProvider = ({ children }: AlertsProviderProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([])

  /**
   * Добавляет новый алерт в список.
   * Автоматически генерирует уникальный ID, если он не передан.
   *
   * @param alert - Объект алерта (может быть без id)
   * @example
   * addAlert({
   *   type: AlertLevel.Info,
   *   header: 'Информация',
   *   message: 'Новое сообщение'
   * })
   */
  const addAlert = useCallback((alert: Alert) => {
    const id = uuidv4()
    setAlerts((prev: Alert[]) => [...prev, { ...alert, id }])
  }, [])

  /**
   * Удаляет алерт из списка по его ID.
   *
   * @param id - Уникальный идентификатор алерта
   * @example
   * dismissAlert('123e4567-e89b-12d3-a456-426614174000')
   */
  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert: Alert) => alert.id !== id))
  }, [])

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, dismissAlert }}>
      {children}
    </AlertsContext.Provider>
  )
}