import type { Meta, StoryObj } from '@storybook/preact'
import { Container } from '../../../Components/Layouts/Container'
import { Box } from '../../../Components/Layouts/Box'

const meta: Meta<typeof Container> = {
  title: 'Components/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full', 'fluid'] },
    padding: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    centered: { control: 'boolean' },
    fullHeight: { control: 'boolean' },
  },
  args: { children: 'Container content', size: 'fluid' },
}
export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {}

export const Small: Story = { args: { size: 'sm', children: 'Small container (max-width: 640px)' } }

export const Medium: Story = {
  args: { size: 'md', children: 'Medium container (max-width: 768px)' },
}

export const Large: Story = {
  args: { size: 'lg', children: 'Large container (max-width: 1024px)' },
}

export const ExtraLarge: Story = {
  args: { size: 'xl', children: 'Extra large container (max-width: 1280px)' },
}

export const Full: Story = { args: { size: 'full', children: 'Full width container' } }

export const Fluid: Story = {
  args: { size: 'fluid', children: 'Fluid container (max-width: 1536px)' },
}

export const PaddingVariants: Story = {
  render: () => (
    <div className='space-y-6'>
      <Container size='md' padding='xs' className='bg-gray-100'>
        XS padding
      </Container>
      <Container size='md' padding='sm' className='bg-gray-100'>
        SM padding
      </Container>
      <Container size='md' padding='md' className='bg-gray-100'>
        MD padding
      </Container>
      <Container size='md' padding='lg' className='bg-gray-100'>
        LG padding
      </Container>
      <Container size='md' padding='xl' className='bg-gray-100'>
        XL padding
      </Container>
    </div>
  ),
}

export const CustomPadding: Story = {
  args: {
    padding: { x: 'px-8', y: 'py-12' },
    className: 'bg-surface-container text-on-surface',
    children: 'Custom padding example',
    size: 'sm',
  },
}

export const FullHeight: Story = {
  args: {
    fullHeight: true,
    className: 'bg-surface-container',
    children: 'Full height container',
  },
}

export const NotCentered: Story = {
  args: {
    centered: false,
    className: 'bg-yellow-50',
    children: 'Not centered container',
  },
}
