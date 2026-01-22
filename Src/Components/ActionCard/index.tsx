// Src/Components/Examples/ActionCard.tsx
import { Card } from '../Layouts/Card'
import { Text } from '../Typography/Text'
import { Caption } from '../Typography/Caption'
import { Icon } from '../Typography/Icon'
import { Button } from '../Button'
import { cn } from '../../Utils/Helpers'

interface ActionCardProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: string
  className?: string
}

export const ActionCard = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: ActionCardProps) => (
  <Card
    className={cn(
      'group border border-outline-variant/50 bg-surface-container p-6 transition-all hover:border-primary/50 hover:bg-surface-container-high',
      className,
    )}
  >
    <div className='flex items-start justify-between'>
      <div className='space-y-2'>
        <div className='flex items-center gap-3'>
          {icon && (
            <div className='rounded-lg bg-primary/10 p-2'>
              <Icon size='md' className='text-primary'>
                {icon}
              </Icon>
            </div>
          )}
          <div>
            <Text bold className='text-on-surface'>
              {title}
            </Text>
            <Caption className='mt-1 text-on-surface-variant'>{description}</Caption>
          </div>
        </div>
      </div>
      {onAction && (
        <Button
          variant='outline'
          size='sm'
          onClick={onAction}
          className='opacity-0 group-hover:opacity-100 transition-all duration-200'
        >
          {actionLabel}
        </Button>
      )}
    </div>
  </Card>
)
