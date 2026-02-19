import { createContext, ComponentChildren } from 'preact'
import { useState, useCallback, useRef } from 'preact/hooks'
import { Toast, ToastConfig } from '../Toast.types'
import { v4 as uuidv4 } from 'uuid'

/**
 * Тип значения контекста тостов
 */
export type ToastContextValue = {
  /** Активные тосты */
  toasts: Toast[]
  /** Добавить тост */
  toast: (config: ToastConfig) => string
  /** Удалить тост по ID */
  dismiss: (id: string) => void
  /** Удалить все тосты */
  dismissAll: () => void
  /** Обновить тост */
  update: (id: string, config: Partial<ToastConfig>) => void
}

export interface ToastProviderProps {
  children: ComponentChildren
  /** Максимальное количество тостов */
  maxToasts?: number
}

export const ToastContext = createContext<ToastContextValue | null>(null)

/**
 * Провайдер для управления тостами
 * @example
 * <ToastProvider maxToasts={3}>
 *   <App />
 * </ToastProvider>
 */
export const ToastProvider = ({ children, maxToasts = 5 }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeoutsRef = useRef<Map<string, number>>(new Map())

  /**
   * Очистить таймаут для тоста
   */
  const clearToastTimeout = useCallback((id: string) => {
    const timeout = timeoutsRef.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      timeoutsRef.current.delete(id)
    }
  }, [])

  /**
   * Добавить тост
   */
  const toast = useCallback(
    (config: ToastConfig): string => {
      const id = config.id || uuidv4()

      const newToast: Toast = {
        id,
        type: config.type,
        header: config.header,
        message: config.message,
        ttl: config.ttl,
        progressBar: config.progressBar,
        closable: config.closable ?? true,
        icon: config.icon,
        timestamp: new Date(),
        visible: true,
        metadata: config.metadata,
      }

      setToasts((prev) => {
        // Ограничиваем количество тостов
        const updated = [newToast, ...prev].slice(0, maxToasts)
        return updated
      })

      // Автоматическое закрытие
      if (config.ttl && config.ttl > 0) {
        const timeout = window.setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
          timeoutsRef.current.delete(id)
        }, config.ttl)

        timeoutsRef.current.set(id, timeout)
      }

      return id
    },
    [maxToasts],
  )

  /**
   * Удалить тост
   */
  const dismiss = useCallback(
    (id: string) => {
      clearToastTimeout(id)
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    },
    [clearToastTimeout],
  )

  /**
   * Удалить все тосты
   */
  const dismissAll = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
    timeoutsRef.current.clear()
    setToasts([])
  }, [])

  /**
   * Обновить тост
   */
  const update = useCallback(
    (id: string, config: Partial<ToastConfig>) => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, ...config, timestamp: new Date() } : toast,
        ),
      )

      // Обновляем таймаут если изменился ttl
      if (config.ttl) {
        clearToastTimeout(id)
        if (config.ttl > 0) {
          const timeout = window.setTimeout(() => {
            dismiss(id)
          }, config.ttl)
          timeoutsRef.current.set(id, timeout)
        }
      }
    },
    [clearToastTimeout, dismiss],
  )

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll, update }}>
      {children}
    </ToastContext.Provider>
  )
}
