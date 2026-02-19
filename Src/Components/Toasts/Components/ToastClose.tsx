import { Box } from '../../Layouts/Box'
import { cn } from '../../../Utils/Helpers'

export interface ToastCloseProps {
  /** Обработчик закрытия */
  onClose?: () => void
  /** Цвет кнопки */
  color?: string
  /** Дополнительные классы */
  className?: string
}

/**
 * Кнопка закрытия тоста
 */
export const ToastClose = ({ onClose, color, className }: ToastCloseProps) => {
  return (
    <Box
      className={cn(
        'shrink-0 cursor-pointer opacity-60 hover:opacity-100 transition-opacity',
        'rounded-full p-1 hover:bg-black/10',
        className,
      )}
      onClick={(e: Event) => {
        e.stopPropagation()
        onClose?.()
      }}
      style={{ color }}
    >
      <svg
        className='w-5 h-5'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M6 18L18 6M6 6l12 12' strokeLinecap='round' />
      </svg>
    </Box>
  )
}
