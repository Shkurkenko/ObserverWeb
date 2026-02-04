import type { Meta, StoryObj } from '@storybook/preact'
import { Heading } from '../../../Components/Typography'

const meta: Meta<typeof Heading> = {
  title: 'Components/Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Уровень заголовка (h1-h6)',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'],
      description: 'HTML тег для рендеринга',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'disabled'],
      description: 'Цвет текста',
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Заголовок',
    level: 1,
    color: 'primary',
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const H1: Story = {
  args: {
    level: 1,
    children: 'Заголовок 1 уровня',
  },
}

export const H2: Story = {
  args: {
    level: 2,
    children: 'Заголовок 2 уровня',
  },
}

export const H3: Story = {
  args: {
    level: 3,
    children: 'Заголовок 3 уровня',
  },
}

export const H4: Story = {
  args: {
    level: 4,
    children: 'Заголовок 4 уровня',
  },
}

export const H5: Story = {
  args: {
    level: 5,
    children: 'Заголовок 5 уровня',
  },
}

export const H6: Story = {
  args: {
    level: 6,
    children: 'Заголовок 6 уровня',
  },
}

export const SecondaryColor: Story = {
  args: {
    level: 2,
    color: 'secondary',
    children: 'Вторичный цвет заголовка',
  },
}

export const SuccessColor: Story = {
  args: {
    level: 3,
    color: 'success',
    children: 'Успешный заголовок',
  },
}

export const WarningColor: Story = {
  args: {
    level: 4,
    color: 'warning',
    children: 'Предупреждающий заголовок',
  },
}

export const ErrorColor: Story = {
  args: {
    level: 5,
    color: 'error',
    children: 'Ошибочный заголовок',
  },
}

export const AsDiv: Story = {
  args: {
    level: 2,
    as: 'div',
    children: 'Заголовок как div элемент',
  },
}
