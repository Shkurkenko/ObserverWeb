import { StylableProps } from '@Components/Shared/Common.types'
import { AlertRoot } from '../Components/AlertRoot'
import { AlertClose } from '../Components/AlertClose'
import { AlertHeader } from '../Components/AlertHeader'
import { AlertIcon } from '../Components/AlertIcon'
import { AlertMessage } from '../Components/AlertMessage'
import { HugeiconsIcon } from '@hugeicons/react'
import { InformationSquareIcon } from '@hugeicons/core-free-icons'

interface InfoAlertProps extends StylableProps {
  /** Заголовок информационного алерта */
  header: string
  /** Текст информационного сообщения */
  message: string
  /** Обработчик закрытия алерта */
  onClose?: () => void
}

/**
 * Готовый компонент алерта для отображения информационных сообщений.
 * Использует предустановленный синий цвет и иконку информации.
 *
 * @component
 * @example
 * // Базовая информация
 * <InfoAlert
 *   header="Новое обновление"
 *   message="Доступна новая версия приложения 2.0.0"
 * />
 *
 * @example
 * // Информация с возможностью закрытия
 * <InfoAlert
 *   header="Изменение в политике"
 *   message="Обновлены условия использования сервиса"
 *   onClose={() => setShowInfo(false)}
 * />
 *
 * @example
 * // Подсказка для пользователя
 * <InfoAlert
 *   header="Совет"
 *   message="Вы можете использовать горячие клавиши Ctrl+S для сохранения"
 *   onClose={dismissTip}
 *   className="mb-4"
 * />
 *
 * @example
 * // Информация о статусе
 * <InfoAlert
 *   header="Статус системы"
 *   message="Все системы работают в штатном режиме"
 * />
 *
 * @param props - Свойства компонента
 * @param props.header - Заголовок информации (обязательно)
 * @param props.message - Текст сообщения (обязательно)
 * @param props.onClose - Функция закрытия алерта (опционально)
 * @param props.className - Дополнительные CSS классы (опционально)
 *
 * @returns JSX элемент информационного алерта
 */
export const InfoAlert = ({ header, message, onClose, className = '' }: InfoAlertProps) => {
  const color = '#2a86cf'

  return (
    <AlertRoot color={color} variant='info' className={className}>
      <AlertIcon color={color}>
        <HugeiconsIcon icon={InformationSquareIcon} size={28} />
      </AlertIcon>

      <AlertHeader color={color}>{header}</AlertHeader>
      <AlertMessage>{message}</AlertMessage>

      {onClose && <AlertClose onClose={onClose} />}
    </AlertRoot>
  )
}
