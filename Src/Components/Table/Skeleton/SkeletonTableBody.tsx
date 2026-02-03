import { Box } from '../../Layouts/Box'
import { Flex } from '../../Layouts/Flex'
import { cn } from '../../../Utils/Helpers'

interface SkeletonTableBodyProps {
  rows?: number
  columns?: number
  rowHeight?: number
  className?: string
}

export const SkeletonTableBody = ({
  rows = 10,
  columns = 6,
  rowHeight = 60,
  className = '',
}: SkeletonTableBodyProps) => (
  <Box className={cn(className, 'table-body-skeleton w-full h-full')}>
    {[...Array(rows)].map((_, i) => (
      <Flex
        key={i}
        direction='col'
        align='center'
        justify='center'
        className='w-full px-6 border-b border-outline-variant'
        style={{ height: rowHeight }}
      >
        <Flex gap='lg' className='w-full'>
          {[...Array(columns)].map((_, c) => (
            <Box
              key={c}
              className='h-4 bg-surface-container-high rounded animate-pulse'
              style={{
                width: c === 0 ? '40px' : `${50 + Math.random() * 40}%`,
                animationDelay: `${c * 80 + i * 40}ms`,
              }}
            />
          ))}
        </Flex>
      </Flex>
    ))}
  </Box>
)
