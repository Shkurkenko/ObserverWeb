import { cn } from '@Utils/Helpers'

export interface DividerProps {
  /** Дополнительные CSS классы */
  className?: string
  /** Вертикальное или горизонтальное расположение */
  vertical?: boolean
  /** Толщина линии разделителя */
  thickness?: 'thin' | 'medium' | 'thick'
  /** Цвет разделителя (Tailwind класс) */
  color?: string
  /** Пунктирная линия */
  dashed?: boolean
  /** Текст внутри разделителя (только для горизонтального) */
  label?: string
  /** Позиция текста внутри разделителя */
  labelPosition?: 'left' | 'center' | 'right'
}

/**
 * Компонент для визуального разделения контента.
 * Поддерживает горизонтальное и вертикальное разделение, различные стили и возможность добавления текста.
 *
 * @component
 * @example
 * // Базовый горизонтальный разделитель
 * <Divider />
 *
 * @example
 * // Вертикальный разделитель
 * <div className="flex h-10 gap-4">
 *   <span>Левый блок</span>
 *   <Divider vertical />
 *   <span>Правый блок</span>
 * </div>
 *
 * @example
 * // Разделитель с текстом по центру
 * <Divider label="ИЛИ" />
 *
 * @example
 * // Разделитель с текстом слева
 * <Divider label="Раздел 1" labelPosition="left" />
 *
 * @example
 * // Толстый пунктирный разделитель
 * <Divider thickness="thick" dashed />
 *
 * @example
 * // Кастомный цвет
 * <Divider color="border-blue-500 dark:border-blue-400" />
 *
 * @param props - Свойства компонента
 * @param props.vertical - Вертикальное разделение (по умолчанию false)
 * @param props.thickness - Толщина линии: 'thin' | 'medium' | 'thick' (по умолчанию 'medium')
 * @param props.color - Tailwind класс для цвета (по умолчанию 'border-gray-200 dark:border-gray-700')
 * @param props.dashed - Пунктирная линия (по умолчанию false)
 * @param props.label - Текст внутри разделителя (только для горизонтального режима)
 * @param props.labelPosition - Позиция текста: 'left' | 'center' | 'right' (по умолчанию 'center')
 * @param props.className - Дополнительные CSS классы
 * @param props - Остальные HTML-атрибуты (будут применены к корневому элементу)
 *
 * @returns JSX элемент разделителя
 */
export const Divider = ({
  vertical = false,
  thickness = 'medium',
  color = 'border-gray-200 dark:border-gray-700',
  dashed = false,
  label,
  labelPosition = 'center',
  className,
  ...props
}: DividerProps) => {
  /**
   * CSS классы для разной толщины разделителя
   * Для вертикального и горизонтального режимов используются разные стили
   */
  const thicknessClasses = {
    thin: vertical ? 'w-px' : 'h-px',
    medium: vertical ? 'w-[2px]' : 'h-[2px]',
    thick: vertical ? 'w-1' : 'h-1',
  }

  /**
   * Рендеринг разделителя с текстом (только для горизонтального режима)
   * Использует CSS псевдоэлементы для создания линий по бокам от текста
   */
  if (label && !vertical) {
    const labelPositionClasses = {
      left: 'before:w-4',
      center: 'before:flex-1 after:flex-1',
      right: 'after:w-4',
    }

    return (
      <div
        className={cn('flex items-center gap-4', labelPositionClasses[labelPosition], className)}
        {...props}
      >
        {/* Левая линия */}
        <div
          className={cn(
            'flex-1 h-px',
            color,
            dashed && 'border-dashed',
            thicknessClasses[thickness],
          )}
        />
        {/* Текст */}
        <span className='text-sm text-gray-500 whitespace-nowrap'>{label}</span>
        {/* Правая линия */}
        <div
          className={cn(
            'flex-1 h-px',
            color,
            dashed && 'border-dashed',
            thicknessClasses[thickness],
          )}
        />
      </div>
    )
  }

  /**
   * Рендеринг простого разделителя (без текста)
   * Использует hr для горизонтального и div с border для вертикального
   */
  const classes = cn(
    vertical ? 'h-auto self-stretch border-l' : 'w-full border-t',
    color,
    dashed && 'border-dashed',
    thicknessClasses[thickness],
    className,
  )

  return <hr className={classes} {...props} />
}
