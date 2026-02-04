import type { Meta, StoryObj } from '@storybook/preact'
import { Icon } from '../../../Components/Typography/Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Typography/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Размер иконки',
    },
    color: {
      control: 'color',
      description: 'Цвет иконки',
    },
    strokeWidth: {
      control: 'number',
      description: 'Толщина обводки',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    error: {
      control: 'boolean',
      description: 'Индикатор ошибки',
    },
    hasNewData: {
      control: 'boolean',
      description: 'Индикатор новых данных',
    },
    active: {
      control: 'boolean',
      description: 'Активное состояние',
    },
    className: {
      control: 'text',
    },
    onClick: {
      action: 'onClick',
    },
  },
  args: {
    size: 'md',
    color: 'currentColor',
    strokeWidth: 2,
  },
}

export default meta
type Story = StoryObj<typeof Icon>

// Пример SVG иконки
const ExampleIcon = () => (
  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
  </svg>
)

export const Default: Story = {
  args: {
    children: <ExampleIcon />,
    ariaLabel: 'Пример иконки',
  },
}

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    children: <ExampleIcon />,
    ariaLabel: 'Очень маленькая иконка',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: <ExampleIcon />,
    ariaLabel: 'Маленькая иконка',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: <ExampleIcon />,
    ariaLabel: 'Средняя иконка',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: <ExampleIcon />,
    ariaLabel: 'Большая иконка',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: <ExampleIcon />,
    ariaLabel: 'Очень большая иконка',
  },
}

export const DoubleExtraLarge: Story = {
  args: {
    size: '2xl',
    children: <ExampleIcon />,
    ariaLabel: 'Огромная иконка',
  },
}

export const CustomColor: Story = {
  args: {
    children: <ExampleIcon />,
    color: '#3b82f6',
    ariaLabel: 'Синяя иконка',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    ariaLabel: 'Загрузка',
  },
}

export const WithError: Story = {
  args: {
    children: <ExampleIcon />,
    error: true,
    ariaLabel: 'Иконка с ошибкой',
  },
}

export const WithNewData: Story = {
  args: {
    children: <ExampleIcon />,
    hasNewData: true,
    ariaLabel: 'Иконка с новыми данными',
  },
}

export const Clickable: Story = {
  args: {
    children: <ExampleIcon />,
    onClick: () => console.log('Icon clicked'),
    ariaLabel: 'Кликабельная иконка',
  },
}

export const Active: Story = {
  args: {
    children: <ExampleIcon />,
    active: true,
    ariaLabel: 'Активная иконка',
  },
}
