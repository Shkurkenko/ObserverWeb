import type { Meta, StoryObj } from '@storybook/preact'
import { Box } from '../../../Components/Layouts/Box'

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
  args: { children: 'Box content' },
}
export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {}

export const AsSection: Story = { args: { as: 'section', children: 'Section element' } }

export const AsArticle: Story = { args: { as: 'article', children: 'Article element' } }

export const WithStyles: Story = {
  args: {
    className: 'p-6 bg-blue-100 border-2 border-blue-300 rounded-lg',
    children: 'Styled box',
  },
}

export const Hidden: Story = { args: { hidden: true, children: 'Hidden box' } }

export const SemanticElements: Story = {
  render: () => (
    <div className='space-y-4'>
      <Box as='header' className='p-4 bg-gray-100'>
        Header
      </Box>
      <Box as='main' className='p-4 bg-gray-50'>
        Main content
      </Box>
      <Box as='footer' className='p-4 bg-gray-100'>
        Footer
      </Box>
    </div>
  ),
}
