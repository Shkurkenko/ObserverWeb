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
  ariaLabel?: string
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
  ariaLabel,
}) => {
  const selectId = id || `select-${name || Math.random().toString(36).substr(2, 9)}`

  // Формируем aria-label автоматически если не передан
  const computedAriaLabel = ariaLabel || label || placeholder

  // Генерируем уникальный ID для error сообщения
  const errorId = `${selectId}-error`
  const helperId = `${selectId}-helper`

  return (
    <div className={cn('form-field', className)}>
      {label && (
        <Label
          for={selectId} // Используем 'for' вместо 'htmlFor' для Preact
          required={required}
          id={`${selectId}-label`}
        >
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
          aria-label={computedAriaLabel}
          aria-labelledby={label ? `${selectId}-label` : undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-invalid={!!error}
          aria-required={required}
          title={computedAriaLabel}
        >
          <option value='' disabled aria-label={placeholder}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              aria-label={option.label}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className='form-select-arrow' aria-hidden='true'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <path d='m6 9 6 6 6-6' />
          </svg>
        </div>
      </div>

      {(error || helperText) && (
        <div
          id={error ? errorId : helperId}
          className={cn('form-helper-text', error && 'error')}
          role={error ? 'alert' : 'status'}
          aria-live={error ? 'assertive' : 'polite'}
        >
          {error || helperText}
        </div>
      )}
    </div>
  )
}
