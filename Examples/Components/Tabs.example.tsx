// examples/TabGroupExamples.tsx
import { useState } from 'preact/hooks'
import {
  TabGroup,
  UnderlineTabs,
  PillsTabs,
  OutlineTabs,
  VerticalTabs,
} from '../../Src/Components/Tabs/TabGroup'
import { Card } from '../../Src/Components/Layouts/Card'
import { Flex } from '../../Src/Components/Layouts/Flex'
import { Container } from '../../Src/Components/Layouts/Container'
import { Section } from '../../Src/Components/Layouts/Section/Section'
import { Stack } from '../../Src/Components/Layouts/Stack'
import { Heading } from '../../Src/Components/Typography/Heading'
import { Text } from '../../Src/Components/Typography/Text'
import { Caption } from '../../Src/Components/Typography/Caption'
import { Icon } from '../../Src/Components/Typography'
import { Label } from '../../Src/Components/Typography/Label'

// Данные для табов
const dashboardTabs = [
  { id: 'overview', label: 'Обзор', icon: '📊', badge: 3 },
  { id: 'analytics', label: 'Аналитика', icon: '📈', badge: 12 },
  { id: 'reports', label: 'Отчеты', icon: '📋' },
  { id: 'settings', label: 'Настройки', icon: '⚙️', disabled: true },
]

const userTabs = [
  { id: 'profile', label: 'Профиль', badge: 'NEW' },
  { id: 'security', label: 'Безопасность', icon: '🔒' },
  { id: 'notifications', label: 'Уведомления', badge: 5 },
  { id: 'billing', label: 'Оплата', icon: '💳' },
]

const productTabs = [
  { id: 'details', label: 'Детали' },
  { id: 'reviews', label: 'Отзывы', badge: 24 },
  { id: 'specifications', label: 'Характеристики' },
  { id: 'support', label: 'Поддержка' },
]

const verticalNavTabs = [
  { id: 'dashboard', label: 'Дашборд', icon: '📊' },
  { id: 'users', label: 'Пользователи', icon: '👥', badge: 42 },
  { id: 'products', label: 'Товары', icon: '📦' },
  { id: 'orders', label: 'Заказы', icon: '📝', badge: 15 },
  { id: 'settings', label: 'Настройки', icon: '⚙️' },
]

