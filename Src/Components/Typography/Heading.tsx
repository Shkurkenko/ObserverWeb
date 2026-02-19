import { CSSProperties } from 'preact'
import { HeadingLevel, BaseTypographyProps } from './Typography.types'
import { cn } from '../../Utils/Helpers'

export interface IHeadingProps extends BaseTypographyProps {
  /** Уровень заголовка от 1 (самый большой) до 6 (самый маленький) */
  level?: HeadingLevel
  /** HTML-тег для рендеринга (по умолчанию соответствует level) */
  as?: `h${HeadingLevel}` | 'div'
  /** Дополнительные CSS классы */
  className?: string
  /** Inline стили */
  style?: CSSProperties
}

/**
 * CSS классы для разных уровней заголовков
 * Адаптивные размеры для мобильных (по умолчанию) и десктопов (md:)
 */
const headingClasses: Record<HeadingLevel, string> = {
  1: `text-4xl md:text-5xl font-bold tracking-tight`,
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-2xl md:text-3xl font-semibold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg md:text-xl font-medium',
  6: 'text-base md:text-lg font-medium',
}

/**
 * CSS классы для разных цветовых вариантов
 * Поддерживает светлую и темную тему
 */
const colorClasses = {
  primary: 'text-gray-900 dark:text-white',
  secondary: 'text-gray-700 dark:text-gray-300',
  success: 'text-green-700 dark:text-green-300',
  warning: 'text-yellow-700 dark:text-yellow-300',
  error: 'text-red-700 dark:text-red-300',
  disabled: 'text-gray-400 dark:text-gray-500',
}

/**
 * Компонент для отображения заголовков разных уровней.
 * Следует иерархии документа и поддерживает различные стили оформления.
 * Адаптируется под мобильные и десктоп устройства.
 *
 * @component
 * @example
 * // Заголовок первого уровня
 * <Heading level={1}>Главный заголовок</Heading>
 *
 * @example
 * // Заголовок второго уровня с другим цветом
 * <Heading level={2} color="secondary">Второстепенный заголовок</Heading>
 *
 * @example
 * // Заголовок с кастомным HTML-тегом
 * <Heading level={3} as="div">Заголовок в div</Heading>
 *
 * @example
 * // Все уровни заголовков
 * <Heading level={1}>Уровень 1</Heading>
 * <Heading level={2}>Уровень 2</Heading>
 * <Heading level={3}>Уровень 3</Heading>
 * <Heading level={4}>Уровень 4</Heading>
 * <Heading level={5}>Уровень 5</Heading>
 * <Heading level={6}>Уровень 6</Heading>
 *
 * @example
 * // Разные цветовые варианты
 * <Heading level={3} color="success">Успешный заголовок</Heading>
 * <Heading level={3} color="warning">Предупреждающий заголовок</Heading>
 * <Heading level={3} color="error">Заголовок об ошибке</Heading>
 *
 * @example
 * // С дополнительными классами и стилями
 * <Heading
 *   level={2}
 *   className="uppercase tracking-wider"
 *   style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
 * >
 *   Стилизованный заголовок
 * </Heading>
 *
 * @param props - Свойства компонента
 * @param props.level - Уровень заголовка: 1 | 2 | 3 | 4 | 5 | 6 (по умолчанию 1)
 * @param props.as - HTML-тег: h1-h6 или div (по умолчанию соответствует level)
 * @param props.color - Цвет текста: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'disabled' (по умолчанию 'primary')
 * @param props.children - Содержимое заголовка
 * @param props.className - Дополнительные CSS классы
 * @param props.style - Inline стили
 * @param props - Остальные HTML-атрибуты
 *
 * @returns JSX элемент заголовка
 */
export const Heading = ({
  level = 1,
  as: Component = `h${level}` as `h${HeadingLevel}`,
  children,
  color = 'primary',
  className = '',
  style = {},
  ...props
}: IHeadingProps) => {
  /**
   * Объединение всех классов:
   * - Стили для конкретного уровня заголовка
   * - Цветовые стили
   * - Специальный класс для заголовков (font-heading)
   * - Пользовательские классы
   */
  const classes = cn(headingClasses[level], colorClasses[color], 'font-heading', className)

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  )
}
