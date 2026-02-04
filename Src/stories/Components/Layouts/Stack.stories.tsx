import type { Meta, StoryObj } from '@storybook/preact'
import { Stack } from '../../../Components/Layouts/Stack'
import { Box } from '../../../Components/Layouts/Box'

const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    spacing: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
  },
  args: { direction: 'vertical' },
}
export default meta
type Story = StoryObj<typeof Stack>

const StackItem = ({ num }: { num: number }) => (
  <Box className='p-4 bg-blue-100 border border-blue-300 rounded-lg'>Item {num}</Box>
)

export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <StackItem num={1} />
      <StackItem num={2} />
      <StackItem num={3} />
    </Stack>
  ),
}

export const Vertical: Story = {
  args: { direction: 'vertical' },
  render: (args) => (
    <Stack {...args} className='p-4 bg-gray-100 rounded-lg'>
      <StackItem num={1} />
      <StackItem num={2} />
      <StackItem num={3} />
    </Stack>
  ),
}

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
  render: (args) => (
    <Stack {...args} className='p-4 bg-gray-100 rounded-lg'>
      <StackItem num={1} />
      <StackItem num={2} />
      <StackItem num={3} />
    </Stack>
  ),
}

export const SpacingVariants: Story = {
  render: () => (
    <div className='space-y-6'>
      <Stack spacing='xs' className='p-4 bg-gray-50'>
        <StackItem num={1} />
        <StackItem num={2} />
        <StackItem num={3} />
      </Stack>
      <Stack spacing='sm' className='p-4 bg-gray-50'>
        <StackItem num={1} />
        <StackItem num={2} />
        <StackItem num={3} />
      </Stack>
      <Stack spacing='md' className='p-4 bg-gray-50'>
        <StackItem num={1} />
        <StackItem num={2} />
        <StackItem num={3} />
      </Stack>
      <Stack spacing='lg' className='p-4 bg-gray-50'>
        <StackItem num={1} />
        <StackItem num={2} />
        <StackItem num={3} />
      </Stack>
      <Stack spacing='xl' className='p-4 bg-gray-50'>
        <StackItem num={1} />
        <StackItem num={2} />
        <StackItem num={3} />
      </Stack>
    </div>
  ),
}

export const AlignStart: Story = {
  args: { align: 'start' },
  render: (args) => (
    <Stack {...args} direction='horizontal' className='p-4 bg-gray-100 rounded-lg h-32'>
      <StackItem num={1} />
      <Box className='p-6 bg-blue-200'>Tall</Box>
      <StackItem num={3} />
    </Stack>
  ),
}

export const AlignCenter: Story = {
  args: { align: 'center' },
  render: (args) => (
    <Stack {...args} direction='horizontal' className='p-4 bg-gray-100 rounded-lg h-32'>
      <StackItem num={1} />
      <Box className='p-6 bg-blue-200'>Tall</Box>
      <StackItem num={3} />
    </Stack>
  ),
}

export const AlignEnd: Story = {
  args: { align: 'end' },
  render: (args) => (
    <Stack {...args} direction='horizontal' className='p-4 bg-gray-100 rounded-lg h-32'>
      <StackItem num={1} />
      <Box className='p-6 bg-blue-200'>Tall</Box>
      <StackItem num={3} />
    </Stack>
  ),
}

export const AlignStretch: Story = {
  args: { align: 'stretch' },
  render: (args) => (
    <Stack {...args} direction='horizontal' className='p-4 bg-gray-100 rounded-lg h-32'>
      <StackItem num={1} />
      <Box className='p-6 bg-blue-200'>Tall</Box>
      <StackItem num={3} />
    </Stack>
  ),
}

export const FormLayout: Story = {
  render: () => (
    <Stack spacing='md' className='w-80'>
      <Box className='space-y-2'>
        <label className='block text-sm font-medium'>Email</label>
        <input type='email' className='w-full p-2 border rounded' placeholder='Enter email' />
      </Box>
      <Box className='space-y-2'>
        <label className='block text-sm font-medium'>Password</label>
        <input type='password' className='w-full p-2 border rounded' placeholder='Enter password' />
      </Box>
      <button className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
        Sign In
      </button>
    </Stack>
  ),
}
