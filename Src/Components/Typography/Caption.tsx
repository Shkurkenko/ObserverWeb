import { CaptionVariant, BaseTypographyProps } from './Typography.types'
import { cn } from '../../Utils/Helpers'
import { StylableProps } from '../Shared/Common.types'

export interface ICaptionProps extends BaseTypographyProps, StylableProps {
  /** Вариант размера подписи */
  variant?: CaptionVariant
  /** HTML-элемент для рендеринга */
  as?: 'span' | 'div' | 'p'
}

/**
 * Компонент для отображения подписей и вспомогательного текста.
 * Поддерживает различные размеры, цвета и семантические HTML-элементы.
 * Идеально подходит для подписей к полям ввода, меток, дополнительной информации и мелкого текста.
 *
 * @component
 * @example
 * // Базовое использование
 * <Caption>Обычная подпись</Caption>
 *
 * @example
 * // Разные варианты размера
 * <Caption variant="small">Маленькая подпись</Caption>
 * <Caption variant="medium">Средняя подпись</Caption>
 * <Caption variant="large">Большая подпись</Caption>
 *
 * @example
 * // Разные цветовые варианты
 * <Caption color="success">Успешная операция</Caption>
 * <Caption color="warning">Предупреждение</Caption>
 * <Caption color="error">Ошибка</Caption>
 *
 * @example
 * // С кастомным HTML-элементом
 * <Caption as="div">Текст в div</Caption>
 * <Caption as="p">Текст в параграфе</Caption>
 *
 * @example
 * // С дополнительными CSS классами
 * <Caption className="mt-2 uppercase">С отступами и трансформацией</Caption>
 *
 * @param props - Свойства компонента
 * @param props.variant - Размер текста: 'small' | 'medium' | 'large' (по умолчанию 'medium')
 * @param props.as - HTML-тег для рендеринга: 'span' | 'div' | 'p' (по умолчанию 'span')
 * @param props.color - Цвет текста: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'disabled' (по умолчанию 'secondary')
 * @param props.className - Дополнительные CSS классы
 * @param props.children - Содержимое компонента
 * @param props - Остальные HTML-атрибуты
 *
 * @returns JSX элемент с подписью
 */
export const Caption = ({
  variant = 'medium',
  as: Component = 'span',
  children,
  color = 'secondary',
  className = '',
  style = {},
  ...props
}: ICaptionProps) => {
  /**
   * CSS классы для разных размеров текста
   */
  const variantClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }

  /**
   * CSS классы для разных цветовых вариантов
   * Поддерживает светлую и темную тему
   */
  const colorClasses = {
    primary: 'text-gray-600 dark:text-gray-400',
    secondary: 'text-gray-500 dark:text-gray-500',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    disabled: 'text-gray-400 dark:text-gray-500',
  }

  /**
   * Объединение всех классов с использованием утилиты cn
   * Базовые классы включают оптимальный межстрочный интервал (leading-tight)
   */
  const classes = cn(variantClasses[variant], colorClasses[color], 'leading-tight', className)

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  )
}
