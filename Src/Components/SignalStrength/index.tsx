import { useEffect, useRef, useState } from 'preact/hooks'
import { inRange } from '../../Utils/Helpers'
import { ReoSpace } from '../../Shared/Interfaces/Reo.interface'
import { NoSignIcon } from '../Icons/NoSignIcon'

import './style.sass'

export const SignalStrengthMap: Record<ReoSpace.ISignalLevels, ReoSpace.ISignalRange> = {
  [ReoSpace.ISignalLevels.Excellent]: {
    beginValue: Number.POSITIVE_INFINITY,
    endValue: -70,
  },
  [ReoSpace.ISignalLevels.Good]: {
    beginValue: -70,
    endValue: -85,
  },
  [ReoSpace.ISignalLevels.Fair]: {
    beginValue: -86,
    endValue: -100,
  },
  [ReoSpace.ISignalLevels.Poor]: {
    beginValue: -100,
    endValue: -110,
  },
  [ReoSpace.ISignalLevels.No]: {
    beginValue: -110,
    endValue: Number.NEGATIVE_INFINITY,
  },
}

export const SignalSticksColorMap: Record<ReoSpace.ISignalLevels, string> = {
  [ReoSpace.ISignalLevels.Excellent]: 'green',
  [ReoSpace.ISignalLevels.Good]: 'lightgreen',
  [ReoSpace.ISignalLevels.Fair]: 'yellow',
  [ReoSpace.ISignalLevels.Poor]: 'orange',
  [ReoSpace.ISignalLevels.No]: 'red',
}

export function getSignalStrengthStatus(dbm: number): ReoSpace.ISignalLevels {
  for (const key in SignalStrengthMap) {
    if (
      inRange(
        dbm,
        SignalStrengthMap[key as ReoSpace.ISignalLevels].beginValue,
        SignalStrengthMap[key as ReoSpace.ISignalLevels].endValue,
      )
    ) {
      return key as ReoSpace.ISignalLevels
    }
  }
  return ReoSpace.ISignalLevels.No
}

export function getStickBackgroundColor(maxDbm: number, currentStickType: ReoSpace.ISignalLevels) {
  const currentMaxSignalStatus = getSignalStrengthStatus(maxDbm)

  const currentColor = SignalSticksColorMap[currentMaxSignalStatus as ReoSpace.ISignalLevels]

  return 'grey'
}

export interface SignalStrengthProps {
  width: number
  height: number
  dbm: number
}

export function SignalStrength({ width, height, dbm }: SignalStrengthProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sticks, setSticks] = useState<JSX.Element[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    const sticksWidth = container.offsetWidth * 0.5
    const sticksHeight = container.offsetHeight * 1.2

    const levelsCount = Object.keys(ReoSpace.ISignalLevels).length
    const partHeight = sticksHeight / levelsCount
    const partWidth = sticksWidth / levelsCount

    if (width !== 0 && height !== 0) {
      const newSticks = Object.keys(ReoSpace.ISignalLevels).map((_, i) => (
        <div
          key={i}
          className='signal-stick w-full h-full'
          style={{
            height: `${i * partHeight}px`,
            width: `${partWidth}px`,
            backgroundColor: getStickBackgroundColor(dbm, Object.values(ReoSpace.ISignalLevels)[i]),
          }}
        />
      ))

      setSticks(newSticks)
    }
  }, [dbm, containerRef.current?.offsetWidth, containerRef.current?.offsetHeight])

  return (
    <div
      ref={containerRef}
      className='signal-strength-container relative flex gap-1 w-full h-full'
      style={{
        width,
        height,
      }}
    >
      {sticks}
      {getSignalStrengthStatus(dbm) === ReoSpace.ISignalLevels.No && (
        <NoSignIcon
          width={width * 0.4}
          height={width * 0.4}
          style={{
            position: 'absolute',
            bottom: `-${height * 0.3}px`,
            left: 0,
          }}
        />
      )}
    </div>
  )
}
