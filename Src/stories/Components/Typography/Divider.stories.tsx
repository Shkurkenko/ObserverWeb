import type { Meta, StoryObj } from '@storybook/preact'
import { Divider } from '../../../Components/Typography'

const meta: Meta<typeof Divider> = {
  title: 'Components/Typography/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Вертикальное разделение',
    },
    thickness: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Толщина линии',
    },
    dashed: {
      control: 'boolean',
      description: 'Пунктирная линия',
    },
    label: {
      control: 'text',
      description: 'Текст метки',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Позиция метки',
    },
    className: {
      control: 'text',
    },
  },
  args: {
    className: '',
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  args: {
    vertical: false,
  },
}

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', height: '100px', gap: '1rem' }}>
        <div>Левая часть</div>
        <Story />
        <div>Правая часть</div>
      </div>
    ),
  ],
}

export const Thin: Story = {
  args: {
    thickness: 'thin',
  },
}

export const Thick: Story = {
  args: {
    thickness: 'thick',
  },
}

export const Dashed: Story = {
  args: {
    dashed: true,
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Или',
  },
}

export const LabelLeft: Story = {
  args: {
    label: 'Левая метка',
    labelPosition: 'left',
  },
}

export const LabelCenter: Story = {
  args: {
    label: 'Центральная метка',
    labelPosition: 'center',
  },
}

export const LabelRight: Story = {
  args: {
    label: 'Правая метка',
    labelPosition: 'right',
  },
}

export const Colored: Story = {
  args: {
    color: 'border-blue-500 dark:border-blue-400',
    label: 'Цветной разделитель',
  },
}
