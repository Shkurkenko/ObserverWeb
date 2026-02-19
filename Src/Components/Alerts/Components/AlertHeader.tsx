import { StylableProps } from '@Components/Shared/Common.types'
import { Heading } from '@Components/Typography'

export interface AlertHeaderProps extends StylableProps {
  /** Заголовок алерта */
  children: string
  /** Цвет заголовка (CSS цвет или переменная) */
  color?: string
}

/**
 * Заголовок для компонента Alert.
 * Использует компонент Heading 4-го уровня для отображения заголовка.
 *
 * @component
 * @example
 * // Базовое использование
 * <AlertHeader>Внимание!</AlertHeader>
 *
 * @example
 * // С кастомным цветом
 * <AlertHeader color="#FF0000">Ошибка валидации</AlertHeader>
 *
 * @example
 * // С дополнительными классами
 * <AlertHeader className="uppercase tracking-wide">
 *   Важное сообщение
 * </AlertHeader>
 *
 * @example
 * // В составе Alert
 * <Alert>
 *   <AlertHeader color="var(--color-error)">
 *     Ошибка сохранения
 *   </AlertHeader>
 *   <AlertContent>Проверьте подключение к интернету</AlertContent>
 * </Alert>
 *
 * @param props - Свойства компонента
 * @param props.children - Текст заголовка (обязательно)
 * @param props.color - Цвет заголовка (опционально)
 * @param props.className - Дополнительные CSS классы (опционально)
 *
 * @returns JSX элемент заголовка алерта
 */
export const AlertHeader = ({ children, color, className = '' }: AlertHeaderProps) => {
  return (
    <Heading level={4} className={className} style={{ color }}>
      {children}
    </Heading>
  )
}
