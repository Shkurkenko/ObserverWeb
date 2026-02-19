import { AlertRoot } from '../Components/AlertRoot'
import { AlertClose } from '../Components/AlertClose'
import { AlertHeader } from '../Components/AlertHeader'
import { AlertIcon } from '../Components/AlertIcon'
import { AlertMessage } from '../Components/AlertMessage'
import { HugeiconsIcon } from '@hugeicons/react'
import { CancelCircleIcon } from '@hugeicons/core-free-icons'
import { type StylableProps } from '../../Shared/Common.types'

interface ErrorAlertProps extends StylableProps {
  /** Заголовок алерта об ошибке */
  header: string
  /** Текст сообщения об ошибке */
  message: string
  /** Обработчик закрытия алерта */
  onClose?: () => void
}

/**
 * Готовый компонент алерта для отображения ошибок.
 * Использует предустановленный красный цвет и иконку ошибки.
 *
 * @component
 * @example
 * // Базовая ошибка
 * <ErrorAlert
 *   header="Ошибка сохранения"
 *   message="Не удалось сохранить изменения"
 * />
 *
 * @example
 * // Ошибка с возможностью закрытия
 * <ErrorAlert
 *   header="Ошибка сети"
 *   message="Проверьте подключение к интернету"
 *   onClose={() => setShowError(false)}
 * />
 *
 * @example
 * // Ошибка валидации формы
 * <ErrorAlert
 *   header="Некорректные данные"
 *   message="Пожалуйста, заполните все обязательные поля"
 *   onClose={clearErrors}
 *   className="mb-4"
 * />
 *
 * @example
 * // Критическая ошибка
 * <ErrorAlert
 *   header="Системная ошибка"
 *   message="Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу."
 *   onClose={handleReload}
 * />
 *
 * @param props - Свойства компонента
 * @param props.header - Заголовок ошибки (обязательно)
 * @param props.message - Текст ошибки (обязательно)
 * @param props.onClose - Функция закрытия алерта (опционально)
 * @param props.className - Дополнительные CSS классы (опционально)
 *
 * @returns JSX элемент алерта ошибки
 */
export const ErrorAlert = ({ header, message, onClose, className = '' }: ErrorAlertProps) => {
  const color = '#F44336'

  return (
    <AlertRoot color={color} variant='error' className={className}>
      <AlertIcon color={color}>
        <HugeiconsIcon icon={CancelCircleIcon} size={28} />
      </AlertIcon>

      <AlertHeader color={color}>{header}</AlertHeader>
      <AlertMessage>{message}</AlertMessage>

      {onClose && <AlertClose onClose={onClose} />}
    </AlertRoot>
  )
}
