import { useContext } from 'preact/hooks'
import { ToastContext } from '../Context/ToastsContext'
import { ToastConfig } from '../Toast.types'
import { getToastTypeConfig } from '../Toasts.config'
import { AlertLevel } from '@Components/Alerts'

/**
 * Базовый хук для работы с тостами
 * @throws {Error} Если используется вне ToastProvider
 *
 * @example
 * const { toasts, toast, dismiss } = useToasts()
 *
 * toast({
 *   type: AlertLevel.Success,
 *   header: 'Готово!',
 *   message: 'Изменения сохранены'
 * })
 */
export const useToasts = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToasts must be used within ToastProvider')
  }

  return context
}

/**
 * Хук с хелперами для разных типов тостов
 *
 * @example
 * const { success, error, promise } = useToastHelpers()
 *
 * // Простой тост
 * success('Успех!', 'Операция выполнена')
 *
 * // Тост с кастомным временем
 * warning('Внимание', 'Это важно', 8000)
 *
 * // Promise тост
 * await promise(
 *   saveData(),
 *   {
 *     loading: 'Сохранение...',
 *     success: 'Данные сохранены',
 *     error: 'Ошибка сохранения'
 *   }
 * )
 */
export const useToastHelpers = () => {
  const { toast, dismiss, dismissAll, update } = useToasts()

  /**
   * Создать тост с конфигом
   */
  const show = (config: ToastConfig) => toast(config)

  /**
   * Тост успеха
   */
  const success = (header: string, message?: string, ttl?: number) => {
    const config = getToastTypeConfig(AlertLevel.Success)
    return toast({
      type: AlertLevel.Success,
      header,
      message,
      ttl: ttl ?? config.defaultTTL,
      progressBar: config.defaultProgressBar,
    })
  }

  /**
   * Тост ошибки
   */
  const error = (header: string, message?: string, ttl?: number) => {
    const config = getToastTypeConfig(AlertLevel.Error)
    return toast({
      type: AlertLevel.Error,
      header,
      message,
      ttl: ttl ?? config.defaultTTL,
      progressBar: config.defaultProgressBar,
    })
  }

  /**
   * Тост предупреждения
   */
  const warning = (header: string, message?: string, ttl?: number) => {
    const config = getToastTypeConfig(AlertLevel.Warning)
    return toast({
      type: AlertLevel.Warning,
      header,
      message,
      ttl: ttl ?? config.defaultTTL,
      progressBar: config.defaultProgressBar,
    })
  }

  /**
   * Информационный тост
   */
  const info = (header: string, message?: string, ttl?: number) => {
    const config = getToastTypeConfig(AlertLevel.Info)
    return toast({
      type: AlertLevel.Info,
      header,
      message,
      ttl: ttl ?? config.defaultTTL,
      progressBar: config.defaultProgressBar,
    })
  }

  /**
   * Тост для асинхронных операций
   * Показывает loading, затем success или error
   */
  const promise = async <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    },
    options?: {
      ttl?: number
      loadingTTL?: number
    },
  ): Promise<T> => {
    // Показываем loading тост
    const id = toast({
      type: AlertLevel.Info,
      header: messages.loading,
      ttl: options?.loadingTTL || 0, // 0 = не закрывается автоматически
      progressBar: false,
      closable: false,
    })

    try {
      const result = await promise

      // Обновляем на success
      update(id, {
        type: AlertLevel.Success,
        header: messages.success,
        ttl: options?.ttl || 3000,
        progressBar: true,
        closable: true,
      })

      return result
    } catch (err) {
      // Обновляем на error
      update(id, {
        type: AlertLevel.Error,
        header: messages.error,
        message: err instanceof Error ? err.message : undefined,
        ttl: options?.ttl || 5000,
        progressBar: true,
        closable: true,
      })

      throw err
    }
  }

  /**
   * Тост с кастомным содержимым
   */
  const custom = (config: ToastConfig) => toast(config)

  /**
   * Обновить существующий тост
   */
  const updateToast = (id: string, config: Partial<ToastConfig>) => update(id, config)

  /**
   * Закрыть тост с задержкой
   */
  const dismissWithDelay = (id: string, delay: number) => {
    setTimeout(() => dismiss(id), delay)
  }

  /**
   * Показать тост и автоматически закрыть через указанное время
   */
  const showWithTimeout = (config: ToastConfig, timeout: number) => {
    const id = toast(config)
    setTimeout(() => dismiss(id), timeout)
    return id
  }

  return {
    // Базовые методы
    toasts: useToasts().toasts,
    show,
    dismiss,
    dismissAll,
    update: updateToast,
    dismissWithDelay,
    showWithTimeout,

    // Хелперы по типам
    success,
    error,
    warning,
    info,
    custom,

    // Специальные
    promise,
  }
}

/**
 * Хук для получения только активных тостов
 */
export const useActiveToasts = () => {
  const { toasts } = useToasts()
  return toasts.filter((t) => t.visible !== false)
}

/**
 * Хук для подсчета тостов по типам
 */
export const useToastStats = () => {
  const { toasts } = useToasts()

  return {
    total: toasts.length,
    byType: {
      [AlertLevel.Error]: toasts.filter((t) => t.type === AlertLevel.Error).length,
      [AlertLevel.Success]: toasts.filter((t) => t.type === AlertLevel.Success).length,
      [AlertLevel.Warning]: toasts.filter((t) => t.type === AlertLevel.Warning).length,
      [AlertLevel.Info]: toasts.filter((t) => t.type === AlertLevel.Info).length,
      [AlertLevel.Default]: toasts.filter((t) => t.type === AlertLevel.Default).length,
    },
  }
}
