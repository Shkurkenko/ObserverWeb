import { useContext } from 'preact/hooks'
import { AlertsContext } from './AlertsContext'

/**
 * Хук для доступа к системе управления алертами/уведомлениями.
 * Предоставляет методы для работы с алертами внутри компонентов.
 *
 * @throws {Error} Если хук используется вне AlertsProvider
 * @returns Объект с состоянием алертов и методами управления
 *
 * @example
 * // Базовая отправка уведомления
 * const MyComponent = () => {
 *   const { addAlert } = useAlerts()
 *
 *   const handleSuccess = () => {
 *     addAlert({
 *       type: AlertLevel.Success,
 *       header: 'Готово!',
 *       message: 'Операция выполнена успешно'
 *     })
 *   }
 *
 *   return <button onClick={handleSuccess}>Выполнить</button>
 * }
 *
 * @example
 * // Отображение списка алертов
 * const AlertContainer = () => {
 *   const { alerts, dismissAlert } = useAlerts()
 *
 *   return (
 *     <div className="alerts-container">
 *       {alerts.map(alert => (
 *         <AlertItem
 *           key={alert.id}
 *           {...alert}
 *           onDismiss={() => dismissAlert(alert.id)}
 *         />
 *       ))}
 *     </div>
 *   )
 * }
 *
 * @example
 * // Обработка ошибок API
 * const fetchData = async () => {
 *   try {
 *     const data = await api.getData()
 *     return data
 *   } catch (error) {
 *     const { addAlert } = useAlerts()
 *     addAlert({
 *       type: AlertLevel.Error,
 *       header: 'Ошибка загрузки',
 *       message: error.message
 *     })
 *   }
 * }
 *
 * @example
 * // Уведомление с автоматическим закрытием
 * const notifyAndDismiss = () => {
 *   const { addAlert, dismissAlert } = useAlerts()
 *
 *   const alertId = addAlert({
 *     type: AlertLevel.Info,
 *     header: 'Внимание',
 *     message: 'Это сообщение закроется через 5 секунд'
 *   })
 *
 *   setTimeout(() => dismissAlert(alertId), 5000)
 * }
 *
 * @example
 * // Массовые уведомления
 * const bulkNotifications = () => {
 *   const { addAlert } = useAlerts()
 *
 *   ['Файл 1', 'Файл 2', 'Файл 3'].forEach(filename => {
 *     addAlert({
 *       type: AlertLevel.Success,
 *       header: 'Загрузка завершена',
 *       message: `${filename} успешно загружен`
 *     })
 *   })
 * }
 *
 * @example
 * // Проверка наличия непрочитанных уведомлений
 * const NotificationBadge = () => {
 *   const { alerts } = useAlerts()
 *   const unreadCount = alerts.filter(alert => !alert.read).length
 *
 *   return unreadCount > 0 ? (
 *     <span className="badge">{unreadCount}</span>
 *   ) : null
 * }
 */
export const useAlerts = () => {
  const context = useContext(AlertsContext)

  if (!context) {
    throw new Error('useAlerts must be used within an AlertsProvider')
  }

  const { alerts, addAlert, dismissAlert } = context

  return { alerts, addAlert, dismissAlert }
}
