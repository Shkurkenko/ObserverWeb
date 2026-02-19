import { StylableProps } from '@Components/Shared/Common.types'
import { AlertRoot } from '../Components/AlertRoot'
import { AlertClose } from '../Components/AlertClose'
import { AlertHeader } from '../Components/AlertHeader'
import { AlertIcon } from '../Components/AlertIcon'
import { AlertMessage } from '../Components/AlertMessage'
import { HugeiconsIcon } from '@hugeicons/react'
import { Alert01Icon } from '@hugeicons/core-free-icons'

interface WarningAlertProps extends StylableProps {
  /** Заголовок предупреждения */
  header: string
  /** Текст сообщения */
  message: string
  /** Обработчик закрытия */
  onClose?: () => void
}

/**
 * Готовый компонент алерта для отображения предупреждений.
 * Использует предустановленный желтый цвет и иконку предупреждения.
 *
 * @component
 * @example
 * // Базовое предупреждение
 * <WarningAlert
 *   header="Внимание"
 *   message="Действие может быть необратимым"
 * />
 *
 * @example
 * // Предупреждение с возможностью закрытия
 * <WarningAlert
 *   header="Несохраненные изменения"
 *   message="У вас есть несохраненные изменения. Вы уверены, что хотите выйти?"
 *   onClose={() => setShowWarning(false)}
 * />
 *
 * @example
 * // Предупреждение о лимите
 * <WarningAlert
 *   header="Лимит исчерпан"
 *   message="Вы достигли лимита бесплатных запросов. Обновите тариф для продолжения."
 *   onClose={handleUpgrade}
 * />
 *
 * @param props - Свойства компонента
 * @param props.header - Заголовок предупреждения
 * @param props.message - Текст предупреждения
 * @param props.onClose - Функция закрытия
 * @param props.className - Дополнительные CSS классы
 *
 * @returns JSX элемент алерта предупреждения
 */
export const WarningAlert = ({ header, message, onClose, className = '' }: WarningAlertProps) => {
  const color = '#e9c731'

  return (
    <AlertRoot color={color} variant='warning' className={className}>
      <AlertIcon color={color}>
        <HugeiconsIcon icon={Alert01Icon} size={28} />
      </AlertIcon>

      <AlertHeader color={color}>{header}</AlertHeader>
      <AlertMessage>{message}</AlertMessage>

      {onClose && <AlertClose onClose={onClose} />}
    </AlertRoot>
  )
}
