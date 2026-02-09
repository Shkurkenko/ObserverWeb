import { useState } from 'preact/hooks'
import {
  TabGroup,
  UnderlineTabs,
  PillsTabs,
  OutlineTabs,
  VerticalTabs,
} from '../../Src/Components/Tabs/TabGroup'
import { Card } from '../../Src/Components/Layouts/Card'
import { Container } from '../../Src/Components/Layouts/Container'
import { Stack } from '../../Src/Components/Layouts/Stack'
import { Grid } from '../../Src/Components/Layouts/Grid'
import { Heading } from '../../Src/Components/Typography/Heading'
import { Text } from '../../Src/Components/Typography/Text'
import { Caption } from '../../Src/Components/Typography/Caption'
import { Icon } from '../../Src/Components/Typography/Icon'
import { Badge } from '../../Src/Components/Badge'
import { Button } from '../../Src/Components/Button'
import { Flex } from '../../Src/Components/Layouts/Flex'
import { MetricCard } from '../../Src/Components/MetricCard'
import { ActionCard } from '../../Src/Components/ActionCard'

const dashboardTabs = [
  {
    id: 'overview',
    label: 'Обзор',
    icon: '📊',
    badge: 3,
    description: 'Основные метрики системы',
  },
  {
    id: 'analytics',
    label: 'Аналитика',
    icon: '📈',
    badge: 12,
    description: 'Подробная статистика',
  },
  {
    id: 'reports',
    label: 'Отчеты',
    icon: '📋',
    description: 'Генерация отчетов',
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: '⚙️',
    disabled: true,
    description: 'Требуется обновление',
  },
]

const userTabs = [
  {
    id: 'profile',
    label: 'Профиль',
    badge: 'NEW',
    description: 'Персональные данные',
  },
  {
    id: 'security',
    label: 'Безопасность',
    icon: '🔒',
    description: 'Защита аккаунта',
  },
  {
    id: 'notifications',
    label: 'Уведомления',
    badge: 5,
    description: 'Настройки оповещений',
  },
  {
    id: 'billing',
    label: 'Оплата',
    icon: '💳',
    description: 'Управление подпиской',
  },
]

const productTabs = [
  {
    id: 'details',
    label: 'Детали',
    description: 'Общая информация',
  },
  {
    id: 'reviews',
    label: 'Отзывы',
    badge: 24,
    description: 'Мнения покупателей',
  },
  {
    id: 'specifications',
    label: 'Характеристики',
    description: 'Технические параметры',
  },
  {
    id: 'support',
    label: 'Поддержка',
    description: 'Помощь и консультации',
  },
]

const verticalNavTabs = [
  {
    id: 'dashboard',
    label: 'Дашборд',
    icon: '📊',
    description: 'Панель управления',
  },
  {
    id: 'users',
    label: 'Пользователи',
    icon: '👥',
    badge: 42,
    description: 'Управление юзерами',
  },
  {
    id: 'products',
    label: 'Товары',
    icon: '📦',
    description: 'Каталог продукции',
  },
  {
    id: 'orders',
    label: 'Заказы',
    icon: '📝',
    badge: 15,
    description: 'История заказов',
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: '⚙️',
    description: 'Конфигурация',
  },
]

