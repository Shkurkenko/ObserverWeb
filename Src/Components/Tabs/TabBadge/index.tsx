import { FunctionalComponent } from 'preact'
import { cn } from '../../../Utils/Helpers'

export interface ITabBadgeProps {
  content: string | number

  isActive?: boolean

  variant?: 'default' | 'pills' | 'underline' | 'outline'

  size?: 'xs' | 'sm' | 'md'

  className?: string
}

export const TabBadge: FunctionalComponent<ITabBadgeProps> = ({
  content,
  isActive,
  variant = 'underline',
  size = 'sm',
  className,
}) => {
  const sizeClasses = {
    xs: 'min-w-4 h-4 px-1 text-xs',
    sm: 'min-w-5 h-5 px-1.5 text-xs',
    md: 'min-w-6 h-6 px-2 text-sm',
  }

  return (
    <span
      className={cn(
        'flex items-center justify-center',
        'font-medium rounded-full transition-colors',
        sizeClasses[size],
        isActive
          ? variant === 'pills'
            ? 'bg-white/20 text-white'
            : 'bg-primary/10 text-primary'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
        className,
      )}
      aria-label={`${content} элементов`}
    >
      {content}
    </span>
  )
}
