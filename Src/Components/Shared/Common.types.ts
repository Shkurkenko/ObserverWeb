import { CSSProperties } from 'preact'

/**
 * Компонент с возможностью добавления CSS классов
 *
 * @description Используется для компонентов, которые могут быть
 * дополнительно стилизованы через внешние CSS классы. Позволяет
 * переопределять или дополнять стили компонента извне.
 *
 * @example
 * ```tsx
 * // В интерфейсе компонента
 * interface ButtonProps extends WithClassName {
 *   label: string
 * }
 *
 * // Использование
 * <Button
 *   className="my-custom-class another-class"
 *   label="Click me"
 * />
 * ```
 */
export type WithClassName = {
  /**
   * Дополнительные CSS классы для кастомизации компонента
   *
   * - Можно передавать несколько классов через пробел
   * - Классы применяются к корневому элементу компонента
   * - Позволяет переопределять стили через CSS
   *
   * @example "btn btn-primary mt-4"
   * @example "custom-class theme-dark"
   */
  className?: string
}

/**
 * Компонент с возможностью добавления inline стилей
 *
 * @description Используется для компонентов, которым может потребоваться
 * динамическое изменение стилей через JavaScript или переопределение
 * стилей на уровне элемента.
 *
 * @example
 * ```tsx
 * // В интерфейсе компонента
 * interface BoxProps extends WithStyle {
 *   content: string
 * }
 *
 * // Использование
 * <Box
 *   style={{
 *     color: 'red',
 *     fontSize: '16px',
 *     marginTop: '10px'
 *   }}
 *   content="Hello"
 * />
 * ```
 */
export type WithStyle = {
  /**
   * Inline стили для прямого управления CSS свойствами
   *
   * - Имеют приоритет над классами
   * - Полезно для динамических значений
   * - Поддерживает CSS-in-JS паттерны
   * - Принимает любой валидный CSSProperties объект
   *
   * @example { color: 'red', backgroundColor: '#f0f0f0' }
   * @example { margin: '10px', padding: '20px' }
   * @example { transform: 'rotate(90deg)', transition: 'all 0.3s' }
   */
  style?: CSSProperties
}

/**
 * Компонент с полной поддержкой стилизации
 *
 * @description Объединяет возможности добавления CSS классов
 * и inline стилей. Рекомендуется использовать как базовый тип
 * для всех компонентов, которым может потребоваться внешняя стилизация.
 *
 * @augments WithClassName
 * @augments WithStyle
 *
 * @example
 * ```tsx
 * // В интерфейсе компонента
 * interface CardProps extends StylableProps {
 *   title: string
 *   content: string
 * }
 *
 * // Использование с классами и стилями одновременно
 * <Card
 *   className="card shadow-lg"
 *   style={{ borderRadius: '8px' }}
 *   title="Заголовок"
 *   content="Контент"
 * />
 *
 * // Использование только с классами
 * <Card
 *   className="card"
 *   title="Заголовок"
 *   content="Контент"
 * />
 *
 * // Использование только со стилями
 * <Card
 *   style={{ border: '1px solid black' }}
 *   title="Заголовок"
 *   content="Контент"
 * />
 * ```
 *
 * @remarks
 * **Порядок применения стилей:**
 * 1. Базовые стили компонента
 * 2. CSS классы из `className`
 * 3. Inline стили из `style` (имеют наивысший приоритет)
 *
 * **Когда использовать:**
 * - Для переиспользуемых UI компонентов
 * - Когда компонент может использоваться в разных контекстах
 * - Для библиотек компонентов
 * - Когда нужна гибкость в стилизации
 */
export type StylableProps = WithClassName & WithStyle
