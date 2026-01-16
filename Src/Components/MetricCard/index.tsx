// Src/Components/Examples/MetricCard.tsx
import { Card } from '../Layouts/Card'
import { Label } from '../Typography/Label'
import { Text } from '../Typography/Text'
import { Caption } from '../Typography/Caption'
import { Icon } from '../Typography/Icon'

interface MetricCardProps {
  title: string
  value: string | number
  trend?: number
  icon: string
  className?: string
}

export const MetricCard = ({ title, value, trend, icon, className }: MetricCardProps) => (
  <Card
    variant='elevated'
    className={`relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 ${className}`}
  >
    <div className='flex items-start justify-between'>
      <div>
        <Label className='text-sm font-medium text-on-surface-variant mb-2'>{title}</Label>
        <Text bold className='text-3xl font-bold text-on-surface'>
          {value}
        </Text>
        {trend !== undefined && (
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
