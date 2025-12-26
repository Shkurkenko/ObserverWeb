import { ComponentChild } from 'preact'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { Container } from '../../Layouts/Container'
import { Icon } from '../../Typography'
import { cn } from '../../../Utils/Helpers'

import './style.sass'

export interface ITabButtonProps<T> {
  tabData: ITab<T>

  isActive: boolean

  handleClick?: (e: MouseEvent, tab: ITab<T>) => void

  variant?: ITab<T>['variant']

  size?: ITab<T>['size']

  fullWidth?: boolean

  showCount?: boolean

  icon?: ComponentChild

  iconSize?: 'xs' | 'sm' | 'md' | 'lg'

  badge?: number | string

  className: string
}

const variantClasses = {
  default: {
    active: 'text-primary fornt-semibold',
    inactive: 'text-gray-500 hover:text-on-background',
  },
  underline: {
    active: 'text-primary font-semibold border-b-2 border-primary',
    inactive: 'text-gray-500 border-transparent hover:text-on-background',
  },
  pills: {
    active: 'bg-primary text-white font-semibold rounded-full',
    inactive: 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800',
  },
  outline: {
    active: 'border-2 border-primary text-primary font-semibold',
    inactive: 'border-2 border-transparent text-gray-500 hover:border-gray-300',
  },
}

const sizeClasses = {
  sm: {
    container: 'py-1.5 px-3',
    text: 'text-sm',
    icon: 'sm' as const,
  },
  md: {
    container: 'py-2.5 px-4',
    text: 'text-base',
    icon: 'md' as const,
  },
  lg: {
    container: 'py-3 px-5',
    text: 'text-lg',
    icon: 'lg' as const,
  },
}

const badgeSizeClasses = {
  sm: 'min-w-5 h-5 px-1.5 text-xs',
  md: 'min-w-6 h-6 px-2 text-sm',
  lg: 'min-w-7 h-7 px-2.5 text-base',
}

export function TabButton<T>({
  tabData,
  isActive,
  handleClick,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  showCount = false,
  icon: propIcon,
  iconSize,
  badge: propBadge,
  className,
}: ITabButtonProps<T>) {
  const handleButtonClick = async (e: MouseEvent) => {
    if (tabData.disabled || tabData.loading) {
      e.preventDefault()
      return
    }

    try {
      let shouldProceed = true

      if (tabData.onBeforeClick) {
        shouldProceed = await tabData.onBeforeClick(tabData)
      }

      if (shouldProceed && handleClick) {
        handleClick(e, tabData)
      }

      if (shouldProceed && tabData.onAfterClick) {
        tabData.onAfterClick(tabData)
      }
    } catch (error) {
      console.error('Error in tab click handler: ', error)
    }
  }

  const badgeContent = propBadge || (showCount ? tabData.count?.toString() : tabData.badge)
  const icon = propIcon || tabData.icon
  const currentSize = sizeClasses[size]
  const iconSizeFinal = iconSize || currentSize.icon

  return (
    <Container
      as='button'
      type='button'
      size={fullWidth ? 'full' : 'fluid'}
      align='center'
      paddingX='none'
      paddingY='none'
      background={variant === 'pills' && isActive ? 'primary' : 'transparent'}
      rounded={variant === 'pills' ? 'full' : variant === 'outline' ? 'md' : 'none'}
      border={variant === 'outline' && isActive ? 'thin' : 'none'}
      borderColor={variant === 'outline' && isActive ? 'primary' : 'transparent'}
      className={cn(
        'group relative',
        'inline-flex items-center gap-x-2 whitespace-nowrap',
        'transition-all duration-200 ease-in-out',
        'focus:outline-hidden focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
        currentSize.container,
        fullWidth && 'w-full justify-center',
        variant !== 'pills' && variant !== 'outline' && currentSize.text,
        sizeClasses[size],
        fullWidth && 'w-full justify-center',
        variantClasses[variant][isActive ? 'active' : 'inactive'],
        tabData.disabled && 'cursor-not-allowed',
        tabData.loading && 'opacity-70 cursor-wait',
        tabData.error && !tabData.loading && 'border-red-500',
        className,
      )}
      aria-controls={`tabs-with-underline-${tabData.tabIndex + 1}`}
      onClick={handleButtonClick}
      disabled={tabData.disabled || tabData.loading}
      aria-current={isActive ? 'page' : undefined}
      aria-label={tabData.ariaLabel || tabData.label}
      aria-describedby={tabData.ariaDescribedby}
      aria-busy={tabData.loading}
      role='tab'
      id={`tab-${tabData.id}`}
      tabIndex={tabData.disabled || tabData.loading ? -1 : 0}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleButtonClick(e as unknown as MouseEvent)
        }
      }}
    >
      {/* Loading indicator or icon */}
      {tabData.loading ? (
        <Icon
          size={iconSizeFinal}
          loading={true}
          className={cn(
            'mr-1',
            isActive && variant === 'pills' ? 'text-white/80' : 'text-gray-400',
          )}
        >
          {/* Пустой children для спиннера */}
        </Icon>
      ) : (
        icon && (
          <Icon
            size={iconSizeFinal}
            className={cn(
              'shrink-0 transition-colors',
              isActive
                ? variant === 'pills'
                  ? 'text-white'
                  : 'text-primary dark:text-primary-light'
                : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300',
            )}
            color={isActive && variant === 'pills' ? 'white' : 'currentColor'}
          >
            {icon}
          </Icon>
        )
      )}

      {/* Label */}
      <span
        className={cn(
          fullWidth ? 'flex-1 text-center' : '',
          'truncate',
          tabData.loading && 'opacity-70',
        )}
      >
        {tabData.label}
      </span>

      {/* Badge */}
      {badgeContent && (
        <span
          className={cn(
            'flex items-center justify-center font-medium rounded-full transition-colors',
            badgeSizeClasses[size],
            isActive
              ? variant === 'pills'
                ? 'bg-white/20 text-white'
                : 'bg-primary/10 text-primary'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
          )}
          aria-label={`${badgeContent} элементов`}
        >
          {badgeContent}
        </span>
      )}

      {/* New data indicator */}
      {tabData.hasNewData && !isActive && (
        <span
          className='absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse border border-white dark:border-gray-900'
          aria-label='Новые данные'
        />
      )}

      {/* Error indicator */}
      {tabData.error && !tabData.loading && (
        <span
          className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900'
          aria-label='Ошибка'
        />
      )}
    </Container>
  )
}
