import { ToastProvider } from './Context/ToastsContext'
import { ToastContainer } from './Components/ToastContainer'
import { useToasts } from './Hooks/UseToasts'
import { ToastPosition, ToastConfig } from './Toast.types'
import { TOAST_CONFIG } from './Toasts.config'

export interface ToastComponentProps {
  /** Позиция тостов */
  position?: ToastPosition
  /** Максимальное количество */
  maxToasts?: number
  /** Дочерние компоненты */
  children: preact.ComponentChildren
  /** ID контейнера для портала */
  portalId?: string
}

/**
 * Компонент для управления тостами
 * Объединяет провайдер и контейнер
 *
 * @example
 * // В корне приложения
 * <Toast position="bottom-right" maxToasts={3}>
 *   <App />
 * </Toast>
 *
 * @example
 * // С кастомным порталом
 * <Toast position="top-right" portalId="toast-root">
 *   <App />
 * </Toast>
 */
export const ToastChannel = ({
  children,
  position = TOAST_CONFIG.defaultPosition,
  maxToasts = TOAST_CONFIG.maxToasts,
  portalId,
}: ToastComponentProps) => {
  return (
    <ToastProvider maxToasts={maxToasts}>
      {children}
      <ToastConsumer position={position} maxToasts={maxToasts} portalId={portalId} />
    </ToastProvider>
  )
}

/**
 * Внутренний компонент для подключения контейнера к контексту
 */
const ToastConsumer = ({
  position,
  maxToasts,
  portalId,
}: {
  position: ToastPosition
  maxToasts: number
  portalId?: string
}) => {
  const { toasts, dismiss, update } = useToasts()

  return (
    <ToastContainer
      toasts={toasts}
      position={position}
      onDismiss={dismiss}
      onUpdate={update}
      maxToasts={maxToasts}
      portalId={portalId}
    />
  )
}

// Реэкспорты
export { useToasts, useToastHelpers } from './Hooks/UseToasts'
export type { ToastConfig, ToastPosition }
export { ToastProvider, ToastContainer }
