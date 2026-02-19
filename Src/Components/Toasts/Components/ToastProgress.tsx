import { Box } from '../../Layouts/Box'
import { useEffect, useRef, useState } from 'preact/hooks'
import { cn } from '../../../Utils/Helpers'

export interface ToastProgressProps {
  /** Время жизни в мс */
  ttl: number
  /** Цвет прогресс-бара */
  color?: string
  /** На паузе */
  paused?: boolean
  /** Дополнительные классы */
  className?: string
  /** Колбек при завершении */
  onComplete?: () => void
}

/**
 * Прогресс-бар для тоста
 * Показывает оставшееся время до автоматического закрытия
 */
export const ToastProgress = ({
  ttl,
  color,
  paused = false,
  className,
  onComplete,
}: ToastProgressProps) => {
  const [progress, setProgress] = useState(100)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>(Date.now())
  const remainingRef = useRef<number>(ttl)

  useEffect(() => {
    if (paused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const startTime = Date.now()
    const endTime = startTime + remainingRef.current

    const updateProgress = () => {
      const now = Date.now()
      const remaining = endTime - now
      const newProgress = (remaining / ttl) * 100

      if (newProgress <= 0) {
        setProgress(0)
        onComplete?.()
      } else {
        setProgress(newProgress)
        remainingRef.current = remaining
        animationRef.current = requestAnimationFrame(updateProgress)
      }
    }

    animationRef.current = requestAnimationFrame(updateProgress)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [ttl, paused, onComplete])

  return (
    <Box
      className={cn('absolute bottom-0 left-0 h-1 transition-all', className)}
      style={{
        width: `${progress}%`,
        backgroundColor: color,
        transition: paused ? 'none' : 'width 100ms linear',
      }}
    />
  )
}
