import { BaseTypographyProps } from './Typography.types'
import { cn } from '../../Utils/Helpers'

interface ILabelProps extends BaseTypographyProps {
  /** ID элемента, к которому привязан label */
  htmlFor?: string
  /** Показывает, что поле обязательно для заполнения */
  required?: boolean
  /** Размер текста */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

const colorClasses = {
  primary: 'text-gray-700 dark:text-gray-300',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-700 dark:text-green-300',
  warning: 'text-yellow-700 dark:text-yellow-300',
  error: 'text-red-700 dark:text-red-300',
  disabled: 'text-gray-400 dark:text-gray-500',
}

/**
 * Компонент для отображения подписи к полям форм
 *
 * @example
 * // Базовый label
 * <Label htmlFor="email">Email</Label>
 *
 * @example
 * // Обязательное поле
 * <Label htmlFor="name" required>
 *   Имя
 * </Label>
 *
 * @example
 * // Разные размеры
 * <Label size="sm">Маленький</Label>
 * <Label size="md">Средний</Label>
 * <Label size="lg">Большой</Label>
 *
 * @example
 * // Разные цвета
 * <Label color="success">Успех</Label>
 * <Label color="error">Ошибка</Label>
 * <Label color="disabled">Отключено</Label>
 */
export const Label = ({
  className,
  children,
  color = 'primary',
  htmlFor,
  required = false,
  size = 'md',
  ...props
}: ILabelProps) => {
  const classes = cn(
    'font-medium block mb-1',
    sizeClasses[size],
    colorClasses[color],
    required && "after:content-['*'] after:ml-0.5 after:text-red-500",
    className,
  )

  return (
    <label className={classes} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  )
}
