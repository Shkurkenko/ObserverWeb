// AlertItem.stories.tsx
import { useState } from 'preact/hooks'
import { AlertItemProps } from '../../../Components/Alerts/AlertItem'
import type { Meta, StoryObj } from '@storybook/preact'
import type { AlertLevelType } from '../../../Components/Alerts/Alerts.types'
import { AlertItem } from '../../../Components/Alerts/AlertItem'
import { AlertList } from '../../../Components/Alerts/AlertList'
import { AlertLevel, type Alert } from '../../../Components/Alerts/Alerts.types'
import { AlertRoot } from '../../../Components/Alerts/Components/AlertRoot'
import { AlertIcon } from '../../../Components/Alerts/Components/AlertIcon'
import { AlertHeader } from '../../../Components/Alerts/Components/AlertHeader'
import { AlertMessage } from '../../../Components/Alerts/Components/AlertMessage'
import { AlertClose } from '../../../Components/Alerts/Components/AlertClose'
import { HugeiconsIcon } from '@hugeicons/react'
import { CancelCircleIcon } from '@hugeicons/core-free-icons'
import { Box } from '../../../Components/Layouts/Box'
import { Stack } from '../../../Components/Layouts/Stack'
import { Button } from '../../../Components/Button'
import type { AlertConfig } from '../../../Components/Alerts/Alerts.config'

// ==================== МЕТАДАННЫЕ ====================

const meta: Meta<typeof AlertItem> = {
  title: 'Components/Feedback/Alerts',
  component: AlertItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          Компоненты для отображения уведомлений и алертов.
          Поддерживают 5 типов: Error, Success, Warning, Info, Default.
          Возможна кастомизация через render-пропсы.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(AlertLevel),
      description: 'Тип алерта (определяет цвет, иконку, поведение)',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    header: {
      control: 'text',
      description: 'Заголовок алерта',
    },
    message: {
      control: 'text',
      description: 'Текст сообщения',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Колбек при закрытии алерта',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
  },
  args: {
    id: 'alert-1',
    type: AlertLevel.Info,
    header: 'Заголовок уведомления',
    message: 'Текст сообщения с подробным описанием ситуации',
    onDismiss: (id: string) => console.log('Dismissed:', id),
  },
}

export default meta
type Story = StoryObj<typeof AlertItem>

// ==================== БАЗОВЫЕ ВАРИАНТЫ ====================

/**
 * Все типы алертов в сравнении
 */
export const AllTypes: Story = {
  render: () => (
    <Stack className='w-[400px] gap-4'>
      <AlertItem
        id='1'
        type={AlertLevel.Error}
        header='Ошибка валидации'
        message='Не все обязательные поля заполнены'
      />
      <AlertItem
        id='2'
        type={AlertLevel.Success}
        header='Данные сохранены'
        message='Изменения успешно применены'
      />
      <AlertItem
        id='3'
        type={AlertLevel.Warning}
        header='Внимание'
        message='Срок действия лицензии истекает через 3 дня'
      />
      <AlertItem
        id='4'
        type={AlertLevel.Info}
        header='Обновление системы'
        message='Доступна новая версия приложения'
      />
      <AlertItem
        id='5'
        type={AlertLevel.Default}
        header='Уведомление'
        message='У вас 3 непрочитанных сообщения'
      />
    </Stack>
  ),
}

/**
 * Алерт с типом Error
 */
export const Error: Story = {
  args: {
    type: AlertLevel.Error,
    header: 'Критическая ошибка',
    message: 'Не удалось установить соединение с сервером. Проверьте подключение к интернету.',
  },
}

/**
 * Алерт с типом Success
 */
export const Success: Story = {
  args: {
    type: AlertLevel.Success,
    header: 'Операция выполнена',
    message: 'Данные успешно экспортированы в формате CSV',
  },
}

/**
 * Алерт с типом Warning
 */
export const Warning: Story = {
  args: {
    type: AlertLevel.Warning,
    header: 'Требуется подтверждение',
    message: 'Вы собираетесь удалить 5 выбранных элементов',
  },
}

/**
 * Алерт с типом Info
 */
export const Info: Story = {
  args: {
    type: AlertLevel.Info,
    header: 'Новая функция',
    message: 'Теперь вы можете настраивать уведомления в личном кабинете',
  },
}

/**
 * Алерт с типом Default
 */
