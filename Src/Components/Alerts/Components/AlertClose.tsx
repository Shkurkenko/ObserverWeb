import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { Box } from '../../Layouts/Box'
import { type StylableProps } from '../../Shared/Common.types'

import { cn } from '../../../Utils/Helpers'

export interface AlertCloseProps extends StylableProps {
  onClose?: (e: Event) => void
}

export const AlertClose = ({ onClose, className = '' }: AlertCloseProps) => {
  return (
    <Box className={cn('close-alert', className)} onClick={onClose}>
      <HugeiconsIcon icon={Cancel01Icon} />
    </Box>
  )
}
