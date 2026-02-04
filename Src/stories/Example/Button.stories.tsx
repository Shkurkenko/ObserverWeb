import type { Meta, StoryObj } from '@storybook/preact'
import { Button } from './Button'
import { fn } from 'storybook/test'

const meta: Meta<typeof Button> = {
  title: 'Example/Button',

  component: Button,

  tags: ['autodocs'],

  argTypes: {
    backgroundColor: {
      control: 'color',
      description: 'Custom background color for the button',
    },

    primary: {
      control: 'boolean',
      description: 'Primary style button',
    },

    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },

    label: {
      control: 'text',
      description: 'Button text',
    },

    onClick: {
      action: 'onClick',
      description: 'Click handler',
    },

    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
  },

  args: {
    onClick: fn,
    size: 'medium',
    label: 'Button',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
}
