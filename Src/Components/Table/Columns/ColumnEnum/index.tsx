import { Flex } from '@Components/Layouts/Flex'

import { cn } from '@Utils/Helpers'

import './style.sass'

export interface ColumnEnumProps {
  index: number
  className?: string
}

export const ColumnEnum = ({ index, className = '' }: ColumnEnumProps) => {
  return (
    <Flex align='center' className={cn(className, 'w-full h-full column-enum')}>
      {index + 1}
    </Flex>
  )
}
