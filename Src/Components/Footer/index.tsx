import { AdaptiveGridOptions, Grid, GridGapOptions } from '../Layouts/Grid'
import { Caption } from '../Typography'
import { Text } from '../Typography'
import { ComponentChildren } from 'preact'
import { Box } from '../Layouts/Box'
import { cn } from '../../Utils/Helpers'

export interface FooterProps {
  children?: ComponentChildren
  columns?: AdaptiveGridOptions
  gap?: GridGapOptions
  className?: string
  showBorder?: boolean
  variant?: 'default' | 'compact' | 'minimal'
}

export const Footer = ({
  children,
  columns = 2,
  gap = 'lg',
  className = '',
  variant = 'default',
  showBorder = true,
}: FooterProps) => {
  return (
    <Box
      className={cn(
        'mt-6 p-4',
        showBorder && 'border-t border-outline-variant/30',
        variant === 'compact' && 'mt-4 pt-3',
        variant === 'minimal' && 'mt-2 pt-2',
        className,
      )}
    >
      <Grid columns={columns} lg={4} gap={gap}>
        {children}
      </Grid>
    </Box>
  )
}

export const FooterItem = ({
  label,
  children,
  className = '',
  icon,
}: {
  label?: string
  children: ComponentChildren
  className?: string
  icon?: string | Element
}) => {
  return (
    <Box className={cn(className, 'space-y-1')}>
      {label && <Caption className='text-onsurface-variant'>{label}</Caption>}
      <Text className='font-medium text-on-surface flex items-center gap-2'>
        {icon && <span>{icon}</span>}
        {children}
      </Text>
    </Box>
  )
}
