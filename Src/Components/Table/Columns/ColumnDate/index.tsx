import { Box } from '../../../Layouts/Box'
import { cn } from '../../../../Utils/Helpers'

import './style.sass'

interface IColumnDateProps {
  dateString: string
  className?: string
}

export const ColumnDate = ({ dateString, className = '' }: IColumnDateProps) => {
  return (
    <Box className={cn(className, 'w-full h-full column-date')}>
      {new Date(dateString).toLocaleDateString()}
    </Box>
  )
}
