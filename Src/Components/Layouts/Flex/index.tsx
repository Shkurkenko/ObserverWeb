import { ComponentChildren, FunctionalComponent } from 'preact'
import { cn } from '../../../Utils/Helpers'
import { Box, IBoxProps } from '../Box'

export interface IFlexProps extends IBoxProps {
  /** Направление flex контейнера */
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'

  /** Выравнивание по главной оси */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch'

  /** Выравнивание по поперечной оси */
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'

  /** Расстояние между элементами */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Перенос элементов на новую строку */
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse'

  /** Инлайн flex */
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

export const Flex: FunctionalComponent<IFlexProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  gap = 'md',
  wrap = false,
  inline = false,
  className,
  ...props
}) => {
  const wrapClass =
    typeof wrap === 'boolean'
      ? wrapClasses[wrap.toString() as keyof typeof wrapClasses]
      : wrapClasses[wrap]

  return (
    <Box
      as='div'
      className={cn(
        inline ? 'inline-flex' : 'flex',
        directionClasses[direction],
        justifyClasses[justify], // ← Добавлено
        alignClasses[align],
        gapClasses[gap],
        wrapClass,
        className,
      )}
      {...props}
    >
      {children}
    </Box>
  )
}

// Дополнительные пресеты для удобства
export const FlexPresets = {
  /** Центрированный flex контейнер */
  Center: (props: Omit<IFlexProps, 'justify' | 'align'>) => (
    <Flex justify='center' align='center' {...props} />
  ),

  /** Flex с элементами по краям */
  Between: (props: Omit<IFlexProps, 'justify'>) => <Flex justify='between' {...props} />,

  /** Вертикальный стек */
  Stack: (props: Omit<IFlexProps, 'direction'>) => <Flex direction='col' {...props} />,

  /** Горизонтальный ряд с выравниванием по центру */
  RowCenter: (props: Omit<IFlexProps, 'direction' | 'justify' | 'align'>) => (
    <Flex direction='row' justify='center' align='center' {...props} />
  ),
}
