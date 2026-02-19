import { ComponentChildren } from 'preact'
import { StylableProps } from '@Components/Shared/Common.types'
import { Box } from '@Components/Layouts/Box'
import { AlertLevelType } from '../Alerts.types'

import { cn } from '@Utils/Helpers'

interface AlertRootProps extends StylableProps {
  /** Содержимое алерта (заголовок, иконка, сообщение, кнопка закрытия) */
  children: ComponentChildren
  /** Цвет левой границы алерта (CSS цвет или переменная) */
  color?: string
  /** Вариант алерта для применения предустановленных стилей */
  variant?: AlertLevelType
}

/**
 * Корневой контейнер для компонента Alert.
 * Управляет общими стилями, позиционированием и цветовой индикацией.
 *
 * @component
 * @example
 * // Базовый алерт
 * <AlertRoot>
 *   <AlertIcon>ℹ️</AlertIcon>
 *   <AlertMessage>Информационное сообщение</AlertMessage>
 * </AlertRoot>
 *
 * @example
 * // Алерт с предустановленным вариантом
 * <AlertRoot variant="success">
 *   <AlertIcon>✅</AlertIcon>
 *   <AlertHeader>Успех!</AlertHeader>
 *   <AlertMessage>Операция выполнена</AlertMessage>
 * </AlertRoot>
 *
 * @example
 * // Алерт с кастомным цветом границы
 * <AlertRoot color="#FF6B6B">
 *   <AlertIcon>⚠️</AlertIcon>
 *   <AlertHeader>Внимание</AlertHeader>
 *   <AlertMessage>Проверьте данные</AlertMessage>
 * </AlertRoot>
 *
 * @example
 * // Алерт с кнопкой закрытия
 * <AlertRoot variant="warning">
 *   <AlertIcon>⚠️</AlertIcon>
 *   <div className="flex-1">
 *     <AlertHeader>Предупреждение</AlertHeader>
 *     <AlertMessage>Заполните обязательные поля</AlertMessage>
 *   </div>
 *   <AlertClose onClose={handleClose} />
 * </AlertRoot>
 *
 * @example
 * // Комплексный пример со всеми элементами
 * <AlertRoot
 *   variant="error"
 *   className="mb-4 shadow-lg"
 *   style={{ borderRadius: '12px' }}
 * >
 *   <AlertIcon>❌</AlertIcon>
 *   <div className="flex-1">
 *     <AlertHeader>Ошибка сохранения</AlertHeader>
 *     <AlertMessage>
 *       Не удалось сохранить изменения. Проверьте подключение к интернету.
 *     </AlertMessage>
 *   </div>
 *   <AlertClose onClose={() => setShowAlert(false)} />
 * </AlertRoot>
 *
 * @param props - Свойства компонента
 * @param props.children - Содержимое алерта (обязательно)
 * @param props.variant - Вариант алерта: 'default' | 'success' | 'warning' | 'error' | 'info' (по умолчанию 'default')
 * @param props.color - Кастомный цвет левой границы (опционально)
 * @param props.className - Дополнительные CSS классы (опционально)
 * @param props.style - Inline стили (опционально)
 * @param props - Остальные HTML-атрибуты
 *
 * @returns JSX элемент корневого контейнера алерта
 */
export const AlertRoot = ({
  children,
  color,
  variant = 'default',
  className = '',
  style = {},
  ...props
}: AlertRootProps) => {
  const variantClass = variant !== 'default' ? `alert-${variant}` : ''

  return (
    <Box
      className={cn('alert-item pr-6 overflow-hidden', variantClass, className)}
      style={{
        borderLeft: color ? `0.25rem solid ${color}` : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
