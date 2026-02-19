import { Box } from '../../Layouts/Box'
import { Text } from '../../Typography/Text'
import { Caption } from '../../Typography/Caption'
import { cn } from '../../../Utils/Helpers'

export interface ToastContentProps {
  /** Заголовок */
  header: string
  /** Сообщение */
  message?: string
  /** Цвет текста */
  color?: string
  /** Максимальное количество строк для сообщения */
  messageLines?: number
  /** Дополнительные классы */
  className?: string
}

/**
 * Контент тоста (заголовок и сообщение)
 */
export const ToastContent = ({
  header,
  message,
  color,
  messageLines = 2,
  className,
}: ToastContentProps) => {
  return (
    <Box className={cn('flex-1 min-w-0', className)}>
      <Text bold className='truncate' style={{ color }}>
        {header}
      </Text>
      {message && (
        <Caption
          className={cn(
            'mt-0.5',
            messageLines === 1 && 'truncate',
            messageLines === 2 && 'line-clamp-2',
            messageLines === 3 && 'line-clamp-3',
          )}
          style={{ color: color ? `${color}cc` : undefined }}
        >
          {message}
        </Caption>
      )}
    </Box>
  )
}
