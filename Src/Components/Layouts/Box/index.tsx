import { ComponentChildren, FunctionalComponent, createElement } from 'preact'
import { forwardRef } from 'preact/compat'
import { cn } from '../../../Utils/Helpers'

// Простой интерфейс Box
export interface IBoxProps {
  /** HTML элемент для рендера (по умолчанию 'div') */
  as?: keyof preact.JSX.IntrinsicElements | FunctionalComponent<any>

  /** Дочерние элементы */
  children?: ComponentChildren

  /** CSS классы */
  className?: string

  /** Встроенные стили */
  style?: preact.JSX.CSSProperties

  /** Скрыть элемент */
  hidden?: boolean

  /** ID для тестирования */
  'data-testid'?: string

  /** Любые другие HTML атрибуты */
  [key: string]: any
}

// Используем createElement напрямую
export const Box = forwardRef<preact.JSX.IntrinsicElements | FunctionalComponent<any>, IBoxProps>(
  (
    {
      children,
      as: Component = 'div',
      className,
      hidden,
      style,
      'data-testid': dataTestId,
      ...props
    },
    ref,
  ) => {
    return createElement(
      Component,
      {
        ref,
        className: cn(className, hidden && 'hidden'),
        style,
        'data-testid': dataTestId,
        ...props,
      },
      children,
    )
  },
)
