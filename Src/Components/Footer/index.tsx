import { AdaptiveGridOptions, Grid, GridGapOptions } from '../Layouts/Grid'
import { Caption } from '../Typography'
import { Text } from '../Typography'
import { ComponentChildren } from 'preact'
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
    <div
      className={cn(
        'mt-6 pt-4',
        showBorder && 'border-t border-outline-variant/30',
        variant === 'compact' && 'mt-4 pt-3',
        variant === 'minimal' && 'mt-2 pt-2',
        className,
      )}
    >
      <Grid columns={columns} lg={4} gap={gap}>
        {children}
        {/* <div className='space-y-1'>
          <Caption className='text-on-surface-variant'>Активный тип</Caption>
          <Text className='font-medium text-on-surface flex items-center gap-2'>
            <span>{ObserverConfig.NetworkTypeIcons[activeNetworkType]}</span>
            {activeNetworkType}
          </Text>
        </div>
        <div className='space-y-1'>
          <Caption className='text-on-surface-variant'>Задача</Caption>
          <Text className='font-medium text-on-surface truncate'>{headerString}</Text>
        </div>
        <div className='space-y-1'>
          <Caption className='text-on-surface-variant'>Обновлено</Caption>
          <Text className='font-medium text-on-surface'>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </div>
        <div className='space-y-1'>
          <Caption className='text-on-surface-variant'>Версия</Caption>
          <Text className='font-mono font-medium text-on-surface'>v2.4.1</Text>
        </div> */}
      </Grid>
    </div>
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
  icon?: string
}) => {
  return (
    <div className={cn('space-y-1', className)}>
      {label && <Caption className='text-onsurface-variant'>{label}</Caption>}
      <Text className='font-medium text-on-surface flex items-center gap-2'>
        {icon && <span>{icon}</span>}
        {children}
      </Text>
    </div>
  )
}
