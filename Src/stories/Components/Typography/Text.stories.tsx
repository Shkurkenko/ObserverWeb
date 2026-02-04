import type { Meta, StoryObj } from '@storybook/preact'
import { Text } from '../../../Components/Typography'

const meta: Meta<typeof Text> = {
  title: 'Components/Typography/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['body1', 'body2', 'body3', 'overline', 'button'],
      description: 'Вариант текста',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div'],
      description: 'HTML тег для рендеринга',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'disabled'],
      description: 'Цвет текста',
    },
    bold: {
      control: 'boolean',
      description: 'Жирный текст',
    },
    italic: {
      control: 'boolean',
      description: 'Курсивный текст',
    },
    underline: {
      control: 'boolean',
      description: 'Подчеркнутый текст',
    },
    truncate: {
      control: 'boolean',
      description: 'Обрезать текст если не помещается',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Выравнивание текста',
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Пример текста для демонстрации компонента',
    variant: 'body1',
    color: 'primary',
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Основной текст (body1) - размер 16px',
  },
}

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Второстепенный текст (body2) - размер 14px',
  },
}

export const Body3: Story = {
  args: {
    variant: 'body3',
    children: 'Мелкий текст (body3) - размер 12px',
  },
}

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'Текст надписи - uppercase текст',
  },
}

export const ButtonText: Story = {
  args: {
    variant: 'button',
    children: 'Текст кнопки',
  },
}

export const PrimaryColor: Story = {
  args: {
    color: 'primary',
    children: 'Основной цвет текста',
  },
}

export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'Вторичный цвет текста',
  },
}

export const SuccessColor: Story = {
  args: {
    color: 'success',
    children: 'Текст успешного статуса',
  },
}

export const WarningColor: Story = {
  args: {
    color: 'warning',
    children: 'Текст предупреждения',
  },
}

export const ErrorColor: Story = {
  args: {
    color: 'error',
    children: 'Текст ошибки',
  },
}

export const DisabledColor: Story = {
  args: {
    color: 'disabled',
    children: 'Отключенный текст',
  },
}

export const Bold: Story = {
  args: {
    bold: true,
    children: 'Жирный текст',
  },
}

export const Italic: Story = {
  args: {
    italic: true,
    children: 'Курсивный текст',
  },
}

export const Underline: Story = {
  args: {
    underline: true,
    children: 'Подчеркнутый текст',
  },
}

export const AlignCenter: Story = {
  args: {
    align: 'center',
    children: 'Текст по центру',
  },
}

export const AlignRight: Story = {
  args: {
    align: 'right',
    children: 'Текст по правому краю',
  },
}

export const AsSpan: Story = {
  args: {
    as: 'span',
    children: 'Текст как span элемент',
  },
}

export const AsDiv: Story = {
  args: {
    as: 'div',
    children: 'Текст как div элемент',
  },
}

export const LongText: Story = {
  args: {
    children:
      'Очень длинный текст, который может занимать несколько строк и демонстрировать различные свойства компонента текста в разных условиях отображения.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
}
