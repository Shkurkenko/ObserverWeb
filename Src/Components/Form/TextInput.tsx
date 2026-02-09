import { FunctionalComponent } from 'preact'
import { Label } from '../Typography'
import { cn } from '../../Utils/Helpers'

import './Form.sass'

export interface ITextInputProps {
  id?: string

  label?: string

  placeholder?: string

  value: string

  onChange?: (event: { currentTarget: HTMLInputElement }) => void

  error?: string

  helperText?: string

  disabled?: boolean

  required?: boolean

  type?: 'text' | 'email' | 'password' | 'number' | 'url'

  name?: string

  autoComplete?: string

  className?: string
}

export const TextInput = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
  error,
  helperText,
  disabled = false,
  required = false,
  type = 'text',
  className = '',
}: ITextInputProps) => {
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={cn('form-field')}>
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}

      <div className={cn('form-input-container', className)}>
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange && onChange({ currentTarget: e.target as HTMLInputElement })}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          name={name}
          autoComplete={autoComplete}
          className={cn('form-input', error && 'error', disabled && 'disabled', 'h-full')}
        />
      </div>

      {(error || helperText) && (
        <div className={cn('form-helper-text', error && 'error')}>{error || helperText}</div>
      )}
    </div>
  )
}
