import type { Meta, StoryObj } from '@storybook/preact'
import { Surface } from '../../../Components/Layouts/Surface'

const meta: Meta<typeof Surface> = {
  title: 'Components/Layout/Surface',
  component: Surface,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'surface',
        'surface-container',
        'surface-container-lowest',
        'surface-container-high',
        'surface-container-highest',
        'primary-container',
        'secondary-container',
        'tertiary-container',
        'error-container',
      ],
    },
    elevation: { control: 'select', options: ['0', '1', '2', '3', '4', '5'] },
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', 'full'] },
    border: {
      control: 'select',
      options: ['none', 'default', 'strong', 'primary', 'error', 'outline'],
    },
    padding: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    interactive: { control: 'boolean' },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
  args: {
    children: 'Surface content',
    variant: 'surface-container',
    padding: 'md',
  },
}
export default meta
type Story = StoryObj<typeof Surface>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <Surface variant='surface' padding='md'>
        Surface
      </Surface>
      <Surface variant='surface-container' padding='md'>
        Surface Container
      </Surface>
      <Surface variant='surface-container-lowest' padding='md'>
        Surface Container Lowest
      </Surface>
      <Surface variant='surface-container-high' padding='md'>
        Surface Container High
      </Surface>
      <Surface variant='surface-container-highest' padding='md'>
        Surface Container Highest
      </Surface>
      <Surface variant='primary-container' padding='md'>
        Primary Container
      </Surface>
      <Surface variant='secondary-container' padding='md'>
        Secondary Container
      </Surface>
      <Surface variant='tertiary-container' padding='md'>
        Tertiary Container
      </Surface>
      <Surface variant='error-container' padding='md'>
        Error Container
      </Surface>
    </div>
  ),
}

export const Elevations: Story = {
  render: () => (
    <div className='space-y-6'>
      <Surface elevation='0' padding='md'>
        Elevation 0 (no shadow)
      </Surface>
      <Surface elevation='1' padding='md'>
        Elevation 1 (shadow-sm)
      </Surface>
      <Surface elevation='2' padding='md'>
        Elevation 2 (shadow)
      </Surface>
      <Surface elevation='3' padding='md'>
        Elevation 3 (shadow-md)
      </Surface>
      <Surface elevation='4' padding='md'>
        Elevation 4 (shadow-lg)
      </Surface>
      <Surface elevation='5' padding='md'>
        Elevation 5 (shadow-xl)
      </Surface>
    </div>
  ),
}

export const RoundedCorners: Story = {
  render: () => (
    <div className='space-y-4'>
      <Surface rounded='none' padding='md'>
        No rounding
      </Surface>
      <Surface rounded='sm' padding='md'>
        Small rounding
      </Surface>
      <Surface rounded='md' padding='md'>
        Medium rounding
      </Surface>
      <Surface rounded='lg' padding='md'>
        Large rounding
      </Surface>
      <Surface rounded='xl' padding='md'>
        Extra large rounding
      </Surface>
      <Surface rounded='full' padding='md'>
        Full rounding (circle)
      </Surface>
    </div>
  ),
}

export const Borders: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <Surface border='default' padding='md'>
        Default border
      </Surface>
      <Surface border='strong' padding='md'>
        Strong border
      </Surface>
      <Surface border='primary' padding='md'>
        Primary border
      </Surface>
      <Surface border='error' padding='md'>
        Error border
      </Surface>
      <Surface border='outline' padding='md'>
        Outline border
      </Surface>
      <Surface border='none' padding='md'>
        No border
      </Surface>
    </div>
  ),
}

export const PaddingVariants: Story = {
  render: () => (
    <div className='space-y-4'>
      <Surface padding='none'>No padding</Surface>
      <Surface padding='xs'>Extra small padding</Surface>
      <Surface padding='sm'>Small padding</Surface>
      <Surface padding='md'>Medium padding</Surface>
      <Surface padding='lg'>Large padding</Surface>
      <Surface padding='xl'>Extra large padding</Surface>
    </div>
  ),
}

export const Interactive: Story = {
  args: {
    interactive: true,
    children: 'Clickable surface (hover and active states)',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    interactive: true,
    children: 'Disabled interactive surface',
  },
}

export const Selected: Story = {
  args: {
    selected: true,
    children: 'Selected surface (with ring)',
  },
}

export const CustomPadding: Story = {
  args: {
    paddingX: 'xl',
    paddingY: 'sm',
    children: 'Custom padding: X-large horizontal, small vertical',
  },
}

export const ComplexExample: Story = {
  render: () => (
    <Surface
      variant='surface-container-highest'
      elevation='3'
      rounded='lg'
      border='primary'
      padding='lg'
      interactive
      className='max-w-md'
    >
      <h3 className='text-lg font-semibold mb-2'>Interactive Card</h3>
      <p className='text-gray-600 mb-4'>
        This is an interactive surface with elevation, border, and padding.
      </p>
      <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
        Action Button
      </button>
    </Surface>
  ),
}

export const NestedSurfaces: Story = {
  render: () => (
    <Surface variant='surface-container' padding='lg' className='max-w-lg'>
      <h3 className='text-xl font-bold mb-4'>Nested Surfaces</h3>
      <div className='space-y-4'>
        <Surface variant='surface' padding='md'>
          <h4 className='font-semibold mb-2'>Inner Surface</h4>
          <p>Content inside a nested surface</p>
        </Surface>
        <Surface variant='primary-container' padding='md'>
          <h4 className='font-semibold mb-2'>Primary Container</h4>
          <p>Another nested surface with different variant</p>
        </Surface>
      </div>
    </Surface>
  ),
}
