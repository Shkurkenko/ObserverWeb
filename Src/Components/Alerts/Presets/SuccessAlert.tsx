import { CheckmarkCircle04Icon } from '@hugeicons/core-free-icons'
import { AlertRoot } from '../Components/AlertRoot'
import { AlertIcon } from '../Components/AlertIcon'
import { AlertHeader } from '../Components/AlertHeader'
import { AlertMessage } from '../Components/AlertMessage'
import { AlertClose } from '../Components/AlertClose'
import { HugeiconsIcon } from '@hugeicons/react'

export interface SuccessAlertProps {
  /** Заголовок алерта об успехе */
  header: string
  /** Текст сообщения об успехе */
  message: string
  /** Обработчик закрытия алерта */
  onClose?: () => void
}

/**
 * Готовый компонент алерта для отображения успешных операций.
 * Использует предустановленный зеленый цвет и иконку успеха.
 *
 * @component
 * @example
 * // Базовый алерт успеха
 * <SuccessAlert
 *   header="Успешно!"
 *   message="Изменения сохранены"
 * />
 *
 * @example
 * // Алерт с возможностью закрытия
 * <SuccessAlert
 *   header="Готово"
 *   message="Данные экспортированы"
 *   onClose={() => setShowSuccess(false)}
 * />
 *
 * @example
 * // Успешная отправка формы
 * <SuccessAlert
 *   header="Форма отправлена"
 *   message="Мы свяжемся с вами в ближайшее время"
 *   onClose={resetForm}
 * />
 *
 * @example
 * // Успешное обновление
 * <SuccessAlert
 *   header="Обновление завершено"
 *   message="Версия 2.0.0 успешно установлена"
 *   onClose={handleRefresh}
 * />
 *
 * @param props - Свойства компонента
 * @param props.header - Заголовок успеха (обязательно)
 * @param props.message - Текст сообщения (обязательно)
 * @param props.onClose - Функция закрытия алерта (опционально)
 *
 * @returns JSX элемент алерта успеха
 */
export const SuccessAlert = ({ header, message, onClose }: SuccessAlertProps) => {
  const color = '#4CAF50'

  return (
    <AlertRoot color={color} variant='success'>
      <AlertIcon color={color}>
        <HugeiconsIcon icon={CheckmarkCircle04Icon} size={28} />
      </AlertIcon>

      <AlertHeader color={color}>{header}</AlertHeader>
      <AlertMessage>{message}</AlertMessage>

      {onClose && <AlertClose onClose={onClose} />}
    </AlertRoot>
  )
}
