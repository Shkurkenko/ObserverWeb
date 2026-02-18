import { Box } from '../../Layouts/Box'
import { ComponentChildren } from 'preact'
import { AlertLevelType } from '../Alerts.types'
import { type StylableProps } from '../../Shared/Common.types'

import { cn } from '../../../Utils/Helpers'

interface AlertRootProps extends StylableProps {
  children: ComponentChildren
  color?: string
  variant?: AlertLevelType
}

export const AlertRoot = ({
  children,
  color,
  variant = 'default',
  className = '',
  style = {},
  ...props
}: AlertRootProps) => {
  const variantClass = variant !== 'default' ? `alert-${variant}` : ''

  return (
    <Box
      className={cn('alert-item pr-6 overflow-hidden', variantClass, className)}
      style={{
        borderLeft: color ? `0.25rem solid ${color}` : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
