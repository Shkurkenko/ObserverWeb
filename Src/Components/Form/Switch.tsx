import { Label } from '../Typography'

import './Form.sass'

import { cn } from '@Utils/Helpers'

export interface ISwitchProps {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  className?: string
  id?: string
  name?: string
  description?: string
}

export const Switch = ({
  label,
  checked,
  onChange,
  disabled = false,
  required = false,
  className,
  id,
  name,
  description,
}: ISwitchProps) => {
  const switchId = id || `switch-${name || Math.random().toString(36).substring(2, 9)}`

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <div className={cn('form-field switch-field', className)}>
      <div className='switch-container'>
        <button
          id={switchId}
          type='button'
          role='switch'
          aria-checked={checked}
          disabled={disabled}
          onClick={handleClick}
          className={cn('switch', checked && 'checked', disabled && 'disabled')}
          aria-label={label || 'Переключатель'}
          tabIndex={disabled ? -1 : 0}
        >
          <span className='switch-thumb' />
        </button>

        {(label || description) && (
          <div className='switch-label-container'>
            {label && (
              <Label htmlFor={switchId} required={required}>
                {label}
              </Label>
            )}
            {description && <div className='switch-description'>{description}</div>}
          </div>
        )}
      </div>
    </div>
  )
}
