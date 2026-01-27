import { Box } from '../Layouts/Box'
import { cn } from '../../Utils/Helpers'
import { CSSProperties } from 'preact'

export type ShinyLightSizeOptions = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IShinyLightProps {
  size?: ShinyLightSizeOptions

  color?: string

  glowColor?: string

  isShining?: boolean

  className?: string

  style?: CSSProperties
}

const ShinyLightSizeConfig = {
  xs: { dot: 4, glow: 6 },
  sm: { dot: 8, glow: 12 },
  md: { dot: 12, glow: 18 },
  lg: { dot: 16, glow: 24 },
  xl: { dot: 20, glow: 30 },
} as const

export const ShinyLight = ({
  size = 'md',
  color = 'white',
  glowColor = 'white',
  isShining = false,
  className,
  style,
}: IShinyLightProps) => {
  const config = ShinyLightSizeConfig[size]

  return (
    <Box
      as='div'
      className={cn(
        'relative inline-block rounded-full',
        'transition-all duration-300',
        isShining && 'animate-pulse',
        className,
      )}
      style={{
        width: config.dot,
        height: config.dot,
        backgroundColor: color,
        boxShadow: `0 0 8px ${glowColor}`,
        ...style,
      }}
    >
      <Box
        as='span'
        className='absolute rounded-full animate-ping opacity-75'
        style={{
          width: config.glow,
          height: config.glow,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          bacgroundColor: glowColor,
        }}
      />
    </Box>
  )
}
