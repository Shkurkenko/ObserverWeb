import { type StylableProps } from '../../Shared/Common.types'
import { Box } from '../../Layouts/Box'
import { Text } from '../../Typography'

import { cn } from '../../../Utils/Helpers'

export interface AlertMessageProps extends StylableProps {
  children: string
}

export const AlertMessage = ({ children, className = '' }: AlertMessageProps) => {
  return (
    <Box as='article' className='alert-content text-wrap'>
      <Text className={cn('ml-5 line-clamp-3', className)}>{children}</Text>
    </Box>
  )
}
