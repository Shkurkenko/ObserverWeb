import type { Meta, StoryObj } from '@storybook/preact'
import { Caption } from '../../../Components/Typography'

const meta: Meta<typeof Caption> = {
  title: 'Components/Typography/Caption',
  component: Caption,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Вариант размера текста',
    },
    as: {
      control: 'select',
      options: ['span', 'div', 'p'],
      description: 'HTML тег для рендеринга',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'disabled'],
      description: 'Цвет текста',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
    children: {
      control: 'text',
      description: 'Текст контента',
    },
  },
  args: {
    children: 'Это текст подписи',
    variant: 'medium',
    color: 'secondary',
  },
}

export default meta
type Story = StoryObj<typeof Caption>

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'Маленькая подпись (text-xs)',
  },
}

export const Medium: Story = {
  args: {
    variant: 'medium',
    children: 'Средняя подпись (text-sm)',
  },
}

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'Большая подпись (text-base)',
  },
}

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Основной цвет текста',
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

export const AsDiv: Story = {
  args: {
    as: 'div',
    children: 'Рендерится как div элемент',
  },
}

export const AsParagraph: Story = {
  args: {
    as: 'p',
    children: 'Рендерится как параграф',
  },
}
