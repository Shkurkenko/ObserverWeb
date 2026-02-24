import { useMemo } from 'preact/hooks'
import {
  ReoSignalLevel,
  ReoSignalLevelType,
  ReoSignalRange,
} from '@Shared/Interfaces/Reo.interface'

// Карта сигналов
export const SignalStrengthMap: Record<ReoSignalLevelType, ReoSignalRange> = {
  [ReoSignalLevel.Excellent]: {
    beginValue: -50,
    endValue: -70,
  },
  [ReoSignalLevel.Good]: {
    beginValue: -70,
    endValue: -85,
  },
  [ReoSignalLevel.Fair]: {
    beginValue: -85,
    endValue: -100,
  },
  [ReoSignalLevel.Poor]: {
    beginValue: -100,
    endValue: -110,
  },
  [ReoSignalLevel.No]: {
    beginValue: -110,
    endValue: -150,
  },
}

// Цвета для уровней сигнала
export const SignalLevelColorMap: Record<ReoSignalLevelType, string> = {
  [ReoSignalLevel.Excellent]: '#10B981', // emerald-500
  [ReoSignalLevel.Good]: '#22C55E', // green-500
  [ReoSignalLevel.Fair]: '#EAB308', // yellow-500
  [ReoSignalLevel.Poor]: '#F97316', // orange-500
  [ReoSignalLevel.No]: '#EF4444', // red-500
}

// Цвета для неактивных палочек
const INACTIVE_COLOR = '#4B5563' // gray-600
const INACTIVE_OPACITY = 0.3

// Получаем уровень сигнала по dBm
export function getSignalStrengthStatus(dbm: number): ReoSignalLevelType {
  if (dbm >= -70) return ReoSignalLevel.Excellent
  if (dbm >= -85) return ReoSignalLevel.Good
  if (dbm >= -100) return ReoSignalLevel.Fair
  if (dbm >= -110) return ReoSignalLevel.Poor
  return ReoSignalLevel.No
}

// Получаем количество активных палочек (1-5)
export function getActiveSticksCount(dbm: number): number {
  if (dbm >= -70) return 5
  if (dbm >= -77) return 4
  if (dbm >= -85) return 4
  if (dbm >= -92) return 3
  if (dbm >= -100) return 3
  if (dbm >= -105) return 2
  if (dbm >= -110) return 2
  return 1
}

// Плавный цвет для палочки
export function getStickColor(dbm: number, stickIndex: number): { color: string; opacity: number } {
  const stickNumber = stickIndex + 1
  const activeSticks = getActiveSticksCount(dbm)
  const level = getSignalStrengthStatus(dbm)

  // Если палочка активна
  if (stickNumber <= activeSticks) {
    return {
      color: SignalLevelColorMap[level],
      opacity: 1,
    }
  }

  // Если это следующая палочка после активных (для плавности)
  if (stickNumber === activeSticks + 1) {
    // Проверяем, близко ли значение к следующему уровню
    const nextThreshold = getNextThreshold(dbm)
    const progress = Math.min(Math.max((dbm - (nextThreshold + 5)) / 5, 0), 1)

    return {
      color: SignalLevelColorMap[level],
      opacity: 0.3 + progress * 0.4,
    }
  }

  // Неактивная палочка
  return {
    color: INACTIVE_COLOR,
    opacity: INACTIVE_OPACITY,
  }
}

// Получаем следующий порог dBm
function getNextThreshold(dbm: number): number {
  if (dbm >= -70) return -70
  if (dbm >= -85) return -85
  if (dbm >= -100) return -100
  if (dbm >= -110) return -110
  return -150
}

export interface SignalStrengthProps {
  width?: number
  height?: number
  dbm: number
  showValue?: boolean
  compact?: boolean
}

