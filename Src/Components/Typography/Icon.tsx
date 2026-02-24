import { isValidElement, cloneElement } from 'preact'
import { IconSize } from './Typography.types'

import { cn } from '@Utils/Helpers'

export interface IconProps {
  /** Дополнительные CSS классы */
  className?: string
  /** Размер иконки */
  size?: IconSize
  /** Цвет иконки */
  color?: string
  /** Толщина обводки */
  strokeWidth?: number
  /** SVG иконка */
  children?: preact.ComponentChildren
  /** Обработчик клика */
  onClick?: (event: MouseEvent) => void
  /** Метка для доступности */
  ariaLabel?: string
  /** Состояние загрузки */
  loading?: boolean
  /** Индикатор ошибки */
  error?: boolean
  /** Индикатор новых данных */
  hasNewData?: boolean
  /** Активное состояние */
  active?: boolean
}

const sizeClasses: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
}

/**
 * Компонент для отображения иконок с поддержкой состояний и индикаторов
 *
 * @example
 * // Базовая иконка
 * <Icon>
 *   <svg>...</svg>
 * </Icon>
 *
 * @example
 * // Иконка с индикатором ошибки
 * <Icon error>
 *   <svg>...</svg>
 * </Icon>
 *
 * @example
 * // Иконка в состоянии загрузки
 * <Icon loading />
 *
 * @example
 * // Кликабельная иконка
 * <Icon onClick={handleClick} ariaLabel="Меню">
 *   <svg>...</svg>
 * </Icon>
 */
export const Icon = ({
  className,
  size = 'md',
  color = 'currentColor',
  strokeWidth = 2,
  children,
  onClick,
  ariaLabel,
  loading = false,
  error = false,
  hasNewData = false,
  active = false,
  ...props
}: IconProps) => {
  const classes = cn(
    'inline-flex items-center justify-center',
    'fill-current',
    sizeClasses[size],
    onClick && 'cursor-pointer',
    className,
  )

  const iconContent = isValidElement(children)
    ? cloneElement(children, {
        width: '100%',
        height: '100%',
        stroke: color,
        'stroke-width': strokeWidth,
        fill: color === 'currentColor' ? 'none' : color,
      })
    : children

  return (
    <span
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <span
          className='w-full h-full border-2 border-gray-300 border-t-current rounded-full animate-spin'
          aria-hidden='true'
        />
      ) : (
        iconContent
      )}

      {error && (
        <span
          className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white'
          aria-label='Ошибка'
        />
      )}

      {hasNewData && (
        <span
          className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse'
          aria-label='Новые данные'
        />
      )}
    </span>
  )
}