const DashboardContent = ({ activeTab }: { activeTab: string }) => {
  const metrics = [
    { title: 'Посетители', value: '1.2K', trend: 12, icon: '👥' },
    { title: 'Доход', value: '$4.8K', trend: 8, icon: '💰' },
    { title: 'Конверсия', value: '24%', trend: 3, icon: '📊' },
    { title: 'Заказы', value: '156', trend: -2, icon: '📦' },
  ]

  if (activeTab === 'analytics') {
    return (
      <div className='space-y-8'>
        <div className='space-y-2'>
          <Heading level={3} className='text-on-surface'>
            Аналитика
          </Heading>
          <Text className='text-on-surface-variant'>Статистика и тренды за последние 30 дней</Text>
        </div>

        <Grid columns={2} gap='lg'>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className='border border-outline-variant/50 p-6'>
              <div className='flex items-center justify-between mb-4'>
                <Text bold className='text-on-surface'>
                  График {i}
                </Text>
                <Badge variant='default' className='bg-primary/10 text-primary'>
                  Активный
                </Badge>
              </div>
              <div className='h-40 rounded-lg bg-lenear-to-br from-primary/5 to-secondary/5 flex items-center justify-center'>
                <Icon size='2xl' className='text-primary/50'>
                  📈
                </Icon>
              </div>
              <Caption className='mt-4 text-on-surface-variant'>
                Данные за последнюю неделю обновлены 2 часа назад
              </Caption>
            </Card>
          ))}
        </Grid>
      </div>
    )
  }

  if (activeTab === 'reports') {
    return (
      <div className='space-y-8'>
        <div className='space-y-2'>
          <Heading level={3} className='text-on-surface'>
            Отчеты
          </Heading>
          <Text className='text-on-surface-variant'>
            Скачайте готовые отчеты или создайте новый
          </Text>
        </div>

        <Stack spacing='md'>
          {[1, 2, 3].map((i) => (
            <ActionCard
              key={i}
              title={`Отчет за Q${i} 2024`}
              description='Ежеквартальный отчет о производительности'
              actionLabel='Скачать'
              icon='📄'
            />
          ))}
        </Stack>
      </div>
    )
  }

  if (activeTab === 'settings') {
    return (
      <Card className='border-2 border-dashed border-primary/20 bg-lenear-to-br from-primary/5 to-transparent p-8 text-center'>
        <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
          <Icon size='2xl' className='text-primary'>
            ⚙️
          </Icon>
        </div>
        <Heading level={4} className='text-on-surface mb-3'>
          Расширенные настройки
        </Heading>
        <Text className='mb-6 mx-auto max-w-md text-on-surface-variant'>
          Для доступа к расширенным настройкам требуется обновление до Pro-версии
        </Text>
        <div className='flex gap-3 justify-center'>
          <Button variant='primary'>Обновить</Button>
          <Button variant='outline'>Подробнее</Button>
        </div>
      </Card>
    )
  }

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <Heading level={3} className='text-on-surface'>
          Панель управления
        </Heading>
        <Text className='text-on-surface-variant'>Обзор ключевых метрик за сегодня</Text>
      </div>

      <Grid columns={2} lg={4} gap='md'>
        {metrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </Grid>
    </div>
  )
}

