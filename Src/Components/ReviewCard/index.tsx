import { Card } from '../Layouts/Card'
import { Text } from '../Typography/Text'
import { Caption } from '../Typography/Caption'
import { Icon } from '../Typography/Icon'
import { Badge } from '../Badge'

interface ReviewCardProps {
  rating: number
  title: string
  content: string
  author: string
  date: string
  className?: string
}

export const ReviewCard = ({
  rating,
  title,
  content,
  author,
  date,
  className,
}: ReviewCardProps) => (
  <Card variant='filled' className={className}>
    <div className='flex items-start justify-between'>
      <div className='space-y-2'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, i) => (
              <Icon key={i} size='sm' className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
                ⭐
              </Icon>
            ))}
          </div>
          <Text bold className='text-on-surface'>
            {title}
          </Text>
        </div>
        <Text className='text-on-surface-variant italic'>"{content}"</Text>
        <Caption className='text-on-surface-variant/70'>
          {date} • {author}
        </Caption>
      </div>
      <Badge variant='default' className='bg-green-500/10 text-green-600'>
        {rating}/5
      </Badge>
    </div>
  </Card>
)
