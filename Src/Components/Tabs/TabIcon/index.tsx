import { Icon, IIconProps } from '../../Typography/Icon'
import { cn } from '../../../Utils/Helpers'
import { FunctionalComponent } from 'preact'

export interface ITabIconProps extends Omit<IIconProps, 'active'> {
  isActive?: boolean

  variant?: 'default' | 'pills' | 'underline' | 'outline'

  tabSize?: 'sm' | 'md' | 'lg'
}

export const TabIcon: FunctionalComponent<ITabIconProps> = ({
  isActive = false,
  variant = 'underline',
  tabSize = 'md',
  className,
  color,
  ...props
}) => {
  const getIconSize = () => {
    switch (tabSize) {
      case 'sm':
        return 'sm'
      case 'lg':
        return 'lg'
      default:
        return 'md'
    }
  }

  const getIconColor = () => {
    if (color) return color

    if (isActive) {
      return variant === 'pills' ? 'white' : 'currentColor'
    }

    return 'currentColor'
  }

  return (
    <Icon
      size={getIconSize()}
      color={getIconColor()}
      className={cn(
        'shkink-0 transitioni-colors',
        isActive
          ? variant === 'pills'
            ? 'text-white'
            : 'text-primary dark:text-primary-light'
          : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300',
        className,
      )}
      active={isActive}
      {...props}
    />
  )
}
