import { AlertRoot } from '../Components/AlertRoot'
import { AlertClose } from '../Components/AlertClose'
import { AlertHeader } from '../Components/AlertHeader'
import { AlertIcon } from '../Components/AlertIcon'
import { AlertMessage } from '../Components/AlertMessage'
import { HugeiconsIcon } from '@hugeicons/react'
import { CancelCircleIcon } from '@hugeicons/core-free-icons'
import { type StylableProps } from '../../Shared/Common.types'

interface ErrorAlertProps extends StylableProps {
  header: string
  message: string
  onClose?: () => void
}

export const ErrorAlert = ({ header, message, onClose, className = '' }: ErrorAlertProps) => {
  const color = 'blue'

  return (
    <AlertRoot color={color} variant='error' className={className}>
      <AlertIcon color={color}>
        <HugeiconsIcon icon={CancelCircleIcon} size={28} />
      </AlertIcon>

      <AlertHeader color={color}>{header}</AlertHeader>
      <AlertMessage>{message}</AlertMessage>

      {onClose && <AlertClose onClose={onClose} />}
    </AlertRoot>
  )
}
