import { Card } from '@Components/Layouts/Card'
import { Text, Caption } from '@Components/Typography'
import { Button } from '@Components/Button'
import { Icon } from '@Components/Typography'

import { cn } from '@Utils/Helpers'
export interface ActionCardProps {
  /** Заголовок карточки */
  title: string
  /** Описание карточки */
  description: string
  /** Текст кнопки действия */
  actionLabel?: string
  /** Обработчик клика по кнопке */
  onAction?: () => void
  /** Название иконки или SVG элемент */
  icon?: string
  /** Дополнительные CSS классы */
  className?: string
}

/**
 * Карточка с действием - компонент для отображения контента с возможным действием.
 * Появляющаяся при наведении кнопка и анимированные состояния.
 *
 * @component
 * @example
 * // Базовая карточка
 * <ActionCard
 *   title="Новый проект"
 *   description="Создайте новый проект для начала работы"
 * />
 *
 * @example
 * // Карточка с иконкой и действием
 * <ActionCard
 *   title="Аналитика"
 *   description="Просмотрите статистику и отчеты"
 *   icon="📊"
 *   actionLabel="Открыть"
 *   onAction={() => navigate('/analytics')}
 * />
 *
 * @example
 * // Карточка в списке действий
 * <div className="space-y-4">
 *   <ActionCard
 *     title="Настройки профиля"
 *     description="Обновите личную информацию"
 *     icon="⚙️"
 *     actionLabel="Настроить"
 *     onAction={handleSettings}
 *   />
 *   <ActionCard
 *     title="Уведомления"
 *     description="Настройте способ получения уведомлений"
 *     icon="🔔"
 *     actionLabel="Изменить"
 *     onAction={handleNotifications}
 *   />
 * </div>
 *
 * @example
 * // Карточка с кастомными стилями
 * <ActionCard
 *   title="Важное обновление"
 *   description="Доступна новая версия системы"
 *   icon="🚀"
 *   actionLabel="Обновить"
 *   onAction={handleUpdate}
 *   className="max-w-md mx-auto"
 * />
 *
 * @param props - Свойства компонента
 * @param props.title - Заголовок карточки (обязательно)
 * @param props.description - Описание карточки (обязательно)
 * @param props.actionLabel - Текст на кнопке действия (опционально)
 * @param props.onAction - Функция, вызываемая при клике на кнопку (опционально)
 * @param props.icon - Иконка для отображения слева от заголовка (опционально)
 * @param props.className - Дополнительные CSS классы для кастомизации (опционально)
 *
 * @returns JSX элемент карточки с действием
 */
export const ActionCard = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: ActionCardProps) => (
  <Card
    className={cn(
      'group border border-outline-variant/50 bg-surface-container p-6 transition-all hover:border-primary/50 hover:bg-surface-container-high',
      className,
    )}
  >
    <div className='flex items-start justify-between'>
      <div className='space-y-2'>
        <div className='flex items-center gap-3'>
          {icon && (
            <div className='rounded-lg bg-primary/10 p-2'>
              <Icon size='md' className='text-primary'>
                {icon}
              </Icon>
            </div>
          )}
          <div>
            <Text bold className='text-on-surface'>
              {title}
            </Text>
            <Caption className='mt-1 text-on-surface-variant'>{description}</Caption>
          </div>
        </div>
      </div>
      {onAction && (
        <Button
          variant='outline'
          size='sm'
          onClick={onAction}
          className='opacity-0 group-hover:opacity-100 transition-all duration-200'
        >
          {actionLabel}
        </Button>
      )}
    </div>
  </Card>
)
