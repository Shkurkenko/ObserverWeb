import { ComponentChildren } from 'preact'
import { Box } from '../../Layouts/Box'
import { type StylableProps } from '../../Shared/Common.types'
import { cn } from '../../../Utils/Helpers'

export interface AlertIconProps extends StylableProps {
  children: ComponentChildren
  color?: string
}

export const AlertIcon = ({ children, color, className = '' }: AlertIconProps) => {
  return <Box className={(cn('alert-icon self-start'), className)}>{children}</Box>
}
