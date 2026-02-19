import { ComponentChildren } from 'preact'
import { Box } from '@Components/Layouts/Box'
import { StylableProps } from '@Components/Shared/Common.types'
import { cn } from '../../../Utils/Helpers'

export interface AlertIconProps extends StylableProps {
  /** Иконка для отображения в алерте */
  children: ComponentChildren
  /** Цвет иконки (CSS цвет или переменная) */
  color?: string
}

/**
 * Иконка для компонента Alert.
 * Отображает переданную иконку с возможностью кастомизации цвета и позиционирования.
 *
 * @component
 * @example
 * // Базовая иконка
 * <AlertIcon>
 *   <InfoIcon />
 * </AlertIcon>
 *
 * @example
 * // С кастомным цветом
 * <AlertIcon color="#FF0000">
 *   <ErrorIcon />
 * </AlertIcon>
 *
 * @example
 * // С дополнительными классами
 * <AlertIcon className="mr-3">
 *   <SuccessIcon />
 * </AlertIcon>
 *
 * @example
 * // В составе Alert
 * <Alert>
 *   <AlertIcon>
 *     <WarningIcon />
 *   </AlertIcon>
 *   <div>
 *     <AlertHeader>Предупреждение</AlertHeader>
 *     <AlertContent>Заполните все поля</AlertContent>
 *   </div>
 * </Alert>
 *
 * @param props - Свойства компонента
 * @param props.children - Иконка для отображения (обязательно)
 * @param props.color - Цвет иконки (опционально)
 * @param props.className - Дополнительные CSS классы (опционально)
 *
 * @returns JSX элемент иконки алерта
 */
export const AlertIcon = ({ children, color, className = '' }: AlertIconProps) => {
  // Применяем цвет к иконке через style, если он передан
  const iconWithColor = color ? <Box style={{ color }}>{children}</Box> : children

  return <Box className={cn('alert-icon self-start', className)}>{iconWithColor}</Box>
}
