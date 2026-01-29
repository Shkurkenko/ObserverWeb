import { Skeletoned } from '../../../Components/Skeletoned'
import { Icon } from '../../../Components/Typography'
import { Caption } from '../../../Components/Typography'
import { Heading } from '../../../Components/Typography'
import { Badge } from '../../../Components/Badge'
import { Divider } from '../../../Components/Typography'
import { cn } from '../../../Utils/Helpers'

export interface IScanProps {
  title: string

  description: string

  isScanning: boolean

  isLoading: boolean

  className?: string
}

export const HeaderSkeleton = () => (
  <div className='flex items-center justify-between'>
    <div className='flex items-center gap-4'>
      <div className='w-14 h-14 bg-surface-container-high rounded-xl animate-pulse' />
      <div className='space-y-2'>
        <div className='h-7 bg-surface-container-high rounded-lg w-56 animate-pulse' />
        <div className='h-4 bg-surface-container-high rounded-lg w-40 animate-pulse' />
      </div>
    </div>
    <div className='h-9 bg-surface-container rounded-full w-28 animate-pulse' />
  </div>
)

export const ScanViewHeader = ({
  title,
  isScanning,
  isLoading,
  description,
  className = '',
}: IScanProps) => {
  return (
    <div>
      <Skeletoned isLoading={isLoading} skeleton={<HeaderSkeleton />}>
        <div className={cn('flex items-center justify-between', className)}>
          <div className='flex items-center gap-4'>
            <div className='p-3 rounded-xl from-primary/10 to-primary/5 border border-primary/20'>
              <Icon size='2xl' className='text-primary'>
                📡
              </Icon>
            </div>

            <div>
              <Heading level={1}>{title}</Heading>
              <Caption className='text-on-surface-variant'>{description}</Caption>
            </div>
          </div>

          <Badge
            variant={isScanning ? 'primary' : 'outline'}
            size='lg'
            className={`font-medium ${isScanning ? 'animate-pulse' : ''}`}
          >
            <div className='flex items-center gap-2'>
              <Icon size='sm'>{isScanning ? '⚡' : '⏸️'}</Icon>
              {isScanning ? 'СКАНИРУЕТ' : 'НА ПАУЗЕ'}
            </div>
          </Badge>
        </div>
      </Skeletoned>

      <Divider />
    </div>
  )
}
