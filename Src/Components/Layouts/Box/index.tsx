import { ComponentChildren, FunctionalComponent, createElement, JSX } from 'preact'
import { forwardRef } from 'preact/compat'
import { cn } from '../../../Utils/Helpers'

// Generic интерфейс для Box
export interface IBoxProps<
  T extends keyof JSX.IntrinsicElements | FunctionalComponent<any> = 'div',
> {
  as?: T
  children?: ComponentChildren
  className?: string
  style?: JSX.CSSProperties
  hidden?: boolean
  'data-testid'?: string
  [key: string]: any
}

// Тип для ref на основе элемента
type ElementType<T> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T] extends JSX.HTMLAttributes<infer E>
    ? E
    : HTMLElement
  : T extends FunctionalComponent<infer P>
    ? P extends { ref?: infer R }
      ? R
      : any
    : any

// Универсальный Box с generic
export const Box = forwardRef(
  <T extends keyof JSX.IntrinsicElements | FunctionalComponent<any> = 'div'>(
    props: IBoxProps<T>,
    ref: ElementType<T>,
  ) => {
    const {
      children,
      as: Component = 'div',
      className,
      hidden,
      style,
      'data-testid': dataTestId,
      ...restProps
    } = props

    return createElement(
      Component,
      {
        ref,
        className: cn(className, hidden && 'hidden'),
        style,
        'data-testid': dataTestId,
        ...restProps,
      } as any,
      children,
    )
  },
) as <T extends keyof JSX.IntrinsicElements | FunctionalComponent<any> = 'div'>(
  props: IBoxProps<T>,
) => JSX.Element
