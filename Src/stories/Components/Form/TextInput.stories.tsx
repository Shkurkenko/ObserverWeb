import type { Meta, StoryObj } from '@storybook/preact'
import { TextInput } from '../../../Components/Form/TextInput'

const meta: Meta<typeof TextInput> = {
  title: 'Components/Form/TextInput',
  component: TextInput,
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url'],
      description: 'Тип поля ввода',
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
    autoComplete: {
      control: 'text',
      description: 'Автозаполнение',
    },
    onChange: {
      action: 'onChange',
      description: 'Обработчик изменения значения',
    },
  },
  args: {
    value: '',
    onChange: (event: { currentTarget: HTMLInputElement }) =>
      console.log('Input changed:', event.currentTarget.value),
    placeholder: 'Введите текст',
    type: 'text',
  },
}

export default meta

type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: {
    label: 'Имя пользователя',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Имя пользователя',
    value: 'John Doe',
  },
}

export const WithPlaceholder: Story = {
  args: {
    label: 'Поиск',
    placeholder: 'Введите запрос для поиска...',
  },
}

export const EmailInput: Story = {
  args: {
    label: 'Email адрес',
    type: 'email',
    placeholder: 'example@domain.com',
    autoComplete: 'email',
  },
}

export const PasswordInput: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    autoComplete: 'current-password',
  },
}

export const WithError: Story = {
  args: {
    label: 'Имя пользователя',
    value: '',
    error: 'Поле обязательно для заполнения',
    required: true,
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Телефон',
    placeholder: '+7 (XXX) XXX-XX-XX',
    helperText: 'Введите номер в международном формате',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    value: 'user@example.com',
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Имя',
    required: true,
    placeholder: 'Введите ваше имя',
  },
}

export const NumberInput: Story = {
  args: {
    label: 'Возраст',
    type: 'number',
    placeholder: 'Введите ваш возраст',
    min: 0,
    max: 120,
  },
}

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Введите что-нибудь...',
  },
}

export const UrlInput: Story = {
  args: {
    label: 'Веб-сайт',
    type: 'url',
    placeholder: 'https://example.com',
  },
}