export const Default: Story = {
  args: {
    type: AlertLevel.Default,
    header: 'Системное уведомление',
    message: 'Плановое обслуживание сервера запланировано на 03:00',
  },
}

// ==================== ВАРИАНТЫ С ДЛИННЫМ ТЕКСТОМ ====================

/**
 * Алерт с очень длинным заголовком
 */
export const LongHeader: Story = {
  args: {
    type: AlertLevel.Warning,
    header:
      'Это очень длинный заголовок который может не поместиться в одну строку и должен корректно переноситься',
    message: 'Краткое сообщение',
  },
}

/**
 * Алерт с очень длинным сообщением
 */
export const LongMessage: Story = {
  args: {
    type: AlertLevel.Info,
    header: 'Информация',
    message:
      'Это очень длинное сообщение которое должно корректно переноситься на несколько строк. Здесь может быть подробное описание ситуации, инструкции для пользователя или любая другая информация которая не помещается в одну строку. Важно чтобы текст не вылезал за границы компонента и правильно отображался на всех размерах экрана.',
  },
}

/**
 * Алерт с длинным заголовком и сообщением
 */
export const LongContent: Story = {
  args: {
    type: AlertLevel.Error,
    header: 'Критическая ошибка при обработке запроса к удаленному серверу',
    message:
      'Не удалось выполнить запрос к API. Код ошибки: 500 Internal Server Error. Попробуйте повторить попытку позже или обратитесь в службу поддержки если проблема persists.',
  },
}

// ==================== КАСТОМНЫЙ РЕНДЕР ====================

// ==================== КАСТОМНЫЙ РЕНДЕР ====================

/**
 * Кастомная иконка для алерта
 */
export const CustomIcon: Story = {
  args: {
    id: 'custom-icon-1',
    type: AlertLevel.Info,
    header: 'Кастомная иконка',
    message: 'Пример алерта с кастомной иконкой вместо стандартной',
    onDismiss: (id: string) => console.log('Dismissed:', id),
  },
  render: (args) => {
    // args уже имеет правильный тип от Storybook
    return (
      <AlertItem
        id={args.id}
        type={args.type}
        header={args.header}
        message={args.message}
        onDismiss={args.onDismiss}
        renderers={{
          renderIcon: (type, config) => (
            <div className='p-2 rounded-full' style={{ backgroundColor: config.colors.light }}>
              <span className='text-2xl'>🔔</span>
            </div>
          ),
        }}
      />
    )
  },
}

/**
 * Кастомный заголовок с HTML
 */
export const CustomHeader: Story = {
  args: {
    id: 'custom-header-1',
    type: AlertLevel.Success,
    header: 'Успешная операция',
    message: 'Все изменения сохранены',
    onDismiss: (id: string) => console.log('Dismissed:', id),
  },
  render: (args) => (
    <AlertItem
      id={args.id}
      type={args.type}
      header={args.header}
      message={args.message}
      onDismiss={args.onDismiss}
      renderers={{
        renderHeader: (header) => (
          <div className='flex items-center gap-2'>
            <span className='font-bold'>{header}</span>
            <span className='px-2 py-1 text-xs bg-blue-100 rounded-full'>NEW</span>
          </div>
        ),
      }}
    />
  ),
}

/**
 * Кастомное сообщение с форматированием
 */
export const CustomMessage: Story = {
  args: {
    id: 'custom-message-1',
    type: AlertLevel.Info,
    header: 'Детальная информация',
    message: 'Основное сообщение',
    onDismiss: (id: string) => console.log('Dismissed:', id),
  },
  render: (args) => (
    <AlertItem
      id={args.id}
      type={args.type}
      header={args.header}
      message={args.message}
      onDismiss={args.onDismiss}
      renderers={{
        renderMessage: (message) => (
          <div className='space-y-2'>
            <p className='font-medium'>{message}</p>
            <ul className='pl-4 text-sm list-disc'>
              <li>Деталь 1</li>
              <li>Деталь 2</li>
              <li>Деталь 3</li>
            </ul>
          </div>
        ),
      }}
    />
  ),
}

/**
 * Полностью кастомный алерт
 */
