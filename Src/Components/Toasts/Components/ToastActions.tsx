import { Flex } from '@Components/Layouts/Flex'
import { Button } from '@Components/Button'
import { ToastAction } from '../Toast.types'

import { cn } from '@Utils/Helpers'
export interface ToastActionsProps {
  /** Действия */
  actions?: ToastAction[]
  /** Дополнительные классы */
  className?: string
}

/**
 * Действия в тосте (кнопки)
 */
export const ToastActions = ({ actions, className }: ToastActionsProps) => {
  if (!actions?.length) return null

  return (
    <Flex gap='sm' justify='end' className={cn('mt-2 pt-2 border-t border-white/20', className)}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'secondary'}
          size='sm'
          onClick={(e: Event) => {
            e.stopPropagation()
            action.onClick()
          }}
        >
          {action.label}
        </Button>
      ))}
    </Flex>
  )
}
