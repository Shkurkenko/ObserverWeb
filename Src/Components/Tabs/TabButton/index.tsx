import { ComponentChild, FunctionalComponent } from 'preact'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { Icon } from '../../Typography'
import { Button, IButtonProps } from '../../Button'
import { cn } from '../../../Utils/Helpers'

// Объявляем пропсы с обобщенным типом T
export interface TabButtonProps extends Omit<
  IButtonProps,
  'children' | 'onClick' | 'variant' | 'size'
> {
  tabData: ITab
  isActive: boolean
  onClick?: (e: MouseEvent, tab: ITab) => void
  variant?: 'default' | 'underline' | 'pills' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  showCount?: boolean
  icon?: ComponentChild
  iconSize?: 'xs' | 'sm' | 'md' | 'lg'
  badge?: number | string
}

const variantClasses = {
  default: {
    active: 'text-primary font-semibold',
    inactive: 'text-on-surface-variant hover:text-on-surface',
  },
  underline: {
    active: 'text-primary font-semibold border-b-2 border-primary',
    inactive:
      'text-on-surface-variant border-b-2 border-transparent hover:text-on-surface hover:border-outline',
  },
  pills: {
    active: 'bg-primary text-on-primary font-semibold',
    inactive: 'text-on-surface-variant hover:bg-surface-container-high',
  },
  outline: {
    active: 'border border-primary text-primary font-semibold',
    inactive:
      'border border-outline text-on-surface-variant hover:border-outline-variant hover:text-on-surface',
  },
}

const sizeClasses = {
  sm: {
    padding: 'py-1.5 px-3',
    text: 'text-sm',
    icon: 'sm' as const,
    badge: 'min-w-5 h-5 px-1.5 text-xs',
  },
  md: {
    padding: 'py-2.5 px-4',
    text: 'text-base',
    icon: 'md' as const,
    badge: 'min-w-6 h-6 px-2 text-sm',
  },
  lg: {
    padding: 'py-3 px-5',
    text: 'text-lg',
    icon: 'lg' as const,
    badge: 'min-w-7 h-7 px-2.5 text-base',
  },
}

// Используем функцию вместо FunctionalComponent
export function TabButton<T>({
  tabData,
  isActive,
  onClick,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  showCount = false,
  icon: propIcon,
  iconSize,
  badge: propBadge,
  className,
  ...buttonProps
}: TabButtonProps) {
  const handleClick = (e: MouseEvent) => {
    if (tabData.disabled || tabData.loading) {
      e.preventDefault()
      return
    }

    onClick?.(e, tabData)
  }

  const badgeContent = propBadge || (showCount ? tabData.count?.toString() : tabData.badge)
  const icon = propIcon || tabData.icon
  const currentSize = sizeClasses[size]
  const iconSizeFinal = iconSize || currentSize.icon

  // Определяем стили и тип кнопки для нашего Button компонента
  let buttonVariant: IButtonProps['variant'] = 'text'
  let additionalClasses = ''

  if (variant === 'pills' && isActive) {
    buttonVariant = 'primary'
  } else if (variant === 'outline') {
    buttonVariant = 'outline'
  }

  // Дополнительные классы для разных вариантов
  if (variant === 'underline') {
    additionalClasses = cn(
      'rounded-none border-b-2',
      isActive ? 'border-primary text-primary' : 'border-transparent',
    )
  } else if (variant === 'pills' && !isActive) {
    additionalClasses = 'bg-transparent'
  }

  return (
    <Button
      aria-selected={isActive}
      aria-controls={`tabpanel-${tabData.id}`}
      disabled={tabData.disabled}
      loading={tabData.loading}
      onClick={handleClick}
      variant={buttonVariant}
      size={size}
      fullWidth={fullWidth}
      leftIcon={
        icon && !tabData.loading ? (
          <Icon
            size={iconSizeFinal}
            className={cn(
              isActive && variant === 'pills' ? 'text-on-primary' : 'text-on-surface-variant',
            )}
          >
            {icon}
          </Icon>
        ) : undefined
      }
      className={cn(
        currentSize.text,
        variant !== 'underline' && currentSize.padding,
        additionalClasses,
        // Специфичные для табов стили
        variant === 'pills' && !isActive && 'hover:bg-surface-container-high',
        className,
      )}
      {...buttonProps}
    >
      {tabData.label}

      {badgeContent && (
        <span
          className={cn(
            'cursor-pointer',
            'ml-2 flex items-center justify-center font-medium rounded-full',
            currentSize.badge,
            isActive && variant === 'pills'
              ? 'bg-on-primary/20 text-on-primary'
              : 'bg-surface-container-high text-on-surface-variant',
          )}
        >
          {badgeContent}
        </span>
      )}
    </Button>
  )
}

// Обновляем пресеты
export const TabButtonPresets = {
  Pill: <T,>(props: Omit<TabButtonProps, 'variant'>) => <TabButton<T> variant='pills' {...props} />,

  UnderlineSmall: <T,>(props: Omit<TabButtonProps, 'variant' | 'size'>) => (
    <TabButton<T> variant='underline' size='sm' {...props} />
  ),

  OutlineLarge: <T,>(props: Omit<TabButtonProps, 'variant' | 'size'>) => (
    <TabButton<T> variant='outline' size='lg' {...props} />
  ),
}
