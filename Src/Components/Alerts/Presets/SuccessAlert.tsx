import { CheckmarkCircle04Icon } from '@hugeicons/core-free-icons'
import { AlertRoot } from '../Components/AlertRoot'
import { AlertIcon } from '../Components/AlertIcon'
import { AlertHeader } from '../Components/AlertHeader'
import { AlertMessage } from '../Components/AlertMessage'
import { AlertClose } from '../Components/AlertClose'
import { HugeiconsIcon } from '@hugeicons/react'

export interface SuccessAlertProps {
  header: string
  message: string
  onClose?: () => void
}

export const SuccessAlert = ({ header, message, onClose }: SuccessAlertProps) => {
  const color = '#4CAF50'

  return (
    <AlertRoot color={color} variant='success'>
      <AlertIcon color={color}>
        <HugeiconsIcon icon={CheckmarkCircle04Icon} size={28} />
      </AlertIcon>

      <AlertHeader color={color}>{header}</AlertHeader>
      <AlertMessage>{message}</AlertMessage>

      {onClose && <AlertClose onClose={onClose} />}
    </AlertRoot>
  )
}
