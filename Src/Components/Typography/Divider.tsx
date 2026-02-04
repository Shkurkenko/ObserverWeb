import { cn } from '../../Utils/Helpers'

export interface IDividerProps {
  className?: string
  vertical?: boolean
  thickness?: 'thin' | 'medium' | 'thick'
  color?: string
  dashed?: boolean
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
}

export const Divider = ({
  className,
  vertical = false,
  thickness = 'medium',
  color = 'border-gray-200 dark:border-gray-700',
  dashed = false,
  label,
  labelPosition = 'center',
  ...props
}: IDividerProps) => {
  const thicknessClasses = {
    thin: vertical ? 'w-px' : 'h-px',
    medium: vertical ? 'w-[2px]' : 'h-[2px]',
    thick: vertical ? 'w-1' : 'h-1',
  }

  if (label && !vertical) {
    const labelPositionClasses = {
      left: 'before:w-4',
      center: 'before:flex-1 after:flex-1',
      right: 'after:w-4',
    }

    return (
      <div
        className={cn('flex items-center gap-4', labelPositionClasses[labelPosition], className)}
        {...props}
      >
        <div
          className={cn(
            'flex-1 h-px',
            color,
            dashed && 'border-dashed',
            thicknessClasses[thickness],
          )}
        />
        <span className='text-sm text-gray-500 whitespace-nowrap'>{label}</span>
        <div
          className={cn(
            'flex-1 h-px',
            color,
            dashed && 'border-dashed',
            thicknessClasses[thickness],
          )}
        />
      </div>
    )
  }

  const classes = cn(
    vertical ? 'h-auto self-stretch border-l' : 'w-full border-t',
    color,
    dashed && 'border-dashed',
    thicknessClasses[thickness],
    className,
  )

  return <hr className={classes} {...props} />
}
