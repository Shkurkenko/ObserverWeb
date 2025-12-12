import { useState, useCallback } from 'preact/hooks'
import { dequal as deepEqual } from 'dequal'

export function useLocalStorage<T = any>(key: string, initialValue: any): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)

      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T) => {
      try {
        if (!deepEqual(storedValue, value)) {
          setStoredValue(value)
          window.localStorage.setItem(key, JSON.stringify(value))
        }
      } catch (error) {
        console.error(error)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue]
}
