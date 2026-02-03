import { Flex } from '../../../Layouts/Flex'
import { cn } from '../../../../Utils/Helpers'

import './style.sass'

interface IColumnEnumProps {
  index: number
  className?: string
}

export const ColumnEnum = ({ index, className = '' }: IColumnEnumProps) => {
  return (
    <Flex align='center' className={cn(className, 'w-full h-full column-enum')}>
      {index + 1}
    </Flex>
  )
}
