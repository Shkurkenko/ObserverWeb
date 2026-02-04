import type { Meta, StoryObj } from '@storybook/preact'
import { Label } from '../../../Components/Typography'

const meta: Meta<typeof Label> = {
  title: 'Components/Typography/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер текста',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'disabled'],
      description: 'Цвет текста',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле',
    },
    htmlFor: {
      control: 'text',
      description: 'ID элемента формы',
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Текст лейбла',
    size: 'md',
    color: 'primary',
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: 'Обычный лейбл',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Маленький лейбл',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Средний лейбл',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Большой лейбл',
  },
}

export const Required: Story = {
  args: {
    required: true,
    children: 'Обязательное поле',
  },
}

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Основной цвет',
  },
}

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Вторичный цвет',
  },
}

export const Success: Story = {
  args: {
    color: 'success',
    children: 'Успешный статус',
  },
}

export const Warning: Story = {
  args: {
    color: 'warning',
    children: 'Предупреждение',
  },
}

export const Error: Story = {
  args: {
    color: 'error',
    children: 'Ошибка',
  },
}

export const Disabled: Story = {
  args: {
    color: 'disabled',
    children: 'Отключенное поле',
  },
}

export const WithHtmlFor: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Лейбл связанный с полем',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Story />
        <input id='input-id' type='text' placeholder='Связанное поле' />
      </div>
    ),
  ],
}
