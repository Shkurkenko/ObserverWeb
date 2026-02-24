import { Card } from '@Components/Layouts/Card'
import { Text, Caption } from '@Components/Typography'
import { Icon } from '@Components/Typography'
import { Label } from '@Components/Typography'

import { cn } from '@Utils/Helpers'

interface MetricCardProps {
  title: string
  value: string | number
  trend?: number
  icon: string
  className?: string
}

export const MetricCard = ({ title, value, trend, icon, className }: MetricCardProps) => (
  <Card
    className={cn(
      'relative overflow-hidden border border-outline-variant/50 bg-surface-container p-6 transition-all hover:shadow-lg hover:-translate-y-1',
      className,
    )}
  >
    <div className='flex items-start justify-between'>
      <div>
        <Label className='text-sm font-medium text-on-surface-variant mb-2'>{title}</Label>
        <Text bold className='text-3xl font-bold text-on-surface'>
          {value}
        </Text>
        {trend && (
          <div className='mt-2 flex items-center gap-1'>
            <Icon size='sm' className={trend > 0 ? 'text-green-500' : 'text-red-500'}>
              {trend > 0 ? '↑' : '↓'}
            </Icon>
            <Caption className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
              {Math.abs(trend)}%
            </Caption>
          </div>
        )}
      </div>
      <div className='rounded-lg bg-primary/10 p-2'>
        <Icon size='lg' className='text-primary'>
          {icon}
        </Icon>
      </div>
    </div>
  </Card>
)
