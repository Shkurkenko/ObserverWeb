import type { Meta, StoryObj } from '@storybook/preact'
import { Section } from '../../../Components/Layouts/Section/Section'
import { Card } from '../../../Components/Layouts/Card'
import { Button } from '../../../Components/Button'
import { Grid } from '../../../Components/Layouts/Grid'

const meta: Meta<typeof Section> = {
  title: 'Components/Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок секции',
    },
    description: {
      control: 'text',
      description: 'Описание секции',
    },
    titleVariant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4'],
      description: 'Вариант заголовка',
    },
    divider: {
      control: 'boolean',
      description: 'Разделитель под заголовком',
    },
    density: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
      description: 'Плотность контента',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
  },
  args: {
    title: 'Заголовок секции',
    description: 'Описание секции для пояснения содержимого',
    titleVariant: 'h2',
    density: 'comfortable',
  },
}

export default meta
type Story = StoryObj<typeof Section>

export const Default: Story = {
  render: (args) => (
    <Section {...args}>
      <Card title='Пример карточки'>
        <p>
          Основное содержимое секции. Это демонстрационный текст для отображения контента внутри
          секции.
        </p>
      </Card>
    </Section>
  ),
}

export const WithActions: Story = {
  args: {
    title: 'Настройки пользователя',
    description: 'Управление профилем и предпочтениями',
    actions: (
      <div className='flex gap-2'>
        <Button size='sm' variant='outline'>
          Редактировать
        </Button>
        <Button size='sm'>Сохранить</Button>
      </div>
    ),
  },
  render: (args) => (
    <Section {...args}>
      <div className='space-y-4'>
        <Card title='Личная информация'>
          <p>Имя: Иван Иванов</p>
          <p>Email: ivan@example.com</p>
        </Card>
        <Card title='Настройки уведомлений'>
          <p>Получать email-уведомления</p>
        </Card>
      </div>
    </Section>
  ),
}

export const WithDivider: Story = {
  args: {
    title: 'Отчеты',
    description: 'Аналитика и статистика за последний месяц',
    divider: true,
  },
  render: (args) => (
    <Section {...args}>
      <Grid columns={1} md={2} lg={3} gap='md'>
        <Card title='Посещаемость' compact>
          1,234 посетителя
        </Card>
        <Card title='Конверсия' compact>
          5.6%
        </Card>
        <Card title='Доход' compact>
          $12,345
        </Card>
      </Grid>
    </Section>
  ),
}

export const TitleVariants: Story = {
  render: () => (
    <div className='space-y-8'>
      <Section title='Секция H1' titleVariant='h1'>
        <Card>Секция с заголовком H1 (самый крупный)</Card>
      </Section>
      <Section title='Секция H2' titleVariant='h2'>
        <Card>Секция с заголовком H2 (стандартный)</Card>
      </Section>
      <Section title='Секция H3' titleVariant='h3'>
        <Card>Секция с заголовком H3 (поменьше)</Card>
      </Section>
      <Section title='Секция H4' titleVariant='h4'>
        <Card>Секция с заголовком H4 (самый маленький)</Card>
      </Section>
    </div>
  ),
}

export const DensityVariants: Story = {
  render: () => (
    <div className='space-y-8'>
      <Section title='Компактная плотность' density='compact'>
        <Card>Первый элемент</Card>
        <Card>Второй элемент</Card>
        <Card>Третий элемент</Card>
      </Section>
      <Section title='Комфортная плотность' density='comfortable'>
        <Card>Первый элемент</Card>
        <Card>Второй элемент</Card>
        <Card>Третий элемент</Card>
      </Section>
      <Section title='Просторная плотность' density='spacious'>
        <Card>Первый элемент</Card>
        <Card>Второй элемент</Card>
        <Card>Третий элемент</Card>
      </Section>
    </div>
  ),
}

export const WithoutTitle: Story = {
  args: {
    title: undefined,
    description: undefined,
  },
  render: (args) => (
    <Section {...args}>
      <Card title='Секция без заголовка'>
        <p>
          Эта секция не имеет заголовка или описания. Подходит для чистого отображения контента.
        </p>
        <p>
          Часто используется для встраивания в другие макеты или когда заголовок предоставляется
          родительским компонентом.
        </p>
      </Card>
    </Section>
  ),
}

