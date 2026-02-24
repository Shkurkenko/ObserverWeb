import { Box } from '@Components/Layouts/Box'
import { Icon } from '@Components/Typography'

import { cn } from '@Utils/Helpers'

export interface ToastIconProps {
  /** Иконка */
  children?: preact.ComponentChildren
  /** Цвет иконки */
  color?: string
  /** Размер */
  size?: 'sm' | 'md' | 'lg'
  /** Дополнительные классы */
  className?: string
}

/**
 * Иконка тоста
 */
export const ToastIcon = ({ children, color, size = 'md', className }: ToastIconProps) => {
  if (!children) return null

  return (
    <Box className={cn('shrink-0', className)} style={{ color }}>
      <Icon size={size}>{children}</Icon>
    </Box>
  )
}
