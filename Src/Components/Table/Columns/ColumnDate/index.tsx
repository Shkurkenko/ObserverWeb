import { Box } from '@Components/Layouts/Box'

import { cn } from '@Utils/Helpers'

import './style.sass'

export interface ColumnDateProps {
  dateString: string
  className?: string
}

export const ColumnDate = ({ dateString, className = '' }: ColumnDateProps) => {
  return (
    <Box className={cn(className, 'w-full h-full column-date')}>
      {new Date(dateString).toLocaleDateString()}
    </Box>
  )
}
