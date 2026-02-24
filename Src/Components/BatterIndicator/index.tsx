import { useEffect, useState } from 'preact/hooks'
import { Flex } from '@Components/Layouts/Flex'
import { Box } from '@Components/Layouts/Box'
import { Text } from '@Components/Typography'
import { useThemeColors } from '@Hooks/UseThemeColors'

import { cn } from '@Utils/Helpers'

export interface BatteryIndicatorProps {
  className?: string
  level?: number | null // от 0 до 100, null - неизвестно
  isCharging?: boolean
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  lowPowerMode?: boolean
}

export const BatteryIndicator = ({
  className,
  level: externalLevel,
  isCharging: externalCharging,
  showPercentage = true,
  size = 'md',
  animated = true,
  lowPowerMode = false,
}: BatteryIndicatorProps) => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(externalLevel ?? null)
  const [isCharging, setIsCharging] = useState<boolean>(externalCharging ?? false)
  const colors = useThemeColors()

  // Размеры
  const dimensions = {
    sm: {
      width: 32,
      height: 48,
      fontSize: 11,
      liquidWidth: 20,
      liquidHeight: 32,
      capHeight: 6,
      capWidth: 10,
    },
    md: {
      width: 40,
      height: 60,
      fontSize: 12,
      liquidWidth: 26,
      liquidHeight: 42,
      capHeight: 8,
      capWidth: 12,
    },
    lg: {
      width: 48,
      height: 72,
      fontSize: 13,
      liquidWidth: 32,
      liquidHeight: 52,
      capHeight: 10,
      capWidth: 14,
    },
  }[size]

  // Если передан внешний level - используем его
  useEffect(() => {
    if (externalLevel !== undefined) {
      setBatteryLevel(externalLevel)
    }
  }, [externalLevel])

  // Если передан внешний isCharging - используем его
  useEffect(() => {
    if (externalCharging !== undefined) {
      setIsCharging(externalCharging)
    }
  }, [externalCharging])

  // Если нет внешних пропсов - пробуем Battery API
  useEffect(() => {
    if (externalLevel !== undefined || externalCharging !== undefined) {
      return // Не используем API, если пропсы переданы
    }

    // @ts-ignore - Battery API
    if ('getBattery' in navigator) {
      // @ts-ignore
      navigator.getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100))
          setIsCharging(battery.charging)
        }

        updateBattery()
        battery.addEventListener('levelchange', updateBattery)
        battery.addEventListener('chargingchange', updateBattery)

        return () => {
          battery.removeEventListener('levelchange', updateBattery)
          battery.removeEventListener('chargingchange', updateBattery)
        }
      })
    } else {
      // Моковые данные для разработки
      setBatteryLevel(78)
      setIsCharging(false)
    }
  }, [externalLevel, externalCharging])

  // Цвет жидкости в зависимости от уровня и состояния
  const getLiquidColor = () => {
    if (batteryLevel === null) return colors.onSurfaceVariant + '40'
    if (isCharging) return colors.primary
    if (lowPowerMode) return colors.tertiary
    if (batteryLevel <= 20) return colors.error
    if (batteryLevel <= 50) return colors.tertiary
    return colors.primary
  }

  // Градиент для жидкости (эффект глубины)
  const getLiquidGradient = () => {
    const color = getLiquidColor()
    if (size === 'lg' && animated) {
      return `linear-gradient(180deg, ${color}CC 0%, ${color} 80%, ${color}DD 100%)`
    }
    return color
  }

  // Высота жидкости в пикселях
  const liquidHeightPx =
    batteryLevel !== null
      ? Math.max(2, (dimensions.liquidHeight * batteryLevel) / 100)
      : dimensions.liquidHeight * 0.5

  // Процент для отображения
  const displayPercentage = batteryLevel !== null ? batteryLevel : '?'

  return (
    <Flex align='center' gap='md' className={cn(className)}>
      {/* Батарея-банка с жидкостью */}
      <Flex align='center' gap='xs' className='relative'>
        <Box
          className='relative'
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          {/* Основная банка */}
          <svg
            width={dimensions.width}
            height={dimensions.height}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {/* Корпус банки - закругленный прямоугольник */}
            <rect
              x='1'
              y='1'
              width={dimensions.width - 2}
              height={dimensions.height - dimensions.capHeight - 1}
              rx={dimensions.width / 5}
              fill='none'
              stroke={colors.outlineVariant}
              strokeWidth='1.2'
              className={cn(
                animated && 'transition-all duration-300',
                isCharging && 'stroke-primary',
                batteryLevel !== null && batteryLevel <= 20 && !isCharging && 'stroke-error',
              )}
            />

            {/* Крышка банки */}
            <rect
              x={(dimensions.width - dimensions.capWidth) / 2}
              y={dimensions.height - dimensions.capHeight - 2}
              width={dimensions.capWidth}
              height={dimensions.capHeight}
              rx={dimensions.capWidth / 4}
              fill={colors.outlineVariant}
              className={cn(
                animated && 'transition-all duration-300',
                isCharging && 'fill-primary',
                batteryLevel !== null && batteryLevel <= 20 && !isCharging && 'fill-error',
              )}
            />

            {/* Горлышко банки */}
            <rect
              x={(dimensions.width - 4) / 2}
              y={dimensions.height - dimensions.capHeight - 4}
              width='4'
              height='4'
              rx='1'
              fill={colors.outlineVariant}
              className={cn(
                animated && 'transition-all duration-300',
                isCharging && 'fill-primary',
              )}
            />

            {/* Жидкость в банке - ЭФФЕКТ ВОДЫ */}
            <defs>
              <clipPath id={`liquid-clip-${size}`}>
                <rect
                  x='3'
                  y={dimensions.height - dimensions.liquidHeight - dimensions.capHeight}
                  width={dimensions.liquidWidth}
                  height={dimensions.liquidHeight}
                  rx={dimensions.width / 6}
                />
              </clipPath>
            </defs>

            {/* Сама жидкость */}
            {batteryLevel !== null && (
              <g clipPath={`url(#liquid-clip-${size})`}>
                {/* Основная жидкость */}
                <rect
                  x='3'
                  y={dimensions.height - dimensions.capHeight - liquidHeightPx - 2}
                  width={dimensions.liquidWidth}
                  height={liquidHeightPx + 2}
                  fill={getLiquidGradient()}
                  className={cn(
                    animated && 'transition-all duration-500 ease-out',
                    isCharging && animated && 'animate-pulse',
                  )}
                />

                {/* Блик на жидкости (эффект глянца) */}
                {size !== 'sm' && batteryLevel > 15 && (
                  <rect
                    x='5'
                    y={dimensions.height - dimensions.capHeight - liquidHeightPx + 4}
                    width='4'
                    height={Math.max(4, liquidHeightPx - 12)}
                    fill='white'
                    opacity='0.2'
                    rx='2'
                  />
                )}

                {/* Пузырьки воздуха (только для lg) */}
                {size === 'lg' && batteryLevel > 30 && animated && (
                  <>
                    <circle
                      cx={dimensions.width / 2 - 2}
                      cy={dimensions.height - dimensions.capHeight - liquidHeightPx + 8}
                      r='1.5'
                      fill='white'
                      opacity='0.3'
                    />
                    <circle
                      cx={dimensions.width / 2 + 4}
                      cy={dimensions.height - dimensions.capHeight - liquidHeightPx + 16}
                      r='1'
                      fill='white'
                      opacity='0.3'
                    />
                  </>
                )}
              </g>
            )}

            {/* Пустая банка - легкая обводка */}
            {batteryLevel === null && (
              <rect
                x='3'
                y='3'
                width={dimensions.liquidWidth}
                height={dimensions.liquidHeight}
                rx={dimensions.width / 6}
                fill='none'
                stroke={colors.outlineVariant + '30'}
                strokeWidth='1'
                strokeDasharray='2 2'
              />
            )}
          </svg>
        </Box>

        {/* Процент */}
        {showPercentage && batteryLevel !== null && (
          <Flex align='center' gap='xs'>
            <Text
              className={cn(
                'font-semibold transition-colors duration-300',
                batteryLevel <= 20 && !isCharging && 'text-error',
                isCharging && 'text-primary',
                lowPowerMode && 'text-tertiary',
              )}
              style={{
                fontSize: dimensions.fontSize,
                lineHeight: 1.2,
              }}
            >
              {displayPercentage}%
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Статус зарядки - маленький бейдж */}
      {isCharging && (
        <Box className='bg-primary/10 px-2 py-0.5 rounded-full'>
          <Text
            className='text-primary text-xs font-medium'
            style={{ fontSize: dimensions.fontSize - 2 }}
          >
            Зарядка
          </Text>
        </Box>
      )}

      {/* Low Power Mode */}
      {lowPowerMode && !isCharging && (
        <Box className='bg-tertiary/10 px-2 py-0.5 rounded-full'>
          <Text
            className='text-tertiary text-xs font-medium'
            style={{ fontSize: dimensions.fontSize - 2 }}
          >
            Энергосбережение
          </Text>
        </Box>
      )}

      {/* Если батареи нет */}
      {batteryLevel === null && !externalLevel && (
        <Flex align='center' gap='xs'>
          <Text style={{ fontSize: dimensions.fontSize }} className='text-on-surface-variant'>
            🔌 Питание от сети
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

// Упрощенная версия для футера (только банка и процент)
export const CompactBatteryIndicator = ({
  level,
  isCharging,
  className,
}: {
  level: number
  isCharging?: boolean
  className?: string
}) => {
  return (
    <BatteryIndicator
      level={level}
      isCharging={isCharging}
      size='sm'
      showPercentage={true}
      animated={false}
      className={className}
    />
  )
}