export const FullyCustom: Story = {
  args: {
    id: 'fully-custom-1',
    type: AlertLevel.Warning,
    header: 'Внимание',
    message: 'Проверьте введенные данные',
    onDismiss: (id: string) => console.log('Dismissed:', id),
  },
  render: (args) => (
    <AlertItem
      id={args.id}
      type={args.type}
      header={args.header}
      message={args.message}
      onDismiss={args.onDismiss}
      renderers={{
        renderIcon: (type, config) => (
          <div className='w-10 h-10 rounded-full' style={{ backgroundColor: config.colors.base }} />
        ),
        renderHeader: (header) => (
          <h3 className='text-lg font-black uppercase tracking-wider'>{header}</h3>
        ),
        renderMessage: (message) => (
          <div className='p-3 mt-2 bg-gray-50 rounded border-l-2 border-gray-300'>
            <p className='text-sm italic'>{message}</p>
          </div>
        ),
      }}
    />
  ),
}

// ==================== СПИСОК АЛЕРТОВ ====================

/**
 * Моковые данные для списка
 */
const mockAlerts: Alert[] = [
  {
    id: '1',
    type: AlertLevel.Error,
    header: 'Ошибка загрузки',
    message: 'Не удалось загрузить файл конфигурации',
    timestamp: new Date(),
    read: false,
    ttl: 0,
  },
  {
    id: '2',
    type: AlertLevel.Success,
    header: 'Готово',
    message: 'Отчет успешно сгенерирован',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: true,
    ttl: 5000,
  },
  {
    id: '3',
    type: AlertLevel.Warning,
    header: 'Скоро отключение',
    message: 'Сессия истекает через 5 минут',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    ttl: 0,
  },
  {
    id: '4',
    type: AlertLevel.Info,
    header: 'Обновление',
    message: 'Доступна новая версия 2.0.0',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: false,
    ttl: 86400000,
  },
  {
    id: '5',
    type: AlertLevel.Default,
    header: 'Уведомление',
    message: 'У вас 3 новых сообщения',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
    ttl: 0,
  },
]

/**
 * Простой список алертов
 */
export const SimpleList: StoryObj<typeof AlertList> = {
  render: () => (
    <Box className='w-[400px] border rounded-lg shadow-lg'>
      <AlertList alerts={mockAlerts} onAlertDismiss={(id) => console.log('dismiss', id)} />
    </Box>
  ),
}

/**
 * Список с группировкой по типу
 */
export const GroupedList: StoryObj<typeof AlertList> = {
  render: () => (
    <Box className='w-[400px] border rounded-lg shadow-lg'>
      <AlertList
        alerts={mockAlerts}
        groupByType
        showGroupHeaders
        onAlertDismiss={(id) => console.log('dismiss', id)}
      />
    </Box>
  ),
}

/**
 * Список с кастомным рендером
 */
export const ListWithCustomRender: StoryObj<typeof AlertList> = {
  render: () => (
    <Box className='w-[400px] border rounded-lg shadow-lg'>
      <AlertList
        alerts={mockAlerts}
        renderAlert={(alert, onDismiss) => (
          <Box className='p-3 mb-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-bold uppercase tracking-wider text-blue-600'>
                {alert.type}
              </span>
              <button
                onClick={() => onDismiss?.(alert.id)}
                className='text-xs text-gray-400 hover:text-gray-600'
              >
                ✕
              </button>
            </div>
            <h4 className='mt-1 font-bold'>{alert.header}</h4>
            <p className='text-sm text-gray-600'>{alert.message}</p>
          </Box>
        )}
      />
    </Box>
  ),
}

/**
 * Пустой список
 */
export const EmptyList: StoryObj<typeof AlertList> = {
  render: () => (
    <Box className='w-[400px] border rounded-lg shadow-lg'>
      <AlertList
        alerts={[]}
        emptyState={
          <div className='py-12 text-center'>
            <span className='text-4xl mb-4 block'>🔔</span>
            <h3 className='text-lg font-semibold text-gray-700'>Нет уведомлений</h3>
            <p className='text-sm text-gray-500'>У вас всё хорошо, отдыхайте!</p>
          </div>
        }
      />
    </Box>
  ),
}

/**
 * Список с ограничением по высоте
 */
export const ScrollableList: StoryObj<typeof AlertList> = {
  render: () => {
    const manyAlerts = Array.from({ length: 20 }).map((_, i) => ({
      id: `${i}`,
      type: [AlertLevel.Error, AlertLevel.Success, AlertLevel.Warning, AlertLevel.Info][
        i % 4
      ] as AlertLevelType,
      header: `Уведомление ${i + 1}`,
      message: `Сообщение номер ${i + 1} с каким-то текстом`,
      timestamp: new Date(Date.now() - 1000 * 60 * i),
      read: i % 2 === 0,
      ttl: 0,
    }))

    return (
      <Box className='w-[400px] h-[500px] border rounded-lg shadow-lg'>
        <AlertList alerts={manyAlerts} maxHeight='500px' />
      </Box>
    )
  },
}

