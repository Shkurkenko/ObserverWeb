import { FunctionalComponent } from 'preact'

import { cn } from '@Utils/Helpers'

export interface TabIndicatorProps {
  type: 'new-data' | 'error' | 'success' | 'warning'

  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

  size?: 'xs' | 'sm' | 'md'

  animated?: boolean

  className?: string
}

export const TabIndicator: FunctionalComponent<TabIndicatorProps> = ({
  type,
  size = 'sm',
  position = 'top-right',
  animated = false,
  className,
}) => {
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  }

  const sizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
  }

  const colorClasses = {
    'new-data': 'bg-blue-500',
    error: 'bg-red-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
  }

  return (
    <span
      className={cn(
        'absolute rounded-full border-2 border-white dark:border-gray-900',
        positionClasses[position],
        sizeClasses[size],
        colorClasses[type],
        animated && 'animate-pulse',
        className,
      )}
      aria-label={
        type === 'new-data'
          ? 'Новые данные'
          : type === 'error'
            ? 'Ошибка'
            : type === 'success'
              ? 'Успешно'
              : 'Предупреждение'
      }
    ></span>
  )
}
