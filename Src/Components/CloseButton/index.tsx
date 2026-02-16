import { Icon } from '../Typography'
import { cn } from '../../Utils/Helpers'
import { Button } from '../Button'

export interface ICloseButtonProps {
  onClose: (event: MouseEvent) => void
  className?: string
}

export const CloseButton = ({ onClose, className = '' }: ICloseButtonProps) => {
  const handleClose = (event: MouseEvent) => {
    onClose(event)
    console.log('close button pushed')
  }

  return (
    <Button
      onClick={handleClose}
      className={cn(
        'opacity-0 group-hover:opacity-100 transition-opacity',
        'ml-2 p-1 rounded hover:bg-outline-variant/20',
        'text-on-surface-variant hover:text-on-surface',
        className,
      )}
      variant='text'
      aria-label={`Закрыть`}
    >
      <Icon size='sm'>✕</Icon>
    </Button>
  )
}
