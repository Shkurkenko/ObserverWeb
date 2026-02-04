import type { Meta, StoryObj } from '@storybook/preact'
import { Switch } from '../../../Components/Form/Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Form/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Состояние переключателя',
    },
    label: {
      control: 'text',
      description: 'Текст лейбла',
    },
    description: {
      control: 'text',
      description: 'Описание под лейблом',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
    name: {
      control: 'text',
      description: 'Имя поля формы',
    },
    onChange: {
      action: 'onChange',
      description: 'Обработчик изменения состояния',
    },
  },
  args: {
    checked: false,
    onChange: (checked: boolean) => console.log('Switch changed:', checked),
  },
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: 'Включить уведомления',
    checked: false,
  },
}

export const Checked: Story = {
  args: {
    label: 'Включить уведомления',
    checked: true,
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Автоматическое обновление',
    description: 'Приложение будет автоматически проверять обновления',
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Включить уведомления',
    checked: false,
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Включить уведомления',
    checked: true,
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Принять условия соглашения',
    checked: false,
    required: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
}
