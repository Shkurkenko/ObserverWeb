import { Box } from '../../Layouts/Box'
import { ComponentChildren } from 'preact'
import { cn } from '../../../Utils/Helpers'

export interface ToastRootProps {
  /** Содержимое тоста */
  children: ComponentChildren
  /** Видимость */
  visible?: boolean
  /** Анимация */
  animation?: 'slide' | 'fade' | 'pop' | 'none'
  /** Длительность анимации */
  duration?: number
  /** Фон */
  background?: string
  /** Цвет границы */
  borderColor?: string
  /** Дополнительные классы */
  className?: string
  /** Обработчик клика */
  onClick?: () => void
  /** Обработчик наведения */
  onMouseEnter?: () => void
  /** Обработчик ухода мыши */
  onMouseLeave?: () => void
}

/**
 * Корневой контейнер тоста
 * Управляет анимациями и базовыми стилями
 */
export const ToastRoot = ({
  children,
  visible = true,
  animation = 'slide',
  duration = 300,
  background,
  borderColor,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ToastRootProps) => {
  const animationClasses = {
    slide: visible ? 'animate-slideIn' : 'animate-slideOut',
    fade: visible ? 'animate-fadeIn' : 'animate-fadeOut',
    pop: visible ? 'animate-popIn' : 'animate-popOut',
    none: '',
  }

  return (
    <Box
      className={cn(
        'relative w-full overflow-hidden rounded-lg shadow-lg',
        'transition-all cursor-pointer',
        animationClasses[animation],
        !visible && 'pointer-events-none',
        className,
      )}
      style={{
        backgroundColor: background,
        borderLeft: borderColor ? `4px solid ${borderColor}` : undefined,
        animationDuration: `${duration}ms`,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Box>
  )
}
