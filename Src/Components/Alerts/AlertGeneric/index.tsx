import { ComponentChildren } from 'preact'
import { Box } from '../../Layouts/Box'
import { Flex } from '../../Layouts/Flex'
import { Heading } from '../../Typography'
import { Stack } from '../../Layouts/Stack'
import { Text } from '../../Typography'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'

interface IAlertGenericProps {
  id: string
  color: string
  icon: ComponentChildren
  header: string
  message: string
  dismissAlert?: (id: string) => void
}

export function AlertGeneric({
  id,
  color,
  icon,
  header,
  message,
  dismissAlert,
}: IAlertGenericProps) {
  const handleClose = (e: Event) => {
    e.preventDefault()
    if (dismissAlert) dismissAlert(id)
  }

  return (
    <Box
      className='alert-item pr-6 overflow-hidden'
      style={{ borderLeft: `0.25rem solid ${color}` }}
    >
      <Stack className='overflow-hidden'>
        <Flex className='notification-header'>
          <Box className='notification-icon self-start' style={{ color }}>
            {icon}
          </Box>

          <Heading level={4} style={{ color }}>
            {header}
          </Heading>
        </Flex>

        <Box as='article' className='notification-content text-wrap'>
          <Text className='ml-5 line-clamp-3'>
            {message}{' '}
            sjdklfa;jsadlk;jfklsadjsdjfklsdjfksdfdskjflksdsjdfkjsdklfjsdlkjfklsdjfklsdjfksdjfksdjfksdjfklsdjfk
          </Text>
        </Box>
      </Stack>
      <Box className='close-notification' onClick={handleClose}>
        <HugeiconsIcon icon={Cancel01Icon} />
      </Box>
    </Box>
  )
}