export const ComplexExample: Story = {
  render: () => (
    <Section
      title='Панель управления'
      description='Обзор ключевых метрик и активностей'
      actions={
        <Button>
          <span className='flex items-center gap-2'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            Добавить виджет
          </span>
        </Button>
      }
      divider
      density='comfortable'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card title='Пользователи' compact accent='primary'>
          <div className='text-3xl font-bold'>2,847</div>
          <p className='text-sm text-green-600'>+12.5% за месяц</p>
        </Card>
        <Card title='Доход' compact accent='secondary'>
          <div className='text-3xl font-bold'>$45,678</div>
          <p className='text-sm text-green-600'>+8.2% за месяц</p>
        </Card>
        <Card title='Конверсия' compact accent='tertiary'>
          <div className='text-3xl font-bold'>4.8%</div>
          <p className='text-sm text-red-600'>-0.3% за месяц</p>
        </Card>
        <Card title='Оценка' compact accent='primary'>
          <div className='text-3xl font-bold'>4.7</div>
          <p className='text-sm text-green-600'>+0.2 за месяц</p>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
        <Card title='Активность пользователей'>
          <div className='h-48 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center'>
            <p className='text-gray-500'>График активности</p>
          </div>
        </Card>
        <Card title='Распределение по странам'>
          <div className='h-48 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center'>
            <p className='text-gray-500'>Карта распределения</p>
          </div>
        </Card>
      </div>

      <Card title='Последние действия' className='mt-6'>
        <div className='space-y-3'>
          <div className='flex justify-between items-center border-b pb-3'>
            <div>
              <p className='font-medium'>Новый пользователь зарегистрирован</p>
              <p className='text-sm text-gray-500'>Иван Петров</p>
            </div>
            <span className='text-sm text-gray-500'>10 минут назад</span>
          </div>
          <div className='flex justify-between items-center border-b pb-3'>
            <div>
              <p className='font-medium'>Оплачен заказ #12345</p>
              <p className='text-sm text-gray-500'>Сумма: $299</p>
            </div>
            <span className='text-sm text-gray-500'>2 часа назад</span>
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-medium'>Обновлен профиль компании</p>
              <p className='text-sm text-gray-500'>Изменен логотип</p>
            </div>
            <span className='text-sm text-gray-500'>Вчера</span>
          </div>
        </div>
      </Card>
    </Section>
  ),
}

export const NestedSections: Story = {
  render: () => (
    <div className='space-y-8'>
      <Section title='Главная панель' description='Ключевые метрики и быстрый доступ' divider>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card title='Статистика' compact>
            Данные
          </Card>
          <Card title='Уведомления' compact>
            Список
          </Card>
          <Card title='Быстрые действия' compact>
            Кнопки
          </Card>
        </div>
      </Section>

      <Section
        title='Аналитика'
        description='Подробные отчеты и графики'
        actions={<Button variant='outline'>Экспорт данных</Button>}
        divider
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <Card title='Тенденции'>График</Card>
          <Card title='Сравнение'>Диаграмма</Card>
        </div>
      </Section>

      <Section title='Настройки' description='Конфигурация системы'>
        <Card title='Общие настройки'>Параметры</Card>
      </Section>
    </div>
  ),
}

export const ResponsiveExample: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  render: () => (
    <Section
      title='Адаптивный пример'
      description='Эта секция адаптируется под разные размеры экрана'
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card className='bg-blue-50 dark:bg-blue-900/20' compact>
          <div className='text-center'>
            <div className='text-2xl font-bold'>375px</div>
            <p className='text-sm'>Мобильный</p>
          </div>
        </Card>
        <Card className='bg-green-50 dark:bg-green-900/20' compact>
          <div className='text-center'>
            <div className='text-2xl font-bold'>768px</div>
            <p className='text-sm'>Планшет</p>
          </div>
        </Card>
        <Card className='bg-yellow-50 dark:bg-yellow-900/20' compact>
          <div className='text-center'>
            <div className='text-2xl font-bold'>1024px</div>
            <p className='text-sm'>Ноутбук</p>
          </div>
        </Card>
        <Card className='bg-purple-50 dark:bg-purple-900/20' compact>
          <div className='text-center'>
            <div className='text-2xl font-bold'>1440px</div>
            <p className='text-sm'>Десктоп</p>
          </div>
        </Card>
      </div>
      <div className='mt-4 text-sm text-gray-500 text-center'>
        Измените размер окна браузера, чтобы увидеть адаптивность
      </div>
    </Section>
  ),
}