// ==================== БАЗОВЫЕ КОМПОНЕНТЫ ====================

/**
 * Демонстрация базовых компонентов алерта
 */
export const BaseComponents: Story = {
  render: () => (
    <Stack className='w-[400px] gap-6'>
      <Box className='p-4 border rounded-lg'>
        <h3 className='mb-3 font-bold'>AlertRoot + AlertHeader</h3>
        <AlertRoot color='#3B82F6'>
          <AlertHeader color='#3B82F6'>Заголовок</AlertHeader>
        </AlertRoot>
      </Box>

      <Box className='p-4 border rounded-lg'>
        <h3 className='mb-3 font-bold'>AlertIcon</h3>
        <AlertRoot color='#10B981'>
          <AlertIcon color='#10B981'>
            <HugeiconsIcon icon={CancelCircleIcon} size={24} />
          </AlertIcon>
          <AlertHeader color='#10B981'>С иконкой</AlertHeader>
        </AlertRoot>
      </Box>

      <Box className='p-4 border rounded-lg'>
        <h3 className='mb-3 font-bold'>AlertMessage</h3>
        <AlertRoot color='#8B5CF6'>
          <AlertHeader color='#8B5CF6'>С сообщением</AlertHeader>
          <AlertMessage>Текст сообщения с подробностями</AlertMessage>
        </AlertRoot>
      </Box>

      <Box className='p-4 border rounded-lg'>
        <h3 className='mb-3 font-bold'>AlertClose</h3>
        <AlertRoot color='#EF4444'>
          <AlertHeader color='#EF4444'>С кнопкой закрытия</AlertHeader>
          <AlertClose onClose={() => alert('closed')} />
        </AlertRoot>
      </Box>

      <Box className='p-4 border rounded-lg'>
        <h3 className='mb-3 font-bold'>Полный набор</h3>
        <AlertRoot color='#F59E0B'>
          <AlertIcon color='#F59E0B'>
            <HugeiconsIcon icon={CancelCircleIcon} size={24} />
          </AlertIcon>
          <AlertHeader color='#F59E0B'>Заголовок</AlertHeader>
          <AlertMessage>Текст сообщения с подробным описанием</AlertMessage>
          <AlertClose onClose={() => alert('closed')} />
        </AlertRoot>
      </Box>
    </Stack>
  ),
}

// ==================== ИНТЕРАКТИВНЫЕ ПРИМЕРЫ ====================

/**
 * Интерактивный пример с добавлением алертов
 */
export const Interactive: Story = {
  render: () => {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [counter, setCounter] = useState(0)

    const addAlert = (type: AlertLevelType) => {
      setAlerts((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type,
          header: `${type} #${counter + 1}`,
          message: `Это ${type} уведомление`,
          timestamp: new Date(),
          read: false,
          ttl: 5000,
        },
      ])
      setCounter((c) => c + 1)
    }

    const dismissAlert = (id: string) => {
      setAlerts((prev) => prev.filter((a) => a.id !== id))
    }

    return (
      <Box className='w-[500px] p-4 border rounded-lg'>
        <Stack className='mb-4 gap-2'>
          <h3 className='font-bold'>Интерактивный пример</h3>
          <div className='flex gap-2 flex-wrap'>
            <Button onClick={() => addAlert(AlertLevel.Error)} variant='danger' size='sm'>
              Добавить ошибку
            </Button>
            <Button onClick={() => addAlert(AlertLevel.Success)} variant='primary' size='sm'>
              Добавить успех
            </Button>
            <Button onClick={() => addAlert(AlertLevel.Warning)} variant='primary' size='sm'>
              Добавить предупреждение
            </Button>
            <Button onClick={() => addAlert(AlertLevel.Info)} variant='primary' size='sm'>
              Добавить информацию
            </Button>
          </div>
          <div className='flex gap-2'>
            <Button onClick={() => setAlerts([])} variant='outline' size='sm'>
              Очистить всё
            </Button>
          </div>
        </Stack>

        <Box className='h-[400px] overflow-y-auto border rounded-lg p-2'>
          <AlertList alerts={alerts} onAlertDismiss={dismissAlert} />
        </Box>
      </Box>
    )
  },
}
