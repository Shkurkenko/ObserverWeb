import { type StylableProps } from '../../Shared/Common.types'
import { Box } from '../../Layouts/Box'
import { Text } from '../../Typography'
import { cn } from '../../../Utils/Helpers'

export interface AlertMessageProps extends StylableProps {
  /** Текст сообщения алерта */
  children: string
}

/**
 * Текстовое сообщение для компонента Alert.
 * Отображает основной контент алерта с ограничением в 3 строки.
 *
 * @component
 * @example
 * // Базовое использование
 * <AlertMessage>Ваше сообщение здесь</AlertMessage>
 *
 * @example
 * // Длинное сообщение (обрежется до 3 строк)
 * <AlertMessage>
 *   Это очень длинное сообщение, которое будет обрезано после трех строк
 *   и получит многоточие в конце...
 * </AlertMessage>
 *
 * @example
 * // С дополнительными классами
 * <AlertMessage className="text-sm text-gray-600">
 *   Сообщение с кастомными стилями
 * </AlertMessage>
 *
 * @example
 * // В составе Alert
 * <Alert>
 *   <AlertHeader>Успешно</AlertHeader>
 *   <AlertMessage>
 *     Ваши изменения успешно сохранены
 *   </AlertMessage>
 * </Alert>
 *
 * @param props - Свойства компонента
 * @param props.children - Текст сообщения (обязательно)
 * @param props.className - Дополнительные CSS классы для кастомизации (опционально)
 *
 * @returns JSX элемент сообщения алерта
 */
export const AlertMessage = ({ children, className = '' }: AlertMessageProps) => {
  return (
    <Box as='article' className='alert-content text-wrap'>
      <Text className={cn('ml-5 line-clamp-3', className)}>{children}</Text>
    </Box>
  )
}
