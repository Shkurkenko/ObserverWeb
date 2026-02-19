import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { Box } from '@Components/Layouts/Box'
import { StylableProps } from '@Components/Shared/Common.types'

import { cn } from '../../../Utils/Helpers'

export interface AlertCloseProps extends StylableProps {
  /** Обработчик закрытия алерта */
  onClose?: (e: Event) => void
}

/**
 * Кнопка закрытия для компонента Alert.
 * Отображает иконку крестика и обрабатывает событие закрытия.
 *
 * @component
 * @example
 * // Базовое использование
 * <AlertClose onClose={() => console.log('closed')} />
 *
 * @example
 * // С кастомными классами
 * <AlertClose
 *   onClose={handleClose}
 *   className="absolute top-2 right-2"
 * />
 *
 * @example
 * // В составе Alert
 * <Alert>
 *   <AlertContent>Сообщение</AlertContent>
 *   <AlertClose onClose={handleClose} />
 * </Alert>
 *
 * @param props - Свойства компонента
 * @param props.onClose - Функция, вызываемая при клике на кнопку закрытия
 * @param props.className - Дополнительные CSS классы для стилизации
 *
 * @returns JSX элемент кнопки закрытия
 */
export const AlertClose = ({ onClose, className = '' }: AlertCloseProps) => {
  return (
    <Box className={cn('close-alert', className)} onClick={onClose}>
      <HugeiconsIcon icon={Cancel01Icon} />
    </Box>
  )
}
