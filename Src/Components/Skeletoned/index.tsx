import { useMinLoadingDelay } from '@Hooks/useMinLoadingDelay'

interface SkeletonedProps {
  isLoading: boolean
  skeleton: React.ReactNode
  children: React.ReactNode
  minDelay?: number
  className?: string
}

export const Skeletoned = ({
  isLoading,
  skeleton,
  minDelay = 300,
  children,
  className = '',
}: SkeletonedProps) => {
  const isReady = useMinLoadingDelay(isLoading, minDelay)

  return (
    <div className={`relative ${className}`}>
      {!isReady && <div className='absolute inset-0 pointer-events-none z-10'>{skeleton}</div>}

      <div
        className={`transition-opacity duration-600 ease-out ${isReady ? 'opacity-100' : 'opacity-0'}`}
      >
        {children}
      </div>
    </div>
  )
}
