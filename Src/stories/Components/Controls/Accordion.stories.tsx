import type { Meta, StoryObj } from '@storybook/preact'
import { Accordion } from '../../../Components/Controls/Accordion'
import { ACCORDION_TEST_DATA } from '../../../../Data/AccordionTestData'
import { Heading } from '../../../Components/Typography'

const meta: Meta<typeof Accordion> = {
  title: 'Components/UI/Accordion',
  component: Accordion,
  tags: ['autodocs', 'ui', 'interactive'],

  // Декоратор для красивого оформления
  decorators: [
    (Story) => (
      <div className='min-h-screen bg-surface-container p-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-10'>
            <Heading level={1}>Accordion Component</Heading>
            <p className='text-gray-600'>
              Интерактивный компонент для отображения скрытого контента
            </p>
          </div>
          <Story />
        </div>
      </div>
    ),
  ],

  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Разрешить открывать несколько элементов одновременно',
    },
    onToggle: {
      action: 'toggled',
      description: 'Срабатывает при переключении состояния',
    },
    onOpen: { action: 'opened' },
    onClose: { action: 'closed' },
    className: { control: 'text' },
  },

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Компонент аккордеона позволяет организовать контент в раскрывающиеся секции. Идеально подходит для FAQ, настроек и сложных форм.',
      },
    },
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#f9fafb' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

// Пример 1: Базовый FAQ (самый частый кейс)
export const FAQExample: Story = {
  name: '📋 FAQ - Частые вопросы',
  args: {
    items: ACCORDION_TEST_DATA,
    allowMultiple: false,
  },
  decorators: [
    (Story) => (
      <div className='bg-white rounded-2xl shadow-lg p-6'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-3'>Часто задаваемые вопросы</h2>
          <p className='text-gray-600'>
            Найдите ответы на популярные вопросы о нашей библиотеке компонентов
          </p>
        </div>
        <Story />
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <p className='text-sm text-gray-500'>
            Не нашли ответ?{' '}
            <a href='#' className='text-primary-600 font-medium hover:underline'>
              Свяжитесь с поддержкой
            </a>
          </p>
        </div>
      </div>
    ),
  ],
}

