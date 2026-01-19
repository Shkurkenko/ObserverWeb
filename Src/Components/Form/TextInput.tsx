// src/Components/Form/TextInput.tsx
import { FunctionalComponent } from 'preact'
import { Label } from '../Typography'
import { cn } from '../../Utils/Helpers'
import './Form.sass'

export interface ITextInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'number' | 'url'
  className?: string
  id?: string
  name?: string
  autoComplete?: string
}

export const TextInput: FunctionalComponent<ITextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  type = 'text',
  className,
  id,
  name,
  autoComplete,
}) => {
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={cn('form-field', className)}>
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}

      <div className='form-input-container'>
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange((e.target as HTMLInputElement).value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          name={name}
          autoComplete={autoComplete}
          className={cn('form-input', error && 'error', disabled && 'disabled')}
        />
      </div>

      {(error || helperText) && (
        <div className={cn('form-helper-text', error && 'error')}>{error || helperText}</div>
      )}
    </div>
  )
}
