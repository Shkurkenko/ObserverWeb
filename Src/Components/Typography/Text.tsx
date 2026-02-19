import { cn } from '../../Utils/Helpers'
import { TextVariant, BaseTypographyProps } from './Typography.types'
import { CSSProperties } from 'preact'

export interface ITextProps extends BaseTypographyProps {
  /** Вариант текста (предопределенные стили) */
  variant?: TextVariant
  /** HTML-тег для рендеринга */
  as?: 'p' | 'span' | 'div'
  /** Жирное начертание */
  bold?: boolean
  /** Курсив */
  italic?: boolean
  /** Подчеркнутый текст */
  underline?: boolean
  /** Обрезать текст с многоточием */
  truncate?: boolean
  /** Выравнивание текста */
  align?: 'left' | 'center' | 'right' | 'justify'
  /** Дополнительные CSS классы */
  className?: string
  /** Inline стили */
  style?: CSSProperties
}

const variantClasses: Record<TextVariant, string> = {
  body1: 'text-base leading-normal',
  body2: 'text-sm leading-normal',
  body3: 'text-xs leading-normal',
  overline: 'text-xs uppercase tracking-wider',
  button: 'text-sm font-medium uppercase tracking-wide',
}

const colorClasses: Record<NonNullable<BaseTypographyProps['color']>, string> = {
  primary: 'text-gray-900 dark:text-white',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
  disabled: 'text-gray-400 dark:text-gray-500 cursor-not-allowed',
}

/**
 * Компонент для отображения текста с различными стилями и вариантами
 *
 * @example
 * // Базовый текст
 * <Text>Обычный текст</Text>
 *
 * @example
 * // Разные варианты текста
 * <Text variant="body1">Основной текст</Text>
 * <Text variant="body2">Второстепенный текст</Text>
 * <Text variant="overline">Надстрочный текст</Text>
 * <Text variant="button">Текст кнопки</Text>
 *
 * @example
 * // Стилизация текста
 * <Text bold italic underline>
 *   Жирный курсив с подчеркиванием
 * </Text>
 *
 * @example
 * // Цветовые варианты
 * <Text color="success">Успешный текст</Text>
 * <Text color="warning">Предупреждение</Text>
 * <Text color="error">Ошибка</Text>
 *
 * @example
 * // Выравнивание
 * <Text align="center">По центру</Text>
 * <Text align="right">Справа</Text>
 *
 * @example
 * // Текст с многоточием
 * <Text truncate className="w-32">
 *   Очень длинный текст, который будет обрезан
 * </Text>
 *
 * @example
 * // Кастомный HTML-тег
 * <Text as="span">Текст в span</Text>
 * <Text as="div">Текст в div</Text>
 */
export const Text = ({
  variant = 'body1',
  as: Component = 'p',
  className = '',
  children,
  color = 'primary',
  bold = false,
  italic = false,
  underline = false,
  truncate = false,
  align = 'left',
  style = {},
  ...props
}: ITextProps) => {
  const classes = cn(
    variantClasses[variant],
    colorClasses[color],
    bold && 'font-semibold',
    italic && 'italic',
    underline && 'underline',
    truncate && 'truncate',
    `text-${align}`,
    className,
  )

  return (
    <Component className={classes} {...props} style={style}>
      {children}
    </Component>
  )
}
