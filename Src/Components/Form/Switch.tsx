// src/Components/Form/Switch.tsx
import { FunctionalComponent } from 'preact'
import { Label } from '../Typography'
import { cn } from '../../Utils/Helpers'
import './Form.sass'

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

export const Switch: FunctionalComponent<ISwitchProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  required = false,
  className,
  id,
  name,
  description,
}) => {
  const switchId = id || `switch-${name || Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={cn('form-field switch-field', className)}>
      <div className='switch-container'>
        <button
          id={switchId}
          type='button'
          role='switch'
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={cn('switch', checked && 'checked', disabled && 'disabled')}
          aria-label={label}
        >
          <span className='switch-thumb' />
        </button>

        <div className='switch-label-container'>
          {label && (
            <Label htmlFor={switchId} required={required}>
              {label}
            </Label>
          )}
          {description && <div className='switch-description'>{description}</div>}
        </div>
      </div>
    </div>
  )
}
