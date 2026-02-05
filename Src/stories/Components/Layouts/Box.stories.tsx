import type { Meta, StoryObj } from '@storybook/preact'
import { Box } from '../../../Components/Layouts/Box'
import { Heading } from '../../../Components/Typography'

const meta: Meta<typeof Box> = {
  title: 'Components/Layout/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside'],
    },
    className: { control: 'text' },
    hidden: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    className: 'bg-surface-container',
    children: <Heading level={4}>Box Content</Heading>,
  },
}
export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  args: {
    as: 'main',
    className: 'bg-surface-container p-10',
  },
}

export const AsSection: Story = {
  args: {
    as: 'section',
    className: 'bg-surface-container p-10',
    children: <Heading level={4}>Section Element</Heading>,
  },
}

export const AsArticle: Story = {
  args: {
    as: 'article',
    className: 'bg-surface-container p-10',
    children: <Heading level={4}>Article Element</Heading>,
  },
}

export const WithStyles: Story = {
  args: {
    className: 'p-6 bg-primary border-2 border-on-surface-300 rounded-lg text-on-primary',
    children: 'Styled box',
  },
}

export const Hidden: Story = {
  args: {
    hidden: false,
    children: <Heading level={2}>Hidden Box (hide in Controls panel)</Heading>,
  },
}

export const SemanticElements: Story = {
  args: {
    className: '',
  },

  render: () => (
    <Box className='space-y-4'>
      <Box as='header' className='p-4 bg-primary text-on-primary'>
        Header
      </Box>
      <Box as='main' className='p-4 bg-primary text-on-primary'>
        Main content
      </Box>
      <Box as='footer' className='p-4 bg-surface-container text-on-surface'>
        Footer
      </Box>
    </Box>
  ),
}