export function SignalStrength({
  width = 80,
  height = 32,
  dbm,
  showValue = false,
  compact = false,
}: SignalStrengthProps) {
  const totalSticks = 5
  const level = getSignalStrengthStatus(dbm)
  const activeSticks = getActiveSticksCount(dbm)

  // Рассчитываем размеры палочек
  const stickWidth = Math.max(width / (totalSticks * (compact ? 1.5 : 2)), 4)
  const gap = stickWidth * 0.5
  const maxStickHeight = height * (compact ? 0.9 : 0.8)
  const minStickHeight = height * (compact ? 0.3 : 0.2)

  // Создаем палочки
  const sticks = useMemo(() => {
    return Array.from({ length: totalSticks }).map((_, i) => {
      // Высота увеличивается прогрессивно
      const heightPercentage = 0.2 + i * 0.2
      const stickHeight = minStickHeight + (maxStickHeight - minStickHeight) * heightPercentage

      const { color, opacity } = getStickColor(dbm, i)
      const isActive = i < activeSticks

      return {
        key: i,
        height: stickHeight,
        width: stickWidth,
        color,
        opacity,
        marginRight: i < totalSticks - 1 ? gap : 0,
        isActive,
      }
    })
  }, [dbm, width, height, compact])

  return (
    <div className='flex flex-col items-center'>
      <div
        className='flex items-end'
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {sticks.map((stick) => (
          <div
            key={stick.key}
            className='rounded-sm transition-all duration-300'
            style={{
              width: `${stick.width}px`,
              height: `${stick.height}px`,
              backgroundColor: stick.color,
              marginRight: `${stick.marginRight}px`,
              opacity: stick.opacity,
              boxShadow: stick.isActive
                ? `0 0 4px ${stick.color}80, inset 0 1px 1px rgba(255,255,255,0.1)`
                : 'none',
            }}
          />
        ))}
      </div>

      {showValue && (
        <div className='mt-1 text-xs font-medium' style={{ color: SignalLevelColorMap[level] }}>
          {dbm} dBm
        </div>
      )}
    </div>
  )
}

// Компактный вариант для таблиц
export function CompactSignalStrength({ dbm }: { dbm: number }) {
  const totalSticks = 5
  const activeSticks = getActiveSticksCount(dbm)
  const level = getSignalStrengthStatus(dbm)
  const color = SignalLevelColorMap[level]

  return (
    <div className='flex items-end' style={{ height: '16px' }}>
      {Array.from({ length: totalSticks }).map((_, i) => {
        const isActive = i < activeSticks
        const height = 4 + i * 3 // 4, 7, 10, 13, 16px

        return (
          <div
            key={i}
            className='rounded-sm transition-colors duration-200'
            style={{
              width: '3px',
              height: `${height}px`,
              backgroundColor: isActive ? color : INACTIVE_COLOR,
              marginRight: i < totalSticks - 1 ? '2px' : '0',
              opacity: isActive ? 1 : INACTIVE_OPACITY,
            }}
          />
        )
      })}
    </div>
  )
}

// Вариант с цифровым значением
export function SignalStrengthWithValue({ dbm }: { dbm: number }) {
  const level = getSignalStrengthStatus(dbm)
  const color = SignalLevelColorMap[level]
  const label = {
    [ReoSignalLevel.Excellent]: 'Отлично',
    [ReoSignalLevel.Good]: 'Хорошо',
    [ReoSignalLevel.Fair]: 'Удовл.',
    [ReoSignalLevel.Poor]: 'Слабо',
    [ReoSignalLevel.No]: 'Нет',
  }[level]

  return (
    <div className='flex items-center gap-2'>
      <SignalStrength width={60} height={20} dbm={dbm} compact={true} />
      <div className='flex flex-col'>
        <span className='text-xs font-mono font-bold' style={{ color }}>
          {dbm} dBm
        </span>
        <span className='text-xs text-gray-500'>{label}</span>
      </div>
    </div>
  )
}

// Хук для использования уровня сигнала
export function useSignalStrength(dbm: number) {
  const level = getSignalStrengthStatus(dbm)
  const activeSticks = getActiveSticksCount(dbm)
  const color = SignalLevelColorMap[level]

  const label = {
    [ReoSignalLevel.Excellent]: 'Отлично',
    [ReoSignalLevel.Good]: 'Хорошо',
    [ReoSignalLevel.Fair]: 'Удовл.',
    [ReoSignalLevel.Poor]: 'Слабо',
    [ReoSignalLevel.No]: 'Нет сигнала',
  }[level]

  return {
    level,
    activeSticks,
    color,
    label,
    isGood: level === ReoSignalLevel.Excellent || level === ReoSignalLevel.Good,
    isFair: level === ReoSignalLevel.Fair,
    isPoor: level === ReoSignalLevel.Poor || level === ReoSignalLevel.No,
  }
}