// Компонент контента для Dashboard
const DashboardContent = ({ activeTab }: { activeTab: string }) => {
  if (activeTab === 'analytics') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Аналитика
        </Heading>
        <Text variant='body2' color='secondary'>
          Статистика за месяц
        </Text>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                График {i}
              </Text>
              <Caption color='secondary'>Данные за последнюю неделю</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (activeTab === 'reports') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Отчеты
        </Heading>
        <Text variant='body2' color='secondary'>
          Доступные отчеты
        </Text>
        <div className='space-y-3 mt-4'>
          {[1, 2, 3].map((i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                Отчет #{i}
              </Text>
              <Caption color='secondary'>Скачать в PDF</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (activeTab === 'settings') {
    return (
      <div className='p-6 text-center'>
        <Icon size='xl' className='mx-auto mb-4 text-on-surface-variant'>
          🔒
        </Icon>
        <Heading level={4} className='text-on-surface mb-2'>
          Настройки недоступны
        </Heading>
        <Text color='secondary'>Обновите подписку</Text>
      </div>
    )
  }

  // По умолчанию: overview
  return (
    <div className='space-y-4 p-4'>
      <Heading level={3} className='text-on-surface mb-2'>
        Обзор
      </Heading>
      <Text variant='body2' color='secondary'>
        Основные метрики
      </Text>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
        {['Посетители', 'Доход', 'Конверсия', 'Заказы'].map((label, i) => (
          <Card key={i} className='bg-surface-container p-4'>
            <Label className='text-on-surface-variant'>{label}</Label>
            <Text bold className='text-2xl text-on-surface'>
              1,234
            </Text>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Компонент контента для User
const UserContent = ({ activeTab }: { activeTab: string }) => {
  if (activeTab === 'security') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Безопасность
        </Heading>
        <Text variant='body2' color='secondary'>
          Настройки безопасности
        </Text>
        <div className='space-y-3 mt-4'>
          {[1, 2, 3].map((i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                Настройка {i}
              </Text>
              <Caption color='secondary'>Защита аккаунта</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (activeTab === 'notifications') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Уведомления
        </Heading>
        <Text variant='body2' color='secondary'>
          Настройки уведомлений
        </Text>
        <div className='space-y-3 mt-4'>
          {[1, 2, 3].map((i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                Уведомление {i}
              </Text>
              <Caption color='secondary'>Настройте параметры</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (activeTab === 'billing') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Оплата
        </Heading>
        <Text variant='body2' color='secondary'>
          Информация об оплате
        </Text>
        <div className='space-y-3 mt-4'>
          {[1, 2, 3].map((i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                Платеж #{i}
              </Text>
              <Caption color='secondary'>История транзакций</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // По умолчанию: profile
  return (
    <div className='space-y-4 p-4'>
      <Heading level={3} className='text-on-surface mb-2'>
        Профиль
      </Heading>
      <Text variant='body2' color='secondary'>
        Информация о пользователе
      </Text>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        <Card className='bg-surface-container p-6'>
          <div className='flex items-center gap-4'>
            <div className='w-16 h-16 bg-primary-container rounded-full flex items-center justify-center'>
              <Icon size='xl' className='text-on-primary-container'>
                👤
              </Icon>
            </div>
            <div>
              <Text bold className='text-on-surface'>
                Иван Иванов
              </Text>
              <Caption color='secondary'>Администратор</Caption>
            </div>
          </div>
        </Card>
        <Card className='bg-surface-container p-6'>
          <Text bold className='text-on-surface mb-2'>
            Статистика
          </Text>
          <Caption color='secondary'>Активность за месяц: 95%</Caption>
        </Card>
      </div>
    </div>
  )
}

// Компонент контента для Product
const ProductContent = ({ activeTab }: { activeTab: string }) => {
  if (activeTab === 'reviews') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Отзывы
        </Heading>
        <Text variant='body2' color='secondary'>
          Отзывы покупателей
        </Text>
        <div className='space-y-3 mt-4'>
          {[1, 2, 3].map((i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Icon size='md' className='text-primary'>
                  ⭐
                </Icon>
                <Text bold className='text-on-surface'>
                  Отзыв #{i}
                </Text>
              </div>
              <Caption color='secondary'>Оценка: 5/5</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (activeTab === 'specifications') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Характеристики
        </Heading>
        <Text variant='body2' color='secondary'>
          Технические параметры
        </Text>
        <div className='space-y-3 mt-4'>
          {['Процессор', 'Память', 'Хранилище', 'Экран'].map((spec, i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                {spec}
              </Text>
              <Caption color='secondary'>Детальное описание</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (activeTab === 'support') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Поддержка
        </Heading>
        <Text variant='body2' color='secondary'>
          Помощь и поддержка
        </Text>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {[1, 2, 3].map((i) => (
            <Card key={i} className='bg-surface-container p-6 text-center'>
              <Icon size='xl' className='text-primary mb-3'>
                ❓
              </Icon>
              <Text bold className='text-on-surface'>
                Вопрос #{i}
              </Text>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // По умолчанию: details
  return (
    <div className='space-y-4 p-4'>
      <Heading level={3} className='text-on-surface mb-2'>
        Детали товара
      </Heading>
      <Text variant='body2' color='secondary'>
        Подробная информация
      </Text>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
        <Card className='bg-surface-container p-6'>
          <Text bold className='text-on-surface mb-2'>
            Описание
          </Text>
          <Text color='secondary'>Высококачественный продукт с отличными характеристиками</Text>
        </Card>
        <Card className='bg-surface-container p-6'>
          <Text bold className='text-on-surface mb-2'>
            Цена
          </Text>
          <Text bold className='text-3xl text-primary'>
            $1999
          </Text>
        </Card>
      </div>
    </div>
  )
}

// Компонент контента для VerticalTabs
const VerticalTabContent = ({ activeTab }: { activeTab: string }) => {
  if (activeTab === 'users') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Пользователи
        </Heading>
        <Text variant='body2' color='secondary'>
          Управление пользователями
        </Text>
        <div className='space-y-3 mt-4'>
          {[1, 2, 3].map((i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                Пользователь #{i}
              </Text>
              <Caption color='secondary'>Роль: Администратор</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (activeTab === 'products') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Товары
        </Heading>
        <Text variant='body2' color='secondary'>
          Управление каталогом
        </Text>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                Товар #{i}
              </Text>
              <Caption color='secondary'>В наличии</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (activeTab === 'orders') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Заказы
        </Heading>
        <Text variant='body2' color='secondary'>
          Управление заказами
        </Text>
        <div className='space-y-3 mt-4'>
          {[1, 2, 3].map((i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                Заказ #{i}
              </Text>
              <Caption color='secondary'>Статус: В обработке</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (activeTab === 'settings') {
    return (
      <div className='space-y-4 p-4'>
        <Heading level={3} className='text-on-surface mb-2'>
          Настройки
        </Heading>
        <Text variant='body2' color='secondary'>
          Конфигурация системы
        </Text>
        <div className='space-y-3 mt-4'>
          {['Общие', 'Безопасность', 'Уведомления'].map((setting, i) => (
            <Card key={i} className='bg-surface-container p-4'>
              <Text bold className='text-on-surface'>
                {setting}
              </Text>
              <Caption color='secondary'>Настройте параметры</Caption>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // По умолчанию: dashboard
  return (
    <div className='space-y-4 p-4'>
      <Heading level={3} className='text-on-surface mb-2'>
        Дашборд
      </Heading>
      <Text variant='body2' color='secondary'>
        Общая статистика
      </Text>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
        {['Метрика 1', 'Метрика 2', 'Метрика 3'].map((metric, i) => (
          <Card key={i} className='bg-surface-container p-6'>
            <Text bold className='text-on-surface'>
              {metric}
            </Text>
            <Text bold className='text-3xl text-primary mt-2'>
              42
            </Text>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function TabGroupExamples() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeUserTab, setActiveUserTab] = useState('profile')
  const [activeProductTab, setActiveProductTab] = useState('details')
  const [activeVerticalTab, setActiveVerticalTab] = useState('dashboard')

  const handleTabClick = (tab: any) => {
    console.log('Tab clicked:', tab)
    if (['overview', 'analytics', 'reports', 'settings'].includes(tab.id)) {
      setActiveTab(tab.id)
    } else if (['profile', 'security', 'notifications', 'billing'].includes(tab.id)) {
      setActiveUserTab(tab.id)
    } else if (['details', 'reviews', 'specifications', 'support'].includes(tab.id)) {
      setActiveProductTab(tab.id)
    } else {
      setActiveVerticalTab(tab.id)
    }
  }

  return (
    <Container size='lg' padding='lg'>
      <Section
        title='Примеры TabGroup'
        description='Демонстрация различных вариантов табов'
        density='spacious'
      >
        {/* Пример 1: Базовые пресеты */}
        <Card title='1. Базовые пресеты' className='mb-8'>
          <Stack spacing='lg'>
            <div>
              <h3 className='text-lg font-medium text-on-surface mb-3'>UnderlineTabs</h3>
              <p className='text-sm text-on-surface-variant mb-3'>
                Горизонтальные табы с подчеркиванием
              </p>
              <UnderlineTabs
                tabs={dashboardTabs}
                activeTabId={activeTab}
                onTabClick={handleTabClick}
              />
              <Card className='mt-4 bg-surface-container'>
                <DashboardContent activeTab={activeTab} />
              </Card>
            </div>

            <div>
              <h3 className='text-lg font-medium text-on-surface mb-3'>PillsTabs</h3>
              <p className='text-sm text-on-surface-variant mb-3'>Табы в виде пилюль</p>
              <PillsTabs tabs={userTabs} activeTabId={activeUserTab} onTabClick={handleTabClick} />
              <Card className='mt-4 bg-surface-container'>
                <UserContent activeTab={activeUserTab} />
              </Card>
            </div>

            <div>
              <h3 className='text-lg font-medium text-on-surface mb-3'>OutlineTabs</h3>
              <p className='text-sm text-on-surface-variant mb-3'>Контурные табы с границей</p>
              <OutlineTabs
                tabs={productTabs}
                activeTabId={activeProductTab}
                onTabClick={handleTabClick}
              />
              <Card className='mt-4 bg-surface-container'>
                <ProductContent activeTab={activeProductTab} />
              </Card>
            </div>
          </Stack>
        </Card>

        {/* Пример 2: Вертикальная навигация */}
        <Card title='2. Вертикальная навигация' className='mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium text-on-surface mb-3'>VerticalTabs</h3>
              <p className='text-sm text-on-surface-variant mb-3'>Для сайдбара навигации</p>
              <VerticalTabs
                tabs={verticalNavTabs}
                activeTabId={activeVerticalTab}
                onTabClick={handleTabClick}
              />
            </div>
            <div className='md:col-span-3'>
              <Card className='bg-surface-container h-full'>
                <VerticalTabContent activeTab={activeVerticalTab} />
              </Card>
            </div>
          </div>
        </Card>

        {/* Пример 3: Кастомный TabGroup */}
        <Card title='3. Кастомная конфигурация' className='mb-8'>
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-medium text-on-surface mb-3'>Полный контроль</h3>
              <p className='text-sm text-on-surface-variant mb-3'>
                Использование TabGroup со всеми параметрами
              </p>
              <TabGroup
                tabs={productTabs}
                activeTabId={activeProductTab}
                onTabClick={handleTabClick}
                variant='pills'
                size='lg'
                fullWidth={true}
                orientation='horizontal'
                className='bg-surface-container-high rounded-lg p-2'
              />
              <Card className='mt-4 bg-surface-container'>
                <ProductContent activeTab={activeProductTab} />
              </Card>
            </div>
          </div>
        </Card>

        {/* Пример 4: Интерактивные примеры */}
        <Card title='4. Интерактивные примеры' className='mb-8'>
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-medium text-on-surface mb-3'>Текущий активный таб</h3>
              <Flex
                justify='between'
                align='center'
                className='bg-surface-container rounded-lg p-4'
              >
                <div className='space-y-2'>
                  <div>
                    <Caption>Dashboard:</Caption>
                    <Text bold className='text-primary'>
                      {activeTab}
                    </Text>
                  </div>
                  <div>
                    <Caption>Users:</Caption>
                    <Text bold className='text-primary'>
                      {activeUserTab}
                    </Text>
                  </div>
                  <div>
                    <Caption>Products:</Caption>
                    <Text bold className='text-primary'>
                      {activeProductTab}
                    </Text>
                  </div>
                </div>
                <div className='text-sm text-right'>
                  <Caption color='secondary'>Кликайте по табам</Caption>
                </div>
              </Flex>
            </div>

            <div>
              <h3 className='text-lg font-medium text-on-surface mb-3'>
                Разные варианты в одном интерфейсе
              </h3>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <Card className='bg-surface-container'>
                  <h4 className='font-medium text-on-surface mb-3'>Основная навигация</h4>
                  <UnderlineTabs
                    tabs={dashboardTabs.slice(0, 3)}
                    activeTabId={activeTab}
                    onTabClick={handleTabClick}
                  />
                  <div className='mt-4 pt-4 border-t border-outline-variant'>
                    <DashboardContent activeTab={activeTab} />
                  </div>
                </Card>
                <Card className='bg-surface-container'>
                  <h4 className='font-medium text-on-surface mb-3'>Фильтры</h4>
                  <PillsTabs
                    tabs={productTabs.slice(0, 3)}
                    activeTabId={activeProductTab}
                    onTabClick={handleTabClick}
                    size='sm'
                  />
                  <div className='mt-4 pt-4 border-t border-outline-variant'>
                    <ProductContent activeTab={activeProductTab} />
                  </div>
                </Card>
                <Card className='bg-surface-container'>
                  <h4 className='font-medium text-on-surface mb-3'>Боковая панель</h4>
                  <VerticalTabs
                    tabs={verticalNavTabs.slice(0, 3)}
                    activeTabId={activeVerticalTab}
                    onTabClick={handleTabClick}
                  />
                  <div className='mt-4 pt-4 border-t border-outline-variant'>
                    <VerticalTabContent activeTab={activeVerticalTab} />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>

        {/* Заключение */}
        <Card className='bg-primary-container'>
          <div className='text-center p-6'>
            <Heading level={3} className='text-on-primary-container mb-3'>
              Готово к использованию!
            </Heading>
            <Text color='secondary' className='text-on-primary-container/80 mb-4'>
              Выберите подходящий пресет или создайте свой
            </Text>
            <div className='flex justify-center gap-4 flex-wrap'>
              <code className='bg-surface text-on-surface px-3 py-1 rounded text-sm'>
                import {'{ UnderlineTabs }'} from './TabGroup'
              </code>
              <code className='bg-surface text-on-surface px-3 py-1 rounded text-sm'>
                import {'{ TabGroup }'} from './TabGroup'
              </code>
            </div>
          </div>
        </Card>
      </Section>
    </Container>
  )
}

export default TabGroupExamples