// Пример 2: Настройки профиля
export const SettingsExample: Story = {
  name: '⚙️ Настройки профиля',
  args: {
    items: [
      {
        id: 'profile',
        title: 'Основная информация',
        content: (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Имя пользователя
              </label>
              <input
                type='text'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                defaultValue='alex_johnson'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input
                type='email'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                defaultValue='alex@example.com'
              />
            </div>
            <button className='px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'>
              Сохранить изменения
            </button>
          </div>
        ),
      },
      {
        id: 'privacy',
        title: 'Конфиденциальность',
        content: (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-gray-900'>Публичный профиль</p>
                <p className='text-sm text-gray-600'>Ваш профиль виден всем пользователям</p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input type='checkbox' className='sr-only peer' defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-gray-900'>Уведомления по email</p>
                <p className='text-sm text-gray-600'>Получать новости и обновления</p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input type='checkbox' className='sr-only peer' defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        ),
      },
      {
        id: 'notifications',
        title: 'Уведомления',
        content: 'Настройки уведомлений будут здесь...',
      },
    ],
    allowMultiple: true,
    defaultOpen: ['profile'],
  },
  decorators: [
    (Story) => (
      <div className='bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center'>
              <span className='text-2xl'>👤</span>
            </div>
            <div>
              <h2 className='text-2xl font-bold text-gray-900'>Настройки профиля</h2>
              <p className='text-gray-600'>Управляйте вашими персональными настройками</p>
            </div>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
}

// Пример 3: Документация API
export const APIReference: Story = {
  name: '📚 Документация API',
  args: {
    items: [
      {
        id: 'props',
        title: 'Свойства компонента',
        content: (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-surface-container-highest'>
              <thead>
                <tr className=''>
                  <th className='px-4 py-3 text-left text-xs font-medium text-on-surface 0 uppercase tracking-wider'>
                    Пропс
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-on-surface uppercase tracking-wider'>
                    Тип
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-on-surface uppercase tracking-wider'>
                    По умолчанию
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-on-surface uppercase tracking-wider'>
                    Описание
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-surface-container-high'>
                <tr>
                  <td className='px-4 py-3 text-sm font-mono text-primary-700'>items</td>
                  <td className='px-4 py-3 text-sm text-on-surface'>
                    IAccordionItemData[]
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>—</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>Массив элементов аккордеона</td>
                </tr>
                <tr className='bg-gray-50'>
                  <td className='px-4 py-3 text-sm font-mono text-primary-700'>allowMultiple</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>boolean</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>false</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    Разрешить множественное открытие
                  </td>
                </tr>
                <tr>
                  <td className='px-4 py-3 text-sm font-mono text-primary-700'>defaultOpen</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>(string | number)[]</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>[]</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    ID открытых по умолчанию элементов
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        id: 'events',
        title: 'События',
        content: 'Документация по событиям...',
        icon: '⚡',
      },
      {
        id: 'examples',
        title: 'Примеры использования',
        content: 'Различные примеры реализации...',
        icon: '🎯',
      },
    ],
    allowMultiple: true,
  },
  decorators: [
    (Story) => (
      <div className='bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 max-w-4xl w-full'>
        <div className='mb-8'>
          <div className='inline-flex items-center gap-2 px-3 py-1 bg-primary-500/20 rounded-full mb-4'>
            <span className='text-primary-400'>📚</span>
            <span className='text-primary-300 text-sm font-medium'>Документация</span>
          </div>
          <h2 className='text-3xl font-bold text-white mb-3'>Accordion API Reference</h2>
          <p className='text-gray-300'>Полное описание свойств, методов и событий компонента</p>
        </div>
        <Story />
      </div>
    ),
  ],
}

// Пример 4: Карточка продукта с характеристиками
export const ProductSpecs: Story = {
  name: '📦 Характеристики продукта',
  args: {
    items: [
      {
        id: 'general',
        title: 'Основные характеристики',
        content: (
          <ul className='space-y-3'>
            <li className='flex justify-between'>
              <span className='text-gray-600'>Производитель</span>
              <span className='font-medium'>Apple</span>
            </li>
            <li className='flex justify-between'>
              <span className='text-gray-600'>Модель</span>
              <span className='font-medium'>iPhone 15 Pro</span>
            </li>
            <li className='flex justify-between'>
              <span className='text-gray-600'>Год выпуска</span>
              <span className='font-medium'>2023</span>
            </li>
          </ul>
        ),
        icon: '📱',
      },
      {
        id: 'display',
        title: 'Дисплей',
        content: '6.1" Super Retina XDR, 2556x1179...',
        icon: '🖥️',
      },
      {
        id: 'camera',
        title: 'Камера',
        content: 'Основная: 48 Мп, сверхширокоугольная: 12 Мп...',
        icon: '📸',
      },
    ],
    allowMultiple: false,
    defaultOpen: ['general'],
  },
  decorators: [
    (Story) => (
      <div className='bg-white rounded-xl shadow-lg overflow-hidden max-w-md'>
        <div className='h-48 bg-gradient-to-r from-blue-500 to-purple-600'></div>
        <div className='p-6'>
          <div className='mb-6'>
            <h3 className='text-2xl font-bold text-gray-900'>iPhone 15 Pro</h3>
            <p className='text-primary-600 font-semibold text-lg mt-1'>от 99 990 ₽</p>
            <p className='text-gray-600 mt-2'>Титановый корпус. Чип A17 Pro. Кнопка действия.</p>
          </div>
          <div className='border-t pt-6'>
            <h4 className='font-semibold text-gray-900 mb-4'>Технические характеристики</h4>
            <Story />
          </div>
          <button className='w-full mt-8 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors'>
            Добавить в корзину
          </button>
        </div>
      </div>
    ),
  ],
}

// Пример 5: Playground для разработчиков
export const Playground: Story = {
  name: '🎮 Playground (для разработки)',
  args: {
    items: ACCORDION_TEST_DATA.slice(0, 3),
    allowMultiple: false,
    className: '',
  },
  argTypes: {
    'items[0].title': { control: 'text' },
    'items[0].content': { control: 'text' },
    'items[0].disabled': { control: 'boolean' },
    'items[1].title': { control: 'text' },
    'items[1].content': { control: 'text' },
  },
  decorators: [
    (Story, context) => (
      <div className='space-y-8'>
        <div className='bg-white rounded-xl shadow-lg p-6'>
          <div className='mb-6'>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Accordion Playground</h3>
            <p className='text-gray-600'>
              Используйте панель Controls справа для изменения свойств в реальном времени
            </p>
          </div>
          <Story />
        </div>

        {/* Панель информации */}
        <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
          <div className='flex items-start gap-3'>
            <div className='text-blue-500 mt-0.5'>💡</div>
            <div>
              <h4 className='font-medium text-blue-900 mb-1'>Информация о состоянии</h4>
              <ul className='text-sm text-blue-700 space-y-1'>
                <li>• allowMultiple: {context.args.allowMultiple ? 'true' : 'false'}</li>
                <li>• Количество элементов: {context.args.items?.length || 0}</li>
                <li>
                  • Отключенных элементов:{' '}
                  {context.args.items?.filter((item) => item.disabled).length || 0}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
}

// Пример 6: Темная тема
export const DarkTheme: Story = {
  name: '🌙 Темная тема',
  args: {
    items: ACCORDION_TEST_DATA,
    allowMultiple: true,
  },
  decorators: [
    (Story) => (
      <div className='bg-gray-900 rounded-2xl p-8'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-white mb-3'>Accordion в темной теме</h2>
          <p className='text-gray-400'>Демонстрация компонента с темным оформлением</p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
