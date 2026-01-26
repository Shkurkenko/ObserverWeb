// Src/Components/Examples/ProductCard.tsx
import { Card } from '../Layouts/Card'
import { Text } from '../Typography/Text'
import { Caption } from '../Typography/Caption'
import { Icon } from '../Typography/Icon'
import { Badge } from '../Badge'
import { Button } from '../Button'

interface ProductCardProps {
  title: string
  description: string
  price: string
  features: string[]
  inStock?: boolean
  deliveryTime?: string
  className?: string
}

export const ProductCard = ({
  title,
  description,
  price,
  features,
  inStock = true,
  deliveryTime = '1-3 дня',
  className,
}: ProductCardProps) => (
  <Card
    variant='elevated'
    className={`border-2 border-primary/20 bg-linear-to-br from-primary/5 to-transparent ${className}`}
  >
    <Text bold className='text-on-surface mb-4'>
      {title}
    </Text>
    <div className='space-y-6'>
      <div>
        <Text className='text-4xl font-bold text-primary'>{price}</Text>
        <Caption className='text-on-surface-variant'>Цена с учетом всех налогов</Caption>
      </div>
      <div className='space-y-3'>
        <Badge
          variant={inStock ? 'success' : 'error'}
          className={inStock ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}
        >
          {inStock ? 'В наличии' : 'Нет в наличии'}
        </Badge>
        <div className='flex items-center gap-2'>
          <Icon size='sm' className='text-green-500'>
            🚚
          </Icon>
          <Caption className='text-on-surface-variant'>Доставка за {deliveryTime}</Caption>
        </div>
      </div>
      <Button variant='primary' className='w-full'>
        Добавить в корзину
      </Button>
    </div>
  </Card>
)
