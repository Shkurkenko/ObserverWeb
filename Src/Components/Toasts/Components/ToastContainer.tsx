import { createPortal } from 'preact/compat'
import { Toast, ToastPosition } from '../Toast.types'
import { TOAST_CONFIG } from '../Toasts.config'
import { ToastItem } from '../ToastItem'
import { Stack } from '@Components/Layouts/Stack'

import { cn } from '@Utils/Helpers'
export interface ToastContainerProps {
  /** Тосты для отображения */
  toasts: Toast[]
  /** Позиция на экране */
  position?: ToastPosition
  /** Обработчик закрытия */
  onDismiss?: (id: string) => void
  /** Обработчик обновления */
  onUpdate?: (id: string, config: Partial<Toast>) => void
  /** Максимальное количество */
  maxToasts?: number
  /** Отступы от краев */
  offset?: number
  /** Интервал между тостами */
  gap?: number
  /** Анимация */
  animation?: 'slide' | 'fade' | 'pop' | 'none'
  /** Длительность анимации */
  animationDuration?: number
  /** Дополнительные классы */
  className?: string
  /** ID контейнера для портала (по умолчанию body) */
  portalId?: string
}

/**
 * Позиции тостов на экране
 */
const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
}

/**
 * Контейнер для отображения тостов через портал
 *
 * @example
 * <ToastContainer
 *   toasts={toasts}
 *   position="bottom-right"
 *   onDismiss={dismissToast}
 * />
 */
export const ToastContainer = ({
  toasts,
  position = TOAST_CONFIG.defaultPosition,
  onDismiss,
  onUpdate,
  maxToasts = TOAST_CONFIG.maxToasts,
  offset = TOAST_CONFIG.offset,
  gap = TOAST_CONFIG.gap,
  animation = TOAST_CONFIG.defaultAnimation,
  animationDuration = TOAST_CONFIG.animationDuration,
  className,
  portalId,
}: ToastContainerProps) => {
  // Находим или создаем контейнер для портала
  const getPortalRoot = () => {
    if (portalId) {
      let root = document.getElementById(portalId)
      if (!root) {
        root = document.createElement('div')
        root.id = portalId
        root.className = 'toast-portal-root'
        document.body.appendChild(root)
      }
      return root
    }
    return document.body
  }

  const portalRoot = getPortalRoot()

  // Ограничиваем количество тостов
  const visibleToasts = toasts.slice(0, maxToasts)

  // Стили для позиционирования
  const positionStyles = {
    '--toast-offset': `${offset}px`,
    '--toast-gap': `${gap}px`,
  } as React.CSSProperties

  return createPortal(
    <div
      className={cn('fixed z-50 pointer-events-none', positionClasses[position], className)}
      style={positionStyles}
    >
      <Stack
        direction='vertical'
        spacing='none'
        className={cn(
          'pointer-events-auto',
          position.includes('bottom') ? 'flex-col-reverse' : 'flex-col',
        )}
        style={{
          gap: `${gap}px`,
          padding: `${offset}px`,
        }}
      >
        {visibleToasts.map((toast) => (
          <div
            key={toast.id}
            className='transition-all'
            style={{
              width: TOAST_CONFIG.width,
              maxWidth: '100%',
            }}
          >
            <ToastItem
              toast={toast}
              onDismiss={onDismiss}
              onUpdate={onUpdate}
              animation={animation}
              animationDuration={animationDuration}
            />
          </div>
        ))}
      </Stack>
    </div>,
    portalRoot,
  )
}
