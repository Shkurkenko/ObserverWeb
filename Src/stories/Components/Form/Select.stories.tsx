import type { Meta, StoryObj } from '@storybook/preact'
import { Select } from '../../../Components/Form/Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Текущее значение',
    },
    label: {
      control: 'text',
      description: 'Текст лейбла',
    },
    placeholder: {
      control: 'text',
      description: 'Текст плейсхолдера',
    },
    error: {
      control: 'text',
      description: 'Текст ошибки',
    },
    helperText: {
      control: 'text',
      description: 'Вспомогательный текст',
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
    ariaLabel: {
      control: 'text',
      description: 'ARIA-label для доступности',
    },
    onChange: {
      action: 'onChange',
      description: 'Обработчик изменения значения',
    },
  },
  args: {
    value: '',
    onChange: (value: string) => console.log('Selected:', value),
    options: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3', disabled: true },
      { value: 'option4', label: 'Опция 4' },
      { value: 'option5', label: 'Опция 5' },
    ],
    placeholder: 'Выберите опцию',
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Выбор опции',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Выбор опции',
    value: 'option2',
  },
}

export const WithError: Story = {
  args: {
    label: 'Выбор опции',
    error: 'Пожалуйста, выберите опцию',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Выбор опции',
    helperText: 'Выберите подходящую опцию из списка',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Выбор опции',
    value: 'option1',
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Выбор опции',
    required: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Выберите что-нибудь...',
    ariaLabel: 'Выбор опции',
  },
}
