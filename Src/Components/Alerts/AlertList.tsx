// AlertList.tsx
import { ComponentChildren } from 'preact'
import { AlertItem } from './AlertItem'
import { AlertLevel } from './Alerts.types'
import { Box } from '../Layouts/Box'
import { Stack } from '../Layouts/Stack'
import { type Alert } from './Alerts.types'
import { type StylableProps } from '../Shared/Common.types'
import { getAlertConfig } from './Alerts.config'

import { cn } from '../../Utils/Helpers'

// ==================== ТИПЫ ====================

/**
 * Функция для кастомного рендера отдельного алерта в списке
 * @param alert - объект алерта
 * @param onDismiss - функция закрытия алерта
 * @returns JSX элемент для алерта
 */
export type RenderAlertFunction = (
  alert: Alert,
  onDismiss?: (id: string) => void,
) => ComponentChildren

/**
 * Компонент для отображения пустого состояния списка
 */
export type EmptyStateComponent = ComponentChildren | (() => ComponentChildren)

/**
 * Пропсы для компонента AlertList
 */
export interface AlertListProps extends StylableProps {
  /** Массив алертов для отображения */
  alerts: Alert[]
  /** Колбек вызываемый при закрытии алерта */
  onAlertDismiss?: (id: string) => void
  /** Функция для кастомного рендера каждого алерта */
  renderAlert?: RenderAlertFunction
  /** Компонент для отображения когда список пуст */
  emptyState?: EmptyStateComponent
  /** Максимальная высота списка (CSS значение) */
  maxHeight?: string | number
  /** Направление сортировки (новые сверху или снизу) */
  sortDirection?: 'asc' | 'desc'
  /** Группировать алерты по типу */
  groupByType?: boolean
  /** Показывать заголовки групп */
  showGroupHeaders?: boolean
  /** Автоматическая очистка прочитанных алертов */
  autoClean?: boolean
}

/**
 * Сгруппированные алерты по типу
 */
export interface GroupedAlerts {
  [AlertLevel.Error]: Alert[]
  [AlertLevel.Success]: Alert[]
  [AlertLevel.Warning]: Alert[]
  [AlertLevel.Info]: Alert[]
  [AlertLevel.Default]: Alert[]
}

// ==================== КОМПОНЕНТ ====================

/**
 * Компонент для отображения списка алертов/уведомлений
 * Поддерживает сортировку, группировку, кастомный рендер и пустые состояния
 *
 * @example
 * ```tsx
 * // Простое использование
 * <AlertList
 *   alerts={alerts}
 *   onAlertDismiss={handleDismiss}
 * />
 *
 * // С кастомным рендером
 * <AlertList
 *   alerts={alerts}
 *   renderAlert={(alert, onDismiss) => (
 *     <MyCustomAlert
 *       data={alert}
 *       onClose={() => onDismiss?.(alert.id)}
 *     />
 *   )}
 * />
 *
 * // С группировкой по типу
 * <AlertList
 *   alerts={alerts}
 *   groupByType
 *   showGroupHeaders
 *   maxHeight="500px"
 * />
 *
 * // Кастомное пустое состояние
 * <AlertList
 *   alerts={[]}
 *   emptyState={
 *     <div className="text-center p-8">
 *       <img src="/no-alerts.svg" alt="Нет уведомлений" />
 *       <p>Все хорошо, уведомлений нет</p>
 *     </div>
 *   }
 * />
 * ```
 */
export const AlertList = ({
  alerts,
  onAlertDismiss,
  renderAlert,
  emptyState = 'Нет уведомлений',
  maxHeight = '100%',
  sortDirection = 'desc',
  groupByType = false,
  showGroupHeaders = false,
  autoClean = false,
  className = '',
  style = {},
  ...props
}: AlertListProps) => {
  // Сортировка алертов (новые сверху или снизу)
  let sortedAlerts = [...alerts].sort((a, b) => {
    const dateA = new Date(a.timestamp || 0).getTime()
    const dateB = new Date(b.timestamp || 0).getTime()
    return sortDirection === 'desc' ? dateB - dateA : dateA - dateB
  })

  // Автоматическая очистка старых алертов
  if (autoClean) {
    // Оставляем только алерты за последние 24 часа
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
    sortedAlerts = sortedAlerts.filter(
      (alert) => new Date(alert.timestamp || 0).getTime() > oneDayAgo,
    )
  }

  // Рендер пустого состояния
  if (!sortedAlerts.length) {
    return (
      <Box
        className={cn('flex items-center justify-center p-8 text-gray-400', className)}
        style={{ maxHeight, ...style }}
        {...props}
      >
        {typeof emptyState === 'function' ? emptyState() : emptyState}
      </Box>
    )
  }

  // Рендер с группировкой по типу
  if (groupByType) {
    const grouped = sortedAlerts.reduce<GroupedAlerts>((acc, alert) => {
      const type = alert.type || AlertLevel.Default
      if (!acc[type]) acc[type] = []
      acc[type].push(alert)
      return acc
    }, {} as GroupedAlerts)

    const groupOrder = [
      AlertLevel.Error,
      AlertLevel.Warning,
      AlertLevel.Success,
      AlertLevel.Info,
      AlertLevel.Default,
    ]

    return (
      <Box
        className={cn('overflow-y-auto scrollbar-thin', className)}
        style={{ maxHeight, ...style }}
        {...props}
      >
        <Stack className='gap-4 p-4'>
          {groupOrder.map((type) => {
            const groupAlerts = grouped[type]
            if (!groupAlerts?.length) return null

            return (
              <div key={type} className='alert-group'>
                {showGroupHeaders && (
                  <h3
                    className={cn(
                      'text-sm font-semibold mb-2 px-2',
                      `text-${getAlertConfig(type).colors.base}`,
                    )}
                  >
                    {getAlertConfig(type).defaultHeader} ({groupAlerts.length})
                  </h3>
                )}
                <Stack className='gap-2'>
                  {groupAlerts.map((alert) =>
                    renderAlert ? (
                      renderAlert(alert, onAlertDismiss)
                    ) : (
                      <AlertItem
                        key={alert.id}
                        id={alert.id}
                        type={alert.type}
                        header={alert.header}
                        message={alert.message}
                        onDismiss={onAlertDismiss}
                      />
                    ),
                  )}
                </Stack>
              </div>
            )
          })}
        </Stack>
      </Box>
    )
  }

  // Обычный рендер (без группировки)
  return (
    <Box
      className={cn('overflow-y-auto scrollbar-thin', className)}
      style={{ maxHeight, ...style }}
      {...props}
    >
      <Stack className='gap-2 p-4'>
        {sortedAlerts.map((alert) =>
          renderAlert ? (
            renderAlert(alert, onAlertDismiss)
          ) : (
            <AlertItem
              key={alert.id}
              id={alert.id}
              type={alert.type}
              header={alert.header}
              message={alert.message}
              onDismiss={onAlertDismiss}
            />
          ),
        )}
      </Stack>
    </Box>
  )
}
