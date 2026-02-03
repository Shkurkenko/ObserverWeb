import { useState, useCallback, useRef, useEffect } from 'preact/hooks'
import { cn } from '../../Utils/Helpers'

import './style.sass'

interface SearchInputProps {
  onSearch?: (query: string) => void
  placeholder?: string
  delay?: number
  className?: string
  autoFocus?: boolean
  disabled?: boolean
  initialValue?: string
}

export function SearchInput({
  onSearch,
  placeholder = 'Поиск по задачам',
  delay = 300,
  className = '',
  autoFocus = false,
  disabled = false,
  initialValue = '',
}: SearchInputProps) {
  const [query, setQuery] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const inputRef = useRef<HTMLInputElement>(null)

  // Автофокус при монтировании
  useEffect(() => {
    if (autoFocus && inputRef.current && !disabled) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [autoFocus, disabled])

  // Синхронизация initialValue
  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  const handleSearch = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        onSearch?.(value)
      }, delay)
    },
    [onSearch, delay],
  )

  const handleChange = useCallback(
    (e: Event) => {
      const value = (e.target as HTMLInputElement).value
      setQuery(value)
      handleSearch(value)
    },
    [handleSearch],
  )

  const handleClear = useCallback(() => {
    setQuery('')
    onSearch?.('')
    inputRef.current?.focus()
  }, [onSearch])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClear()
      }
      if (e.key === 'Enter' && query.trim()) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        onSearch?.(query)
      }
    },
    [handleClear, query, onSearch],
  )

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={`task-content-search ${className} ${isFocused ? 'focused' : ''}`}>
      <div className='task-content-search-input-container'>
        <div className='task-content-search-icon' aria-hidden='true'>
          <svg
            width='1.5rem'
            height='1.5rem'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <circle cx='11' cy='11' r='8' />
            <path d='m21 21-4.3-4.3' />
          </svg>
        </div>

        <input
          ref={inputRef}
          type='search'
          className='task-content-search-input'
          placeholder={placeholder}
          value={query}
          onInput={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label={placeholder}
          disabled={disabled}
          aria-disabled={disabled}
          autoCapitalize='off'
          autoComplete='off'
          autoCorrect='off'
          spellcheck={false}
          role='searchbox'
          aria-busy={false}
        />

        {query && !disabled && (
          <button
            type='button'
            onClick={handleClear}
            className='clear-button'
            aria-label='Очистить поиск'
            tabIndex={0}
          >
            <svg
              width='1.25rem'
              height='1.25rem'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path d='M18 6 6 18' />
              <path d='m6 6 12 12' />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
