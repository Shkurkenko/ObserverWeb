import { useEffect, useRef, useState } from 'preact/hooks'
import { Toast } from './Toast.types'
import { ToastRoot } from './Components/ToastRoot'
import { ToastIcon } from './Components/ToastIcon'
import { ToastContent } from './Components/ToastContent'
import { ToastClose } from './Components/ToastClose'
import { ToastProgress } from './Components/ToastProgress'
import { ToastActions } from './Components/ToastActions'
import { getToastTypeConfig } from './Toasts.config'
import { Flex } from '../Layouts/Flex'

export interface ToastItemProps {
  /** Тост для отображения */
  toast: Toast
  /** Обработчик закрытия */
  onDismiss?: (id: string) => void
  /** Обработчик обновления */
  onUpdate?: (id: string, config: Partial<Toast>) => void
  /** Анимация */
  animation?: 'slide' | 'fade' | 'pop' | 'none'
  /** Длительность анимации */
  animationDuration?: number
  /** Дополнительные классы */
  className?: string
}

/**
 * Компонент для отображения одного тоста
 * Собирает все составные части вместе
 *
 * @example
 * <ToastItem
 *   toast={toast}
 *   onDismiss={handleDismiss}
 *   animation="slide"
 * />
 */
export const ToastItem = ({
  toast,
  onDismiss,
  onUpdate,
  animation = 'slide',
  animationDuration = 300,
  className,
}: ToastItemProps) => {
  const {
    id,
    type,
    header,
    message,
    ttl,
    progressBar = true,
    closable = true,
    icon,
    actions,
    visible = true,
  } = toast

  const [isPaused, setIsPaused] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const timeoutRef = useRef<number>()

  // Получаем конфиг для типа тоста
  const config = getToastTypeConfig(type)
  const styles = config.styles

  // Определяем иконку (кастомная или из конфига)
  const toastIcon = icon || config.defaultIcon

  /**
   * Обработчик закрытия с анимацией
   */
  const handleClose = () => {
    setIsExiting(true)
    timeoutRef.current = window.setTimeout(() => {
      onDismiss?.(id)
    }, animationDuration)
  }

  /**
   * Очистка таймаута при размонтировании
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  /**
   * Обработка изменения видимости извне
   */
  useEffect(() => {
    if (visible === false && !isExiting) {
      handleClose()
    }
  }, [visible])

  /**
   * Автоматическое закрытие по TTL
   */
  useEffect(() => {
    if (ttl && ttl > 0 && !isPaused && !isExiting) {
      const timer = setTimeout(() => {
        handleClose()
      }, ttl)

      return () => clearTimeout(timer)
    }
  }, [ttl, isPaused, isExiting])

  return (
    <ToastRoot
      visible={!isExiting}
      animation={animation}
      duration={animationDuration}
      background={styles.background}
      borderColor={styles.borderColor}
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => onUpdate?.(id, { visible: false })}
    >
      <Flex direction='col' className='p-3'>
        {/* Верхняя часть с иконкой, контентом и кнопкой закрытия */}
        <Flex align='center' gap='sm' className='w-full'>
          {/* Иконка */}
          {toastIcon && (
            <ToastIcon color={styles.iconColor} size='md'>
              {toastIcon}
            </ToastIcon>
          )}

          {/* Контент (заголовок + сообщение) */}
          <ToastContent
            header={header}
            message={message}
            color={styles.color}
            messageLines={actions?.length ? 1 : 2}
          />

          {/* Кнопка закрытия */}
          {closable && <ToastClose onClose={handleClose} color={styles.color} />}
        </Flex>

        {/* Действия (кнопки) */}
        {actions && actions.length > 0 && <ToastActions actions={actions} />}
      </Flex>

      {/* Прогресс-бар */}
      {progressBar && ttl && ttl > 0 && !isExiting && (
        <ToastProgress
          ttl={ttl}
          color={styles.progressColor}
          paused={isPaused}
          onComplete={handleClose}
        />
      )}
    </ToastRoot>
  )
}
