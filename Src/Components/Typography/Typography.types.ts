/**
 * Типы и интерфейсы для системы типографики
 * @module Typography.types
 */

/**
 * Варианты текстового контента
 * - body1: Основной текст (16px)
 * - body2: Второстепенный текст (14px)
 * - body3: Мелкий текст (12px)
 * - overline: Надстрочный текст (12px, uppercase)
 * - button: Текст кнопок (14px, uppercase, medium)
 */
export type TextVariant = 'body1' | 'body2' | 'body3' | 'overline' | 'button'

/**
 * Уровни заголовков от 1 (самый большой) до 6 (самый маленький)
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

/**
 * Варианты размера для компонента Caption
 * - small: 12px
 * - medium: 14px
 * - large: 16px
 */
export type CaptionVariant = 'small' | 'medium' | 'large'

/**
 * Размеры иконок от xs (12x12) до 2xl (40x40)
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Цветовые варианты для типографики
 * - primary: Основной текст
 * - secondary: Второстепенный текст
 * - success: Успех (зеленый)
 * - warning: Предупреждение (желтый)
 * - error: Ошибка (красный)
 * - disabled: Отключенное состояние
 */
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'disabled'

/**
 * Базовые пропсы для всех компонентов типографики
 */
export interface BaseTypographyProps {
  /** Дополнительные CSS классы */
  className?: string
  /** Содержимое компонента */
  children?: preact.ComponentChildren
  /** Цвет текста */
  color?: ColorVariant
}
