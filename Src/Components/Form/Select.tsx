// src/Components/Form/Select.tsx
import { FunctionalComponent } from 'preact'
import { Label } from '../Typography'
import { cn } from '../../Utils/Helpers'
import './Form.sass'

export interface ISelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ISelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: ISelectOption[]
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  className?: string
  id?: string
  name?: string
  placeholder?: string
}

export const Select: FunctionalComponent<ISelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  disabled = false,
  required = false,
  className,
  id,
  name,
  placeholder = 'Выберите опцию',
}) => {
  const selectId = id || `select-${name || Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={cn('form-field', className)}>
      {label && (
        <Label htmlFor={selectId} required={required}>
          {label}
        </Label>
      )}

      <div className='form-select-container'>
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
          disabled={disabled}
          required={required}
          name={name}
          className={cn(
            'form-select',
            error && 'error',
            disabled && 'disabled',
            !value && 'placeholder',
          )}
        >
          <option value='' disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        <div className='form-select-arrow'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='m6 9 6 6 6-6' />
          </svg>
        </div>
      </div>

      {(error || helperText) && (
        <div className={cn('form-helper-text', error && 'error')}>{error || helperText}</div>
      )}
    </div>
  )
}