// User Content
const UserContent = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <Heading level={3} className='text-on-surface'>
          Профиль пользователя
        </Heading>
        <Text className='text-on-surface-variant'>Управление персональной информацией</Text>
      </div>

      <Grid columns={1} lg={2} gap='lg'>
        <Card className='border border-outline-variant/50 p-6'>
          <Flex align='center' gap='lg'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-lenear-to-br from-primary to-primary/70'>
              <Icon size='xl' className='text-on-primary'>
                👤
              </Icon>
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-3'>
                <Text bold className='text-lg text-on-surface'>
                  Иван Иванов
                </Text>
                <Badge variant='default' className='bg-primary text-on-primary'>
                  Администратор
                </Badge>
              </div>
              <Caption className='mt-2 text-on-surface-variant'>Активность за месяц: 95%</Caption>
            </div>
          </Flex>
        </Card>

        <Card className='border border-outline-variant/50 p-6'>
          <Text bold className='text-on-surface mb-4'>
            Статистика активности
          </Text>
          <div className='space-y-4'>
            {[
              { label: 'Задачи выполнено', value: '42', icon: '✅' },
              { label: 'Время онлайн', value: '156ч', icon: '⏱️' },
              { label: 'Комментарии', value: '28', icon: '💬' },
            ].map((stat, i) => (
              <div key={i} className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Icon size='md' className='text-primary'>
                    {stat.icon}
                  </Icon>
                  <Caption className='text-on-surface-variant'>{stat.label}</Caption>
                </div>
                <Text bold className='text-on-surface'>
                  {stat.value}
                </Text>
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
  )
}

// Product Content
const ProductContent = ({ activeTab }: { activeTab: string }) => {
  if (activeTab === 'reviews') {
    return (
      <div className='space-y-8'>
        <div className='space-y-2'>
          <Heading level={3} className='text-on-surface'>
            Отзывы покупателей
          </Heading>
          <Text className='text-on-surface-variant'>Реальные мнения и рейтинги наших клиентов</Text>
        </div>

        <Stack spacing='md'>
          {[1, 2, 3].map((i) => (
            <Card key={i} className='border border-outline-variant/50 p-4'>
              <div className='flex items-start justify-between'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} size='sm' className='text-yellow-500'>
                          ⭐
                        </Icon>
                      ))}
                    </div>
                    <Text bold className='text-on-surface'>
                      Отзыв #{i}
                    </Text>
                  </div>
                  <Text className='text-on-surface-variant'>
                    "Отличный продукт, полностью соответствует описанию. Рекомендую!"
                  </Text>
                  <Caption className='text-on-surface-variant/70'>
                    2 дня назад • Иван Петров
                  </Caption>
                </div>
                <Badge variant='default' className='bg-green-500/10 text-green-600'>
                  5/5
                </Badge>
              </div>
            </Card>
          ))}
        </Stack>
      </div>
    )
  }

  if (activeTab === 'specifications') {
    return (
      <div className='space-y-8'>
        <div className='space-y-2'>
          <Heading level={3} className='text-on-surface'>
            Технические характеристики
          </Heading>
          <Text className='text-on-surface-variant'>Детальные параметры и возможности</Text>
        </div>

        <Grid columns={1} lg={2} gap='md'>
          {['Процессор', 'Память', 'Хранилище', 'Экран'].map((spec, i) => (
            <Card key={i} className='border border-outline-variant/50 p-4'>
              <div className='space-y-2'>
                <div className='flex items-center gap-3'>
                  <div className='rounded-lg bg-primary/10 p-2'>
                    <Icon size='md' className='text-primary'>
                      {['⚡', '🧠', '💾', '🖥️'][i]}
                    </Icon>
                  </div>
                  <Text bold className='text-on-surface'>
                    {spec}
                  </Text>
                </div>
                <Caption className='text-on-surface-variant'>
                  {['Intel Core i7', '16GB DDR4', '512GB SSD', '15.6" 4K'][i]}
                </Caption>
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    )
  }

  if (activeTab === 'support') {
    return (
      <div className='space-y-8'>
        <div className='space-y-2'>
          <Heading level={3} className='text-on-surface'>
            Поддержка и помощь
          </Heading>
          <Text className='text-on-surface-variant'>Быстрые ответы на ваши вопросы</Text>
        </div>

        <Grid columns={1} lg={3} gap='md'>
          {[
            { title: 'Частые вопросы', icon: '❓', desc: 'Ответы на популярные вопросы' },
            { title: 'Чат поддержки', icon: '💬', desc: 'Онлайн помощь 24/7' },
            { title: 'Телефон', icon: '📞', desc: 'Звоните круглосуточно' },
          ].map((item, i) => (
            <Card
              key={i}
              className='border border-outline-variant/50 p-6 text-center transition-all hover:border-primary/50 hover:shadow-md'
            >
              <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                <Icon size='xl' className='text-primary'>
                  {item.icon}
                </Icon>
              </div>
              <Text bold className='text-on-surface mb-2'>
                {item.title}
              </Text>
              <Caption className='text-on-surface-variant'>{item.desc}</Caption>
            </Card>
          ))}
        </Grid>
      </div>
    )
  }

  // Details
  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <Heading level={3} className='text-on-surface'>
          Детали товара
        </Heading>
        <Text className='text-on-surface-variant'>Полная информация о продукте</Text>
      </div>

      <Grid columns={1} lg={2} gap='lg'>
        <Card className='border border-outline-variant/50 p-6'>
          <Text bold className='text-on-surface mb-4'>
            Описание
          </Text>
          <div className='space-y-4'>
            <Text className='text-on-surface-variant'>
              Высококачественный продукт с передовыми технологиями. Идеально подходит для
              профессионального использования в любых условиях.
            </Text>
            <div className='space-y-2'>
              {[
                'Высокая производительность',
                'Надежная конструкция',
                'Энергоэффективность',
                'Простота использования',
              ].map((feature, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <Icon size='sm' className='text-green-500'>
                    ✓
                  </Icon>
                  <Caption className='text-on-surface-variant'>{feature}</Caption>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className='border-2 border-primary/20 bg-lenear-to-br from-primary/5 to-transparent p-6'>
          <Text bold className='text-on-surface mb-4'>
            Цена и наличие
          </Text>
          <div className='space-y-6'>
            <div>
              <Text className='text-4xl font-bold text-primary'>$1,999</Text>
              <Caption className='text-on-surface-variant'>Цена с учетом всех налогов</Caption>
            </div>
            <div className='space-y-3'>
              <Badge variant='default' className='bg-green-500/10 text-green-600'>
                В наличии
              </Badge>
              <div className='flex items-center gap-2'>
                <Icon size='sm' className='text-green-500'>
                  🚚
                </Icon>
                <Caption className='text-on-surface-variant'>Доставка за 1-3 дня</Caption>
              </div>
            </div>
            <Button variant='primary' className='w-full'>
              Добавить в корзину
            </Button>
          </div>
        </Card>
      </Grid>
    </div>
  )
}

export function TabsTest() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeUserTab, setActiveUserTab] = useState('profile')
  const [activeProductTab, setActiveProductTab] = useState('details')
  const [activeVerticalTab, setActiveVerticalTab] = useState('dashboard')

  const handleTabClick = (tab: any) => {
    if (dashboardTabs.some((t) => t.id === tab.id)) {
      setActiveTab(tab.id)
    } else if (userTabs.some((t) => t.id === tab.id)) {
      setActiveUserTab(tab.id)
    } else if (productTabs.some((t) => t.id === tab.id)) {
      setActiveProductTab(tab.id)
    } else {
      setActiveVerticalTab(tab.id)
    }
  }

  const resetAllTabs = () => {
    setActiveTab('overview')
    setActiveUserTab('profile')
    setActiveProductTab('details')
    setActiveVerticalTab('dashboard')
  }

  return (
    <Container size='xl' padding='lg'>
      {/* Hero Section */}
      <div className='mb-12 space-y-4 text-center'>
        <Badge variant='default' className='bg-primary/10 text-primary'>
          Forensic Design System
        </Badge>
        <Heading level={1} className='text-4xl font-bold text-on-surface'>
          Компоненты вкладок
        </Heading>
        <Text className='mx-auto max-w-2xl text-lg text-on-surface-variant'>
          Современные, доступные и стилизованные компоненты навигации, построенные на вашей
          дизайн-системе
        </Text>
      </div>

      <div className='space-y-12'>
        {/* Пример 1: Основные пресеты */}
        <section className='space-y-6'>
          <div className='space-y-2'>
            <Heading level={2} className='text-2xl font-bold text-on-surface'>
              Основные стили
            </Heading>
            <Text className='text-on-surface-variant'>
              Готовые пресеты для различных сценариев использования
            </Text>
          </div>

          <div className='space-y-8'>
            {/* Underline Tabs */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-3'>
                    <Heading level={4} className='text-lg font-semibold text-on-surface'>
                      Underline Tabs
                    </Heading>
                    <Badge variant='default' className='bg-primary/10 text-primary'>
                      Рекомендуется
                    </Badge>
                  </div>
                  <Caption className='text-on-surface-variant'>
                    Горизонтальные табы с анимированным подчеркиванием
                  </Caption>
                </div>
              </div>
              <Card className='border border-outline-variant/50 p-0 overflow-hidden'>
                <div className='border-b border-outline-variant/50 bg-surface-container-high px-6 pt-6'>
                  <UnderlineTabs
                    tabs={dashboardTabs}
                    activeTabId={activeTab}
                    onTabClick={handleTabClick}
                    fullWidth
                  />
                </div>
                <div className='p-6'>
                  <DashboardContent activeTab={activeTab} />
                </div>
              </Card>
            </div>

            {/* Pills Tabs */}
            <div className='space-y-4'>
              <div className='space-y-1'>
                <Heading level={4} className='text-lg font-semibold text-on-surface'>
                  Pills Tabs
                </Heading>
                <Caption className='text-on-surface-variant'>
                  Скругленные табы, идеально подходят для фильтров и категорий
                </Caption>
              </div>
              <Card className='border border-outline-variant/50 p-0 overflow-hidden'>
                <div className='border-b border-outline-variant/50 bg-surface-container-high px-6 pt-6'>
                  <PillsTabs
                    tabs={userTabs}
                    activeTabId={activeUserTab}
                    onTabClick={handleTabClick}
                    size='md'
                  />
                </div>
                <div className='p-6'>
                  <UserContent activeTab={activeUserTab} />
                </div>
              </Card>
            </div>

            {/* Outline Tabs */}
            <div className='space-y-4'>
              <div className='space-y-1'>
                <Heading level={4} className='text-lg font-semibold text-on-surface'>
                  Outline Tabs
                </Heading>
                <Caption className='text-on-surface-variant'>
                  Контурные табы с четкими границами
                </Caption>
              </div>
              <Card className='border border-outline-variant/50 p-0 overflow-hidden'>
                <div className='border-b border-outline-variant/50 bg-surface-container-high px-6 pt-6'>
                  <OutlineTabs
                    tabs={productTabs}
                    activeTabId={activeProductTab}
                    onTabClick={handleTabClick}
                  />
                </div>
                <div className='p-6'>
                  <ProductContent activeTab={activeProductTab} />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Пример 2: Вертикальная навигация */}
        <section className='space-y-6'>
          <div className='space-y-2'>
            <Heading level={2} className='text-2xl font-bold text-on-surface'>
              Вертикальная навигация
            </Heading>
            <Text className='text-on-surface-variant'>
              Идеально для сайдбаров и боковых панелей
            </Text>
          </div>

          <Card className='border border-outline-variant/50 p-0 overflow-hidden'>
            <div className='grid grid-cols-1 lg:grid-cols-4'>
              <div className='border-r border-outline-variant/50 bg-surface-container-high p-4 lg:col-span-1'>
                <div className='mb-4 space-y-1'>
                  <Heading level={5} className='font-semibold text-on-surface'>
                    Навигация
                  </Heading>
                  <Caption className='text-on-surface-variant'>Выберите раздел</Caption>
                </div>
                <VerticalTabs
                  tabs={verticalNavTabs}
                  activeTabId={activeVerticalTab}
                  onTabClick={handleTabClick}
                />
              </div>
              <div className='p-6 lg:col-span-3'>
                <ProductContent activeTab={activeProductTab} />
              </div>
            </div>
          </Card>
        </section>

        {/* Пример 3: Кастомная конфигурация */}
        <section className='space-y-6'>
          <div className='space-y-2'>
            <Heading level={2} className='text-2xl font-bold text-on-surface'>
              Кастомизация
            </Heading>
            <Text className='text-on-surface-variant'>
              Полный контроль над внешним видом и поведением
            </Text>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* <Card className='border border-outline-variant/50 p-6'>
              <Heading level={4} className='mb-4 text-lg font-semibold text-on-surface'>
                Размеры
              </Heading>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Caption className='text-on-surface-variant'>Маленький</Caption>
                  <TabGroup
                    tabs={productTabs.slice(0, 2)}
                    activeTabId={activeProductTab}
                    onTabClick={handleTabClick}
                    variant='pills'
                    size='sm'
                    fullWidth
                  />
                </div>
                <div className='space-y-2'>
                  <Caption className='text-on-surface-variant'>Средний</Caption>
                  <TabGroup
                    tabs={productTabs.slice(0, 2)}
                    activeTabId={activeProductTab}
                    onTabClick={handleTabClick}
                    variant='pills'
                    size='md'
                    fullWidth
                  />
                </div>
                <div className='space-y-2'>
                  <Caption className='text-on-surface-variant'>Большой</Caption>
                  <TabGroup
                    tabs={productTabs.slice(0, 2)}
                    activeTabId={activeProductTab}
                    onTabClick={handleTabClick}
                    variant='pills'
                    size='lg'
                    fullWidth
                  />
                </div>
              </div>
            </Card> */}

            {/* <Card className='border border-outline-variant/50 p-6'>
              <Heading level={4} className='mb-4 text-lg font-semibold text-on-surface'>
                Ориентация
              </Heading>
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <Caption className='text-on-surface-variant'>Горизонтальная</Caption>
                  <TabGroup
                    tabs={dashboardTabs.slice(0, 3)}
                    activeTabId={activeTab}
                    onTabClick={handleTabClick}
                    variant='underline'
                    orientation='horizontal'
                  />
                </div>
                <div className='space-y-2'>
                  <Caption className='text-on-surface-variant'>Вертикальная</Caption>
                  <TabGroup
                    tabs={verticalNavTabs.slice(0, 3)}
                    activeTabId={activeVerticalTab}
                    onTabClick={handleTabClick}
                    variant='pills'
                    orientation='vertical'
                    className='h-48'
                  />
                </div>
              </div>
            </Card> */}
          </div>
        </section>

        {/* Пример 4: Интерактивная демонстрация */}
        <section className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <Heading level={2} className='text-2xl font-bold text-on-surface'>
                Интерактивная демонстрация
              </Heading>
              <Text className='text-on-surface-variant'>
                Кликайте по вкладкам, чтобы увидеть изменение контента
              </Text>
            </div>
            <Button
              variant='outline'
              onClick={resetAllTabs}
              className='border-outline-variant hover:border-primary'
            >
              Сбросить все
            </Button>
          </div>

          <Card className='border border-outline-variant/50 p-6'>
            <Grid columns={1} lg={2} gap='lg'>
              <div className='space-y-4'>
                <Heading level={4} className='text-lg font-semibold text-on-surface'>
                  Активные вкладки
                </Heading>
                <div className='space-y-3'>
                  {[
                    { label: 'Dashboard', value: activeTab, color: 'primary' },
                    { label: 'Users', value: activeUserTab, color: 'secondary' },
                    { label: 'Products', value: activeProductTab, color: 'tertiary' },
                    { label: 'Navigation', value: activeVerticalTab, color: 'primary' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className='flex items-center justify-between rounded-lg border border-outline-variant/50 p-3'
                    >
                      <div className='flex items-center gap-3'>
                        <div className={`h-2 w-2 rounded-full bg-${item.color}`} />
                        <Caption className='text-on-surface-variant'>{item.label}</Caption>
                      </div>
                      <Badge variant='default' className={`bg-${item.color}/10 text-${item.color}`}>
                        {item.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className='rounded-lg bg-lenear-to-br from-primary/5 to-secondary/5 p-6 text-center'>
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                  <Icon size='2xl' className='text-primary'>
                    🎯
                  </Icon>
                </div>
                <Heading level={4} className='mb-2 text-on-surface'>
                  Испытайте интерфейс
                </Heading>
                <Text className='text-on-surface-variant'>
                  Попробуйте различные варианты табов и посмотрите, как меняется контент
                </Text>
              </div>
            </Grid>
          </Card>
        </section>

        {/* Заключение */}
        <section>
          <Card className='border-none bg-lenear-to-br from-primary/10 via-primary/5 to-secondary/10 p-8 text-center'>
            <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-lenear-to-br from-primary to-primary/70'>
              <Icon size='2xl' className='text-on-primary'>
                ✨
              </Icon>
            </div>
            <Heading level={3} className='mb-3 text-2xl font-bold text-on-surface'>
              Готово к интеграции
            </Heading>
            <Text className='mx-auto mb-6 max-w-lg text-on-surface-variant'>
              Все компоненты полностью адаптивны и используют единые токены Forensic Design System
            </Text>
            <div className='flex flex-wrap justify-center gap-3'>
              <Button variant='primary'>Начать использовать</Button>
              <Button variant='outline'>Документация</Button>
            </div>
            <div className='mt-6 flex justify-center gap-3'>
              <code className='rounded-lg border border-outline-variant/50 bg-surface px-3 py-1.5 text-sm font-mono text-on-surface'>
                npm install forensic-ds
              </code>
              <code className='rounded-lg border border-outline-variant/50 bg-surface px-3 py-1.5 text-sm font-mono text-on-surface'>
                import {'{ Tabs }'} from 'forensic-ds'
              </code>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  )
}

export default TabsTest
