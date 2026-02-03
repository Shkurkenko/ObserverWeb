import { Flex } from '../../Layouts/Flex'
import { Box } from '../../Layouts/Box'
import { cn } from '../../../Utils/Helpers'

interface SkeletonTableHeaderProps {
  columns?: number
  rowHeight?: number
  className?: string
}

export const SkeletonTableHeader = ({
  className,
  columns = 6,
  rowHeight = 60,
}: SkeletonTableHeaderProps) => (
  <>
    <Flex
      gap='md'
      justify='center'
      align='center'
      className={cn(
        className,
        `absolute inset-0 pointer-events-none bg-surface-container pl-7 h-[${rowHeight}px]`,
      )}
    >
      {[...Array(columns)].map((_, i) => (
        <Box
          key={i}
          className='h-4 bg-surface-container-high rounded animate-pulse'
          style={{
            width: i === 0 ? '40px' : `${50 + Math.random() * 40}%`,
            animationDelay: `${i * 80 + i * 40}ms`,
          }}
        />
      ))}
    </Flex>
  </>
)
