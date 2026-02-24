import { forwardRef } from 'preact/compat'
import { Box, IBoxProps } from '../Box'

import { cn } from '@Utils/Helpers'

// Generic интерфейс для Flex
export interface FlexProps<
  T extends keyof preact.JSX.IntrinsicElements | preact.FunctionalComponent<any> = 'div',
> extends Omit<IBoxProps<T>, 'direction' | 'justify' | 'align' | 'gap' | 'wrap' | 'inline'> {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch'
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse'
  inline?: boolean
}

const directionClasses = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
}

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  stretch: 'justify-stretch',
  evenly: 'justify-evenly',
}

const alignClasses = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const gapClasses = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const wrapClasses = {
  true: 'flex-wrap',
  false: 'flex-nowrap',
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
}

// Generic компонент Flex
export const Flex = forwardRef(
  <T extends keyof preact.JSX.IntrinsicElements | preact.FunctionalComponent<any> = 'div'>(
    props: FlexProps<T>,
    ref: any,
  ) => {
    const {
      children,
      as = 'div',
      direction = 'row',
      justify = 'start',
      align = 'stretch',
      gap = 'md',
      wrap = false,
      inline = true,
      className,
      ...restProps
    } = props

    const wrapClass =
      typeof wrap === 'boolean'
        ? wrapClasses[wrap.toString() as keyof typeof wrapClasses]
        : wrapClasses[wrap]

    return (
      <Box
        as={as}
        ref={ref}
        className={cn(
          inline ? 'inline-flex' : 'flex',
          directionClasses[direction],
          justifyClasses[justify],
          alignClasses[align],
          gapClasses[gap],
          wrapClass,
          className,
        )}
        {...restProps}
      >
        {children}
      </Box>
    )
  },
) as <T extends keyof preact.JSX.IntrinsicElements | preact.FunctionalComponent<any> = 'div'>(
  props: FlexProps<T>,
) => preact.JSX.Element
